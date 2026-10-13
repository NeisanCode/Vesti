import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import type {
    PaymentErrorResponse,
    PaymentRequestBody,
    PaymentSuccessResponse,
} from "../src/types/api";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<void> {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    const {
        payment_phone_number,
        provider,
        customer_external_id,
        customer,
        metadata,
    } = (req.body ?? {}) as PaymentRequestBody;

    if (!payment_phone_number || !provider) {
        res.status(400).json({
            message: "Missing required fields: payment_phone_number, provider",
        });
        return;
    }

    if (!["MTN", "AIRTEL"].includes(provider)) {
        res.status(400).json({
            message: "Invalid provider. Must be MTN or AIRTEL",
        });
        return;
    }

    if (!/^242\d{9}$/.test(payment_phone_number)) {
        res.status(400).json({
            message: "Invalid phone number format. Expected 242XXXXXXXXX",
        });
        return;
    }

    const { PAYMENT_URL, API_KEY, FIXED_AMOUNT } = process.env;
    if (!PAYMENT_URL || !API_KEY || !FIXED_AMOUNT) {
        res.status(500).json({ message: "Payment service is not configured" });
        return;
    }

    try {
        const response = await axios.request<PaymentSuccessResponse>({
            method: "POST",
            url: PAYMENT_URL,
            headers: {
                "Content-Type": "application/json",
                "XO-API-KEY": API_KEY,
            },
            data: {
                amount: Number(FIXED_AMOUNT),
                payment_phone_number,
                provider,
                ...(customer_external_id && { customer_external_id }),
                ...(customer && { customer }),
                ...(metadata && { metadata }),
            },
        });

        res.status(200).json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError<PaymentErrorResponse>(error)) {
            res.status(error.response?.status ?? 500).json(
                error.response?.data ?? { message: "Payment provider error" },
            );
            return;
        }

        res.status(500).json({ message: "Internal server error" });
    }
}

export type Provider = "MTN" | "AIRTEL";

export interface PaymentRequestBody {
  payment_phone_number?: string;
  provider?: Provider;
  customer_external_id?: string;
  customer?: { name?: string; phone?: string };
  metadata?: Record<string, unknown>;
}

export interface PaymentSuccessResponse {
  reference: string;
  amount: string;
  currency: "XAF";
  paymentPhoneNumber: string;
  provider: Provider;
  type: "payment";
  status: "success" | "pending" | "failed";
  message: string;
  metadata: Record<string, unknown> | null;
}

export interface PaymentErrorResponse {
  message?: string;
}
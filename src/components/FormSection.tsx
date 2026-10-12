import type { ReactNode } from "react";

type FormSectionProps = { title: string; children: ReactNode };

export function FormSection({ title, children }: FormSectionProps) {
  return <fieldset><legend className="mb-4 font-serif text-2xl tracking-[-0.04em]">{title}</legend>{children}</fieldset>;
}

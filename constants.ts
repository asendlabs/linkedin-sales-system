type PaymentProvider = "stripe" | "dodopayments" | "paddle";

export const APP_NAME =
  process.env.NODE_ENV === "development" ? "DEV - LinkedIn Growth System" : "LinkedIn Growth System";

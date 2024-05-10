export interface PaymentOption {
    id: string;
    value: string;
    logoSrc: string;
    label: string;
    column: "left" | "right";
}
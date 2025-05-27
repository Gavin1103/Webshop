export type Order = {
    orderId: number;
    userId: number | null;
    orderDate: number;
    status: string;
    totalAmount: number;
    orderDetails: [];
    paymentDetails: null;
};
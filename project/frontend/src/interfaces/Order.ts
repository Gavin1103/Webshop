import {ProductItem} from "./Cart";

export interface RawPaymentDetails {
    "billing-address-line1": string;
    "billing-city": string;
    "billing-country": string;
    "billing-postal-code": string;
    "shipping-address-line1"?: string;
    "shipping-city"?: string;
    "shipping-country"?: string;
    "shipping-postal-code"?: string;
    "card-holder-input": string;
    "card-number-input": string;
    "cvv-input": string;
    "email-input": string;
    "expiration-date-input": string;
    "payment-provider": string;
    "first-name-input": string;
    "surname-input": string;
}

interface CreateCustomerOrderDetail {
    productId: number;
    quantity: number;
    price: number;
}

interface CreatePaymentDetails {
    paymentMethod: string;
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
}

interface CreateAddress {
    line1: string;
    city: string;
    country: string;
    postalCode: string;
}

interface CreatePersonalDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface CreateCustomerOrder {
    userId?: number;
    orderDetails: CreateCustomerOrderDetail[];
    paymentDetails: CreatePaymentDetails;
    billingAddress: CreateAddress;
    shippingAddress?: CreateAddress;
    personalDetails?: CreatePersonalDetails;
}

export interface UpdateCustomerOrder {
    orderId: number;
    userId?: number;
    orderDetails: CreateCustomerOrderDetail[];
    paymentDetails: CreatePaymentDetails;
    billingAddress: CreateAddress;
    shippingAddress?: CreateAddress;
    personalDetails?: CreatePersonalDetails;
}

export function mapToCreateCustomerOrderDTO(
    products: ProductItem[],
    paymentDetails: RawPaymentDetails,
    userId?: number
): CreateCustomerOrder {
    const orderDetails = products.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.unitPrice ?? 0
    }));

    const createPaymentDetailsDTO: CreatePaymentDetails = {
        paymentMethod: paymentDetails["payment-provider"],
        cardHolderName: paymentDetails["card-holder-input"],
        cardNumber: paymentDetails["card-number-input"],
        expiryDate: formatDate(paymentDetails["expiration-date-input"])
    };

    const billingAddress: CreateAddress = {
        line1: paymentDetails["billing-address-line1"],
        city: paymentDetails["billing-city"],
        country: paymentDetails["billing-country"],
        postalCode: paymentDetails["billing-postal-code"]
    };

    let shippingAddress: CreateAddress | undefined;
    if (paymentDetails["shipping-address-line1"]) {
        shippingAddress = {
            line1: paymentDetails["shipping-address-line1"],
            city: paymentDetails["shipping-city"]!,
            country: paymentDetails["shipping-country"]!,
            postalCode: paymentDetails["shipping-postal-code"]!
        };
    }

    const createPersonalDetailsDTO: CreatePersonalDetails = {
        firstName: paymentDetails["first-name-input"],
        lastName: paymentDetails["surname-input"],
        email: paymentDetails["email-input"],
        phoneNumber: ""
    };

    const createCustomerOrderDTO: CreateCustomerOrder = {
        orderDetails,
        paymentDetails: createPaymentDetailsDTO,
        billingAddress,
    };

    if (shippingAddress) {
        createCustomerOrderDTO.shippingAddress = shippingAddress;
    }

    if (userId) {
        createCustomerOrderDTO.userId = userId;
    } else {
        createCustomerOrderDTO.personalDetails = createPersonalDetailsDTO;
    }

    return createCustomerOrderDTO;
}

function formatDate(dateString: string | number | Date): string {
    if (!dateString) return "";
    const date: Date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
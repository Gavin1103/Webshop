import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import personalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personal-info-style";
import paymentDetailsStyle from "../../../../styles/shoppingCart/personalInfo/payment-details-style";
import {PaymentOption} from "../../../../types/PaymentOption";
import {createInputField} from "../../../helpers/form-helpers";

@customElement("payment-details")
export class PaymentDetails extends LitElement {
    public static styles = [personalInfoStyle, paymentDetailsStyle];

    @property() private selectedOption: string | null = null;

    // TODO make add paymentOptions database table and retrieve options from database
    private paymentOptions: PaymentOption[] = [
        {
            id: "paypal",
            value: "paypal",
            logoSrc: "../assets/image/icons/paymentProviders/paypal.svg",
            label: "PayPal",
            column: "left"
        },
        {
            id: "apple-pay",
            value: "apple-pay",
            logoSrc: "../assets/image/icons/paymentProviders/apple-pay.svg",
            label: "ApplePay",
            column: "left"
        },
        {
            id: "google-pay",
            value: "google-pay",
            logoSrc: "../assets/image/icons/paymentProviders/google-pay.svg",
            label: "GooglePay",
            column: "left"
        },
        {
            id: "visa",
            value: "visa",
            logoSrc: "../assets/image/icons/paymentProviders/visa.svg",
            label: "Visa",
            column: "left"
        },
        {
            id: "ideal",
            value: "ideal",
            logoSrc: "../assets/image/icons/paymentProviders/ideal.svg",
            label: "iDeal",
            column: "right"
        },
        {
            id: "amazon-pay",
            value: "amazon-pay",
            logoSrc: "../assets/image/icons/paymentProviders/amazon-pay.svg",
            label: "AmazonPay",
            column: "right"
        },
        {
            id: "master-card",
            value: "masterCard",
            logoSrc: "../assets/image/icons/paymentProviders/master-card.svg",
            label: "MasterCard",
            column: "right"
        },
        {
            id: "maestro",
            value: "maestro",
            logoSrc: "../assets/image/icons/paymentProviders/maestro.svg",
            label: "Maestro",
            column: "right"
        }
    ];

    protected render(): TemplateResult {
        return html`
            <div class="block-container">
                <h2 class="title">Payment Details</h2>
                <div class="payment-wrapper">
                    <div class="left-payments">
                        ${this.paymentOptions.filter(option => option.column === "left").map(option => this.renderPaymentOption(option))}
                    </div>
                    <div class="right-payments">
                        ${this.paymentOptions.filter(option => option.column === "right").map(option => this.renderPaymentOption(option))}
                    </div>
                </div>

                ${this.selectedOption === "maestro" || this.selectedOption === "masterCard" || this.selectedOption === "visa" ? html`
                    <div class="input-row">
                        ${createInputField({
                            id: "card-holder-input",
                            placeholder: "Enter The Card Holders Name...",
                            label: "Card holder name"
                        })}
                        ${createInputField({
                            id: "card-number-input",
                            placeholder: "Enter Your Card Number...",
                            label: "Card number"
                        })}
                    </div>
                    <div class="input-row">
                        ${createInputField({
                            id: "cvv-input",
                            placeholder: "Example: 4567",
                            label: "CVV"
                        })}
                        ${createInputField({
                            id: "expiration-date-input",
                            placeholder: "MM/YY",
                            label: "Expiration Date"
                        })}
                    </div>
                ` : ""}
            </div>
        `;
    }

    private renderPaymentOption(option: PaymentOption): TemplateResult {
        return html`
            <div class="input-wrapper">
                <input class="payment-input" type="radio" id="${option.id}" name="payment-provider"
                       value="${option.value}" @change="${(): void => this.handleSelection(option.value)}">
                <label for="${option.id}" class="payment-label">
                    <img class="payment-logo" src="${option.logoSrc}" alt="${option.label} logo">
                    <span>${option.label}</span>
                </label>
            </div>
        `;
    }

    private handleSelection(value: string): void {
        this.selectedOption = value;
    }
}

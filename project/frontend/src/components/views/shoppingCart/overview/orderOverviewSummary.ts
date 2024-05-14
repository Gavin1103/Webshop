import {html, LitElement, TemplateResult} from "lit";
import {customElement, state} from "lit/decorators.js";
import {Router} from "@vaadin/router";

import {OrderItem} from "../../../../types/OrderItem";
import OrderOverviewSummaryStyle
    from "../../../../styles/shoppingCart/orderOverview/orderOverviewSummaryStyle";
import inputFieldStyle from "../../../../styles/shoppingCart/inputFieldStyle";
import {createInputField} from "../../../helpers/formHelpers";

const FREE_SHIPPING_THRESHOLD: number = 0;
const HOME_PATH: string = "/";

@customElement("order-overview-summary")
export class OrderOverviewSummary extends LitElement {
    public static styles = [OrderOverviewSummaryStyle, inputFieldStyle];

    @state()
    private products: OrderItem[] = [];

    @state()
    private user: { name: string, address: string, zip: string, country: string } = {
        name: "",
        address: "",
        zip: "",
        country: ""
    };

    @state()
    private paymentInfo: { method: string, lastFourDigits: string, icon: string } = {
        method: "",
        lastFourDigits: "",
        icon: ""
    };

    private calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    private navigateTo(path: string): void {
        Router.go(path);
    }

    public navigateHome(): void {
        this.navigateTo(HOME_PATH);
    }

    private renderSummaryItem(label: string, value: any): TemplateResult {
        return html`
            <div class="summary-item">
                <p>${label}</p>
                <p class="item-price">${value}</p>
            </div>
        `;
    }

    private renderPaymentDetails(): TemplateResult {
        if (this.paymentInfo.method === "PayPal") {
            return html`<p class="summary-item-text">${this.paymentInfo.method}</p>`;
        } else {
            return html`
                <p class="summary-item-text">${this.paymentInfo.method}</p>
                <div class="payment-option">
                    <img class="dots-icon" src="/assets/image/icons/three-dots.svg"
                         alt="Payment method dots icon">
                    <p class="summary-item-text">${this.paymentInfo.lastFourDigits}</p>
                    <img class="payment-icon"
                         src="/assets/image/icons/paymentProviders/${this.paymentInfo.icon}"
                         alt="${this.paymentInfo.method} icon">
                </div>
            `;
        }
    }

    public render(): TemplateResult {
        return html`
            <div class="summary-wrapper">
                ${this.renderUserDetails()}
                ${this.renderPaymentSection()}
                ${this.renderDiscountSection()}
                ${this.renderTotalSection()}
            </div>
        `;
    }

    private renderUserDetails(): TemplateResult {
        return html`
            <div class="summary-section">
                <div class="summary-item title-item">
                    <p class="item-title">${this.user.name}</p>
                    <button class="align-right edit-button">Edit</button>
                </div>
                <p class="summary-item-text">${this.user.address}</p>
                <p class="summary-item-text">${this.user.zip}</p>
                <p class="summary-item-text">${this.user.country}</p>
            </div>
        `;
    }

    private renderPaymentSection(): TemplateResult {
        return html`
            <div class="summary-section">
                <div class="summary-item title-item">
                    <p class="item-title">Payment Method</p>
                    <button class="align-right edit-button">Edit</button>
                </div>
                ${this.renderPaymentDetails()}
            </div>
        `;
    }

    private renderDiscountSection(): TemplateResult {
        return html`
            <div class="summary-section">
                <div class="discount-code">
                    <p class="item-title summary-item-text">Do you have any discount code?</p>
                    <p class="summary-item-text">Only one discount code per order can be applied.</p>
                </div>
                <div class="discount-input">
                    ${createInputField({
                        id: "discount-input",
                        placeholder: "Your code here",
                        label: "Discount Code",
                        class: "discount-field"
                    })}
                    <button class="button apply-discount">
                        <span>Apply</span>
                    </button>
                </div>
            </div>
        `;
    }

    private renderTotalSection(): TemplateResult {
        const totalPrice: number = this.calculateTotalPrice();
        return html`
            <div class="summary-section">
                ${this.renderSummaryItem("Subtotal (3 items)", `€ ${totalPrice}`)}
                ${this.renderSummaryItem("Shipping costs", FREE_SHIPPING_THRESHOLD > 0 ? `€ ${FREE_SHIPPING_THRESHOLD}` : "FREE")}
                ${this.renderSummaryItem("Discount", "-")}
                <div class="button-container overview-button-container">
                    <div class="total-price">
                        <p class="price-items">Total (incl. VAT)</p>
                        <p class="price-items price">€
                            ${totalPrice + (FREE_SHIPPING_THRESHOLD > 0 ? FREE_SHIPPING_THRESHOLD : 0)}</p>
                    </div>
                    <button class="button next-button overview-button" @click="${this.navigateHome}">
                        <span>Checkout</span>
                        <img class="next-icon" src="/assets/image/icons/next-icon.svg"
                             alt="Checkout button icon">
                    </button>
                </div>
            </div>
        `;
    }
}

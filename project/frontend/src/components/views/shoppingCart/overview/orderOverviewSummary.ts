import {html, LitElement, TemplateResult} from "lit";
import {customElement, state} from "lit/decorators.js";
import OrderOverviewSummaryStyle
    from "../../../../styles/shoppingCart/orderOverview/orderOverviewSummaryStyle";
import inputFieldStyle from "../../../../styles/shoppingCart/inputFieldStyle";
import {createInputField} from "../../../helpers/formHelpers";
import {navigateTo} from "../../../router";
import {roundToTwoDecimals} from "../../../helpers/helpers";
import {ProductItem} from "../../../../interfaces/Cart";

const FREE_SHIPPING_THRESHOLD: number = 0;
const THANK_YOU_PAGE_PATH: string = "/thank-you-page";
const PERSONAL_DETAILS_PATH: string = "/cart/personal-info";

@customElement("order-overview-summary")
export class OrderOverviewSummary extends LitElement {
    public static styles = [OrderOverviewSummaryStyle, inputFieldStyle];

    @state()
    private products: ProductItem[] = [];

    @state()
    private user: { name: string, address: string, zip: string, country: string } = {
        name: "Rocco Reus",
        address: "Kanaaldijk 222",
        zip: "1821 BE",
        country: "Netherlands"
    };

    @state()
    private paymentInfo: { method: string, lastFourDigits: string, icon: string } = {
        method: "Credit Card",
        lastFourDigits: "1234",
        icon: "master-card"
    };

    private calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + 10 * product.quantity, 0);
    }

    public navigateToThankYouPage(): void {
        navigateTo(THANK_YOU_PAGE_PATH);
    }

    public editPersonalInformation(): void {
        navigateTo(PERSONAL_DETAILS_PATH);
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
                         src="/assets/image/icons/paymentProviders/${this.paymentInfo.icon}.svg"
                         alt="${this.paymentInfo.method} icon">
                </div>
            `;
        }
    }

    public render(): TemplateResult {
        return html`
            <div class="summary-wrapper">
                <div class="content-container">
                    ${this.renderUserDetails()}
                    ${this.renderPaymentSection()}
                    ${this.renderDiscountSection()}
                    ${this.renderTotalSection()}
                </div>
            </div>
        `;
    }

    private renderUserDetails(): TemplateResult {
        return html`
            <div class="summary-section">
                <div class="summary-item title-item">
                    <p class="item-title">${this.user.name}</p>
                    <button @click="${this.editPersonalInformation}" class="align-right edit-button">Edit
                    </button>
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
                    <button class="align-right edit-button" @click="${this.editPersonalInformation}">Edit
                    </button>
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
        const totalPrice: string = roundToTwoDecimals(this.calculateTotalPrice());
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
                    <button class="button next-button overview-button"
                            @click="${this.navigateToThankYouPage}">
                        <span>Checkout</span>
                        <img class="next-icon" src="/assets/image/icons/next-icon.svg"
                             alt="Checkout button icon">
                    </button>
                </div>
            </div>
        `;
    }
}

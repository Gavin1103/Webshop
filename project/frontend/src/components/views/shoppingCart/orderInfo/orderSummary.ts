import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderSummaryStyle from "../../../../styles/shoppingCart/orderInfo/orderSummaryStyle";
import {navigateTo} from "../../../router";
import {CartItem} from "../../../helpers/CartHelpers";


const TAX_RATE: number = 21;
const SHIPPING_COST: number = 25.25;
const PAYMENT_INFO_PATH: string = "/cart/personal-info";
const HOME_PATH: string = "/";

@customElement("order-summary")
export class OrderSummary extends LitElement {
    public static styles = [OrderSummaryStyle];

    @property({type: Object})
    private products: CartItem[] = [];

    private getTotalPrice(): number {
        if (!this.products.length) return 0;
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    private getTaxAmount(): number {
        const total: number = this.getTotalPrice();
        return (total / 100) * TAX_RATE;
    }

    private handleContinue(): void {
        navigateTo(PAYMENT_INFO_PATH);
    }

    private handleReturn(): void {
        navigateTo(HOME_PATH);
    }

    private renderSummaryItem(label: string, value: any): TemplateResult {
        return html`
            <div class="summary-item">
                <p>${label}</p>
                <p class="item-price">€${value}</p>
            </div>
        `;
    }

    public render(): TemplateResult {
        return html`
            <div class="summary-wrapper">
                <div class="content-container">
                    <h2 class="title">Order Summary</h2>
                    ${this.renderSummaryItem("Subtotal", roundToTwoDecimals(this.getTotalPrice()))}
                    ${this.renderSummaryItem(`BTW(${TAX_RATE}%)`, roundToTwoDecimals(this.getTaxAmount()))}
                    ${this.renderSummaryItem("Estimated Shipping", SHIPPING_COST)}

                    ${this.renderSummaryItem("Estimated Total", roundToTwoDecimals(this.getTotalPrice() + SHIPPING_COST))}

                    <div class="button-container">
                        <button @click="${this.handleReturn}" class="button prev-button overview-button">
                            <span>Previous</span>
                        </button>
                        <button @click="${this.handleContinue}" class="button next-button overview-button">
                            <span>Next</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}


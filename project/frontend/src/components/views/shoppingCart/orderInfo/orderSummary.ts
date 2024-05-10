import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderSummaryStyle from "../../../../styles/shoppingCart/orderInfo/orderSummaryStyle";
import {OrderItem} from "../../../../types/OrderItem";
import {Router} from "@vaadin/router";

const TAX_RATE: number = 21;
const SHIPPING_COST: number = 25.25;
const PAYMENT_INFO_PATH: string = "/cart/personal-info";
const HOME_PATH: string = "/";

@customElement("order-summary")
export class OrderSummary extends LitElement {
    public static styles = [OrderSummaryStyle];

    @property({type: Object})
    private products: OrderItem[] = [];

    @property({type: Boolean, reflect: true})
    public isOverviewPage: boolean = false;

    private getTotalPrice(): number {
        if (!this.products.length) return 0;
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    private getTaxAmount(): string {
        const total: number = this.getTotalPrice();
        const tax: number = (total / 100) * TAX_RATE;
        return tax.toFixed(2);
    }

    private navigate(path: string): void {
        Router.go(path);
    }

    private handleContinue(): void {
        this.navigate(this.isOverviewPage ? HOME_PATH : PAYMENT_INFO_PATH);
    }

    private handleReturn(): void {
        this.navigate(this.isOverviewPage ? PAYMENT_INFO_PATH : HOME_PATH);
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
                    ${this.renderSummaryItem("Subtotal", this.getTotalPrice())}
                    ${this.renderSummaryItem(`BTW(${TAX_RATE}%)`, this.getTaxAmount())}
                    ${this.renderSummaryItem(this.isOverviewPage ? "Shipping" : "Estimated Shipping", SHIPPING_COST)}

                    ${this.isOverviewPage ? html`
                        <div class="summary-item">
                            <p>Payment method</p>
                            <img class="item-price payment-logo"
                                 src="/assets/image/icons/paymentProviders/ideal.svg"
                                 alt="iDeal payment method logo">
                        </div>
                    ` : ""}

                    ${this.renderSummaryItem(this.isOverviewPage ? "Total" : "Estimated Total", this.getTotalPrice() + SHIPPING_COST)}

                    <div class="button-container ${this.isOverviewPage ? "overview-button-container" : ""}">
                        <button @click="${this.handleReturn}" class="button prev-button overview-button">
                            <span>Previous</span>
                        </button>
                        <button @click="${this.handleContinue}" class="button next-button overview-button">
                            <span>${this.isOverviewPage ? "Complete Order" : "Next"}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}


import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import OrderSummaryStyle from "../../../../styles/shoppingCart/orderInfo/order-summary-style";
import {OrderItem} from "../../../../types/OrderItem";

@customElement("order-summary")
export class OrderSummary extends LitElement {
    public static styles = [OrderSummaryStyle];

    @property({type: Object})
    private products!: OrderItem[];


    public getTotalPrice(): number {
        return this.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    }

    public getTaxAmount(taxRate: number): string {
        const total: number = this.getTotalPrice();
        const tax: number = (total / 100) * taxRate;
        return tax.toFixed(2);
    }

    public handleContinue(): void {
        location.replace("/cart/personal-info");
    }

    public handeReturn(): void {
        location.replace("/");
    }

    public render(): TemplateResult {
        const shippingCost: number = 25.25;

        return html`
            <div class="summary-wrapper">
                <div class="content-container">
                    <h2 class="title">Order Summary</h2>

                    <div class="summary-item">
                        <p>Subtotal</p>
                        <p class="item-price">€${this.getTotalPrice()}</p>
                    </div>

                    <div class="summary-item">
                        <p>BTW(21%)</p>
                        <p class="item-price">€${this.getTaxAmount(21)}</p>
                    </div>

                    <div class="summary-item">
                        <p>Estimated Shipping</p>
                        <p class="item-price">€${shippingCost}</p>
                    </div>

                    <div class="summary-item">
                        <p>Estimated Total</p>
                        <p class="item-price">€${this.getTotalPrice() + shippingCost}</p>
                    </div>


                    <div class="button-container">
                        <button @click="${this.handeReturn}" class="button prev-button">
                            Go Back
                        </button>

                        <button @click="${this.handleContinue}" class="button next-button">Next
                            <img src="./assets/image/icons/next-arrow.svg"
                                 alt="Icon of next arrow" class="next-arrow">
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}


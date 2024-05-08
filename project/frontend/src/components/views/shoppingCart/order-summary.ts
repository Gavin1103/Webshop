import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import OrderSummaryStyle from "../../../styles/shoppingCart/order-summary-style";

@customElement("order-summary")
export class OrderSummary extends LitElement {
    public static styles = [OrderSummaryStyle];

    public render(): TemplateResult {
        return html`
            <div class="summary-wrapper">

            </div>
        `;
    }
}


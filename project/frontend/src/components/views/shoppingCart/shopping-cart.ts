import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("shopping-cart")
export class ShoppingCart extends LitElement {
    public render(): TemplateResult {
        return html`
            <div>
                <h2>This is the Shopping cart</h2>
                <wizard-container></wizard-container>
            </div>
        `;
    }
}
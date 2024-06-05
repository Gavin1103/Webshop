import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-orders")
export class OrdersPage extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Orders Page</h1>
                <p>This is the orders page content.</p>
            </div>
        `;
    }
}
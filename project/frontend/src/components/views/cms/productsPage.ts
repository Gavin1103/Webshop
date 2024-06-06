import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-products")
export class ProductsPage extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Products Page</h1>
                <p>This is the products page content.</p>
            </div>
        `;
    }
}
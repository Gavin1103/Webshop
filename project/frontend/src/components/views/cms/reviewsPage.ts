import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-reviews")
export class ReviewsPage extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Reviews Page</h1>
                <p>This is the reviews page content.</p>
            </div>
        `;
    }
}
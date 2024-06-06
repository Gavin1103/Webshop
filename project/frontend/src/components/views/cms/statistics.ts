import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-statistics")
export class Statistics extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Statistics Page</h1>
                <p>This is the statistics page content.</p>
            </div>
        `;
    }
}
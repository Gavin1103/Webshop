import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";


@customElement("not-found")
export class NotFound extends LitElement {
    public render(): TemplateResult {
        return html`
            <div>
                <h2>Page not found</h2>
            </div>
        `;
    }
}
import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("home-page")
export class HomePage extends LitElement {
    public render(): TemplateResult {
        return html`
            <div>
                <h2>Home found</h2>
            </div>
        `;
    }
}
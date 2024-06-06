import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-tools")
export class ToolingPage extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Tooling Page</h1>
                <p>This is the tooling page content.</p>
            </div>
        `;
    }
}
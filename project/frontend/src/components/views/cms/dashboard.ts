import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-dashboard")
export class Dashboard extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Welcome to the Dashboard</h1>
                <p>This is the main content area. Add your dashboard widgets and content here.</p>
            </div>
        `;
    }
}
import {html, LitElement} from "lit-element";
import {customElement} from "lit/decorators.js";
import {TemplateResult} from "lit";
import loadingIndicatorStyle from "../styles/feedbackTool/loadingIndicatorStyle";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
    public static styles = [loadingIndicatorStyle];

    protected render(): TemplateResult {
        return html`
            <div class="spinner"></div>
        `;
    }
}

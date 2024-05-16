import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("showcase-section")
export class ShowcaseSection extends LitElement {
    public static styles = [];

    @property({type: String})
    public overViewType: string | undefined;

    public render(): TemplateResult {
        return html`
            <p>${this.overViewType}</p>
        `;
    }
}
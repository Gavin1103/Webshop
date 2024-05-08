import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import wizardElementStyle from "../../../styles/shoppingCart/wizard-element-style";

@customElement("wizard-element")
export class WizardElement extends LitElement {
    public static styles = [wizardElementStyle];

    @property({type: Number}) private index: number | undefined;
    @property({type: String}) private label: string | undefined;
    @property({type: String}) private status: "active" | "completed" | "inactive" = "inactive";

    protected render(): TemplateResult {
        return html`
            <div class="solid-background">
                <div class="step ${this.status}">
                    ${this.status === "completed" ? "✓" : "0" + this.index}
                </div>
            </div>
            <div class="label label-${this.status}">${this.label}</div>
        `;
    }
}

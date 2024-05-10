import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import wizardElementStyle from "../../../styles/shoppingCart/wizard-element-style";
import {stepStatus} from "../../../enums/stepStatusEnum";

@customElement("wizard-element")
export class WizardElement extends LitElement {
    public static styles = [wizardElementStyle];

    @property({type: Number}) private index: number | undefined;
    @property({type: String}) private label: string | undefined;
    @property({type: String}) private status: stepStatus.ACTIVE | stepStatus.COMPLETED | stepStatus.INACTIVE = stepStatus.INACTIVE;

    protected render(): TemplateResult {
        return html`
            <div class="solid-background">
                <div class="step ${this.status}">
                    ${this.status === stepStatus.COMPLETED ? "✓" : "0" + this.index}
                </div>
            </div>
            <div class="label label-${this.status}">${this.label}</div>
        `;
    }
}

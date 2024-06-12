import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import wizardElementStyle from "../../../styles/shoppingCart/wizardElementStyle";
import {stepStatus} from "../../../enums/stepStatusEnum";
import {navigateTo} from "../../router";

@customElement("wizard-element")
export class WizardElement extends LitElement {
    public static styles = [wizardElementStyle];

    @property({type: Number}) private index: number | undefined;
    @property({type: String}) private path!: string;
    @property({type: String}) private label: string | undefined;
    @property({type: String}) private status: stepStatus = stepStatus.INACTIVE;

    private navigateToPage(): void {
        if (this.status === stepStatus.INACTIVE) return;

        navigateTo(this.path);
    }

    protected render(): TemplateResult {
        return html`
            <div class="solid-background" @click="${this.navigateToPage}">
                <div class="step ${this.status}">
                    ${this.status === stepStatus.COMPLETED ? "✓" : "0" + this.index}
                </div>
            </div>
            <div class="label label-${this.status}">${this.label}</div>
        `;
    }
}

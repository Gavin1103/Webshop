import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import wizardContainerStyle from "../../../styles/shoppingCart/wizardContainerStyle";
import {stepStatus} from "../../../enums/stepStatusEnum";

@customElement("wizard-container")
export class WizardContainer extends LitElement {
    public static styles = [wizardContainerStyle];

    public connectedCallback(): void {
        super.connectedCallback();
        this.getCurrentStatus();
    }

    private steps = [
        {label: "Order Information", status: stepStatus.COMPLETED},
        {label: "Personal Information", status: stepStatus.ACTIVE},
        {label: "Order Overview", status: stepStatus.INACTIVE}
    ];

    public getCurrentStatus(): void {
        const fullUrl: string = window.location.href;
        const urlParts: string[] = fullUrl.split("/");
        const localhostIndex: number = urlParts.findIndex(part => part.includes(viteConfiguration.WEBSHOP_URL));
        const remainingUrl: string = urlParts.slice(localhostIndex + 1).join("/");

        this.updateStepsStatus(remainingUrl);
    }

    private updateStepsStatus(currentPath: string): void {
        const pathToStepIndex: { [key: string]: number } = {
            "cart": 0,
            "cart/personal-info": 1,
            "cart/overview": 2
        };

        const activeStepIndex: number = pathToStepIndex[currentPath] || 0;


        this.steps.forEach((step, index) => {
            if (index < activeStepIndex) {
                step.status = stepStatus.COMPLETED;
            } else if (index === activeStepIndex) {
                step.status = stepStatus.ACTIVE;
            } else {
                step.status = stepStatus.INACTIVE;
            }
        });
    }

    protected render(): TemplateResult {

        const connectorColor1: boolean = this.steps[0].status === stepStatus.COMPLETED;
        const connectorColor2: boolean = this.steps[1].status === stepStatus.COMPLETED;

        return html`
            <div class="stepper">
                <div class="connector-first ${connectorColor1 ? "step-completed" : ""}"></div>
                <!-- Moved out of the map function -->
                ${this.steps.map((step, index) => html`
                    <div class="step">
                        <wizard-element .index=${index + 1} .label=${step.label}
                                        .status=${step.status}></wizard-element>
                    </div>
                `)}
                <div class="connector-second ${connectorColor2 ? "step-completed" : ""}"></div>
            </div>
        `;
    }
}

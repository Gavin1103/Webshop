// In the PersonalInfo component
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personal-info-style";
import {Router} from "@vaadin/router";

@customElement("personal-info")
export class PersonalInfo extends LitElement {
    public static styles = [PersonalInfoStyle];

    @property({type: Boolean}) private showShippingAddress: boolean = false;

    private toggleShippingAddress(): void {
        this.showShippingAddress = !this.showShippingAddress;
    }

    private navigate(path: string): void {
        Router.go(path);
    }

    private handleContinue(): void {
        this.navigate("/cart/overview");
    }

    private handleReturn(): void {
        this.navigate("/cart");
    }

    protected render(): TemplateResult {
        return html`
            <div class="personal-info-wrapper">
                <form>
                    <personal-details></personal-details>
                    <payment-details></payment-details>
                    <billing-address
                        .toggleShipping="${this.toggleShippingAddress.bind(this)}"></billing-address>
                    ${this.showShippingAddress ? html`
                        <shipping-details></shipping-details>` : ""}
                </form>

                <div class="button-container">
                    <button @click="${this.handleReturn}" class="button prev-button">
                        <img src="../assets/image/icons/prev-arrow.svg"
                             alt="Icon of next arrow" class="next-arrow">
                        Prev
                    </button>

                    <button @click="${this.handleContinue}" class="button next-button">Next
                        <img src="../assets/image/icons/next-arrow.svg"
                             alt="Icon of next arrow" class="next-arrow">
                    </button>
                </div>
            </div>
        `;
    }
}

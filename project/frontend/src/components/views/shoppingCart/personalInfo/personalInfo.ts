import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {navigateTo} from "../../../router";
import {checkInputsValidity, populateForm, processUserDetails} from "../../../helpers/formHelpers";

@customElement("personal-info")
export class PersonalInfo extends LitElement {
    public static styles = [PersonalInfoStyle];

    @property({type: Boolean}) private showShippingAddress: boolean = false;

    public firstUpdated(): void {
        this.loadUserDetails();
    }

    private toggleShippingAddress(): void {
        this.showShippingAddress = !this.showShippingAddress;
    }

    private handleContinue(event: Event): void {
        event.preventDefault();

        if (this.checkValidity()) {
            // Form is valid, proceed with form submission logic
            console.log('Form is valid, proceed with submission');
            navigateTo("/cart/overview");
        } else {
            console.log('Form is invalid, please fill all required fields');
        }
    }

    private checkValidity(): boolean {
        const form = this.shadowRoot?.querySelector('form');
        if (!form) return false;

        let allValid = true;

        const personalDetails = form.querySelector<HTMLElement>('personal-details');
        if (personalDetails) {
            const personalInputs = ['first-name-input', 'surname-input', 'email-input'];
            allValid = checkInputsValidity(personalDetails, personalInputs) && allValid;
            if (!allValid) return false;
        }

        const paymentDetails = form.querySelector<HTMLElement>('payment-details');
        if (paymentDetails) {
            const paymentMethodRadios = paymentDetails.shadowRoot?.querySelectorAll<HTMLInputElement>('input[name="payment-provider"]');
            const paymentMethodSelected = Array.from(paymentMethodRadios || []).some(radio => radio.checked);

            if (!paymentMethodSelected) {
                allValid = false;
                paymentMethodRadios?.[0].setCustomValidity('Please select a payment method.');
                paymentMethodRadios?.[0].reportValidity();
            } else {
                paymentMethodRadios?.forEach(radio => radio.setCustomValidity(''));
            }

            const selectedPaymentMethod = paymentDetails.shadowRoot?.querySelector<HTMLInputElement>('input[name="payment-provider"]:checked');
            const paymentMethod: string = selectedPaymentMethod?.value as string;
            if (['mastercard', 'visa', 'maestro'].includes(paymentMethod)) {
                const cardInputs = ['card-holder-name', 'card-number', 'card-cvv', 'card-expiration-date'];
                allValid = checkInputsValidity(paymentDetails, cardInputs) && allValid;
            }

            if (!allValid) return false;
        }

        const billingAddress = form.querySelector<HTMLElement>('billing-address');
        if (billingAddress) {
            const billingInputs = ['billing-address-line1', 'billing-city', 'billing-country', 'billing-postal-code'];
            allValid = checkInputsValidity(billingAddress, billingInputs) && allValid;
            if (!allValid) return false;
        }

        const shippingCheckbox = billingAddress?.shadowRoot?.querySelector<HTMLInputElement>('#same-address');
        const shippingAddressDifferent = !shippingCheckbox?.checked;
        if (shippingAddressDifferent) {
            const shippingDetails = form.querySelector<HTMLElement>('shipping-details');
            if (shippingDetails) {
                const shippingInputs = ['shipping-address-line1', 'shipping-city', 'shipping-country', 'shipping-postal-code'];
                allValid = checkInputsValidity(shippingDetails, shippingInputs) && allValid;
            }
            if (!allValid) return false;
        }

        if (allValid) {
            processUserDetails(form);
        }

        return allValid;
    }


    private loadUserDetails(): void {
        const storedDetails = localStorage.getItem('userDetails');
        if (storedDetails) {
            const userDetails = JSON.parse(storedDetails);
            setTimeout(() => {
                const form = this.shadowRoot?.querySelector('form');
                if (form) {
                    populateForm(form, userDetails);
                }
            }, 100);
        }
    }


    private handleReturn(): void {
        navigateTo("/cart");
    }

    protected render(): TemplateResult {
        return html`
            <div class="personal-info-wrapper">
                <form @submit="${this.handleContinue}">
                    <personal-details></personal-details>
                    <payment-details></payment-details>
                    <billing-address
                        .toggleShipping="${this.toggleShippingAddress.bind(this)}"></billing-address>
                    ${this.showShippingAddress ? html`
                        <shipping-details></shipping-details>` : ""}

                    <div class="button-container">
                        <button @click="${this.handleReturn}" class="button prev-button">
                            <img src="../assets/image/icons/prev-arrow.svg"
                                 alt="Icon of next arrow" class="next-arrow">
                            Prev
                        </button>

                        <button type="submit" class="button next-button">Next
                            <img src="../assets/image/icons/next-arrow.svg"
                                 alt="Icon of next arrow" class="next-arrow">
                        </button>
                    </div>
                </form>
            </div>
        `;
    }
}

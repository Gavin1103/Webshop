import {html, LitElement, TemplateResult} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {navigateTo} from "../../../router";
import {
    checkInputsValidity,
    populateExtraPaymentFields,
    populateForm,
    processUserDetails
} from "../../../helpers/formHelpers";
import {CartManager} from "../../../helpers/CartHelpers";
import {
    CreateCustomerOrder,
    mapToCreateCustomerOrderDTO,
    RawPaymentDetails
} from "../../../../interfaces/Order";
import {ProductItem} from "../../../../interfaces/Cart";
import {Order} from "../../../../types/Order";
import {OrderService} from "../../../../services/OrderService";

@customElement("personal-info")
export class PersonalInfo extends LitElement {
    public static styles = [PersonalInfoStyle];

    @property({type: Boolean}) private showShippingAddress: boolean = false;

    @query("form")
    private form!: HTMLFormElement;

    private isFirstUpdate: boolean = true;

    public firstUpdated(): void {
        this.loadUserDetails();
        this.addEventListener('payment-option-selected', this.handlePaymentOptionSelected as EventListener);
    }

    private handlePaymentOptionSelected(event: CustomEvent): void {
        const selectedPaymentMethod = event.detail.selectedOption;
        const storedDetails = localStorage.getItem('userDetails');

        if (storedDetails && (selectedPaymentMethod === "visa" || selectedPaymentMethod === "mastercard" || selectedPaymentMethod === "maestro")) {
            const userDetails = JSON.parse(storedDetails);

            populateExtraPaymentFields(this.form, userDetails);
            this.requestUpdate();
        }

        if (this.isFirstUpdate) {
            this.isFirstUpdate = false;
            this.loadUserDetails();
        }
    }

    private toggleShippingAddress(): void {
        this.showShippingAddress = !this.showShippingAddress;
    }

    private async handleContinue(event: Event): Promise<void> {
        event.preventDefault();

        if (this.checkValidity()) {
            console.log('Form is valid, proceed with submission');
            await this.createOrder();
            // navigateTo("/cart/overview");
        } else {
            console.log('Form is invalid, please fill all required fields');
        }
    }

    private async createOrder(): Promise<void> {
        const cartManager = CartManager.getInstance();
        const storedDetails = localStorage.getItem('userDetails') as string;
        const shoppingCart: ProductItem[] = await cartManager.getCart() as ProductItem[];
        const userDetails: RawPaymentDetails = JSON.parse(storedDetails);
        const mappedOrderForCreate: CreateCustomerOrder = mapToCreateCustomerOrderDTO(shoppingCart, userDetails);
        const orderService: OrderService = new OrderService();

        const createdOrder: Order = await orderService.createOrder(mappedOrderForCreate) as Order;
        if (!createdOrder) {
            console.error('Failed to create order');
            return;
        }
        localStorage.setItem('orderId', createdOrder.orderId.toString());
        navigateTo("/cart/overview");
    }


    private checkValidity(): boolean {
        let allValid = true;

        const personalDetails = this.form.querySelector<HTMLElement>('personal-details');
        if (personalDetails) {
            const personalInputs = ['first-name-input', 'surname-input', 'email-input'];
            allValid = checkInputsValidity(personalDetails, personalInputs) && allValid;
            if (!allValid) return false;
        }

        const paymentDetails = this.form.querySelector<HTMLElement>('payment-details');
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

        const billingAddress = this.form.querySelector<HTMLElement>('billing-address');
        if (billingAddress) {
            const billingInputs = ['billing-address-line1', 'billing-city', 'billing-country', 'billing-postal-code'];
            allValid = checkInputsValidity(billingAddress, billingInputs) && allValid;
            if (!allValid) return false;
        }

        const shippingCheckbox = billingAddress?.shadowRoot?.querySelector<HTMLInputElement>('#same-address');
        const shippingAddressDifferent = !shippingCheckbox?.checked;
        if (shippingAddressDifferent) {
            const shippingDetails = this.form.querySelector<HTMLElement>('shipping-details');
            if (shippingDetails) {
                const shippingInputs = ['shipping-address-line1', 'shipping-city', 'shipping-country', 'shipping-postal-code'];
                allValid = checkInputsValidity(shippingDetails, shippingInputs) && allValid;
            }
            if (!allValid) return false;
        }

        if (allValid) {
            processUserDetails(this.form);
        }

        return allValid;
    }


    private loadUserDetails(): void {
        const storedDetails = localStorage.getItem('userDetails');
        if (storedDetails) {
            const userDetails = JSON.parse(storedDetails);
            setTimeout(() => {
                populateForm(this.form, userDetails);
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

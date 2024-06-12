// In the BillingAddress component
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {createInputField} from "../../../helpers/formHelpers";
import inputFieldStyle from "../../../../styles/shoppingCart/inputFieldStyle";

@customElement("billing-address")
export class BillingAddress extends LitElement {
    public static styles = [PersonalInfoStyle, inputFieldStyle];

    @property({attribute: false}) private toggleShipping: (() => void) | undefined;

    protected render(): TemplateResult {
        return html`
            <div class="block-container">
                <h2 class="title">Billing Address</h2>

                <div class="input-wrapper">
                    <input class="payment-input" type="checkbox" id="same-address" name="payment-provider"
                           @change="${this.toggleShipping}" checked="${this.toggleShipping}">
                    <label for="same-address" class="payment-label">
                        <span>Billing address is the same as shipping address</span>
                    </label>
                </div>

                <div class="input-row">
                    ${createInputField({
                        id: "billing-address-line1",
                        placeholder: "Mainstreet 12",
                        label: "Address Line 1",
                        required: true
                    })}
                    
                    ${createInputField({
                        id: "billing-address-line2",
                        placeholder: "Appartement",
                        label: "Address Line 2"
                    })}
                </div>
                
                <div class="input-row">
                    ${createInputField({
                        id: "billing-city",
                        placeholder: "Amsterdam",
                        label: "City",
                        required: true
                    })}
                    
                    ${createInputField({
                        id: "billing-country",
                        placeholder: "Netherlands",
                        label: "Country",
                        required: true
                    })}
                </div>
                <div class="input-row">
                    ${createInputField({
                        id: "billing-postal-code",
                        placeholder: "1234 AB",
                        label: "Zip/Postal Code",
                        required: true
                    })}
                </div>
            </div>
        `;
    }
}

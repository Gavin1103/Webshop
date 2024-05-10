// In the BillingAddress component
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {createInputField} from "../../../helpers/formHelpers";

@customElement("billing-address")
export class BillingAddress extends LitElement {
    public static styles = [PersonalInfoStyle];

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
                        id: "address-line-1-input",
                        placeholder: "Mainstreet 12",
                        label: "Address Line 1"
                    })}
                    
                    ${createInputField({
                        id: "address-line-2-input",
                        placeholder: "Appartement",
                        label: "Address Line 2"
                    })}
                </div>
                
                <div class="input-row">
                    ${createInputField({
                        id: "city-input",
                        placeholder: "Amsterdam",
                        label: "City"
                    })}
                    
                    ${createInputField({
                        id: "country-input",
                        placeholder: "Netherlands",
                        label: "Country"
                    })}
                </div>
                <div class="input-row">
                    ${createInputField({
                        id: "zipcode-city-input",
                        placeholder: "1234 AB",
                        label: "Zip/Postal Code"
                    })}
                </div>
            </div>
        `;
    }
}

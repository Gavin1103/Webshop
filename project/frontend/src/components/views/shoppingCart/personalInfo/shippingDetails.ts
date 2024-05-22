import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {createInputField} from "../../../helpers/formHelpers";
import ShippingDetailsStyle from "../../../../styles/shoppingCart/personalInfo/shippingDetailsStyle";
import InputFieldStyle from "../../../../styles/shoppingCart/inputFieldStyle";

@customElement("shipping-details")
export class ShippingDetails extends LitElement {
    public static styles = [PersonalInfoStyle, ShippingDetailsStyle, InputFieldStyle];

    protected render(): TemplateResult {
        return html`
            <div class="block-container">
                <h2 class="title">Shipping Address</h2>

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

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
                        id: "shipping-address-line1",
                        placeholder: "Mainstreet 12",
                        label: "Address Line 1",
                        required: true
                    })}

                    ${createInputField({
                        id: "shipping-address-line2",
                        placeholder: "Appartement",
                        label: "Address Line 2"
                    })}
                </div>

                <div class="input-row">
                    ${createInputField({
                        id: "shipping-city",
                        placeholder: "Amsterdam",
                        label: "City",
                        required: true
                    })}

                    ${createInputField({
                        id: "shipping-country",
                        placeholder: "Netherlands",
                        label: "Country",
                        required: true
                    })}
                </div>
                <div class="input-row">
                    ${createInputField({
                        id: "shipping-postal-code",
                        placeholder: "1234 AB",
                        label: "Zip/Postal Code",
                        required: true
                    })}
                </div>
            </div>
        `;
    }
}

import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import PersonalDetailsStyle from "../../../../styles/shoppingCart/personalInfo/personalDetailsStyle";
import PersonalInfoStyle from "../../../../styles/shoppingCart/personalInfo/personalInfoStyle";
import {createInputField} from "../../../helpers/formHelpers";

@customElement("personal-details")
export class PersonalDetails extends LitElement {
    public static styles = [PersonalInfoStyle, PersonalDetailsStyle];
    protected render(): TemplateResult {
        return html`
            <div class="block-container">
                <h2 class="title">Personal Details</h2>

                <div class="input-row">
                    ${createInputField({
                        id: "first-name-input",
                        placeholder: "Enter Your First Name...",
                        label: "First name"
                    })}
                    ${createInputField({
                        id: "surname-input",
                        placeholder: "Enter Your Surname...",
                        label: "Surname"
                    })}
                </div>
                <div class="input-row">
                    ${createInputField({
                        id: "email-input",
                        placeholder: "Enter Your Email...",
                        label: "Email",
                        type: "email"
                    })}
                    ${createInputField({
                        id: "phone-number-input",
                        placeholder: "Enter Your Phone Number...",
                        label: "Phone Number",
                        type: "tel"
                    })}
                </div>
            </div>
        `;
    }
}

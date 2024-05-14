import {css, html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import { BaseAuthComponent } from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import {UserRegisterFormModel} from "../../../../types/formModels";
import {UserAuthResponse} from "../../../../types/responses/UserAuthResponse";

@customElement("register-component")
export class RegisterComponent extends BaseAuthComponent {
    public static styles = css`
        .strength-bar {
            height: 10px;
            background-color: red;
            transition: width 0.5s ease, background-color 0.5s ease;
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 40%;
        }
    `;

    protected async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (this.password === this.confirmPassword) {
            this.error = "";
        } else {
            this.error = "Passwords do not match";
        }

        const user: UserRegisterFormModel = {
            username: this.username,
            email: this.email,
            phoneNumber: this.phoneNumber,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password
        };

        const userService: UserService = new UserService();
        const loggedIn: UserAuthResponse = await userService.register(user);

        console.log(loggedIn);
        if(loggedIn.success){
            //document.location.pathname = "/home";
            return;
        }

        else if(!loggedIn.success && loggedIn.message){
            this.error = loggedIn.message;
            return;
        }


        this.error = "Registration failed";
    }

    protected render(): TemplateResult {
        return html`
      <form @submit="${this.handleSubmit}">
        ${this.createInput("text", this.username, "username", "Username")}
        ${this.createInput("text", this.phoneNumber, "phoneNumber", "Phone Number")}
        ${this.createInput("text", this.firstname, "firstname", "First Name")}
        ${this.createInput("text", this.lastname,"lastname", "Last Name")}
        ${this.renderForm()}
        <input type="password" .value="${this.confirmPassword}" @input="${(e: any): string => this.confirmPassword = e.target.value}" placeholder="Confirm Password">
        <div class="strength-bar" style="width: ${this.passwordStrength}%; background-color: ${this.passwordStrength > 60 ? "darkgreen" : this.passwordStrength > 30 ? "yellow" : "red"};"></div>
        <button type="submit">Register</button>
      </form>
    `;
    }
}

import {html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import {BaseAuthComponent} from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import {UserRegisterFormModel} from "../../../types/UserRegisterFormModel";
import authInputStyle from "../../../styles/authentication/authInputStyle";
import {navigateTo} from "../../router";
import {UserAuthResponse} from "../../../types/UserAuthResponse";

@customElement("register-component")
export class RegisterComponent extends BaseAuthComponent {
    public static styles = [authInputStyle];

    protected async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        this.errors = [];

        if (this.password !== this.confirmPassword) {
            this.errors.push("Passwords do not match");
        }

        if (this.errors.length > 0) {
            this.requestUpdate();
            return;
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

        if(loggedIn.success){
            navigateTo("/");
            return;
        }

        else if(!loggedIn.success && loggedIn.message){
            this.errors.push(loggedIn.message);
            this.requestUpdate();
            return;
        }


        this.errors.push("Registration failed");
    }

    protected render(): TemplateResult {
        return html`
            <form @submit="${this.handleSubmit}">
                <h1 class="form-title">Register</h1>
                <h3 class="form-message">Please enter your details</h3>
                ${this.createInput("text", this.username, "username", "Username")}
                <input class="form-input" required type="tel" .value="${this.phoneNumber}" @input="${(e: Event): void => this.updateField("phoneNumber", e)}" placeholder="Phone Number" pattern="^$|[0-9]{10}">
                ${this.createInput("text", this.firstname, "firstname", "First Name")}
                ${this.createInput("text", this.lastname, "lastname", "Last Name")}
                ${this.renderForm()}
                ${this.renderPasswordStrengthBar()}
                ${this.createInput("password", this.confirmPassword, "confirmPassword", "Confirm password")}
                ${this.renderErrors(this.errors)}
                <button class="form-submit" type="submit">Register</button>
                <p class="form-redirect-message">Already have an account? <a @click=${this.goToLogin}>login here</a></p>
            </form>
        `;
    }
}

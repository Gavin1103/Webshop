import {html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import {BaseAuthComponent} from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import authInputStyle from "../../../styles/authentication/authInputStyle";

@customElement("forgot-password-component")
export class ForgotPasswordComponent extends BaseAuthComponent {

    public static styles = [authInputStyle];

    protected async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        this.errors = [];

        const userService: UserService = new UserService();
        const response = await userService.forgotPassword(this.email);

        if(response.success){
            // handle success
        }
        else if(!response.success && response.message){
            this.errors.push(response.message);
            this.requestUpdate();
            return;
        }
    }

    protected render(): TemplateResult {
        return html`
            <form @submit="${this.handleSubmit}">
                <h1 class="form-title">Forgot Password</h1>
                <h3 class="form-message">Please enter your email address</h3>
                ${this.createInput("email", this.email, "email", "Email")}
                ${this.renderErrors(this.errors)}
                <button class="form-submit" type="submit">Submit</button>
                <p class="form-redirect-message">Remembered your password? <a href="/login">Login here</a></p>
            </form>
        `;
    }
}

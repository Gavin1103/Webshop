import {html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import {BaseAuthComponent} from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import authInputStyle from "../../../styles/authentication/authInputStyle";

@customElement("reset-password-component")
export class ResetPasswordComponent extends BaseAuthComponent {

    public static styles = [authInputStyle];
    private resetToken: string = "";

    connectedCallback() {
        super.connectedCallback();
        this.resetToken = window.location.hash.split("/").pop() || "";
    }

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

        const userService: UserService = new UserService();
        const response = await userService.resetPassword(this.resetToken, this.password);

        if(response.success){
            this.errors.push("Your password has been reset. You can now log in with your new password.");
            this.requestUpdate();
            return;
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
                <h1 class="form-title">Reset Password</h1>
                <h3 class="form-message">Please enter your new password</h3>
                <input class="form-input" type="password" .value="${this.password}" @input="${this.handlePasswordInput}" placeholder="Password">
                ${this.renderPasswordStrengthBar()}
                ${this.createInput("password", this.confirmPassword, "confirmPassword", "Confirm New Password")}
                ${this.renderErrors(this.errors)}
                <button class="form-submit" type="submit">Reset Password</button>
                <p class="form-redirect-message">Remembered your password? <a  @click=${this.goToLogin}>Login here</a></p>
            </form>
        `;
    }
}
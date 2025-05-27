import {html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import { BaseAuthComponent } from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import authInputStyle from "../../../styles/authentication/authInputStyle";
import {navigateTo} from "../../router";
import {UserAuthResponse} from "../../../types/UserAuthResponse";

@customElement("login-component")
export class LoginComponent extends BaseAuthComponent {

    public static styles = [authInputStyle];

    protected async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        this.errors = [];

        const userService: UserService = new UserService();
        const response: UserAuthResponse = await userService.login({email: this.email, password: this.password});

        if(response.success){
            navigateTo("/");
            return;
        }
        else if(!response.success && response.message){
            this.errors.push(response.message);
            this.requestUpdate();
            return;
        }
    }

    private goToForgotPassword(): void {
        navigateTo("/forgot-password");
    }

    protected render(): TemplateResult {
        return html`
      <form @submit="${this.handleSubmit}">
        <h1 class="form-title">Login here</h1>
        <h3 class="form-message">Hello, welcome back!</h3>
        ${this.renderForm()}
        ${this.renderErrors(this.errors)}
        <button class="form-submit" type="submit">Login</button>
        <p class="form-redirect-message">Don't have an account? <a @click=${this.goToRegister}>sign up here</a></p>
        <p class="form-redirect-message"><a @click=${this.goToForgotPassword}>Forgot password?</a></p>

      </form>
    `;
    }
}
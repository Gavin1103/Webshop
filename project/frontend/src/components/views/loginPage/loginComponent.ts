import {html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import { BaseAuthComponent } from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import {UserAuthResponse} from "../../../../types/responses/UserAuthResponse";
import authInputStyle from "../../../styles/authentication/authInputStyle";
import LoginStyle from "../../../styles/authentication/loginPage/loginStyle";
import {navigateTo} from "../../helpers/helpers";

@customElement("login-component")
export class LoginComponent extends BaseAuthComponent {

    public static styles = [authInputStyle, LoginStyle];

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


    protected render(): TemplateResult {
        return html`
      <form @submit="${this.handleSubmit}">
        <h1 class="form-title">Login here</h1>
        <h3 class="form-message">Hello, welcome back!</h3>
        ${this.renderForm()}
        ${this.renderErrors(this.errors)}
        <button class="form-submit" type="submit">Login</button>
        <p class="form-redirect-message">Don't have an account? <a href="/register">sign up here</a></p>
      </form>
    `;
    }
}
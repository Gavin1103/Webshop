import {css, html, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import { BaseAuthComponent } from "../../BaseAuthComponent";
import {UserService} from "../../../services/UserService";
import {UserAuthResponse} from "../../../../types/responses/UserAuthResponse";

@customElement("login-component")
export class LoginComponent extends BaseAuthComponent {

    public static styles = css`
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

        const userService: UserService = new UserService();
        const response: UserAuthResponse = await userService.login({email: this.email, password: this.password});

        if(response.success){
            document.location.pathname = "/home";
            return;
        }
        else if(!response.success && response.message){
            this.error = response.message;
            return;
        }
    }

    protected render(): TemplateResult {
        return html`
      <form @submit="${this.handleSubmit}">
        ${this.renderForm()}
        <button type="submit">Login</button>
      </form>
    `;
    }
}
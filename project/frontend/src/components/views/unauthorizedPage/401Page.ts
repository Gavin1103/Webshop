import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {navigateTo} from "../../router";
import UnauthorizedStyle from "../../../styles/authentication/401Page/UnauthorizedStyle";

@customElement('unauthorized-page')
export class UnauthorizedPage extends LitElement {
    static styles = [UnauthorizedStyle];

    private goToHomepage(): void {
        navigateTo("/");
    }

    render() {
        return html`
      <h1>401 Unauthorized</h1>
      <p>You do not have the necessary permissions to access this page.</p>
      <a @click=${this.goToHomepage} >Go to Home Page</a>
    `;
    }
}
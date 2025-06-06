import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-users")
export class UsersPage extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div>
                <h1>Users Page</h1>
                <p>Manage all user information</p>
                <user-table></user-table>
            </div>
        `;
    }
}
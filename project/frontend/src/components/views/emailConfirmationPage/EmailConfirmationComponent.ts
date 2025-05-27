import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {navigateTo} from "../../router";

@customElement('email-confirmation')
export class EmailConfirmation extends LitElement {
    @property() token = '';

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }

        h1 {
            color: #333;
        }

        p {
            color: #666;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => navigateTo("/login"), 5000);
    }

    render() {
        return html`
            <h1>Email Confirmation</h1>
            <p>Your email has been confirmed successfully.</p>
        `;
    }
}
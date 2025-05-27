import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import ThankYouPageStyle from "../../../styles/ThankYouPageStyle";
import {navigateTo} from "../../router";

@customElement("thank-you-page")
export class ThankYouPage extends LitElement {

    public static styles = [ThankYouPageStyle];

    public firstUpdated(): void {
        setTimeout(() => {
            navigateTo("/");
        }, 5000);
    }

    public render(): TemplateResult {
        return html`
            <div class="container">
                <h1>Thank you for your purchase</h1>
                <p>Your order has been placed and is being processed.</p>
                <p>You will receive an email confirmation shortly.</p>
            </div>
        `;
    }
}
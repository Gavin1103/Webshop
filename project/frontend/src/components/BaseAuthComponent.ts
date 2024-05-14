import { LitElement, html, css } from "lit-element";
import {TemplateResult} from "lit";
import {property} from "lit/decorators.js";

type Field = "email" | "password" | "username" | "phoneNumber" | "firstname" | "lastname" | "confirmPassword";

export abstract class BaseAuthComponent extends LitElement {
    @property({ type: String }) public email = "";
    @property({ type: String }) public password = "";
    @property({ type: String }) public error = "";
    @property({ type: Number }) public passwordStrength = 0;
    @property({ type: String }) public username = "";
    @property({ type: String }) public phoneNumber = "";
    @property({ type: String }) public firstname = "";
    @property({ type: String }) public lastname = "";
    @property({ type: String }) public confirmPassword = "";

    public static styles = css`
        /* styles here */
    `;

    protected createInput(type: string, value: string, field: Field, placeholder: string): TemplateResult {
        return html`
            <input type="${type}" .value="${value}" @input="${(e: Event): void => this.updateField(field, e)}" placeholder="${placeholder}">
        `;
    }

    public updateField(field: Field, e: Event): void {
        this[field] = (e.target as HTMLInputElement).value;
    }

    private handlePasswordInput(e: any): void {
        this.password = e.target.value;
        this.passwordStrength = this.getPasswordStrength(this.password);
    }

    private getPasswordStrength(password: string): number {
        if (password.length > 8) {
            return 100;
        } else if (password.length > 5) {
            return 60;
        } else {
            return 30;
        }
    }

    protected renderForm(): TemplateResult {
        return html`
            ${this.createInput("text", this.email, "email", "Email")}
            <input type="password" .value="${this.password}" @input="${this.handlePasswordInput}" placeholder="Password">
            <p>${this.error}</p>
        `;
    }

    protected abstract handleSubmit(e: Event): void;
}
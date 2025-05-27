import { LitElement, html } from "lit-element";
import {TemplateResult} from "lit";
import {property} from "lit/decorators.js";
import {passwordStages} from "../enums/passwordStrength";
import {navigateTo} from "./router";

type Field = "email" | "password" | "username" | "phoneNumber" | "firstname" | "lastname" | "confirmPassword";

export abstract class BaseAuthComponent extends LitElement {
    @property({ type: String }) public email = "";
    @property({ type: String }) public password = "";
    @property({ type: String }) public errors: string[] = [];
    @property({ type: passwordStages }) public passwordStrength = passwordStages.WEAK;
    @property({ type: String }) public username = "";
    @property({ type: String }) public phoneNumber = "";
    @property({ type: String }) public firstname = "";
    @property({ type: String }) public lastname = "";
    @property({ type: String }) public confirmPassword = "";

    public static styles: any[] = [];


    /**
     * This method creates an input field with the specified parameters.
     *
     * @param type - The type of the input field.
     * @param value - The current value of the input field.
     * @param field - The name of the field.
     * @param placeholder - The placeholder text for the input field.
     * @returns A TemplateResult representing the input field.
     */
    protected createInput<T extends Field>(type: string, value: string, field: T, placeholder: string): TemplateResult {
        return html`
            <input class="form-input" required type="${type}" .value="${value}" @input="${(e: Event): void => this.updateField(field, e)}" placeholder="${placeholder}">
        `;
    }

    /**
     * This method updates the specified field with the value from the event target.
     *
     * @param field - The name of the field to update.
     * @param e - The event containing the new value.
     */
    public updateField(field: Field, e: Event): void {
        this[field] = (e.target as HTMLInputElement).value;
    }

    protected goToLogin(): void {
        navigateTo("/login");
    }

    protected goToRegister(): void {
        navigateTo("/register");
    }

    /**
     * This method handles password input events. It updates the password and passwordStrength properties.
     *
     * @param e - The event containing the new password.
     */
    protected handlePasswordInput(e: any): void {
        this.password = e.target.value;
        this.passwordStrength = this.getPasswordStrength(this.password);
    }

    /**
     * This method calculates the strength of a password based on its length and variety of characters.
     *
     * @param password - The password to check.
     * @returns The strength of the password.
     */
    private getPasswordStrength(password: string): passwordStages {
        let strength: number = 0;
        const varietyChecks: number[] = [
            (password.match(/[A-Z]/g) || []).length, // Uppercase Letters
            (password.match(/[a-z]/g) || []).length, // Lowercase Letters
            (password.match(/[0-9]/g) || []).length, // Numbers
            (password.match(/[^a-zA-Z0-9]/g) || []).length // Non-alphanumeric characters
        ];

        varietyChecks.forEach((check) => {
            strength += check > 0 ? 25 : 0;
        });

        return strength === 100 ? passwordStages.STRONG :
               strength === 75 ? passwordStages.GOOD :
               strength === 50 ? passwordStages.FAIR :
                                 passwordStages.WEAK;
    }

    /**
     * This method renders the password strength bar.
     *
     * @returns A TemplateResult representing the password strength bar.
     */
    protected renderPasswordStrengthBar(): TemplateResult {
        return html`
            <div class="strength-wrapper">
                <div class="strength-bar">
                    <div class="strength-item"
                         style="background-color: ${this.passwordStrength >= passwordStages.WEAK ? this.getPasswordColor() : "lightgray"};"></div>
                    <div class="strength-item"
                         style="background-color: ${this.passwordStrength >= passwordStages.FAIR ? this.getPasswordColor() : "lightgray"};"></div>
                    <div class="strength-item"
                         style="background-color: ${this.passwordStrength >= passwordStages.GOOD ? this.getPasswordColor() : "lightgray"};"></div>
                    <div class="strength-item"
                         style="background-color: ${this.passwordStrength >= passwordStages.STRONG ? this.getPasswordColor() : "lightgray"};"></div>
                </div>
                <p class="password-strength-text" style="color: ${this.getPasswordColor()}">${passwordStages[this.passwordStrength]}</p>
            </div>
        `;
    }

    private getPasswordColor(): string {
        switch (this.passwordStrength) {
            case passwordStages.WEAK:
                return "red";
            case passwordStages.FAIR:
                return "orange";
            case passwordStages.GOOD:
                return "green";
            case passwordStages.STRONG:
                return "darkgreen";
            default:
                return "lightgray";
        }
    }

    /**
     * This method renders the form fields.
     *
     * @returns A TemplateResult representing the form fields.
     */
    protected renderForm(): TemplateResult {
        return html`
            ${this.createInput("email", this.email, "email", "Email")}
            <input class="form-input" type="password" .value="${this.password}" @input="${this.handlePasswordInput}" placeholder="Password">
        `;
    }

    /**x
     * This method renders multiple error messages.
     *
     * @param errors - The array of error messages.
     * @returns A TemplateResult representing the error messages.
     */
    protected renderErrors(errors: string[]): TemplateResult {
        return html`
        ${errors.map(error => html`<p>${error}</p>`)}
    `;
    }

    /**
     * handleSubmit is an abstract method that handles form submission. It must be implemented by subclasses.
     *
     * @param e - The event triggered by form submission.
     */
    protected abstract handleSubmit(e: Event): void;
}
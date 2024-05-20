import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyle from "../styles/globalStyle";

@customElement("review-component")
export class ReviewComponent extends LitElement {
    public static styles = [
        globalStyle,
        css`
           
        `,
    ];

    public render(): TemplateResult {
        return html`
           <p>user reviews</p>
        `;
    }
}

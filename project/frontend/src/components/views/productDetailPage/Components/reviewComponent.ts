import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("review-component")
export class ReviewComponent extends LitElement {



    public static styles = css`

  `;

    public render(): TemplateResult {
        return html`

            <p>Review</p>
      `;
    }
}

import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("description-component")
export class DescriptionComponent extends LitElement {



    public static styles = css`

  `;

    public render(): TemplateResult {
        return html`

            <p>description</p>
      `;
    }
}

import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("button-component")
export class ButtonComponent extends LitElement {

    @property({ type: String })
    private text: string = "";

    public static styles = css`
        button{
            width:100px;
            height:40px;
            background-color:red;
            border-radius:10px;

        }
  `;

    public render(): TemplateResult {
        return html`

            <button>${this.text}</button>
      `;
    }
}

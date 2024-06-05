import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyle from "../../styles/globalStyle";
import customButtonComponentStyle from "../../styles/components/buttons/customButtonComponentStyle";

@customElement("custom-button-component")
export class CustomButtonComponent extends LitElement {

    @property({ type: String })
    private text: string = "";

    @property({ type: String })
    private backgroundColor: string = "";

    public static styles = [
        globalStyle,
        customButtonComponentStyle
    ];
    
   



    public updated(changedProperties: Map<string | number | symbol, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has("backgroundColor")) {
            const color: string = this.backgroundColor ? this.backgroundColor : "lightgrey";
            this.style.setProperty("--background-color", color);
        }
    }


    public render(): TemplateResult {
        return html`

            <button sty>${this.text}</button>
      `;
    }
}

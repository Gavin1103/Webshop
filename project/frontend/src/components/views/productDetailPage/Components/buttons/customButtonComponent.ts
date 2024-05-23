import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyle from "../../styles/globalStyle";

@customElement("custom-button-component")
export class CustomButtonComponent extends LitElement {

    @property({ type: String })
    private text: string = "";

    @property({ type: String })
    private backgroundColor: string = "";

    public static styles = [
        globalStyle,
        css`
        button {
            width: 190px;
            height: 40px;
            border: none;
            background-color: var(--background-color, #5AB2FF);
            border-radius: 5px;
            color: white;
            font-size: 16px;
            transition: background-color 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
    
        button:hover {
            cursor: pointer;
            background-color: var(--background-hover-color, #4A92D8);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        }
    
        button:active {
            background-color: var(--background-active-color, #357ABD);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        `
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

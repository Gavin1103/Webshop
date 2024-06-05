import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import descriptionComponentStyle from "../styles/components/descriptionComponentStyle";

@customElement("description-component")
export class DescriptionComponent extends LitElement {
    @property({ type: String })
    private productCategory: string = "";
    
    @property({type: String})
    private productDescription: string = "";

    public static styles = [
        descriptionComponentStyle
    ]

    public render(): TemplateResult {
        return html`
            <section>
                <p><strong>Category: ${this.productCategory}</strong></p>
                <p>${this.productDescription}</p>
            
            </section>
        `;
    }
}

import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import categoryCardHorizontalStyle from "../styles/categoryCardHorizontalStyle";

@customElement("category-card-horizontal")
export class CategoryCardHorizontal extends LitElement {
    @property({ type: String })
    public categoryName: string = "";

    @property({ type: String })
    public categoryImage: string = "https://image.api.playstation.com/vulcan/ap/rnd/202107/1612/Y5RHNmzAtc6sRYwZlYiKHAxN.png";

    public static styles = [categoryCardHorizontalStyle];

    public render(): TemplateResult {
        return html`
            <div class="category-card">
                <img src="${this.categoryImage}" alt="Category Image">
                <p>${this.categoryName}</p>
            </div>
        `;
    }
}
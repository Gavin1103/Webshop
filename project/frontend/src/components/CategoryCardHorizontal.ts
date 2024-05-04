import {css, html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";


@customElement("category-card-horizontal")
export class CategoryCardHorizontal extends LitElement {
    @property({ type: String })
    public categoryName: string = "";

    @property({ type: String })
    public categoryImage: string = "https://image.api.playstation.com/vulcan/ap/rnd/202107/1612/Y5RHNmzAtc6sRYwZlYiKHAxN.png";

    public static styles = css `
        .category-card {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.75);
            margin: 0 10% 10% 10%;
            border-radius: 10px;
            box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            img {
                width: 50%;
                height: auto;
                margin-right: 20px;
                border-radius: 10px 0 0 10px;
            }
        }

        .category-card:hover {
            transform: scale(1.05);
            box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.2);
        }
    `;

    public render(): TemplateResult {
        return html`
            <div class="category-card">
                <img src="${this.categoryImage}" alt="Category Image">
                <p>${this.categoryName}</p>
            </div>
        `;
    }
}
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import categoryCardHorizontalStyle from "../styles/categoryCardHorizontalStyle";
import {Category} from "../../types/responses/Category";


@customElement("category-card-horizontal")
export class CategoryCardHorizontal extends LitElement {
    @property({type: Array})
    public categoryList: Category[] | undefined;

    public static styles = [categoryCardHorizontalStyle];

    public render(): TemplateResult {
        return html`
            ${this.categoryList ?this.categoryList.map(category => html`
                <div class="category-card">
                    <img src="${category.image}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `) : ""}
        `;
    }
}
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import categoryCardHorizontalStyle from "../styles/categoryCardHorizontalStyle";
import {CategoryResponse} from "../../types/responses/CategoryResponse";
import {navigateTo} from "./router";

@customElement("category-card-horizontal")
export class CategoryCardHorizontal extends LitElement {
    @property({type: Array})
    public categoryList: CategoryResponse[] | undefined;

    private redirectToCategoryPage(id: number): void {
        navigateTo(`category/${id}`);
    }

    public static styles = [categoryCardHorizontalStyle];

    public render(): TemplateResult {
        return html`
            ${this.categoryList ? this.categoryList.map(category => html`
                <div class="category-card" tabindex="1"
                     @click="${(): void => this.redirectToCategoryPage(category.id)}">
                    <img src="${category.image}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `) : ""}
        `;
    }
}
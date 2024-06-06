import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import categoryCardHorizontalStyle from "../styles/categoryCardHorizontalStyle";
import {CategoryResponse} from "../types/product/CategoryResponse";
import {navigateTo} from "./router";

@customElement("category-card-horizontal")
export class CategoryCardHorizontal extends LitElement {
    @property({type: Array})
    public categoryList: CategoryResponse[] | undefined;

    private redirectToCategoryPage(name: string): void {
        navigateTo(`/category/${name}`);
    }

    public static styles = [categoryCardHorizontalStyle];

    public render(): TemplateResult {
        return html`
            ${this.categoryList ? this.categoryList.map(category => html`
                <div class="category-card" tabindex="1"
                     @click="${(): void => this.redirectToCategoryPage(category.name)}">
                    <img src="${category.image}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `) : ""}
        `;
    }
}
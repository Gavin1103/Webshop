import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import "./category-card-horizontal";
import "./search-bar";
import navigationBarStyle from "../styles/navigationBarStyle";
import {CategoryResponse} from "../types/CategoryResponse";
import {navigateTo} from "./router";

@customElement("navigation-bar")
export class NavigationBar extends LitElement {
    public static styles = [navigationBarStyle];


    private sidebarVisible: boolean = false;
    private categoryList: CategoryResponse | undefined;


    public connectedCallback(): void {
        super.connectedCallback();
    }

    // private async loadData(): Promise<void> {
    //     const categoryService: CategoryService = new CategoryService();
    //
    //     try {
    //         this.categoryList = await categoryService.getCategoriesWithImage();
    //     } catch (error) {
    //         console.error("Error loading data: ", error);
    //     } finally {
    //         this.requestUpdate();
    //     }
    // }

    private toggleSidebar(): void {
        this.sidebarVisible = !this.sidebarVisible;
        this.requestUpdate();
    }

    private closeSidebar(): void {
        this.sidebarVisible = false;
        this.requestUpdate();
    }

    private goToShoppingCart(): void {
        navigateTo("/cart");
    }

    public render(): TemplateResult {
        return html`
            <nav class="navigation">

                <img
                    @click=${this.toggleSidebar}
                    @keydown=${(e: KeyboardEvent): void => {
                        if (e.key === "Enter") this.toggleSidebar();
                    }}
                    class="icon" src="../assets/image/icons/menu-icon.svg" alt="Side menu button"
                    tabindex="0">

                <search-bar></search-bar>

                <div class="links">
                    <img class="icon user-icon" src="../assets/image/icons/user-icon.svg"
                         alt="profile button">

                    <img @click=${this.goToShoppingCart} class="icon cart-icon-"
                         src="../assets/image/icons/cart-icon.svg" alt="cart button">
                </div>
            </nav>


            <div class="sidebar" style=${this.sidebarVisible ? "left: 0;" : ""}>
                <div class="top-container-close">

                    <img
                        @click=${this.closeSidebar}
                        class="close-button" src="../assets/image/icons/close-icon.svg" alt="close button"
                    />
                </div>

                <div class="category-container">
                    <category-card-horizontal
                        .categoryList="${this.categoryList}">
                    </category-card-horizontal>
                </div>
            </div>


        `;
    }
}
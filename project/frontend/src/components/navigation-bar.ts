import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import "./category-card-horizontal";
import "./search-bar";
import navigationBarStyle from "../styles/navigationBarStyle";

@customElement("navigation-bar")
export class NavigationBar extends LitElement {
    private sidebarVisible: boolean = false;


    private toggleSidebar(): void {
        this.sidebarVisible = !this.sidebarVisible;
        this.requestUpdate();
    }

    private closeSidebar(): void {
        this.sidebarVisible = false;
        this.requestUpdate();
    }

    public static styles = [navigationBarStyle];


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
                    <img class="icon user-icon" src="../assets/image/icons/user-icon.svg" alt="profile button">

                    <img class="icon cart-icon-" src="../assets/image/icons/cart-icon.svg" alt="cart button">
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
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>
                </div>
            </div>


        `;
    }
}
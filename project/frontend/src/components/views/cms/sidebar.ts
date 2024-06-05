import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from "lit/decorators.js";
import sidebarStyles from "../../../styles/cms/sidebarStyles";

@customElement('cms-sidebar')
export class Sidebar extends LitElement {
    @property({type: Function}) private navigate!: (path: string) => void;

    public static styles = [sidebarStyles];

    protected render(): TemplateResult {
        return html`
            <div class="sidebar">
                <div class="sidebar-container">
                    <div class="sidebar-element">
                        <div class="search-bar">
                            <div class="search-input">
                                <img class="icon search-icon" src="../assets/image/icons/search-icon.svg"
                                     alt="search button">
                                <input
                                    type="text"
                                    placeholder="Search..."

                                />

                            </div>
                        </div>
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice')}">
                        <span>Dashboard</span>
                        <img src="/assets/image/icons/cms/home.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/statistics')}">
                        <span>Statistics</span>
                        <img src="/assets/image/icons/cms/statistics.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/orders')}">
                        <span>Orders</span>
                        <img src="/assets/image/icons/cms/orders.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/products')}">
                        <span>Products</span>
                        <img src="/assets/image/icons/cms/products.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/reviews')}">
                        <span>Reviews</span>
                        <img src="/assets/image/icons/cms/reviews.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/users')}">
                        <span>Users</span>
                        <img src="/assets/image/icons/cms/users.svg" alt="Dashboard Icon">
                    </div>
                    <div class="sidebar-element" @click="${() => this.navigate('/backoffice/tools')}">
                        <span>Tools</span>
                        <img src="/assets/image/icons/cms/tools.svg" alt="Dashboard Icon">
                    </div>
                </div>
            </div>
        `;
    }
}

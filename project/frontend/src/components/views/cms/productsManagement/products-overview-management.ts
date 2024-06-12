import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";
import {EditPopUp} from "./edit-pop-up";
import {Product} from "../../../../types/product/Product";
import {ProductService} from "../../../../services/ProductService";
import {AddPopUp} from "./add-pop-up";
import "./confirmation-pop-up";
import {ConfirmationPopUp} from "./confirmation-pop-up";
import {truncateStringFront} from "../../../helpers/helpers";

@customElement("products-overview-management")
export class ProductsOverviewManagement extends LitElement {
    public static styles = [productOverviewManagementStyle];

    private productService: ProductService = new ProductService();

    private productsList: Product[] | undefined;

    public async connectedCallback() {
        super.connectedCallback();
        await this.loadProducts();
        this.requestUpdate();
    }

    private async loadProducts(): Promise<void> {
        this.productsList = await this.productService.getAllProducts();
    }

    public async editProduct(productId: number | undefined): Promise<void> {
        if (productId) {
            const popup = this.shadowRoot?.querySelector('edit-pop-up') as EditPopUp;
            await popup.open(productId);
        }
    }

    public async addProduct(): Promise<void> {
        const popup = this.shadowRoot?.querySelector('add-pop-up') as AddPopUp;
        await popup.open();
    }

    public  confirmDeleteProduct(productId: number | undefined): void {
        if (productId) {
            const popup = this.shadowRoot?.querySelector('confirmation-pop-up') as ConfirmationPopUp;
            popup.openPopup(productId);
        }
    }

    public async deleteProduct(productId: number | undefined): Promise<void> {
        if(productId) {
            await this.productService.deleteProduct(productId);
            await this.loadProducts();
            this.requestUpdate();
        }
    }

    public render(): TemplateResult {
        return html`
            <cms-header
                iconUrl="./assets/image/icons/productsManagement/tag-black.svg"
                title="Products"
                subTitle="Manage all item information"
                !redirectoption=1
                redirectUrl="/"
                redirectText="to home"
            ></cms-header>
            
            <cms-search
                @search-result="${this.handleSearch}"
            ></cms-search>

            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Current Price</th>
                    <th>Original Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>0</td>
                    <td>Add new product</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>
                        <button @click="${this.addProduct}" class="btn btn-add">Add</button>
                    </td>
                </tr>
                ${this.productsList? this.productsList.map(product => html`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${truncateStringFront(product.description, 30)}</td>
                        <td>${product.stock}</td>
                        <td>${product.currentPrice}</td>
                        <td>${product.originalPrice}</td>
                        <td>${product.productCategory.name}</td>
                        <td>
                            <button @click="${() => this.editProduct(product.id)}" class="btn btn-change">Edit</button>
                            <button @click="${() => this.confirmDeleteProduct(product.id)}" class="btn btn-delete">Delete</button>
                        </td>
                    </tr>
                `): ""}
                </tbody>
            </table>

            <edit-pop-up
                @product-updated="${this.handleProductUpdated}"
            ></edit-pop-up>
            
            <add-pop-up
                @product-added="${this.handleProductUpdated}"
            ></add-pop-up>
            
            <confirmation-pop-up
                @confirm-delete="${(e: CustomEvent) => this.deleteProduct(e.detail.productId)}"
            ></confirmation-pop-up>
        `;
    }

    private async handleProductUpdated() {
        await this.loadProducts();
        this.requestUpdate();
    }

    private handleSearch(event: CustomEvent) {
        this.productsList = event.detail.products;
        this.requestUpdate();
    }
}

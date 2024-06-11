import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";
import {EditPopUp} from "./edit-pop-up";
import {Product} from "../../../../types/product/Product";
import {ProductService} from "../../../../services/ProductService";



@customElement("products-overview-management")
export class ProductsOverviewManagement extends LitElement {
    public static styles = [productOverviewManagementStyle];

    private productService: ProductService = new ProductService();

    private productsList: Product[] | undefined

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



    public render(): TemplateResult {
        return html `
            <cms-header
                iconUrl="./assets/image/icons/productsManagement/tag-black.svg"
                title="Products"
                subTitle="Manage all item information"
                !redirectoption=1
                redirectUrl="/"
                redirectText="to home"
            ></cms-header>
            
            <cms-search></cms-search>

            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Current Price</th>
                    <th>Original Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                ${this.productsList? this.productsList.map(product => html`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.stock}</td>
                        <td>${product.currentPrice}</td>
                        <td>${product.originalPrice}</td>
                        <td>
                            <button @click="${() => this.editProduct(product.id)}" class="btn btn-change">Edit</button>
                            <button class="btn btn-delete">Delete</button>
                        </td>
                    </tr>
                `): ""}
                </tbody>
            </table>


            <edit-pop-up
                @product-updated="${this.handleProductUpdated}"
            ></edit-pop-up>
            
            
        `;
    }

    private async handleProductUpdated() {
        await this.loadProducts();
        this.requestUpdate()
    }
}
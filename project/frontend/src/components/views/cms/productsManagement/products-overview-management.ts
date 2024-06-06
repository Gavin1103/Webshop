import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";
import {ProductOverviewCmsResponse} from "../../../../types/product/ProductOverviewCmsResponse";
import {EditPopUp} from "./edit-pop-up";



@customElement("products-overview-management")
export class ProductsOverviewManagement extends LitElement {
    public static styles = [productOverviewManagementStyle];

    private ProductsList: ProductOverviewCmsResponse[] = [
        {
            id: 101,
            name: 'Sample Product 1',
            description: 'This is a sample product description for product 1.',
            stock: 50,
            currentPrice: 10.99,
            originalPrice: 15.99
        },
        {
            id: 102,
            name: 'Sample Product 2',
            description: 'This is a sample product description for product 2.',
            stock: 30,
            currentPrice: 12.99,
            originalPrice: 18.99
        },
        {
            id: 103,
            name: 'Sample Product 3',
            description: 'This is a sample product description for product 3.',
            stock: 20,
            currentPrice: 9.99,
            originalPrice: 14.99
        },
        {
            id: 104,
            name: 'Sample Product 4',
            description: 'This is a sample product description for product 4.',
            stock: 10,
            currentPrice: 19.99,
            originalPrice: 24.99
        },
        {
            id: 105,
            name: 'Sample Product 5',
            description: 'This is a sample product description for product 5.',
            stock: 0,
            currentPrice: 29.99,
            originalPrice: 34.99
        }
    ];


    public editProduct(productId: number | undefined): void {
        if (productId) {
            const popup = this.shadowRoot?.querySelector('edit-pop-up') as EditPopUp;
            popup.open(productId);
        }
    }



    public render(): TemplateResult {
        return html `
            <cms-header
                iconUrl="./assets/image/icons/productsManagement/tag-black.svg"
                title="Products"
                subTitle="Manage all item information"
                redirectOption=1
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
                ${this.ProductsList.map(product => html`
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
                `)}
                </tbody>
            </table>


            <edit-pop-up></edit-pop-up>
            
            
        `;
    }
}
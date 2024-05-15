import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Product } from "../../../types/Product";
import { ProductService } from "../../services/ProductService";


@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {

    private productService: ProductService = new ProductService();
    private fakeProductId: number = 1;

    private async getProductById(): Promise<void> {

        const product: Product | undefined = await this.productService.getProductById(this.fakeProductId);
        console.log(typeof product);
    }

    public async render(): Promise<TemplateResult> {

        await this.getProductById();

        return html`
            <div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <h2>Product detail page</h2>
            </div>
        `;

    }
}
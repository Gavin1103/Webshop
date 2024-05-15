import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Product } from "../../../types/Product";
import { ProductService } from "../../services/ProductService";
import { Router } from "@vaadin/router";


@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {

    private productService: ProductService = new ProductService();
    private fakeProductId: number = 1;


    public async render(): Promise<TemplateResult> {

        const product: Product | undefined = await this.productService.getProductById(this.fakeProductId);

        if(!product){
            Router.go("/product-not-found");
        }

        console.log(product);

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
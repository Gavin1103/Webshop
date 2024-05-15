import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
// import { Product } from "../../../types/Product";
// import { ProductService } from "../../services/ProductService";
// import { Router } from "@vaadin/router";


@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {

    // private productService: ProductService = new ProductService();
    // private fakeProductId: number = 1;

    public render(): TemplateResult {

        // const product: Product | undefined = await this.productService.getProductById(this.fakeProductId);
        // if(!product){
        // Router.go("/product-not-yourmom");
        // }
        // console.log(product);

        return html`
            <div>
                
                <h2>Product detail page</h2>
                <custom-image
             height="500px"
              width="500px"
              alt="Image of your mom"
              backgroundImageUrl="https://m.media-amazon.com/images/M/MV5BMjZkYTY2YzQtMGVhNC00OTZmLTk1MmYtZjJlNGJlMzY3MDFmXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_FMjpg_UX1000_.jpg"
              ></custom-image>
      


            </div>
        `;

    }
}
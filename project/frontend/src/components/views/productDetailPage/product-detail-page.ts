import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
// import { Product } from "../../../types/Product";
// import { ProductService } from "../../services/ProductService";
// import { Router } from "@vaadin/router";


@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {

    // private productService: ProductService = new ProductService();
    // private fakeProductId: number = 1;

    @property({ type: String })
    private infoStatus: string = "description";

    public static styles = css`
    main{
        width:100%;
        display:flex;
        align-items:center;
        flex-direction:column;

        section{
            width:60%;
            background-color:green;
        }

        .button-container{
            display:flex;
            align-items:center;
        }
    }
  `;

    private switchStatus(status:string):void{
        this.infoStatus = status;
        console.log(status);
    }

    private addToCart():void{
        
        console.log("product added to cart");
    }

    public render(): TemplateResult {

        // const product: Product | undefined = await this.productService.getProductById(this.fakeProductId);
        // if(!product){
        // Router.go("/product-not-yourmom");
        // }
        // console.log(product);

        return html`
            <main>

                <section>
                    <h2>Product detail page</h2>
                </section>

                 <section>
                    <custom-image
                        alt="Image of your mom"
                        backgroundImageUrl="https://m.media-amazon.com/images/M/MV5BMjZkYTY2YzQtMGVhNC00OTZmLTk1MmYtZjJlNGJlMzY3MDFmXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_FMjpg_UX1000_.jpg"
                        width="100%"
                        height="500px">
                    </custom-image>      
                </section>

                <section class="button-container">
                    <p>$13,99</p>
                    <button-component @click="${this.addToCart}" text="Add to cart"></button-component>
                </section>

                <section class="button-container">
                    <button-component @click="${():void => this.switchStatus("description")}" text="Description"></button-component>                    
                    <button-component @click="${():void => this.switchStatus("review")}" text="Reviews"></button-component>
                </section>

                ${this.infoStatus === "description" ? html`<description-component></description-component>` : null}
                ${this.infoStatus === "review" ? html`<review-component></review-component>` : null}


            </main>
        `;

    }
}
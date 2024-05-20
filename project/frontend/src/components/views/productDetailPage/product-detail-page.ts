import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyle from "./styles/globalStyle";
// import { Product } from "../../../types/Product";
// import { ProductService } from "../../services/ProductService";
// import { Router } from "@vaadin/router";

@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {
    @property({ type: String })
    private infoStatus: string = "reviews";

    @property({ type: String })
    private buttonColor: string = "#5AB2FF";

    public static styles = [
        globalStyle, // Apply global styles
        css`
            main {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;

                section {
                    width: 60%;
                    margin: 5px 0;
                }
            }

            .button-section {
                border-bottom: solid 5px lightgrey;
                padding: 10px 0 20px 0;

                display: flex;
                justify-content: space-between;

                p {
                    margin: 0 10px 0 0;
                    font-size: 2em;
                }

                section {
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                }

                section:last-child {
                    custom-button-component:last-child {
                        margin: 0 0 0 10px;
                    }
                }
            }
        `,
    ];

    private switchStatus(status: string): void {
        this.infoStatus = status;
        console.log(`infoStatus is now: ${this.infoStatus}`);
    }

    private addToCart(): void {
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
                    <custom-image-component
                        alt="Image of your mom"
                        backgroundImageUrl="https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg"
                        width="100%"
                        height="500px"
                    >
                    </custom-image-component>
                </section>

                <section class="button-section">
                    <section>
                        <p>$13,99</p>
                        <!-- TODO: add product to cart -->
                        <custom-button-component @click="${this.addToCart}" text="Add to cart"> </custom-button-component>
                    </section>

                    <section>
                        <custom-button-component
                            backgroundColor="${this.infoStatus === "description" ? this.buttonColor : ""}"
                            @click="${(): void => this.switchStatus("description")}"
                            text="Description"
                        >
                        </custom-button-component>

                        <custom-button-component
                            backgroundColor="${this.infoStatus === "reviews" ? this.buttonColor : ""}"
                            @click="${(): void => this.switchStatus("reviews")}"
                            text="Reviews"
                        >
                        </custom-button-component>
                    </section>
                </section>

                <hr />

                ${this.infoStatus === "description"
                    ? html`
                          <section>
                              <description-component></description-component>
                          </section>
                      `
                    : null}
                ${this.infoStatus === "reviews"
                    ? html`
                          <section>
                              <rating-component></rating-component>
                              <review-component></review-component>
                          </section>
                      `
                    : null}
            </main>
        `;
    }
}

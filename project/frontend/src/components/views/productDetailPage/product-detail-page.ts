import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import globalStyle from "./styles/globalStyle";
import { Router } from "@vaadin/router";
import { Product } from "../../../../types/Product";
import { ProductService } from "../../../services/ProductService";

@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {
    @property({ type: String })
    private infoStatus: string = "reviews";

    @property({ type: String })
    private buttonColor: string = "#5AB2FF";

    @property({ type: Number })
    private productId: number = 0;

    @state()
    private product: Product | null = null;

    private productService: ProductService = new ProductService();

    public static styles = [
        globalStyle,
        css`
            main {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;

                section {
                    min-width:300px;
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

            @media only screen and (max-width: 1400px) {
                main {
                    section {
                        width: 80%;
                    }
                }
            }

            @media only screen and (max-width: 1100px) {
                main {
                    section {
                        width: 90%;
                    }
                }
            }

            @media only screen and (max-width: 750px) {
                main {
                    .button-section {
                        flex-direction: column;

                        section {
                            justify-content: flex-start;
                        }
                    }
                }
            }

            @media only screen and (max-width: 450px) {
                main {

          
                    .button-section {
                        flex-direction: column;

                        section {
                           align-items: center;
                            flex-direction: column;

                            p{
                                margin: 0 0 10px 0;
                            }
                        }

                        section:last-child {
                            custom-button-component:last-child {
                                margin: 10px  0 0 0;
                            }
                        }
                    }
                }
            }
        `,
    ];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        if (this.IsUrlParameterPresent()) {
            await this.fetchProduct();
        }
    }

    public render(): TemplateResult {
        if (!this.product) {
            return html``;
        }

        console.log(this.product);

        return html`
            <main>
                <section>
                    <h2>${this.product.name}</h2>
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
                        <p>$${this.product.price}</p>
                        <!-- TODO: add product to cart -->
                        <custom-button-component @click="${this.addToCart}" text="Add to cart">
                        </custom-button-component>
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

    // Check if the url contains a parameter named "productId".
    private IsUrlParameterPresent(): boolean {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const param: string | null = urlParams.get("productId");

        if (!param) {
            Router.go("/unknown-parameter");
            return false;
        }

        this.productId = parseInt(param);

        return true;
    }

    private async fetchProduct(): Promise<void> {
        const product: Product | undefined = await this.productService.getProductById(this.productId);

        if (!product) {
            Router.go("/product-not-found");
            return;
        }

        this.product = product;
    }

    private switchStatus(status: string): void {
        this.infoStatus = status;
    }

    private addToCart(): void {
        console.log("product added to cart");
    }
}

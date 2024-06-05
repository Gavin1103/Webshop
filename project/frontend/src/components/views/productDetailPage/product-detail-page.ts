import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import globalStyle from "./styles/globalStyle";

import { Product } from "../../../types/Product";
import { ProductService } from "../../../services/ProductService";
import { getCurrentPath, navigateTo } from "../../router";
import productDetailPageStyle from "./styles/productDetailPageStyle";

@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {
    @property({ type: String })
    private infoStatus: string = "description";

    @property({ type: String })
    private buttonColor: string = "#5AB2FF";

    @property({ type: Number })
    private productId: number = 0;

    @state()
    private product: Product | null = null;

    private productService: ProductService = new ProductService();

    public static styles = [
        globalStyle,
        productDetailPageStyle
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

        return html`
            <main>
                <section>
                    <h2>${this.product.name}</h2>
                </section>

                <section>
                    <custom-image-component
                        alt="Image of your mom"
                        backgroundImageUrl="${this.product.image}"
                        width="100%"
                        height="500px"
                    >
                    </custom-image-component>
                </section>

                <section class="button-section">
                    <section>
                        <p>$${this.product.currentPrice}</p>
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
                              <description-component
                                  productCategory="${this.product.productCategory.name}"
                                  productDescription="${this.product.description}"
                              ></description-component>
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
        const currentPath: string = getCurrentPath();
        const param: string | null = currentPath.split("/")[2];

        this.productId = parseInt(param);

        return true;
    }

    private async fetchProduct(): Promise<void> {
        const product: Product | undefined = await this.productService.getProductById(this.productId);

        if (!product) {
            navigateTo("/product-not-found");
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

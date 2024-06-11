import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ProductService } from "../../../../services/ProductService";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";
import { Product } from "../../../../types/product/Product";

@customElement("render-products-component")
export class RenderProductsComponent extends LitElement {
    private productService: ProductService = new ProductService();

    private products: Product[] | undefined = undefined;

    public static styles = [productOverviewManagementStyle];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.fethProducts();
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <p>Choose a product to see the reviews.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.products
                            ? this.products.map(
                                  (product) => html`
                                      <tr>
                                          <td>${product.id}</td>
                                          <td>${product.name}</td>
                                          <td>${product.description}</td>
                                          <td>
                                              <button
                                                  class="btn btn-delete"
                                                  @click=${() => this.handleSeeReviewsClick(product.id)}
                                              >
                                                  <strong>See reviews</strong>
                                              </button>
                                          </td>
                                      </tr>
                                  `
                              )
                            : ""}
                    </tbody>
                </table>
            </div>
        `;
    }

    private async fethProducts(): Promise<void> {
        const products: Product[] | undefined = await this.productService.getAllProducts();
        if (products) {
            this.products = products;
        }
    }

    private handleSeeReviewsClick(productId: number): void {
        const event = new CustomEvent("see-reviews", {
            detail: { productId },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}

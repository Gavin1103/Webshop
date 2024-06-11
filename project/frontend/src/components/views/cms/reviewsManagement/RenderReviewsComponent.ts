import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ProductService } from "../../../../services/ProductService";
import { ProductReviews } from "../../../../types/product/ProductReviews";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";

@customElement("render-reviews-component")
export class RenderReviewsComponent extends LitElement {
    @property({ type: Number })
    private productId: number = 0;

    private productService: ProductService = new ProductService();

    private productReviews: ProductReviews | undefined = undefined;

    public static styles = [productOverviewManagementStyle];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.fetchReviews(this.productId);
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <a class="go-back-btn" @click=${this.goBack}>Back</a>
                <p><strong>Product:</strong> ${this.productReviews?.product.name}</p>
                <p><strong>Description:</strong> ${this.productReviews?.product.description}</p>
                <p><strong>Category:</strong> ${this.productReviews?.product.productCategory.name}</p>
                <p><strong>Price:</strong> $${this.productReviews?.product.currentPrice}</p>

                <h2>Reviews</h2>

                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.productReviews
                            ? this.productReviews.reviews.map(
                                  (review) => html`
                                      <tr>
                                          <td>${review.user.firstname}</td>
                                          <td>${review.rating} stars</td>
                                          <td>${review.createdAt}</td>
                                          <td>
                                              <button
                                                  class="btn btn-delete"
                                                  @click=${() => this.handleSeeReviewsClick(review.reviewId)}
                                              >
                                                  <strong>See review</strong>
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

    private async fetchReviews(productId: number): Promise<void> {
        const productReviews = await this.productService.getReviewsOfProduct(productId);
        if (productReviews) {
            this.productReviews = productReviews;
        }
    }

    private handleSeeReviewsClick(reviewId: number): void {
        const event = new CustomEvent("see-review", {
            detail: { reviewId },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    private goBack(): void {
        const event = new CustomEvent("go-back-to-products-overview", {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}

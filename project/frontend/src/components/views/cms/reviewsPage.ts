import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("cms-reviews")
export class ReviewsPage extends LitElement {
    @property({ type: String })
    public stateRender: string = "products-overview";

    private productId: number = 0;
    private reviewId: number = 0;

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("see-reviews", this.handleSeeReviews as EventListener);
        this.addEventListener("see-review", this.handleSeeReview as EventListener);
        this.addEventListener("go-back-to-reviews-overview", this.goBackToReviewsOverview as EventListener);
        this.addEventListener("go-back-to-products-overview", this.goBackToProductsOverview as EventListener);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener("see-reviews", this.handleSeeReviews as EventListener);
        this.removeEventListener("see-review", this.handleSeeReview as EventListener);
        this.removeEventListener(
            "go-back-to-reviews-overview",
            this.goBackToReviewsOverview as EventListener
        );
        this.removeEventListener(
            "go-back-to-products-overview",
            this.goBackToProductsOverview as EventListener
        );
    }

    private handleSeeReviews(event: CustomEvent): void {
        this.productId = event.detail.productId;
        this.stateRender = "reviews-overview";
    }

    private handleSeeReview(event: CustomEvent): void {
        this.reviewId = event.detail.reviewId;
        this.stateRender = "review-overview";
    }

    private goBackToReviewsOverview(): void {
        this.stateRender = "reviews-overview";
    }

    private goBackToProductsOverview(): void {
        this.stateRender = "products-overview";
    }

    protected render(): TemplateResult {
        return html`
            <h1>Reviews Page</h1>
            ${this.stateRender === "products-overview"
                ? html`<render-products-component></render-products-component>`
                : this.stateRender === "reviews-overview"
                ? html`<render-reviews-component productId=${this.productId}></render-reviews-component>`
                : this.stateRender === "review-overview"
                ? html`<render-review-component reviewId=${this.reviewId}></render-review-component>`
                : ""}
        `;
    }
}

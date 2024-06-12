import { LitElement, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Review } from "../../../../types/Review";
import { ReviewService } from "../../../../services/ReviewService";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";

@customElement("render-review-component")
export class RenderReviewComponent extends LitElement {
    @property({ type: Number })
    private reviewId: number = 0;
    private reviewService: ReviewService = new ReviewService();
    private review: Review | undefined = undefined;
    public static styles = [productOverviewManagementStyle];

    @state()
    private deletePopUp: boolean = false;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.fetchReview(this.reviewId);
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <a class="go-back-btn" @click=${this.goBack}>Back</a>
                <p><strong>Username: </strong>${this.review?.user.username}</p>
                <p><strong>Rating: </strong>${this.review?.rating}</p>
                <p><strong>Review: </strong>${this.review?.review}</p>
                <p><strong>Created at: </strong>${this.review?.createdAt}</p>
                <p><strong>Updateed at: </strong>${this.review?.updatedAt}</p>
                <button class="btn btn-delete" @click=${() => this.toggleDeletePopUp()}>
                    <strong>Delete review</strong>
                </button>
            </div>

            ${this.deletePopUp
                ? html`
                      <div>
                          <p>Delete review?</p>
                          <button class="btn btn-delete" @click=${this.confirmDelete}>Delete</button>
                          <button class="btn" @click=${this.toggleDeletePopUp}>Cancel</button>
                      </div>
                  `
                : ""}
        `;
    }

    private async fetchReview(reviewId: number): Promise<void> {
        const review: Review | undefined = await this.reviewService.getReviewById(reviewId);

        if (review) {
            this.review = review;
        }
    }

    private toggleDeletePopUp(): void {
        this.deletePopUp = !this.deletePopUp;
        this.requestUpdate();
    }

    private async confirmDelete(): Promise<void> {
        if (this.review) {
            await this.reviewService.deleteReview(this.reviewId);
            this.goBack();
        }
    }

    private goBack(): void {
        const event = new CustomEvent("go-back-to-reviews-overview", {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}

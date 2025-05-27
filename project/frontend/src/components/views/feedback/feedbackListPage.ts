import {css, html, LitElement} from "lit-element";
import {customElement, state} from "lit/decorators.js";
import FeedbackService from "../../../services/FeedbackService";

@customElement("feedback-list")
export class FeedbackList extends LitElement {
    @state() private feedbackList: Array<any> = [];
    @state() private isLoading: boolean = false;
    @state() private selectedImage: string | null = null;

    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }

        .feedback-item {
            border: 1px solid #ccc;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
        }

        img {
            max-width: 100px;
            height: auto;
            display: block;
            margin-bottom: 0.5rem;
            cursor: pointer;
        }
    `;

    public connectedCallback(): void {
        super.connectedCallback();
        void this.loadFeedback();
    }

    private async loadFeedback() {
        this.isLoading = true;
        const feedbackService: FeedbackService = new FeedbackService();
        try {
            this.feedbackList = await feedbackService.getAllFeedback();
        } catch (error) {
            console.error('Error fetching feedback:', error);
        } finally {
            this.isLoading = false;
        }
    }

    private showModal(imageUrl: string) {
        this.selectedImage = imageUrl;
    }

    private closeModal() {
        this.selectedImage = null;
    }

    protected render() {
        return html`
            <div>
                <h2>Feedback List</h2>
                ${this.isLoading ? html`<p>Loading...</p>` : ''}

                ${this.feedbackList.length === 0 && !this.isLoading ? html`<p>No feedback available</p>` : ''}

                ${this.feedbackList.map(feedback => html`
                    <div class="feedback-item">
                        <p><strong>Comments:</strong> ${feedback.feedback}</p>
                        ${feedback.image ? html`
                            <img src="${feedback.image}" alt="Feedback Image"
                                 @click="${() => this.showModal(`${feedback.image}`)}">
                        ` : ''}
                        <p><strong>Submitted on:</strong> ${new Date(feedback.createdAt).toLocaleString()}</p>
                    </div>
                `)}
                ${this.selectedImage ? html`
                    <image-modal .imageUrl="${this.selectedImage}"
                                 @close-modal="${this.closeModal}"></image-modal>
                ` : ''}
            </div>
        `;
    }
}

import {html, LitElement} from "lit-element";
import {customElement, property, state} from "lit/decorators.js";
import {TemplateResult} from "lit";
import {FeedbackService} from "../services/FeedbackService";
import feedbackFormStyle from "../styles/feedbackTool/feedbackFormStyle";

@customElement("feedback-form")
export class FeedbackForm extends LitElement {
    @property({type: String}) comments: string = '';
    @property({type: String}) screenshot: string | null = null;
    @state() private isSubmitting: boolean = false;

    public static styles = [feedbackFormStyle];

    protected render(): TemplateResult {
        return html`
            <div class="form-wrapper">
                <form @submit="${this.handleSubmit}">
                    <h2>User Feedback</h2>
                    <textarea
                        placeholder="Enter your comments..."
                        .value="${this.comments}"
                        @input="${this.updateComments}"
                        required
                    ></textarea>
                   
                        ${this.screenshot ? html`
                            <div class="screenshot-box">
                                <img src="${this.screenshot}" alt="Snipped Screenshot"/>
                            </div>
                        ` : ''}
                    <button class="button" type="submit" ?disabled="${this.isSubmitting}">Submit Feedback</button>
                </form>
            </div>
        `;
    }

    private updateComments(event: Event): void {
        const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        this.comments = target.value;
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        this.isSubmitting = true;
        const feedbackService: FeedbackService = new FeedbackService(viteConfiguration.API_URL);

        try {
            await feedbackService.uploadFeedback(this.screenshot as string, this.comments);
            this.isSubmitting = false;
            this.dispatchEvent(new CustomEvent('feedback-submitted'));
        } catch (error) {
            console.error('Error submitting feedback:', error);
            this.isSubmitting = false;
            this.dispatchEvent(new CustomEvent('feedback-error', {detail: 'Error submitting feedback. Please try again.'}));
        }
    }
}

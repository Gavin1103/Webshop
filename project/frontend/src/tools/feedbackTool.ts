import {html, LitElement} from "lit-element";
import {customElement, property, state} from "lit/decorators.js";
import {TemplateResult} from "lit";
import feedbackToolStyle from "../styles/feedbackTool/feedbackToolStyle";

@customElement("feedback-tool")
export class FeedbackTool extends LitElement {
    @property({type: Boolean}) private startScreenShot: boolean = false;
    @property({type: String}) private screenshot: string | null = null;
    @state() private isLoading: boolean = false;
    @state() private showMessage: boolean = false;
    @state() private messageText: string = '';
    @state() private isErrorMessage: boolean = false;

    public static styles = [feedbackToolStyle];

    private clickStartFeedback(): void {
        this.startScreenShot = true;
        this.showMessage = false;
        this.isErrorMessage = false;
    }

    private handleScreenshotCaptured(event: CustomEvent): void {
        this.screenshot = "data:image/png;base64," + event.detail;
        this.startScreenShot = false;
        this.isLoading = false;
    }

    private handleScreenshotError(event: CustomEvent): void {
        this.isLoading = false;
        this.showMessage = true;
        this.isErrorMessage = true;
        this.messageText = event.detail;
        this.resetFeedbackTool();
    }

    private handleFeedbackSubmitted(): void {
        this.showMessage = true;
        this.isErrorMessage = false;
        this.messageText = 'Thank you for your feedback!';
        this.resetFeedbackTool();
    }

    private handleFeedbackError(event: CustomEvent): void {
        this.isLoading = false;
        this.showMessage = true;
        this.isErrorMessage = true;
        this.messageText = event.detail;
        this.resetFeedbackTool();
    }

    private resetFeedbackTool(): void {
        setTimeout(() => {
            this.screenshot = null;
            this.showMessage = false;
            this.startScreenShot = false;
            this.isErrorMessage = false;
            this.messageText = '';
            this.requestUpdate();
        }, 3000);
    }

    private handleLoadingStart(): void {
        this.isLoading = true;
    }

    private handleLoadingEnd(): void {
        this.isLoading = false;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('loading-start', this.handleLoadingStart as EventListener);
        this.addEventListener('loading-end', this.handleLoadingEnd as EventListener);
        this.addEventListener('screenshot-error', this.handleScreenshotError as EventListener);
        this.addEventListener('feedback-submitted', this.handleFeedbackSubmitted as EventListener);
        this.addEventListener('feedback-error', this.handleFeedbackError as EventListener);
    }

    public disconnectedCallback(): void {
        this.removeEventListener('loading-start', this.handleLoadingStart as EventListener);
        this.removeEventListener('loading-end', this.handleLoadingEnd as EventListener);
        this.removeEventListener('screenshot-error', this.handleScreenshotError as EventListener);
        this.removeEventListener('feedback-submitted', this.handleFeedbackSubmitted as EventListener);
        this.removeEventListener('feedback-error', this.handleFeedbackError as EventListener);
        super.disconnectedCallback();
    }

    protected render(): TemplateResult {
        return html`
            ${this.isLoading ? html`
                <loading-indicator></loading-indicator>` : ""}
            ${this.startScreenShot ? html`
                <region-capture @screenshot-captured="${this.handleScreenshotCaptured}"
                                @screenshot-error="${this.handleScreenshotError}"></region-capture>
            ` : ""}
            ${this.screenshot ? html`
                <feedback-form .screenshot="${this.screenshot}"
                               @feedback-submitted="${this.handleFeedbackSubmitted}"></feedback-form>
            ` : ""}
            ${this.showMessage ? html`
                <div class="overlay">
                    <div class="message ${this.isErrorMessage ? 'error' : 'success'}">
                        <p>${this.messageText}</p>
                    </div>
                </div>
            ` : ""}
            <div class="feedback-buttons">
                <button class="feedback-button" @click="${this.clickStartFeedback}">
                    <img class="icon-button" src="../assets/image/icons/feedback-icon.svg"
                         alt="feedback button">
                </button>
            </div>
        `;
    }
}

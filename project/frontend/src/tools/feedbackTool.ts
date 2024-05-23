import {css, html, LitElement} from "lit-element";
import {customElement, property} from "lit/decorators.js";
import {TemplateResult} from "lit";

@customElement("feedback-tool")
export class FeedbackTool extends LitElement {
    @property({type: Boolean}) private showExtraButtons: boolean = false;
    @property({type: Boolean}) private startScreenShot: boolean = false;
    @property({type: String}) private screenshot: string | null = null;

    static styles = css`
        :host {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 100;
        }

        .feedback-buttons {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1rem;
        }

        .feedback-button {
            width: 4rem;
            height: 4rem;
            background-color: #495AFF;
            border-radius: 50%;
            border: none;
            padding: 0;
            cursor: pointer;
            color: #ffffff;
        }

        .icon-button {
            width: 2rem;
            height: 2rem;
            margin: 1rem;
        }
    `;

    private toggleButtons(): void {
        this.showExtraButtons = !this.showExtraButtons;
    }

    private clickStartFeedback(): void {
        this.startScreenShot = true;
    }

    private handleScreenshotCaptured(event: CustomEvent): void {
        this.screenshot = "data:image/png;base64," + event.detail;
        this.startScreenShot = false;
    }

    protected render(): TemplateResult {
        return html`
            ${this.startScreenShot ? html`
                <region-capture @screenshot-captured="${this.handleScreenshotCaptured}"></region-capture>
            ` : ""}
            ${this.screenshot ? html`
                <feedback-form .screenshot="${this.screenshot}"></feedback-form>
            ` : ""}
            <div class="feedback-buttons">
                ${this.showExtraButtons ? html`
                    <button class="feedback-button" @click="${this.clickStartFeedback}">
                        <span>Feedback</span>
                    </button>
                ` : ""}
                <button class="feedback-button" @click="${this.toggleButtons}">
                    <img class="icon-button" src="../assets/image/icons/feedback-icon.svg"
                         alt="feedback button">
                </button>
            </div>
        `;
    }
}

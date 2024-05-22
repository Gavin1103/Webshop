import {css, html, LitElement} from "lit-element";
import {customElement, property} from "lit/decorators.js";
import {TemplateResult} from "lit";

@customElement("feedback-form")
export class FeedbackForm extends LitElement {
    @property({type: String}) comments: string = '';
    @property({type: String}) screenshot: string | null = null;

    static styles = css`
        :host {
            min-height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
        }

        .form-wrapper {
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
        }

        form {
            position: absolute;
            z-index: 100;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            width: 500px;
        }

        textarea {
            resize: vertical;
            height: 100px;
            margin-bottom: 10px;
        }

        button {
            align-self: flex-start;
        }

        img {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            object-fit: contain;
        }
    `;

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
                    ${this.screenshot ? html`<img src="data:image/png;base64,${this.screenshot}" alt="Snipped Screenshot"/>` : ''}
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        `;
    }

    private updateComments(event: Event): void {
        const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        this.comments = target.value;
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        // Submit the feedback to your backend or API
        console.log({comments: this.comments, screenshot: this.screenshot});
    }
}

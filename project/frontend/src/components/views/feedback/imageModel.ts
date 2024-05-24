import {css, html, LitElement} from "lit-element";
import {customElement, property} from "lit/decorators.js";
import {TemplateResult} from "lit";

@customElement("image-modal")
export class ImageModal extends LitElement {
    @property({type: String}) imageUrl: string = '';

    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            position: relative;
            background: #fff;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        img {
            max-width: 50rem;
            max-height: 80vh;
            display: block;
        }

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: black;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            color: white;
            font-size: 1rem;
            line-height: 30px;
            text-align: center;
        }
    `;

    private closeModal() {
        this.dispatchEvent(new CustomEvent('close-modal', {bubbles: true, composed: true}));
    }

    protected render(): TemplateResult {
        return html`
            <div class="modal-content">
                <button class="close" @click="${this.closeModal}">&times;</button>
                <img src="${this.imageUrl}" alt="Feedback Image">
            </div>
        `;
    }
}

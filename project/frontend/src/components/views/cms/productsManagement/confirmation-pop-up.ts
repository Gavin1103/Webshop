import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import popUpStyle from "../../../../styles/cms/product/popUpStyle";
import confirmationPopupStyle from "../../../../styles/cms/product/confirmationPopupStyle";

@customElement("confirmation-pop-up")
export class ConfirmationPopUp extends LitElement {
    @property({type: Number}) productId: number | undefined;

    public static styles = [popUpStyle, confirmationPopupStyle];

    public openPopup(productId: number): void {
        this.productId = productId;
        this.setAttribute('open', '');
    }

    private closePopup(): void {
        this.setAttribute('closing', '');
        setTimeout(() => {
            this.removeAttribute('closing');
            this.removeAttribute('open');
            this.requestUpdate();
        }, 500);
    }

    private confirmDeletion(): void {
        this.dispatchEvent(new CustomEvent('confirm-delete', {
            detail: { productId: this.productId },
            bubbles: true,
            composed: true
        }));
        this.closePopup();
    }

    public render(): TemplateResult {
        return html`
            <div class="overlay">
                <div class="popup-content">
                    <h3>Confirm Deletion</h3>
                    <p>Are you sure you want to delete this product?</p>
                    <button @click="${this.confirmDeletion}" class="btn btn-confirm">Yes</button>
                    <button @click="${this.closePopup}" class="btn btn-cancel">No</button>
                </div>
            </div>
        `;
    }
}

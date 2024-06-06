import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import popUpStyle from "../../../../styles/cms/product/popUpStyle";
import {UpdateProduct} from "../../../../types/product/UpdateProduct";

@customElement("edit-pop-up")
export class EditPopUp extends LitElement {
    public static styles = [popUpStyle];

    @property({type: Number})
    public productId: number | undefined;

    @property({type: Object})
        public product: UpdateProduct = {
        id: 101,
        name: "Smartphone",
        description: "A modern smartphone with many features",
        "stock": 100,
        currentPrice: 699.99,
        originalPrice: 799.99,
        image: [
            "https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d200001272315/apple-iphone-15-128gb-groen.jpg"
        ],
        productCategory: "Electronics"
    };

    public truncateString(input: string, length: number): string {
        if (input.length <= length) {
            return input;
        } else {
            return "..." + input.slice(input.length - length);
        }
    }

    public render(): TemplateResult {
        return html`
            <div class="popup-content">
                ${this.product ? html`
                    <div class="close-button">
                        <img @click="${this.closePopup}" class="close-icon" src="/assets/image/icons/close-icon.svg" alt="close-button">
                    </div>
                    <span class="title">Edit Product</span>
                    <div class="elements">
                        <div class="name input-element">
                            <label>Product Name</label>
                            <input type="text" value="${this.product.name}">
                        </div>
                        <div class="stock input-element">
                            <label>Stock</label>
                            <input type="number" value="${this.product.stock}">
                        </div>
                        <div class="category input-element">
                            <label for="category">Category</label>
                            <select id="category">
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Books">Books</option>
                            </select>
                        </div>
                    </div>
                    <div class="elements">
                        <div class="current-price input-element">
                            <label>Current Price</label>
                            <input type="number" value="${this.product.currentPrice}">
                        </div>
                        <div class="original-price input-element">
                            <label>Original Price</label>
                            <input type="number" value="${this.product.originalPrice}">
                        </div>
                    </div>

                    <div class="image-list">
                        <label>ImageURL</label>
                        ${this.product.image? this.product.image.map((image, index) => html`
                            <div class="existImageURL">
                                <span class="imageURL">${this.truncateString(image, 50)}</span>
                                <img @click="${() => this.removeImage(index)}" src="/assets/image/icons/delete-icon.svg" alt="delete">
                            </div>
                        `) : ""}
                        
                        <div class="add-image input-element">
                            <label>Add New Image</label>
                            <div class="input-with-button">
                                <input id="newImageUrl" type="text" placeholder="ImageURL..." >
                                <button @click="${this.addNewImage}">Add</button> 
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="description input-element">
                        <label>Description</label>
                        <textarea>${this.product.description}</textarea>
                    </div>
                    
                    <div class="buttons">
                        <button @click="${this.saveProduct}" class="btn btn-save">Save</button>
                    </div>
                ` : ""}
            </div>
        `;
    }

    private closePopup() {
        this.removeAttribute('open');
    }

    public open(productId: number) {
        this.productId = productId;
        this.setAttribute('open', '');
    }

    private addNewImage() {
        const newImageUrlInput = this.shadowRoot?.querySelector<HTMLInputElement>("#newImageUrl");
        console.log(newImageUrlInput);
        if (newImageUrlInput && newImageUrlInput.value.trim() !== "") {
            this.product.image.push(newImageUrlInput.value.trim());
            newImageUrlInput.value = "";
            this.requestUpdate();
        }
    }

    private removeImage(index: number) {
        this.product.image.splice(index, 1);
        this.requestUpdate();
    }

    private saveProduct() {
        const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>(".name input");
        const stockInput = this.shadowRoot?.querySelector<HTMLInputElement>(".stock input");
        const categorySelect = this.shadowRoot?.querySelector<HTMLSelectElement>("#category");
        const currentPriceInput = this.shadowRoot?.querySelector<HTMLInputElement>(".current-price input");
        const originalPriceInput = this.shadowRoot?.querySelector<HTMLInputElement>(".original-price input");
        const descriptionTextarea = this.shadowRoot?.querySelector<HTMLTextAreaElement>(".description textarea");

        if (
            nameInput && stockInput && categorySelect &&
            currentPriceInput && originalPriceInput && descriptionTextarea
        ) {
            this.product.name = nameInput.value.trim();
            this.product.stock = parseInt(stockInput.value);
            this.product.productCategory = categorySelect.value;
            this.product.currentPrice = parseFloat(currentPriceInput.value);
            this.product.originalPrice = parseFloat(originalPriceInput.value);
            this.product.description = descriptionTextarea.value.trim();


            this.requestUpdate();
        }
    }
}
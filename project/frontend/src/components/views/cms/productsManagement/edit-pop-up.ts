import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import popUpStyle from "../../../../styles/cms/product/popUpStyle";
import { CategoryService } from "../../../../services/CategoryService";
import { ProductCategory } from "../../../../types/product/ProductCategory";
import { ProductService } from "../../../../services/ProductService";
import { Product } from "../../../../types/product/Product";
import editAddPopUpStyle from "../../../../styles/cms/product/editAddPopUpStyle";
import {truncateStringBack} from "../../../helpers/helpers";

@customElement("edit-pop-up")
export class EditPopUp extends LitElement {
    public static styles = [popUpStyle, editAddPopUpStyle];

    private categoryService: CategoryService = new CategoryService();
    private productService: ProductService = new ProductService();

    @property({ type: Number })
    public productId: number | undefined;

    @state()
    private updateProduct: Product | undefined;

    private categoryList: ProductCategory[] = [];


    private async loadCategoryList(): Promise<void> {
        const categoryApiData: ProductCategory[] | undefined = await this.categoryService.getAllCategories();
        if (categoryApiData) {
            this.categoryList = categoryApiData;
        }
    }

    private async loadUpdateProduct(id: number): Promise<void> {
        this.updateProduct = await this.productService.getProductById(id);
    }

    @state()
    private newImageUrl: string = "";


    public render(): TemplateResult {
        return html`
            <div class="popup-content">
                ${this.updateProduct ? html`
                    <div class="close-button">
                        <img @click="${this.closePopup}" class="close-icon" src="/assets/image/icons/close-icon.svg" alt="close-button">
                    </div>
                    <span class="title">Edit Product</span>
                    <div class="elements">
                        <div class="name input-element">
                            <label>Product Name</label>
                            <input type="text" .value="${this.updateProduct?.name ?? ''}" @input="${this.updateName}">
                        </div>
                        <div class="stock input-element">
                            <label>Stock</label>
                            <input type="number" .value="${this.updateProduct?.stock ?? 0}" @input="${this.updateStock}">
                        </div>
                        <div class="category input-element">
                            <label for="category">Category</label>
                            <select id="category" @change="${this.updateCategory}">
                                ${this.categoryList.map(existedCategory => html`
                                    <option value="${existedCategory.id}" ?selected="${this.updateProduct?.productCategory.id === existedCategory.id}">
                                        ${existedCategory.name}
                                    </option>
                                `)};
                            </select>
                        </div>
                    </div>
                    <div class="elements">
                        <div class="current-price input-element">
                            <label>Current Price</label>
                            <input type="number" .value="${this.updateProduct?.currentPrice ?? 0}" @input="${this.updateCurrentPrice}" step="any">
                        </div>
                        <div class="original-price input-element">
                            <label>Original Price</label>
                            <input type="number" .value="${this.updateProduct?.originalPrice ?? 0}" @input="${this.updateOriginalPrice}" step="any">
                        </div>
                    </div>

                    <div class="image-list">
                        <label class="label-imageURL">ImageURL</label>
                        ${this.updateProduct.image ? this.updateProduct.image.map((image, index) => html`
                            <div class="existImageURL">
                                <span class="imageURL">${truncateStringBack(image, 50)}</span>
                                <img @click="${() => this.removeImage(index)}" src="/assets/image/icons/delete-icon.svg" alt="delete">
                            </div>
                        `) : ""}
                        
                        <div class="add-image input-element">
                            <label>Add New Image</label>
                            <div class="input-with-button">
                                <input id="newImageUrl" type="text" placeholder="ImageURL..." .value="${this.newImageUrl}" @input="${this.updateNewImageUrl}">
                                <button @click="${this.addNewImage}">Add</button> 
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="description input-element">
                        <label>Description</label>
                        <textarea @input="${this.updateDescription}">${this.updateProduct?.description ?? ''}</textarea>
                    </div>
                    
                    <div class="buttons">
                        <button @click="${this.saveProduct}" class="btn btn-save">Save</button>
                    </div>
                ` : ""}
            </div>
        `;
    }

    private closePopup() {
        this.setAttribute('closing', '');
        setTimeout(() => {
            this.removeAttribute('closing');
            this.removeAttribute('open');
            this.requestUpdate();
        }, 500);
    }

    public async open(productId: number) {
        this.productId = productId;
        this.setAttribute('open', '');
        await this.loadCategoryList();
        await this.loadUpdateProduct(this.productId);
        this.requestUpdate();
    }

    private updateName(event: Event) {
        const input = event.target as HTMLInputElement;
        if (this.updateProduct) {
            this.updateProduct = { ...this.updateProduct, name: input.value };
        }
    }

    private updateStock(event: Event) {
        const input = event.target as HTMLInputElement;
        if (this.updateProduct) {
            this.updateProduct = { ...this.updateProduct, stock: parseInt(input.value) };
        }
    }

    private updateCategory(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectedCategoryId = parseInt(select.value);
        const selectedCategory = this.categoryList.find(category => category.id === selectedCategoryId);

        if (this.updateProduct && selectedCategory) {
            this.updateProduct = {
                ...this.updateProduct,
                productCategory: {
                    id: selectedCategory.id,
                    name: selectedCategory.name,
                    description: selectedCategory.description
                }
            };
        }

        this.requestUpdate();
    }

    private updateCurrentPrice(event: Event) {
        const input = event.target as HTMLInputElement;
        const value: number = parseFloat(input.value);
        if (this.updateProduct && !isNaN(value)) {
            this.updateProduct = { ...this.updateProduct, currentPrice: value };
        }
    }

    private updateOriginalPrice(event: Event) {
        const input = event.target as HTMLInputElement;
        const value: number = parseFloat(input.value);
        if (this.updateProduct && !isNaN(value)) {
            this.updateProduct = { ...this.updateProduct, originalPrice: value };
        }
    }


    private updateDescription(event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        if (this.updateProduct) {
            this.updateProduct = { ...this.updateProduct, description: textarea.value };
        }
    }

    private updateNewImageUrl(event: Event) {
        const input = event.target as HTMLInputElement;
        this.newImageUrl = input.value;
    }

    private addNewImage() {
        if (this.updateProduct && this.newImageUrl.trim() !== "") {
            this.updateProduct.image = [...this.updateProduct.image, this.newImageUrl.trim()];
            this.newImageUrl = "";
            this.requestUpdate();
        }
    }

    private removeImage(index: number) {
        if (this.updateProduct) {
            this.updateProduct.image = this.updateProduct.image.filter((_, i) => i !== index);
            this.requestUpdate();
        }
    }

    private async saveProduct() {
        if (this.updateProduct) {
            if (this.productId && this.updateProduct) {
                await this.productService.updateProduct(this.productId, this.updateProduct);
                this.dispatchEvent(new CustomEvent('product-updated', { bubbles: true, composed: true }))
            }
        }
        console.log(this.updateProduct);
        this.closePopup();
    }
}

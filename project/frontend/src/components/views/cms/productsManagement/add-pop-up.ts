import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import popUpStyle from "../../../../styles/cms/product/popUpStyle";
import { CategoryService } from "../../../../services/CategoryService";
import { ProductCategory } from "../../../../types/product/ProductCategory";
import { Product } from "../../../../types/product/Product";
import {ProductService} from "../../../../services/ProductService";
import editAddPopUpStyle from "../../../../styles/cms/product/editAddPopUpStyle";

@customElement("add-pop-up")
export class AddPopUp extends LitElement {
    public static styles = [popUpStyle, editAddPopUpStyle];

    private categoryService: CategoryService = new CategoryService();
    private productService: ProductService = new ProductService();

    @property({ type: Number })
    public productId: number | undefined;

    @state()
    private addProduct: Product = {
        id: 0,
        name: '',
        description: '',
        image: [],
        currentPrice: 0,
        originalPrice: 0,
        stock: 0,
        productCategory: {
            id: 0,
            name: '',
            description: ''
        }
    };

    @state()
    private categoryList: ProductCategory[] = [];

    @state()
    private newImageUrl: string = "";


    private async loadCategoryList(): Promise<void> {
        const categoryApiData: ProductCategory[] | undefined = await this.categoryService.getAllCategories();
        if (categoryApiData) {
            this.categoryList = categoryApiData;
            if (this.categoryList.length > 0 && (!this.addProduct || !this.addProduct.productCategory.id )) {
                const firstCategory = this.categoryList[0];
                this.addProduct = {
                    ...this.addProduct,
                    productCategory: {
                        id: firstCategory.id,
                        name: firstCategory.name,
                        description: firstCategory.description
                    }
                };
            }
        }
    }

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
                <div class="close-button">
                    <img @click="${this.closePopup}" class="close-icon" src="/assets/image/icons/close-icon.svg" alt="close-button">
                </div>
                <span class="title">${this.productId ? 'Edit Product' : 'Add Product'}</span>
                <div class="elements">
                    <div class="name input-element">
                        <label>Product Name</label>
                        <input type="text" .value="${this.addProduct?.name ?? ''}" @input="${this.updateName}">
                    </div>
                    <div class="stock input-element">
                        <label>Stock</label>
                        <input type="number" .value="${this.addProduct?.stock ?? ''}" @input="${this.updateStock}">
                    </div>
                    <div class="category input-element">
                        <label for="category">Category</label>
                        <select id="category" @change="${this.updateCategory}">
                            ${this.categoryList.map((existedCategory) => html`
                                <option value="${existedCategory.id}">
                                    ${existedCategory.name}
                                </option>
                            `)};
                        </select>
                    </div>
                </div>
                <div class="elements">
                    <div class="current-price input-element">
                        <label>Current Price</label>
                        <input type="number" .value="${this.addProduct?.currentPrice ?? ''}" @input="${this.updateCurrentPrice}" step="any">
                    </div>
                    <div class="original-price input-element">
                        <label>Original Price</label>
                        <input type="number" .value="${this.addProduct?.originalPrice ?? ''}" @input="${this.updateOriginalPrice}" step="any">
                    </div>
                </div>

                <div class="image-list">
                    <label class="label-imageURL">ImageURL</label>
                    ${this.addProduct?.image?.map((imageUrl, index) => html`
                        <div class="existImageURL">
                            <span class="imageURL">${this.truncateString(imageUrl, 30)}</span>
                            <img @click="${() => this.removeImage(index)}" src="/assets/image/icons/delete-icon.svg" alt="delete">
                        </div>
                    `)}
                    
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
                    <textarea @input="${this.updateDescription}">${this.addProduct?.description ?? ''}</textarea>
                </div>
                
                <div class="buttons">
                    <button @click="${this.saveProduct}" class="btn btn-save">Save</button>
                </div>
            </div>
        `;
    }

    private closePopup() {
        this.setAttribute('closing', '');
        setTimeout(() => {
            this.removeAttribute('open');
            this.removeAttribute('closing');
            this.addProduct = {
                id: 0,
                name: '',
                description: '',
                image: [],
                currentPrice: 0,
                originalPrice: 0,
                stock: 0,
                productCategory: {
                    id: 0,
                    name: '',
                    description: ''
                }
            };
            this.newImageUrl = "";
            this.requestUpdate();
        }, 500);
    }

    public async open() {
        this.setAttribute('open', '');
        await this.loadCategoryList();
        this.requestUpdate();
    }

    private updateName(event: Event) {
        const input = event.target as HTMLInputElement;
        if (this.addProduct) {
            this.addProduct = { ...this.addProduct, name: input.value };
        }
    }

    private updateStock(event: Event) {
        const input = event.target as HTMLInputElement;
        if (this.addProduct) {
            this.addProduct = { ...this.addProduct, stock: parseInt(input.value) };
        }
    }

    private updateCategory(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectedCategoryId = parseInt(select.value);
        const selectedCategory = this.categoryList.find(category => category.id === selectedCategoryId);

        if (this.addProduct && selectedCategory) {
            this.addProduct = {
                ...this.addProduct,
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
        if (this.addProduct && !isNaN(value)) {
            this.addProduct = { ...this.addProduct, currentPrice: value };
        }
    }

    private updateOriginalPrice(event: Event) {
        const input = event.target as HTMLInputElement;
        const value: number = parseFloat(input.value);
        if (this.addProduct && !isNaN(value)) {
            this.addProduct = { ...this.addProduct, originalPrice: value };
        }
    }

    private updateDescription(event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        if (this.addProduct) {
            this.addProduct = { ...this.addProduct, description: textarea.value };
        }
    }

    private updateNewImageUrl(event: Event) {
        const input = event.target as HTMLInputElement;
        this.newImageUrl = input.value;
    }

    private addNewImage() {
        if (this.addProduct && this.newImageUrl.trim() !== "") {
            this.addProduct.image = [...this.addProduct.image, this.newImageUrl.trim()];
            this.newImageUrl = "";
            this.requestUpdate();
        }
    }

    private removeImage(index: number) {
        if (this.addProduct) {
            this.addProduct.image = this.addProduct.image.filter((_, i) => i !== index);
            this.requestUpdate();
        }
    }

    private async saveProduct() {
        if (this.addProduct) {
            const newProduct = await this.productService.addProduct(this.addProduct);
            this.dispatchEvent(new CustomEvent('product-added', {
                detail: {product: newProduct},
                bubbles: true,
                composed: true
            }));
            this.closePopup();
        }
    }
}

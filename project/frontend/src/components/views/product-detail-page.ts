import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Product } from "../../../types/Product";
import { ProductService } from "../../services/ProductService";
import { UserService } from "../../services/UserService";
import { UserLoginFormModel } from "../../../types/formModels/UserLoginFormModel";








@customElement("product-detail-page")
export class ProductDetailPage extends LitElement {

    private productService: ProductService = new ProductService();
    private userService: UserService = new UserService();
    private fakeProductId: number = 1;

    private async getProductById(): Promise<void> {

        const formData: UserLoginFormModel = {
            email: "string",
            password: "string"
        };

        await this.userService.login(formData);






        const product: Product | undefined = await this.productService.getProductById(this.fakeProductId);

        if (!product) {
            console.log("gayness");
        }

        console.log(product);
    }




    public async render(): Promise<TemplateResult> {

        await this.getProductById();

        return html`
            <div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <h2>Product detail page</h2>
            </div>
        `;

    }
}
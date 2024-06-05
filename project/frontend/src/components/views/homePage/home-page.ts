import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import homePageStyle from "../../../styles/homePage/homePageStyle";
import {ProductPreviewResponse} from "../../../types/ProductPreviewResponse";
import {CategoryResponse} from "../../../types/CategoryResponse";
import {ProductService} from "../../../services/ProductService";
import {CategoryService} from "../../../services/CategoryService";


@customElement("home-page")
export class HomePage extends LitElement {
    public static styles = [homePageStyle];
    public topDealProducts: ProductPreviewResponse | undefined;
    public recommendProducts: ProductPreviewResponse | undefined;
    public categoryList: CategoryResponse | undefined;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.loadData();
    }

    private async loadData(): Promise<void> {
        const productService: ProductService = new ProductService();
        const categoryService: CategoryService = new CategoryService();

        try {
            this.topDealProducts = await productService.getTopDealProducts();
            this.recommendProducts = await productService.getRecommendProducts();
            this.categoryList = await categoryService.getRandomCategoriesWithImage(10);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            this.requestUpdate();
        }
    }

    public render(): TemplateResult {

        return html`
            <hero-section-homepage
                redirectUrl="/promotion"
                title="New Product Promotion"
                subTitle="Up To 70% Off">
            </hero-section-homepage>

            <product-carousel-section
                title="Top Deal"
                redirectUrl="/promotion"
                .productsData="${this.topDealProducts}">
            </product-carousel-section>

            <product-carousel-section
                title="Recommended For You"
                redirectUrl="/allProducts"
                .productsData="${this.recommendProducts}">
            </product-carousel-section>

            <category-grid-section
                .categoryList="${this.categoryList}">
            </category-grid-section>


        `;
    }
}
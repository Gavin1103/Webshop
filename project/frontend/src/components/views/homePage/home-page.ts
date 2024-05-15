import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import homePageStyle from "../../../styles/homePage/homePageStyle";
import {ProductService} from "../../../services/ProductService";
import {ProductPreviewResponse} from "../../../../types/responses/ProductPreviewResponse";
import {CategoryService} from "../../../services/CategoryService";
import {CategoryResponse} from "../../../../types/responses/CategoryResponse";


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
                title="New Product Promotion"
                subTitle="Up To 70% Off">
            </hero-section-homepage>
            
            <product-carousel-section
                title="Top Deal"
                .productsData = "${this.topDealProducts}">
            </product-carousel-section>

            <product-carousel-section
                title="Recommended For You"
                .productsData = "${this.recommendProducts}">
            </product-carousel-section>
            
            <category-grid-section
                .categoryList = "${this.categoryList}"
            >
            </category-grid-section>
            
            
        `;
    }
}
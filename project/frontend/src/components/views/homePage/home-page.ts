import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import homePageStyle from "../../../styles/homePage/homePageStyle";
import {ProductService} from "../../../services/ProductService";
import {ProductHomePage} from "../../../../types/responses/homePage/ProductHomePage";
import {CategoryService} from "../../../services/CategoryService";
import {Category} from "../../../../types/responses/Category";


@customElement("home-page")
export class HomePage extends LitElement {
    public static styles = [homePageStyle];
    public topDealProducts: ProductHomePage | undefined;
    public recommendProducts: ProductHomePage | undefined;
    public categoryList: Category | undefined;

    public async firstUpdated(): Promise<void> {
        const productService: ProductService = new ProductService();
        const categoryService: CategoryService = new CategoryService();
        this.topDealProducts = await productService.getTopDealProducts();
        this.recommendProducts = await productService.getRecommendProducts();
        this.categoryList = await categoryService.getRandomCategoriesWithImage(10);
        this.requestUpdate();
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
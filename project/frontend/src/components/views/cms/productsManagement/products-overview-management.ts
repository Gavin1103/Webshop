import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import productOverviewManagementStyle from "../../../../styles/cms/product/productOverviewManagementStyle";

@customElement("products-overview-management")
export class ProductsOverviewManagement extends LitElement {
    public static styles = [productOverviewManagementStyle];


    public render(): TemplateResult {
        return html `
            <cms-header
                iconUrl="./assets/image/icons/productsManagement/tag-black.svg"
                title="Products"
                subTitle="Manage all item information"
                redirectOption=1
                redirectUrl="/"
                redirectText="to home"
            ></cms-header>
        `;
    }
}
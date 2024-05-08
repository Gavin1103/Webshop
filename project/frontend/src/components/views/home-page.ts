import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import homePageStyle from "../../styles/homePageStyle";


@customElement("home-page")
export class HomePage extends LitElement {
    public static styles = [homePageStyle];

    public render(): TemplateResult {

        return html`
            <hero-section-homepage
                title="New Product Promotion"
                subTitle="Up To 70% Off"
            >
            </hero-section-homepage>
        `;
    }
}
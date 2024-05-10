import {html, LitElement, TemplateResult} from "lit";
import {customElement, query} from "lit/decorators.js";
import {initRouter} from "./router";
import webshopRootStyle from "../styles/webshopRootStyle";

@customElement("webshop-root")
export class WebshopRoot extends LitElement {

    public static styles = [webshopRootStyle];

    @query("#main-shop-wrapper")
    private shopWrapper!: HTMLElement;

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public firstUpdated(): void {
        // Initialize the router with a designated outlet
        void initRouter(this.shopWrapper);
    }

    /**
     * Renders the components
     */
    protected render(): TemplateResult {

        return html`
            <navigation-bar></navigation-bar>
            <main id="main-shop-wrapper">

            </main>
        `;
    }
}

import {html, LitElement, TemplateResult} from "lit";
import {customElement, query} from "lit/decorators.js";
import {initRouter} from "./router";

/**
 * Custom element based on Lit for the header of the webshop.
 *
 * @todo Most of the logic in this component is over-simplified. You will have to replace most of if with actual implementions.
 */
@customElement("webshop-root")
export class Root extends LitElement {
    @query("#outlet")
    private outlet!: HTMLElement;

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public firstUpdated(): void {
        // Initialize the router with a designated outlet
        void initRouter(this.outlet);
    }
    /**
     * Renders the components
     */
    protected render(): TemplateResult {

        return html`
            <navigation-bar></navigation-bar>
            <div id="outlet">
                
            </div>
            <footer>Copyright &copy; Luca Stars 2024</footer>
        `;
    }
}

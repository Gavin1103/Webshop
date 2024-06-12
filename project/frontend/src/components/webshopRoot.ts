import { html, LitElement, TemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { getCurrentPath, initRouter } from "./router";

@customElement("webshop-root")
export class WebshopRoot extends LitElement {
    @state()
    private isCMSPage: boolean = false;

    @query("#main-shop-wrapper")
    private shopWrapper!: HTMLElement;

    public connectedCallback(): void {
        super.connectedCallback();
        this.checkIfCMSPage();
    }

    public async firstUpdated(): Promise<void> {
        await initRouter(this.shopWrapper);
        window.addEventListener("hashchange", this.onRouteChange.bind(this));
        this.onRouteChange();
    }

    public checkIfCMSPage(): void {
        const currentPath: string = getCurrentPath();
        this.isCMSPage = currentPath.includes("backoffice");
    }

    // Callback to handle route changes
    private onRouteChange(): void {
        this.checkIfCMSPage();
    }

    /**
     * Renders the components
     */
    protected render(): TemplateResult {
        return html`
            ${this.isCMSPage ? html`` : html` <navigation-bar></navigation-bar>`}

            <main id="main-shop-wrapper"></main>

            ${this.isCMSPage ? html`` : html` <footer-component></footer-component>`}
        `;
    }
}

import {html, LitElement, TemplateResult} from 'lit';
import {Router} from '@vaadin/router';
import {customElement, query} from "lit/decorators.js";
import dashboardStyles from "../../../styles/cms/dashboardStyles";
import {navigateTo} from "../../router";

@customElement('cms-main')
export class CmsMain extends LitElement {

    public static styles = [dashboardStyles];

    @query("#cms-content")
    private cmsContent!: HTMLElement;

    private router!: Router;

    public firstUpdated(): void {
        this.router = new Router(this.cmsContent);
        void this.router.setRoutes([
            { path: '/', component: 'cms-dashboard' },
            { path: '/users', component: 'cms-users' },
            { path: '/statistics', component: 'cms-statistics' },
            { path: '/orders', component: 'cms-orders' },
            { path: '/products', component: 'products-overview-management' },
            { path: '/reviews', component: 'cms-reviews' },
            { path: '/tools', component: 'cms-tools' }
        ]);

        this.handleRouteChange();
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    private handleRouteChange() {
        const path = window.location.hash.replace('#/backoffice', '') || '/';
        void this.router.render({ pathname: path, search: '', hash: '' });
    }

    private navigate(path: string) {
        navigateTo(path);
    }

    protected render(): TemplateResult {
        return html`
            <div class="cms-container">
                <cms-sidebar .navigate="${this.navigate.bind(this)}"></cms-sidebar>
                <div id="cms-content" class="content"></div>
            </div>
        `;
    }
}

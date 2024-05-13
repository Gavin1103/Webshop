import {Router} from "@vaadin/router";
import "./views/home-page";
import "./views/404-page";
import "./views/product-detail-page";

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);

    await router.setRoutes([
        {path: "/homepage", component: "home-page"},
        {path: "/product-detail-page", component: "product-detail-page"},
        {path: "(.*)", component: "not-found"}

    ]);

    return router;
};
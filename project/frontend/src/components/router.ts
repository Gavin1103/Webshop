import {Router} from "@vaadin/router";
import "./views/productsOverview/products_overview";
import "./views/homePage/home-page";
import "./views/404-page";

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);

    await router.setRoutes([
        {path: "/home", component: "home-page"},
        {path: "/overview", component: "products-overview"},
        {path: "(.*)", component: "not-found"}
    ]);

    return router;
};
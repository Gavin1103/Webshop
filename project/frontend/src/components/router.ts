import {Context, Router} from "@vaadin/router";
import "./views/productsOverview/productsOverview";
import "./views/homePage/home-page";
import "./views/404-page";
import {ProductsOverview} from "./views/productsOverview/productsOverview";

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);


    await router.setRoutes([
        {path: "/home", component: "home-page"},
        {
            path: "/category/:id",
            component: "products-overview",
            action: (context: Context) => ProductsOverview.beforeEnter(context)
        },
        {
            path: "/search/:query",
            component: "products-overview",
            action: (context: Context) => ProductsOverview.beforeEnter(context),
        },
        {path: "(.*)", component: "not-found"}
    ]);

    return router;
};
import {Router} from "@vaadin/router";
import "./views/home-page";
import "./views/404-page";

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);

    await router.setRoutes([
        {path: "/", component: "home-page"},
        {path: "(.*)", component: "not-found"}
    ]);

    return router;
};
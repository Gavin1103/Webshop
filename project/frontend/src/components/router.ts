import {Router} from "@vaadin/router";
import "./views/homePage/home-page";
import "./views/loginPage/loginComponent";
import "./views/registerPage/RegisterComponent";
import "./views/404-page";

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);

    await router.setRoutes([
        {path: "/home", component: "home-page"},
        {path: "/login", component: "login-component"},
        {path: "/register", component: "register-component"},
        {path: "(.*)", component: "not-found"}
    ]);

    return router;
};
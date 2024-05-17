import {Router} from "@vaadin/router";
import "./views/productsOverview/productsOverview";
import "./views/homePage/home-page";
import "./views/404-page";

const routerState: { currentPath: string } = {
    currentPath: window.location.pathname  // Initially set to the current browser path
};


export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);


    await router.setRoutes([
        {path: "/home", component: "home-page"},
        {
            path: "/category/:id",
            component: "products-overview",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }

        },
        {
            path: "/search/:query",
            component: "products-overview",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }
        },
        {path: "(.*)", component: "not-found"}
    ]);

    return router;
};

function updatePath(pathname: string): void {
    routerState.currentPath = pathname;
}

export const getCurrentPath: () => string = () => {
    return routerState.currentPath;
};

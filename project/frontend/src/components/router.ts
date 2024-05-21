import {Router} from "@vaadin/router";
import "./views/homePage/home-page";
import "./views/shoppingCart/shoppingCart";
import "./views/404Page";

const routerState: { currentPath: string } = {
    currentPath: window.location.pathname  // Initially set to the current browser path
};

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    const router: Router = new Router(outlet);

    await router.setRoutes([
        {
            path: "/",
            component: "home-page",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("home-page");
            }
        },
        {
            path: "/cart",
            component: "shopping-cart",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "/cart/personal-info",
            component: "shopping-cart",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "/cart/overview",
            component: "shopping-cart",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "(.*)",
            component: "not-found",
            action: (context, commands): any => {
                updatePath(context.pathname);
                return commands.component("not-found");
            }
        }
    ]);

    return router;
};

function updatePath(pathname: string): void {
    routerState.currentPath = pathname;
}

export const getCurrentPath: () => string = () => {
    return routerState.currentPath;
};
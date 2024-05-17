import {Commands, Context, Router, RouterLocation} from "@vaadin/router";
import "@granite-elements/granite-vaadin-router";
import "./views/homePage/home-page";
import "./views/shoppingCart/shoppingCart";
import "./views/404Page";

const routerState: { currentPath: string } = {
    currentPath: window.location.hash.slice(1) || '/'
};

let router: Router;

export const initRouter: (outlet: HTMLElement) => Promise<Router> = async (outlet: HTMLElement): Promise<Router> => {
    router = new Router(outlet);

    const routes = [
        {
            path: "/",
            component: "home-page",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("home-page");
            }
        },
        {
            path: "/cart",
            component: "shopping-cart",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "/cart/personal-info",
            component: "shopping-cart",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "/cart/overview",
            component: "shopping-cart",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("shopping-cart");
            }
        },
        {
            path: "(.*)",
            component: "not-found",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("not-found");
            }
        }
    ];

    await router.setRoutes(routes);

    window.addEventListener('hashchange', (): void => {
        const path: string = window.location.hash.slice(1);
        console.log(path);

        navigateTo(path);
    });

    await router.render(createRouterLocation(routerState.currentPath));

    return router;
};

function updatePath(pathname: string): void {
    routerState.currentPath = pathname;
}

export const getCurrentPath: () => string = () => {
    return routerState.currentPath;
};

function createRouterLocation(path: string): RouterLocation {
    return {
        pathname: path,
        search: '',
        hash: '',
        baseUrl: '',
        params: {},
        route: null,
        routes: [],
        getUrl: (): string => path
    };
}

// Updated navigateTo function
export function navigateTo(path: string): void {
    if (router) {
        window.location.hash = path; // Update the hash, which will trigger the hashchange event
        const location: RouterLocation = createRouterLocation(path);
        void router.render(location);
        updatePath(path);
    } else {
        console.error("Router has not been initialized.");
    }
}

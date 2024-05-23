import {Commands, Context, Router, RouterLocation} from "@vaadin/router";
import "@granite-elements/granite-vaadin-router";
import "./views/homePage/home-page";
import "./views/shoppingCart/shoppingCart";
import "./views/404Page";
import "./views/productDetailPage/product-detail-page";

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
            path: "/product-detail-page",
            component: "product-detail-page",
            action: (context:Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("product-detail-page");
            }
        },
        {
            path: "/category/:id",
            component: "products-overview",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }

        },

        {
            path: "/register",
            component: "register-component",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("register-component");
            }
        },
        {
            path: "/login",
            component: "login-component",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("login-component");
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
            path: "/feedback",
            component: "feedback-list",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("feedback-list");
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

    const initialPath = window.location.hash.slice(1) || '/';
    await router.render(createRouterLocation(initialPath));

    window.addEventListener('hashchange', (): void => {
        const path: string = window.location.hash.slice(1);

        navigateTo(path);
    });


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

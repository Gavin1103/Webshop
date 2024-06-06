import {Commands, Context, Router, RouterLocation} from "@vaadin/router";
import "@granite-elements/granite-vaadin-router";
import "./views/homePage/home-page";
import "./views/shoppingCart/shoppingCart";
import "./views/404Page";
import "./views/productDetailPage/product-detail-page";
import {TokenService} from "../services/TokenService";
import {UserService} from "../services/UserService";

const routerState: { currentPath: string } = {
    currentPath: window.location.hash.slice(1) || '/'
};

let router: Router;
const _tokenService = new TokenService();
const _userservice = new UserService();

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
            path: "/product-detail-page/:id",
            component: "product-detail-page",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("product-detail-page");
            }
        },
        {
            path: "/category/:name",
            component: "products-overview",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }
        },
        {
            path: "/promotion",
            component: "products-overview",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }
        },
        {
            path: "/allProducts",
            component: "products-overview",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("products-overview");
            }
        },
        {
            path: "/search/:query",
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
            path: "/forgot-password",
            component: "forgot-password-component",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("forgot-password-component");
            }
        },
        {
            path: "/reset-password/:token",
            component: "reset-password-component",
            action: (context: Context, commands: Commands): any => {
                updatePath(context.pathname);
                return commands.component("reset-password-component");
            }
        },
        {
            path: '/confirmation/:id',
            component: 'email-confirmation',
            action: async (context: Context, commands: Commands): Promise<any> => {
                const id: any = context.params.id;
                await _userservice.confirmEmail(id);
                return commands.component('email-confirmation');
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
            action: async (context: Context, commands: Commands): Promise<any> => {
                if (!await _tokenService.isAdmin()) {
                    return commands.component("unauthorized-page");
                }

                updatePath(context.pathname);
                return commands.component("feedback-list");
            }
        },
        {
            path: "/backoffice",
            component: "cms-main",
            action: async (context: Context, commands: Commands): Promise<any> => {
                if (!await _tokenService.isAdmin()) {
                    return commands.component("unauthoorized-page");
                }

                updatePath(context.pathname);
                return commands.component("cms-main");
            },
            children: [
                {path: '/', component: 'cms-dashboard'},
                {path: '/users', component: 'cms-users'},
                {path: '/statistics', component: 'cms-statistics'},
                {path: '/orders', component: 'cms-orders'},
                {path: '/products', component: 'products-overview-management'},
                {path: '/reviews', component: 'cms-reviews'},
                {path: '/tools', component: 'cms-tools'},
            ]
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

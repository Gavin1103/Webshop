import {Router} from "@vaadin/router";

export function navigateTo(path: string): void {
    Router.go(path);
}
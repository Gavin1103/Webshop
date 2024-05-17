import {Router} from "@vaadin/router";

export function navigateTo(path: string): void {
    Router.go(path);
}

export function roundToTwoDecimals(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
}

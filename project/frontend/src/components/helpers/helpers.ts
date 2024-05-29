export function roundToTwoDecimals(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
}

export function getCookie(name: string): string | null {
    const nameLenPlus: number = (name.length + 1);
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null;
}
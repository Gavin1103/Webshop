export function roundToTwoDecimals(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
}


export function truncateStringFront(input: string, length: number): string {
    if (input.length <= length) {
        return input;
    } else {
        return input.slice(0, length) + "...";
    }
}


export function truncateStringBack(input: string, length: number): string {
    if (input.length <= length) {
        return input;
    } else {
        return "..." + input.slice(input.length - length);
    }
}
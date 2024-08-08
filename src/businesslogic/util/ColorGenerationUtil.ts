import { CalendarEvent } from "../types";

function intToRGB(hash: number) {
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

// Was too lazy to implement the hasing myself
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashStr(str: string): number {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md
function xorshift32amx(a: number): number {
    let t = Math.imul(a, 1597334677);
    t = t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | t << 24; // reverse byte order
    a ^= a << 13;
    a ^= a >>> 17;
    a ^= a << 5;
    return (a + t >>> 0) / 4294967296;
}

export const generateUniqueHexColor = (num: number): string => {
    return '#' + intToRGB(hashStr(xorshift32amx(num).toString()));
}
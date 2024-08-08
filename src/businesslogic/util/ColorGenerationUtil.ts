
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
    const hash: number = hashStr(xorshift32amx(num).toString());
    const rgb = (hash & 0x00FFFFFF);
    const br = (rgb & 0x00FF0000) >>> 16;
    const bg = (rgb & 0x0000FF00) >>> 8;
    const bb = rgb & 0x000000FF;

    // Color correction, to ensure it's never "too" dark/black (can't read text anymore then)
    let {h, s, v} = RGBtoHSV(br, bg, bb);
    // Maybe tweak the settings a bit more?
    if (v < 0.8) v = 0.8;
    if (s < 0.8) s = 0.8

    const {r, g, b} = HSVtoRGB(h, s, v);

    const numToHex = (n: number) => {
        const hex = n.toString(16).toUpperCase();
        return "00".substring(0, 2 - hex.length) + hex;
    }

    return `#${numToHex(r)}${numToHex(g)}${numToHex(b)}`;
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/* accepts parameters
* r  Object = {r:x, g:y, b:z}
* OR 
* r, g, b
*/
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
/**
 * @description 随机生成十六进制颜色
 * @example randomHexColorCode(); // '#e34155'
 */
export const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
};

/**
 * @description RGB转十六进制
 * @example RGBToHex(255, 165, 1); // '#ffa501'
 */
export const RGBToHex = (r, g, b) =>
    ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

/**
 * @description 十六进制转RGB
 * @example hexToRGB("#27ae60ff"); // 'rgba(39, 174, 96, 255)'
            hexToRGB("27ae60"); // 'rgb(39, 174, 96)'
            hexToRGB("#fff"); // 'rgb(255, 255, 255)'
 */
export const hexToRGB = (hex) => {
    let alpha = false,
        h = hex.slice(hex.startsWith("#") ? 1 : 0);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
        "rgb" +
        (alpha ? "a" : "") +
        "(" +
        (h >>> (alpha ? 24 : 16)) +
        ", " +
        ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
        ", " +
        ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
        (alpha ? `, ${h & 0x000000ff}` : "") +
        ")"
    );
};

/**
 * @description 将 RGB 颜色元组转换为 HSB 格式
 * @example RGBToHSB(252, 111, 48); 
 *          // [18.529411764705856, 80.95238095238095, 98.82352941176471]
 */
export const RGBToHSB = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const v = Math.max(r, g, b),
        n = v - Math.min(r, g, b);
    const h =
        n === 0
            ? 0
            : n && v === r
                ? (g - b) / n
                : v === g
                    ? 2 + (b - r) / n
                    : 4 + (r - g) / n;
    return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

/**
 * @description 将 HSB 颜色元组转换为 RGB 格式
 * @example HSBToRGB(18, 81, 99);
 *          // [252.45, 109.31084999999996, 47.965499999999984]
 */
export const HSBToRGB = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)];
};

/**
 * @description 将 RGB 颜色元组转换为 HSL 格式。
 * @example RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
 */
export const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};

/**
 * @description 将 HSL 颜色元组转换为 RGB 格式
 * @example RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
 */
export const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};

/**
 * @description 将 十六进制 3 位颜色扩展为 6 位颜色
 * @example extendHex("#03f"); // '#0033ff'
            extendHex("05a"); // '#0055aa'
 */
export const extendHex = (shortHex) =>
    "#" +
    shortHex
        .slice(shortHex.startsWith("#") ? 1 : 0)
        .split("")
        .map((x) => x + x)
        .join("");

//   作者：荣顶
//   链接：https://juejin.cn/post/7043448389022777351
//   来源：稀土掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
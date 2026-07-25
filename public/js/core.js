// core: palette, config, seeded RNG, tiny canvas helpers
export const PAL = {
  outline: "#2A1608", caramel: "#E8A95C", caramelD: "#C98A44", rust: "#B56B3A",
  gray: "#8B8B93", grayD: "#6E6E78", cream: "#F7E6C8", sky1: "#F3D9AE", sky2: "#E0A96B",
  mint: "#4FF2D8", hazard: "#F2C230", hero: "#3B2412", white: "#FFFFFF",
};
export const CFG = {
  H: 720, groundY: 600, gravity: 2400, jumpV: 820, maxJumps: 2,
  speed0: 360, speedMax: 640, rampT: 90,
  coyote: 0.10, buffer: 0.12, slideT: 0.55, invT: 1.2,
  playerH: 96, hitboxScale: 0.7, minGapBase: 420, minGapTime: 0.7,
  hearts: 3, magnet: 46, comboWindow: 2.5,
};
export const DEV = new URLSearchParams(location.search).has("dev");
export const AUTO = new URLSearchParams(location.search).has("auto");
export function mulberry32(seed) { let a = seed >>> 0; return function () {
  a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export const RNG = { logic: mulberry32(1337), visual: mulberry32(20260725) };
export const touchCapable = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
export function mkCanvas(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
export function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
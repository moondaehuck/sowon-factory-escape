// art2: pickups, hearts, floor tile, parallax backgrounds (procedural, FORMULA-driven)
import { PAL, mkCanvas, rr } from "./core.js";

export function drawJelly() {
  const c = mkCanvas(96, 96), g = c.getContext("2d");
  g.shadowColor = PAL.mint; g.shadowBlur = 18;
  g.fillStyle = PAL.mint; g.strokeStyle = PAL.outline; g.lineWidth = 6;
  rr(g, 18, 26, 60, 48, 22); g.fill(); g.stroke(); g.shadowBlur = 0;
  g.fillStyle = "rgba(255,255,255,.85)"; g.beginPath(); g.ellipse(38, 42, 8, 12, -0.5, 0, 7); g.fill();
  return c;
}
export function drawHeart() {
  const c = mkCanvas(72, 64), g = c.getContext("2d");
  g.fillStyle = "#FF5A6E"; g.strokeStyle = PAL.outline; g.lineWidth = 5;
  g.beginPath(); g.moveTo(36, 58); g.bezierCurveTo(-6, 26, 6, -8, 36, 14);
  g.bezierCurveTo(66, -8, 78, 26, 36, 58); g.fill(); g.stroke(); return c;
}
export function drawFloorTile() { // seamless horizontal tile, 256px
  const c = mkCanvas(256, 120), g = c.getContext("2d");
  g.fillStyle = PAL.grayD; g.fillRect(0, 0, 256, 120);
  g.fillStyle = PAL.gray; g.fillRect(0, 34, 256, 86);
  g.strokeStyle = PAL.outline; g.lineWidth = 4; g.strokeRect(0, 34, 256, 86);
  g.fillStyle = PAL.grayD; for (const x of [40, 128, 216]) { g.beginPath(); g.arc(x, 77, 7, 0, 7); g.fill(); } // rivets
  g.fillStyle = PAL.hazard; g.fillRect(0, 0, 256, 30); // hazard stripe top edge
  g.fillStyle = PAL.outline;
  for (let x = -30; x < 256; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 30, 0);
    g.lineTo(x + 10, 30); g.lineTo(x - 20, 30); g.closePath(); g.fill(); }
  return c;
}
export function drawBgFar() { // gear silhouettes — far parallax layer
  const c = mkCanvas(1280, 720), g = c.getContext("2d");
  g.fillStyle = "rgba(122,74,32,.28)";
  for (const [x, y, r, teeth] of [[220, 250, 120, 10], [640, 180, 170, 12], [1060, 300, 100, 9], [440, 430, 70, 8]]) {
    g.beginPath();
    for (let i = 0; i < teeth; i++) { const a0 = (i / teeth) * 6.283, a1 = ((i + .5) / teeth) * 6.283;
      g.lineTo(x + Math.cos(a0) * r, y + Math.sin(a0) * r);
      g.lineTo(x + Math.cos(a1) * (r * 1.22), y + Math.sin(a1) * (r * 1.22)); }
    g.closePath(); g.fill();
    g.beginPath(); g.arc(x, y, r * .35, 0, 7); g.fill(); }
  return c;
}
export function drawBgMid() { // pipes + conveyor silhouettes — mid parallax layer
  const c = mkCanvas(1280, 720), g = c.getContext("2d");
  g.fillStyle = "rgba(90,52,22,.38)";
  for (const x of [80, 420, 760, 1100]) { rr(g, x, 60, 70, 420, 20); g.fill(); } // vertical pipes
  rr(g, 0, 90, 1280, 56, 20); g.fill();                                          // horizontal main
  for (const x of [240, 580, 920]) { g.beginPath(); g.arc(x, 118, 34, 0, 7); g.fill(); } // valves
  return c;
}
export function halfRes(src) { // translucent bg layers render at 0.5x, upscale on blit
  const c = mkCanvas(src.width / 2, src.height / 2);
  c.getContext("2d").drawImage(src, 0, 0, c.width, c.height); return c; }
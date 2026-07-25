
// art: procedural FORMULA-driven sprites (obstacles), pre-rendered once
import { PAL, mkCanvas, rr } from "./core.js";
import { drawJelly, drawHeart, drawFloorTile, drawBgFar, drawBgMid, halfRes } from "./art2.js";

export function drawCrate() {
  const c = mkCanvas(200, 200), g = c.getContext("2d");
  g.lineWidth = 10; g.strokeStyle = PAL.outline;
  g.fillStyle = PAL.caramel; rr(g, 12, 12, 176, 176, 18); g.fill(); g.stroke();
  g.fillStyle = PAL.caramelD;
  for (let i = 1; i < 4; i++) { g.fillRect(20, 12 + i * 44 - 5, 160, 10); }
  g.strokeStyle = PAL.rust; g.lineWidth = 8; g.beginPath();
  g.moveTo(30, 30); g.lineTo(170, 170); g.moveTo(170, 30); g.lineTo(30, 170); g.stroke();
  g.fillStyle = PAL.gray;
  for (const [x, y] of [[12, 12], [152, 12], [12, 152], [152, 152]]) { rr(g, x, y, 36, 36, 8); g.fill(); }
  return c;
}
export function drawSaw() {
  const c = mkCanvas(200, 200), g = c.getContext("2d"); const cx = 100, cy = 100;
  g.shadowColor = PAL.mint; g.shadowBlur = 22;
  g.fillStyle = PAL.gray; g.strokeStyle = PAL.outline; g.lineWidth = 7;
  g.beginPath();
  for (let i = 0; i < 14; i++) { const a0 = (i / 14) * Math.PI * 2, a1 = ((i + 0.5) / 14) * Math.PI * 2, a2 = ((i + 1) / 14) * Math.PI * 2;
    g.lineTo(cx + Math.cos(a0) * 62, cy + Math.sin(a0) * 62);
    g.lineTo(cx + Math.cos(a1) * 92, cy + Math.sin(a1) * 92);
    g.lineTo(cx + Math.cos(a2) * 62, cy + Math.sin(a2) * 62); }
  g.closePath(); g.fill(); g.stroke(); g.shadowBlur = 0;
  g.fillStyle = PAL.grayD; g.beginPath(); g.arc(cx, cy, 40, 0, 7); g.fill(); g.stroke();
  g.fillStyle = PAL.mint; g.beginPath(); g.arc(cx, cy, 12, 0, 7); g.fill();
  return c;
}
export function drawPipe() {
  const c = mkCanvas(240, 480), g = c.getContext("2d");
  g.lineWidth = 9; g.strokeStyle = PAL.outline;
  g.fillStyle = PAL.gray; rr(g, 70, 0, 100, 300, 16); g.fill(); g.stroke();
  g.fillStyle = PAL.rust; rr(g, 30, 290, 180, 120, 20); g.fill(); g.stroke();
  g.fillStyle = PAL.hazard;
  for (let i = 0; i < 5; i++) { g.save(); g.beginPath(); rr(g, 30, 400, 180, 46, 10); g.clip();
    g.fillRect(28 + i * 44, 398, 22, 52); g.restore(); }
  g.strokeStyle = PAL.outline; g.lineWidth = 9; rr(g, 30, 400, 180, 46, 10); g.stroke();
  g.fillStyle = PAL.grayD; g.beginPath(); g.arc(120, 60, 26, 0, 7); g.fill(); g.stroke();
  return c;
}

export const SPR = {};
export function buildSprites() {
  SPR.crate = drawCrate(); SPR.saw = drawSaw(); SPR.pipe = drawPipe();
  SPR.jelly = drawJelly(); SPR.heart = drawHeart(); SPR.floor = drawFloorTile();
  SPR.bgFar = halfRes(drawBgFar()); SPR.bgMid = halfRes(drawBgMid());
  SPR.player = new Image(); SPR.player.src = "./assets/player_run.png";
}

// hud: HUD, touch buttons, title/game-over overlays (drawn into the game ctx)
import { PAL, CFG, touchCapable, rr } from "./core.js";
import { SPR } from "./art.js";
import { G } from "./state.js";
import { S } from "../strings.js";

export function drawHud(ctx, VW, blit) {
  ctx.fillStyle = PAL.outline; ctx.font = "700 30px system-ui, sans-serif"; ctx.textBaseline = "top";
  for (let i = 0; i < (G.hearts ?? CFG.hearts); i++) blit(SPR.heart, 18 + i * 46, 16, 40, 36);
  ctx.fillText(`${S.distance} ${Math.floor(G.dist)}m`, 18, 62);
  ctx.fillText(`${S.jelly} ${G.jellies}`, 18, 100);
  if (G.combo > 2) { ctx.fillStyle = PAL.mint; ctx.fillText(`${S.combo} x${G.combo}`, 18, 138); }
  const bw = ctx.measureText(`${S.best} ${G.best}m`).width;
  ctx.fillStyle = PAL.outline; ctx.fillText(`${S.best} ${G.best}m`, VW - bw - 22, 18);
  // touch buttons (coarse pointers only — left: jump, right: slide)
  if (touchCapable && G.state === "run") {
    ctx.globalAlpha = 0.28; ctx.fillStyle = PAL.outline;
    rr(ctx, 26, CFG.H - 150, 170, 120, 26); ctx.fill();
    rr(ctx, VW - 196, CFG.H - 150, 170, 120, 26); ctx.fill();
    ctx.globalAlpha = 0.75; ctx.fillStyle = PAL.cream; ctx.textAlign = "center";
    ctx.font = "700 38px system-ui, sans-serif";
    ctx.fillText("▲ " + S.btnJump, 111, CFG.H - 112);
    ctx.fillText("▼ " + S.btnSlide, VW - 111, CFG.H - 112);
    ctx.textAlign = "left"; ctx.globalAlpha = 1; }
  // overlays
  if (G.state === "title" || G.state === "over") {
    ctx.fillStyle = "rgba(42,22,8,.55)"; ctx.fillRect(0, 0, VW, CFG.H);
    ctx.textAlign = "center"; ctx.fillStyle = PAL.cream;
    ctx.font = "800 64px system-ui, sans-serif";
    ctx.fillText(G.state === "title" ? S.title : S.gameover, VW / 2, 210);
    ctx.font = "600 34px system-ui, sans-serif";
    if (G.state === "over") { ctx.fillText(`${S.distance} ${Math.floor(G.dist)}m · ${S.jelly} ${G.jellies}`, VW / 2, 300); }
    ctx.fillText(G.state === "title" ? S.start : S.retry, VW / 2, 380);
    if (G.state === "title") { ctx.font = "500 26px system-ui, sans-serif";
      ctx.fillText(S.jump, VW / 2, 460); ctx.fillText(S.slide, VW / 2, 500); }
    ctx.textAlign = "left"; ctx.globalAlpha = 1; }
}
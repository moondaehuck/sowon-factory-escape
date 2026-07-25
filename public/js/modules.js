// modules: obstacle module vocabulary + jelly/particle spawners
import { CFG, RNG } from "./core.js";
import { G, PART_POOL } from "./state.js";

const MODULES = ["crate", "saw", "pipe", "crate2", "combo", "breather"];
export function spawnModule(x) {
  const phase = Math.min(1, G.t / CFG.rampT);
  const poolN = G.t < 15 ? 2 : G.t < 35 ? 4 : MODULES.length;
  const kind = MODULES[Math.floor(RNG.logic() * poolN)];
  const gY = CFG.groundY;
  if (kind === "crate") { G.obstacles.push({ k: "crate", x, w: 96, h: 96, y: gY - 96, hit: false }); jellyArc(x + 48, gY - 96); }
  else if (kind === "crate2") { G.obstacles.push({ k: "crate", x, w: 96, h: 96, y: gY - 96, hit: false },
    { k: "crate", x: x + 100, w: 96, h: 96, y: gY - 96, hit: false }); jellyArc(x + 98, gY - 96); }
  else if (kind === "saw") { G.obstacles.push({ k: "saw", x, w: 88, h: 88, y: gY - 88, hit: false, ph: RNG.logic() * 6.28 }); jellyArc(x + 44, gY - 88); }
  else if (kind === "pipe") { G.obstacles.push({ k: "pipe", x, w: 120, h: gY - 90, y: 0, hit: false }); jellyLine(x + 10, gY - 34, 4); }
  else if (kind === "combo") { G.obstacles.push({ k: "crate", x, w: 96, h: 96, y: gY - 96, hit: false },
    { k: "pipe", x: x + 300, w: 120, h: gY - 90, y: 0, hit: false }); jellyArc(x + 48, gY - 96); jellyLine(x + 310, gY - 34, 3); }
  else { jellyLine(x, gY - 40, 6); }
  const gap = Math.max(CFG.minGapBase, G.speed * CFG.minGapTime) * (1 + RNG.logic() * 0.25 - phase * 0.12);
  G.spawnIn = gap;
}
function jellyArc(cx, topY) { for (let i = 0; i < 5; i++) { const dx = (i - 2) * 44;
  G.jelliesA.push({ x: cx + dx, y: topY - 120 + (dx * dx) / 40, got: false }); } }
function jellyLine(x, y, n) { for (let i = 0; i < n; i++) G.jelliesA.push({ x: x + i * 52, y, got: false }); }
export function burst(x, y, mint) { let n = 0;
  for (const p of PART_POOL) { if (p.on) continue; p.on = true; p.x = x; p.y = y; p.mint = mint;
    const a = RNG.visual() * 6.28, sp = 120 + RNG.visual() * 260; p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp - 120;
    p.life = 0.5 + RNG.visual() * 0.3; if (++n >= 10) break; } }
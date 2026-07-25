// state: game state container + run reset
import { CFG, RNG, mulberry32 } from "./core.js";

export const G = {
  state: "title", t: 0, seed: 1337, runIndex: 0, speed: CFG.speed0, dist: 0, jellies: 0,
  combo: 0, comboT: 0, best: +(localStorage.getItem("sowon_best") || 0),
  px: 170, py: 0, vy: 0, jumps: 0, grounded: true, sliding: 0, coyote: 0, buf: 0, inv: 0,
  shake: 0, obstacles: [], jelliesA: [], parts: [], nextSpawn: 900, overT: 0, dead: false,
};
export const PART_POOL = []; for (let i = 0; i < 30; i++) PART_POOL.push({ on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, mint: false });
window.__G = G;

export function startRun() {
  G.state = "run"; G.t = 0; G.speed = CFG.speed0; G.dist = 0; G.jellies = 0; G.combo = 0; G.comboT = 0;
  G.py = 0; G.vy = 0; G.jumps = 0; G.grounded = true; G.sliding = 0; G.inv = 0; G.coyote = 0; G.buf = 0;
  G.hearts = CFG.hearts; G.overT = 0;
  G.obstacles.length = 0; G.jelliesA.length = 0; for (const p of PART_POOL) p.on = false;
  G.nextSpawn = 900; G.spawnIn = 700; G.runIndex++; RNG.logic = mulberry32(1337 + G.runIndex * 7919);
}
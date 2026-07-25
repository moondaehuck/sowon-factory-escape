// sim: fixed-step deterministic simulation
import { CFG, AUTO } from "./core.js";
import { G, PART_POOL } from "./state.js";
import { spawnModule } from "./modules.js";
import { input, slideTouches } from "./input.js";
import { AUD, beep, sfx } from "./audio.js";
import { collide } from "./collide.js";
import { autopilot } from "./autopilot.js";

export function update(dt) {
  if (AUTO) autopilot();
  if (G.state !== "run") { if (G.state === "over") G.overT += dt; return; }
  G.t += dt;
  G.speed = Math.min(CFG.speedMax, CFG.speed0 + (CFG.speedMax - CFG.speed0) * (G.t / CFG.rampT));
  G.dist += (G.speed * dt) / 50;

  if (input.jumpEdge) { G.buf = CFG.buffer; input.jumpEdge = false; }
  G.buf -= dt; G.coyote -= dt; G.inv -= dt; G.shake -= dt;
  const canGround = G.grounded || G.coyote > 0;
  if (G.buf > 0 && (canGround || G.jumps < CFG.maxJumps)) {
    G.vy = -CFG.jumpV * (G.grounded || G.coyote > 0 ? 1 : 0.92);
    G.jumps = (G.grounded || G.coyote > 0) ? 1 : G.jumps + 1;
    G.grounded = false; G.coyote = 0; G.buf = 0; G.sliding = 0; sfx(AUD.jump);
  }
  const wantSlide = input.slideHeld || slideTouches.size > 0;
  if (wantSlide && G.grounded && G.sliding <= 0) { G.sliding = CFG.slideT; beep("slide"); }
  if (G.sliding > 0) G.sliding -= dt;
  if (wantSlide && !G.grounded) G.vy += CFG.gravity * dt * 1.6;

  if (!G.grounded) { G.vy += CFG.gravity * dt; G.py += G.vy * dt;
    if (G.py >= 0) { G.py = 0; G.vy = 0; G.grounded = true; G.jumps = 0; } }
  else G.coyote = CFG.coyote;

  const dx = G.speed * dt;
  G.spawnIn -= dx;
  if (G.spawnIn <= 0) spawnModule(innerWidth + 40);
  for (let i = G.obstacles.length - 1; i >= 0; i--) { const o = G.obstacles[i]; o.x -= dx;
    if (o.k === "saw") o.ph += dt * 3;
    if (o.x + o.w < -60) G.obstacles.splice(i, 1); }
  for (let i = G.jelliesA.length - 1; i >= 0; i--) { const j = G.jelliesA[i]; j.x -= dx;
    if (j.x < -40 || j.got) G.jelliesA.splice(i, 1); }

  if (G.comboT > 0) { G.comboT -= dt; if (G.comboT <= 0) G.combo = 0; }

  collide();

  for (const p of PART_POOL) { if (!p.on) continue; p.life -= dt;
    if (p.life <= 0) { p.on = false; continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 900 * dt; }
}
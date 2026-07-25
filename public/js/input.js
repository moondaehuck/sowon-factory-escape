// input: keyboard (physical codes) + touch zones (left=jump, right=slide) + gamepad
import { initAudio } from "./audio.js";
import { G, startRun } from "./state.js";

const BIND = { Space: "jump", ArrowUp: "jump", KeyW: "jump", ArrowDown: "slide", KeyS: "slide" };
const PAD_JUMP = [0], PAD_SLIDE = [1, 13];
export const input = { jumpHeld: false, slideHeld: false, jumpEdge: false, padPrev: false };

addEventListener("keydown", (e) => { const c = BIND[e.code]; if (!c) return; e.preventDefault();
  if (c === "jump" && !input.jumpHeld) input.jumpEdge = true;
  if (c === "jump") input.jumpHeld = true; else input.slideHeld = true; anyGesture(); });
addEventListener("keyup", (e) => { const c = BIND[e.code]; if (!c) return;
  if (c === "jump") input.jumpHeld = false; else input.slideHeld = false; });

// touch: Cookie Run layout — LEFT half = jump, RIGHT half = slide
export const jumpTouches = new Set(), slideTouches = new Set();
function touchZone(x) { return x < innerWidth * 0.5 ? "jump" : "slide"; }
addEventListener("touchstart", (e) => { e.preventDefault(); anyGesture();
  for (const t of e.changedTouches) {
    if (touchZone(t.clientX) === "jump") { jumpTouches.add(t.identifier); input.jumpEdge = true; input.jumpHeld = true; }
    else slideTouches.add(t.identifier); } }, { passive: false });
function touchEnd(e) { e.preventDefault();
  for (const t of e.changedTouches) { jumpTouches.delete(t.identifier); slideTouches.delete(t.identifier); }
  if (jumpTouches.size === 0) input.jumpHeld = false; }
addEventListener("touchend", touchEnd, { passive: false });
addEventListener("touchcancel", touchEnd, { passive: false });
addEventListener("mousedown", () => { input.jumpEdge = true; anyGesture(); });

export function pollPad() { let j = false, sl = false;
  for (const gp of navigator.getGamepads?.() ?? []) { if (!gp) continue;
    for (const b of PAD_JUMP) if (gp.buttons[b]?.pressed) j = true;
    for (const b of PAD_SLIDE) if (gp.buttons[b]?.pressed) sl = true;
    if (gp.axes[1] > 0.5) sl = true; }
  if (j && !input.padPrev) { input.jumpEdge = true; anyGesture(); }
  input.padPrev = j; if (j) input.jumpHeld = true; if (sl) input.slideHeld = true; }

let audioStarted = false;
function anyGesture() {
  if (!audioStarted) { audioStarted = true; initAudio(); }
  if (G.state === "title") startRun();
  else if (G.state === "over" && G.overT > 0.6) startRun(); }
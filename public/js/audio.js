// audio: music/sfx files + WebAudio synth (hit, slide)
export const AUD = { ready: false, ctx: null, music: null, jump: null, pickup: null };
export function initAudio() {
  if (AUD.ready) return; AUD.ready = true;
  AUD.ctx = new (window.AudioContext || window.webkitAudioContext)();
  AUD.music = new Audio("./assets/music_run.m4a"); AUD.music.loop = true; AUD.music.volume = 0.12;
  AUD.jump = new Audio("./assets/sfx_jump.mp3"); AUD.jump.volume = 0.32;
  AUD.pickup = new Audio("./assets/sfx_pickup.mp3"); AUD.pickup.volume = 0.32;
  AUD.music.play().catch(() => {});
}
export function beep(type) {
  if (!AUD.ctx) return; const t = AUD.ctx.currentTime, g = AUD.ctx.createGain(); g.connect(AUD.ctx.destination);
  if (type === "hit") { const o = AUD.ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(50, t + 0.25); g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3); o.connect(g); o.start(t); o.stop(t + 0.3); }
  else { const o = AUD.ctx.createOscillator(); o.type = "triangle"; o.frequency.setValueAtTime(900, t);
    o.frequency.exponentialRampToValueAtTime(300, t + 0.18); g.gain.setValueAtTime(0.22, t);
    g.gain.exponentialRampToToValueAtTime(0.001, t + 0.2); o.connect(g); o.start(t); o.stop(t + 0.2); }
}
export function sfx(a) { if (!a) return; a.currentTime = 0; a.play().catch(() => {}); }
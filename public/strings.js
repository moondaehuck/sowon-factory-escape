// All player-visible strings
export const STR = {
  ko: {
    title: "소원이 공장 탈출기!",
    start: "탭 또는 스페이스로 출발!",
    jump: "점프: 스페이스 / 왼쪽 탭",
    slide: "슬라이드: ↓ / 오른쪽 탭",
    gameover: "공장에 다시 갇혔어요!",
    retry: "다시 탈출하기 (탭 / 스페이스)",
    distance: "거리",
    jelly: "젤리",
    best: "최고 기록",
    hearts: "하트",
    paused: "일시정지 — 탭하면 계속",
    combo: "콤보",
    btnJump: "점프",
    btnSlide: "슬라이드",
  },
  en: {
    title: "Sowon's Factory Escape!",
    start: "Tap or press SPACE to run!",
    jump: "Jump: Space / tap left half",
    slide: "Slide: Down / tap right half",
    gameover: "Caught by the factory!",
    retry: "Escape again (tap / space)",
    distance: "Distance",
    jelly: "Jelly",
    best: "Best",
    hearts: "Hearts",
    paused: "Paused — tap to resume",
    combo: "Combo",
    btnJump: "JUMP",
    btnSlide: "SLIDE",
  },
};
export const LANG = (navigator.language || "ko").startsWith("ko") ? "ko" : "en";
export const S = STR[LANG];
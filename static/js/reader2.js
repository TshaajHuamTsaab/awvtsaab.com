// ======================= DOM =======================
const bookDiv = document.getElementById("book");
const bookTitleDiv = document.getElementById("bookTitle");
const errorDiv = document.getElementById("error");
const audio = document.getElementById("chapter-audio");
const playBtn = document.getElementById("play-btn");
const speedBtn = document.getElementById("speed-btn");

// ======================= URL params =======================
const urlParams = new URLSearchParams(window.location.search);
let bookFolder = urlParams.get("book") || "book1";
let chapterNum = urlParams.get("chapter") || "cover";

// ======================= Book info =======================
const totalChapters = 50; // adjust to actual number
let isPlayingSequence = false; // track if user clicked Play to play all chapters

// ======================= Load chapter =======================
function loadChapter(book, num) {
  const file = `books/${book}/${num === "cover" ? "cover.html" : "chapter" + num + ".html"}`;
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("找不到文件: " + file);
      return res.text();
    })
    .then(html => {
      bookDiv.innerHTML = html;
      bookDiv.scrollTop = 0; // scroll top
      bookTitleDiv.textContent = `${book} - ${num === "cover" ? "封面" : "第 " + num + " 章"}`;
      loadAudio(book, num);
    })
    .catch(err => { errorDiv.textContent = "❌ " + err.message; });
}

// ======================= Load audio =======================
function loadAudio(book, num) {
  audio.src = `books/${book}/audio/${num === "cover" ? "cover" : "chapter" + num}.mp3`;
  audio.pause();
  audio.currentTime = 0;

  if (isPlayingSequence) audio.play();
}

// ======================= Audio ended =======================
audio.addEventListener("ended", () => {
  if (!isPlayingSequence) return;

  // go to next chapter
  if (chapterNum === "cover") chapterNum = 1;
  else chapterNum = parseInt(chapterNum) + 1;

  if (chapterNum > totalChapters) {
    isPlayingSequence = false;
    playBtn.textContent = "▶";
    return;
  }

  loadChapter(bookFolder, chapterNum);
});

// ======================= Play/pause button =======================
playBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (audio.paused) {
    // start sequence if at beginning
    if (!isPlayingSequence) isPlayingSequence = true;
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// ======================= Speed control =======================
let speeds = [0.5, 1, 1.5, 2];
let speedIndex = 1;
audio.playbackRate = speeds[speedIndex];

speedBtn.addEventListener("click", () => {
  speedIndex = (speedIndex + 1) % speeds.length;
  audio.playbackRate = speeds[speedIndex];
  speedBtn.textContent = speeds[speedIndex] + "x";
});

// ======================= Font size =======================
document.querySelector(".btn-font-plus").addEventListener("click", () => changeTextSize(2));
document.querySelector(".btn-font-minus").addEventListener("click", () => changeTextSize(-2));
function changeTextSize(delta) {
  const current = parseFloat(window.getComputedStyle(bookDiv).fontSize);
  bookDiv.style.fontSize = (current + delta) + "px";
}

// ======================= Theme toggle =======================
const backgrounds = [
  { bg: '#fdf6e3', color: '#222' },
  { bg: '#ffffff', color: '#222' },
  { bg: '#222222', color: '#fdf6e3' },
  { bg: '#e0f7fa', color: '#003' },
  { bg: '#fce4ec', color: '#4a148c' },
  { bg: '#e8f5e9', color: '#1b5e20' }
];

let bgIndex = 0;
document.querySelector(".btn-theme").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  const theme = backgrounds[bgIndex];
  document.body.style.background = theme.bg;
  document.body.style.color = theme.color;
  bookTitleDiv.style.color = theme.color;
  bookDiv.style.color = theme.color;
});

// ======================= Home button =======================
document.querySelector(".btn-home").addEventListener("click", () => {
  window.location.href = "library.html";
});

// ======================= Next / Prev chapter buttons =======================
document.querySelector(".btn-prev").addEventListener("click", () => {
  if (chapterNum === "cover") return;
  chapterNum = parseInt(chapterNum) - 1;
  if (chapterNum < 1) chapterNum = "cover";
  loadChapter(bookFolder, chapterNum);
});

document.querySelector(".btn-next").addEventListener("click", () => {
  if (chapterNum === "cover") chapterNum = 1;
  else chapterNum = parseInt(chapterNum) + 1;
  loadChapter(bookFolder, chapterNum);
});

// ======================= Keyboard navigation =======================
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    chapterNum = chapterNum === "cover" ? "cover" : parseInt(chapterNum) - 1;
    if (chapterNum < 1) chapterNum = "cover";
    loadChapter(bookFolder, chapterNum);
  }
  if (e.key === "ArrowRight") {
    chapterNum = chapterNum === "cover" ? 1 : parseInt(chapterNum) + 1;
    loadChapter(bookFolder, chapterNum);
  }
});

// ======================= Touch / Drag =======================
let touchStartX=0, touchStartY=0;
document.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
},{passive:true});
document.addEventListener("touchend", e => {
  const diffX = e.changedTouches[0].clientX - touchStartX;
  const diffY = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) loadChapter(bookFolder, chapterNum = chapterNum === "cover" ? "cover" : parseInt(chapterNum) - 1);
    else loadChapter(bookFolder, chapterNum = chapterNum === "cover" ? 1 : parseInt(chapterNum) + 1);
  }
});

let mouseStartX=0, mouseStartY=0, isDragging=false;
document.addEventListener('mousedown', e => { isDragging = true; mouseStartX=e.clientX; mouseStartY=e.clientY; });
document.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  const diffX = e.clientX - mouseStartX;
  const diffY = e.clientY - mouseStartY;
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) loadChapter(bookFolder, chapterNum = chapterNum === "cover" ? "cover" : parseInt(chapterNum) - 1);
    else loadChapter(bookFolder, chapterNum = chapterNum === "cover" ? 1 : parseInt(chapterNum) + 1);
  }
});

// ======================= Init =======================
loadChapter(bookFolder, chapterNum);

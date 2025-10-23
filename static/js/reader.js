let currentPage = 0;
let pages = [];
let audio = null;

const urlParams = new URLSearchParams(window.location.search);
const chapterNum = urlParams.get("chapter");

// 返回目录
function goBack() {
  window.location.href = "library.html";
}

// 加载章节文字
function loadChapter(num) {
  const file = `assets/chapter${num}.txt`;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("找不到文件: " + file);
      return res.text();
    })
    .then(text => {
      const chapters = text.split("==="); // 章节分页
      const bookDiv = document.getElementById("book");
      bookDiv.innerHTML = "";

      chapters.forEach((chapter, i) => {
        const page = document.createElement("div");
        page.className = "page";
        if (i === 0) page.classList.add("active");
        page.innerHTML = `<pre>${chapter.trim()}</pre>`;
        bookDiv.appendChild(page);
      });

      pages = document.querySelectorAll(".page");
      currentPage = 0;
      document.getElementById("bookTitle").textContent = "正在阅读：第 " + num + " 章";

      // 自动加载对应音频
      loadAudio(num);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("error").textContent = "❌ " + err.message;
    });
}

// 翻页
function showPage(n) {
  pages.forEach(p => p.classList.remove("active"));
  if (pages[n]) {
    pages[n].classList.add("active");
    currentPage = n;
  }
}

function nextPage() {
  if (currentPage < pages.length - 1) showPage(currentPage + 1);
}

function prevPage() {
  if (currentPage > 0) showPage(currentPage - 1);
}

// 音频播放
function loadAudio(num) {
  const audioFile = `src/chapter${num}.mp3`;
  audio = new Audio(audioFile);
  audio.onerror = () => {
    document.getElementById("error").textContent = "❌ 无法加载音频: " + audioFile;
  };
}

function toggleAudio() {
  if (!audio) return;
  if (audio.paused) audio.play();
  else audio.pause();
}

// 默认加载
if (!chapterNum) {
  document.getElementById("bookTitle").textContent = "未选择章节";
  document.getElementById("book").innerHTML =
    "<p style='color:red'>❌ URL 缺少 ?chapter=数字 参数，请从目录页点击章节</p>";
} else {
  loadChapter(chapterNum);
}

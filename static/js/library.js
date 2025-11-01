// ================== 📚 已完成书籍数据 ==================
const completedBooks = [
  { title:"趋吉避凶-叔敖", author:"叶夫根尼·普里戈任", cover:"https://i.postimg.cc/x1jWMsn3/images.jpg", link:"wagner.html?book=book1" },
  { title:"21世纪21堂课", author:"Yuval Noah Harari", cover:"https://i.postimg.cc/vTQ1GFwy/6.jpg", link:"21century.html" },
  { title:"乌合之众", author:"古斯塔夫·勒庞", cover:"https://i.postimg.cc/qMN7SM1m/image.jpg", link:"reader2.html?book=book1&chapter=cover" },
  { title:"低调影人", author:"叔敖", cover:"https://i.postimg.cc/tT5TPWr9/1.jpg", link:"reader2.html?book=book2&chapter=cover" },
  { title:"人性的弱点", author:"戴尔·卡耐基", cover:"https://i.postimg.cc/d3pK4r6P/5.jpg", link:"reader2.html?book=book3&chapter=cover" },
  { title:"习惯的力量", author:"查尔斯·杜希格", cover:"https://i.postimg.cc/k5KscCrG/image.jpg", link:"reader2.html?book=book4&chapter=cover" },
  { title:"自私的基因", author:"理查德·道金斯", cover:"https://i.postimg.cc/y8cm6FHD/image.jpg", link:"reader2.html?book=book5&chapter=cover" },
  { title:"社会性动物", author:"大卫·迈尔斯", cover:"https://i.postimg.cc/RhgzG866/image.jpg", link:"reader2.html?book=book6&chapter=cover" },
  { title:"人类简史", author:"尤瓦尔·赫拉利", cover:"https://i.postimg.cc/ydn5zRV2/image.jpg", link:"reader2.html?book=book7&chapter=cover" },
  { title:"自卑与超越", author:"阿尔弗雷德·阿德勒", cover:"https://i.postimg.cc/3rBLV3kD/image.jpg", link:"reader2.html?book=book8&chapter=cover" },
  { title:"利维坦", author:"托马斯·霍布斯", cover:"https://i.postimg.cc/pT1ZZJVV/image.jpg", link:"reader2.html?book=book9&chapter=cover" },
  { title:"君主论", author:"马基雅维利", cover:"https://i.postimg.cc/k52F5tFk/image.png", link:"reader2.html?book=book10&chapter=cover" },
  { title:"罪与罚", author:"陀思妥耶夫斯基", cover:"https://i.postimg.cc/0Qprz9M3/10.gif", link:"reader2.html?book=book11&chapter=cover" },
  { title:"存在与虚无", author:"萨特", cover:"https://i.postimg.cc/NM1LKQ9n/9.gif", link:"reader2.html?book=book12&chapter=cover" },
  { title:"黄石公三略", author:"黄石公", cover:"https://i.postimg.cc/N0DNhykd/book16-1.gif", link:"reader2.html?book=book13&chapter=cover" }
];

const developingBooks = [
  { title: "创建思维", author: "璐瑶建议", cover: "../assets/books.logo/book (1).gif", link: "reader3.html?book=dev1&chapter=cover" },
  { title: "量子之门", author: "李雷", cover: "../assets/books.logo/book (2).gif", link: "reader3.html?book=dev2&chapter=cover" },
  { title: "为人处世四", author: "叔敖", cover: "../assets/books.logo/book (3).gif", link: "reader3.html?book=dev3&chapter=cover" },
  { title: "三略完整版", author: "黄石公", cover: "../assets/books.logo/book (4).gif", link: "reader3.html?book=dev4&chapter=cover" },
  { title: "《喜悦之皇》", author: "欧逊·渥恩（Ocean Vuong）", cover: "../assets/books.logo/book (5).gif", link: "reader3.html?book=dev5&chapter=cover" },
  { title: "《心灯：短篇故事集》", author: "巴努·穆什塔克（Banu Mushtaq）", cover: "../assets/books.logo/book (6).gif", link: "reader3.html?book=dev6&chapter=cover" },
  { title: "《重燃的黎明》", author: "苏珊·柯林斯（Suzanne Collins）", cover: "../assets/books.logo/book (7).gif", link: "reader3.html?book=dev7&chapter=cover" },
  { title: "时间裂缝", author: "许楠", cover: "../assets/books.logo/book (8).gif", link: "reader3.html?book=dev8&chapter=cover" },
  { title: "数据意识", author: "周远", cover: "../assets/books.logo/book (9).gif", link: "reader3.html?book=dev9&chapter=cover" },
  { title: "代码帝国", author: "刘星", cover: "../assets/books.logo/book (10).gif", link: "reader3.html?book=dev10&chapter=cover" },
  { title: "星海归途", author: "张婷", cover: "../assets/books.logo/book (11).gif", link: "reader3.html?book=dev11&chapter=cover" },
  { title: "心灵算法", author: "王泽", cover: "../assets/books.logo/book (12).gif", link: "reader3.html?book=dev12&chapter=cover" },
  { title: "暗物质战争", author: "李航", cover: "../assets/books.logo/book (13).gif", link: "reader3.html?book=dev13&chapter=cover" },
  { title: "人类备份计划", author: "赵琳", cover: "../assets/books.logo/book (14).gif", link: "reader3.html?book=dev14&chapter=cover" },
  { title: "赛博之心", author: "陈阳", cover: "../assets/books.logo/book (15).gif", link: "reader3.html?book=dev15&chapter=cover" },

  // 其余 16 ~ 50 本书保持原封面链接
{ title: "平行宇宙档案", author: "郭彬", cover: "../assets/books.logo/book16 (1).gif", link: "reader3.html?book=dev16&chapter=cover" },
  { title: "人工梦境", author: "周洁", cover: "../assets/books.logo/book16 (2).gif", link: "reader3.html?book=dev17&chapter=cover" },
  { title: "末日网络", author: "何楠", cover: "../assets/books.logo/book16 (3).gif", link: "reader3.html?book=dev18&chapter=cover" },
  { title: "AI迷城", author: "林浩", cover: "../assets/books.logo/book16 (4).gif", link: "reader3.html?book=dev19&chapter=cover" },
  { title: "虚拟边疆", author: "孙悦", cover: "../assets/books.logo/book16 (5).gif", link: "reader3.html?book=dev20&chapter=cover" },
  { title: "重启黎明", author: "魏涛", cover: "../assets/books.logo/book16 (6).gif", link: "reader3.html?book=dev21&chapter=cover" },
  { title: "流浪地球纪元", author: "张琛", cover: "../assets/books.logo/book16 (7).gif", link: "reader3.html?book=dev22&chapter=cover" },
  { title: "未来契约", author: "刘敏", cover: "../assets/books.logo/book16 (8).gif", link: "reader3.html?book=dev23&chapter=cover" },
  { title: "机械心脏", author: "吴佳", cover: "../assets/books.logo/book16 (9).gif", link: "reader3.html?book=dev24&chapter=cover" },
  { title: "时间黑客", author: "徐帆", cover: "../assets/books.logo/book16 (10).gif", link: "reader3.html?book=dev25&chapter=cover" },
  { title: "虚空回响", author: "黄静", cover: "../assets/books.logo/book16 (11).gif", link: "reader3.html?book=dev26&chapter=cover" },
  { title: "深蓝意识", author: "陈凯", cover: "../assets/books.logo/book16 (12).gif", link: "reader3.html?book=dev27&chapter=cover" },
  { title: "记忆工厂", author: "赵菲", cover: "../assets/books.logo/book16 (13).gif", link: "reader3.html?book=dev28&chapter=cover" },
  { title: "梦行者", author: "王倩", cover: "../assets/books.logo/book16 (14).gif", link: "reader3.html?book=dev29&chapter=cover" },
  { title: "幻境之城", author: "李彤", cover: "../assets/books.logo/book16 (15).gif", link: "reader3.html?book=dev30&chapter=cover" },
  { title: "未来秩序", author: "刘泽", cover: "../assets/books.logo/book16 (16).gif", link: "reader3.html?book=dev31&chapter=cover" },
  { title: "星尘计划", author: "周林", cover: "../assets/books.logo/book16 (17).gif", link: "reader3.html?book=dev32&chapter=cover" },
  { title: "代码纪元", author: "赵健", cover: "../assets/books.logo/book16 (18).gif", link: "reader3.html?book=dev33&chapter=cover" },
  { title: "AI觉醒录", author: "林峰", cover: "../assets/books.logo/book16 (19).gif", link: "reader3.html?book=dev34&chapter=cover" },
  { title: "最后的文明", author: "王雪", cover: "../assets/books.logo/book16 (20).gif", link: "reader3.html?book=dev35&chapter=cover" },
  { title: "星图秘录", author: "李博", cover: "../assets/books.logo/book16 (21).gif", link: "reader3.html?book=dev36&chapter=cover" },
  { title: "智能陷阱", author: "周伟", cover: "../assets/books.logo/book16 (22).gif", link: "reader3.html?book=dev37&chapter=cover" },
  { title: "未来探针", author: "赵洁", cover: "../assets/books.logo/book16 (23).gif", link: "reader3.html?book=dev38&chapter=cover" },
  { title: "银河之心", author: "王凯", cover: "../assets/books.logo/book16 (24).gif", link: "reader3.html?book=dev39&chapter=cover" },
  { title: "异星旅人", author: "刘婷", cover: "../assets/books.logo/book16 (25).gif", link: "reader3.html?book=dev40&chapter=cover" },
  { title: "机器黎明", author: "何斌", cover: "../assets/books.logo/book16 (26).gif", link: "reader3.html?book=dev41&chapter=cover" },
  { title: "未来终端", author: "陈冰", cover: "../assets/books.logo/book16 (27).gif", link: "reader3.html?book=dev42&chapter=cover" },
  { title: "时间机器", author: "张亮", cover: "../assets/books.logo/book16 (28).gif", link: "reader3.html?book=dev43&chapter=cover" },
  { title: "虚拟帝国", author: "孙浩", cover: "../assets/books.logo/book16 (29).gif", link: "reader3.html?book=dev44&chapter=cover" },
  { title: "人类重启", author: "林婕", cover: "../assets/books.logo/book16 (30).gif", link: "reader3.html?book=dev45&chapter=cover" },
  { title: "AI战争", author: "周超", cover: "../assets/books.logo/book16 (31).gif", link: "reader3.html?book=dev46&chapter=cover" },
  { title: "数字灵魂", author: "李梦", cover: "../assets/books.logo/book16 (32).gif", link: "reader3.html?book=dev47&chapter=cover" },
  { title: "深空回忆录", author: "赵翔", cover: "../assets/books.logo/book16 (33).gif", link: "reader3.html?book=dev48&chapter=cover" },
  { title: "量子梦境", author: "韩月", cover: "../assets/books.logo/book16 (34).gif", link: "reader3.html?book=dev49&chapter=cover" },
  { title: "星际回声", author: "魏楠", cover: "../assets/books.logo/book16 (35).gif", link: "reader3.html?book=dev50&chapter=cover" }
];

// ================== 📢 Toast 提示 ==================
function showToast(msg){
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(()=> toast.classList.add("show"), 10);
  setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=> toast.remove(), 300);
  }, 2000);
}

// ================== ⭐ 星级评分功能 ==================
function addRating(link, stars){
  let allRatings = JSON.parse(localStorage.getItem("allRatings") || "{}");
  if(!allRatings[link]) allRatings[link] = [];
  allRatings[link].push(stars);
  localStorage.setItem("allRatings", JSON.stringify(allRatings));
}

function getAverageRating(link){
  let allRatings = JSON.parse(localStorage.getItem("allRatings") || "{}");
  if(!allRatings[link] || allRatings[link].length===0) return 0;
  const sum = allRatings[link].reduce((a,b)=>a+b,0);
  return sum / allRatings[link].length;
}

function updateStars(container, link){
  const avg = getAverageRating(link);
  [...container.children].forEach((star,i)=>{
    star.innerHTML = (i<Math.round(avg)) ? "★" : "☆";
  });
}

// ================== ⭐ 收藏/取消收藏 ==================
function toggleFavorite(book, btn){
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.findIndex(f => f.link === book.link);

  if(index === -1){
    favorites.push(book);
    showToast(`✅ 已收藏：${book.title}`);
    if(btn) btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
  } else {
    favorites.splice(index, 1);
    showToast(`❌ 已取消收藏：${book.title}`);
    if(btn) btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    const card = document.querySelector(`.book-card[data-link="${book.link}"]`);
    if(card && !btn.closest('.favorites-section')) card.remove();
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ================== 📖 阅读计时功能 ==================
let readingStartTime = null;
let currentReadingBook = null;

function startReading(bookTitle) {
  readingStartTime = Date.now();
  currentReadingBook = bookTitle;
  console.log(`开始阅读: ${bookTitle}`);
}

function stopReading() {
  if (readingStartTime && currentReadingBook) {
    const endTime = Date.now();
    const timeSpent = endTime - readingStartTime;
    
    if (timeSpent > 1000) { // 至少阅读1秒才记录
      let history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
      const existing = history.find(h => h.title === currentReadingBook);
      
      if (existing) {
        existing.timeSpent += timeSpent;
        existing.lastAccess = endTime;
      } else {
        history.push({ 
          title: currentReadingBook, 
          timeSpent, 
          lastAccess: endTime 
        });
      }
      localStorage.setItem("readingHistory", JSON.stringify(history));
      console.log(`记录阅读时间: ${currentReadingBook} - ${Math.floor(timeSpent/1000)}秒`);
    }
    
    readingStartTime = null;
    currentReadingBook = null;
  }
}

// ================== 🧩 渲染书籍 ==================
function renderBook(parent, book, options={}) {
  const card = document.createElement(options.link?"a":"div");
  if(options.link) card.href = book.link;
  card.className = "book-card";
  card.dataset.link = book.link;

  const img = document.createElement("img");
  img.src = book.cover;
  img.alt = book.title;
  img.loading = "lazy";

  const info = document.createElement("div");
  info.className="book-info";

  const title = document.createElement("h3");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = book.author;

  info.appendChild(title);
  info.appendChild(author);

  // ⭐ 收藏按钮 & 星级评分
  if(options.showFavorite){
    const favBtn = document.createElement("button");
    favBtn.className="favorite-btn";
    favBtn.title="收藏/取消收藏";
    favBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';

    favBtn.onclick = e=>{
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(book, favBtn);
    };
    info.appendChild(favBtn);

    // 星级评分
    const ratingDiv = document.createElement("div");
    ratingDiv.className = "rating";

    for(let s=1;s<=5;s++){
      const star = document.createElement("span");
      star.innerHTML = "☆";
      star.style.cursor = "pointer";
      star.style.fontSize = "18px";
      star.onclick = e=>{
        e.stopPropagation();
        addRating(book.link, s);
        updateStars(ratingDiv, book.link);
        showToast(`⭐ 您给《${book.title}》评分：${s}星`);
      };
      ratingDiv.appendChild(star);
    }
    updateStars(ratingDiv, book.link);
    info.appendChild(ratingDiv);
  }

  card.appendChild(img);
  card.appendChild(info);
  parent.appendChild(card);

  // 点击书卡开始计时
  card.addEventListener("click", ()=> startReading(book.title));
}

// ================== 📖 阅读记录面板 ==================
function createHistoryPanel(){
  let panel = document.getElementById("history-panel");
  if(panel) return panel;

  panel = document.createElement("div");
  panel.id = "history-panel";
  panel.style.position = "fixed";
  panel.style.top = "60px";
  panel.style.right = "20px";
  panel.style.width = "320px";
  panel.style.maxHeight = "400px";
  panel.style.background = "rgba(0,0,0,0.95)";
  panel.style.color = "#00ff00";
  panel.style.padding = "12px";
  panel.style.borderRadius = "12px";
  panel.style.overflowY = "auto";
  panel.style.boxShadow = "0 0 20px #00ff00";
  panel.style.zIndex = "9999";
  panel.style.fontSize = "14px";
  panel.style.whiteSpace = "pre-line";
  panel.style.display = "none";

  // 添加关闭按钮
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "5px";
  closeBtn.style.background = "transparent";
  closeBtn.style.border = "none";
  closeBtn.style.color = "#00ff00";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "16px";
  closeBtn.onclick = () => panel.style.display = "none";
  
  panel.appendChild(closeBtn);

  document.body.appendChild(panel);
  return panel;
}

function showReadingHistoryPanel(){
  stopReading();
  let history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
  if(history.length===0){
    showToast("⚠️ 暂无阅读记录");
    return;
  }
  history.sort((a,b)=> b.lastAccess - a.lastAccess);
  let text = "📖 阅读记录：\n\n";
  history.forEach(h=>{
    let seconds = Math.floor(h.timeSpent / 1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let remMinutes = minutes%60;
    let remSeconds = seconds%60;
    text += `${h.title} — ${hours}小时 ${remMinutes}分 ${remSeconds}秒\n`;
  });
  const panel = createHistoryPanel();
  // 避免覆盖关闭按钮
  const content = document.createElement("div");
  content.style.marginTop = "20px";
  content.textContent = text;
  panel.appendChild(content);
  panel.style.display = "block";
}

// ================== 📚 初始化完成书籍 ==================
const completedContainer = document.getElementById("completed-books");
if (completedContainer) {
  completedBooks.forEach(book => renderBook(completedContainer, book, {link: true, showFavorite: true}));
}

// ================== 📚 渲染开发中书籍 ==================
const developingContainer = document.getElementById("developing-books");
if (developingContainer && developingBooks.length > 0) {
  developingBooks.forEach(book => {
    renderBook(developingContainer, book, { link: true, showFavorite: true });
  });
}

// ================== ⭐ 渲染收藏书籍 ==================
function renderFavorites() {
  const favoritesContainer = document.getElementById("favorites-books");
  if (!favoritesContainer) return;
  
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favoritesContainer.innerHTML = "";
  
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p style="text-align:center; color:#666;">暂无收藏书籍</p>';
    return;
  }
  
  favorites.forEach(book => {
    renderBook(favoritesContainer, book, { link: true, showFavorite: true });
  });
}

// ================== 🕘 历史按钮绑定 ==================
const historyBtn = document.getElementById("reading-history");
if (historyBtn) {
  historyBtn.addEventListener("click", showReadingHistoryPanel);
}

// ================== 💾 页面离开自动记录 ==================
window.addEventListener("beforeunload", stopReading);

// 页面隐藏时也记录时间（切换标签页等）
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopReading();
  }
});

// ================== 🎯 初始化函数 ==================
function initLibrary() {
  // 渲染收藏书籍
  renderFavorites();
  
  // 初始化收藏按钮状态
  updateFavoriteButtons();
  
  console.log('📚 图书馆初始化完成');
  console.log('已完成书籍:', completedBooks.length);
  console.log('开发中书籍:', developingBooks.length);
}

// ================== 🔄 更新收藏按钮状态 ==================
function updateFavoriteButtons() {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  
  favoriteButtons.forEach(btn => {
    const card = btn.closest('.book-card');
    if (card) {
      const link = card.dataset.link;
      const isFavorite = favorites.some(fav => fav.link === link);
      btn.innerHTML = isFavorite ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
    }
  });
}

// ================== 🎨 添加Toast样式 ==================
function addToastStyles() {
  if (document.querySelector('#toast-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: #00ff00;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid #00ff00;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-size: 14px;
      max-width: 300px;
      word-wrap: break-word;
    }
    .toast.show {
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);
}

// ================== 🚀 启动应用 ==================
document.addEventListener('DOMContentLoaded', function() {
  // 添加Toast样式
  addToastStyles();
  
  // 初始化图书馆
  initLibrary();
  
  // 监听收藏变化
  window.addEventListener('storage', function(e) {
    if (e.key === 'favorites') {
      renderFavorites();
      updateFavoriteButtons();
    }
  });
  
  console.log('🚀 图书馆应用已启动');
});

// ================== 📊 调试功能 ==================
window.debugLibrary = {
  clearHistory: () => {
    localStorage.removeItem('readingHistory');
    localStorage.removeItem('favorites');
    localStorage.removeItem('allRatings');
    showToast('🗑️ 已清除所有数据');
    setTimeout(() => location.reload(), 1000);
  },
  showStats: () => {
    const history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const ratings = JSON.parse(localStorage.getItem("allRatings") || "{}");
    
    console.log('📊 图书馆统计:');
    console.log('阅读记录:', history.length, '条');
    console.log('收藏书籍:', favorites.length, '本');
    console.log('评分数据:', Object.keys(ratings).length, '本书');
    console.log('总数据大小:', JSON.stringify(localStorage).length, '字节');
  }
};

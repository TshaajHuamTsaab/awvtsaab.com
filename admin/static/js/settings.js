    // DOM 元素
    const backBtn = document.getElementById('back-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutPopup = document.getElementById('logout-popup');
    const cancelLogout = document.getElementById('cancel-logout');
    const confirmLogout = document.getElementById('confirm-logout');
    const editNameBtn = document.getElementById('edit-name-btn');
    const editNamePopup = document.getElementById('edit-name-popup');
    const cancelEditName = document.getElementById('cancel-edit-name');
    const confirmEditName = document.getElementById('confirm-edit-name');
    const newNameInput = document.getElementById('new-name-input');
    const userName = document.getElementById('user-name');
    const upgradeBtn = document.getElementById('upgrade-btn');
    const recentBooksContainer = document.getElementById('recent-books');
    const achievementsContainer = document.getElementById('achievements-grid');

    // 模拟数据
    const recentBooks = [
      { title: "乌合之众", progress: 65 },
      { title: "21世纪21堂课", progress: 42 },
      { title: "人性的弱点", progress: 78 },
      { title: "习惯的力量", progress: 23 },
      { title: "自私的基因", progress: 56 },
      { title: "君主论", progress: 89 }
    ];

    const achievements = [
      { name: "初读者", desc: "阅读第一本书", icon: "fa-book-open", unlocked: true },
      { name: "书虫", desc: "阅读10本书", icon: "fa-book", unlocked: true },
      { name: "夜猫子", desc: "深夜阅读", icon: "fa-moon", unlocked: true },
      { name: "速读者", desc: "一天读完一本书", icon: "fa-bolt", unlocked: false },
      { name: "收藏家", desc: "收藏10本书", icon: "fa-bookmark", unlocked: false },
      { name: "评论家", desc: "发表5条评论", icon: "fa-comment", unlocked: false }
    ];

    // 初始化页面
    function initProfile() {
      renderRecentBooks();
      renderAchievements();
      loadUserStats();
    }

    // 渲染最近阅读书籍
    function renderRecentBooks() {
      recentBooksContainer.innerHTML = '';
      recentBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-cover';
        bookElement.innerHTML = `
          <div>
            <div style="font-size: 10px; margin-bottom: 5px;">${book.progress}%</div>
            <div>${book.title}</div>
          </div>
        `;
        recentBooksContainer.appendChild(bookElement);
      });
    }

    // 渲染成就
    function renderAchievements() {
      achievementsContainer.innerHTML = '';
      achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement-card ${achievement.unlocked ? '' : 'locked'}`;
        achievementElement.innerHTML = `
          <div class="achievement-icon">
            <i class="fa-solid ${achievement.icon}"></i>
          </div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-desc">${achievement.desc}</div>
        `;
        achievementsContainer.appendChild(achievementElement);
      });
    }

    // 加载用户统计
    function loadUserStats() {
      // 这里可以从localStorage或后端API获取真实数据
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (userData.totalBooks) {
        document.getElementById('total-books').textContent = userData.totalBooks;
      }
      if (userData.readingTime) {
        document.getElementById('reading-time').textContent = userData.readingTime;
      }
      if (userData.completedBooks) {
        document.getElementById('completed-books').textContent = userData.completedBooks;
      }
      if (userData.readingStreak) {
        document.getElementById('reading-streak').textContent = userData.readingStreak;
      }
      if (userData.userName) {
        userName.textContent = userData.userName;
      }
      if (userData.isPremium) {
        document.getElementById('user-status').textContent = 'Premium';
        document.getElementById('user-status').classList.add('premium');
      }
    }

    // 事件监听
    backBtn.addEventListener('click', () => {
      window.history.back();
    });

    logoutBtn.addEventListener('click', () => {
      logoutPopup.classList.remove('hidden');
    });

    cancelLogout.addEventListener('click', () => {
      logoutPopup.classList.add('hidden');
    });

    confirmLogout.addEventListener('click', () => {
      // 执行退出逻辑
      localStorage.removeItem('userToken');
      window.location.href = 'login.html';
    });

    editNameBtn.addEventListener('click', () => {
      newNameInput.value = userName.textContent;
      editNamePopup.classList.remove('hidden');
    });

    cancelEditName.addEventListener('click', () => {
      editNamePopup.classList.add('hidden');
    });

    confirmEditName.addEventListener('click', () => {
      const newName = newNameInput.value.trim();
      if (newName) {
        userName.textContent = newName;
        // 保存到本地存储或发送到后端
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.userName = newName;
        localStorage.setItem('userData', JSON.stringify(userData));
        editNamePopup.classList.add('hidden');
      }
    });

    upgradeBtn.addEventListener('click', () => {
      // 跳转到会员升级页面
      window.location.href = 'premium.html';
    });

    // 初始化页面
    document.addEventListener('DOMContentLoaded', initProfile);

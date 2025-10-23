// ===== Firebase 配置 =====
    const firebaseConfig = {
      apiKey: "AIzaSyBCIVYd8e5vBeGRz-H12Nj9hd5dyqnZCDI",
      authDomain: "guardiangate-7xkgi.firebaseapp.com",
      projectId: "guardiangate-7xkgi",
      storageBucket: "guardiangate-7xkgi.firebasestorage.app",
      messagingSenderId: "133766737758",
      appId: "1:133766737758:web:38de135254fef4664769cf"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // 检查是否已登录
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // 没有用户时强制跳转回登录页
        window.location.href = "index.html";
      }
    });

    // 跳转到设置页
    function goSettings() {
      window.location.href = "settings.html";
    }

    // Settings Popup
const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settings-popup');
const closeSettings = document.getElementById('close-settings');

settingsBtn.addEventListener('click', () => {
  settingsPopup.classList.remove('hidden');
});

closeSettings.addEventListener('click', () => {
  settingsPopup.classList.add('hidden');
});

// Close popup if clicking outside
settingsPopup.addEventListener('click', (e) => {
  if(e.target === settingsPopup) {
    settingsPopup.classList.add('hidden');
  }
});

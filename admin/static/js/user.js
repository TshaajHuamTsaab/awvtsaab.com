// Firebase 配置 (与登录页面相同)
const firebaseConfig = {
    apiKey: "AIzaSyCIykTXLUC31VY10waIq2lNJHVeR_TAVys",
    authDomain: "shopping-f15d5.firebaseapp.com",
    projectId: "shopping-f15d5",
    storageBucket: "shopping-f15d5.firebasestorage.appspot.com",
    messagingSenderId: "655008250099",
    appId: "1:655008250099:web:22fa2d469d4ced70895f86",
    measurementId: "G-2H2TXJDJ46"
  };


// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 矩阵背景效果 (与登录页面相同)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const charArray = chars.split("");
const font_size = 14;
const columns = canvas.width / font_size;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#00FF41";
  ctx.font = font_size + "px 'Share Tech Mono'";
  
  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);
    
    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 用户数据管理
let currentUser = null;

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
  checkAuthState();
});

// 检查认证状态
function checkAuthState() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // 用户已登录
      currentUser = user;
      await loadUserData(user);
    } else {
      // 用户未登录，跳转到登录页面
      window.location.href = 'index.html';
    }
  });
}

// 加载用户数据
async function loadUserData(user) {
  try {
    // 从本地存储获取用户数据
    const localUserData = localStorage.getItem('currentUser');
    if (localUserData) {
      const userData = JSON.parse(localUserData);
      displayUserData(userData);
    }
    
    // 从 Firestore 获取最新数据
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      
      // 更新最后登录时间
      await db.collection('users').doc(user.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // 更新本地存储
      const updatedUserData = {
        uid: user.uid,
        email: user.email,
        ...userData
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
      
      displayUserData(updatedUserData);
    }
    
  } catch (error) {
    console.error('加载用户数据错误:', error);
    showNotification('加载用户数据失败', 'error');
  }
}

// 显示用户数据
function displayUserData(userData) {
  // 更新欢迎信息
  document.getElementById('userName').textContent = userData.name || '用户';
  document.getElementById('welcomeMessage').textContent = `欢迎回到 Awvtsaab's 漆书，${userData.name}！`;
  
  // 更新个人信息
  document.getElementById('displayName').textContent = userData.name || '-';
  document.getElementById('displayEmail').textContent = userData.email || '-';
  document.getElementById('displayAge').textContent = userData.age || '-';
  document.getElementById('displayGender').textContent = getGenderText(userData.gender);
  document.getElementById('displayPhone').textContent = userData.phone || '-';
  document.getElementById('displayUID').textContent = userData.uid || '-';
  
  // 更新统计信息 (这里可以添加真实的统计逻辑)
  document.getElementById('loginCount').textContent = '1';
  document.getElementById('accountAge').textContent = '1';
  document.getElementById('lastLogin').textContent = '刚刚';
}

// 获取性别文本
function getGenderText(gender) {
  const genderMap = {
    'male': '男',
    'female': '女',
    'other': '其他'
  };
  return genderMap[gender] || '-';
}

// 退出登录
async function logout() {
  try {
    await auth.signOut();
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('退出错误:', error);
    showNotification('退出失败', 'error');
  }
}

// 编辑资料
function editProfile() {
  showNotification('编辑资料功能开发中...', 'info');
}

// 修改密码
function changePassword() {
  showNotification('修改密码功能开发中...', 'info');
}

// 查看历史
function viewHistory() {
  showNotification('查看历史功能开发中...', 'info');
}

// 系统设置
function settings() {
  showNotification('系统设置功能开发中...', 'info');
}

// 显示通知
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  // 添加样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'error' ? 'rgba(255, 0, 0, 0.9)' : type === 'success' ? 'rgba(0, 255, 65, 0.9)' : 'rgba(0, 100, 255, 0.9)'};
    color: white;
    border-radius: 5px;
    border: 1px solid ${type === 'error' ? '#ff0000' : type === 'success' ? '#00ff41' : '#0080ff'};
    box-shadow: 0 0 20px ${type === 'error' ? 'rgba(255, 0, 0, 0.5)' : type === 'success' ? 'rgba(0, 255, 65, 0.5)' : 'rgba(0, 100, 255, 0.5)'};
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: 'Share Tech Mono', monospace;
    backdrop-filter: blur(10px);
  `;
  
  // 添加按钮样式
  notification.querySelector('button').style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(notification);
  
  // 3秒后自动移除
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// 添加通知样式到页面
const notificationStyles = `
  .notification {
    transition: all 0.3s ease;
  }
  
  .notification button:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-radius: 50%;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
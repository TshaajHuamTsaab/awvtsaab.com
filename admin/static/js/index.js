// Firebase 配置
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

// 矩阵背景效果
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

// 窗口调整大小时重置canvas
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 显示创建用户表单
function promptCreate() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('createForm').style.display = 'block';
  clearMessages();
}

// 返回登录
function backToLogin() {
  document.getElementById('createForm').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
  clearMessages();
  clearSignupForm();
}

// 清除消息
function clearMessages() {
  document.getElementById('loginMessage').innerHTML = '';
  document.getElementById('loginMessage').className = 'message';
  document.getElementById('signupMessage').innerHTML = '';
  document.getElementById('signupMessage').className = 'message';
}

// 清除注册表单
function clearSignupForm() {
  document.getElementById('signupName').value = '';
  document.getElementById('signupEmail').value = '';
  document.getElementById('signupPassword').value = '';
  document.getElementById('signupAge').value = '';
  document.getElementById('signupGender').selectedIndex = 0;
  document.getElementById('signupPhone').value = '';
}

// 显示消息
function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.innerHTML = message;
  element.className = `message ${type}`;
}

// 登录函数
async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showMessage('loginMessage', '请输入邮箱和密码', 'error');
    return;
  }
  
  try {
    showMessage('loginMessage', '登录中...', 'success');
    
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // 获取用户数据
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (userDoc.exists) {
      // 存储用户信息到本地存储
      localStorage.setItem('currentUser', JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: userDoc.data().name,
        age: userDoc.data().age,
        gender: userDoc.data().gender,
        phone: userDoc.data().phone
      }));
      
      showMessage('loginMessage', '登录成功！正在跳转...', 'success');
      
      // 跳转到用户页面
      setTimeout(() => {
        window.location.href = 'admin/user.html';
      }, 1500);
      
    } else {
      showMessage('loginMessage', '用户数据不存在', 'error');
    }
    
  } catch (error) {
    console.error('登录错误:', error);
    let errorMessage = '登录失败';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = '用户不存在';
        break;
      case 'auth/wrong-password':
        errorMessage = '密码错误';
        break;
      case 'auth/invalid-email':
        errorMessage = '邮箱格式不正确';
        break;
      case 'auth/too-many-requests':
        errorMessage = '尝试次数过多，请稍后再试';
        break;
    }
    
    showMessage('loginMessage', errorMessage, 'error');
  }
}

// 注册函数
async function confirmSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const age = document.getElementById('signupAge').value;
  const gender = document.getElementById('signupGender').value;
  const phone = document.getElementById('signupPhone').value;
  
  // 验证输入
  if (!name || !email || !password || !age || !gender || !phone) {
    showMessage('signupMessage', '请填写所有字段', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('signupMessage', '密码至少需要6位', 'error');
    return;
  }
  
  try {
    showMessage('signupMessage', '创建用户中...', 'success');
    
    // 创建认证用户
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // 存储用户数据到 Firestore
    await db.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      age: parseInt(age),
      gender: gender,
      phone: phone,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // 存储用户信息到本地存储
    localStorage.setItem('currentUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      name: name,
      age: parseInt(age),
      gender: gender,
      phone: phone
    }));
    
    showMessage('signupMessage', '用户创建成功！正在跳转...', 'success');
    
    // 跳转到用户页面
    setTimeout(() => {
      window.location.href = 'user.html';
    }, 1500);
    
  } catch (error) {
    console.error('注册错误:', error);
    let errorMessage = '注册失败';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = '邮箱已被使用';
        break;
      case 'auth/invalid-email':
        errorMessage = '邮箱格式不正确';
        break;
      case 'auth/weak-password':
        errorMessage = '密码强度不够';
        break;
    }
    
    showMessage('signupMessage', errorMessage, 'error');
  }
}

// 检查用户是否已登录
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.endsWith('index.html')) {
    // 如果用户已登录且当前在登录页面，直接跳转到用户页面
    window.location.href = 'user.html';
  }
});

// 回车键登录支持
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginEmail').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      login();
    }
  });
  
  document.getElementById('loginPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      login();
    }
  });
});
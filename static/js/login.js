// ======================= Firebase Setup =======================
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
const db = firebase.firestore();

// ======================= UI Sections =======================
function showSignup() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
}

function showLogin() {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

// ======================= Signup Logic =======================
function confirmSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const age = document.getElementById("signupAge").value;
  const gender = document.getElementById("signupGender").value;
  const phone = document.getElementById("signupPhone").value;

  if (!name || !email || !password || !age || !gender || !phone) {
    alert("⚠️ 保护您的隐私安全，随便填写即可🔐💡");
    return;
  }

  const confirmText = `
请确认以下信息:
👤 姓名: ${name}
📧 邮箱: ${email}
🔑 密码: ${"*".repeat(password.length)}
🎂 年龄: ${age}
⚧ 性别: ${gender}
📱 手机: ${phone}

是否确认创建新用户？`;

  if (confirm(confirmText)) {
    signup(name, email, password, age, gender, phone);
  }
}

async function signup(name, email, password, age, gender, phone) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      name, email, age, gender, phone,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("✅ 新用户创建成功！");
    window.location.href = "home.html"; // redirect after signup
  } catch (error) {
    alert("❌ " + error.message);
  }
}

// ======================= Login Logic =======================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("✅ 登录成功！");
    window.location.href = "home.html"; // redirect after login
  } catch (error) {
    alert("❌ " + error.message);
  }
}

// ======================= Matrix Background =======================
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

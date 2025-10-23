 // ====================== 弹窗控制 ======================
  const profileSection = document.getElementById('profile-section');
  const accountPopup = document.getElementById('account-popup');
  document.getElementById('close-account').onclick = () => accountPopup.style.display = 'none';
  profileSection.onclick = () => accountPopup.style.display = 'flex';

  const supportBtn = document.getElementById('support-btn');
  const supportPopup = document.getElementById('support-popup');
  document.getElementById('close-support').onclick = () => supportPopup.style.display = 'none';
  supportBtn.onclick = () => supportPopup.style.display = 'flex';

  const settingsBtn = document.getElementById('settings-btn');
  const settingsPopup = document.getElementById('settings-popup');
  document.getElementById('close-settings').onclick = () => settingsPopup.style.display = 'none';
  settingsBtn.onclick = () => settingsPopup.style.display = 'flex';

  // 会员升级弹窗
  const showMembershipBtn = document.getElementById('show-membership-popup');
  const membershipPopup = document.getElementById('membership-popup');
  const closeMembershipBtn = document.getElementById('close-membership');
  
  showMembershipBtn.onclick = () => membershipPopup.style.display = 'flex';
  closeMembershipBtn.onclick = () => membershipPopup.style.display = 'none';

  // 充值渠道弹窗
  const rechargePopup = document.getElementById('recharge-popup');
  const closeRechargeBtn = document.getElementById('close-recharge');
  closeRechargeBtn.onclick = () => rechargePopup.style.display = 'none';

  // ====================== VIP / Free 切换 ======================
  const vipBtn = document.getElementById('vip-btn');
  const freeBtn = document.getElementById('free-btn');
  const vipView = document.getElementById('vip-view');
  const freeView = document.getElementById('free-view');

  vipBtn.onclick = () => {
    vipView.classList.remove('hidden');
    freeView.classList.add('hidden');
    vipBtn.classList.add('bg-amber-500', 'text-white');
    vipBtn.classList.remove('bg-gray-200', 'text-gray-700');
    freeBtn.classList.remove('bg-indigo-500', 'text-white');
    freeBtn.classList.add('bg-gray-200', 'text-gray-700');
    document.getElementById('user-status').textContent = 'VIP';
    document.getElementById('user-status').className = 'vip-badge';
    document.getElementById('popup-user-status').textContent = 'VIP';
    document.getElementById('popup-user-status').className = 'vip-badge';
  };

  freeBtn.onclick = () => {
    freeView.classList.remove('hidden');
    vipView.classList.add('hidden');
    freeBtn.classList.add('bg-indigo-500', 'text-white');
    freeBtn.classList.remove('bg-gray-200', 'text-gray-700');
    vipBtn.classList.remove('bg-amber-500', 'text-white');
    vipBtn.classList.add('bg-gray-200', 'text-gray-700');
    document.getElementById('user-status').textContent = 'Free';
    document.getElementById('user-status').className = 'free-badge';
    document.getElementById('popup-user-status').textContent = 'Free';
    document.getElementById('popup-user-status').className = 'free-badge';
  };

 // ============ 头像上传 =============
  const uploadInput = document.getElementById('upload-input');
  const profileImg = document.getElementById('profile-img');
  const popupAvatar = document.getElementById('popup-avatar');

  uploadInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        profileImg.src = reader.result;
        localStorage.setItem('userAvatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // 加载本地存的头像
  window.addEventListener('DOMContentLoaded', () => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      profileImg.src = savedAvatar;
    }
  });
  // 点击主头像上传
  profileImg.addEventListener('click', (e) => {
    e.stopPropagation(); // ✅ 阻止触发弹窗
    uploadAvatar((result) => {
      profileImg.src = result;
      if (popupAvatar) popupAvatar.src = result;
    });
  });

  // 点击弹窗头像上传
  if (popupAvatar) {
    popupAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadAvatar((result) => {
        popupAvatar.src = result;
        profileImg.src = result;
      });
    });
  }

  // 头像上传函数
  function uploadAvatar(callback) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // 检查文件大小 (限制为2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert('图片大小不能超过2MB');
          return;
        }
        
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
          alert('请选择图片文件');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          // 创建图片预览
          const img = new Image();
          img.onload = function() {
            // 可以在这里添加图片压缩逻辑
            callback(e.target.result);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  // ====================== 复制ID ======================
  document.getElementById('copy-id').onclick = () => {
    navigator.clipboard.writeText(document.getElementById('user-id').innerText)
      .then(() => alert('用户ID已复制到剪贴板'));
  };

  document.getElementById('popup-copy-id').onclick = () => {
    navigator.clipboard.writeText(document.getElementById('popup-user-id').innerText)
      .then(() => alert('用户ID已复制到剪贴板'));
  };

  // ====================== 删除账户确认 ======================
  document.getElementById('delete-account').onclick = () => {
    if (confirm('确定要删除账户吗？此操作不可撤销！')) {
      alert('账户删除请求已提交');
    }
  };

  // ====================== 会员计划选择 ======================
  document.addEventListener('DOMContentLoaded', function () {
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    selectPlanButtons.forEach(button => {
      button.addEventListener('click', function () {
        document.querySelectorAll('.plan-card').forEach(card => {
          card.style.borderColor = 'transparent';
        });
        const card = this.closest('.plan-card');
        card.style.borderColor = '#4f46e5';

        const planName = card.querySelector('.plan-name').textContent;
        const planPrice = card.querySelector('.plan-price').textContent;
        document.querySelector('.upgrade-btn').textContent = `升级到 ${planName} - ${planPrice}`;

        document.querySelector('.payment-methods').style.display = 'flex';
        document.querySelector('.qr-code').style.display = 'block';
      });
    });

    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
      method.addEventListener('click', function () {
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');

        const paymentName = this.querySelector('.payment-name').textContent;
        document.querySelector('.qr-code').style.display = paymentName === '二维码支付' ? 'block' : 'none';
      });
    });

    document.querySelector('.upgrade-btn').addEventListener('click', function () {
      const selectedPlan = document.querySelector('.plan-card[style*="border-color: rgb(79, 70, 229)"]');
      if (!selectedPlan) {
        alert('请先选择一个会员计划');
        return;
      }
      const selectedPayment = document.querySelector('.payment-method.active');
      if (!selectedPayment) {
        alert('请选择一种支付方式');
        return;
      }
      const paymentName = selectedPayment.querySelector('.payment-name').textContent;
      const planName = selectedPlan.querySelector('.plan-name').textContent;

      if (paymentName === '二维码支付') {
        simulateQRPayment();
      } else {
        simulatePayment(planName, paymentName);
      }
    });

    function simulateQRPayment() {
      const upgradeBtn = document.querySelector('.upgrade-btn');
      const originalText = upgradeBtn.textContent;
      upgradeBtn.textContent = '支付中...';
      upgradeBtn.disabled = true;

      setTimeout(() => {
        document.querySelector('.success-message').style.display = 'block';
        upgradeBtn.textContent = originalText;
        upgradeBtn.disabled = false;
        setTimeout(() => {
          document.querySelector('.success-message').style.display = 'none';
        }, 3000);
      }, 2000);
    }

    function simulatePayment(planName, paymentName) {
      alert(`正在跳转到${paymentName}支付页面，升级${planName}会员...`);
      setTimeout(() => {
        document.querySelector('.success-message').style.display = 'block';
        setTimeout(() => {
          document.querySelector('.success-message').style.display = 'none';
        }, 3000);
      }, 1500);
    }

    document.querySelector('.plan-card.popular .select-plan').click();
  });

  // ====================== 充值渠道逻辑 ======================
  function openRecharge(channel) {
    const rechargePopup = document.getElementById('recharge-popup');
    const rechargeTitle = document.getElementById('recharge-title');
    const rechargeContent = document.getElementById('recharge-content');
    
    let title = '';
    let content = '';
    
    switch(channel) {
      case 'alipay':
        title = '支付宝充值';
        content = `
          <div class="text-center">
            <div class="mb-4">
              <i class="fa-brands fa-alipay text-4xl text-blue-500 mb-2"></i>
              <p class="font-semibold">支付宝扫码充值</p>
            </div>
            <div class="qr-container mb-4">
              <div style="background: white; padding: 15px; border-radius: 8px;">
                <div style="width: 150px; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #333; margin: 0 auto;">
                  支付宝二维码
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-4">请使用支付宝扫描上方二维码完成充值</p>
            <div class="bg-blue-50 p-3 rounded-lg text-sm">
              <p class="font-semibold">充值说明：</p>
              <p>1. 扫码后输入充值金额</p>
              <p>2. 完成支付后系统自动到账</p>
              <p>3. 如有问题请联系客服</p>
            </div>
          </div>
        `;
        break;
        
      case 'wechat':
        title = '微信支付充值';
        content = `
          <div class="text-center">
            <div class="mb-4">
              <i class="fa-brands fa-weixin text-4xl text-green-500 mb-2"></i>
              <p class="font-semibold">微信扫码充值</p>
            </div>
            <div class="qr-container mb-4">
              <div style="background: white; padding: 15px; border-radius: 8px;">
                <div style="width: 150px; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #333; margin: 0 auto;">
                  微信二维码
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-4">请使用微信扫描上方二维码完成充值</p>
            <div class="bg-green-50 p-3 rounded-lg text-sm">
              <p class="font-semibold">充值说明：</p>
              <p>1. 保存二维码到相册</p>
              <p>2. 通过微信扫一扫识别</p>
              <p>3. 完成支付后自动到账</p>
            </div>
          </div>
        `;
        break;
        
      case 'bank':
        title = '银行转账充值';
        content = `
          <div class="text-center">
            <div class="mb-4">
              <i class="fa-solid fa-building-columns text-4xl text-purple-500 mb-2"></i>
              <p class="font-semibold">银行转账信息</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg text-left mb-4">
              <div class="mb-2">
                <span class="font-semibold">银行名称：</span>
                <span>中国工商银行</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">账户名称：</span>
                <span>某某科技有限公司</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">账号：</span>
                <span>6222 0210 0112 3456 789</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">开户行：</span>
                <span>工商银行北京分行朝阳支行</span>
              </div>
            </div>
            <div class="bg-yellow-50 p-3 rounded-lg text-sm">
              <p class="font-semibold">重要提示：</p>
              <p>1. 转账时请备注您的用户ID</p>
              <p>2. 转账完成后联系客服确认</p>
              <p>3. 到账时间：1-2个工作日</p>
            </div>
          </div>
        `;
        break;
        
      case 'crypto':
        title = '加密货币充值';
        content = `
          <div class="text-center">
            <div class="mb-4">
              <i class="fa-brands fa-bitcoin text-4xl text-orange-500 mb-2"></i>
              <p class="font-semibold">加密货币充值</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg text-left mb-4">
              <div class="mb-3">
                <p class="font-semibold mb-1">USDT (TRC20):</p>
                <div class="flex items-center justify-between bg-white p-2 rounded border">
                  <span id="usdt-address">TAbcdefGHIJK1234567890xyz</span>
                  <button onclick="copyText('usdt-address')" class="text-orange-500">
                    <i class="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <p class="font-semibold mb-1">BTC:</p>
                <div class="flex items-center justify-between bg-white p-2 rounded border">
                  <span id="btc-address">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</span>
                  <button onclick="copyText('btc-address')" class="text-orange-500">
                    <i class="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-red-50 p-3 rounded-lg text-sm">
              <p class="font-semibold">注意事项：</p>
              <p>1. 仅支持USDT(TRC20)和BTC</p>
              <p>2. 请勿向上述地址发送其他币种</p>
              <p>3. 到账时间：3个网络确认后</p>
            </div>
          </div>
        `;
        break;
    }
    
    rechargeTitle.textContent = title;
    rechargeContent.innerHTML = content;
    rechargePopup.style.display = 'flex';
  }

  // 复制文本函数
  function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text)
      .then(() => alert('地址已复制到剪贴板'));
  }
 
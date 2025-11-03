// ========== 全局变量和配置 ==========
const bookDiv = document.getElementById("book");
const bookTitleDiv = document.getElementById("bookTitle");
const errorDiv = document.getElementById("error");
const audio = document.getElementById("chapter-audio");

// 路径配置 - 根据您的文件结构调整
const PATH_CONFIG = {
    basePath: 'books/src',    // 基础路径
    audioSubfolder: 'audio'   // 音频子文件夹
};

// 从URL获取参数
const urlParams = new URLSearchParams(window.location.search);
let bookFolder = urlParams.get("book") || "dev1";
let chapterNum = urlParams.get("chapter") || "cover";

// 播放状态
let isPlayingSequence = false;
let startTime = Date.now();
let bookTitle = "";
let currentBookData = null;

// ========== 书籍数据映射 ==========
const bookDataMap = {
    'dev1': { title: '创建思维', author: '璐瑶建议' },
    'dev2': { title: '量子之门', author: '李雷' },
    'dev3': { title: '为人处事', author: '叔敖' },
    'dev4': { title: '未来城市', author: '赵强' },
    'dev5': { title: '《喜悦之皇》', author: '欧逊·渥恩（Ocean Vuong）' },
    'dev6': { title: '《心灯：短篇故事集》', author: '巴努·穆什塔克（Banu Mushtaq）' },
    'dev7': { title: '《重燃的黎明》', author: '苏珊·柯林斯（Suzanne Collins）' },
    'dev8': { title: '《第一绅士》', author: '比尔·克林顿 & 詹姆斯·帕特森' },
    'dev9': { title: '数据意识', author: '周远' },
    'dev10': { title: '代码帝国', author: '刘星' },
    'dev11': { title: '星海归途', author: '张婷' },
    'dev12': { title: '心灵算法', author: '王泽' },
    'dev13': { title: '暗物质战争', author: '李航' },
    'dev14': { title: '人类备份计划', author: '赵琳' },
    'dev15': { title: '赛博之心', author: '陈阳' },
    'dev16': { title: '平行宇宙档案', author: '郭彬' },
    'dev17': { title: '人工梦境', author: '周洁' },
    'dev18': { title: '末日网络', author: '何楠' },
    'dev19': { title: 'AI迷城', author: '林浩' },
    'dev20': { title: '虚拟边疆', author: '孙悦' },
    'dev21': { title: '重启黎明', author: '魏涛' },
    'dev22': { title: '流浪地球纪元', author: '张琛' },
    'dev23': { title: '未来契约', author: '刘敏' },
    'dev24': { title: '机械心脏', author: '吴佳' },
    'dev25': { title: '时间黑客', author: '徐帆' },
    'dev26': { title: '虚空回响', author: '黄静' },
    'dev27': { title: '深蓝意识', author: '陈凯' },
    'dev28': { title: '记忆工厂', author: '赵菲' },
    'dev29': { title: '梦行者', author: '王倩' },
    'dev30': { title: '幻境之城', author: '李彤' },
    'dev31': { title: '未来秩序', author: '刘泽' },
    'dev32': { title: '星尘计划', author: '周林' },
    'dev33': { title: '代码纪元', author: '赵健' },
    'dev34': { title: 'AI觉醒录', author: '林峰' },
    'dev35': { title: '最后的文明', author: '王雪' },
    'dev36': { title: '星图秘录', author: '李博' },
    'dev37': { title: '智能陷阱', author: '周伟' },
    'dev38': { title: '未来探针', author: '赵洁' },
    'dev39': { title: '银河之心', author: '王凯' },
    'dev40': { title: '异星旅人', author: '刘婷' },
    'dev41': { title: '机器黎明', author: '何斌' },
    'dev42': { title: '未来终端', author: '陈冰' },
    'dev43': { title: '时间机器', author: '张亮' },
    'dev44': { title: '虚拟帝国', author: '孙浩' },
    'dev45': { title: '人类重启', author: '林婕' },
    'dev46': { title: 'AI战争', author: '周超' },
    'dev47': { title: '数字灵魂', author: '李梦' },
    'dev48': { title: '深空回忆录', author: '赵翔' },
    'dev49': { title: '量子梦境', author: '韩月' },
    'dev50': { title: '星际回声', author: '魏楠' }
};

// ========== 核心功能函数 ==========

/**
 * 构建HTML文件路径
 */
function getHtmlPath(book, num) {
    return `${PATH_CONFIG.basePath}/${book}/${num === "cover" ? "cover.html" : `chapter${num}.html`}`;
}

/**
 * 构建音频文件路径
 */
function getAudioPath(book, num) {
    if (PATH_CONFIG.audioSubfolder) {
        return `${PATH_CONFIG.basePath}/${book}/${PATH_CONFIG.audioSubfolder}/${num === "cover" ? 'cover' : 'chapter' + num}.mp3`;
    } else {
        return `${PATH_CONFIG.basePath}/${book}/${num === "cover" ? 'cover' : 'chapter' + num}.mp3`;
    }
}

/**
 * 检查资源是否存在
 */
async function checkResourceExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * 加载章节内容
 */
async function loadChapter(book, num) {
    showLoading(true);
    
    const htmlFile = getHtmlPath(book, num);
    errorDiv.textContent = "";
    
    try {
        const res = await fetch(htmlFile);
        if (!res.ok) throw new Error(`HTML文件不存在: ${htmlFile}`);
        
        const html = await res.text();
        bookDiv.innerHTML = html;
        
        // 设置书名和标题
        currentBookData = bookDataMap[book] || { title: `开发书 ${book.replace('dev', '')}`, author: '未知作者' };
        bookTitle = currentBookData.title;
        
        const chapterText = num === "cover" ? "封面" : `第 ${num} 章`;
        bookTitleDiv.textContent = `${bookTitle} - ${chapterText}`;
        
        localStorage.setItem("currentBookTitle", bookTitle);
        chapterNum = num;
        
        // 更新URL但不刷新页面
        updateURL(book, num);
        
        // 重置阅读时间
        startTime = Date.now();
        
        // 更新媒体元数据（黑屏播放功能）
        updateMediaMetadata();
        
        // 加载音频
        await loadAudio(book, num);
        
        // 恢复播放状态（黑屏播放功能）
        restorePlaybackState();
        
    } catch (err) {
        console.error('加载章节失败:', err);
        errorDiv.textContent = "⚠️ " + err.message;
        await loadAudioIfExists(book, num);
    } finally {
        showLoading(false);
    }
}

/**
 * 加载音频文件
 */
async function loadAudio(book, num) {
    const path = getAudioPath(book, num);
    
    try {
        const audioExists = await checkResourceExists(path);
        if (!audioExists) {
            throw new Error("音频文件不存在");
        }
        
        audio.src = path;
        audio.load(); // 重新加载音频
        
        // 如果正在序列播放，自动播放
        if (isPlayingSequence) {
            await audio.play().catch(err => {
                console.log('自动播放被阻止，需要用户交互:', err);
                errorDiv.textContent = "🔇 点击播放按钮开始播放";
            });
        } else {
            // 重置播放按钮状态
            setDJPlayBtnToPlay();
        }
    } catch (err) {
        errorDiv.textContent = "⚠️ " + err.message;
        isPlayingSequence = false;
        setDJPlayBtnToPlay();
    }
}

/**
 * 仅加载音频（当HTML不存在时）
 */
async function loadAudioIfExists(book, num) {
    const path = getAudioPath(book, num);
    
    try {
        const audioExists = await checkResourceExists(path);
        if (audioExists) {
            audio.src = path;
            audio.load();
            if (isPlayingSequence) {
                await audio.play();
            }
        } else {
            throw new Error("章节资源完全缺失");
        }
    } catch (err) {
        errorDiv.textContent = "⚠️ " + err.message;
        isPlayingSequence = false;
        setDJPlayBtnToPlay();
    }
}

/**
 * 更新URL参数
 */
function updateURL(book, chapter) {
    const newUrl = `${window.location.pathname}?book=${book}&chapter=${chapter}`;
    window.history.replaceState({}, '', newUrl);
}

/**
 * 获取下一章编号
 */
function getNextChapterNumber() {
    if (chapterNum === "cover") return 1;
    return parseInt(chapterNum) + 1;
}

/**
 * 尝试加载下一章
 */
async function tryLoadNextChapter(nextNum) {
    const nextAudio = getAudioPath(bookFolder, nextNum);
    const nextHtml = getHtmlPath(bookFolder, nextNum);
    
    try {
        const [audioExists, htmlExists] = await Promise.all([
            checkResourceExists(nextAudio),
            checkResourceExists(nextHtml)
        ]);
        
        if (audioExists || htmlExists) {
            await loadChapter(bookFolder, nextNum);
            // 注意：loadChapter 中会调用 loadAudio，如果 isPlayingSequence 为 true 会自动播放
        } else {
            throw new Error("没有更多章节");
        }
    } catch (err) {
        isPlayingSequence = false;
        setDJPlayBtnToPlay();
        errorDiv.textContent = "🎉 已播放到最后一章";
        
        // 3秒后清除提示
        setTimeout(() => {
            if (errorDiv.textContent === "🎉 已播放到最后一章") {
                errorDiv.textContent = "";
            }
        }, 3000);
    }
}

/**
 * 切换章节
 */
async function changeChapter(delta) {
    if (chapterNum === "cover" && delta < 0) return;
    
    let newChapter;
    if (chapterNum === "cover") {
        newChapter = delta > 0 ? 1 : "cover";
    } else {
        newChapter = parseInt(chapterNum) + delta;
        if (newChapter < 1) newChapter = "cover";
    }
    
    await loadChapterIfExists(newChapter);
}

/**
 * 检查并加载章节
 */
async function loadChapterIfExists(newChapter) {
    const audioPath = getAudioPath(bookFolder, newChapter);
    const htmlPath = getHtmlPath(bookFolder, newChapter);
    
    const [audioExists, htmlExists] = await Promise.all([
        checkResourceExists(audioPath),
        checkResourceExists(htmlPath)
    ]);
    
    if (audioExists || htmlExists) {
        // 停止当前播放
        isPlayingSequence = false;
        audio.pause();
        setDJPlayBtnToPlay();
        
        await loadChapter(bookFolder, newChapter);
    } else {
        errorDiv.textContent = "⚠️ 章节不存在";
        
        // 3秒后清除提示
        setTimeout(() => {
            if (errorDiv.textContent === "⚠️ 章节不存在") {
                errorDiv.textContent = "";
            }
        }, 3000);
    }
}

// ========== 黑屏播放功能 ==========

/**
 * 初始化黑屏播放功能
 */
function initBackgroundPlayback() {
    console.log('🎧 初始化黑屏播放功能...');
    
    // 设置Media Session API
    initMediaSession();
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 监听音频播放状态
    audio.addEventListener('play', handleAudioPlay);
    audio.addEventListener('pause', handleAudioPause);
    
    // 请求后台播放权限
    requestBackgroundPlayPermission();
    
    console.log('✅ 黑屏播放功能初始化完成');
}

/**
 * 初始化Media Session API
 */
function initMediaSession() {
    if ('mediaSession' in navigator) {
        // 设置媒体元数据
        updateMediaMetadata();
        
        // 设置媒体控制动作
        navigator.mediaSession.setActionHandler('play', () => {
            handleDJPlayPause();
        });
        
        navigator.mediaSession.setActionHandler('pause', () => {
            handleDJPlayPause();
        });
        
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            changeChapter(-1);
        });
        
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            changeChapter(1);
        });
        
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.max(0, audio.currentTime - skipTime);
        });
        
        navigator.mediaSession.setActionHandler('seekforward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.min(audio.duration, audio.currentTime + skipTime);
        });
        
        console.log('📱 Media Session API 初始化成功');
    } else {
        console.log('❌ 当前浏览器不支持 Media Session API');
    }
}

/**
 * 更新媒体元数据
 */
function updateMediaMetadata() {
    if ('mediaSession' in navigator) {
        const chapterText = chapterNum === "cover" ? "封面" : `第 ${chapterNum} 章`;
        
        navigator.mediaSession.metadata = new MediaMetadata({
            title: `${bookTitle} - ${chapterText}`,
            artist: currentBookData?.author || '未知作者',
            album: 'Awv\'s漆书',
            artwork: [
                { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
            ]
        });
    }
}

/**
 * 处理页面可见性变化
 */
function handleVisibilityChange() {
    if (document.hidden) {
        // 页面隐藏时（切换标签页、锁屏等）
        console.log('📱 页面进入后台');
        showBackgroundPlayNotification();
        
        // 确保音频继续播放
        if (isPlayingSequence && audio.paused) {
            audio.play().catch(err => {
                console.log('后台播放失败:', err);
            });
        }
    } else {
        // 页面重新可见
        console.log('📱 页面回到前台');
        hideBackgroundPlayNotification();
    }
}

/**
 * 处理音频播放事件
 */
function handleAudioPlay() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
    }
    
    // 保存播放状态到本地存储
    savePlaybackState();
}

/**
 * 处理音频暂停事件
 */
function handleAudioPause() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
    }
    
    // 保存播放状态到本地存储
    savePlaybackState();
}

/**
 * 保存播放状态
 */
function savePlaybackState() {
    const playbackState = {
        book: bookFolder,
        chapter: chapterNum,
        currentTime: audio.currentTime,
        isPlaying: !audio.paused,
        timestamp: Date.now()
    };
    
    localStorage.setItem('playbackState', JSON.stringify(playbackState));
}

/**
 * 恢复播放状态
 */
function restorePlaybackState() {
    try {
        const savedState = localStorage.getItem('playbackState');
        if (savedState) {
            const state = JSON.parse(savedState);
            
            // 检查状态是否过期（超过1小时）
            const isExpired = (Date.now() - state.timestamp) > 3600000;
            
            if (!isExpired && state.book === bookFolder && state.chapter === chapterNum) {
                // 恢复播放位置
                audio.currentTime = state.currentTime;
                
                // 如果之前正在播放，自动继续播放
                if (state.isPlaying && !audio.paused) {
                    audio.play().catch(err => {
                        console.log('自动恢复播放失败:', err);
                    });
                }
                
                console.log('🎵 播放状态恢复成功');
            }
        }
    } catch (err) {
        console.error('恢复播放状态失败:', err);
    }
}

/**
 * 显示后台播放通知
 */
function showBackgroundPlayNotification() {
    const notification = document.getElementById('background-play-notification');
    if (notification) {
        notification.classList.add('show');
        
        // 3秒后自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

/**
 * 隐藏后台播放通知
 */
function hideBackgroundPlayNotification() {
    const notification = document.getElementById('background-play-notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

/**
 * 请求后台播放权限
 */
function requestBackgroundPlayPermission() {
    // 在支持的浏览器中请求后台播放权限
    if ('requestBackgroundPlayPermission' in audio) {
        audio.requestBackgroundPlayPermission().then(() => {
            console.log('✅ 后台播放权限已获得');
        }).catch(err => {
            console.log('❌ 后台播放权限被拒绝:', err);
        });
    }
}

/**
 * 检查后台播放支持
 */
function checkBackgroundPlaySupport() {
    const supportInfo = {
        mediaSession: 'mediaSession' in navigator,
        serviceWorker: 'serviceWorker' in navigator,
        wakeLock: 'wakeLock' in navigator
    };
    
    console.log('📱 后台播放支持情况:', supportInfo);
    return supportInfo;
}

// ========== DJ播放器功能 ==========

/**
 * 初始化DJ播放器
 */
function initDJPlayer() {
    console.log('🎧 初始化DJ播放器...');
    
    // 绑定DJ播放器事件
    bindDJPlayerEvents();
    
    // 初始化音频可视化
    initAudioVisualizer();
    
    // 初始化进度更新
    initProgressUpdater();
    
    console.log('✅ DJ播放器初始化完成');
}

/**
 * 绑定DJ播放器事件
 */
function bindDJPlayerEvents() {
    const djPlayBtn = document.getElementById('dj-play-btn');
    const djPrevBtn = document.querySelector('.dj-prev-btn');
    const djNextBtn = document.querySelector('.dj-next-btn');
    const djSpeedBtn = document.getElementById('dj-speed-btn');
    const djThemeBtn = document.querySelector('.dj-theme-btn');
    const djHomeBtn = document.querySelector('.dj-home-btn');
    const djToggleBtn = document.querySelector('.dj-toggle-btn');
    const djProgressBar = document.querySelector('.dj-progress-bar');
    const djFontMinus = document.querySelector('.dj-font-minus');
    const djFontPlus = document.querySelector('.dj-font-plus');
    
    // 播放/暂停
    if (djPlayBtn) {
        djPlayBtn.addEventListener('click', handleDJPlayPause);
    }
    
    // 上一章/下一章
    if (djPrevBtn) djPrevBtn.addEventListener('click', () => changeChapter(-1));
    if (djNextBtn) djNextBtn.addEventListener('click', () => changeChapter(1));
    
    // 播放速度
    if (djSpeedBtn) {
        djSpeedBtn.addEventListener('click', handleDJSpeedChange);
    }
    
    // 主题切换
    if (djThemeBtn) {
        djThemeBtn.addEventListener('click', switchTheme);
    }
    
    // 字体大小调整
    if (djFontMinus) djFontMinus.addEventListener('click', () => changeTextSize(-1));
    if (djFontPlus) djFontPlus.addEventListener('click', () => changeTextSize(1));
    
    // 返回首页
    if (djHomeBtn) {
        djHomeBtn.addEventListener('click', () => {
            isPlayingSequence = false;
            audio.pause();
            window.location.href = "library.html";
        });
    }
    
    // 显示/隐藏控制器
    if (djToggleBtn) {
        djToggleBtn.addEventListener('click', toggleDJPlayerVisibility);
    }
    
    // 进度条点击跳转
    if (djProgressBar) {
        djProgressBar.addEventListener('click', handleProgressBarClick);
    }
    
    // 键盘控制
    document.addEventListener('keydown', handleDJKeyboardControl);
}

/**
 * 处理DJ播放/暂停
 */
function handleDJPlayPause() {
    if (!audio.src) {
        loadAudioIfExists(bookFolder, chapterNum);
        return;
    }
    
    try {
        if (audio.paused) {
            // 开始播放
            isPlayingSequence = true;
            audio.play().then(() => {
                setDJPlayBtnToPause();
                errorDiv.textContent = "";
            }).catch(err => {
                console.log('自动播放被阻止:', err);
                errorDiv.textContent = "🔇 点击播放按钮开始播放";
            });
        } else {
            // 暂停播放
            isPlayingSequence = false;
            audio.pause();
            setDJPlayBtnToPlay();
        }
    } catch (err) {
        console.error('播放控制错误:', err);
        errorDiv.textContent = "⚠️ 播放失败: " + err.message;
    }
}

/**
 * 设置DJ播放按钮状态
 */
function setDJPlayBtnToPlay() {
    const djPlayBtn = document.getElementById('dj-play-btn');
    if (djPlayBtn) {
        const icon = djPlayBtn.querySelector('i');
        const text = djPlayBtn.querySelector('.btn-text');
        icon.className = "fas fa-play";
        text.textContent = "播放";
        djPlayBtn.classList.remove('playing');
    }
}

function setDJPlayBtnToPause() {
    const djPlayBtn = document.getElementById('dj-play-btn');
    if (djPlayBtn) {
        const icon = djPlayBtn.querySelector('i');
        const text = djPlayBtn.querySelector('.btn-text');
        icon.className = "fas fa-pause";
        text.textContent = "暂停";
        djPlayBtn.classList.add('playing');
    }
}

/**
 * 处理DJ播放速度切换
 */
function handleDJSpeedChange() {
    const djSpeedBtn = document.getElementById('dj-speed-btn');
    if (!djSpeedBtn) return;
    
    let speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let speedIndex = speeds.indexOf(audio.playbackRate);
    if (speedIndex === -1) speedIndex = 2;
    
    speedIndex = (speedIndex + 1) % speeds.length;
    audio.playbackRate = speeds[speedIndex];
    
    const text = djSpeedBtn.querySelector('.btn-text');
    text.textContent = speeds[speedIndex] + "x";
    
    showTempMessage(`播放速度: ${speeds[speedIndex]}x`);
}

/**
 * 切换DJ播放器可见性
 */
function toggleDJPlayerVisibility() {
    const djPlayer = document.getElementById('dj-player');
    const djToggleBtn = document.getElementById('dj-toggle-btn');

    if (!djPlayer || !djToggleBtn) return;

    const isHidden = djPlayer.classList.contains('hidden');
    const icon = djToggleBtn.querySelector('i');
    const text = djToggleBtn.querySelector('.btn-text');

    if (isHidden) {
        djPlayer.classList.remove('hidden');
        icon.className = "fas fa-eye";
        text.textContent = "隐藏";
        localStorage.setItem("djPlayerVisible", "true");
        showTempMessage('显示控制器');
    } else {
        djPlayer.classList.add('hidden');
        icon.className = "fas fa-eye-slash";
        text.textContent = "显示";
        localStorage.setItem("djPlayerVisible", "false");
        showTempMessage('隐藏控制器');
    }
}

/**
 * 处理DJ键盘控制
 */
function handleDJKeyboardControl(e) {
    if (e.key === " ") {
        e.preventDefault();
        handleDJPlayPause();
    }
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        changeChapter(-1);
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        changeChapter(1);
    }
    if (e.key === "Escape") {
        e.preventDefault();
        toggleDJPlayerVisibility();
    }
}

/**
 * 初始化进度更新
 */
function initProgressUpdater() {
    // 更新时间显示
    audio.addEventListener('timeupdate', updateDJProgress);
    
    // 更新总时长
    audio.addEventListener('loadedmetadata', updateDJDuration);
    
    // 章节加载时更新信息
    updateDJChapterInfo();
}

/**
 * 更新DJ进度显示
 */
function updateDJProgress() {
    const progressFill = document.getElementById('dj-progress-fill');
    const currentTimeEl = document.getElementById('dj-current-time');
    
    if (progressFill && currentTimeEl) {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        progressFill.style.width = `${progress}%`;
        
        // 更新时间显示
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

/**
 * 更新DJ总时长
 */
function updateDJDuration() {
    const durationEl = document.getElementById('dj-duration');
    if (durationEl) {
        durationEl.textContent = formatTime(audio.duration);
    }
}

/**
 * 更新DJ章节信息
 */
function updateDJChapterInfo() {
    const chapterTitleEl = document.getElementById('dj-chapter-title');
    const chapterProgressEl = document.getElementById('dj-chapter-progress');
    
    if (chapterTitleEl && chapterProgressEl) {
        const chapterText = chapterNum === "cover" ? "封面" : `第 ${chapterNum} 章`;
        chapterTitleEl.textContent = chapterText;
        
        // 这里可以添加更多章节进度信息
        chapterProgressEl.textContent = `${chapterNum === "cover" ? 0 : chapterNum} / ?`;
    }
}

/**
 * 处理进度条点击
 */
function handleProgressBarClick(e) {
    const progressBar = e.currentTarget;
    const clickX = e.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = clickX / width;
    
    audio.currentTime = percentage * audio.duration;
}

/**
 * 格式化时间显示
 */
function formatTime(seconds) {
    if (!isFinite(seconds)) return "00:00";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 初始化音频可视化
 */
function initAudioVisualizer() {
    const visualizer = document.getElementById('dj-visualizer');
    if (!visualizer) return;
    
    // 清空可视化容器
    visualizer.innerHTML = '';
    
    // 创建音频分析器
    let audioContext, analyser, dataArray;
    
    // 创建可视化条
    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = '2px';
        visualizer.appendChild(bar);
    }
    
    const bars = document.querySelectorAll('.visualizer-bar');
    
    // 设置音频分析
    function setupAudioAnalysis() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 64;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        }
    }
    
    // 更新可视化
    function updateVisualizer() {
        if (!analyser || !isPlayingSequence) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        bars.forEach((bar, i) => {
            const value = dataArray[i] / 255;
            const height = Math.max(2, value * 30);
            bar.style.height = `${height}px`;
            bar.style.opacity = 0.3 + value * 0.7;
        });
        
        requestAnimationFrame(updateVisualizer);
    }
    
    // 监听播放开始
    audio.addEventListener('play', () => {
        setupAudioAnalysis();
        updateVisualizer();
    });
}

/**
 * 加载DJ播放器偏好设置
 */
function loadDJPlayerPreferences() {
    const djPlayer = document.getElementById('dj-player');
    const djToggleBtn = document.querySelector('.dj-toggle-btn');
    
    if (djPlayer && djToggleBtn) {
        const playerVisible = localStorage.getItem("djPlayerVisible");
        const icon = djToggleBtn.querySelector('i');
        const text = djToggleBtn.querySelector('.btn-text');
        
        if (playerVisible === "false") {
            djPlayer.classList.add('hidden');
            icon.className = "fas fa-eye-slash";
            text.textContent = "显示";
        }
    }
}

// ========== 工具函数 ==========

/**
 * 改变文字大小
 */
function changeTextSize(delta) {
    const current = parseFloat(window.getComputedStyle(bookDiv).fontSize) || 18;
    const newSize = Math.max(12, Math.min(30, current + delta));
    bookDiv.style.fontSize = newSize + "px";
    
    // 保存到本地存储
    localStorage.setItem("preferredFontSize", newSize);
    
    showTempMessage(`字体大小: ${newSize}px`);
}

/**
 * 切换主题
 */
function switchTheme() {
    const themes = ['default', 'light', 'dark', 'pink'];
    const currentTheme = document.body.dataset.theme || 'default';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    document.body.dataset.theme = nextTheme;
    document.body.className = nextTheme !== 'default' ? `theme-${nextTheme}` : '';
    
    // 保存主题偏好
    localStorage.setItem("preferredTheme", nextTheme);
    
    showTempMessage(`主题: ${getThemeName(nextTheme)}`);
}

/**
 * 获取主题名称
 */
function getThemeName(theme) {
    const names = {
        'default': '科技蓝',
        'light': '明亮',
        'dark': '暗黑',
        'pink': '梦幻粉'
    };
    return names[theme] || theme;
}

/**
 * 显示临时消息
 */
function showTempMessage(message) {
    const oldMessage = errorDiv.textContent;
    errorDiv.textContent = message;
    
    // 3秒后恢复原消息或清除
    setTimeout(() => {
        if (errorDiv.textContent === message) {
            errorDiv.textContent = oldMessage;
        }
    }, 2000);
}

/**
 * 显示/隐藏加载状态
 */
function showLoading(show) {
    if (show) {
        document.body.classList.add('loading');
    } else {
        document.body.classList.remove('loading');
    }
}

// ========== 阅读时间记录 ==========

/**
 * 记录阅读时间
 */
function recordReadingTime() {
    const endTime = Date.now();
    const timeSpent = endTime - startTime;
    
    if (timeSpent > 1000) { // 至少阅读1秒才记录
        let history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
        const existing = history.find(h => 
            h.title === bookTitle && h.book === bookFolder && h.chapter === chapterNum
        );
        
        if (existing) {
            existing.timeSpent += timeSpent;
            existing.lastAccess = endTime;
        } else {
            history.push({ 
                title: bookTitle,
                book: bookFolder,
                chapter: chapterNum,
                timeSpent, 
                lastAccess: endTime,
                author: currentBookData?.author || '未知作者'
            });
        }
        localStorage.setItem("readingHistory", JSON.stringify(history));
    }
}

// ========== 装饰动画 ==========

/**
 * 初始化装饰动画
 */
function initDecorations() {
    createRotatingSquares();
    loadUserPreferences();
}

/**
 * 创建旋转方块动画
 */
function createRotatingSquares() {
    const squareContainer = document.getElementById("square-rotation");
    if (!squareContainer) return;
    
    const colors = ["#ff4c4c", "#ff9f43", "#1dd1a1", "#00d2d3", "#576574", "#f368e0", "#ff6b6b", "#54a0ff"];
    
    // 清空容器
    squareContainer.innerHTML = '';
    
    // 创建方块
    for (let i = 0; i < 8; i++) {
        const div = document.createElement("div");
        div.className = "square";
        div.style.background = colors[i];
        div.style.transform = `rotate(${i * 45}deg) translate(160px)`;
        squareContainer.appendChild(div);
    }
    
    // 动画循环
    let angle = 0;
    function animateSquares() {
        angle += 0.3;
        document.querySelectorAll(".square").forEach((sq, i) => {
            sq.style.transform = `rotate(${angle + i * 45}deg) translate(160px)`;
        });
        requestAnimationFrame(animateSquares);
    }
    animateSquares();
}

/**
 * 加载用户偏好设置
 */
function loadUserPreferences() {
    // 字体大小
    const savedFontSize = localStorage.getItem("preferredFontSize");
    if (savedFontSize) {
        bookDiv.style.fontSize = savedFontSize + "px";
    }
    
    // 主题
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme && savedTheme !== 'default') {
        document.body.dataset.theme = savedTheme;
        document.body.className = `theme-${savedTheme}`;
    }
    
    // 遥控器可见性
    const remoteVisible = localStorage.getItem("remoteVisible");
    const remote = document.querySelector('.remote.neon-remote');
    if (remote && remoteVisible === 'false') {
        remote.style.display = 'none';
    }
}

// ========== 初始化应用 ==========

/**
 * 主初始化函数
 */
async function init() {
    try {
        console.log('🚀 初始化阅读器...');
        
        // 检查后台播放支持
        checkBackgroundPlaySupport();
        
        // 初始化DJ播放器
        initDJPlayer();
        
        // 初始化黑屏播放功能
        initBackgroundPlayback();
        
        // 初始化装饰
        initDecorations();
        
        // 加载DJ播放器偏好设置
        loadDJPlayerPreferences();
        
        // 加载初始章节
        await loadChapter(bookFolder, chapterNum);
        
        console.log('✅ 阅读器初始化完成');
        
    } catch (error) {
        console.error('❌ 初始化失败:', error);
        errorDiv.textContent = "⚠️ 初始化失败: " + error.message;
    }
}

// ========== 事件监听器 ==========

// 页面离开时记录时间
window.addEventListener("beforeunload", recordReadingTime);

// 页面隐藏时记录时间（切换标签页等）
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        recordReadingTime();
    } else {
        startTime = Date.now(); // 重新开始计时
    }
});

// 更新音频事件处理
audio.addEventListener("ended", async () => {
    if (!isPlayingSequence) {
        setDJPlayBtnToPlay();
        return;
    }

    const nextChapter = getNextChapterNumber();
    await tryLoadNextChapter(nextChapter);
});

// 修改音频加载错误处理
audio.addEventListener("error", (e) => {
    console.error('音频错误:', e);
    errorDiv.textContent = "⚠️ 音频加载错误";
    setDJPlayBtnToPlay();
});

// 定期保存播放状态
setInterval(savePlaybackState, 10000); // 每10秒保存一次

// 监听音频时间更新
audio.addEventListener('timeupdate', () => {
    // 每5秒保存一次播放进度
    if (Math.floor(audio.currentTime) % 5 === 0) {
        savePlaybackState();
    }
});

// 监听页面卸载
window.addEventListener('beforeunload', () => {
    recordReadingTime();
    savePlaybackState();
});

// 监听在线状态变化
window.addEventListener('online', () => {
    console.log('📶 网络连接恢复');
});

window.addEventListener('offline', () => {
    console.log('📶 网络连接断开');
    showTempMessage('网络连接已断开，但音频播放不受影响');
});

// 当DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 导出函数供其他脚本使用（如果需要）
window.ReaderApp = {
    loadChapter,
    changeChapter,
    switchTheme,
    toggleDJPlayerVisibility,
    getCurrentBook: () => ({ book: bookFolder, chapter: chapterNum, title: bookTitle })
};

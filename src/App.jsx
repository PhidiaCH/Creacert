import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import {
  Home, BookOpen, Heart, ClipboardList, Sparkles, XCircle, Award,
  Calendar, ChevronLeft, Search, MapPin, QrCode, Coffee, Clock,
  Users, Star, Image as ImageIcon, Bell, ShieldCheck, Camera,
  Video, Activity, Lock, Trophy, Brain, PlusCircle, CheckCircle2,
  Play, PlayCircle, Tv2, Eye, Zap, Crown, Gift, TrendingUp,
  Flame, Target, Share2, ThumbsUp, MessageCircle, Bookmark,
  ChevronRight, Check, Palette,
} from 'lucide-react';

// ─────────────────────────────────────────────
// 主題系統
// ─────────────────────────────────────────────
const THEMES = {
  young: {
    key: 'young',
    label: '🔥 潮流',
    desc: '深色潮流風',
    headerBg: 'bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900',
    appBg: 'bg-gradient-to-br from-violet-950 via-slate-900 to-black',
    tabBg: 'bg-black/90 backdrop-blur-xl border-t border-white/10',
    tabActive: 'text-violet-400',
    tabInactive: 'text-white/30',
    ptBadge: 'bg-violet-400 text-violet-950',
    lvBadge: 'bg-white/10 border border-white/20',
    cardBg: 'bg-white/8 backdrop-blur border border-white/10',
    sectionBg: 'bg-slate-900',
    headingColor: 'text-white',
    subColor: 'text-white/50',
    accentColor: '#7c3aed',
    preview: 'from-violet-900 to-indigo-900',
  },
  pro: {
    key: 'pro',
    label: '💼 專業',
    desc: '清爽專業風',
    headerBg: 'bg-[#0f6e56]',
    appBg: 'bg-gradient-to-br from-pink-100 via-purple-50 to-teal-50',
    tabBg: 'bg-white/95 backdrop-blur-md border-t border-gray-200',
    tabActive: 'text-[#0f6e56]',
    tabInactive: 'text-slate-400',
    ptBadge: 'bg-orange-300 text-orange-900',
    lvBadge: 'bg-white/10 border border-white/20',
    cardBg: 'bg-white shadow-sm',
    sectionBg: 'bg-slate-50',
    headingColor: 'text-slate-800',
    subColor: 'text-slate-500',
    accentColor: '#0f6e56',
    preview: 'from-[#0f6e56] to-teal-600',
  },
  senior: {
    key: 'senior',
    label: '🌸 關懷',
    desc: '大字溫暖風',
    headerBg: 'bg-gradient-to-r from-amber-600 to-orange-600',
    appBg: 'bg-amber-50',
    tabBg: 'bg-white border-t-4 border-amber-200',
    tabActive: 'text-amber-600',
    tabInactive: 'text-slate-400',
    ptBadge: 'bg-amber-400 text-amber-900',
    lvBadge: 'bg-white/20 border border-white/30',
    cardBg: 'bg-white border-2 border-amber-100',
    sectionBg: 'bg-white',
    headingColor: 'text-slate-900 text-lg',
    subColor: 'text-slate-600',
    accentColor: '#d97706',
    preview: 'from-amber-500 to-orange-500',
  },
};

const ThemeCtx = createContext(THEMES.pro);

// 定價方案
const PLANS = [
  {
    id: 'free', name: '基礎探索', nameEn: 'FREE',
    price: 0, unit: '',
    color: 'from-slate-400 to-slate-600',
    badge: null,
    features: [
      '✅ 動物圖鑑瀏覽',
      '✅ 基礎課程 3 堂',
      '✅ 生態圈社群',
      '✅ 到店打卡集點',
      '❌ 進階課程',
      '❌ 認證考試',
      '❌ 爬蟲預訂優先',
    ],
  },
  {
    id: 'premium', name: '達人月票', nameEn: 'PREMIUM',
    price: 199, unit: '/月',
    color: 'from-violet-500 to-purple-700',
    badge: '最受歡迎',
    features: [
      '✅ 全部課程無限看',
      '✅ C / B 級認證考試',
      '✅ 門市飲品 9 折',
      '✅ 爬蟲體驗優先預約',
      '✅ 寵物食品 9 折',
      '✅ 每月贈 200 點',
      '❌ A / S / M 級認證',
    ],
  },
  {
    id: 'pro', name: '認證師年票', nameEn: 'PRO',
    price: 1680, unit: '/年',
    color: 'from-amber-400 to-orange-600',
    badge: '省最多',
    features: [
      '✅ 全部課程 + 所有認證',
      '✅ 門市消費 8 折',
      '✅ 爬蟲 VIP 預約通道',
      '✅ 寵物食品 85 折',
      '✅ 每月贈 500 點',
      '✅ 專屬徽章 + 頭銜',
      '✅ 優先新品體驗資格',
    ],
  },
];

// ─────────────────────────────────────────────
// 資料庫
// ─────────────────────────────────────────────
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=480`;

const ANIMALS = [
  { id: 1, name: '飛飛', type: 'small_animal', typeName: '小動物', breed: '蜜袋鼯', status: '可預約互動', minLevel: 3,
    img: PX(29993579),
    tags: ['#口袋精靈', '#夜行性', '#大眼萌物', '#A 級專屬'],
    story: '「啾！我是飛飛！水汪汪的大眼睛是我的招牌。我最喜歡在主人的口袋裡睡覺，因為我需要高蛋白飲食與攀爬空間，只有通過 A 級認證的飼主才能帶我回家喔！」',
    care: 4, lifespan: '10–15 年', trialFee: 1200, size: '迷你', careNote: '需高蛋白飲食，夜行性，需滑翔空間', videoQ: 'sugar glider care guide pet', buyPrice: 8500, buyNote: '蜜袋鼯 · 需A級認證' },
  { id: 2, name: '月亮', type: 'cat', typeName: '貓咪', breed: '黑白貓', status: '可認養', minLevel: 1,
    img: PX(29561296),
    tags: ['#優雅淑女', '#慢熟', '#靜態陪伴'],
    story: '「你好，我是月亮。我不需要太大空間，最適合高壓環境下工作的研究人員。給我一個窗台和溫柔的主人，我就很滿足了。」',
    care: 2, lifespan: '12–16 年', trialFee: 800, size: '中型', careNote: '慢熟型，需安靜環境，適合獨居', videoQ: 'black white cat care tips adopt' },
  { id: 3, name: '小福', type: 'cat', typeName: '貓咪', breed: '橘貓', status: '試養中', minLevel: 1,
    img: PX(4641440),
    tags: ['#貪吃大叔', '#呼嚕聲超大', '#治癒系'],
    story: '「喵～只要聽到罐頭打開的聲音，我會用光速衝過來。我的呼嚕聲是全店最響的，可以舒緩你的考前焦慮！」',
    care: 2, lifespan: '13–17 年', trialFee: 800, size: '中型', careNote: '親人貪吃，注意飲食控制避免肥胖', videoQ: 'orange tabby cat care daily routine' },
  { id: 4, name: '豆豆', type: 'dog', typeName: '犬隻', breed: '米格魯', status: '可認養', minLevel: 2,
    img: PX(8706369),
    tags: ['#精力充沛', '#嗅覺達人', '#戶外型'],
    story: '「汪！我有全世界最靈敏的鼻子，可以聞到 300 公尺外的零食。我需要每天散步，適合喜歡戶外活動的人！」',
    care: 3, lifespan: '12–15 年', trialFee: 1000, size: '中型', careNote: '需每日散步 30 分鐘以上，嗅覺敏銳', videoQ: 'beagle dog care training exercise' },
  { id: 5, name: '小綠', type: 'reptile', typeName: '爬蟲展示', breed: '鬃獅蜥', status: '可預約體驗', minLevel: 2,
    img: PX(6002806),
    tags: ['#冷靜達人', '#親人', '#適合初學者'],
    story: '「嗨，我是小綠。我是爬蟲界最親人的存在，喜歡被人抱著曬太陽。來門市摸摸我，說不定我們就有緣分！」',
    care: 3, lifespan: '10–15 年', trialFee: 900, size: '小型', careNote: '需 UVB 燈源，每日溫度 28–38°C', videoQ: 'bearded dragon care beginner guide UVB', buyPrice: 5800, buyNote: '寄賣合作 · 店家認證' },
  { id: 6, name: '小白', type: 'reptile', typeName: '爬蟲展示', breed: '白化球蟒', status: '店長飼養', minLevel: 3,
    img: PX(29378244),
    tags: ['#稀有品種', '#溫馴', '#長壽夥伴'],
    story: '「我是小白，店長的珍貴夥伴。我可以活到 30 年，是一輩子的承諾。來門市體驗與蛇相處的奇妙感受吧！」',
    care: 4, lifespan: '20–30 年', trialFee: 1500, size: '中型', careNote: '溫馴無毒，需 28°C 恆溫環境，月餵一次', videoQ: 'ball python care guide handling feeding', buyPrice: 15000, buyNote: '稀有白化 · 洽詢購買' },
];

const CERT_LEVELS = [
  { level: 'C', title: 'C 級基礎認證 (Lv.1)', desc: '掌握基本營養、環境安全。', color: 'bg-slate-200 text-slate-700', privileges: ['門市內互動權', '基礎講座參與', '貓咪試養申請'] },
  { level: 'B', title: 'B 級專業認證 (Lv.2)', desc: '通過行為學測驗與實操考核。', color: 'bg-[#534ab7] text-white', privileges: ['14 天居家試養', '領養費 9 折', '犬隻/爬蟲互動'] },
  { level: 'A', title: 'A 級大師認證 (Lv.3)', desc: '具備醫療處置與高階品種知識。', color: 'bg-orange-500 text-white', privileges: ['蜜袋鼯租借權', '金牌導師頭銜', '領養費 8 折'] },
];

const COURSES = [
  { id: 1, tag: '貓咪基礎', title: '貓咪營養學',     desc: '主食、零食與補充品的選擇', duration: '45 分鐘', progress: 100, score: 85,  locked: false, paid: false, videoQ: 'cat nutrition food guide' },
  { id: 2, tag: '貓咪基礎', title: '行為解讀',       desc: '讀懂肢體語言與聲音溝通', duration: '50 分鐘', progress: 100, score: 90,  locked: false, paid: false, videoQ: 'cat body language behavior guide' },
  { id: 3, tag: '貓咪基礎', title: '環境安全設計',   desc: '打造貓咪友善的居家空間', duration: '40 分鐘', progress: 60,  score: null, locked: false, paid: false, videoQ: 'cat proof home environment setup' },
  { id: 4, tag: '貓咪進階', title: '醫療照護基礎',   desc: '識別常見症狀與緊急處置', duration: '90 分鐘', progress: 0,   score: null, locked: true,  paid: false, videoQ: 'cat health symptoms veterinary care' },
  { id: 5, tag: '貓咪進階', title: '行為矯正技術',   desc: '正向強化訓練方法',       duration: '75 分鐘', progress: 0,   score: null, locked: true,  paid: false, videoQ: 'cat positive reinforcement training clicker' },
  { id: 6, tag: '爬蟲特別課程', title: '爬蟲飼育認證', desc: '鬃獅蜥、球蟒的完整照護', duration: '120 分鐘', progress: 0, score: null, locked: false, paid: true, price: 'NT$299', videoQ: 'bearded dragon ball python reptile care guide' },
  { id: 7, tag: '犬隻認證', title: '犬隻基礎服從',   desc: '基本口令訓練與社交化',   duration: '60 分鐘', progress: 30,  score: null, locked: false, paid: false, videoQ: 'dog basic obedience training sit stay' },
];

const QUIZ_QUESTIONS = [
  { q: '貓咪每日所需水分（以體重計）約為？',   options: ['每公斤 20ml', '每公斤 40-60ml', '每公斤 100ml', '每公斤 10ml'],        ans: 1 },
  { q: '以下哪種植物對貓咪有毒？',             options: ['薰衣草', '百合花', '薄荷', '貓薄荷'],                                   ans: 1 },
  { q: '貓咪「慢眨眼」通常代表什麼？',         options: ['不舒服', '飢餓', '信任與放鬆', '準備攻擊'],                              ans: 2 },
  { q: '成年貓咪一天應吃幾餐比較理想？',       options: ['1 餐', '2-3 餐', '4-5 餐', '自由採食'],                                  ans: 1 },
  { q: '貓咪尿液哪種顏色需立即就醫？',         options: ['淡黃色', '深黃色', '粉紅/紅色', '幾乎無色'],                             ans: 2 },
];

const POINTS_HISTORY = [
  { id: 1, desc: '完成「貓咪營養學」測驗', pts: 100,  date: '05/12', type: 'earn' },
  { id: 2, desc: '門市掃碼打卡',           pts: 20,   date: '05/13', type: 'earn' },
  { id: 3, desc: '完成「行為解讀」課程',   pts: 100,  date: '05/11', type: 'earn' },
  { id: 4, desc: 'AR 濾鏡社群分享',        pts: 10,   date: '05/10', type: 'earn' },
  { id: 5, desc: '領養費折抵使用',         pts: -200, date: '05/08', type: 'spend' },
];

const DIARY_ENTRIES = [
  { day: 10, date: '05/13', title: '第一次爬到肩膀！',   content: '飛飛今天超勇敢，從手臂慢慢爬到我肩膀，停了好久。心跳加速但超感動…', mood: 5 },
  { day: 9,  date: '05/12', title: '飲食調整第一天',     content: '開始添加木瓜泥，飛飛有點猶豫但還是吃了一些。體重微增 2g，好兆頭。',  mood: 4 },
  { day: 8,  date: '05/11', title: '夜間活動觀察',       content: '用紅外線燈拍到飛飛在 3am 滑翔，牠果然是夜行性的！太神奇了。',        mood: 5 },
];

const AI_QUESTIONS = [
  { q: '你的居住環境是？',         opts: ['套房/小公寓', '一般公寓', '獨立房屋', '宿舍'] },
  { q: '你一天在家的時間大約？',   opts: ['不到 4 小時', '4~8 小時', '8~12 小時', '幾乎整天'] },
  { q: '你希望的互動方式？',       opts: ['靜靜陪伴就好', '偶爾互動玩耍', '頻繁互動', '戶外運動型'] },
];

// 每日挑戰題庫
const DAILY_CHALLENGES = [
  { id:1, emoji:'🦎', q:'鬃獅蜥每日需要多少小時的 UVB 燈照射？', opts:['2小時','6-8小時','12小時','24小時'], ans:1, pts:30 },
  { id:2, emoji:'🐍', q:'球蟒多久餵食一次最適合？', opts:['每天','每週','每兩週','每月'], ans:1, pts:30 },
  { id:3, emoji:'🦘', q:'蜜袋鼯是哪個國家的原生動物？', opts:['巴西','澳洲','印尼','馬來西亞'], ans:1, pts:30 },
  { id:4, emoji:'🐱', q:'貓咪「慢眨眼」代表什麼？', opts:['攻擊警告','信任與愛','飢餓','生病'], ans:1, pts:30 },
  { id:5, emoji:'🐶', q:'米格魯每天至少需要多少分鐘運動？', opts:['10分鐘','30分鐘','60分鐘','90分鐘'], ans:1, pts:30 },
];

// 社群貼文資料（加強版）
const COMMUNITY_POSTS = [
  { id:1, user:'陳瑭原', avatar:'🧑', tag:'蜜袋鼯新手', img: PX(29993579),
    caption:'飛飛今天第一次自己爬到我肩膀！三個月的耐心終於換來這一刻 🥹',
    likes:247, comments:38, shares:12, saved:89, time:'2小時前', challenge:'#萌寵日記' },
  { id:2, user:'雅婷', avatar:'👩', tag:'爬蟲飼主', img: PX(6002806),
    caption:'小綠曬太陽超享受！UVB 12小時是關鍵，爬蟲新手必看 🦎☀️',
    likes:512, comments:67, shares:45, saved:203, time:'5小時前', challenge:'#爬蟲日常' },
  { id:3, user:'店長 Leo', avatar:'🧑‍💼', tag:'CreaCert官方', img: PX(29378244),
    caption:'小白今天狀態超好！來門市的朋友都說摸了之後不再怕蛇了 🐍✨',
    likes:1203, comments:156, shares:89, saved:445, time:'1天前', challenge:'#克服恐懼' },
];

// 短影音 Reels 資料
const REELS = [
  { id: 1, videoQ: 'sugar glider cute pet shoulder', title: '飛飛第一次爬上肩膀 🦘',  creator: '陳瑭原',  views: '2.3萬', animal: '蜜袋鼯', cover: PX(29993579) },
  { id: 2, videoQ: 'orange tabby cat funny daily',   title: '小福的週日賴床日常 ☀️',  creator: '小美',    views: '8.1萬', animal: '橘貓',   cover: PX(4641440) },
  { id: 3, videoQ: 'beagle dog training sit command', title: '豆豆學會「坐下」啦！🐶', creator: '志豪',    views: '1.2萬', animal: '米格魯', cover: PX(8706369) },
  { id: 4, videoQ: 'bearded dragon sunbathing basking', title: '小綠曬太陽超享受 🦎',    creator: '雅婷',    views: '4.5萬', animal: '鬃獅蜥', cover: PX(6002806) },
  { id: 5, videoQ: 'ball python handling friendly snake', title: '摸蛇其實不可怕！🐍',     creator: '店長Leo', views: '15萬',  animal: '球蟒',   cover: PX(29378244) },
];

const PRODUCTS = [
  { id:1, name:'蜜袋鼯高蛋白飼料', brand:'GlideNutrition', price:399, original:499, emoji:'🦘', tag:'熱銷No.1', tagColor:'bg-rose-100 text-rose-600' },
  { id:2, name:'爬蟲 UVB 全光譜燈', brand:'ZooMed Pro', price:890, original:1200, emoji:'🦎', tag:'A級推薦', tagColor:'bg-orange-100 text-orange-600' },
  { id:3, name:'貓咪益生菌凍乾', brand:'PetPro 台灣', price:299, original:350, emoji:'🐱', tag:'新品上市', tagColor:'bg-purple-100 text-purple-600' },
  { id:4, name:'犬隻訓練零食包', brand:'TrainSnack', price:199, original:250, emoji:'🐶', tag:'認證推薦', tagColor:'bg-[#0f6e56]/10 text-[#0f6e56]' },
  { id:5, name:'球蟒恆溫加熱墊', brand:'ReptileHeat', price:680, original:850, emoji:'🐍', tag:'必備', tagColor:'bg-slate-100 text-slate-600' },
  { id:6, name:'全物種維生素滴劑', brand:'NutriAll', price:249, original:320, emoji:'💊', tag:'獸醫推薦', tagColor:'bg-blue-100 text-blue-600' },
];

// ─────────────────────────────────────────────
// 投資人儀表板數據
// ─────────────────────────────────────────────
const INVESTOR_DATA = {
  monthly: [
    { month: '1月', revenue: 58000,  cost: 113000, profit: -55000 },
    { month: '2月', revenue: 82000,  cost: 115000, profit: -33000 },
    { month: '3月', revenue: 130000, cost: 118000, profit:  12000 },
    { month: '4月', revenue: 155000, cost: 120000, profit:  35000 },
    { month: '5月', revenue: 178000, cost: 122000, profit:  56000 },
    { month: '6月', revenue: 195000, cost: 125000, profit:  70000 },
  ],
  kpi: {
    thisMonth:      178000,
    lastMonth:      155000,
    visitors:       1240,
    netProfit:      56000,
    totalInvested:  1360000,
    totalRecovered: 95000,
    breakEvenMonth: 23,
    currentMonth:   5,
  },
  breakdown: [
    { label: '咖啡輕食', value: 95000,  color: '#f97316', pct: 53 },
    { label: '爬蟲銷售', value: 48000,  color: '#0f6e56', pct: 27 },
    { label: '寵物食品', value: 20000,  color: '#ec4899', pct: 11 },
    { label: '認證課程', value: 15000,  color: '#8b5cf6', pct:  9 },
  ],
  risks: [
    { item: '動物醫療備用金', status: '充足', color: 'text-green-600' },
    { item: '法規執照申請', status: '進行中', color: 'text-orange-500' },
    { item: '爬蟲繁殖商合約', status: '洽談中', color: 'text-orange-500' },
    { item: '醫院合作備忘錄', status: '待簽署', color: 'text-rose-500' },
  ],
};

// ─────────────────────────────────────────────
// 根元件
// ─────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('home');
  const [showCertInfo, setShowCertInfo] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);
  const [showInvestor, setShowInvestor] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem('cc_theme') || 'pro');
  const theme = THEMES[themeKey] || THEMES.pro;
  const [logoTaps, setLogoTaps] = useState(0);
  const [streak, setStreak] = useState(7);
  const tapTimer = useRef(null);
  const [points, setPoints] = useState(1280);
  const addPoints = (n) => setPoints(p => p + n);

  const switchTheme = (key) => {
    setThemeKey(key);
    localStorage.setItem('cc_theme', key);
    setShowThemePicker(false);
  };

  const handleLogoTap = () => {
    const next = logoTaps + 1;
    setLogoTaps(next);
    clearTimeout(tapTimer.current);
    if (next >= 5) { setShowInvestor(true); setLogoTaps(0); return; }
    tapTimer.current = setTimeout(() => setLogoTaps(0), 2000);
  };

  return (
    <ThemeCtx.Provider value={theme}>
    <div className={`${theme.appBg} min-h-screen flex items-center justify-center font-sans`}>
      <div className={`w-full max-w-md h-[850px] max-h-screen relative overflow-hidden shadow-2xl sm:rounded-[2.5rem] sm:border-[10px] border-gray-900 flex flex-col ${themeKey === 'young' ? 'bg-slate-900' : 'bg-white'}`}>

        {/* 頂部狀態列 */}
        <div className={`${theme.headerBg} text-white pt-6 pb-4 px-6 shadow-lg z-30 shrink-0`}>
          <div className="flex justify-between items-center mt-2">
            <div onClick={handleLogoTap} className="cursor-pointer select-none">
              <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                <Sparkles size={20} className="text-pink-200 animate-pulse" /> CreaCert
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'#f9a8d4'}}>Know Every Creature ✿</p>
            </div>
            <div className="flex items-center gap-2">
              {/* 連續天數 */}
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full border border-white/20">
                <Flame size={13} className="text-orange-300" />
                <span className="text-white text-[11px] font-black">{streak}</span>
              </div>
              <div className={`${theme.lvBadge} px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition`} onClick={() => setShowCertInfo(true)}>
                <Award size={16} className="text-orange-300" /> Lv.3
              </div>
              <div className={`${theme.ptBadge} px-3 py-1 rounded-full text-xs font-black shadow-inner`}>
                {points.toLocaleString()} pt
              </div>
              {/* 主題切換 */}
              <button onClick={() => setShowThemePicker(true)} className="bg-white/10 p-1.5 rounded-full border border-white/20">
                <Palette size={14} className="text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* 內容區 */}
        <div className={`flex-1 overflow-y-auto scrollbar-hide ${themeKey === 'young' ? 'bg-slate-900' : themeKey === 'senior' ? 'bg-amber-50' : 'bg-slate-50'}`}>
          {tab === 'home'      && <PassportScreen setShowCertInfo={setShowCertInfo} setShowPortrait={setShowPortrait} addPoints={addPoints} setShowPlans={setShowPlans} streak={streak} />}
          {tab === 'animals'   && <AnimalsScreen />}
          {tab === 'courses'   && <CoursesScreen addPoints={addPoints} />}
          {tab === 'community' && <CommunityScreen />}
          {tab === 'diary'     && <DiaryScreen points={points} />}
        </div>

        {/* 底部 Tab Bar */}
        <div className={`shrink-0 w-full px-4 pt-3 pb-6 flex justify-between items-center z-40 ${theme.tabBg}`}>
          <TabBtn icon={<Home />}          label="首頁"  active={tab==='home'}      onClick={() => setTab('home')}      theme={theme} />
          <TabBtn icon={<Heart />}         label="圖鑑"  active={tab==='animals'}   onClick={() => setTab('animals')}   theme={theme} />
          <TabBtn icon={<BookOpen />}      label="課程"  active={tab==='courses'}   onClick={() => setTab('courses')}   theme={theme} />
          <TabBtn icon={<Users />}         label="生態圈" active={tab==='community'} onClick={() => setTab('community')} theme={theme} />
          <TabBtn icon={<ClipboardList />} label="日記"  active={tab==='diary'}     onClick={() => setTab('diary')}     theme={theme} />
        </div>

        {showCertInfo    && <CertificationModal onClose={() => setShowCertInfo(false)} />}
        {showPortrait    && <PortraitModal      onClose={() => setShowPortrait(false)} />}
        {showInvestor    && <InvestorDashboard  onClose={() => setShowInvestor(false)} />}
        {showPlans       && <PlansModal         onClose={() => setShowPlans(false)} />}
        {showThemePicker && <ThemePickerModal   onClose={() => setShowThemePicker(false)} current={themeKey} onSelect={switchTheme} />}
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}

function TabBtn({ icon, label, active, onClick, theme }) {
  const t = theme || THEMES.pro;
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${active ? `${t.tabActive} scale-110` : t.tabInactive}`}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      <span className={`text-[10px] mt-1 font-black ${active ? 'opacity-100' : 'opacity-50'}`}>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────
// Tab 1 — 認證護照頁
// ─────────────────────────────────────────────
function PassportScreen({ setShowCertInfo, setShowPortrait, addPoints, setShowPlans, streak }) {
  const [showQR, setShowQR] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showCafeMenu, setShowCafeMenu] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [liveOn, setLiveOn] = useState(false);
  const [liveError, setLiveError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleCheckIn = () => {
    if (!checkedIn) { addPoints(20); setCheckedIn(true); }
    setShowQR(true);
  };

  const toggleLive = async () => {
    if (liveOn) {
      // 停止直播
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setLiveOn(false);
      setLiveError('');
    } else {
      // 開啟視訊
      try {
        setLiveError('');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        streamRef.current = stream;
        setLiveOn(true);
        // 等 DOM 更新後才能拿到 videoRef
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 50);
      } catch (err) {
        setLiveError('無法開啟鏡頭，請允許相機權限');
        console.error(err);
      }
    }
  };

  // 離開頁面時自動關閉鏡頭
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="p-5 space-y-5 pb-6 animate-in fade-in slide-in-from-bottom-4">

      {/* 數位護照卡 */}
      <div className="rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 border-2 border-white/20">
        <div className="absolute -right-6 -top-6 opacity-10 rotate-12"><Award size={160} /></div>
        <div className="flex justify-between items-start mb-5">
          <div className="z-10">
            <div className="bg-white/20 w-fit px-2 py-0.5 rounded text-[9px] font-black tracking-widest mb-1 uppercase">A-Class Gold Mentor</div>
            <h3 className="text-3xl font-black tracking-tight">陳瑭原</h3>
            <p className="text-xs opacity-80 mt-1">成大生醫卓群店 · 榮譽導師</p>
          </div>
          <div className="flex flex-col gap-2 z-10">
            <button onClick={() => setShowPortrait(true)} className="bg-white/20 p-2.5 rounded-2xl border border-white/30 active:scale-95 transition"><Camera size={20} /></button>
            <button onClick={() => setShowCertInfo(true)} className="bg-black/20 p-2.5 rounded-2xl border border-white/10 active:scale-95 transition text-[10px] font-black">說明</button>
          </div>
        </div>

        {/* 三數據卡 */}
        <div className="grid grid-cols-3 gap-2 relative z-10 mb-4">
          {[['已修課程','7'],['試養次數','3'],['累積積分','1280']].map(([k,v]) => (
            <div key={k} className="bg-black/10 rounded-2xl p-3 border border-white/10 text-center">
              <p className="text-[9px] opacity-60 mb-0.5">{k}</p>
              <p className="text-xl font-black">{v}</p>
            </div>
          ))}
        </div>

        {/* 升級進度條 */}
        <div className="relative z-10 space-y-2">
          {[['進階課程完成度', 70], ['總試養天數 (目標 30 天)', 60], ['持有認證時間 (目標 6 個月)', 85]].map(([label, val]) => (
            <div key={label}>
              <div className="flex justify-between text-[9px] text-white/70 font-bold mb-1"><span>{label}</span><span>{val}%</span></div>
              <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 直播 + AR */}
      <section className="grid grid-cols-2 gap-4">
        <div onClick={toggleLive} className={`bg-white rounded-3xl p-4 shadow-sm border flex flex-col items-center gap-2 cursor-pointer transition-all ${liveOn ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-100 hover:border-[#0f6e56]'}`}>
          <div className="relative w-full h-24 rounded-2xl overflow-hidden mb-1 bg-black">
            {liveOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={ANIMALS[0].img} className="w-full h-full object-cover transition duration-500" alt="直播" />
            )}
            <div className={`absolute top-2 left-2 text-white text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-black ${liveOn ? 'bg-red-600 animate-pulse' : 'bg-gray-500'}`}>
              <Video size={8} /> {liveOn ? 'LIVE' : '點擊開播'}
            </div>
            {liveOn && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                📷 我的視訊
              </div>
            )}
          </div>
          {liveError
            ? <p className="text-[10px] font-bold text-red-500 text-center leading-tight">{liveError}</p>
            : <p className="text-xs font-black text-slate-800">{liveOn ? '🔴 直播中・點擊停止' : '飛飛正在睡覺中...'}</p>
          }
        </div>
        <div onClick={() => addPoints(10)} className="bg-[#534ab7]/5 rounded-3xl p-4 border-2 border-dashed border-[#534ab7]/20 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-[#534ab7]/10 transition-all">
          <div className="bg-white p-3 rounded-full text-[#534ab7] shadow-sm"><Camera size={24} /></div>
          <p className="text-xs font-black text-[#534ab7] text-center leading-tight">萌寵 AR 濾鏡<br /><span className="text-[9px] font-bold opacity-60">賺 10pt 社交積分</span></p>
        </div>
      </section>

      {/* 連續學習 + 升級方案 */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-3xl p-4 text-white flex flex-col gap-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-white" />
            <span className="font-black text-sm">連續學習</span>
          </div>
          <p className="text-4xl font-black leading-none">{streak}<span className="text-base opacity-70"> 天</span></p>
          <p className="text-[10px] opacity-80 font-bold">堅持就是力量 💪 明天繼續！</p>
        </div>
        <button onClick={() => setShowPlans(true)} className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-3xl p-4 text-white flex flex-col gap-2 shadow-lg active:scale-95 transition">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-yellow-300" />
            <span className="font-black text-sm">升級方案</span>
          </div>
          <p className="text-xs font-bold opacity-80 leading-snug">解鎖全課程<br />所有認證考試</p>
          <span className="text-[10px] bg-white/20 rounded-full px-2 py-0.5 font-black w-fit">查看方案 →</span>
        </button>
      </section>

      {/* 租借整備進度 */}
      <section className="bg-orange-50 rounded-[2rem] p-5 border-2 border-orange-100 shadow-sm">
        <h4 className="font-black text-orange-700 flex items-center gap-2 text-sm mb-4">
          <Bell size={16} className="animate-bounce" /> 瑭原同學：租借整備進度
        </h4>
        <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
          <img src={ANIMALS[0].img} className="w-16 h-16 rounded-xl object-cover ring-4 ring-orange-50" alt="飛飛" />
          <div className="flex-1">
            <p className="text-[11px] text-slate-500 font-bold leading-snug">環境審核已通過。明日 14:00 請至「成大門市」領取專屬租借箱並完成飛飛的抓握練習。</p>
            <div className="h-1.5 bg-slate-100 w-full rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-[#0f6e56] rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 下一個里程碑 */}
      <section className="bg-gradient-to-br from-[#534ab7] to-purple-700 text-white rounded-[2rem] p-5 shadow-xl">
        <p className="text-[10px] opacity-60 font-black tracking-widest uppercase mb-3">Next Milestone</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-orange-400 w-14 h-14 rounded-2xl flex items-center justify-center text-[#534ab7] font-black text-2xl shadow-lg">A</div>
          <div>
            <p className="font-black text-lg">A 級大師認證</p>
            <p className="text-xs opacity-70 font-bold">完成「爬蟲飼育認證」課程即可解鎖</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label:'爬蟲飼育認證課程', done:false },
            { label:'試養天數累積 ≥ 30 天', done:false },
            { label:'持有 B 級認證 ≥ 3 個月', done:true },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${m.done ? 'bg-green-400' : 'bg-white/20'}`}>
                {m.done && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <p className={`text-xs font-bold ${m.done ? 'opacity-60 line-through' : 'opacity-90'}`}>{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 bg-black/20 rounded-full overflow-hidden">
          <div className="h-full bg-orange-400 rounded-full" style={{ width: '33%' }} />
        </div>
        <p className="text-[10px] opacity-60 font-bold mt-1">1/3 項目完成</p>
      </section>

      {/* 門市導流 */}
      <section className="grid grid-cols-2 gap-4 pb-2">
        <button onClick={handleCheckIn} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:border-[#0f6e56] transition-all group">
          <div className="bg-[#0f6e56]/5 p-4 rounded-2xl text-[#0f6e56] group-hover:bg-[#0f6e56] group-hover:text-white transition-colors"><QrCode size={28} /></div>
          <p className="text-sm font-black text-slate-800">門市掃碼打卡</p>
        </button>
        <button onClick={() => setShowCafeMenu(true)} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:border-orange-500 transition-all group">
          <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Coffee size={28} /></div>
          <p className="text-sm font-black text-slate-800">今日點餐</p>
        </button>
      </section>

      {showQR      && <QRModal      onClose={() => setShowQR(false)}      checkedIn={checkedIn} />}
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      {showCafeMenu && <CafeMenuModal onClose={() => setShowCafeMenu(false)} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 2 — 動物圖鑑
// ─────────────────────────────────────────────
const FILTERS = [
  { key: 'all',          label: '全部' },
  { key: 'cat',          label: '貓咪' },
  { key: 'dog',          label: '犬隻' },
  { key: 'reptile',      label: '爬蟲' },
  { key: 'small_animal', label: '小動物' },
];

function AnimalsScreen() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState('all');
  const [showAI, setShowAI]     = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const list = filter === 'all' ? ANIMALS : ANIMALS.filter(a => a.type === filter);

  if (selected) return (
    <div className="animate-in slide-in-from-right pb-6">
      <div className="relative h-72 overflow-hidden">
        <img src={selected.img} className="w-full h-full object-cover" alt={selected.name} />
        <button onClick={() => setSelected(null)} className="absolute top-5 left-5 bg-white/90 p-3 rounded-full shadow-lg"><ChevronLeft /></button>
        <div className="absolute bottom-5 right-5 bg-white/95 px-4 py-1.5 rounded-full text-xs font-black shadow-md border border-slate-100">{selected.status}</div>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <p className="text-[#534ab7] text-xs font-black tracking-widest uppercase mb-1">{selected.breed}</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{selected.name}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {selected.tags.map(t => <span key={t} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black border border-orange-100">{t}</span>)}
        </div>
        {selected.minLevel > 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-2 text-xs font-black text-amber-700">
            <Lock size={13} /> 需達到 Lv.{selected.minLevel} 認證才可申請
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {[
            ['🕐 壽命', selected.lifespan],
            ['📐 體型', selected.size],
            ['💪 照護難度', '●'.repeat(selected.care) + '○'.repeat(5-selected.care)],
            ['💰 試養費', `NT$${selected.trialFee.toLocaleString()} / 14 天`],
          ].map(([k,v]) => (
            <div key={k} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold mb-0.5">{k}</p>
              <p className="text-sm font-black text-slate-800">{v}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-2 items-start">
          <span className="text-lg">💡</span>
          <p className="text-xs font-bold text-amber-800 leading-snug">{selected.careNote}</p>
        </div>
        {/* 影片預覽 */}
        <button
          onClick={() => setActiveVideo(selected)}
          className="relative w-full h-44 rounded-[2rem] overflow-hidden group active:scale-[0.98] transition-transform"
        >
          <img
            src={selected.img}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            alt="影片縮圖"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
            <div className="bg-red-600 p-4 rounded-full shadow-2xl group-hover:scale-110 transition">
              <Play size={28} className="text-white fill-white ml-1" />
            </div>
            <p className="text-white font-black text-sm drop-shadow-lg">認識 {selected.name} · 影音介紹</p>
          </div>
          <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
            <Play size={7} className="fill-white" /> YouTube
          </div>
        </button>

        <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 mb-2 tracking-[0.3em] uppercase">My Story</p>
          <p className="text-slate-600 leading-relaxed text-sm font-bold">{selected.story}</p>
        </div>
        <div className="grid gap-3 pb-4">
          {(selected.type === 'reptile' || selected.type === 'small_animal') ? (
            <button className="w-full py-4 rounded-3xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-center gap-2 bg-[#0f6e56] text-white shadow-[#0f6e56]/20">
              <Calendar size={20} /> 預約到店體驗（免費）
            </button>
          ) : (
            <button className={`w-full py-4 rounded-3xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-center gap-2 ${
              selected.status === '可認養' ? 'bg-[#0f6e56] text-white shadow-[#0f6e56]/20' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}>
              <ShieldCheck size={20} />
              {selected.status === '可認養' ? `申請試養 (NT$${selected.trialFee})` : selected.status}
            </button>
          )}
          {selected.buyPrice && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-600 font-bold">{selected.buyNote}</p>
                <p className="text-xl font-black text-amber-800">NT${selected.buyPrice.toLocaleString()}</p>
              </div>
              <button onClick={() => alert(`洽詢購買「${selected.name}」\n\n💰 售價：NT$${selected.buyPrice.toLocaleString()}\n📋 ${selected.buyNote}\n\n請至門市或LINE洽詢`)} className="bg-amber-500 text-white px-4 py-2 rounded-2xl font-black text-sm active:scale-95 transition shadow-md">洽詢購買</button>
            </div>
          )}
          <button className="w-full bg-white text-[#534ab7] border-2 border-[#534ab7]/20 py-4 rounded-3xl font-black flex items-center justify-center gap-2">
            <MapPin size={18} /> 到門市看看牠
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-5 space-y-5 pb-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">生物圖鑑</h2>
        <button onClick={() => setShowAI(true)} className="bg-[#534ab7] text-white px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1 shadow-md active:scale-95 transition">
          <Brain size={14} /> AI 配對
        </button>
      </div>

      {/* 篩選列 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-black transition-all ${filter === f.key ? 'bg-[#0f6e56] text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {list.map(a => (
          <div key={a.id} onClick={() => setSelected(a)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition group hover:border-[#0f6e56]/30 cursor-pointer">
            <div className="relative h-44 overflow-hidden">
              <img src={a.img} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" alt={a.name} />
              <div className={`absolute top-2.5 right-2.5 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-black ${
                a.status === '可認養' ? 'bg-green-100/90 text-green-700' :
                a.status === '試養中' ? 'bg-blue-100/90 text-blue-700' :
                a.status === '準備租借中' ? 'bg-orange-100/90 text-orange-700' :
                a.status === '展示中' ? 'bg-purple-100/90 text-purple-700' :
                'bg-slate-100/90 text-slate-700'
              }`}>{a.status}</div>
              {a.minLevel > 1 && <div className="absolute top-2.5 left-2.5 bg-amber-400/90 p-1 rounded-lg"><Lock size={10} /></div>}
            </div>
            <div className="p-4 text-center">
              <h3 className="font-black text-slate-800 text-base tracking-tighter">{a.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">{a.breed}</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= a.care ? 'bg-orange-400' : 'bg-slate-200'}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAI && <AIMatchModal onClose={() => setShowAI(false)} />}
      {activeVideo && <VideoModal videoQ={activeVideo.videoQ} cover={activeVideo.img} title={`認識 ${activeVideo.name}`} subtitle={activeVideo.breed} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 3 — 課程頁
// ─────────────────────────────────────────────
function CoursesScreen({ addPoints }) {
  const [activeQuiz, setActiveQuiz]     = useState(null);
  const [done, setDone]                 = useState(new Set([1, 2]));
  const [activeVideo, setActiveVideo]   = useState(null);

  const handlePass = (id) => { setDone(prev => new Set([...prev, id])); addPoints(100); setActiveQuiz(null); };

  const groups = ['貓咪基礎', '貓咪進階', '爬蟲特別課程', '犬隻認證'].map(tag => ({
    tag, items: COURSES.filter(c => c.tag === tag),
  }));

  return (
    <div className="p-5 space-y-6 pb-6 animate-in fade-in">
      {/* 頭部 Banner */}
      <div className="bg-[#0f6e56] text-white p-6 rounded-[2.5rem] relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-10"><BookOpen size={100} /></div>
        <h2 className="text-2xl font-black tracking-tight">認證課程中心</h2>
        <p className="text-sm opacity-80 mt-1 font-medium">完成測驗，累積積分解鎖高等認證</p>
        <div className="flex gap-3 mt-4">
          {[['已完成', done.size], ['總課程', COURSES.length], ['可獲 pt', (COURSES.length - done.size) * 100]].map(([k, v]) => (
            <div key={k} className="bg-white/20 rounded-2xl px-4 py-2 text-center">
              <p className="text-xs opacity-70">{k}</p>
              <p className="text-xl font-black">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 認證路徑圖 */}
      <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm">
        <p className="text-xs font-black text-slate-400 tracking-widest uppercase mb-4">認證升級路徑</p>
        <div className="flex items-center justify-between">
          {[
            { level:'C', label:'基礎認證', desc:'貓咪課程', color:'bg-slate-600', done:true },
            { level:'B', label:'專業認證', desc:'行為+犬隻', color:'bg-[#534ab7]', done:true },
            { level:'A', label:'大師認證', desc:'高階物種', color:'bg-orange-500', done:false },
          ].map((c, i) => (
            <React.Fragment key={c.level}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-md ${c.done ? c.color : 'bg-slate-200'} relative`}>
                  {c.level}
                  {c.done && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle2 size={10} className="text-white" /></div>}
                </div>
                <p className="text-[10px] font-black text-slate-700">{c.label}</p>
                <p className="text-[9px] text-slate-400 font-bold">{c.desc}</p>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-1 mx-1 rounded-full ${i === 0 ? 'bg-gradient-to-r from-slate-600 to-[#534ab7]' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 bg-orange-50 rounded-2xl p-3 border border-orange-100 flex items-center gap-2">
          <Trophy size={16} className="text-orange-600 shrink-0" />
          <p className="text-[11px] font-bold text-orange-800">完成爬蟲課程即可解鎖 <span className="font-black">A 級大師認證</span>，獲得蜜袋鼯租借資格！</p>
        </div>
      </div>

      {groups.map(({ tag, items }) => (
        <section key={tag}>
          <h3 className="font-black text-slate-700 text-sm mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#0f6e56] rounded-full" />{tag}
          </h3>
          <div className="space-y-3">
            {items.map(course => (
              <div key={course.id} className={`bg-white rounded-3xl p-5 border shadow-sm transition ${course.locked ? 'opacity-55 border-slate-100' : 'border-slate-100 hover:border-[#0f6e56]/30'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {course.locked && <Lock size={12} className="text-slate-400" />}
                      {course.paid && !course.locked && <span className="bg-purple-100 text-purple-600 text-[9px] font-black px-2 py-0.5 rounded-full">付費 {course.price}</span>}
                      <span className="font-black text-slate-800 text-sm">{course.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold">{course.desc}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Clock size={10} />{course.duration}</span>
                      {course.score && <span className="text-[10px] text-[#0f6e56] font-black">測驗 {course.score} 分</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-1.5 items-end">
                    <button
                      onClick={() => setActiveVideo(course)}
                      className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1 active:scale-95 transition">
                      <Play size={10} className="fill-red-500" /> 影片
                    </button>
                    {done.has(course.id)
                      ? <CheckCircle2 size={24} className="text-[#0f6e56]" />
                      : course.locked
                        ? <div className="bg-slate-100 p-2 rounded-xl"><Lock size={14} className="text-slate-400" /></div>
                        : course.paid && !done.has(course.id)
                          ? <button onClick={() => alert(`購買課程：${course.title}\n費用：${course.price}\n\n付款後即可開始測驗`)} className="bg-purple-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black active:scale-95 transition shadow-md">購買解鎖</button>
                          : <button onClick={() => setActiveQuiz(course)} className="bg-[#0f6e56] text-white px-3 py-1.5 rounded-xl text-[10px] font-black active:scale-95 transition shadow-md">測驗</button>
                    }
                  </div>
                </div>
                {!course.locked && (
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${done.has(course.id) ? 'bg-[#0f6e56]' : 'bg-[#534ab7]'}`}
                      style={{ width: `${done.has(course.id) ? 100 : course.progress}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {activeQuiz && <QuizModal course={activeQuiz} onClose={() => setActiveQuiz(null)} onPass={() => handlePass(activeQuiz.id)} />}
      {activeVideo && <VideoModal videoQ={activeVideo.videoQ} cover={null} title={activeVideo.title} subtitle={activeVideo.desc} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 4 — 社群頁
// ─────────────────────────────────────────────
function CommunityScreen() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [donateAmt, setDonateAmt] = useState(null);
  const [donated, setDonated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const feed = [
    { icon: '🌟', text: '陳瑭原導師 回覆了「蜜袋鼯換毛問題」：建議檢查蛋白質攝取量…', time: '5 分鐘前' },
    { icon: '📸', text: '新進學員分享了與飛飛的 AR 合照！獲得了 128 個讚。', time: '1 小時前' },
    { icon: '🎓', text: '林小美 通過了「貓咪進階行為矯正」測驗，獲得 B 級認證！', time: '3 小時前' },
    { icon: '💬', text: '蜜袋鼯飼主交流群 新增了 5 則回覆，快去看看！', time: '昨天' },
  ];
  const [likes, setLikes] = useState({ 0: 128, 1: 47, 2: 203, 3: 31 });
  const [liked, setLiked] = useState({});
  const toggleLike = (i) => {
    setLiked(prev => ({ ...prev, [i]: !prev[i] }));
    setLikes(prev => ({ ...prev, [i]: prev[i] + (liked[i] ? -1 : 1) }));
  };

  return (
    <div className="p-5 space-y-6 pb-6 animate-in fade-in">
      {/* 社群統計 */}
      <div className="grid grid-cols-3 gap-3">
        {[['👥 成員','847 人'],['📝 本週貼文','23 則'],['🏅 本月認證','12 人']].map(([k,v]) => (
          <div key={k} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold">{k}</p>
            <p className="text-sm font-black text-slate-800">{v}</p>
          </div>
        ))}
      </div>

      {/* ☕ 今日特飲 + 寵物食品預購 */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2rem] p-4 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 text-[70px] leading-none">☕</div>
          <p className="text-[10px] font-black opacity-70 tracking-widest uppercase mb-1">今日推薦</p>
          <p className="font-black text-base leading-tight">爬蟲拿鐵</p>
          <p className="text-orange-100 text-xs mt-1 font-bold">加爬蟲拉花 +NT$20</p>
          <div className="flex items-end justify-between mt-3">
            <p className="text-2xl font-black">NT$130</p>
            <button onClick={() => alert('已加入！前往首頁「今日點餐」結帳')} className="bg-white/25 text-white text-[10px] font-black px-3 py-1.5 rounded-full active:scale-95 transition border border-white/30">點餐</button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0f6e56] to-teal-600 rounded-[2rem] p-4 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 text-[70px] leading-none">🐾</div>
          <p className="text-[10px] font-black opacity-70 tracking-widest uppercase mb-1">合作品牌</p>
          <p className="font-black text-base leading-tight">寵物食品<br />預購到店取</p>
          <div className="flex items-end justify-between mt-3">
            <p className="text-[10px] font-bold opacity-80">週三到貨・免運費</p>
            <button onClick={() => alert('前往預購！\n每週三到店取貨，免運費，現省快遞費')} className="bg-white/25 text-white text-[10px] font-black px-3 py-1.5 rounded-full active:scale-95 transition border border-white/30">預購</button>
          </div>
        </div>
      </section>

      {/* 🎬 短影音 Reels */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-slate-800 flex items-center gap-2 text-base">
            <PlayCircle size={20} className="text-red-500" /> 萌寵短影音
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-black text-white">TikTok</span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-600 text-white">YouTube</span>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {REELS.map(reel => (
            <button key={reel.id} onClick={() => setActiveVideo(reel)}
              className="shrink-0 w-36 rounded-2xl overflow-hidden relative active:scale-95 transition-transform shadow-lg">
              <div className="relative h-56">
                <img src={reel.cover} className="w-full h-full object-cover" alt={reel.title} />
                {/* 漸層遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                {/* 頂部平台圖示 */}
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <div className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-white text-[8px] font-black">♪</span>
                    <span className="text-white text-[8px] font-black">TK</span>
                  </div>
                </div>
                {/* 中央播放按鈕 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-xl">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* 右側互動 */}
                <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center">
                    <Heart size={18} className="text-white fill-white" />
                    <span className="text-white text-[8px] font-bold">{reel.views}</span>
                  </div>
                </div>
                {/* 底部資訊 */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-white text-[10px] font-black leading-tight line-clamp-2">{reel.title}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-[6px] font-black">{reel.creator[0]}</span>
                    </div>
                    <p className="text-white/70 text-[9px] font-bold">@{reel.creator}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2 font-bold">點擊選擇平台觀看 · YouTube / TikTok / Instagram</p>
      </section>

      {/* 📱 社群貼文（Instagram 風格） */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
            <Heart size={18} className="text-rose-500" /> 飼主分享
          </h3>
          <span className="text-[10px] text-slate-400 font-bold">最新動態</span>
        </div>
        {COMMUNITY_POSTS.map(post => <CommunityPostCard key={post.id} post={post} />)}
      </section>

      {/* 旗艦講座 Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-900 rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 scale-150 translate-x-4"><Sparkles size={120} /></div>
        <div className="relative z-10 space-y-4">
          <span className="bg-orange-400 text-teal-900 px-3 py-0.5 rounded-full text-[10px] font-black animate-pulse">🔥 旗艦跨界講座</span>
          <h2 className="text-xl font-black leading-tight">「萬物皆陪伴」：<br />昆蟲與寵物的奇幻視界</h2>
          <div className="flex items-center gap-3 py-3 border-y border-white/10">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" className="w-12 h-12 rounded-full border-4 border-white/20 object-cover" alt="講師" />
            <div>
              <p className="text-sm font-black">主講：昆蟲擾師 吳沁婕</p>
              <p className="text-[10px] opacity-70 font-bold italic">Dee the bugbuff</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-black">
            <div className="bg-black/20 p-2.5 rounded-2xl flex items-center gap-2"><Calendar size={13} className="text-orange-400" /> 05/18 (一) 19:00</div>
            <div className="bg-black/20 p-2.5 rounded-2xl flex items-center gap-2"><MapPin size={13} className="text-orange-400" /> 成大門市 B 區</div>
          </div>
          <button onClick={() => alert('報名成功！獲得 50pt！')} className="w-full bg-white text-teal-900 py-3.5 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition">
            立即報名 (Lv.2 以上 0 pt)
          </button>
        </div>
      </div>

      {/* 社群動態 */}
      <section className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg tracking-tighter"><Activity size={22} className="text-[#534ab7]" /> 成大社群互動</h3>
        <div className="space-y-3">
          {feed.map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-lg shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-600 text-sm leading-snug">{item.text}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => toggleLike(i)} className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full transition-all ${liked[i] ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                  <Heart size={12} className={liked[i] ? 'fill-rose-500' : ''} /> {likes[i]}
                </button>
                <button className="text-xs font-bold text-[#534ab7] px-3 py-1.5 rounded-full bg-[#534ab7]/5">💬 回覆</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 近期活動 */}
      <section className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-black text-slate-800 flex items-center gap-2 text-base"><Calendar size={18} className="text-orange-500" /> 近期活動</h3>
        {[
          { date:'06/07', title:'CreaCert 認證日', desc:'現場闖關通過即頒認證卡', tag:'免費', tagColor:'bg-green-100 text-green-700' },
          { date:'06/18', title:'爬蟲飼育體驗營', desc:'8 小時密集實作課程', tag:'NT$299', tagColor:'bg-purple-100 text-purple-700' },
          { date:'07/01', title:'暑假試養計畫啟動', desc:'14 天試養，畢業前最後機會', tag:'熱門', tagColor:'bg-orange-100 text-orange-700' },
        ].map(e => (
          <div key={e.date} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-[#0f6e56] text-white rounded-xl px-3 py-2 text-center shrink-0 shadow-sm">
              <p className="text-[9px] font-black opacity-70">{e.date.split('/')[0]}月</p>
              <p className="text-lg font-black leading-none">{e.date.split('/')[1]}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-slate-800 text-sm">{e.title}</p>
              <p className="text-[10px] text-slate-400 font-bold truncate">{e.desc}</p>
            </div>
            <span className={`text-[9px] font-black px-2 py-1 rounded-full shrink-0 ${e.tagColor}`}>{e.tag}</span>
          </div>
        ))}
      </section>

      {/* 🛍️ 商城 + 捐贈 入口 */}
      <section className="grid grid-cols-2 gap-4">
        <button onClick={() => setShowShop(true)}
          className="bg-gradient-to-br from-orange-400 to-rose-500 text-white rounded-[2rem] p-5 flex flex-col items-start gap-3 shadow-xl active:scale-95 transition relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 text-[80px] leading-none">🛍️</div>
          <div className="bg-white/20 p-2.5 rounded-xl text-xl">🛍️</div>
          <div>
            <p className="font-black text-base leading-tight">寵物商城</p>
            <p className="text-[11px] opacity-80 font-bold mt-0.5">飼料・用品・保健</p>
          </div>
          {cartCount > 0 && (
            <div className="absolute top-3 right-3 bg-white text-rose-500 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">{cartCount}</div>
          )}
        </button>
        <button onClick={() => setShowDonate(true)}
          className="bg-gradient-to-br from-[#0f6e56] to-teal-600 text-white rounded-[2rem] p-5 flex flex-col items-start gap-3 shadow-xl active:scale-95 transition relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 text-[80px] leading-none">🐾</div>
          <div className="bg-white/20 p-2.5 rounded-xl text-xl">💝</div>
          <div>
            <p className="font-black text-base leading-tight">流浪捐贈</p>
            <p className="text-[11px] opacity-80 font-bold mt-0.5">幫助街頭毛孩</p>
          </div>
        </button>
      </section>

      {activeVideo && <VideoModal videoQ={activeVideo.videoQ} cover={activeVideo.cover} title={activeVideo.title} subtitle={`@${activeVideo.creator} · ${activeVideo.views} 次觀看`} onClose={() => setActiveVideo(null)} />}

      {/* 商城 Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col animate-in slide-in-from-bottom">
          <div className="mt-16 bg-white rounded-t-[3rem] flex-1 overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900">🛍️ 寵物商城</h2>
                <p className="text-xs text-slate-400 font-bold mt-0.5">CreaCert 認證推薦商品</p>
              </div>
              <button onClick={() => setShowShop(false)} className="bg-slate-100 p-2.5 rounded-full"><XCircle size={20} /></button>
            </div>
            <div className="p-5 space-y-4 pb-10">
              <div className="bg-gradient-to-r from-[#534ab7] to-purple-600 text-white rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-black text-sm">B 級會員 9 折優惠中</p>
                  <p className="text-[10px] opacity-70 font-bold">認證等級越高，折扣越大</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-[1.5rem] overflow-hidden shadow-sm">
                    <div className="h-28 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-5xl">{p.emoji}</div>
                    <div className="p-3">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                      <p className="font-black text-slate-800 text-xs mt-1.5 leading-snug">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{p.brand}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-rose-500 font-black text-sm">NT${p.price}</span>
                        <span className="text-slate-300 text-[10px] line-through">NT${p.original}</span>
                      </div>
                      <button onClick={() => setCartCount(c => c + 1)}
                        className="w-full mt-2 bg-[#0f6e56] text-white py-2 rounded-xl text-[11px] font-black active:scale-95 transition">
                        加入購物車
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {cartCount > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 z-50">
                  🛒 購物車 {cartCount} 件
                  <button onClick={() => { setCartCount(0); alert('結帳功能即將上線！'); }}
                    className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-black">結帳</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 捐贈 Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end animate-in slide-in-from-bottom">
          <div className="bg-white rounded-t-[3rem] w-full p-8 space-y-5 pb-12">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900">💝 流浪動物捐贈</h2>
                <p className="text-xs text-slate-400 font-bold mt-1">每筆捐款直接用於台南街頭流浪動物照護</p>
              </div>
              <button onClick={() => { setShowDonate(false); setDonated(false); setDonateAmt(null); }} className="bg-slate-100 p-2.5 rounded-full"><XCircle size={20} /></button>
            </div>
            {!donated ? (<>
              <div className="grid grid-cols-3 gap-2">
                {[['NT$100','一週飼料'],['NT$300','醫療補助'],['NT$1000','絕育手術']].map(([a,d]) => (
                  <div key={a} className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
                    <p className="font-black text-[#0f6e56] text-sm">{a}</p>
                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">{d}</p>
                  </div>
                ))}
              </div>
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <div className="flex justify-between text-xs font-black text-orange-700 mb-2">
                  <span>🎯 本月目標 NT$10,000</span><span>NT$6,840 已達成</span>
                </div>
                <div className="h-3 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full" style={{ width: '68%' }} />
                </div>
                <p className="text-[10px] text-orange-600 font-bold mt-2">68% 達成 · 已幫助 23 隻流浪動物 🐾</p>
              </div>
              <div>
                <p className="font-black text-slate-700 text-sm mb-3">選擇捐贈金額</p>
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 300, 500, 1000, 3000].map(amt => (
                    <button key={amt} onClick={() => setDonateAmt(amt)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all border-2 ${donateAmt === amt ? 'bg-[#0f6e56] text-white border-[#0f6e56]' : 'bg-white text-slate-700 border-slate-200'}`}>
                      NT${amt}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => { if (donateAmt) setDonated(true); }} disabled={!donateAmt}
                className={`w-full py-4 rounded-2xl font-black text-base shadow-xl transition-all ${donateAmt ? 'bg-gradient-to-r from-[#0f6e56] to-teal-500 text-white active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                {donateAmt ? `💝 捐贈 NT$${donateAmt}` : '請先選擇金額'}
              </button>
            </>) : (
              <div className="text-center py-6 space-y-4">
                <div className="text-6xl animate-bounce">🎉</div>
                <h3 className="text-2xl font-black text-slate-900">謝謝你的愛心！</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed">NT${donateAmt} 已成功捐出<br />你幫助了台南街頭的流浪動物 🐾</p>
                <div className="bg-[#0f6e56]/5 rounded-2xl p-4 border border-[#0f6e56]/10">
                  <p className="text-[11px] text-[#0f6e56] font-bold leading-relaxed">你的捐款將用於：飼料補給、醫療照護、絕育手術，讓更多動物有機會等到領養的那一天。</p>
                </div>
                <button onClick={() => { setShowDonate(false); setDonated(false); setDonateAmt(null); }}
                  className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black shadow-xl">關閉</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 5 — 試養日記 + 積分
// ─────────────────────────────────────────────
function DiaryScreen({ points }) {
  const [section, setSection]       = useState('health');
  const [showAdd, setShowAdd]       = useState(false);
  const weightData = [122, 124, 123, 126, 125, 127, 128];
  const weightLabels = ['5/8','5/9','5/10','5/11','5/12','5/13','5/14'];
  const maxW = Math.max(...weightData);
  const minW = Math.min(...weightData) - 2;

  return (
    <div className="p-5 space-y-5 pb-6 animate-in fade-in">
      {/* 試養進度橫幅 */}
      <div className="bg-orange-500 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <ClipboardList className="absolute right-2 top-2 opacity-10" size={100} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-2xl"><Activity size={22} /></div>
              <div>
                <h2 className="text-xl font-black tracking-tight">飛飛日記</h2>
                <p className="text-[10px] opacity-70 font-bold tracking-widest uppercase">Foster Progress</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black">第 10 天</p>
              <p className="text-xs opacity-70 font-bold">共 14 天</p>
            </div>
          </div>
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '71%' }} />
          </div>
          <p className="text-xs opacity-70 mt-2 font-bold">距試養期結束還有 4 天</p>
        </div>
      </div>

      {/* 分頁切換 */}
      <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
        {[['health', '健康追蹤'], ['diary', '日記紀錄'], ['points', '積分帳戶']].map(([key, label]) => (
          <button key={key} onClick={() => setSection(key)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${section === key ? 'bg-white text-[#0f6e56] shadow-sm' : 'text-slate-500'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* 健康追蹤 */}
      {section === 'health' && (
        <div className="bg-white p-6 rounded-[2.5rem] border-2 border-orange-100 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <h3 className="font-black text-slate-800">今日健康紀錄</h3>
            <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">2026/05/14</span>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <p className="font-black text-slate-500">當前體重</p>
              <p className="text-xl font-black text-[#0f6e56]">128g <span className="text-[10px] text-slate-300">(+2g)</span></p>
            </div>
            {/* 體重趨勢 */}
            <div>
              <p className="font-black text-slate-500 mb-2">體重趨勢（7天）</p>
              <div className="flex items-end gap-1.5 h-20 bg-slate-50 rounded-2xl p-3 border border-slate-100">
                {weightData.map((w, i) => {
                  const pct = ((w - minW) / (maxW - minW)) * 100;
                  const isToday = i === weightData.length - 1;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col justify-end" style={{ height: '52px' }}>
                        <div className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-[#0f6e56]' : 'bg-slate-300'}`}
                          style={{ height: `${Math.max(pct, 8)}%` }} />
                      </div>
                      <p className="text-[7px] text-slate-400 font-bold">{weightLabels[i].split('/')[1]}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-1">📈 本週增重 6g，狀況良好！</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-black text-slate-500">飲水量</p>
              <p className="text-xl font-black text-[#0f6e56]">正常</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-black text-slate-500">活力程度</p>
              <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}</div>
            </div>
            {/* 今日飲食清單 */}
            <div>
              <p className="font-black text-slate-500 mb-2">今日飲食確認</p>
              <div className="space-y-2">
                {[
                  { label:'蜜袋鼯專用飼料 10g', done:true },
                  { label:'木瓜泥 5g', done:true },
                  { label:'水份補充（葡萄 1 顆）', done:false },
                ].map((m, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${m.done ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100'}`}>
                    <CheckCircle2 size={16} className={m.done ? 'text-green-500' : 'text-slate-300'} />
                    <p className={`text-xs font-bold ${m.done ? 'text-green-700' : 'text-slate-500'}`}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="w-full bg-orange-500 text-white py-4 rounded-[2rem] font-black text-base shadow-xl active:scale-95 transition">更新今日紀錄</button>
        </div>
      )}

      {/* 日記紀錄 */}
      {section === 'diary' && (
        <div className="space-y-4">
          <button onClick={() => setShowAdd(true)} className="w-full bg-white border-2 border-dashed border-[#0f6e56]/30 rounded-3xl p-4 flex items-center justify-center gap-2 text-[#0f6e56] font-black text-sm hover:bg-[#0f6e56]/5 transition">
            <PlusCircle size={20} /> 新增今日日記
          </button>
          {DIARY_ENTRIES.map(entry => (
            <div key={entry.day} className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black">第 {entry.day} 天</div>
                  <span className="text-[10px] text-slate-400 font-bold">{entry.date}</span>
                </div>
                <div className="flex gap-0.5">{Array.from({ length: entry.mood }).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
              </div>
              <h4 className="font-black text-slate-800">{entry.title}</h4>
              <p className="text-sm text-slate-500 font-bold leading-snug">{entry.content}</p>
              <div className="h-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 text-xs font-black">📷 點擊上傳照片</div>
            </div>
          ))}
        </div>
      )}

      {/* 積分帳戶 */}
      {section === 'points' && (
        <div className="space-y-4">
          <div className="bg-[#534ab7] text-white rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10"><Trophy size={100} /></div>
            <p className="text-sm opacity-70 font-bold mb-1">累積積分</p>
            <p className="text-6xl font-black tracking-tighter">{points.toLocaleString()}<span className="text-xl opacity-50 ml-1">pt</span></p>
            <div className="mt-4">
              <div className="flex justify-between text-[10px] opacity-70 font-bold mb-1">
                <span>領養費折抵進度（目標 2000 pt）</span>
                <span>{Math.min(points, 2000)} / 2000</span>
              </div>
              <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((points / 2000) * 100, 100)}%` }} />
              </div>
            </div>
          </div>

          {/* 積分兌換商城 */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 space-y-3">
            <h4 className="font-black text-slate-700 text-sm flex items-center gap-2"><Star size={16} className="text-yellow-500 fill-yellow-400" /> 積分兌換商城</h4>
            {[
              { name:'領養費折抵 NT$200', pts:500,  icon:'🏷️', enough: true },
              { name:'爬蟲課程免費券',    pts:800,  icon:'📚', enough: true },
              { name:'蜜袋鼯零食禮盒',   pts:1200, icon:'🎁', enough: true },
              { name:'A 級認證加速券',   pts:2000, icon:'🥇', enough: false },
            ].map(r => (
              <div key={r.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-black text-slate-700">{r.name}</p>
                    <p className="text-[10px] text-[#534ab7] font-black">{r.pts.toLocaleString()} pt</p>
                  </div>
                </div>
                <button className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${r.enough ? 'bg-[#534ab7] text-white active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  {r.enough ? '兌換' : '不足'}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <h4 className="font-black text-slate-700 px-5 pt-5 pb-3 text-sm border-b border-slate-50">交易紀錄</h4>
            {POINTS_HISTORY.map(item => (
              <div key={item.id} className="flex items-center justify-between px-5 py-4 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-black text-slate-700">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.date}</p>
                </div>
                <span className={`font-black text-base ${item.pts > 0 ? 'text-[#0f6e56]' : 'text-red-500'}`}>
                  {item.pts > 0 ? `+${item.pts}` : item.pts}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 新增日記 Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end animate-in fade-in">
          <div className="bg-white rounded-t-[3rem] w-full p-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black">新增日記</h3>
              <button onClick={() => setShowAdd(false)}><XCircle /></button>
            </div>
            <input className="w-full border-2 border-slate-100 rounded-2xl p-4 font-bold text-sm focus:outline-none focus:border-[#0f6e56]" placeholder="今天的標題..." />
            <textarea rows={4} className="w-full border-2 border-slate-100 rounded-2xl p-4 font-bold text-sm focus:outline-none focus:border-[#0f6e56]" placeholder="記錄今天與飛飛的點滴..." />
            <button onClick={() => setShowAdd(false)} className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black shadow-xl">儲存日記</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Modals
// ─────────────────────────────────────────────
function CertificationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-7 right-7 text-slate-400"><XCircle /></button>
        <div className="text-center mb-6"><ShieldCheck size={44} className="text-[#0f6e56] mx-auto mb-3" /><h2 className="text-2xl font-black">認證等級說明</h2></div>
        <div className="space-y-3">
          {CERT_LEVELS.map((c, i) => (
            <div key={i} className={`flex gap-4 p-4 rounded-3xl border-2 ${c.level === 'A' ? 'bg-orange-50 border-orange-300/30' : 'bg-slate-50 border-slate-100'}`}>
              <div className={`font-black w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm ${c.color}`}>{c.level}</div>
              <div>
                <p className="font-black text-sm">{c.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{c.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.privileges.map(p => <span key={p} className="text-[9px] bg-white border border-slate-200 px-2 py-0.5 rounded-full font-bold text-slate-600">{p}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black mt-6 shadow-xl">我了解了</button>
      </div>
    </div>
  );
}

function PortraitModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-8 animate-in zoom-in">
      <div className="bg-[#f4ebd0] rounded-[4rem] w-full max-w-sm p-4 shadow-2xl relative border-[14px] border-[#3c2a21]">
        <button onClick={onClose} className="absolute -top-14 right-0 text-white"><XCircle size={36} /></button>
        <div className="border-4 border-dashed border-[#8a7322]/30 rounded-[3rem] p-8 text-center flex flex-col items-center">
          <h2 className="text-xl font-black text-[#3c2a21] mb-2 tracking-[0.3em] uppercase" style={{ fontFamily: 'serif' }}>時間的扉頁</h2>
          <div className="w-48 h-64 mb-6 rounded-t-full overflow-hidden border-[8px] border-[#5c4033] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400" className="w-full h-full object-cover grayscale brightness-90 contrast-125" alt="portrait" />
          </div>
          <h3 className="font-black text-[#3c2a21] text-xl mb-1">陳瑭原 & 飛飛</h3>
          <p className="text-[11px] text-[#5c4033] font-serif italic mb-6">Sugar Glider Master · Certified 2026</p>
          <button className="bg-[#3c2a21] text-[#f4ebd0] px-8 py-3 rounded-full font-black text-xs flex items-center gap-2 shadow-2xl uppercase tracking-widest">
            <ImageIcon size={16} /> Share to Threads
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 投資人儀表板 ──
function InvestorDashboard({ onClose }) {
  const d = INVESTOR_DATA;
  const maxVal = 220000;
  const roiPct = Math.min(Math.round((d.kpi.totalRecovered / d.kpi.totalInvested) * 100), 100);
  const progressPct = Math.min(Math.round((d.kpi.currentMonth / d.kpi.breakEvenMonth) * 100), 100);
  const momGrowth = Math.round(((d.kpi.thisMonth - d.kpi.lastMonth) / d.kpi.lastMonth) * 100);

  return (
    <div className="absolute inset-0 bg-slate-900 z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 bg-gradient-to-r from-slate-800 to-slate-900 px-5 pt-10 pb-4 flex items-center justify-between border-b border-white/10">
        <div>
          <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">🔒 INVESTOR ONLY</p>
          <h2 className="text-white font-black text-lg">CreaCert 投資人報表</h2>
          <p className="text-white/40 text-xs">2026年 5月 · 第 5 個月</p>
        </div>
        <button onClick={onClose} className="bg-white/10 p-2.5 rounded-full border border-white/20 active:scale-90 transition">
          <XCircle size={22} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* KPI 四宮格 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">本月營收</p>
            <p className="text-white font-black text-2xl mt-1">NT${(d.kpi.thisMonth/1000).toFixed(0)}K</p>
            <p className="text-emerald-200 text-xs font-bold mt-1">↑ {momGrowth}% vs 上月</p>
          </div>
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-4">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">本月淨利</p>
            <p className="text-white font-black text-2xl mt-1">NT${(d.kpi.netProfit/1000).toFixed(0)}K</p>
            <p className="text-purple-200 text-xs font-bold mt-1">固定成本已覆蓋 ✓</p>
          </div>
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-4">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">本月來客</p>
            <p className="text-white font-black text-2xl mt-1">{d.kpi.visitors.toLocaleString()}</p>
            <p className="text-rose-200 text-xs font-bold mt-1">人次（+18% MoM）</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">總投資額</p>
            <p className="text-white font-black text-xl mt-1">NT$136萬</p>
            <p className="text-amber-200 text-xs font-bold mt-1">已回收 NT${(d.kpi.totalRecovered/1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* 回本進度 */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between items-center mb-3">
            <p className="text-white font-black text-sm">📈 回本進度</p>
            <p className="text-white/60 text-xs">目標：第 {d.kpi.breakEvenMonth} 個月</p>
          </div>
          <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-emerald-400 text-xs font-bold">第 {d.kpi.currentMonth} 個月（{progressPct}%）</p>
            <p className="text-white/40 text-xs">預計 {d.kpi.breakEvenMonth - d.kpi.currentMonth} 個月後回本</p>
          </div>
        </div>

        {/* 月營收 vs 支出 Bar Chart */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <p className="text-white font-black text-sm mb-4">💰 月收支趨勢</p>
          <div className="flex items-end justify-between gap-1.5" style={{ height: 120 }}>
            {d.monthly.map((m) => {
              const revH = Math.round((m.revenue / maxVal) * 100);
              const costH = Math.round((m.cost / maxVal) * 100);
              const isPos = m.profit >= 0;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex items-end justify-center gap-0.5" style={{ height: 100 }}>
                    <div
                      className="flex-1 rounded-t-sm bg-emerald-400 opacity-90 transition-all"
                      style={{ height: `${revH}%` }}
                    />
                    <div
                      className="flex-1 rounded-t-sm bg-rose-400 opacity-70"
                      style={{ height: `${costH}%` }}
                    />
                  </div>
                  <p className="text-white/50 text-[9px] font-bold">{m.month}</p>
                  <p className={`text-[9px] font-black ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPos ? '+' : ''}{(m.profit / 1000).toFixed(0)}K
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-emerald-400" /><p className="text-white/50 text-[10px]">營收</p></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-rose-400" /><p className="text-white/50 text-[10px]">支出</p></div>
          </div>
        </div>

        {/* 收入結構 */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <p className="text-white font-black text-sm mb-3">🥧 收入來源分佈（本月）</p>
          <div className="space-y-2.5">
            {d.breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between mb-1">
                  <p className="text-white/80 text-xs font-bold">{b.label}</p>
                  <p className="text-white/60 text-xs">NT${(b.value/1000).toFixed(0)}K · {b.pct}%</p>
                </div>
                <div className="bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 損益明細表 */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <p className="text-white font-black text-sm mb-3">📋 損益明細（本月）</p>
          <div className="space-y-2">
            {[
              { label: '總營收', val: 178000, color: 'text-emerald-400' },
              { label: '食材/進貨', val: -52000, color: 'text-rose-400' },
              { label: '租金', val: -50000, color: 'text-rose-400' },
              { label: '人事', val: -35000, color: 'text-rose-400' },
              { label: '水電+動物照護', val: -22000, color: 'text-rose-400' },
              { label: '行銷雜費', val: -8000, color: 'text-rose-400' },
            ].map((r) => (
              <div key={r.label} className="flex justify-between items-center py-1.5 border-b border-white/5">
                <p className="text-white/60 text-xs">{r.label}</p>
                <p className={`text-xs font-black ${r.color}`}>
                  {r.val > 0 ? '' : '-'}NT${Math.abs(r.val).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <p className="text-white font-black text-sm">月淨利</p>
              <p className="text-emerald-400 font-black text-sm">+NT$11,000</p>
            </div>
          </div>
        </div>

        {/* 風險監控 */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <p className="text-white font-black text-sm mb-3">⚠️ 風險監控</p>
          <div className="space-y-2">
            {d.risks.map((r) => (
              <div key={r.item} className="flex justify-between items-center py-1.5 border-b border-white/5">
                <p className="text-white/60 text-xs">{r.item}</p>
                <p className={`text-xs font-black ${r.color}`}>{r.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 備註 */}
        <div className="bg-slate-700/50 rounded-xl p-3 text-center mb-4">
          <p className="text-white/30 text-[10px]">本報表數據每月 1 日更新 · 僅供投資人參閱</p>
          <p className="text-white/30 text-[10px] mt-0.5">CreaCert © 2026 · 機密文件</p>
        </div>
      </div>
    </div>
  );
}

// ── 影片播放 Modal ──
function VideoModal({ videoQ, cover, title, subtitle, onClose }) {
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoQ)}`;
  const ttUrl = `https://www.tiktok.com/search?q=${encodeURIComponent(videoQ)}`;
  const igUrl = `https://www.instagram.com/explore/tags/${encodeURIComponent(videoQ.replace(/\s+/g,''))}`;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{background:'#000'}}>
      {/* 背景封面圖 */}
      <div className="absolute inset-0">
        {cover
          ? <img src={cover} className="w-full h-full object-cover" alt="" />
          : <div className="w-full h-full bg-gradient-to-br from-[#0f6e56] to-slate-900" />
        }
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
      </div>

      {/* 頂部 */}
      <div className="relative shrink-0 flex items-center justify-between px-5 pt-11 pb-4">
        <div>
          <p className="text-white/50 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
            <Tv2 size={10} /> CreaCert 影音
          </p>
          <h3 className="text-white font-black text-base leading-tight mt-0.5">{title}</h3>
          {subtitle && <p className="text-white/50 text-xs font-bold mt-0.5">{subtitle}</p>}
        </div>
        <button onClick={onClose} className="bg-white/15 backdrop-blur-sm p-2.5 rounded-full border border-white/20 active:scale-90 transition">
          <XCircle size={22} className="text-white" />
        </button>
      </div>

      {/* 中央播放提示 */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 px-5">
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-2xl">
          <Play size={44} className="text-white ml-2" fill="white" />
        </div>
        <div className="text-center">
          <p className="text-white font-black text-base">選擇平台觀看</p>
          <p className="text-white/50 text-xs mt-1 max-w-[220px] leading-relaxed">"{videoQ}"</p>
        </div>
      </div>

      {/* 底部平台按鈕 */}
      <div className="relative shrink-0 px-5 pb-14 space-y-3">
        {/* YouTube */}
        <a href={ytUrl} target="_blank" rel="noreferrer"
           className="flex items-center gap-4 bg-red-600 hover:bg-red-500 rounded-2xl p-4 w-full active:scale-[0.98] transition-transform shadow-xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow">
            <span className="text-red-600 font-black text-lg">▶</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-black text-sm">YouTube 搜尋觀看</p>
            <p className="text-red-200 text-[11px] mt-0.5">最豐富的教學影片資源</p>
          </div>
          <span className="text-white/60 text-xs">→</span>
        </a>

        {/* TikTok */}
        <a href={ttUrl} target="_blank" rel="noreferrer"
           className="flex items-center gap-4 bg-[#010101] border border-white/20 rounded-2xl p-4 w-full active:scale-[0.98] transition-transform shadow-xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow">
            <span className="font-black text-base">♪</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-black text-sm">TikTok 搜尋觀看</p>
            <p className="text-white/40 text-[11px] mt-0.5">年輕飼主的短影音首選</p>
          </div>
          <span className="text-white/60 text-xs">→</span>
        </a>

        {/* Instagram */}
        <a href={igUrl} target="_blank" rel="noreferrer"
           className="flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-4 w-full active:scale-[0.98] transition-transform shadow-xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow">
            <span className="font-black text-base bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent">IG</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-black text-sm">Instagram Reels</p>
            <p className="text-pink-200 text-[11px] mt-0.5">社群精選寵物影片</p>
          </div>
          <span className="text-white/60 text-xs">→</span>
        </a>

        <button onClick={onClose} className="w-full text-white/40 text-xs font-bold py-2 text-center">
          關閉
        </button>
      </div>
    </div>
  );
}

function QRModal({ onClose, checkedIn }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-8 animate-in fade-in">
      <div className="bg-white rounded-[3rem] p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl">
        <button onClick={onClose} className="absolute top-7 right-7 text-slate-400"><XCircle /></button>
        <div className="bg-slate-50 p-8 rounded-[2.5rem] border-4 border-[#0f6e56] mb-6 shadow-inner">
          <QrCode size={160} className="text-[#0f6e56]" />
        </div>
        <p className="font-black text-slate-800 text-2xl">門市打卡成功！</p>
        {checkedIn && <p className="text-[11px] text-[#0f6e56] font-bold mt-2 tracking-widest uppercase">+20 Points Credited</p>}
      </div>
    </div>
  );
}

function BookingModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center animate-in fade-in">
      <div className="bg-white rounded-t-[4rem] w-full p-8 space-y-6 shadow-2xl border-t-8 border-orange-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-800">預約讀書艙</h2>
            <p className="text-xs text-slate-400 font-bold mt-1 tracking-widest uppercase">Bio-Med Building 1F</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 rounded-full"><XCircle /></button>
        </div>
        <div className="space-y-3">
          {[
            { time: '明日 09:00 - 13:00', pt: '50 pt / hr', badge: 'Off-Peak 0.5x', color: 'border-green-100 bg-green-50/50', badgeColor: 'bg-green-600' },
            { time: '明日 18:30 - 21:30', pt: '150 pt / hr', badge: 'Hot 1.5x',      color: 'border-orange-100 bg-orange-50/50', badgeColor: 'bg-orange-500' },
          ].map(s => (
            <button key={s.time} className={`w-full text-left p-5 rounded-[2rem] border-2 ${s.color} relative`}>
              <div className={`absolute right-5 top-5 ${s.badgeColor} text-white text-[9px] font-black px-2.5 py-1 rounded-full`}>{s.badge}</div>
              <p className="font-black text-slate-800 text-lg">{s.time}</p>
              <p className="text-sm text-slate-500 font-black mt-1">{s.pt}</p>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-[#0f6e56] text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl">確認預約</button>
      </div>
    </div>
  );
}

// ── 課程測驗 Modal ──
function QuizModal({ course, onClose, onPass }) {
  const [cur, setCur]         = useState(0);
  const [sel, setSel]         = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone]       = useState(false);

  const q = QUIZ_QUESTIONS[cur];

  const next = () => {
    const all = [...answers, { correct: sel === q.ans }];
    if (cur < QUIZ_QUESTIONS.length - 1) { setAnswers(all); setCur(c => c + 1); setSel(null); }
    else { setAnswers(all); setDone(true); }
  };

  const score   = done ? Math.round((answers.filter(a => a.correct).length / QUIZ_QUESTIONS.length) * 100) : 0;
  const passed  = score >= 70;

  return (
    <div className="fixed inset-0 bg-black/85 z-[60] flex items-center justify-center p-5 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm p-7 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-7 right-7 text-slate-400"><XCircle /></button>

        {!done ? (
          <>
            <p className="text-xs text-slate-400 font-black tracking-widest mb-2 uppercase">{course.title} 測驗</p>
            <div className="flex gap-1 mb-4">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i < cur ? 'bg-[#0f6e56]' : i === cur ? 'bg-[#534ab7]' : 'bg-slate-100'}`} />
              ))}
            </div>
            <p className="font-black text-slate-800 text-base leading-snug mb-5">Q{cur + 1}. {q.q}</p>
            <div className="space-y-3 mb-5">
              {q.options.map((opt, i) => {
                let cls = 'border-slate-100 bg-slate-50 text-slate-700';
                if (sel !== null) {
                  if (i === q.ans) cls = 'border-green-400 bg-green-50 text-green-700';
                  else if (i === sel) cls = 'border-red-300 bg-red-50 text-red-600';
                }
                return (
                  <button key={i} onClick={() => sel === null && setSel(i)}
                    className={`w-full text-left p-4 rounded-2xl border-2 font-bold text-sm transition-all ${cls}`}>
                    <span className="text-[10px] font-black opacity-50 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
            <button onClick={next} disabled={sel === null}
              className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg transition-all ${sel !== null ? 'bg-[#0f6e56] text-white active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
              {cur < QUIZ_QUESTIONS.length - 1 ? '下一題' : '查看結果'}
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-[#0f6e56]' : 'bg-red-500'}`}>
              {passed ? <Trophy size={36} className="text-white" /> : <XCircle size={36} className="text-white" />}
            </div>
            <p className="text-5xl font-black mb-2">{score}<span className="text-xl text-slate-400">分</span></p>
            <p className={`font-black text-lg mb-1 ${passed ? 'text-[#0f6e56]' : 'text-red-500'}`}>{passed ? '恭喜通過！' : '差一點！'}</p>
            <p className="text-slate-500 text-sm font-bold mb-6">{passed ? '已獲得 +100pt，課程認證完成！' : '70 分以上才能取得認證，再試一次！'}</p>
            {passed
              ? <button onClick={onPass} className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black shadow-xl">領取認證 +100pt</button>
              : <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl">重新作答</button>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── AI 配對 Modal ──
function AIMatchModal({ onClose }) {
  const [step, setStep]     = useState(0);
  const [picks, setPicks]   = useState([]);
  const [result, setResult] = useState(null);

  const pick = (i) => {
    const next = [...picks, i];
    if (step < AI_QUESTIONS.length - 1) { setPicks(next); setStep(s => s + 1); }
    else {
      const recs = [
        { animal: next[0] <= 1 ? ANIMALS[0] : ANIMALS[1], match: next[0] <= 1 ? 92 : 85 },
        { animal: ANIMALS[next[1] >= 2 ? 2 : 1],          match: next[1] >= 2 ? 88 : 72 },
        { animal: next[2] === 3 ? ANIMALS[3] : ANIMALS[4], match: next[2] === 3 ? 85 : 78 },
      ];
      setResult(recs); setPicks(next);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-5 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm p-7 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-7 right-7 text-slate-400"><XCircle /></button>

        {!result ? (
          <>
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-[#534ab7] p-2 rounded-xl text-white"><Brain size={20} /></div>
              <div>
                <h3 className="font-black text-slate-800">AI 配對媒合</h3>
                <p className="text-[10px] text-slate-400 font-bold">第 {step + 1} / {AI_QUESTIONS.length} 題</p>
              </div>
            </div>
            <div className="flex gap-1 mb-5">
              {AI_QUESTIONS.map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i < step ? 'bg-[#534ab7]' : i === step ? 'bg-purple-300' : 'bg-slate-100'}`} />)}
            </div>
            <p className="font-black text-slate-800 text-base mb-5">{AI_QUESTIONS[step].q}</p>
            <div className="space-y-2">
              {AI_QUESTIONS[step].opts.map((opt, i) => (
                <button key={i} onClick={() => pick(i)}
                  className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold text-sm text-slate-700 hover:border-[#534ab7]/40 hover:bg-[#534ab7]/5 active:scale-95 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="bg-[#534ab7] p-3 rounded-full w-fit mx-auto mb-3"><Brain size={28} className="text-white" /></div>
              <h3 className="font-black text-slate-800 text-xl">為你推薦的毛夥伴</h3>
            </div>
            <div className="space-y-3">
              {result.map((r, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${i === 0 ? 'border-[#0f6e56]/30 bg-[#0f6e56]/5' : 'border-slate-100 bg-slate-50'}`}>
                  <img src={r.animal.img} className="w-14 h-14 rounded-2xl object-cover" alt={r.animal.name} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-slate-800">{r.animal.name}</p>
                      <span className={`text-sm font-black ${i === 0 ? 'text-[#0f6e56]' : 'text-slate-500'}`}>{r.match}%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold">{r.animal.breed}</p>
                    <div className="h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${i === 0 ? 'bg-[#0f6e56]' : 'bg-slate-400'}`} style={{ width: `${r.match}%` }} />
                    </div>
                  </div>
                  {i === 0 && <Trophy size={16} className="text-orange-500 shrink-0" />}
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full bg-[#534ab7] text-white py-4 rounded-2xl font-black mt-5 shadow-xl">去圖鑑看看牠們</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── 社群貼文卡 ──
function CommunityPostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(p => !p);
    setLikeCount(c => c + (liked ? -1 : 1));
  };

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
      {/* 貼文頭部 */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-lg shadow-sm shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-800 text-sm leading-none">{post.user}</p>
          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{post.tag} · {post.time}</p>
        </div>
        <span className="text-[9px] bg-orange-50 text-orange-500 font-black px-2 py-0.5 rounded-full border border-orange-100">{post.challenge}</span>
      </div>

      {/* 圖片 */}
      <div className="relative w-full h-52 overflow-hidden">
        <img src={post.img} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* 互動列 */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="flex items-center gap-1.5 active:scale-90 transition-transform">
            <Heart size={20} className={`transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            <span className={`text-sm font-black ${liked ? 'text-rose-500' : 'text-slate-500'}`}>{likeCount.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-1.5">
            <MessageCircle size={20} className="text-slate-400" />
            <span className="text-sm font-black text-slate-500">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5">
            <Share2 size={20} className="text-slate-400" />
            <span className="text-sm font-black text-slate-500">{post.shares}</span>
          </button>
        </div>
        <button onClick={() => setSaved(p => !p)} className="active:scale-90 transition-transform">
          <Bookmark size={20} className={saved ? 'fill-violet-500 text-violet-500' : 'text-slate-400'} />
        </button>
      </div>

      {/* 說明文字 */}
      <div className="px-4 pb-4 pt-1">
        <p className="text-sm text-slate-700 leading-snug font-bold">{post.caption}</p>
      </div>
    </div>
  );
}

// ── 定價方案 Modal ──
function PlansModal({ onClose }) {
  const [selected, setSelected] = useState('premium');
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm p-10 text-center shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">方案選擇成功！</h2>
        <p className="text-slate-500 font-bold text-sm mb-8">
          {PLANS.find(p => p.id === selected)?.name} 已啟用<br />享受你的 CreaCert 體驗 🐾
        </p>
        <button onClick={onClose} className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black shadow-xl">開始探索</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col animate-in slide-in-from-bottom">
      <div className="mt-10 bg-white rounded-t-[3rem] flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Crown className="text-yellow-500" size={24} /> 選擇方案</h2>
            <p className="text-xs text-slate-400 font-bold mt-0.5">解鎖全課程與認證考試資格</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full"><XCircle size={20} /></button>
        </div>

        <div className="p-5 space-y-4 pb-10">
          {/* 年費省錢說明 */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            <p className="text-xs font-bold text-amber-800">選擇年票每月只需 <span className="font-black text-amber-600">NT$140</span>，比月票省 30%！</p>
          </div>

          {PLANS.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all active:scale-[0.98] ${
                selected === plan.id ? 'ring-4 ring-violet-400 shadow-xl scale-[1.01]' : 'shadow-sm'
              }`}
            >
              {/* 漸層頭部 */}
              <div className={`bg-gradient-to-r ${plan.color} p-5 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    {plan.badge && (
                      <span className="bg-white/25 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-2 inline-block">
                        🔥 {plan.badge}
                      </span>
                    )}
                    <p className="text-[10px] font-black opacity-70 tracking-widest uppercase">{plan.nameEn}</p>
                    <h3 className="text-xl font-black">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    {plan.price === 0
                      ? <p className="text-3xl font-black">免費</p>
                      : <>
                          <p className="text-3xl font-black leading-none">NT${plan.price.toLocaleString()}</p>
                          <p className="text-sm opacity-70 font-bold">{plan.unit}</p>
                        </>
                    }
                  </div>
                </div>
                {/* 選中標記 */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-all ${selected === plan.id ? 'bg-white' : 'bg-white/20'}`}>
                  {selected === plan.id && <Check size={14} className="text-violet-600 font-black" strokeWidth={3} />}
                </div>
              </div>

              {/* 功能列表 */}
              <div className="bg-white p-4 space-y-1.5 border border-slate-100 rounded-b-[2rem]">
                {plan.features.map((f, i) => (
                  <p key={i} className={`text-xs font-bold ${f.startsWith('✅') ? 'text-slate-700' : 'text-slate-300 line-through'}`}>{f}</p>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setDone(true)}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-700 text-white py-5 rounded-[2rem] font-black text-base shadow-2xl active:scale-95 transition flex items-center justify-center gap-2"
          >
            <Crown size={20} className="text-yellow-300" />
            確認選擇「{PLANS.find(p => p.id === selected)?.name}」
          </button>

          <p className="text-center text-[10px] text-slate-400 font-bold">可隨時取消 · 無隱藏費用 · 支援 Line Pay / 信用卡</p>
        </div>
      </div>
    </div>
  );
}

// ── 主題切換 Modal ──
function ThemePickerModal({ onClose, current, onSelect }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-end animate-in slide-in-from-bottom" onClick={onClose}>
      <div className="bg-white rounded-t-[3rem] w-full p-6 pb-10 space-y-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2"><Palette size={20} className="text-violet-500" /> 選擇介面主題</h3>
            <p className="text-xs text-slate-400 font-bold mt-0.5">依照你的使用習慣選擇風格</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full"><XCircle size={18} /></button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Object.values(THEMES).map(t => (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              className={`rounded-2xl overflow-hidden transition-all active:scale-95 ${current === t.key ? 'ring-4 ring-violet-400 shadow-lg' : 'shadow-sm'}`}
            >
              {/* 預覽色塊 */}
              <div className={`h-16 bg-gradient-to-br ${t.preview} flex items-center justify-center`}>
                <span className="text-2xl">{t.label.split(' ')[0]}</span>
              </div>
              <div className="bg-white p-2 text-center border border-slate-100">
                <p className="text-xs font-black text-slate-800">{t.label}</p>
                <p className="text-[9px] text-slate-400 font-bold">{t.desc}</p>
                {current === t.key && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Check size={10} className="text-violet-500" strokeWidth={3} />
                    <span className="text-[9px] text-violet-500 font-black">使用中</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
          <p className="text-[11px] text-slate-500 font-bold text-center">
            🔥 潮流 → 深色暗夜風，適合年輕用戶<br />
            💼 專業 → 清爽亮色風，適合學習情境<br />
            🌸 關懷 → 溫暖大字風，適合長輩使用
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 今日點餐 Modal ──
function CafeMenuModal({ onClose }) {
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

  const MENU = {
    drinks: [
      { id:'d1', name:'招牌爬蟲拿鐵', sub:'爬蟲拉花・義式濃縮', price:130, emoji:'☕' },
      { id:'d2', name:'蜜袋鼯燕麥奶', sub:'特選燕麥奶・微甜', price:140, emoji:'🥛' },
      { id:'d3', name:'鬃獅蜥美式', sub:'深焙單品・無糖', price:100, emoji:'🖤' },
      { id:'d4', name:'球蟒抹茶拿鐵', sub:'宇治抹茶・牛奶', price:145, emoji:'🍵' },
    ],
    food: [
      { id:'f1', name:'野生感早午餐', sub:'半熟蛋・吐司・沙拉', price:180, emoji:'🍳' },
      { id:'f2', name:'爬蟲形狀鬆餅', sub:'原味・附楓糖', price:150, emoji:'🧇' },
      { id:'f3', name:'輕食沙拉盤', sub:'季節蔬菜・油醋醬', price:120, emoji:'🥗' },
    ],
  };

  const addItem = (item) => setCart(c => {
    const exist = c.find(x => x.id === item.id);
    if (exist) return c.map(x => x.id === item.id ? {...x, qty: x.qty+1} : x);
    return [...c, {...item, qty:1}];
  });

  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);

  if (ordered) return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm p-10 text-center shadow-2xl">
        <div className="text-6xl mb-4">☕</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">點餐成功！</h2>
        <p className="text-slate-500 font-bold text-sm mb-2">預計 10–15 分鐘備餐</p>
        <div className="bg-[#0f6e56]/5 rounded-2xl p-4 border border-[#0f6e56]/10 mb-6">
          <p className="text-sm font-black text-[#0f6e56]">NT${total.toLocaleString()} · {cart.length} 項</p>
          {cart.map(x => <p key={x.id} className="text-xs text-slate-500 font-bold mt-1">{x.emoji} {x.name} ×{x.qty}</p>)}
        </div>
        <button onClick={onClose} className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black shadow-xl">好的！</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col animate-in slide-in-from-bottom">
      <div className="mt-10 bg-white rounded-t-[3rem] flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900">☕ 今日點餐</h2>
            <p className="text-xs text-slate-400 font-bold mt-0.5">到店取餐 · 成大生醫卓群門市</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full"><XCircle size={20} /></button>
        </div>
        <div className="p-5 space-y-5 pb-36">
          {[['飲品', MENU.drinks, '☕'],['輕食', MENU.food, '🍽️']].map(([label, items, icon]) => (
            <section key={label}>
              <h3 className="font-black text-slate-700 text-sm mb-3 flex items-center gap-2">
                <span>{icon}</span> {label}
              </h3>
              <div className="space-y-2">
                {items.map(item => {
                  const inCart = cart.find(x => x.id === item.id);
                  return (
                    <div key={item.id} className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{item.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-black text-slate-700">NT${item.price}</p>
                        <button onClick={() => addItem(item)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-lg transition-all active:scale-90 ${inCart ? 'bg-[#0f6e56] text-white' : 'bg-white border-2 border-slate-200 text-slate-500'}`}>
                          {inCart ? inCart.qty : '+'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-2 border-slate-100 px-5 py-4 z-20">
            <button onClick={() => setOrdered(true)}
              className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-between px-6">
              <span>確認點餐</span>
              <span>NT${total.toLocaleString()} ({cart.reduce((s,x)=>s+x.qty,0)} 項)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

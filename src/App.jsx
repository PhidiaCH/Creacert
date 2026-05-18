import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import {
  Home, BookOpen, Heart, ClipboardList, Sparkles, XCircle, Award,
  Calendar, ChevronLeft, Search, MapPin, QrCode, Coffee, Clock,
  Users, Star, Image as ImageIcon, Bell, ShieldCheck, Camera,
  Video, Activity, Lock, Trophy, Brain, PlusCircle, CheckCircle2,
  Play, PlayCircle, Tv2, Eye, Zap, Crown, Gift, TrendingUp,
  Flame, Target, Share2, ThumbsUp, MessageCircle, Bookmark,
  ChevronRight, Check, Palette, ShoppingCart, Utensils, Minus, Plus,
  LayoutGrid,
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
    care: 4, lifespan: '10–15 年', trialFee: 1200, size: '迷你', careNote: '需高蛋白飲食，夜行性，需滑翔空間', videoQ: 'sugar glider care guide pet',
    expFee: 300, expNote: '30分鐘近距離互動體驗', buyPrice: 8500, buyNote: '蜜袋鼯寄賣 · 需A級認證', certRequired: 'A', courseHint: '爬蟲飼育認證' },
  { id: 2, name: '月亮', type: 'cat', typeName: '貓咪', breed: '黑白貓', status: '可認養', minLevel: 1,
    img: PX(29561296),
    tags: ['#優雅淑女', '#慢熟', '#靜態陪伴'],
    story: '「你好，我是月亮。我不需要太大空間，最適合高壓環境下工作的研究人員。給我一個窗台和溫柔的主人，我就很滿足了。」',
    care: 2, lifespan: '12–16 年', trialFee: 800, size: '中型', careNote: '慢熟型，需安靜環境，適合獨居', videoQ: 'black white cat care tips adopt',
    expFee: 0, expNote: '門市互動免費', certRequired: 'C', courseHint: '貓咪基礎課程' },
  { id: 3, name: '小福', type: 'cat', typeName: '貓咪', breed: '橘貓', status: '試養中', minLevel: 1,
    img: PX(4641440),
    tags: ['#貪吃大叔', '#呼嚕聲超大', '#治癒系'],
    story: '「喵～只要聽到罐頭打開的聲音，我會用光速衝過來。我的呼嚕聲是全店最響的，可以舒緩你的考前焦慮！」',
    care: 2, lifespan: '13–17 年', trialFee: 800, size: '中型', careNote: '親人貪吃，注意飲食控制避免肥胖', videoQ: 'orange tabby cat care daily routine',
    expFee: 0, expNote: '門市互動免費', certRequired: 'C', courseHint: '貓咪基礎課程' },
  { id: 4, name: '豆豆', type: 'dog', typeName: '犬隻', breed: '米格魯', status: '可認養', minLevel: 2,
    img: PX(8706369),
    tags: ['#精力充沛', '#嗅覺達人', '#戶外型'],
    story: '「汪！我有全世界最靈敏的鼻子，可以聞到 300 公尺外的零食。我需要每天散步，適合喜歡戶外活動的人！」',
    care: 3, lifespan: '12–15 年', trialFee: 1000, size: '中型', careNote: '需每日散步 30 分鐘以上，嗅覺敏銳', videoQ: 'beagle dog care training exercise',
    expFee: 0, expNote: '門市互動免費', certRequired: 'B', courseHint: '犬隻基礎服從' },
  { id: 5, name: '小綠', type: 'reptile', typeName: '爬蟲展示', breed: '鬃獅蜥', status: '可預約體驗', minLevel: 2,
    img: PX(6002806),
    tags: ['#冷靜達人', '#親人', '#適合初學者'],
    story: '「嗨，我是小綠。我是爬蟲界最親人的存在，喜歡被人抱著曬太陽。來門市摸摸我，說不定我們就有緣分！」',
    care: 3, lifespan: '10–15 年', trialFee: 900, size: '小型', careNote: '需 UVB 燈源，每日溫度 28–38°C', videoQ: 'bearded dragon care beginner guide UVB',
    expFee: 250, expNote: '45分鐘上手體驗・可拍照', buyPrice: 5800, buyNote: '寄賣合作 · 店家認證', certRequired: 'B', courseHint: '爬蟲飼育認證' },
  { id: 6, name: '小白', type: 'reptile', typeName: '爬蟲展示', breed: '白化球蟒', status: '可預約體驗', minLevel: 3,
    img: PX(29378244),
    tags: ['#稀有品種', '#溫馴', '#長壽夥伴'],
    story: '「我是小白，店長的珍貴夥伴。我可以活到 30 年，是一輩子的承諾。來門市體驗與蛇相處的奇妙感受吧！」',
    care: 4, lifespan: '20–30 年', trialFee: 1500, size: '中型', careNote: '溫馴無毒，需 28°C 恆溫環境，月餵一次', videoQ: 'ball python care guide handling feeding',
    expFee: 350, expNote: '60分鐘 VIP 蛇體驗・含解說', buyPrice: 15000, buyNote: '稀有白化 · 洽詢購買', certRequired: 'A', courseHint: '爬蟲飼育認證' },
];

// ── 10 階等級系統 ──────────────────────────────
const LEVEL_SYSTEM = [
  { lv: 1,  title: '新手探索者', badge: '🐾', eng: 'Explorer',        pts: 0,     color: 'bg-slate-500',                          privileges: ['門市自由參觀', '基礎講座免費'] },
  { lv: 2,  title: '動物愛好者', badge: '🌱', eng: 'Animal Lover',    pts: 200,   color: 'bg-teal-500',                           privileges: ['貓狗門市免費互動', '簽到獎勵×1.5'] },
  { lv: 3,  title: 'C 級學員',  badge: '📖', eng: 'C Learner',       pts: 500,   color: 'bg-cyan-600',                           privileges: ['C 級認證考試資格', '課程早鳥通知'] },
  { lv: 4,  title: 'C 級認證師', badge: '✅', eng: 'C Certified',     pts: 1000,  color: 'bg-[#534ab7]',                          privileges: ['貓咪 14 天試養', '課程 9 折優惠'] },
  { lv: 5,  title: '爬蟲觀察者', badge: '🦎', eng: 'Reptile Watcher', pts: 2000,  color: 'bg-blue-600',                           privileges: ['爬蟲體驗優先預訂', '積分加成 +10%'] },
  { lv: 6,  title: 'B 級認證師', badge: '🎓', eng: 'B Certified',     pts: 3500,  color: 'bg-violet-600',                         privileges: ['犬隻爬蟲全開放', '購買 8.5 折', '積分 +15%'] },
  { lv: 7,  title: '異寵達人',  badge: '⭐', eng: 'Exotic Master',   pts: 5500,  color: 'bg-amber-500',                          privileges: ['蜜袋鼯 VIP 體驗', '活動早鳥票', '積分 +20%'] },
  { lv: 8,  title: 'A 級認證師', badge: '🏆', eng: 'A Certified',     pts: 8000,  color: 'bg-orange-500',                         privileges: ['全物種完全解鎖', '購買 8 折', '金牌導師頭銜'] },
  { lv: 9,  title: 'CreaCert 精英', badge: '👑', eng: 'CC Elite',    pts: 12000, color: 'bg-rose-600',                           privileges: ['贊助商活動邀請', '免費月訂閱 1 次/季', '積分 +25%'] },
  { lv: 10, title: '生態大使',  badge: '🌟', eng: 'Ambassador',      pts: 20000, color: 'bg-gradient-to-r from-amber-500 to-rose-500', privileges: ['終身會員優惠', '聯名商品設計', 'VIP 限定活動'] },
];
const getUserLevel  = (pts) => LEVEL_SYSTEM.reduce((acc, l) => pts >= l.pts ? l : acc, LEVEL_SYSTEM[0]);
const getNextLevel  = (pts) => LEVEL_SYSTEM.find(l => l.pts > pts) || null;
// kept for legacy refs
const CERT_LEVELS = LEVEL_SYSTEM.slice(2, 5).map(l => ({
  level: l.badge, title: l.title, desc: '', color: l.color + ' text-white', privileges: l.privileges,
}));

// ── 創辦人手冊資料 ─────────────────────────────
const FOUNDER_SOP = [
  { phase: 1, title: '法規申請', emoji: '📋', weeks: '4–6 週', color: 'bg-blue-600',
    steps: [
      { id:'f1', title:'公司 / 商業登記',     note:'台南市政府經建局，約1-2週，費用NT$1,000左右' },
      { id:'f2', title:'食品業者登錄',        note:'衛生局線上申請，咖啡輕食必備，約3個工作天' },
      { id:'f3', title:'動物展演許可申請',    note:'台南市農業局，展演前1個月申請，每年更新一次' },
      { id:'f4', title:'爬蟲展示物種聲明',    note:'申請時需列明展示物種清單，非保育類即可' },
      { id:'f5', title:'消防 + 建築執照確認', note:'確認商業用途許可，28坪需備足消防設備' },
    ]
  },
  { phase: 2, title: '空間設置', emoji: '🏗️', weeks: '4–8 週', color: 'bg-amber-500',
    steps: [
      { id:'f6', title:'動物展示區隔離設計',  note:'各物種獨立溫控空間，防止交叉感染，建議找寵物店裝潢師' },
      { id:'f7', title:'咖啡設備採購安裝',    note:'半自動咖啡機NT$15-40萬，磨豆機NT$3-8萬，建議La Marzocco / Rancilio' },
      { id:'f8', title:'環境控制系統',        note:'爬蟲區26-32°C，蜜袋鼯濕度60-70%，投資溫控設備約NT$5-10萬' },
      { id:'f9', title:'監控 + POS 系統',    note:'24H動物監控，整合CreaCert APP點餐，建議Ipad POS' },
    ]
  },
  { phase: 3, title: '動物引入', emoji: '🦎', weeks: '2–4 週', color: 'bg-[#0f6e56]',
    steps: [
      { id:'f10', title:'爬蟲供應商洽談',     note:'對方需持特定寵物業許可，CreaCert抽寄賣佣金20-25%' },
      { id:'f11', title:'貓咪/犬隻合作協議', note:'與在地認養中心合作，正面形象 + 節省進貨成本' },
      { id:'f12', title:'動物健康建檔',       note:'入店前獸醫評估，APP動物圖鑑頁面建立，含故事/影片' },
    ]
  },
  { phase: 4, title: 'APP + 系統上線', emoji: '📱', weeks: '1–2 週', color: 'bg-violet-600',
    steps: [
      { id:'f13', title:'CreaCert 後台開通',  note:'聯絡總部設定門市帳號，商品菜單/動物/課程全部上架' },
      { id:'f14', title:'會員初始設定',       note:'設定歡迎積分100pt，邀請第一批會員下載APP' },
      { id:'f15', title:'試營運壓力測試',     note:'邀請50位親友先行體驗，蒐集問題後才正式開幕' },
    ]
  },
];

const FRANCHISE_TIERS = [
  { name: '輕型加盟', badge: 'Lite', color: 'bg-slate-600',
    fee: 380000, deposit: 50000, royaltyPct: 6, monthly: 12000,
    area: '15–25 坪', animals: '貓犬為主',  training: '3 週課程',
    includes: ['品牌授權使用', 'APP系統1年授權', '教育課程素材包', '開幕行銷支援'] },
  { name: '標準加盟', badge: 'Standard', color: 'bg-[#0f6e56]',
    fee: 680000, deposit: 100000, royaltyPct: 5, monthly: 18000,
    area: '25–40 坪', animals: '貓犬 + 爬蟲', training: '4週課程 + 2週實習',
    includes: ['品牌授權使用', 'APP系統2年授權', '完整教材 + 師資', '爬蟲供應商媒合', '季度稽核輔導', '開幕PR行銷包'],
    recommended: true },
  { name: '旗艦加盟', badge: 'Flagship', color: 'bg-gradient-to-r from-amber-500 to-rose-500',
    fee: 1200000, deposit: 200000, royaltyPct: 4, monthly: 28000,
    area: '40 坪以上', animals: '全物種 + 戶外體驗', training: '6週課程 + 全程陪跑1個月',
    includes: ['品牌授權使用', 'APP系統3年授權', '設計裝潢顧問', '獨家物種供應優先', '月度策略會議', '全媒體行銷套組'] },
];

const TRAINING_WEEKS = [
  { week: 1, icon: '🦎', title: '動物照護基礎',
    topics: ['各物種基本飼育需求', '健康指標辨識 SOP', '緊急狀況處理流程', '動物壓力信號判讀'] },
  { week: 2, icon: '🤝', title: '顧客體驗管理',
    topics: ['互動安全引導話術', '攝影協助標準服務', '體驗預約接待SOP', '異常客訴即時處理'] },
  { week: 3, icon: '☕', title: '咖啡 + 食品安全',
    topics: ['基礎拿鐵拉花練習', '飲品配方標準化', '食品安全衛生法規', 'POS 系統操作'] },
  { week: 4, icon: '📱', title: 'APP + 財務管理',
    topics: ['CreaCert 後台操作', '積分/課程/會員管理', '日結帳務 + 庫存', '每月KPI追蹤回報'] },
];

const PROFIT_STRATEGIES = [
  { rank: 1, icon: '🦎', tag: '立即可做', tagColor: 'bg-green-500',
    title: '爬蟲體驗套餐化',
    desc: '單次NT$350 → 「蛇蜥雙體驗」NT$580，客單提升 65%',
    detail: '將兩隻爬蟲合併為套餐，成本幾乎不變，但客人感覺更值回票價。搭配拍照服務（IG打卡）讓分享率提升。',
    margin: '毛利約 85%' },
  { rank: 2, icon: '👑', tag: '高槓桿', tagColor: 'bg-violet-500',
    title: '訂閱制 PREMIUM 擴大',
    desc: 'NT$199/月，每位訂戶純利NT$120，目標1,000位 = 每月NT$12萬被動收入',
    detail: '訂閱者平均消費是一般用戶的2.3倍（體驗、商城、課程），帶動所有收入線。先對已到店顧客推銷轉換。',
    margin: '月收穩定、累積成長' },
  { rank: 3, icon: '🏢', tag: '開發中', tagColor: 'bg-blue-500',
    title: '企業包場體驗',
    desc: '公司員旅 / 團建 2小時包場 NT$8,000–15,000，填補平日冷場時段',
    detail: '台南科學園區 + 成大校區附近企業多，用LINE@主動接觸HR。提供「動物互動 + 輕食套餐」的整合方案，毛利高。',
    margin: '毛利約 75%' },
  { rank: 4, icon: '📱', tag: '高潛力', tagColor: 'bg-amber-500',
    title: '線上課程延伸銷售',
    desc: '實體課程錄製成線上版 NT$299/課，邊際成本近零',
    detail: '全台有興趣飼育異寵的人遠超台南，線上課程打破地域限制。單次錄製，永久銷售，可設計「課程包」NT$699。',
    margin: '毛利約 95%' },
  { rank: 5, icon: '🤝', tag: '需流量先', tagColor: 'bg-rose-500',
    title: '廠商贊助 + 冠名合作',
    desc: '爬蟲食品 / 設備品牌贊助「月份明星動物」NT$15,000–30,000/月',
    detail: '達到 App 3,000+ 用戶、IG 5,000+ 粉絲後才有議價空間。先聚焦在台灣爬蟲飼育品牌（如 ReptiZoo 等）。',
    margin: '純被動收入' },
  { rank: 6, icon: '🌐', tag: '長期最大', tagColor: 'bg-[#0f6e56]',
    title: '加盟授權金 × 規模化',
    desc: '每開1家加盟店 NT$38–120萬 + 每月權利金 NT$12,000–28,000',
    detail: '開第2家加盟店前，先確保本店月淨利穩定達到NT$8萬以上。建立完整SOP手冊、品牌規範，讓加盟主照著做。目標3年內全台5家。',
    margin: '規模後最大化' },
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

// 積分賺取規則 (1pt ≈ NT$0.05)
const POINTS_RULES = [
  { action: '門市消費 NT$10',  pts: 1,   icon: '☕', note: '點餐/商品均適用' },
  { action: '完成課程測驗',    pts: 100, icon: '📚', note: '每堂課一次' },
  { action: '每日簽到打卡',    pts: 5,   icon: '📍', note: '連續7天額外+50pt' },
  { action: '分享貼文到社群',  pts: 10,  icon: '📣', note: '每日上限30pt' },
  { action: '到店體驗動物',    pts: 30,  icon: '🦎', note: '每次體驗後獲得' },
  { action: 'PREMIUM 訂閱',   pts: 200, icon: '👑', note: '每月自動入帳' },
];

// 積分兌換表
const POINTS_REDEEM = [
  { name: '飲品折抵 NT$25',    pts: 500,  icon: '☕', tag: '最熱門' },
  { name: '飲品折抵 NT$50',    pts: 1000, icon: '🥤', tag: '' },
  { name: '免費拿鐵一杯',      pts: 2000, icon: '🎁', tag: '值回票價' },
  { name: '爬蟲體驗升級',      pts: 1500, icon: '🦎', tag: '體驗加值' },
  { name: '進階課程折扣券',    pts: 3000, icon: '📚', tag: 'NT$100 折抵' },
  { name: '爬蟲購買折抵',      pts: 5000, icon: '🐍', tag: 'NT$250 折抵' },
];

const POINTS_HISTORY = [
  { id: 1, desc: '完成「貓咪營養學」測驗', pts: 100,  date: '05/12', type: 'earn' },
  { id: 2, desc: '門市消費 NT$200',        pts: 20,   date: '05/13', type: 'earn' },
  { id: 3, desc: '完成「行為解讀」課程',   pts: 100,  date: '05/11', type: 'earn' },
  { id: 4, desc: '社群分享打卡',           pts: 10,   date: '05/10', type: 'earn' },
  { id: 5, desc: '兌換：飲品折抵 NT$25',   pts: -500, date: '05/08', type: 'spend' },
  { id: 6, desc: '到店爬蟲體驗',           pts: 30,   date: '05/07', type: 'earn' },
  { id: 7, desc: 'PREMIUM 訂閱月點',       pts: 200,  date: '05/01', type: 'earn' },
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
// 點餐菜單資料
// ─────────────────────────────────────────────
const MENU_ITEMS = [
  // 飲品
  { id:'d1', cat:'飲品', name:'招牌爬蟲拿鐵',   desc:'義式濃縮＋燕麥奶＋爬蟲拉花', price:130, emoji:'☕', tag:'招牌', tagColor:'bg-orange-100 text-orange-600', popular:true  },
  { id:'d2', cat:'飲品', name:'蜜袋鼯燕麥拿鐵', desc:'特選燕麥奶・微甜',            price:140, emoji:'🥛', tag:'',   tagColor:'', popular:false },
  { id:'d3', cat:'飲品', name:'鬃獅蜥美式',     desc:'深焙單品・無糖',              price:100, emoji:'🖤', tag:'',   tagColor:'', popular:false },
  { id:'d4', cat:'飲品', name:'球蟒抹茶拿鐵',   desc:'宇治抹茶＋牛奶',             price:145, emoji:'🍵', tag:'新品', tagColor:'bg-emerald-100 text-emerald-600', popular:false },
  { id:'d5', cat:'飲品', name:'爬蟲氣泡水',     desc:'天然果汁＋蘇打・無糖',        price:80,  emoji:'💚', tag:'',   tagColor:'', popular:false },
  { id:'d6', cat:'飲品', name:'手沖黑咖啡',     desc:'單品莊園豆・每日現磨',        price:120, emoji:'☕', tag:'',   tagColor:'', popular:false },
  // 輕食
  { id:'f1', cat:'輕食', name:'野生感早午餐',   desc:'半熟蛋・全麥吐司・生菜沙拉', price:180, emoji:'🍳', tag:'熱門', tagColor:'bg-red-100 text-red-600',    popular:true  },
  { id:'f2', cat:'輕食', name:'爬蟲形狀鬆餅',   desc:'比利時原味・附楓糖漿',        price:150, emoji:'🧇', tag:'',   tagColor:'', popular:false },
  { id:'f3', cat:'輕食', name:'凱薩沙拉盤',     desc:'季節蔬菜・油醋醬・帕馬森',    price:120, emoji:'🥗', tag:'',   tagColor:'', popular:false },
  { id:'f4', cat:'輕食', name:'蜜袋鼯三明治',   desc:'火雞肉・起司・全麥麵包',      price:160, emoji:'🥪', tag:'',   tagColor:'', popular:false },
  // 甜點
  { id:'s1', cat:'甜點', name:'爬蟲造型馬卡龍', desc:'4顆・抹茶＋草莓口味',         price:160, emoji:'🍬', tag:'限量', tagColor:'bg-purple-100 text-purple-600', popular:true  },
  { id:'s2', cat:'甜點', name:'手作焦糖布丁',   desc:'每日新鮮製作',                price:80,  emoji:'🍮', tag:'',   tagColor:'', popular:false },
  { id:'s3', cat:'甜點', name:'提拉米蘇',       desc:'義式正宗食譜',                price:120, emoji:'🍰', tag:'',   tagColor:'', popular:false },
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
  // APP 數位指標（廠商贊助 / 以量制價 的談判籌碼）
  appStats: {
    totalUsers:       847,
    activeMonthly:    312,
    subscribers:       89,   // 付費 PREMIUM/PRO
    subscribeRevenue: 16700, // 89人 × 平均 NT$188
    appOrders:        203,   // 本月 APP 點餐筆數
    appOrderRevenue:  18270, // 203筆 × 平均 NT$90
    pointsIssued:     84200, // 本月積分發出
    pointsRedeemed:   31400, // 本月積分兌換 (折抵金額)
    sponsorLeads:       3,   // 廠商詢問合作數
    weeklyGrowth:      '+8.3%', // 週新增用戶
  },
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
  const [showFounderPlaybook, setShowFounderPlaybook] = useState(false);
  const [showFounderPin, setShowFounderPin]           = useState(false);
  const [showStoreMap, setShowStoreMap]               = useState(false);
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem('cc_theme') || 'pro');
  const theme = THEMES[themeKey] || THEMES.pro;
  const [logoTaps, setLogoTaps] = useState(0);
  const [streak, setStreak] = useState(7);
  const tapTimer = useRef(null);
  const [points, setPoints] = useState(1280);
  const addPoints = (n) => setPoints(p => p + n);

  // 購物車（全域，讓 badge 跨頁顯示）
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);
  const addToCart = (item) => setCartItems(prev => {
    const ex = prev.find(x => x.id === item.id);
    if (ex) return prev.map(x => x.id === item.id ? {...x, qty: x.qty + 1} : x);
    return [...prev, {...item, qty: 1}];
  });
  const removeFromCart = (id) => setCartItems(prev => {
    const ex = prev.find(x => x.id === id);
    if (!ex || ex.qty <= 1) return prev.filter(x => x.id !== id);
    return prev.map(x => x.id === id ? {...x, qty: x.qty - 1} : x);
  });
  const clearCart = () => setCartItems([]);

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
                <Award size={16} className="text-orange-300" /> Lv.{getUserLevel(points).lv} {getUserLevel(points).badge}
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
          {tab === 'home'      && <PassportScreen setShowCertInfo={setShowCertInfo} setShowPortrait={setShowPortrait} addPoints={addPoints} setShowPlans={setShowPlans} streak={streak} points={points} setShowFounderPlaybook={setShowFounderPlaybook} setShowFounderPin={setShowFounderPin} setShowStoreMap={setShowStoreMap} setTab={setTab} />}
          {tab === 'animals'   && <AnimalsScreen />}
          {tab === 'order'     && <OrderScreen cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} addPoints={addPoints} />}
          {tab === 'courses'   && <CoursesScreen addPoints={addPoints} points={points} />}
          {tab === 'shop'      && <ShopScreen addPoints={addPoints} />}
        </div>

        {/* 底部 Tab Bar — 依收入來源排列 */}
        <div className={`shrink-0 w-full px-2 pt-2 pb-6 flex justify-around items-end z-40 ${theme.tabBg}`}>
          {/* 首頁 */}
          <TabBtn icon={<Home />}     label="首頁" active={tab==='home'}    onClick={() => setTab('home')}    theme={theme} />
          {/* 圖鑑（爬蟲銷售 27%） */}
          <TabBtn icon={<Heart />}    label="圖鑑" active={tab==='animals'} onClick={() => setTab('animals')} theme={theme} />
          {/* 中央點餐（最大收入 53%） */}
          <button onClick={() => setTab('order')} className="flex flex-col items-center -mt-5 relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${tab === 'order' ? 'bg-orange-500 ring-4 ring-orange-200' : 'bg-gradient-to-br from-orange-400 to-rose-500'}`}>
              <Utensils size={28} className="text-white" strokeWidth={2.5} />
            </div>
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">{cartCount}</div>
            )}
            <span className={`text-[10px] mt-1 font-black ${tab === 'order' ? theme.tabActive : theme.tabInactive}`}>點餐</span>
          </button>
          {/* 商城（寵物食品 11%） */}
          <TabBtn icon={<ShoppingCart />} label="商城" active={tab==='shop'}    onClick={() => setTab('shop')}    theme={theme} />
          {/* 課程（認證 9%） */}
          <TabBtn icon={<BookOpen />}     label="課程" active={tab==='courses'} onClick={() => setTab('courses')} theme={theme} />
        </div>

        {showCertInfo    && <CertificationModal points={points} onClose={() => setShowCertInfo(false)} />}
        {showPortrait    && <PortraitModal      onClose={() => setShowPortrait(false)} />}
        {showInvestor        && <InvestorDashboard  onClose={() => setShowInvestor(false)} />}
        {showFounderPin      && <FounderPinModal     onClose={() => setShowFounderPin(false)} onUnlock={() => { setShowFounderPin(false); setShowFounderPlaybook(true); }} />}
        {showFounderPlaybook && <FounderPlaybook    onClose={() => setShowFounderPlaybook(false)} />}
        {showPlans       && <PlansModal         onClose={() => setShowPlans(false)} />}
        {showThemePicker && <ThemePickerModal   onClose={() => setShowThemePicker(false)} current={themeKey} onSelect={switchTheme} />}
        {showStoreMap    && <StoreMapModal      onClose={() => setShowStoreMap(false)} setTab={setTab} />}
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
function PassportScreen({ setShowCertInfo, setShowPortrait, addPoints, setShowPlans, streak, points = 0, setShowFounderPlaybook, setShowFounderPin, setShowStoreMap, setTab }) {
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
          {[['已修課程','7'],['試養次數','3'],['累積積分', points.toLocaleString()]].map(([k,v]) => (
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
      <section className="grid grid-cols-3 gap-3 pb-2">
        <button onClick={handleCheckIn} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:border-[#0f6e56] transition-all group">
          <div className="bg-[#0f6e56]/5 p-3 rounded-2xl text-[#0f6e56] group-hover:bg-[#0f6e56] group-hover:text-white transition-colors"><QrCode size={24} /></div>
          <p className="text-xs font-black text-slate-800 text-center leading-tight">門市<br/>掃碼打卡</p>
        </button>
        <button onClick={() => setShowCafeMenu(true)} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:border-orange-500 transition-all group">
          <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Coffee size={24} /></div>
          <p className="text-xs font-black text-slate-800 text-center leading-tight">今日<br/>點餐</p>
        </button>
        <button onClick={() => setShowStoreMap && setShowStoreMap(true)} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:border-[#534ab7] transition-all group">
          <div className="bg-[#534ab7]/5 p-3 rounded-2xl text-[#534ab7] group-hover:bg-[#534ab7] group-hover:text-white transition-colors"><LayoutGrid size={24} /></div>
          <p className="text-xs font-black text-slate-800 text-center leading-tight">門市<br/>場域地圖</p>
        </button>
      </section>

      {/* 創辦人工具列 */}
      <button
        onClick={() => setShowFounderPin(true)}
        className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-3xl p-4 flex items-center justify-between shadow-lg active:scale-95 transition mb-2"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
            <ClipboardList size={20} className="text-amber-300" />
          </div>
          <div className="text-left">
            <p className="font-black text-sm">創辦人手冊</p>
            <p className="text-[10px] opacity-60 font-bold">開店SOP · 加盟系統 · 獲利策略</p>
          </div>
        </div>
        <ChevronRight size={18} className="opacity-40" />
      </button>

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
        {/* ── 金流漏斗 CTA ── */}
        <div className="space-y-3 pb-4">

          {/* 步驟 1：體驗預約（立即收入） */}
          <div className="bg-gradient-to-r from-[#0f6e56] to-teal-500 rounded-3xl p-4 text-white shadow-xl">
            <p className="text-[10px] font-black opacity-70 tracking-widest uppercase mb-1">Step 1 · 先來認識牠</p>
            {selected.expFee > 0 ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-base leading-snug">{selected.expNote}</p>
                  <p className="text-teal-100 text-xs font-bold mt-0.5">到店體驗 · 體驗費可折抵購買</p>
                </div>
                <button onClick={() => alert(`預約「${selected.name}」體驗\n\n費用：NT$${selected.expFee}\n內容：${selected.expNote}\n\n📍 成大生醫卓群門市\n✅ 體驗費可折抵購買金額`)}
                  className="bg-white text-[#0f6e56] font-black text-sm px-4 py-2.5 rounded-2xl active:scale-95 transition shadow-md shrink-0 ml-3">
                  預約 NT${selected.expFee}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-base">{selected.expNote}</p>
                  <p className="text-teal-100 text-xs font-bold mt-0.5">進門消費咖啡即可互動</p>
                </div>
                <button onClick={() => alert('歡迎到店互動！\n點一杯咖啡就能與牠相處 ☕')}
                  className="bg-white text-[#0f6e56] font-black text-sm px-4 py-2.5 rounded-2xl active:scale-95 transition shadow-md shrink-0 ml-3">
                  到店互動
                </button>
              </div>
            )}
          </div>

          {/* 步驟 2：認證要求（引流課程） */}
          {selected.certRequired && (
            <div className={`rounded-3xl p-4 border-2 flex items-center gap-3 ${selected.minLevel <= 3 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shrink-0 ${
                selected.certRequired === 'A' ? 'bg-orange-500' :
                selected.certRequired === 'B' ? 'bg-[#534ab7]' : 'bg-slate-500'}`}>
                {selected.certRequired}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-800 text-sm">{selected.certRequired} 級認證才能帶牠回家</p>
                <p className="text-xs text-slate-500 font-bold mt-0.5">先修「{selected.courseHint}」解鎖資格</p>
              </div>
              <button onClick={() => alert(`去修課吧！\n\n課程：${selected.courseHint}\n通過後即可申請${selected.certRequired}級認證\n→ 切換到「課程」Tab 開始學習`)}
                className="bg-[#534ab7] text-white font-black text-xs px-3 py-2 rounded-xl active:scale-95 transition shrink-0 shadow-md">
                去修課 →
              </button>
            </div>
          )}

          {/* 步驟 3：試養 / 購買（大收入） */}
          {selected.buyPrice ? (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4">
              <p className="text-[10px] font-black text-amber-600 tracking-widest uppercase mb-2">Step 3 · 帶牠回家</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 font-bold">{selected.buyNote}</p>
                  <p className="text-2xl font-black text-amber-800">NT${selected.buyPrice.toLocaleString()}</p>
                  {selected.expFee > 0 && <p className="text-[10px] text-amber-500 font-bold">體驗費 NT${selected.expFee} 可折抵</p>}
                </div>
                <button onClick={() => alert(`洽詢購買「${selected.name}」\n\n💰 售價：NT$${selected.buyPrice.toLocaleString()}\n${selected.expFee > 0 ? `💡 體驗費 NT$${selected.expFee} 可折抵\n` : ''}📋 ${selected.buyNote}\n\n請至門市或 LINE 洽詢`)}
                  className="bg-amber-500 text-white px-5 py-3 rounded-2xl font-black text-sm active:scale-95 transition shadow-md">
                  洽詢購買
                </button>
              </div>
            </div>
          ) : (
            <button className={`w-full py-4 rounded-3xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-center gap-2 ${
              selected.status === '可認養' ? 'bg-[#0f6e56] text-white' : 'bg-slate-100 text-slate-400'}`}>
              <ShieldCheck size={20} />
              {selected.status === '可認養' ? `申請試養 NT$${selected.trialFee} / 14天` : selected.status}
            </button>
          )}

          <button className="w-full bg-white text-[#534ab7] border-2 border-[#534ab7]/20 py-3.5 rounded-3xl font-black flex items-center justify-center gap-2 text-sm">
            <MapPin size={16} /> 查看門市位置
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
              <div className="flex gap-0.5 justify-center mt-1.5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= a.care ? 'bg-orange-400' : 'bg-slate-200'}`} />
                ))}
              </div>
              {/* 體驗費 / 金流標籤 */}
              <div className="mt-2">
                {a.expFee > 0 ? (
                  <span className="inline-block bg-[#0f6e56] text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                    體驗 NT${a.expFee}
                  </span>
                ) : (
                  <span className="inline-block bg-slate-100 text-slate-500 text-[9px] font-black px-2.5 py-1 rounded-full">
                    免費互動
                  </span>
                )}
                {a.buyPrice && (
                  <span className="inline-block ml-1 bg-amber-50 text-amber-700 text-[9px] font-black px-2 py-1 rounded-full border border-amber-200">
                    可購買
                  </span>
                )}
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
function CoursesScreen({ addPoints, points = 0 }) {
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

      {/* 10階等級路徑圖（橫向可滑） */}
      <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black text-slate-400 tracking-widest uppercase">成長等級路徑</p>
          <span className="text-[10px] font-black text-[#0f6e56]">Lv.{getUserLevel(points).lv} / 10 {getUserLevel(points).badge}</span>
        </div>
        {/* 橫向捲動等級列 */}
        <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide pb-2">
          {LEVEL_SYSTEM.map((l, i) => {
            const isUnlocked = points >= l.pts;
            const isCur      = getUserLevel(points).lv === l.lv;
            return (
              <React.Fragment key={l.lv}>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center shadow text-base leading-none relative transition
                    ${isCur ? l.color + ' text-white ring-2 ring-offset-1 ring-[#0f6e56] scale-110' : isUnlocked ? l.color + ' text-white opacity-80' : 'bg-slate-100 text-slate-300'}`}>
                    {l.badge}
                    {isCur && <div className="absolute -top-2.5 text-[8px] font-black text-[#0f6e56] whitespace-nowrap">▼ 我</div>}
                    {isUnlocked && !isCur && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle2 size={8} className="text-white" /></div>}
                  </div>
                  <p className="text-[8px] font-black text-slate-600 w-11 text-center leading-tight">{l.title}</p>
                  <p className="text-[7px] text-slate-400 font-bold">{l.pts >= 1000 ? (l.pts/1000)+'k' : l.pts}pt</p>
                </div>
                {i < LEVEL_SYSTEM.length - 1 && (
                  <div className={`w-4 h-1 rounded-full shrink-0 mb-7 ${isUnlocked && points >= LEVEL_SYSTEM[i+1]?.pts ? 'bg-[#0f6e56]' : isUnlocked ? 'bg-gradient-to-r from-[#0f6e56] to-slate-200' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {/* 下一等級提示 */}
        {getNextLevel(points) && (
          <div className="mt-3 bg-[#0f6e56]/5 rounded-2xl p-3 border border-[#0f6e56]/20 flex items-center gap-2">
            <Trophy size={15} className="text-[#0f6e56] shrink-0" />
            <p className="text-[10px] font-bold text-[#0f6e56]">
              再累積 <span className="font-black">{(getNextLevel(points).pts - points).toLocaleString()} pt</span> 升到 <span className="font-black">{getNextLevel(points).badge} {getNextLevel(points).title}</span>，解鎖 {getNextLevel(points).privileges[0]}！
            </p>
          </div>
        )}
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
// Tab — 商城（寵物食品 + 爬蟲用品）
// ─────────────────────────────────────────────
function ShopScreen({ addPoints }) {
  const [cat, setCat]         = useState('全部');
  const [cart, setCart]       = useState([]);
  const [showPay, setShowPay] = useState(false);
  const [showLP, setShowLP]   = useState(false);
  const [ordered, setOrdered] = useState(false);

  const SHOP_CATS = ['全部', '爬蟲用品', '小動物', '貓狗', '保健品'];
  const SHOP_ITEMS = [
    { id:'p1', cat:'爬蟲用品', name:'爬蟲 UVB 全光譜燈',     brand:'ZooMed Pro',      price:890,  original:1200, emoji:'💡', tag:'A級推薦', tagColor:'bg-orange-100 text-orange-600' },
    { id:'p2', cat:'爬蟲用品', name:'球蟒恆溫加熱墊',        brand:'ReptileHeat',     price:680,  original:850,  emoji:'🌡️', tag:'必備',   tagColor:'bg-slate-100 text-slate-600' },
    { id:'p3', cat:'爬蟲用品', name:'爬蟲飼養箱（60cm）',    brand:'ExoTerra',        price:1580, original:2000, emoji:'🏠', tag:'套組省錢', tagColor:'bg-blue-100 text-blue-600' },
    { id:'p4', cat:'小動物',   name:'蜜袋鼯高蛋白飼料',      brand:'GlideNutrition',  price:399,  original:499,  emoji:'🦘', tag:'熱銷No.1', tagColor:'bg-rose-100 text-rose-600' },
    { id:'p5', cat:'小動物',   name:'蜜袋鼯滑翔籠（大型）',  brand:'GliderHome',      price:1280, original:1580, emoji:'🏡', tag:'',        tagColor:'' },
    { id:'p6', cat:'貓狗',     name:'犬隻訓練零食包',        brand:'TrainSnack',      price:199,  original:250,  emoji:'🐶', tag:'認證推薦', tagColor:'bg-[#0f6e56]/10 text-[#0f6e56]' },
    { id:'p7', cat:'貓狗',     name:'貓咪益生菌凍乾',        brand:'PetPro 台灣',     price:299,  original:350,  emoji:'🐱', tag:'新品',    tagColor:'bg-purple-100 text-purple-600' },
    { id:'p8', cat:'保健品',   name:'全物種維生素滴劑',      brand:'NutriAll',        price:249,  original:320,  emoji:'💊', tag:'獸醫推薦', tagColor:'bg-blue-100 text-blue-600' },
    { id:'p9', cat:'保健品',   name:'爬蟲鈣粉補充劑',        brand:'Rep-Cal',         price:180,  original:220,  emoji:'🦴', tag:'',        tagColor:'' },
  ];

  const filtered = cat === '全部' ? SHOP_ITEMS : SHOP_ITEMS.filter(x => x.cat === cat);
  const addItem = (item) => setCart(c => {
    const ex = c.find(x => x.id === item.id);
    return ex ? c.map(x => x.id === item.id ? {...x, qty: x.qty+1} : x) : [...c, {...item, qty:1}];
  });
  const totalItems = cart.reduce((s,x) => s+x.qty, 0);
  const totalPrice = cart.reduce((s,x) => s+x.price*x.qty, 0);

  if (ordered) return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
      <div className="text-7xl mb-5">🎉</div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">訂單成立！</h2>
      <p className="text-slate-500 font-bold text-sm mb-1">每週三到貨，到店取貨免運費</p>
      <p className="text-slate-400 text-xs mb-8">取貨通知將發送到您的 LINE</p>
      <div className="bg-[#0f6e56]/5 rounded-3xl p-5 border border-[#0f6e56]/10 mb-6 w-full max-w-xs">
        <p className="text-sm font-black text-[#0f6e56]">NT${totalPrice.toLocaleString()} · {totalItems} 件</p>
        <p className="text-xs text-slate-400 font-bold mt-1">已獲得 +{Math.floor(totalPrice / 10)} pt</p>
      </div>
      <button onClick={() => { setOrdered(false); setCart([]); }} className="bg-[#0f6e56] text-white px-10 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition">繼續選購</button>
    </div>
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in">
      {/* 頁首 */}
      <div className="bg-gradient-to-r from-[#0f6e56] to-teal-500 text-white px-5 pt-5 pb-6 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <ShoppingCart size={22} /> 寵物商城
            </h2>
            <p className="text-teal-100 text-xs font-bold mt-0.5">合作品牌認證 · 週三到店取貨</p>
          </div>
          <div className="bg-white/15 rounded-2xl px-3 py-2 text-right border border-white/20">
            <p className="text-[10px] opacity-70 font-bold">免運費</p>
            <p className="text-sm font-black">到店取貨</p>
          </div>
        </div>
        {/* 到店取貨優惠橫幅 */}
        <div className="bg-white/15 rounded-2xl p-3 flex items-center gap-3 border border-white/20">
          <span className="text-2xl">🐾</span>
          <div className="flex-1">
            <p className="font-black text-sm">合作品牌・預購到店取</p>
            <p className="text-teal-100 text-[10px] font-bold">省快遞費 · 現貨週三補貨 · PREMIUM 9折</p>
          </div>
        </div>
      </div>

      {/* 分類 */}
      <div className="bg-white px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 border-b border-slate-100">
        {SHOP_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-black transition-all ${cat === c ? 'bg-[#0f6e56] text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* 商品列表 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 pb-28 space-y-3">
        {filtered.map(item => {
          const discount = Math.round((1 - item.price / item.original) * 100);
          const inCart = cart.find(x => x.id === item.id);
          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-3xl shrink-0 border border-teal-100">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-black text-slate-800 text-sm leading-snug">{item.name}</p>
                  {item.tag && <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${item.tagColor}`}>{item.tag}</span>}
                </div>
                <p className="text-[10px] text-slate-400 font-bold">{item.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#0f6e56] font-black">NT${item.price}</span>
                  <span className="text-slate-300 text-[10px] line-through">NT${item.original}</span>
                  <span className="text-[9px] bg-rose-50 text-rose-500 font-black px-1 rounded">-{discount}%</span>
                </div>
              </div>
              <div className="shrink-0">
                {inCart ? (
                  <div className="bg-[#0f6e56] text-white rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <button onClick={() => setCart(c => c.map(x => x.id === item.id ? {...x, qty: Math.max(0, x.qty-1)} : x).filter(x => x.qty > 0))} className="text-lg font-black leading-none">−</button>
                    <span className="font-black text-sm w-4 text-center">{inCart.qty}</span>
                    <button onClick={() => addItem(item)} className="text-lg font-black leading-none">+</button>
                  </div>
                ) : (
                  <button onClick={() => addItem(item)} className="bg-[#0f6e56] text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black active:scale-90 transition shadow-md">+</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 浮動結帳欄 */}
      {totalItems > 0 && (
        <div className="absolute bottom-20 left-0 right-0 px-4 z-30">
          <button onClick={() => setShowPay(true)}
            className="w-full bg-gradient-to-r from-[#0f6e56] to-teal-500 text-white py-4 rounded-2xl font-black text-base shadow-2xl active:scale-[0.98] transition flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="bg-white/25 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">{totalItems}</div>
              <span>前往付款</span>
            </div>
            <span>NT${totalPrice.toLocaleString()} →</span>
          </button>
        </div>
      )}

      {/* 付款方式選擇 */}
      {showPay && !showLP && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-end animate-in fade-in">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[3rem] p-6 pb-10 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">選擇付款方式</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">共 NT${totalPrice.toLocaleString()} · {totalItems} 件</p>
              </div>
              <button onClick={() => setShowPay(false)} className="text-slate-400"><XCircle size={22} /></button>
            </div>
            <button onClick={() => { setShowPay(false); setShowLP(true); }}
              className="w-full bg-[#00B900] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition text-base">
              <div className="bg-white rounded-lg px-2 py-0.5"><span className="text-[#00B900] font-black text-xs">LINE</span></div>
              Pay · 行動支付
            </button>
            {[['💳','信用卡 / 電子票證'],['💵','到店取貨付現']].map(([icon, label]) => (
              <button key={label} onClick={() => { addPoints(Math.floor(totalPrice/10)); setShowPay(false); setOrdered(true); }}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 font-black flex items-center justify-center gap-2 text-slate-700 active:scale-95 transition">
                <span className="text-xl">{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LINE Pay */}
      {showLP && (
        <LinePaySheet
          amount={totalPrice}
          pointsEarned={Math.floor(totalPrice / 10)}
          onPaid={() => { addPoints(Math.floor(totalPrice/10)); setShowLP(false); setOrdered(true); }}
          onClose={() => setShowLP(false)}
        />
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
          {/* 積分總覽卡 */}
          <div className="bg-gradient-to-br from-[#534ab7] to-purple-700 text-white rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10"><Trophy size={100} /></div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs opacity-60 font-bold mb-1">我的積分</p>
                <p className="text-6xl font-black tracking-tighter leading-none">{points.toLocaleString()}<span className="text-xl opacity-50 ml-1">pt</span></p>
              </div>
              <div className="bg-white/15 rounded-2xl px-3 py-2 text-right border border-white/20">
                <p className="text-[10px] opacity-70 font-bold">折現價值</p>
                <p className="text-lg font-black">NT${Math.floor(points * 0.05).toLocaleString()}</p>
              </div>
            </div>
            {/* 等級進度 */}
            {(() => {
              const cur  = getUserLevel(points);
              const next = getNextLevel(points);
              const pct  = next ? Math.min(((points - cur.pts) / (next.pts - cur.pts)) * 100, 100) : 100;
              return (
                <div className="bg-black/20 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{cur.badge}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] font-bold opacity-90">
                        <span>Lv.{cur.lv} {cur.title}</span>
                        {next && <span>→ Lv.{next.lv} {next.badge} {next.pts.toLocaleString()}pt</span>}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] opacity-60 font-bold mt-1">
                    {next ? `還差 ${(next.pts - points).toLocaleString()} pt 升級 · 解鎖${next.privileges[0]}` : '🎉 已達最高等級！'}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* 如何賺積分 */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-slate-50 flex items-center justify-between">
              <h4 className="font-black text-slate-800 text-sm flex items-center gap-2"><Zap size={16} className="text-yellow-500" /> 如何賺積分</h4>
              <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full">1pt ≒ NT$0.05</span>
            </div>
            <div className="divide-y divide-slate-50">
              {POINTS_RULES.map(r => (
                <div key={r.action} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-xl shrink-0">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-700">{r.action}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{r.note}</p>
                  </div>
                  <span className="text-[#534ab7] font-black text-sm shrink-0">+{r.pts} pt</span>
                </div>
              ))}
            </div>
          </div>

          {/* 兌換商城 */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-slate-50">
              <h4 className="font-black text-slate-800 text-sm flex items-center gap-2"><Gift size={16} className="text-rose-500" /> 積分兌換</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">點數直接折抵消費，無到期日</p>
            </div>
            <div className="divide-y divide-slate-50">
              {POINTS_REDEEM.map(r => {
                const canRedeem = points >= r.pts;
                return (
                  <div key={r.name} className="flex items-center gap-3 px-5 py-3">
                    <span className="text-xl shrink-0">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-700">{r.name}</p>
                        {r.tag && <span className="text-[9px] bg-orange-50 text-orange-500 font-black px-1.5 py-0.5 rounded-full border border-orange-100">{r.tag}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[#534ab7] font-black">{r.pts.toLocaleString()} pt</span>
                        <span className="text-[9px] text-slate-300">·</span>
                        <span className="text-[10px] text-slate-400 font-bold">≒ NT${Math.floor(r.pts * 0.05)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => canRedeem && alert(`兌換成功！\n${r.name}\n請至門市出示此畫面`)}
                      className={`px-3 py-1.5 rounded-full text-xs font-black transition-all shrink-0 ${canRedeem ? 'bg-[#534ab7] text-white active:scale-95 shadow-md' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}>
                      {canRedeem ? '立即兌換' : `差 ${r.pts - points} pt`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 交易紀錄 */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <h4 className="font-black text-slate-700 px-5 pt-5 pb-3 text-sm border-b border-slate-50 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#0f6e56]" /> 積分明細
            </h4>
            {POINTS_HISTORY.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-slate-50 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${item.pts > 0 ? 'bg-[#0f6e56]/10' : 'bg-red-50'}`}>
                  {item.pts > 0 ? '↑' : '↓'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-700 leading-snug">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.date}</p>
                </div>
                <span className={`font-black text-sm shrink-0 ${item.pts > 0 ? 'text-[#0f6e56]' : 'text-red-500'}`}>
                  {item.pts > 0 ? `+${item.pts}` : item.pts} pt
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
// LINE Pay 元件
// ─────────────────────────────────────────────
function FakeQR({ size = 160 }) {
  const N = 21;
  const c = Math.floor(size / N);
  const S = c * N;
  const finderAt = (r, col, br, bc) => {
    const dr = r - br, dc = col - bc;
    if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return null;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
    if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
    return false;
  };
  const isBlack = (r, col) => {
    const f = finderAt(r,col,0,0) ?? finderAt(r,col,0,14) ?? finderAt(r,col,14,0);
    if (f !== null) return f;
    if ((r <= 7 && col <= 7) || (r <= 7 && col >= 13) || (r >= 13 && col <= 7)) return false;
    if (r === 6 && col >= 8 && col <= 12) return col % 2 === 0;
    if (col === 6 && r >= 8 && r <= 12) return r % 2 === 0;
    return ((r * 13 + col * 11 + r * col) % 4) < 2;
  };
  const rects = [];
  for (let r = 0; r < N; r++) {
    for (let col = 0; col < N; col++) {
      if (isBlack(r, col)) rects.push(
        <rect key={`${r}-${col}`} x={col*c+0.5} y={r*c+0.5} width={c-1} height={c-1} rx={1} />
      );
    }
  }
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
      <rect width={S} height={S} fill="white" />
      <g fill="#000">{rects}</g>
    </svg>
  );
}

function LinePaySheet({ amount, onPaid, onClose, pointsEarned = 0 }) {
  const [step, setStep] = useState('confirm'); // confirm | processing | success

  const pay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
    setTimeout(() => onPaid(), 3200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center animate-in fade-in">
      <div className="absolute inset-0 bg-black/60" onClick={step === 'confirm' ? onClose : undefined} />
      <div className="relative bg-white w-full max-w-md rounded-t-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom">

        {step === 'confirm' && (
          <>
            {/* LINE Pay 頭部 */}
            <div className="bg-[#00B900] px-7 pt-8 pb-6 text-white">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-white rounded-xl px-2.5 py-1">
                  <span className="text-[#00B900] font-black text-sm tracking-tight">LINE</span>
                </div>
                <span className="font-black text-2xl tracking-tight">Pay</span>
              </div>
              <p className="text-green-100 text-xs font-bold mt-1">安全快速 · 台灣最多人使用的行動支付</p>
            </div>
            {/* 金額 */}
            <div className="px-7 py-5 border-b border-slate-100">
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">付款金額</p>
              <p className="text-4xl font-black text-slate-900 tracking-tight">NT$ {amount.toLocaleString()}</p>
              {pointsEarned > 0 && (
                <p className="text-sm text-[#00B900] font-bold mt-1.5">💚 付款後獲得 +{pointsEarned} pt 積分</p>
              )}
            </div>
            {/* QR Code */}
            <div className="px-7 py-5">
              <div className="flex flex-col items-center mb-5">
                <div className="border-4 border-[#00B900] rounded-2xl p-3 shadow-md mb-3">
                  <FakeQR size={160} />
                </div>
                <p className="text-xs text-slate-500 font-bold">打開 LINE App → 掃一掃</p>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-xs text-slate-400 font-bold">或</p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <button onClick={pay}
                className="w-full bg-[#00B900] text-white py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-center gap-2">
                <span className="text-xl">💚</span> 確認付款 NT${amount.toLocaleString()}
              </button>
              <div className="flex items-center justify-center gap-4 mt-3">
                <button onClick={onClose} className="text-slate-400 text-sm font-bold py-2">取消</button>
                <span className="text-slate-200">|</span>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                  <ShieldCheck size={12} className="text-[#00B900]" /> SSL 加密保護
                </div>
              </div>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="px-7 py-20 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-[#00B900]/20 border-t-[#00B900] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
            </div>
            <p className="font-black text-slate-900 text-xl mb-2">付款確認中…</p>
            <p className="text-slate-400 text-sm font-bold">LINE Pay 安全驗證中，請稍候</p>
          </div>
        )}

        {step === 'success' && (
          <div className="px-7 py-20 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#00B900] rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-300">
              <Check size={48} className="text-white" />
            </div>
            <p className="font-black text-slate-900 text-2xl mb-1">付款成功！</p>
            <p className="text-[#00B900] font-black text-2xl mb-3">NT${amount.toLocaleString()}</p>
            <p className="text-slate-400 text-sm font-bold">LINE Pay 扣款完成</p>
            {pointsEarned > 0 && (
              <div className="mt-4 bg-[#0f6e56]/5 rounded-2xl px-5 py-3 border border-[#0f6e56]/10">
                <p className="text-[#0f6e56] text-sm font-black">✅ 已獲得 +{pointsEarned} pt 積分</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Modals
// ─────────────────────────────────────────────
function CertificationModal({ onClose, points = 0 }) {
  const cur  = getUserLevel(points);
  const next = getNextLevel(points);
  const pct  = next ? Math.round(((points - cur.pts) / (next.pts - cur.pts)) * 100) : 100;
  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm relative shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-7 pb-4 shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400"><XCircle /></button>
          <div className="text-center mb-4">
            <ShieldCheck size={40} className="text-[#0f6e56] mx-auto mb-2" />
            <h2 className="text-2xl font-black">成長等級系統</h2>
            <p className="text-xs text-slate-400 font-bold mt-0.5">10 個等級 · 解鎖更多特權</p>
          </div>
          {/* 目前等級卡 */}
          <div className={`${cur.color} text-white rounded-2xl p-4 mb-4 flex items-center gap-4`}>
            <div className="text-4xl">{cur.badge}</div>
            <div className="flex-1">
              <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">目前等級 Lv.{cur.lv}</p>
              <p className="text-xl font-black">{cur.title}</p>
              {next && (
                <>
                  <div className="flex items-center justify-between mt-2 text-[10px] opacity-80 font-bold">
                    <span>{points.toLocaleString()} pt</span><span>→ {next.pts.toLocaleString()} pt ({next.title})</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] opacity-70 font-bold mt-1">還差 {(next.pts - points).toLocaleString()} pt 升級</p>
                </>
              )}
              {!next && <p className="text-xs opacity-80 font-bold mt-1">🎉 已達最高等級！</p>}
            </div>
          </div>
        </div>
        {/* 所有等級列表（可滾動） */}
        <div className="overflow-y-auto px-7 pb-7 space-y-2">
          {LEVEL_SYSTEM.map((l) => {
            const isCur     = l.lv === cur.lv;
            const isUnlocked = points >= l.pts;
            return (
              <div key={l.lv} className={`flex gap-3 p-3.5 rounded-2xl border-2 transition ${isCur ? 'border-[#0f6e56] bg-[#0f6e56]/5 shadow-md' : isUnlocked ? 'border-slate-100 bg-slate-50' : 'border-dashed border-slate-200 bg-white opacity-50'}`}>
                {/* 等級徽章 */}
                <div className={`${l.color} text-white w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm text-base leading-none`}>
                  <span>{l.badge}</span>
                  <span className="text-[8px] font-black opacity-80">{l.lv}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-black text-sm text-slate-800">{l.title}</p>
                    {isCur && <span className="bg-[#0f6e56] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">現在</span>}
                    {!isCur && isUnlocked && <span className="bg-green-100 text-green-700 text-[8px] font-black px-1.5 py-0.5 rounded-full">✓ 已解鎖</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{l.eng} · 需 {l.pts.toLocaleString()} pt</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {l.privileges.map(p => (
                      <span key={p} className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${isUnlocked ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-100 border-slate-100 text-slate-400'}`}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black mt-4 shadow-xl">繼續收集積分 💪</button>
        </div>
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
// ─────────────────────────────────────────────
// 創辦人 PIN 解鎖
// ─────────────────────────────────────────────
const FOUNDER_PIN = '888888';
function FounderPinModal({ onClose, onUnlock }) {
  const [pin, setPin]       = useState('');
  const [shake, setShake]   = useState(false);
  const [error, setError]   = useState(false);

  const press = (digit) => {
    if (pin.length >= 6) return;
    const next = pin + digit;
    setPin(next);
    setError(false);
    if (next.length === 6) {
      if (next === FOUNDER_PIN) {
        setTimeout(onUnlock, 300);
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setPin(''); setShake(false); }, 700);
      }
    }
  };
  const del = () => { setPin(p => p.slice(0, -1)); setError(false); };

  return (
    <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-8 animate-in fade-in">
      <div className="w-full max-w-xs">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-400/20 border-2 border-amber-400/40 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={28} className="text-amber-300" />
          </div>
          <h2 className="text-white text-xl font-black">創辦人手冊</h2>
          <p className="text-white/40 text-xs font-bold mt-1">請輸入 6 位數密碼</p>
        </div>

        {/* PIN 點點顯示 */}
        <div className={`flex justify-center gap-4 mb-8 ${shake ? 'animate-[wiggle_0.6s_ease-in-out]' : ''}`}
          style={shake ? { animation: 'shake 0.6s ease-in-out' } : {}}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${
              i < pin.length
                ? error ? 'bg-red-500 border-red-500' : 'bg-amber-400 border-amber-400'
                : 'border-white/30'
            }`} />
          ))}
        </div>
        {error && <p className="text-red-400 text-xs font-black text-center -mt-5 mb-6">密碼錯誤，請再試一次</p>}

        {/* 數字鍵盤 */}
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6,7,8,9,'','0','⌫'].map((k, i) => (
            <button key={i}
              onClick={() => k === '⌫' ? del() : k !== '' ? press(String(k)) : null}
              className={`h-16 rounded-3xl font-black text-xl transition-all active:scale-90 ${
                k === '' ? '' :
                k === '⌫' ? 'bg-white/10 text-white/60 hover:bg-white/20' :
                'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >{k}</button>
          ))}
        </div>

        {/* 取消 */}
        <button onClick={onClose} className="w-full mt-5 py-3 text-white/40 text-sm font-bold">取消</button>
      </div>

      {/* shake keyframes inline */}
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// 創辦人手冊
// ─────────────────────────────────────────────
function FounderPlaybook({ onClose }) {
  const [activeTab, setActiveTab] = useState('sop');
  const [checked, setChecked]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('cc_sop') || '[]'); } catch { return []; }
  });
  const [openStrategy, setOpenStrategy] = useState(null);
  const toggle = (id) => {
    const next = checked.includes(id) ? checked.filter(x => x !== id) : [...checked, id];
    setChecked(next);
    localStorage.setItem('cc_sop', JSON.stringify(next));
  };

  const totalSteps   = FOUNDER_SOP.reduce((s, p) => s + p.steps.length, 0);
  const doneSteps    = checked.length;
  const progressPct  = Math.round((doneSteps / totalSteps) * 100);

  return (
    <div className="absolute inset-0 bg-slate-900 z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 bg-gradient-to-r from-slate-800 to-slate-900 px-5 pt-10 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">🔒 FOUNDER MODE</p>
            <h2 className="text-white text-2xl font-black tracking-tight mt-0.5">CreaCert 創辦人手冊</h2>
          </div>
          <button onClick={onClose} className="bg-white/10 p-2.5 rounded-2xl border border-white/10 text-white/60"><XCircle size={20} /></button>
        </div>
        {/* Tab Switcher */}
        <div className="flex gap-2">
          {[['sop','📋 開店SOP'],['franchise','🤝 加盟系統'],['profit','💰 獲利策略']].map(([k, label]) => (
            <button key={k} onClick={() => setActiveTab(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${activeTab === k ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white/60'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Tab 1: 開店SOP ── */}
        {activeTab === 'sop' && (
          <div className="p-5 space-y-5">
            {/* 整體進度 */}
            <div className="bg-white/5 rounded-3xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-black">開店進度</p>
                <span className="text-amber-300 font-black text-xl">{progressPct}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-white/40 text-[10px] font-bold mt-2">已完成 {doneSteps} / {totalSteps} 項目</p>
            </div>

            {/* 各階段清單 */}
            {FOUNDER_SOP.map(phase => (
              <div key={phase.phase} className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <div className={`${phase.color} px-5 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{phase.emoji}</span>
                    <div>
                      <p className="text-white font-black text-sm">Phase {phase.phase} · {phase.title}</p>
                      <p className="text-white/70 text-[10px] font-bold">預估 {phase.weeks}</p>
                    </div>
                  </div>
                  <span className="text-white/70 text-[10px] font-black bg-black/20 px-2 py-0.5 rounded-full">
                    {phase.steps.filter(s => checked.includes(s.id)).length}/{phase.steps.length}
                  </span>
                </div>
                <div className="divide-y divide-white/5">
                  {phase.steps.map(step => (
                    <button key={step.id} onClick={() => toggle(step.id)}
                      className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-white/5 transition active:bg-white/10">
                      <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${checked.includes(step.id) ? 'bg-green-500 border-green-500' : 'border-white/30'}`}>
                        {checked.includes(step.id) && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-black text-sm transition ${checked.includes(step.id) ? 'text-white/40 line-through' : 'text-white'}`}>{step.title}</p>
                        <p className="text-white/40 text-[10px] font-bold mt-0.5 leading-snug">{step.note}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* 法規警示卡 */}
            <div className="bg-red-950/50 border border-red-500/30 rounded-3xl p-5">
              <p className="text-red-400 font-black text-sm mb-2">⚠️ 重要法規提醒</p>
              <div className="space-y-2 text-[11px] text-red-300/80 font-bold leading-snug">
                <p>• 未申請動物展演許可即收體驗費 → 罰鍰 NT$5–25萬，動物可能被沒入</p>
                <p>• 未持特定寵物業許可直接販賣動物 → 罰鍰 NT$10–300萬，強制停業</p>
                <p>• 建議優先完成Phase 1，其餘邊裝潢邊跑申請</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: 加盟系統 ── */}
        {activeTab === 'franchise' && (
          <div className="p-5 space-y-5">
            {/* 加盟方案卡 */}
            {FRANCHISE_TIERS.map((tier, i) => (
              <div key={i} className={`rounded-3xl overflow-hidden border ${tier.recommended ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 'border-white/10'}`}>
                <div className={`${tier.color} text-white p-5`}>
                  <div className="flex items-start justify-between">
                    <div>
                      {tier.recommended && <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-full mb-1.5 inline-block">⭐ 主推方案</span>}
                      <p className="font-black text-xl">{tier.name}</p>
                      <p className="text-white/70 text-xs font-bold mt-0.5">{tier.area} · {tier.animals}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/60 font-bold">加盟金</p>
                      <p className="text-2xl font-black">NT${(tier.fee/10000).toFixed(0)}萬</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 p-5 space-y-4">
                  {/* 費用明細 */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[['保證金', `NT$${(tier.deposit/10000).toFixed(0)}萬`], ['月權利金', `${tier.royaltyPct}% 營業額`], ['系統費', `NT$${(tier.monthly/1000).toFixed(0)}k/月`]].map(([k,v]) => (
                      <div key={k} className="bg-white/5 rounded-2xl p-2.5">
                        <p className="text-white/40 text-[9px] font-bold">{k}</p>
                        <p className="text-white font-black text-xs mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>
                  {/* 培訓 */}
                  <div className="flex items-center gap-2">
                    <BookOpen size={13} className="text-amber-300 shrink-0" />
                    <p className="text-white/70 text-xs font-bold">培訓：{tier.training}</p>
                  </div>
                  {/* 包含項目 */}
                  <div className="space-y-1.5">
                    {tier.includes.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-green-400 shrink-0" />
                        <p className="text-white/70 text-xs font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* 4週培訓課程 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
              <p className="text-white font-black mb-4 flex items-center gap-2"><BookOpen size={15} className="text-amber-300" /> 標準培訓課程（4週）</p>
              <div className="space-y-3">
                {TRAINING_WEEKS.map(w => (
                  <div key={w.week} className="flex gap-3">
                    <div className="bg-amber-400/20 border border-amber-400/30 text-amber-300 w-10 h-10 rounded-2xl flex flex-col items-center justify-center shrink-0 text-base">
                      {w.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-black text-sm">第 {w.week} 週 · {w.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {w.topics.map(t => <span key={t} className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-bold">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-3">
                <p className="text-amber-300 text-[10px] font-bold">+ 培訓結束後 2 週到成大門市實習，再進行書面 + 實操考核，通過後才授予加盟資格</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 3: 獲利策略 ── */}
        {activeTab === 'profit' && (
          <div className="p-5 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
              <p className="text-white/50 text-[10px] font-black tracking-widest uppercase mb-1">獲利優先順序</p>
              <p className="text-white font-bold text-sm leading-snug">依毛利率 + 可執行難度排序，建議由上往下逐步開展</p>
            </div>
            {PROFIT_STRATEGIES.map(s => (
              <div key={s.rank} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <button className="w-full flex items-start gap-4 p-5 text-left" onClick={() => setOpenStrategy(openStrategy === s.rank ? null : s.rank)}>
                  <div className="bg-white/10 w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0">{s.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white/30 text-[10px] font-black">#{s.rank}</span>
                      <span className={`${s.tagColor} text-white text-[9px] font-black px-2 py-0.5 rounded-full`}>{s.tag}</span>
                    </div>
                    <p className="text-white font-black text-sm">{s.title}</p>
                    <p className="text-white/50 text-[10px] font-bold mt-0.5 leading-snug">{s.desc}</p>
                    <p className="text-amber-300 text-[10px] font-black mt-1">{s.margin}</p>
                  </div>
                  <ChevronRight size={16} className={`text-white/30 shrink-0 transition-transform ${openStrategy === s.rank ? 'rotate-90' : ''}`} />
                </button>
                {openStrategy === s.rank && (
                  <div className="px-5 pb-5">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <p className="text-white/70 text-xs font-bold leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 3年目標 */}
            <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/30 border border-amber-500/30 rounded-3xl p-5">
              <p className="text-amber-300 font-black mb-4 flex items-center gap-2"><TrendingUp size={15} /> 3年擴張目標</p>
              <div className="space-y-3">
                {[
                  { year: 'Y1', title: '穩固成大店', targets: ['月淨利 NT$8萬+', '訂閱用戶 300+', '完成SOP手冊', '申請商標'], color: 'bg-blue-500' },
                  { year: 'Y2', title: '首家加盟店', targets: ['台南另一區或高雄', '加盟金收入NT$68萬', '線上課程上線', 'App用戶 2,000+'], color: 'bg-[#0f6e56]' },
                  { year: 'Y3', title: '規模化 × 5', targets: ['全台5家加盟', '月被動收入NT$20萬+', '廠商贊助談妥', '考慮B輪融資'], color: 'bg-gradient-to-r from-amber-500 to-rose-500' },
                ].map(y => (
                  <div key={y.year} className="flex gap-3 items-start">
                    <div className={`${y.color} text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shrink-0`}>{y.year}</div>
                    <div className="flex-1">
                      <p className="text-white font-black text-sm">{y.title}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {y.targets.map(t => <span key={t} className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-bold">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

        {/* APP 數位指標 — 贊助談判籌碼 */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-white/10">
          <p className="text-white font-black text-sm mb-1">📱 APP 用戶數據</p>
          <p className="text-white/40 text-[10px] mb-3">廠商贊助 · 以量制價談判資料</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: '總用戶數',     val: d.appStats.totalUsers.toLocaleString() + ' 人', color: 'text-sky-400' },
              { label: '本月活躍',     val: d.appStats.activeMonthly + ' 人',             color: 'text-emerald-400' },
              { label: '付費訂閱',     val: d.appStats.subscribers + ' 人',               color: 'text-violet-400' },
              { label: '訂閱月營收',   val: 'NT$' + (d.appStats.subscribeRevenue/1000).toFixed(1) + 'K', color: 'text-violet-400' },
              { label: 'APP 訂餐筆數', val: d.appStats.appOrders + ' 筆',                 color: 'text-orange-400' },
              { label: '訂餐月金額',   val: 'NT$' + (d.appStats.appOrderRevenue/1000).toFixed(1) + 'K', color: 'text-orange-400' },
              { label: '積分發出',     val: d.appStats.pointsIssued.toLocaleString() + ' pt', color: 'text-yellow-400' },
              { label: '廠商詢問',     val: d.appStats.sponsorLeads + ' 家',              color: 'text-pink-400' },
            ].map(m => (
              <div key={m.label} className="bg-slate-700/60 rounded-xl p-3">
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-wider">{m.label}</p>
                <p className={`font-black text-base mt-0.5 ${m.color}`}>{m.val}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-emerald-900/40 rounded-xl p-3 border border-emerald-500/20">
            <p className="text-emerald-300 text-[10px] font-bold">
              📈 周增長 {d.appStats.weeklyGrowth} · 預計3個月達 2,000 用戶<br />
              💡 建議：用戶破 1,000 時啟動品牌廠商贊助談判
            </p>
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

          {/* 付款方式 */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-black text-slate-600 mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#0f6e56]" /> 支援付款方式
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'LINE Pay', icon: '💚', note: '掃碼即付' },
                { label: '信用卡', icon: '💳', note: 'Visa / MC' },
                { label: '銀行轉帳', icon: '🏦', note: '確認後開通' },
              ].map(m => (
                <div key={m.label} className="bg-white rounded-xl p-2.5 text-center border border-slate-100 shadow-sm">
                  <p className="text-xl">{m.icon}</p>
                  <p className="text-[10px] font-black text-slate-700 mt-1">{m.label}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold">可隨時取消 · 無隱藏費用 · 發票自動開立</p>
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

// ─────────────────────────────────────────────
// Tab — 點餐系統
// ─────────────────────────────────────────────
function OrderScreen({ cartItems, addToCart, removeFromCart, clearCart, addPoints }) {
  const [cat, setCat] = useState('全部');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLinePay, setShowLinePay]   = useState(false);
  const [ordered, setOrdered]           = useState(false);

  const cats = ['全部', '飲品', '輕食', '甜點'];
  const filtered = cat === '全部' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.cat === cat);
  const total = cartItems.reduce((s, x) => s + x.price * x.qty, 0);
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);

  const handleOrder = () => {
    addPoints(Math.floor(total / 10)); // 每消費 NT$10 = 1pt
    clearCart();
    setOrdered(true);
    setShowCheckout(false);
  };

  if (ordered) return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
      <div className="text-8xl mb-6 animate-bounce">☕</div>
      <h2 className="text-3xl font-black text-slate-900 mb-2">點餐成功！</h2>
      <p className="text-slate-500 font-bold mb-1">預計 10–15 分鐘備餐</p>
      <p className="text-slate-400 text-sm font-bold mb-8">取餐請至吧台叫號</p>
      <div className="bg-[#0f6e56]/5 rounded-3xl p-5 border border-[#0f6e56]/10 mb-6 w-full max-w-xs">
        <p className="text-sm font-black text-[#0f6e56] mb-2">✅ 本次消費 NT${total.toLocaleString()}</p>
        <p className="text-xs text-slate-500 font-bold">已獲得 +{Math.floor(total / 10)} pt 積分</p>
      </div>
      <button onClick={() => setOrdered(false)} className="bg-[#0f6e56] text-white px-10 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition">再點一次</button>
    </div>
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in">
      {/* 頁面標題 */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 pt-5 pb-6 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Utensils size={22} /> 今日點餐
            </h2>
            <p className="text-orange-100 text-xs font-bold mt-0.5">成大生醫卓群門市 · 現點現做</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold opacity-70">消費 NT$10</p>
            <p className="text-xs font-black">= 1 積分 🎯</p>
          </div>
        </div>
        {/* 今日特推 */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-white/20 flex items-center gap-3">
          <span className="text-3xl">☕</span>
          <div className="flex-1">
            <p className="font-black text-sm">今日特推：招牌爬蟲拿鐵</p>
            <p className="text-orange-100 text-[10px] font-bold">加爬蟲拉花 +NT$20 · 限時供應</p>
          </div>
          <button onClick={() => addToCart(MENU_ITEMS[0])} className="bg-white text-orange-500 font-black text-xs px-3 py-1.5 rounded-full active:scale-90 transition shadow-md">
            + 加入
          </button>
        </div>
      </div>

      {/* 分類 Tab */}
      <div className="bg-white px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 border-b border-slate-100">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-black transition-all ${cat === c ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* 菜單列表 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 pb-28 space-y-2">
        {filtered.map(item => {
          const inCart = cartItems.find(x => x.id === item.id);
          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
              {/* emoji 圖示 */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-4xl shrink-0 border border-orange-100">
                {item.emoji}
              </div>
              {/* 資訊 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-black text-slate-800 text-sm">{item.name}</p>
                  {item.tag && <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${item.tagColor}`}>{item.tag}</span>}
                </div>
                <p className="text-[11px] text-slate-400 font-bold leading-snug">{item.desc}</p>
                <p className="text-orange-500 font-black text-base mt-1">NT${item.price}</p>
              </div>
              {/* 數量控制 */}
              <div className="shrink-0 flex items-center gap-2">
                {inCart ? (
                  <>
                    <button onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition">
                      <Minus size={14} strokeWidth={3} className="text-slate-600" />
                    </button>
                    <span className="font-black text-slate-800 text-sm w-4 text-center">{inCart.qty}</span>
                    <button onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center active:scale-90 transition shadow-md">
                      <Plus size={14} strokeWidth={3} className="text-white" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => addToCart(item)}
                    className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center active:scale-90 transition shadow-lg">
                    <Plus size={18} strokeWidth={3} className="text-white" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部結帳浮動欄 */}
      {cartCount > 0 && (
        <div className="absolute bottom-20 left-0 right-0 px-4 z-30">
          <button onClick={() => setShowCheckout(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-2xl font-black text-base shadow-2xl active:scale-[0.98] transition flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="bg-white/25 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">{cartCount}</div>
              <span>查看訂單</span>
            </div>
            <span>NT${total.toLocaleString()} →</span>
          </button>
        </div>
      )}

      {/* LINE Pay */}
      {showLinePay && (
        <LinePaySheet
          amount={total}
          pointsEarned={Math.floor(total / 10)}
          onPaid={() => { setShowLinePay(false); handleOrder(); }}
          onClose={() => setShowLinePay(false)}
        />
      )}

      {/* 結帳 Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end animate-in slide-in-from-bottom">
          <div className="bg-white rounded-t-[3rem] w-full max-w-md mx-auto p-6 pb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">🧾 確認訂單</h3>
              <button onClick={() => setShowCheckout(false)} className="bg-slate-100 p-2 rounded-full"><XCircle size={18} /></button>
            </div>

            {/* 訂單清單 */}
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-black text-slate-800 text-sm">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">×{item.qty}</p>
                    </div>
                  </div>
                  <p className="font-black text-slate-700">NT${(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* 總計 + 積分提示 */}
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 text-lg">NT${total.toLocaleString()}</p>
                <p className="text-xs text-orange-600 font-bold">消費後獲得 +{Math.floor(total / 10)} pt</p>
              </div>
              <div className="text-right text-xs text-slate-500 font-bold">
                <p>到店取餐</p>
                <p>預計 10–15 分鐘</p>
              </div>
            </div>

            {/* 付款方式 */}
            <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">選擇付款方式</p>
            <button
              onClick={() => { setShowCheckout(false); setShowLinePay(true); }}
              className="w-full bg-[#00B900] text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition">
              <div className="bg-white rounded-lg px-2 py-0.5"><span className="text-[#00B900] font-black text-xs">LINE</span></div>
              Pay · 掃碼付款
            </button>
            <div className="grid grid-cols-2 gap-2">
              {[['💳','信用卡 / 電子票證'],['💵','現金取餐']].map(([icon, label]) => (
                <button key={label} onClick={handleOrder}
                  className="bg-slate-50 border-2 border-slate-100 rounded-xl py-3 flex flex-col items-center gap-1 active:scale-95 transition hover:border-slate-300">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[10px] font-black text-slate-600">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 今日點餐 Modal ──
function CafeMenuModal({ onClose }) {
  const [cart, setCart]         = useState([]);
  const [showPay, setShowPay]   = useState(false);
  const [showLP, setShowLP]     = useState(false);
  const [ordered, setOrdered]   = useState(false);

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
            <button onClick={() => setShowPay(true)}
              className="w-full bg-[#0f6e56] text-white py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition flex items-center justify-between px-6">
              <span>前往付款</span>
              <span>NT${total.toLocaleString()} ({cart.reduce((s,x)=>s+x.qty,0)} 項)</span>
            </button>
          </div>
        )}

        {/* 付款方式選擇 */}
        {showPay && !showLP && (
          <div className="fixed inset-0 bg-black/60 z-30 flex items-end animate-in fade-in">
            <div className="bg-white w-full rounded-t-[3rem] p-6 pb-10 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-slate-900">選擇付款方式</h3>
                <button onClick={() => setShowPay(false)} className="text-slate-400"><XCircle size={22} /></button>
              </div>
              <p className="text-xs text-slate-400 font-bold">共 NT${total.toLocaleString()}</p>
              <button onClick={() => { setShowPay(false); setShowLP(true); }}
                className="w-full bg-[#00B900] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition">
                <div className="bg-white rounded-lg px-2 py-0.5"><span className="text-[#00B900] font-black text-xs">LINE</span></div>
                Pay · 行動支付
              </button>
              {[['💳','信用卡 / 電子票證'],['💵','現場付現']].map(([icon, label]) => (
                <button key={label} onClick={() => { setShowPay(false); setOrdered(true); }}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 font-black flex items-center justify-center gap-2 text-slate-700 active:scale-95 transition">
                  <span className="text-xl">{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LINE Pay */}
        {showLP && (
          <LinePaySheet
            amount={total}
            pointsEarned={Math.floor(total / 10)}
            onPaid={() => { setShowLP(false); setOrdered(true); }}
            onClose={() => setShowLP(false)}
          />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 28坪門市地圖 — 資料 & 元件
// ─────────────────────────────────────────────
const STORE_ZONES = [
  { id:'entrance', short:'入口打卡',   name:'入口 / QR 打卡站',      emoji:'🚪', area:1,
    color:'bg-green-100',  border:'border-green-400',  text:'text-green-900',  hdr:'bg-green-500',
    appLink:'首頁 → 門市掃碼打卡', tab:'home',
    liveStatus:'🟢 開放中',
    appFeatures:['QR 掃碼 +20pt','每日打卡','App 首次綁定'],
    desc:'進門即掃碼，每日獲得 20 積分。App 新用戶可在此完成首次綁定，掃碼後自動觸發認證護照頁。' },
  { id:'kitchen',  short:'廚房',       name:'廚房',                   emoji:'🍳', area:4,
    color:'bg-gray-100',   border:'border-gray-400',   text:'text-gray-800',   hdr:'bg-gray-500',
    appLink:'點餐 → 咖啡菜單', tab:'order',
    liveStatus:'🟢 營業中',
    appFeatures:['咖啡輕食點餐','爬蟲造型甜點','LINE Pay 結帳'],
    desc:'供應招牌爬蟲拿鐵、輕食早午餐及造型馬卡龍。App 點餐訂單直接傳送廚房出單機，無須現金。' },
  { id:'counter',  short:'櫃台',       name:'櫃台 / 收銀',            emoji:'💳', area:3,
    color:'bg-orange-100', border:'border-orange-400', text:'text-orange-900', hdr:'bg-orange-500',
    appLink:'首頁 → 方案訂閱', tab:'home',
    liveStatus:'🟢 服務中',
    appFeatures:['LINE Pay 結帳','會員掃碼享折扣','訂閱方案辦理','認證費收取','積分兌換'],
    desc:'主要服務台。持 App 認證護照掃碼，系統自動套用等級折扣（C→9折 / B→85折 / A→8折）。試養與認證申請皆在此辦理。' },
  { id:'shop',     short:'商品區',     name:'商品展示架',             emoji:'🛒', area:2,
    color:'bg-purple-100', border:'border-purple-400', text:'text-purple-900', hdr:'bg-purple-500',
    appLink:'商城 → 寵物用品', tab:'shop',
    liveStatus:'🟢 開放選購',
    appFeatures:['掃碼加入購物車','認證師推薦商品','積分折抵現金'],
    desc:'UVB 燈具、寵物食品、益生菌等陳列。掃商品旁 QR 可直接加入 App 購物車，認證師會員享折扣。' },
  { id:'courses',  short:'課程站',     name:'認證考試站',             emoji:'🎓', area:2,
    color:'bg-blue-100',   border:'border-blue-400',   text:'text-blue-900',   hdr:'bg-blue-500',
    appLink:'課程 → 認證測驗', tab:'courses',
    liveStatus:'🟡 1 位使用中',
    appFeatures:['App 測驗解鎖','iPad 上課','即時升級認證','QR 解鎖課程'],
    desc:'4 台 iPad 考試座位。完成課程後可在此現場測驗，通過即時升級 App 認證等級並發放數位徽章。' },
  { id:'live',     short:'直播角',     name:'直播 / 拍攝角',          emoji:'📹', area:1,
    color:'bg-red-100',    border:'border-red-400',    text:'text-red-900',    hdr:'bg-red-500',
    appLink:'首頁 → 直播開播', tab:'home',
    liveStatus:'🟢 空閒・可用',
    appFeatures:['App 直播 +20pt','AR 濾鏡 +10pt','短影音上傳 +30pt'],
    desc:'環形補光燈＋動物主題背景板。開啟 App 直播功能獲積分，熱門時段額外獎勵。影片上傳至生態圈。' },
  { id:'reptile',  short:'爬蟲艙',     name:'爬蟲展示艙',             emoji:'🦎', area:3,
    color:'bg-teal-100',   border:'border-teal-400',   text:'text-teal-900',   hdr:'bg-teal-600',
    appLink:'圖鑑 → 爬蟲', tab:'animals',
    liveStatus:'🟢 小綠：可預約',
    appFeatures:['B 級解鎖上手體驗','App 預約時段','掃解說牌獲知識 +5pt','A 級 VIP 互動'],
    desc:'恆溫玻璃展示艙（28–38°C）展示鬃獅蜥與球蟒。B 級以上掃 App QR 可預約上手體驗（NT$250 起），解說牌掃描可獲取飼育知識積分。' },
  { id:'cats',     short:'貓咪區',     name:'貓咪互動區',             emoji:'🐱', area:4,
    color:'bg-pink-100',   border:'border-pink-400',   text:'text-pink-900',   hdr:'bg-pink-500',
    appLink:'圖鑑 → 貓咪', tab:'animals',
    liveStatus:'🟡 月亮＋小福 悠閒中',
    appFeatures:['C 級免費入場','試養申請','日記記錄','互動打卡 +15pt'],
    desc:'半開放式貓咪走廊。持 App C 級以上免費入場，掃門口 QR 完成互動打卡。互動後可直接在 App 圖鑑頁申請 14 天居家試養。' },
  { id:'cafe',     short:'讀書區',     name:'咖啡座位 / 讀書區',      emoji:'☕', area:5,
    color:'bg-amber-100',  border:'border-amber-400',  text:'text-amber-900',  hdr:'bg-amber-500',
    appLink:'首頁 → 預約讀書艙', tab:'home',
    liveStatus:'🟡 3 / 6 座使用中',
    appFeatures:['App 預約時段','課程線上學習','積分折抵飲品','打卡 +20pt'],
    desc:'6 個獨立讀書艙（附插座＋Wi-Fi），適合備考備賽。App 預約 Off-Peak 50pt/hr，飲品消費可用積分折抵，課程影片可在此播放學習。' },
  { id:'small',    short:'蜜袋鼯',     name:'小動物 / 蜜袋鼯區',      emoji:'🦘', area:1,
    color:'bg-rose-100',   border:'border-rose-400',   text:'text-rose-900',   hdr:'bg-rose-500',
    appLink:'圖鑑 → 小動物', tab:'animals',
    liveStatus:'🌙 飛飛：夜行休眠',
    appFeatures:['A 級 VIP 專屬','App 預約互動 NT$300','試養租借資格'],
    desc:'蜜袋鼯飛飛的恆溫夜行環境（22–24°C）。A 級認證師透過 App 預約 30 分鐘近距離互動，傍晚後最活躍，可申請租借資格。' },
  { id:'back',     short:'後台',       name:'後台・廁所・倉儲',        emoji:'📦', area:2,
    color:'bg-slate-100',  border:'border-slate-300',  text:'text-slate-500',  hdr:'bg-slate-400',
    appLink: null, tab: null,
    liveStatus:'🔒 員工區',
    appFeatures:[],
    desc:'備餐儲藏室、員工休息區，含客用衛生間一間。不對外開放。' },
];

function ZoneBlock({ z, selected, onSelect, flex = 1, borderRight = false }) {
  const isActive = selected === z.id;
  return (
    <button
      onClick={() => onSelect(isActive ? null : z.id)}
      style={{ flex }}
      className={[
        'flex flex-col items-center justify-center transition-all duration-150 active:scale-95 select-none',
        isActive ? `${z.hdr} text-white ring-2 ring-inset ring-white/40` : `${z.color} ${z.text}`,
        borderRight ? 'border-r border-slate-200' : '',
      ].join(' ')}
    >
      <span className="text-sm leading-none">{z.emoji}</span>
      <span className="font-black text-[8px] leading-tight text-center px-0.5 mt-0.5">{z.short}</span>
      {flex >= 3 && <span className="text-[7px] opacity-50 font-bold">{z.area}坪</span>}
    </button>
  );
}

function StoreMapModal({ onClose, setTab }) {
  const [selected, setSelected] = useState(null);
  const z = selected ? STORE_ZONES.find(x => x.id === selected) : null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col animate-in fade-in">
      <div className="bg-[#0f6e56] text-white px-5 pt-8 pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black flex items-center gap-2">
              <MapPin size={20} /> 成大門市平面圖
            </h2>
            <p className="text-[10px] opacity-60 font-bold mt-0.5 tracking-widest uppercase">NCKU BIO-MED BUILDING 1F · 28坪 · 92.4 m²</p>
          </div>
          <button onClick={onClose} className="bg-white/10 p-2.5 rounded-full border border-white/20 active:scale-90 transition">
            <XCircle size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 pb-6">
        <p className="text-[10px] text-slate-400 font-bold text-center py-2">點選各區了解 App 連動功能</p>

        {/* 平面圖 */}
        <div className="mx-3 rounded-2xl overflow-hidden border-2 border-slate-300 bg-white shadow">
          <div className="bg-slate-700 text-white text-[8px] font-black text-center py-1 tracking-widest">← 臨街面 STREET SIDE →</div>

          {/* Row 1：入口 1坪 */}
          <div className="flex border-b border-slate-200" style={{height:36}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='entrance')} selected={selected} onSelect={setSelected} flex={1} />
          </div>

          {/* Row 2：廚房4 + 櫃台3 */}
          <div className="flex border-b border-slate-200" style={{height:72}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='kitchen')}  selected={selected} onSelect={setSelected} flex={4} borderRight />
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='counter')}  selected={selected} onSelect={setSelected} flex={3} />
          </div>

          {/* Row 3：商品2 + 課程2 + 直播1 */}
          <div className="flex border-b border-slate-200" style={{height:56}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='shop')}     selected={selected} onSelect={setSelected} flex={2} borderRight />
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='courses')}  selected={selected} onSelect={setSelected} flex={2} borderRight />
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='live')}     selected={selected} onSelect={setSelected} flex={1} />
          </div>

          {/* Row 4：爬蟲3 + 貓咪4 */}
          <div className="flex border-b border-slate-200" style={{height:80}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='reptile')}  selected={selected} onSelect={setSelected} flex={3} borderRight />
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='cats')}     selected={selected} onSelect={setSelected} flex={4} />
          </div>

          {/* Row 5：咖啡讀書 5坪 */}
          <div className="flex border-b border-slate-200" style={{height:68}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='cafe')}     selected={selected} onSelect={setSelected} flex={1} />
          </div>

          {/* Row 6：小動物1 + 後台2 */}
          <div className="flex" style={{height:44}}>
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='small')}    selected={selected} onSelect={setSelected} flex={1} borderRight />
            <ZoneBlock z={STORE_ZONES.find(x=>x.id==='back')}     selected={selected} onSelect={setSelected} flex={2} />
          </div>

          <div className="bg-slate-700 text-white text-[8px] font-black text-center py-1 tracking-widest">← 內部走廊 CORRIDOR →</div>
        </div>

        {/* 面積統計 */}
        <div className="mx-3 mt-3 grid grid-cols-4 gap-2">
          {[
            {label:'動物互動', area:'9坪', color:'bg-pink-100 text-pink-700'},
            {label:'餐飲休憩', area:'9坪', color:'bg-amber-100 text-amber-700'},
            {label:'收銀服務', area:'6坪', color:'bg-orange-100 text-orange-700'},
            {label:'教育認證', area:'4坪', color:'bg-blue-100 text-blue-700'},
          ].map(s=>(
            <div key={s.label} className={`${s.color} rounded-xl p-2 text-center`}>
              <p className="text-base font-black">{s.area}</p>
              <p className="text-[8px] font-bold opacity-70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 選中區域詳情 */}
        {z && (
          <div className="mx-3 mt-3 bg-white rounded-2xl border-2 shadow overflow-hidden animate-in slide-in-from-bottom-2" style={{borderColor:'#e2e8f0'}}>
            <div className={`${z.hdr} px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{z.emoji}</span>
                <div>
                  <h3 className="text-white font-black text-sm">{z.name}</h3>
                  <p className="text-white/70 text-[10px] font-bold">{z.area} 坪 · {z.liveStatus}</p>
                </div>
              </div>
              <button onClick={()=>setSelected(null)} className="bg-white/20 p-1.5 rounded-full active:scale-90 transition">
                <XCircle size={14} className="text-white"/>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{z.desc}</p>
              {z.appFeatures.length > 0 && (
                <div>
                  <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-2">App 連動功能</p>
                  <div className="flex flex-wrap gap-1.5">
                    {z.appFeatures.map(f=>(
                      <span key={f} className={`${z.color} ${z.text} text-[9px] font-black px-2 py-1 rounded-full border ${z.border}`}>{f}</span>
                    ))}
                  </div>
                </div>
              )}
              {z.tab && z.appLink && (
                <button
                  onClick={() => { onClose(); setTab(z.tab); }}
                  className={`w-full ${z.hdr} text-white py-3 rounded-xl font-black text-xs shadow active:scale-95 transition`}
                >
                  前往 App 功能：{z.appLink} →
                </button>
              )}
            </div>
          </div>
        )}

        {!z && (
          <div className="mx-3 mt-3 grid grid-cols-1 gap-2">
            <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase text-center">各區虛實整合說明</p>
            {STORE_ZONES.filter(x=>x.tab).map(x=>(
              <div key={x.id} className={`${x.color} rounded-2xl px-4 py-3 flex items-center gap-3 border ${x.border}`}>
                <span className="text-xl shrink-0">{x.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-xs ${x.text}`}>{x.name} <span className="opacity-50 font-bold">· {x.area}坪</span></p>
                  <p className="text-[9px] text-slate-500 font-bold truncate">{x.appFeatures.join(' · ')}</p>
                </div>
                <span className={`text-[8px] font-black ${x.text} opacity-60 shrink-0`}>{x.liveStatus}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

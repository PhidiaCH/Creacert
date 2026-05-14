# 🚀 部署到 Vercel — 早上起來只需 2 步

## 方法一：網頁拖曳（最快！不需要任何指令）

1. 打開 https://vercel.com/new
2. 點左下角「**Import Third-Party Git Repository**」旁邊的「**Continue with...」
3. 或直接選「**Deploy without Git**」→ 把 `D:/GitHub/Phidia/pawcert/dist` 整個資料夾拖進去
4. 30 秒後拿到網址！

---

## 方法二：Vercel CLI（一行指令）

在終端機執行：

```bash
cd D:/GitHub/Phidia/pawcert
vercel --prod
```

- 第一次會開瀏覽器要求登入 → 選你的帳號 phidiaty@gmail.com
- 登入後全自動，約 30 秒完成
- 完成後會顯示 `https://pawcert-xxx.vercel.app` 的網址

---

## 方法三：GitHub → Vercel（推薦，以後自動部署）

1. 打開 https://github.com/new 建立 repo 叫 `pawcert`
2. 在終端機：
```bash
cd D:/GitHub/Phidia/pawcert
git remote add origin https://github.com/PhidiaCH/pawcert.git
git push -u origin master
```
3. 打開 https://vercel.com/new → Import → 選 `pawcert`
4. 點 Deploy，完成！

---

## 本地預覽（確認沒問題）

```bash
cd D:/GitHub/Phidia/pawcert
npm run dev
# 開啟 http://localhost:5173
```

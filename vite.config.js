import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// 每次 build 自動寫入時間戳到 sw.js，強制舊 Service Worker 失效
function stampServiceWorker() {
  return {
    name: 'stamp-sw',
    closeBundle() {
      const swPath = path.resolve(__dirname, 'dist/sw.js')
      if (fs.existsSync(swPath)) {
        const stamp = Date.now().toString()
        let content = fs.readFileSync(swPath, 'utf-8')
        content = content.replace('__BUILD_TIME__', stamp)
        fs.writeFileSync(swPath, content)
        console.log(`[stamp-sw] Cache version: creacert-${stamp}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), stampServiceWorker()],
})

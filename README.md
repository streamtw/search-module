# Search Module

## Demo 連結

[https://search-module.streamtw.one](https://search-module.streamtw.one)

## AI 使用聲明

### 使用工具：
- Windsurf IDE（開發）
- Google Search AI mode（資訊蒐集與協助比較解決方案）

### AI 負責的範圍
- frontend
    - 建立 NextJS 專案，並且要求同時安裝 sass & Tailwind
    - 根據 mockup 產生 React components
    - 近乎所有功能都是透過 AI 開發，自己特別注重的方面是
        - 在 component 之間的切分是否理想
        - API call 的時機控制是否合理且最小化
        - 介面是否符合 mockup
- backend
    - 建立 Fastify 專案
    - 安裝 prisma，建構 migrations & seeders
    - 近乎所有功能都是透過 AI 開發，自己特別注重的方面是
        - api path、data types、database schema 是否盡可能地更多採用 domain language
- 基礎建設
    - 建立 docker compose，並且導入 .env 機制

### 自己負責的範圍
- 調整間距、顏色等細節以精準還原 mockup
- 套用圖庫
- 發現 listing & searching 這兩個頁面 AI 做得亂七八糟（過度遵循 DRY 原則而導致彼此互相依賴、不必要的參數傳遞導致結構複雜化、沒有凸顯出兩個頁面其實是互相平行且相似的結構），於是要求 AI 導入 react router 並使 listing & searching 兩個頁面彼此平行，並且僅重用必要的 list item components
- 以 domain languages（charity groups, donation projects, charity products）定義 data types，並套用在 backend(api paths, mock data) & frontend(list item components & styles)
- 辨識出 docker compose 在開發階段與部署階段會需要不同的配置，因此要求 AI 分割出 `Dockerfile.dev` & `Dockerfile.prod`

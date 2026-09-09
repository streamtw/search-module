# Database Setup

MySQL 的環境變數要放在哪裡？最後決定放在 docker compose yaml 裡面，原因如下：

- 實務上資料庫要求穩定，比起放在 container 裡面，放在 host machine 是更可靠安全的做法
- 此專案為 demo 性質的作品，因此就檢視架構的方便性與而言，才將資料庫配置放在 docker compose。實務上在 production 環境的 docker compose 很有可能根本不會有資料庫（因為使用了 host machine 的資料庫，或是雲端供應商提供的資料庫解決方案）
- 因此環境變數也視為專為 demo 而使用的配置，我認為寫在 docker compose 算是合理

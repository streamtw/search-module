# Styling System

樣式管理（BEM vs CSS modules vs tailwind）

- 以 CSS modules 為主：BEM 要解決的撞名問題，透過 CSS modules 的機制可以完美避免
- 但是 BEM 方法論的 modifier 概念仍然有其價值，因此若同一個樣式具有狀態變化，仍會套用 modifier 的命名方式
- tailwind：使用 tailwind 在開發第一個版本時相當快速，但是在系統長期演進的狀態下，在「狀態控制」與「RWD」兩個方面的可讀性遠低於 BEM & CSS modules，容易違反「關注點分離」、「Open-Closed Principle」，容易大幅降低程式碼可讀性、容易喪失 domain language。因此僅在 spacing 相關的場合使用 tailwind（特別是 margin）

以上為設計指導原則，但礙於時間關係，並未完全貫徹執行

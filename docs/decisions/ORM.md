# ORM

prisma vs typeORM，選擇採用 Prisma，原因如下：

- prisma 支援 migrations 在開發階段多次迭代，需求穩定後再一次性輸出 migrations
- prisma 8 提供了 query chain methods，更加適合進行條件式的 query building

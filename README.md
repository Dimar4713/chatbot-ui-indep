# Chatbot UI with NextAuth Authentication

Данный архив содержит все файлы, необходимые для замены Supabase Auth на NextAuth.js + Prisma.

## Инструкция по установке

1. Распакуйте архив.
2. Скопируйте содержимое в ваш проект chatbot-ui, заменяя файлы и папки:
   - `package.json`
   - `tsconfig.json`
   - `next.config.js`
   - `.env.example`
   - папки `prisma/`, `lib/`, `pages/api/auth/`, `pages/auth/`
   - файл `pages/_app.tsx`
3. Установите зависимости:
   ```bash
   npm install
   npx prisma migrate dev
   ```
4. Запустите проект:
   ```bash
   npm run dev
   ```

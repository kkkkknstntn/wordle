# Dockerfile для фронтенда
FROM node:18 AS builder

# Установка рабочего каталога
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов приложения
COPY . .

# Сборка приложения
RUN npm run build

# Запуск сервера на основе Nginx
FROM nginx:alpine

# Копирование собранного приложения в Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Экспонирование порта 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
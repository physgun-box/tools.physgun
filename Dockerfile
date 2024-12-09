# Используем официальный образ Node.js 20
FROM node:20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Открываем порт (если необходимо)
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]
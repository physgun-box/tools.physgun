# Используйте официальный образ Node.js в качестве базового образа
FROM node:latest

# Установите рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Установите зависимости
RUN npm install --force

# Скопируйте исходный код внутрь контейнера
COPY . .

# Определите порт, на котором будет работать ваш вебсайт
EXPOSE 5551

# Установка
RUN [ "npm", "install","--force"]

#Билд
RUN [ "npm", "run", "build"]

# Запустите приложение при старте контейнера
CMD [ "npm", "run", "start" ]

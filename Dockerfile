FROM node:lts as dependencies
WORKDIR /physgun
COPY package.json package-lock.json ./
RUN npm install --force

FROM node:lts as builder
WORKDIR /physgun
COPY . .
COPY --from=dependencies /physgun/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /physgun
ENV NODE_ENV production

COPY --from=builder /physgun/public ./public
COPY --from=builder /physgun/package.json ./package.json
COPY --from=builder /physgun/.next ./.next
COPY --from=builder /physgun/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
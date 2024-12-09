# Build stage
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install --force && npm run build

# Production stage
FROM node:alpine
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
CMD ["npm", "start"]
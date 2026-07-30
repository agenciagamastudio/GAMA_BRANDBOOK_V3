# === Estágio 1: deps build ===
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Adicione Playwright deps quando Story 3.1 chegar:
# RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-dejavu

# === Estágio 2: build TS ===
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# === Estágio 3: runtime lean ===
FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S gama && adduser -S gama -G gama
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER gama
CMD ["node", "dist/index.js"]

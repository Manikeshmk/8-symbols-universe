# Multi-stage build for 8 Symbols Universe

# Stage 1: Build interpreter and dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy monorepo setup
COPY package.json package-lock.json ./
COPY packages/interpreter/package.json ./packages/interpreter/
COPY packages/frontend/package.json ./packages/frontend/

RUN npm ci

# Stage 2: Build interpreter
FROM deps AS interpreter-builder
WORKDIR /app

COPY packages/interpreter ./packages/interpreter
RUN npm run build --workspace=packages/interpreter

# Stage 3: Build frontend
FROM deps AS frontend-builder
WORKDIR /app

COPY packages/frontend ./packages/frontend
RUN npm run build --workspace=packages/frontend

# Stage 4: Production runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
COPY packages/interpreter/package.json ./packages/interpreter/
COPY packages/frontend/package.json ./packages/frontend/

RUN npm ci --only=production

# Copy built files
COPY --from=interpreter-builder /app/packages/interpreter/dist ./packages/interpreter/dist
COPY --from=frontend-builder /app/packages/frontend/dist ./packages/frontend/dist

EXPOSE 3000 3001
ENV NODE_ENV=production

CMD ["node", "packages/interpreter/dist/server.js"]

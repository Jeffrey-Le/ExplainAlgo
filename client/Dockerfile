# ── Stage 1: Builder ────────────────────────────────────────────
# Builds the static Vite output (dist/)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for better layer caching.
# If package.json doesn't change, npm ci won't re-run on rebuilds.
COPY package.json package-lock.json* ./

RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build


# ── Stage 2: Runtime (Nginx) ─────────────────────────────────────
# Serve the static build — no Node.js needed at runtime.
FROM nginx:1.27-alpine AS runtime

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Non-root: nginx official image already drops to nginx user
# but we still need to adjust permissions for the html dir
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Run nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]

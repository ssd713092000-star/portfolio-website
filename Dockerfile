# --- Stage 1: compile TypeScript and bundle the site ---
FROM node:20.18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# --- Stage 2: serve the static files with nginx ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Hosting platforms (Render, Railway, Fly) pass the port in $PORT; default 8080.
ENV PORT=8080
EXPOSE 8080

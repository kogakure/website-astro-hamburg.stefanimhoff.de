ARG NODE_VERSION=22.13.1
ARG PNPM_VERSION=11.8.0
ARG NGINX_VERSION=1.27-alpine

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app
RUN npm install --global pnpm@${PNPM_VERSION}

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
	pnpm install --frozen-lockfile --prefer-offline

FROM dependencies AS builder

COPY . .

RUN pnpm run build

FROM nginx:${NGINX_VERSION} AS production

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

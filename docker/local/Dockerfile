FROM docker.io/node:20.11-alpine3.18 as base

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Lock file not found." && exit 1; \
    fi

COPY . .
RUN rm -rf .next
RUN npm run build

RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactjs -u 1001 -G nodejs


RUN chown -R reactjs:nodejs ${APP_HOME}

USER reactjs

CMD [ "npm", "run", "start" ]

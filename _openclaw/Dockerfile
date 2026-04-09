FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache git

RUN npm install -g pnpm

RUN git clone https://github.com/openclaw/openclaw.git .

RUN ls -R /app

RUN pnpm install

WORKDIR /app/gateway
RUN pnpm build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/gateway /app/gateway

EXPOSE 3000

CMD ["sh"]

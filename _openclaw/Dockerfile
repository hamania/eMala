FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN apt-get update && apt-get install -y git python3 make g++ && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

RUN git clone https://github.com/hamania/openclaw .

RUN ls -R /app

RUN pnpm install

WORKDIR /app/gateway
RUN pnpm build

FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm
RUN npm install -g puppeteer 2>&1 | tail -5

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["sh"]

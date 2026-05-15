FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN apt-get update && apt-get install -y git python3 make g++ && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

RUN git clone https://github.com/hamania/openclaw .

COPY custom-ui/src/storage.ts /app/ui/src/ui/storage.ts
COPY custom-ui/src/cron.ts /app/ui/src/ui/views/cron.ts
RUN node -e "const fs=require('fs');let c=fs.readFileSync('/app/ui/src/ui/app-render.ts','utf8');c=c.replace('onLoadRuns: (jobId) => loadCronRuns(state, jobId),','onLoadRuns: (jobId) => loadCronRuns(state, jobId),\n                showNewJob: state.settings.cronShowNewJob ?? false,\n                onToggleNewJob: () => state.applySettings({ ...state.settings, cronShowNewJob: !(state.settings.cronShowNewJob ?? false) }),');fs.writeFileSync('/app/ui/src/ui/app-render.ts',c);"

RUN pnpm install

RUN pnpm build

RUN pnpm ui:build

FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm
RUN npm install -g puppeteer 2>&1 | tail -5

WORKDIR /app

COPY --from=build /app /app

RUN apt-get update -qq && apt-get install -y -qq libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libdbus-1-3 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 2>&1 | tail -3 && rm -rf /var/lib/apt/lists/*

RUN npm install -g playwright 2>&1 | tail -3 && npx --yes playwright install --with-deps chromium 2>&1 | tail -5

EXPOSE 3000

CMD ["sh"]

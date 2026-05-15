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

RUN apt-get install -y chromium chromium-sandbox 2>&1 | tail -5 && rm -rf /var/lib/apt/lists/* && ln -sf $(which chromium) /usr/bin/chromium

EXPOSE 3000

CMD ["sh"]

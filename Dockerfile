FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* bun.lock* ./
RUN npm install --legacy-peer-deps --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAhqgGa5o6OBhXa8R1Zt5USalb7Ds1pKpk
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=semophoneapp.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=semophoneapp
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=semophoneapp.firebasestorage.app
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=101857140184
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:101857140184:web:698628ef30ea8ce083e6ad
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-VBHM32NHLY
ENV NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=oed9vqd3fz
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=G-VBHM32NHLY
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

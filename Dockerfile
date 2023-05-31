FROM node:18-alpine as base
WORKDIR /app
EXPOSE 3000

FROM base as build

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .

EXPOSE 3000

FROM build as dev
CMD ["npm", "run", "dev"]

FROM build as prod

RUN npm run build
RUN npm prune --omit=dev

FROM base

ENV NODE_ENV=production

WORKDIR /app

COPY --from=prod /app/build ./build
COPY --from=prod /app/node_modules ./node_modules/
COPY --from=prod /app/prisma ./prisma
COPY package.json .
COPY entrypoint.sh .

ENTRYPOINT [ "/bin/sh" ]

CMD ["entrypoint.sh"]

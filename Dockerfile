
FROM node:14-slim as production

LABEL "nick"="cc"

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN apt-get update

RUN apt-get install rsync -y

COPY package*.json ./

RUN npm install --only=production --force

COPY --chown=node:node . .

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# friends don’t let friends run containers as root!
USER node

EXPOSE 3333 3334

CMD ["node", "dist/apps/api/main.js"]

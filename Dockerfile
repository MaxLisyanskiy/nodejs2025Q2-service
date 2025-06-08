FROM node:22-alpine as development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD [ "npm", "run", "start:dev" ]
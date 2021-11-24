# PROD CONFIG
FROM node:14-alpine as prod

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app

COPY . .

# # Run the image as a non-root user
# RUN adduser -D myuser

# USER myuser

ENV NODE_ENV=production

CMD [ "npm", "start" ]

EXPOSE 8080

# DEV CONFIG
FROM prod as dev

# USER myuser

EXPOSE 5000 3000

ENV NODE_ENV=development

RUN npm install --only=dev

CMD [ "npm", "run", "dev" ]
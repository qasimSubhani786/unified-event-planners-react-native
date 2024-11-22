# FROM node:16

# RUN addgroup app && adduser -S -G app app

# USER app

# WORKDIR /app

# COPY package*.json ./

# RUN  npm i --legacy-peer-deps 

# COPY . .
FROM node:16

WORKDIR /app

COPY ./package*.json ./

RUN npm install --legacy-peer-deps 

COPY . .


EXPOSE 3000

CMD [ "npm","start" ]
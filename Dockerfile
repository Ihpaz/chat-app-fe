FROM node:19
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g @vue/cli
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "dev" ]
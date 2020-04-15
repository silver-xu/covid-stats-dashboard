FROM node:12-slim

# set a directory for the app
WORKDIR /usr/app

# copy all the files to the container
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
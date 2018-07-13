FROM gpdowning/python

WORKDIR /mibrary
COPY package*.json ./
COPY . .

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
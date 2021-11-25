FROM node:14.18.1-buster
LABEL env="statify:testing"
RUN apt-get update
RUN apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN mkdir /statify
RUN mkdir /dependencies && mkdir /dependencies/mongodb && mkdir /data && mkdir /data/db
RUN curl -o /dependencies/mongodb/mongodb.deb https://repo.mongodb.org/apt/debian/dists/buster/mongodb-org/5.0/main/binary-amd64/mongodb-org-server_5.0.4_amd64.deb && dpkg -i /dependencies/mongodb/mongodb.deb
COPY . /statify
RUN yarn init -2
RUN npm install pm2 -g
RUN npm install wait-on -g
RUN cd /statify/dummydata && yarn install
RUN cd /statify/frontend && yarn install && yarn build
RUN cd /statify/backend && yarn install && yarn build
RUN cd /statify/ && yarn install

CMD [ "bash", "/statify/run.sh" ]
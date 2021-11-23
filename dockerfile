FROM node:14.18.1-buster
LABEL env="statify:testing"
RUN mkdir /statify
RUN mkdir /dependencies && mkdir /dependencies/mongodb && mkdir /data && mkdir /data/db
RUN curl -o /dependencies/mongodb/mongodb.deb https://repo.mongodb.org/apt/debian/dists/buster/mongodb-org/5.0/main/binary-amd64/mongodb-org-server_5.0.4_amd64.deb && dpkg -i /dependencies/mongodb/mongodb.deb
COPY . /statify
RUN yarn init -2
RUN npm install pm2 -g
RUN cd /statify/dummydata && yarn install
RUN cd /statify/frontend && yarn install && yarn build
RUN cd /statify/backend && yarn install && yarn build

CMD [ "bash", "/statify/run.sh" ]
#!/bin/sh
mongod --fork --logpath /var/log/mongodb.log --logappend &&
cd /statify/dummydata && yarn install && node index.js &&
cd /statify/frontend && pm2 start npm --name "Frontend" -- start && wait-on http://localhost:5000/
cd /statify/backend && pm2 start npm --name "Backend" -- start && wait-on http://localhost:3000/menu
cd /statify && yarn cypress:run

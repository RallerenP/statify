#!/bin/sh
mongod --fork --logpath /var/log/mongodb.log --logappend &&
cd /statify/frontend && pm2 start npm --name "Frontend" -- start && cd /statify/backend && pm2 start npm --name "Backend" -- start &&
pm2 logs

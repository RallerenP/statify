const concurrently = require('concurrently');
const path = require('path');
const proxy = require('subdomain-router');

concurrently([
  {
    command: "npm run start",
    cwd: path.resolve(__dirname, 'backend')
  },
  {
    command: "npm run start",
    cwd: path.resolve(__dirname, 'frontend')
  }
])

proxy({
  host: 'rallerenp.com',
  subdomains: {
    'statify-staging': 5000,
    'statify-staging-api': 3000    
  }
}).listen(process.env.PORT);
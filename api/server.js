const http = require('http');
const app = require('./src/app');
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}/api/v1`);
});
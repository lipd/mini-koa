const http = require('http');

module.exports = class Mini {
  constructor() {
    this.middleware = [];
  }

  listen(...args) {
    const server = http.createServer();
    return server.listen(...args);
  }
};

const http = require('http');

module.exports = class Mini {
  constructor() {
    this.middleware = [];
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  callback() {
    const handleRequest = (req, res) => {
      const ctx = { req, res, app: this };
      this.handleRequest(ctx);
    };
    return handleRequest;
  }

  handleRequest(ctx) {
    const res = ctx.res;
    let index = -1;
    const dispatch = i => {
      index = i;
      const middleware = this.middleware;
      let fn = middleware[index];
      if (i === middleware.length) fn = null;
      if (!fn) return Promise.resolve();
      // next() 返回对象应是一个 Promise
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1);
        })
      );
    };
    // TODO: understand
    // dispatch(0)
    // console.log('request end')
    // 打印结果为 1, 2, 3, 'request end', 4, 5
    dispatch(0).then(() => {
      console.log('request end');
      res.end();
    });
  }
};

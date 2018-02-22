const Mini = require('../');

const app = new Mini();

const m1 = async (ctx, next) => {
  console.log(1);
  await next();
  console.log(5);
};

const m2 = async (ctx, next) => {
  console.log(2);
  await next();
  console.log(4);
};

const m3 = async (ctx, next) => {
  console.log(3);
  await next();
};

app
  .use(m1)
  .use(m2)
  .use(m3);

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});

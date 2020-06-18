import Router from 'koa-router';

const homeRouter = new Router();

homeRouter.get('/home', async ctx => {
  ctx.body = 'welcome to home';
});

export default homeRouter;
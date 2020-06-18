import Koa from 'koa';
import registerRouters from './routers';

const app = new Koa();

registerRouters(app);

app.listen(3000);
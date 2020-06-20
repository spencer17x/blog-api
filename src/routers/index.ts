import Koa from 'koa';
import fs from 'fs';
import path from 'path';

/**
 * 注册当前目录下的所有路由，排序当前文件
 * @param app
 */
export default function registerRouters(app: Koa) {
  // 当前目录下所有的文件
  const files = fs.readdirSync(__dirname);
  files.map(file => {
    if (file.startsWith('index') || file.startsWith('auth')) return;
    import(path.resolve(__dirname, file)).then(r => {
      const router = r.default;
      app.use(router.routes()).use(router.allowedMethods());
    });
  });
}

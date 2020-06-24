import Router from 'koa-router';
import { ArticleCtrl } from '../controllers';
import { auth } from './auth';

const articleRouter = new Router({
  prefix: '/article'
});

articleRouter
  .get('/', ArticleCtrl.findAllArticles.bind(this))
  .get('/:id', ArticleCtrl.findArticleById.bind(this))
  .get('/:id/category', ArticleCtrl.findCategoryByArticle.bind(this))
  .patch('/:id', auth, ArticleCtrl.checkIsMe.bind(this), ArticleCtrl.updateArticle.bind(this))
  .delete('/:id', auth, ArticleCtrl.checkIsMe.bind(this), ArticleCtrl.delArticle.bind(this))
  .post('/', auth, ArticleCtrl.createArticle.bind(this));

export default articleRouter;

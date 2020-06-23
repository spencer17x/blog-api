import Router from 'koa-router';
import { CategoryCtrl } from '../controllers';
import { auth } from './auth';

const categoryRouter = new Router({
  prefix: '/category'
});

categoryRouter
  .get('/', CategoryCtrl.findAllCategories.bind(this))
  .get('/:id', CategoryCtrl.findCategoryById.bind(this))
  .patch('/:id', auth, CategoryCtrl.checkIsMe.bind(this), CategoryCtrl.updateCategory.bind(this))
  .delete('/:id', auth, CategoryCtrl.checkIsMe.bind(this), CategoryCtrl.delCategory.bind(this))
  .post('/', auth, CategoryCtrl.createCategory.bind(this));

export default categoryRouter;

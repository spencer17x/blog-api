import Router from 'koa-router';
import { CategoryCtrl } from '../controllers';

const categoryRouter = new Router({
	prefix: '/category'
});

categoryRouter
.get('/', CategoryCtrl.findAllCategories.bind(this))
.get('/:id', CategoryCtrl.findCategoryById.bind(this))
.patch('/:id', CategoryCtrl.updateCategory.bind(this))
.delete('/:id', CategoryCtrl.delCategory.bind(this))
.post('/', CategoryCtrl.createCategory.bind(this));

export default categoryRouter;

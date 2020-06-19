import Router from 'koa-router';
import { UserCtrl } from '../controllers';

const userRouter = new Router({
  prefix: '/user'
});

userRouter
  .get('/', UserCtrl.findAllUsers.bind(this))
  .get('/:id', UserCtrl.findUserById.bind(this))
  .post('/', UserCtrl.createUser.bind(this))
  .patch('/:id', UserCtrl.updateUser.bind(this))
  .delete('/:id', UserCtrl.delUser.bind(this));

export default userRouter;

import Router from 'koa-router';
import { UserCtrl } from '../controllers';

const userRouter = new Router({
  prefix: '/user'
});

userRouter.get('/', UserCtrl.findAllUsers.bind(this));

export default userRouter;
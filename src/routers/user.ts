import Router from 'koa-router';
import koaJwt from 'koa-jwt';
import { UserCtrl } from '../controllers';
import { jwtSecret } from '../config';

const userRouter = new Router({
  prefix: '/user'
});

const auth = koaJwt({ secret: jwtSecret });

userRouter
  .get('/', UserCtrl.findAllUsers.bind(this))
  .get('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.findUserById.bind(this))
  .post('/', UserCtrl.createUser.bind(this))
  .post('/login', UserCtrl.login.bind(this))
  .patch('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.updateUser.bind(this))
  .delete('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.delUser.bind(this));

export default userRouter;

import Router from 'koa-router';
import { UserCtrl } from '../controllers';
import { auth } from './auth';

const userRouter = new Router({
	prefix: '/user'
});

userRouter
.get('/', UserCtrl.findAllUsers.bind(this))
.get('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.findUserById.bind(this))
.post('/', UserCtrl.createUser.bind(this))
.post('/login', UserCtrl.login.bind(this))
.patch('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.updateUser.bind(this))
.delete('/:id', auth, UserCtrl.checkIsMe.bind(this), UserCtrl.delUser.bind(this));

export default userRouter;

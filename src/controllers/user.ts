import { Context } from 'koa';
import { UserModel } from '../models';

class UserCtrl {
  /**
   * 查询所有用户
   */
  async findAllUsers(ctx: Context) {
    const users = await UserModel.find({});
    ctx.body = users;
  }
}

export default new UserCtrl();
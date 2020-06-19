import { Context } from 'koa';
import { UserModel } from '../models';

class UserCtrl {
  /**
   * 查询所有用户
   * @param ctx
   */
  async findAllUsers(ctx: Context) {
    const users = await UserModel.find({});
    ctx.body = users;
  }

  /**
   * 创建新用户
   * @param ctx
   */
  async createUser(ctx: Context) {
    console.log(ctx.request.body)
  }
}

export default new UserCtrl();
import { Context } from 'koa';
import { UserModel } from '../models';

class UserCtrl {
	/**
	 * 查询所有用户
	 * @param ctx
	 */
	async findAllUsers(ctx: Context) {
		const users = await UserModel.find().select('-password');
		ctx.body = users;
	}

	/**
	 * 查询某个用户的信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findUserById(ctx: Context) {
		const { id } = ctx.params;
		const user = await UserModel.findById(id).select('account username password');
		ctx.body = user;
	}

	/**
	 * 创建新用户
	 * @param ctx
	 */
	async createUser(ctx: Context) {
		ctx.verifyParams({
			username: { type: 'string', required: true },
			password: { type: 'string', required: true },
			account: { type: 'string', required: true }
		});
		const user = await new UserModel(ctx.request.body).save();
		ctx.body = user;
	}

	/**
	 * 更新用户信息
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateUser(ctx: Context) {
		ctx.verifyParams({
			username: { type: 'string', required: false },
			password: { type: 'string', required: false },
			account: { type: 'string', required: false }
		});
		const { id } = ctx.params;
		const user = await UserModel.findByIdAndUpdate(id, ctx.request.body);
		ctx.body = user;
	}

	/**
	 * 删除某个用户
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delUser(ctx: Context) {
		const { id } = ctx.params;
		const user = await UserModel.findByIdAndRemove(id);
		ctx.body = user;
	}
}

export default new UserCtrl();

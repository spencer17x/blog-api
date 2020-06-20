import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models';
import { jwtSecret } from '../config';

class UserCtrl {
	/**
	 * 获取所有用户
	 * @param ctx
	 */
	async findAllUsers(ctx: Context) {
		const users = await UserModel.find().populate('articles').select('-password');
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
			account: { type: 'string', required: false },
			password: { type: 'string', required: false },
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

	/**
	 * 用户登录以获取token
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async login(ctx: Context) {
		ctx.verifyParams({
			username: { type: 'string', required: false },
			account: { type: 'string', required: true },
			password: { type: 'string', required: true },
		});
		const { account, password } = ctx.request.body;
		const user = await UserModel.findOne({ account, password });
		if (!user) {
			ctx.throw(412, '用户账号或者密码输入错误');
		}
		const token = jwt.sign({
			account, password, _id: user._id
		}, jwtSecret, {
			expiresIn: '1d'
		});
		ctx.body = {
			token
		};
	}

	/**
	 * 检查当前操作是否有权限、只能获取自己的相关信息
	 * @param {Application.Context} ctx
	 */
	async checkIsMe(ctx: Context, next: Next) {
		if (ctx.state.user._id !== ctx.params.id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}
}

export default new UserCtrl();

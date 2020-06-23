import { Context, Next } from 'koa';
import { CategoryModel, UserModel } from '../models';

class CategoryCtrl {
	/**
	 * 获取所有类目
	 * @param {Application.Context} ctx
	 */
	async findAllCategories(ctx: Context) {
		const categories = await CategoryModel.find();
		ctx.body = categories;
	}

	/**
	 * 获取某个类目信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findCategoryById(ctx: Context) {
		const category = await CategoryModel.findById(ctx.params.id);
		ctx.body = category;
	}

	/**
	 * 添加标签
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async createCategory(ctx: Context) {
		ctx.verifyParams({
			name: { type: 'string', required: true }
		});
		const category = await new CategoryModel(ctx.request.body).save();
		const me:any = await UserModel.findById(ctx.state.user._id);
		me.categories.push(category._id);
		me.save();
		ctx.body = category;
	}

	/**
	 * 删除某个标签
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delCategory(ctx: Context) {
		const category = await CategoryModel.findByIdAndRemove(ctx.params.id);
		ctx.body = category;
	}

	/**
	 * 更新某个标签
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async updateCategory(ctx: Context) {
		const category = await CategoryModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.body = category;
	}

  /**
   * 检查用户是否有这个权限操作
   * @param ctx
   */
	async checkIsMe(ctx: Context, next: Next) {
	  const user: any = await UserModel.findById(ctx.state.user._id);
	  if (!user.categories.includes(ctx.params.id)) {
      ctx.throw(412, '没有操作权限');
    }
    await next()
  }
}

export default new CategoryCtrl();

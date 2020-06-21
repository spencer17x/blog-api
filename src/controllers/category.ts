import { Context } from 'koa';
import { CategoriesModel } from '../models';

class CategoryCtrl {
	/**
	 * 获取所有类目
	 * @param {Application.Context} ctx
	 */
	async findAllCategories(ctx: Context) {
		const categories = await CategoriesModel.find();
		ctx.body = categories;
	}

	/**
	 * 获取某个类目信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findCategoryById(ctx: Context) {
		const category = await CategoriesModel.findById(ctx.params.id);
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
		const category = await new CategoriesModel(ctx.request.body).save();
		ctx.bodt = category;
	}

	/**
	 * 删除某个标签
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delCategory(ctx: Context) {
		const category = await CategoriesModel.findByIdAndRemove(ctx.params.id);
		ctx.bodt = category;
	}

	/**
	 * 更新某个标签
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async updateCategory(ctx: Context) {
		const category = await CategoriesModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.bodt = category;
	}
}

export default new CategoryCtrl();

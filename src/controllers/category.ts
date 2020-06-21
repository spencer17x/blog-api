import { Context } from 'koa';
import { CategoryModel } from '../models';

class CategoryCtrl {
	/**
	 * 获取所有类目
	 * @param {Application.Context} ctx
	 */
	async findAllCategories(ctx: Context) {
		const categories = await CategoryModel.find().populate('articles');
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
	 * 将文章添加到对应的类目中
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async addArticleToCategory(ctx: Context) {
		const { categoryId, articleId } = ctx.params;
		const category: any = await CategoryModel.findById(categoryId);
		category.articles.push(articleId);
		category.save();
		ctx.body = category;
	}

	/**
	 * 将文章从对应的类目中删除
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delArticleFromCategory(ctx: Context) {
		const { categoryId, articleId } = ctx.params;
		const category: any = await CategoryModel.findById(categoryId);
		const index = category.articles.findIndex(id => id.toString() === articleId);
		if (index > -1) {
			category.articles.splice(index, 1);
			category.save();
		}
		ctx.body = category;
	}
}

export default new CategoryCtrl();

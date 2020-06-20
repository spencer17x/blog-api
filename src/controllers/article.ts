import { Context } from 'koa';
import { ArticleModel, UserModel } from '../models';

class ArticleCtrl {
	/**
	 * 获取所有的文章
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findAllArticles(ctx: Context) {
		const articles = await ArticleModel.find();
		ctx.body = articles;
	}

	/**
	 * 创建文章
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async createArticle(ctx: Context) {
		ctx.verifyParams({
			title: { type: 'string', required: true },
			subtitle: { type: 'string', required: false },
			description: { type: 'string', required: false },
			content: { type: 'string', required: false }
		});
		const article = await new ArticleModel(ctx.request.body).save();
		const me: any = await UserModel.findById(ctx.state.user._id);
		me.articles.push(article._id);
		me.save();
		ctx.body = article;
	}

	/**
	 * 获取某篇文章信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findArticleById(ctx: Context) {
		const article = await ArticleModel.findById(ctx.params.id);
		ctx.body = article;
	}

	/**
	 * 更新某篇文章信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async updateArticle(ctx: Context) {
		const article = await ArticleModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.body = article
	}

	/**
	 * 删除某篇文章
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delArticle(ctx: Context) {
		const article = await ArticleModel.findByIdAndRemove(ctx.params.id);
		ctx.body = article
	}
}

export default new ArticleCtrl();

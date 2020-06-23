import { Context, Next } from 'koa';
import { ArticleModel, CategoryModel, UserModel } from '../models';

class ArticleCtrl {
	/**
	 * 获取所有的文章
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async findAllArticles(ctx: Context) {
		const articles = await ArticleModel.find().populate('author', '-articles -account');
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
		const article = await new ArticleModel({
      ...ctx.request.body,
      author: ctx.state.user._id
    }).save();
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
		const article = await ArticleModel.findById(ctx.params.id).populate('author', '-articles -account');
		ctx.body = article;
	}

	/**
	 * 更新某篇文章信息
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async updateArticle(ctx: Context) {
		const article = await ArticleModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.body = article;
	}

	/**
	 * 删除某篇文章
	 * @param {Application.Context} ctx
	 * @returns {Promise<void>}
	 */
	async delArticle(ctx: Context) {
		const article = await ArticleModel.findByIdAndRemove(ctx.params.id);
		ctx.body = article;
	}

  /**
   * 权限校验
   * @param ctx
   */
	async checkIsMe(ctx: Context, next: Next) {
    const article: any = await ArticleModel.findById(ctx.params.id);
    if (article.author.toString() !== ctx.state.user._id) {
      ctx.throw(412, '没有权限')
    }
    await next();
  }
}

export default new ArticleCtrl();

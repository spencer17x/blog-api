import { Context, Next } from 'koa';
import { ArticleModel, CategoryModel, UserModel } from '../models';

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
		const category = await CategoryModel.findById(ctx.params.id).populate('articles');
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

  /**
   * 将文章添加到类目中
   * @param ctx
   */
  async addArticleToCategory(ctx: Context) {
    const category: any = await CategoryModel.findById(ctx.params.categoryId);
    if (category.articles.map((v: any) => v.toString()).includes(ctx.params.articleId)) {
      ctx.throw(412, '请勿重复添加')
    }
    category.articles.push(ctx.params.articleId);
    category.save();
    ctx.body = category;
  }

  /**
   * 将文章从类目中移除
   * @param ctx
   */
  async delArticleFromCategory(ctx: Context) {
    const category: any = await CategoryModel.findById(ctx.params.categoryId);
    const index = category.articles.findIndex((articleId: any) => articleId.toString() === ctx.params.articleId)
    if (index === -1) {
      ctx.throw(412, '该类目下无该文章');
    }
    category.articles.splice(index, 1);
    category.save();
    ctx.body = category;
  }

  /**
   * 校验权限
   * @param ctx
   */
  async checkOwner(ctx: Context, next: Next) {
    const article: any = await ArticleModel.findById(ctx.params.articleId);
    if (article.author.toString() !== ctx.state.user._id) {
      ctx.throw(412, '没有权限')
    }
    await next();
  }
}

export default new CategoryCtrl();

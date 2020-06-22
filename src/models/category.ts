import { Schema, model } from 'mongoose';

interface Category {
  name: string;
  articles: string[];
}

const categorySchema = new Schema<Category>({
	__v: { type: String, select: false },
	name: { type: String, required: true },
	articles: { type: [{ type: Schema.Types.ObjectId, ref: 'article' }], required: false }
});

export default model('category', categorySchema, 'category');

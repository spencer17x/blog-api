import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
	__v: { type: String, select: false },
	name: { type: String, required: true },
	articles: { type: [{ type: Schema.Types.ObjectId, ref: 'article' }], required: false }
});

export default model('category', categorySchema, 'category');

import { Schema, model } from 'mongoose';

const ArticleSchema = new Schema({
	title: { type: String, required: true },
	subtitle: { type: String, required: false },
	author: { type: Schema.Types.ObjectId, required: false, ref: 'user' },
	description: { type: String, required: false },
	content: { type: String, required: false }
});

export default model('article', ArticleSchema, 'article');

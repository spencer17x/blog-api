import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
	__v: { type: String, select: false },
	name: { type: String, required: true }
});

export default model('category', categorySchema, 'category');

import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  __v: { type: String, select: false },
  name: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user' }
});

export default model('category', categorySchema, 'category');

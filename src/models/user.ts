import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	__v: { type: String, select: false },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false }
});

export default model('user', UserSchema, 'user');

import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	__v: { type: String, select: false },
	account: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true }
});

export default model('user', UserSchema, 'user');

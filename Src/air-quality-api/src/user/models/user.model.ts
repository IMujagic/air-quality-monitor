import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  city: string;
  email: string;
  password: string;
}
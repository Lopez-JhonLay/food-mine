import { model, Schema } from "mongoose";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  isAdmin: boolean;
}

export const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true
});

export const userModel = model<User>('user', userSchema);
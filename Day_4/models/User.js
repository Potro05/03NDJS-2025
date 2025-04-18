import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
  createdAt:{ type: Date, default: Date.now }
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};
export default model('User', userSchema);

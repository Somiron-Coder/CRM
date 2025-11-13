import mongoose, { Document, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'employee'], default: 'employee' },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password as string, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return bcryptjs.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

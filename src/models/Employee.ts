import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  joinDate: Date;
  status: 'active' | 'inactive' | 'on-leave';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive', 'on-leave'], default: 'active' },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);

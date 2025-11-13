import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
  status: 'active' | 'inactive' | 'prospect';
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    notes: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'prospect'], default: 'prospect' },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

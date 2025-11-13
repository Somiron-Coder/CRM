import mongoose, { Document, Schema } from 'mongoose';

export interface IRevenue extends Document {
  clientId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  invoiceNumber: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RevenueSchema: Schema = new Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String },
    invoiceNumber: { type: String, unique: true, required: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Revenue || mongoose.model<IRevenue>('Revenue', RevenueSchema);

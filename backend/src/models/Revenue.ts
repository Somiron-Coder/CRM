import { Schema, model, Document } from 'mongoose';

export interface IRevenue extends Document {
  project: Schema.Types.ObjectId;
  amount: number;
  type: 'project-payment' | 'retainer' | 'consultation' | 'other';
  date: Date;
  status: 'pending' | 'received' | 'overdue';
  description: string;
}

const revenueSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['project-payment', 'retainer', 'consultation', 'other'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'received', 'overdue'],
    default: 'pending',
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Revenue = model<IRevenue>('Revenue', revenueSchema);
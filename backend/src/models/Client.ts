import { Schema, model, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  assignedTo: Schema.Types.ObjectId;
  status: 'active' | 'inactive' | 'prospect';
  projects: Schema.Types.ObjectId[];
}

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'prospect'],
    default: 'prospect',
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
}, {
  timestamps: true,
});

export const Client = model<IClient>('Client', clientSchema);
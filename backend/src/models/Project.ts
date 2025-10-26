import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  client: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  team: Schema.Types.ObjectId[];
  tasks: {
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo: Schema.Types.ObjectId;
    dueDate: Date;
  }[];
}

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'on-hold'],
    default: 'planned',
  },
  team: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  tasks: [{
    description: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    dueDate: Date,
  }],
}, {
  timestamps: true,
});

export const Project = model<IProject>('Project', projectSchema);
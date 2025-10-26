import { Schema, model, Document } from 'mongoose';

export interface IEmployee extends Document {
  userId: Schema.Types.ObjectId;
  position: string;
  department: string;
  salary: number;
  joinDate: Date;
  skills: string[];
  projects: Schema.Types.ObjectId[];
}

const employeeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  skills: [{
    type: String,
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
}, {
  timestamps: true,
});

export const Employee = model<IEmployee>('Employee', employeeSchema);
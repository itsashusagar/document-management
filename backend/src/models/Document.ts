import mongoose from 'mongoose';

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(DocumentStatus),
    default: DocumentStatus.PENDING,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvalDate: {
    type: Date,
  },
  comments: {
    type: String,
  },
}, {
  timestamps: true,
});
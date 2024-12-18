export enum UserRole {
  UPLOADER = 'UPLOADER',
  APPROVER = 'APPROVER'
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Document {
  _id: string;
  title: string;
  fileUrl: string;
  status: DocumentStatus;
  uploadedBy: User;
  approvedBy?: User;
  approvalDate?: Date;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}
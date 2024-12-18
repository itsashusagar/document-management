import { Document, DocumentStatus } from '../models/Document';
import { UserRole } from '../models/User';

export class DocumentService {
  static async uploadDocument(title: string, fileUrl: string, userId: string) {
    const document = new Document({
      title,
      fileUrl,
      uploadedBy: userId,
    });

    return await document.save();
  }

  static async approveDocument(documentId: string, userId: string, status: DocumentStatus, comments?: string) {
    const document = await Document.findById(documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    document.status = status;
    document.approvedBy = userId;
    document.approvalDate = new Date();
    document.comments = comments;

    return await document.save();
  }

  static async getDocuments(userId: string, role: UserRole) {
    const query = role === UserRole.UPLOADER
      ? { uploadedBy: userId }
      : {};

    return await Document.find(query)
      .populate('uploadedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });
  }
}
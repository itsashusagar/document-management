import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { DocumentService } from '../services/document.service';
import { UserRole } from '../models/User';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/upload',
  authenticate,
  authorize([UserRole.UPLOADER]),
  upload.single('file'),
  async (req, res) => {
    try {
      const { title } = req.body;
      const fileUrl = req.file.path;
      const document = await DocumentService.uploadDocument(
        title,
        fileUrl,
        req.user._id
      );
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.patch(
  '/:id/approve',
  authenticate,
  authorize([UserRole.APPROVER]),
  async (req, res) => {
    try {
      const { status, comments } = req.body;
      const document = await DocumentService.approveDocument(
        req.params.id,
        req.user._id,
        status,
        comments
      );
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get(
  '/',
  authenticate,
  async (req, res) => {
    try {
      const documents = await DocumentService.getDocuments(
        req.user._id,
        req.user.role
      );
      res.json(documents);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
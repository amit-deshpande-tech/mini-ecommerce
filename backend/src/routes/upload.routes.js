import express from 'express';
import protect from '../middlewares/auth.middlewares';
import { isAdmin } from '../middlewares/isadmin.middlewares';
import { uploadProductImage } from '../controllers/upload.controllers.js';

const router = express.Router();

router.post('/', protect, isAdmin, uploadProductImage);

export default router;

import multer from 'multer';
import { storage, fileFilter, limits } from '../config/multerConfig.js';

const upload = multer({
    storage,
    fileFilter,
    limits,
});

export default upload;

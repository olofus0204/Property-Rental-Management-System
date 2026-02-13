// src/routes/propertyManager.routes.js
import express from 'express';
import {
  createPropertyHandler,
  getPropertiesHandler,
  updatePropertyHandler,
  deletePropertyHandler,
  uploadPropertyImageHandler,
} from '../controllers/propertyManager.controller.js';
import { propertyValidator } from '../validators/propertyManager.validators.js';
import { upload } from '../utils/fileUpload.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Create property with validation
router.post('/', validate(propertyValidator.body), createPropertyHandler);

// Get all properties
router.get('/', getPropertiesHandler);

// Update property with validation
router.put('/:id', validate(propertyValidator.body), updatePropertyHandler);

// Delete property
router.delete('/:id', deletePropertyHandler);

// Upload property image
router.post('/:id/images', upload.single('image'), uploadPropertyImageHandler);

export default router;

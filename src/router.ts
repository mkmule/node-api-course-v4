import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { UPDATE_STATUS } from '@prisma/client';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputErrors,
  createUpdate,
);
router.put('/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').optional().isIn([UPDATE_STATUS.IN_PROGRESS, UPDATE_STATUS.SHIPPED, UPDATE_STATUS.DEPRECATED]),
  body('version').optional().isString(),
  handleInputErrors,
  updateUpdate,
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update point
 */
router.get('/update-point', () => {});
router.get('/update-point/:id', () => {});
router.put('/update-point/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {});
router.post('/update-point',
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString(),
  () => {});
router.delete('/update-point/:id', () => {});

export default router;

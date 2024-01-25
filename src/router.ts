import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { UPDATE_STATUS } from '@prisma/client';

const router = Router();

/**
 * Product
 */
router.get('/product', (req, res) => {
  res.json({ message: 'hello' });
});
router.get('/product/:id', () => {});
router.post('/product',
  body('name').isString(),
  handleInputErrors,
  (req, res) => {

  },
);
router.put('/product/:id',
  body('name').isString(),
  handleInputErrors,
  (req, res) => {

  },
);
router.delete('/product/:id', () => {});

/**
 * Update
 */
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn([UPDATE_STATUS.IN_PROGRESS, UPDATE_STATUS.SHIPPED, UPDATE_STATUS.DEPRECATED]),
  body('version').optional().isString(),
  handleInputErrors,
  () => {});
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  handleInputErrors,
  () => {});
router.delete('/update/:id', () => {});

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

import prisma from '../db';

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const userId = req.user.id;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((accumulator, product) => [...accumulator, ...product.updates], []);
  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const userId = req.user.id;

  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      belongsToId: userId,
    },
  });

  if (!product) {
    return res.json({ message: 'Not your product' });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};
export const updateUpdate = async (req, res) => {
  const userId = req.user.id;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((accumulator, product) => [...accumulator, ...product.updates], []);
  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    return res.json({ message: 'Not your update' });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req, res) => {
  const userId = req.user.id;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((accumulator, product) => [...accumulator, ...product.updates], []);
  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    return res.json({ message: 'Not your update' });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};

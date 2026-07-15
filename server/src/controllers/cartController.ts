import { Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const getOrCreateCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findById(cart._id).populate('items.product');
  }
  return cart;
};

export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const cart = await getOrCreateCart(req.user._id.toString());
  res.json(cart);
});

export const addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new AppError('Product ID is required', 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Not enough stock available', 400);
  }

  const cart = await getOrCreateCart(req.user._id.toString());
  const existingItem = cart!.items.find(
    (item) => item.product._id.toString() === productId,
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.stock < newQuantity) {
      throw new AppError('Not enough stock available', 400);
    }
    existingItem.quantity = newQuantity;
  } else {
    cart!.items.push({ product: product._id, quantity });
  }

  await cart!.save();
  const updatedCart = await Cart.findById(cart!._id).populate('items.product');
  res.status(201).json(updatedCart);
});

export const updateCartItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const { quantity } = req.body;
  const itemId = req.params.id;

  if (!quantity || quantity < 1) {
    throw new AppError('Quantity must be at least 1', 400);
  }

  const cart = await getOrCreateCart(req.user._id.toString());
  const item = cart!.items.find((i) => i._id?.toString() === itemId);

  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  const product = await Product.findById(item.product);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Not enough stock available', 400);
  }

  item.quantity = quantity;
  await cart!.save();

  const updatedCart = await Cart.findById(cart!._id).populate('items.product');
  res.json(updatedCart);
});

export const removeCartItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const cart = await getOrCreateCart(req.user._id.toString());
  const itemIndex = cart!.items.findIndex((i) => i._id?.toString() === req.params.id);

  if (itemIndex === -1) {
    throw new AppError('Cart item not found', 404);
  }

  cart!.items.splice(itemIndex, 1);
  await cart!.save();

  const updatedCart = await Cart.findById(cart!._id).populate('items.product');
  res.json(updatedCart);
});

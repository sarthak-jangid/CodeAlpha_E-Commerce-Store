import { Response } from 'express';
import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = item.product as unknown as {
      _id: string;
      title: string;
      price: number;
      image: string;
      stock: number;
    };

    if (product.stock < item.quantity) {
      throw new AppError(`Not enough stock for ${product.title}`, 400);
    }

    orderItems.push({
      product: product._id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      image: product.image,
    });

    totalPrice += product.price * item.quantity;

    await Product.findByIdAndUpdate(product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalPrice,
    status: 'pending',
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }

  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

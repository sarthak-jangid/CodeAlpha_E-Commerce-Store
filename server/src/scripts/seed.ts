import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { Product } from '../models/Product';

dotenv.config();

const products = [
  {
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 25,
  },
  {
    title: 'Smart Watch',
    description: 'Track fitness, receive notifications, and monitor health metrics.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 18,
  },
  {
    title: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning for daily runs.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 40,
  },
  {
    title: 'Leather Backpack',
    description: 'Durable leather backpack with laptop compartment and multiple pockets.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Fashion',
    stock: 15,
  },
  {
    title: 'Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe for fresh brews.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e7?w=500',
    category: 'Home',
    stock: 30,
  },
  {
    title: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with warm and cool light settings.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home',
    stock: 50,
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap included.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 60,
  },
  {
    title: 'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Sports',
    stock: 100,
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with rich bass and 12-hour playtime.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 35,
  },
  {
    title: 'Sunglasses',
    description: 'Polarized UV-protection sunglasses with lightweight metal frame.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Fashion',
    stock: 45,
  },
  {
    title: 'Plant Pot Set',
    description: 'Set of 3 ceramic plant pots in modern minimalist design.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    category: 'Home',
    stock: 20,
  },
  {
    title: 'Resistance Bands',
    description: 'Set of 5 resistance bands for home workouts and physical therapy.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
    category: 'Sports',
    stock: 75,
  },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded with sample products');
  process.exit(0);
};

seed();
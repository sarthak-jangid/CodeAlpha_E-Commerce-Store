import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService, getErrorMessage } from '../services/services';
import type { Product } from '../types';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        showToast(getErrorMessage(error), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, showToast]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'info');
      return;
    }

    if (!product) return;

    setAdding(true);
    try {
      await addToCart(product._id, quantity);
      showToast('Added to cart!', 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link to="/products" className="mb-6 inline-block text-primary hover:underline">
        ← Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium uppercase tracking-wide text-accent">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <p className="mt-2 text-sm text-slate-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {product.stock > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-slate-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAddToCart} loading={adding} size="lg">
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

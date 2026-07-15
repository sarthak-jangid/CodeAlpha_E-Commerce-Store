import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, getErrorMessage } from '../services/services';
import type { Product } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts({ limit: 4 });
        setProducts(data.products);
      } catch (error) {
        showToast(getErrorMessage(error), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [showToast]);

  const handleAddToCart = async (productId: string) => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'info');
      return;
    }

    setAddingId(productId);
    try {
      await addToCart(productId);
      showToast('Added to cart!', 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-blue-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Welcome to ShopEase
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Discover quality products at great prices. Shop smart, shop easy.
          </p>
          <Link to="/products" className="mt-8 inline-block">
            <Button size="lg" className="text-primary hover:bg-blue-50">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            addingId={addingId}
          />
        )}
      </section>
    </div>
  );
};

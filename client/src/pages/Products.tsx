import { useEffect, useState, useCallback } from 'react';
import { productService, getErrorMessage } from '../services/services';
import type { Product, Pagination } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [addingId, setAddingId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    productService.getCategories().then(({ data }) => setCategories(data)).catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await productService.getProducts({
        search: search || undefined,
        category: category !== 'all' ? category : undefined,
        page,
        limit: 12,
      });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  }, [search, category, page, showToast]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">All Products</h1>

      <div className="mb-6 space-y-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <>
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            addingId={addingId}
          />

          {pagination && pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-slate-600">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

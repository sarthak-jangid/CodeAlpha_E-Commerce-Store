import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  adding?: boolean;
}

export const ProductCard = ({ product, onAddToCart, adding }: ProductCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {product.category}
        </span>
        <Link to={`/products/${product._id}`}>
          <h3 className="mt-1 font-semibold text-slate-800 hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {onAddToCart && (
            <Button
              size="sm"
              onClick={() => onAddToCart(product._id)}
              loading={adding}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

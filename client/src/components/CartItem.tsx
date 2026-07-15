import type { CartItem as CartItemType } from '../types';
import { Button } from './Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  updating?: boolean;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  updating,
}: CartItemProps) => {
  const { product, quantity, _id } = item;

  return (
    <div className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{product.title}</h3>
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-200">
            <button
              onClick={() => onUpdateQuantity(_id, quantity - 1)}
              disabled={quantity <= 1 || updating}
              className="px-3 py-1 hover:bg-slate-100 disabled:opacity-50"
            >
              −
            </button>
            <span className="px-3 py-1 font-medium">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(_id, quantity + 1)}
              disabled={quantity >= product.stock || updating}
              className="px-3 py-1 hover:bg-slate-100 disabled:opacity-50"
            >
              +
            </button>
          </div>
          <Button variant="danger" size="sm" onClick={() => onRemove(_id)}>
            Remove
          </Button>
        </div>
      </div>
      <div className="text-right font-bold text-slate-800">
        ${(product.price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

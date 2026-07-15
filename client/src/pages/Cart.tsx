import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService, getErrorMessage } from '../services/services';
import { CartItem } from '../components/CartItem';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';

export const Cart = () => {
  const { cart, loading, updateQuantity, removeItem, refreshCart } = useCart();
  const [updating, setUpdating] = useState(false);
  const [placing, setPlacing] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const total =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) ?? 0;

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdating(true);
    try {
      await updateQuantity(itemId, quantity);
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeItem(itemId);
      showToast('Item removed from cart', 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      await orderService.createOrder();
      await refreshCart();
      showToast('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <EmptyState
          title="Your cart is empty"
          description="Browse our products and add items to your cart."
          action={
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              updating={updating}
            />
          ))}
        </div>

        <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2 border-b border-slate-200 pb-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <Button
            className="mt-6 w-full"
            size="lg"
            onClick={handlePlaceOrder}
            loading={placing}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

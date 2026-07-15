import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {  
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link to="/" className=" flex justify-center items-center gap-2 text-2xl font-bold text-primary">ShopEase
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-slate-600 hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="text-slate-600 hover:text-primary">
            Products
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="text-slate-600 hover:text-primary">
              Orders
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="hidden text-sm text-slate-600 hover:text-primary sm:block"
              >
                {user?.name}
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

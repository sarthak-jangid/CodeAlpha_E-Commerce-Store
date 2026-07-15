import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Link to="/" className="text-xl font-bold text-primary">
              ShopEase
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            {isAuthenticated ? (
              <Link to="/orders" className="hover:text-primary">
                Orders
              </Link>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="hover:text-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} ShopEase. Built for Full Stack Internship.
        </p>
      </div>
    </footer>
  );
};

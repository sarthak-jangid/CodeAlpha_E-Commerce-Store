import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-800">Page Not Found</h2>
      <p className="mt-2 text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Go Home</Button>
      </Link>
    </div>
  );
};

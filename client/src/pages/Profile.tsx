import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">My Profile</h1>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-slate-500">{user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium capitalize text-primary">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

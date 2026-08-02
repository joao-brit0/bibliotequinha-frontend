import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AdminBookCreatePage from './pages/AdminBookCreatePage';
import NotFoundPage from './pages/NotFoundPage';
import RequireAdminRoute from './routes/RequireAdminRoute';
import LoginPage from './pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard/books/new',
    element: (
      <RequireAdminRoute>
        <AdminBookCreatePage />
      </RequireAdminRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
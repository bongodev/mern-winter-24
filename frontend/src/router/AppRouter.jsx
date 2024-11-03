import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage, Layout, LoginPage, SignUpPage } from '../pages';
import { DashboardPage } from '../pages/admin';
import { SecureRoute } from './SecureRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'admin',
        children: [
          {
            index: true,
            element: (
              <SecureRoute>
                <div>Admin App</div>,
              </SecureRoute>
            ),
          },
          {
            path: 'profile',
            element: (
              <SecureRoute>
                <div>Admin Profile</div>,
              </SecureRoute>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <SecureRoute>
                <DashboardPage />,
              </SecureRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export function AppRouter({ children }) {
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

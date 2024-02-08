import { PublicLayout } from '../components/layout';
import { LoginPage, RegisterPage } from '../pages';

export const PublicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];

import { PublicLayout } from '../components/layout';
import { LoginPage, RegisterPage } from '../pages';
import { AuthWrapper } from './index';

export const PublicRoutes = [
  {
    element: (
      <AuthWrapper>
        <PublicLayout />
      </AuthWrapper>
    ),
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

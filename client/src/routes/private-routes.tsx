import { PrivateLayout } from '../components/layout';
import { HomePage } from '../pages';

export const PrivateRoutes = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

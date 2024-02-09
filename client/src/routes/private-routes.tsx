import { PrivateLayout } from '../components/layout';
import { HomePage, ChatPage } from '../pages';

export const PrivateRoutes = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chat/:roomId',
        element: <ChatPage />,
      },
    ],
  },
];

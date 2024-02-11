import { PrivateLayout } from '../components/layout';
import { AuthWrapper } from './index';
import { HomePage, ChatPage, AllRoomsPage, ProfilePage } from '../pages';

export const PrivateRoutes = [
  {
    path: '/',
    element: (
      <AuthWrapper>
        <PrivateLayout />
      </AuthWrapper>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chat/:roomId',
        element: <ChatPage />,
      },
      {
        path: 'all-rooms',
        element: <AllRoomsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
];

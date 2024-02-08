import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../routes';
import { ErrorPage } from '../pages';

export const Routes = () => {
  const router = createBrowserRouter([
    { errorElement: <ErrorPage /> },
    ...PublicRoutes,
    ...PrivateRoutes,
  ]);

  return <RouterProvider router={router} />;
};

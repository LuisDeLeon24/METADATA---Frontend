import { lazy } from 'react';
import PrivateRoute from '../components/common/PrivateRoute.jsx';

const Login = lazy(() => import('../pages/Auth'))
const LandingPage = lazy(() => import('../pages/LandingPage'))
const UnauthorizedModal = lazy(() => import('../components/common/UnauthorizedModal.jsx'));
const DashboardUserPage = lazy(() => import('../pages/DashboardUserPage'))
const LogsAdminPage = lazy(() => import('../pages/LogsPage.jsx'));
const DashboardSearcherPage = lazy(() => import('../pages/DashboardSearcherPage'));

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },

  {
    path: '/user',
    element: <PrivateRoute allowedRoles={['USER', 'ADMIN_ROLE', 'SEARCHER']} />,
    children: [
      { path: 'dashboard', element: <DashboardUserPage /> }
    ]
  },
  {
    path: '/admin',
    element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
    children: [
      { path: 'logs', element: <LogsAdminPage /> }
    ]
  },
  {
  path: '/searcher',
    element: <PrivateRoute allowedRoles={['SEARCHER']} />,
    children: [
      { path: 'dashboard', element: <DashboardSearcherPage /> }
    ]
  }
];

export default routes;
import { elements } from 'chart.js';
import { lazy } from 'react';

const Login = lazy(() => import('../pages/Auth'))
const LandingPage = lazy(()=> import('../pages/LandingPage'))
const UnauthorizedModal = lazy(() => import('../components/common/UnauthorizedModal.jsx'));
const DashboardUserPage = lazy(() => import('../pages/DashboardUserPage'))
const CasesPage = lazy(() => import('../pages/Cases.jsx'))
const PrivateRoute = lazy(() => import('../components/common/PrivateRoute.jsx'));
const DashboardAdmin = lazy(() => import('../pages/DashboardAdmin.jsx'));

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/Login', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },
  { path: '/admin/dashboard', element: <DashboardAdmin /> },
  { path: '/user/dashboard', element: <DashboardUserPage /> },
  { path: '/cases', element: <CasesPage /> }
];

export default routes;

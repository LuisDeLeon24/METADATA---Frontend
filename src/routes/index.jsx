import { lazy } from 'react';
import PrivateRoute from '../components/common/PrivateRoute.jsx';

const Login = lazy(() => import('../pages/Auth'))
const LandingPage = lazy(() => import('../pages/LandingPage'))
const UnauthorizedModal = lazy(() => import('../components/common/UnauthorizedModal.jsx'));
const DashboardUserPage = lazy(() => import('../pages/DashboardUserPage'))
const CasesPage = lazy(() => import('../pages/Cases.jsx'))
const DashboardAdmin = lazy(() => import('../pages/DashboardAdmin.jsx'));
const AnalysisImgPage = lazy(() => import('../pages/AnalysisImgPage'));
const AnalysisPdfPage = lazy(() => import('../pages/AnalysisPdfPage'));
const Report = lazy(() => import('../components/report/Report.jsx'))
const LogsAdminPage = lazy(() => import('../pages/LogsPage.jsx'));
const DashboardSearcherPage = lazy(() => import('../pages/DashboardSearcherPage'));

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },
  { path: '/admin/dashboard', element: <DashboardAdmin /> },
  { path: '/user/dashboard', element: <DashboardUserPage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/analyze', element: <AnalysisImgPage /> },
  { path: '/analyzePdf', element: <AnalysisPdfPage /> },
  {path: '/report', element: <Report/>},

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
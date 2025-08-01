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
const OsintPage = lazy(() => import('../pages/OsintPage.jsx'));
const UserListComponent = lazy(() => import('../pages/UsersPage.jsx'));

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },
  { path: '/admin/dashboard', element: <DashboardAdmin /> },
  { path: '/user/dashboard', element: <DashboardUserPage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/analyze', element: <AnalysisImgPage /> },
  { path: '/analyzePdf', element: <AnalysisPdfPage /> },
  { path: '/report', element: <Report /> },
  { path: '/admin/logs', element: <LogsAdminPage /> },
  { path: '/searcher/dashboard', element: <DashboardSearcherPage />},
  { path: '/osint', element: <OsintPage /> },
  { path: '/users', element: <UserListComponent /> }

  // {
  //   path: '/user',
  //   element: <PrivateRoute allowedRoles={['USER', 'ADMIN', 'SEARCHER']} />,
  //   children: [
  //     { path: 'dashboard', element: <DashboardUserPage /> }
  //   ]
  // },
  // {
  //   path: '/admin/logs/*',
  //   element: <PrivateRoute allowedRoles={['ADMIN']} />,
  //   children: [
  //     { path: '', element: <LogsAdminPage /> }
  //   ]
  // },
  // {
  //   path: '/searcher/dashboard/*',
  //   element: <PrivateRoute allowedRoles={['SEARCHER', 'ADMIN']} />,
  //   children: [
  //     { path: '', element: <DashboardSearcherPage /> }
  //   ]
  // }
];

export default routes;
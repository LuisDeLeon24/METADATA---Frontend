import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AboutPage from '../pages/LogsPage';

// Pages y componentes
const Login = lazy(() => import('../pages/Auth'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const UnauthorizedModal = lazy(() => import('../components/common/UnauthorizedModal'));
const DashboardUserPage = lazy(() => import('../pages/DashboardUserPage'));

// Importación correcta del PrivateRoute
const PrivateRoute = lazy(() => import('../components/common/PrivateRoute'));

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },
  { path: '/logs', element: <AboutPage /> },
  // Rutas protegidas — solo para usuarios con rol USER
  {
    path: '/user',
    element: <PrivateRoute allowedRoles={['USER']} />,
    children: [
      { path: 'dashboard', element: <DashboardUserPage /> },
    ]
  },

  // Rutas totalmente públicas (sin login)
    // Ejemplo ruta pública

  // Redirección por defecto
  { path: '*', element: <Navigate to="/" /> }
];

export default routes;

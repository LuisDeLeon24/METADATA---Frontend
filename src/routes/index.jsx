import { elements } from 'chart.js';
import { lazy } from 'react';

const Login = lazy(() => import('../pages/Auth'))
const UnauthorizedModal = lazy(() => import('../components/common/UnauthorizedModal.jsx'));
const PrivateRoute = lazy(() => import('../components/common/PrivateRoute.jsx'));


const routes = [
  { path: '/', element: <Login /> },
  { path: '/unauthorized', element: <UnauthorizedModal /> },
  
];

export default routes;

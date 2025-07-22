import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import Loading from './components/common/Loading';
import routes from './routes';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {element}
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
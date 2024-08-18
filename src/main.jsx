import { createRoot } from 'react-dom/client';
import { createHashRouter } from 'react-router-dom';
import Provider from './components/Provider';
import Layout from './components/Layout';
import App from './App';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import CartPage from './routes/CartPage';
import ErrorPage from './components/ErrorPage';
import './index.css';

const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <App />
        },
        {
          path: '/signup',
          element: <SignUp />
        },
        {
          path: '/signin',
          element: <SignIn />
        },
        {
          path: '/cart',
          element: <CartPage />
        }
      ],
    }
]);

createRoot(document.getElementById('root')).render(
  <Provider router={ router } />
)

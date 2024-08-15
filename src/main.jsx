import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import Provider from './components/Provider';
import Layout from './components/Layout';
import App from './App';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import CartPage from './routes/CartPage';
import './index.css';


const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
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
      ]
    }
]);

createRoot(document.getElementById('root')).render(
  <Provider router={ router } />
)

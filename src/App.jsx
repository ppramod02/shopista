import { useEffect, useState, useContext } from 'react';
import { auth } from './firebase';
import CartContext from './components/Context.jsx';
import products from '../public/products.js';
import ProductCard from './components/ProductCard.jsx';
import './App.css';

function App() {
  // Initialize the user state as an empty object.
  const [user, setUser] = useState({});

  useEffect(() => {
      // Function to retrieve the current authenticated user.
      function getUser() {
          // Get the current user from the auth object.
          const data = auth.currentUser;
          // Update the user state with the retrieved data.
          setUser(data);
      }

      // Call the getUser function to set the initial user state.
      getUser();

  // Empty dependency array ensures that this effect runs only once when the component mounts.
  }, []);

  return (
    <div className='app m-4'>
      { user && ( <p>Hello, { user.displayName }</p> )}

      <h1 className='mt-10 mb-4 text-2xl font-bold'>Explore Products</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        { products.map((product, key) => <ProductCard product={ product } key={ key } />) }
      </div>
    </div>
  )
}

export default App;

import { useEffect, useState } from 'react';
import { auth } from './firebase';
import InfiniteScroll from 'react-infinite-scroll-component';
import products from '../public/products.js';
import ProductCard from './components/ProductCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import './App.css';

const generateMoreProducts = (originalProducts, numCopies) => {
  const updatedProducts = [];

  for (let i = 0; i < numCopies; i++) {
    const increment = i * originalProducts.length;
    updatedProducts.push(...originalProducts.map(product => ({
      ...product,
      id: product.id + increment,
      name: `${product.name} ${increment + 1}`,
    })));
  }

  return updatedProducts;
};

function App() {
  const [user, setUser] = useState({});
  const [allProducts, setAllProducts] = useState(generateMoreProducts(products, 10));
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch more products
  const fetchMoreData = () => {
    setTimeout(() => {
      const nextIndex = displayedProducts.length;
      const nextProducts = allProducts.slice(nextIndex, nextIndex + 6);

      if (nextProducts.length === 0) {
        setHasMore(false);
        return;
      }
			
      setDisplayedProducts(prevProducts => [...prevProducts, ...nextProducts]);
    }, 500); // Simulate network delay
  };

  // Initialize user state
  useEffect(() => {
    function getUser() {
      const data = auth.currentUser;
      setUser(data);
    }
    getUser();
  }, [auth.currentUser]);

  return (
    <div className='app min-h-[110vh] m-4'>
      {user && (<p className='text-lg font-medium'>Hello, {user.displayName ?? 'user'}!</p>)}

      <h1 className='mt-10 mb-4 text-2xl font-bold'>Explore Products</h1>
      <InfiniteScroll
        dataLength={displayedProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {displayedProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id} // Use unique id for key
            />
          ))}

          {
            hasMore && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )
          }
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;

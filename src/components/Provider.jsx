import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import CartContext from './Context';

// The Provider component is responsible for setting up the CartContext and wrapping the RouterProvider component.
// It accepts a 'router' prop, which is passed to the RouterProvider.
export default function Provider({ router }) {
    // Initialize cartItems state to an empty array, and setCartItems function to update the state.
    const [cartItems, setCartItems] = useState([]);

    // Return the CartContext.Provider component with cartItems and setCartItems as its value.
    // This makes cartItems and setCartItems accessible to all components that consume this context.
    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {/* The RouterProvider component is used to handle routing in the app, and it is wrapped within the context provider */}
            <RouterProvider router={router}>
            </RouterProvider>
        </CartContext.Provider>
    )
}

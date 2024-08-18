import { useContext, useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import CartContext from "./Context";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { doc, getDoc } from "firebase/firestore";

export default function Navbar({ user }) {
    // Use the useContext hook to get the cartItems state from the CartContext
    const { cartItems, setCartItems } = useContext(CartContext);

    // Use the useState hook to create a state variable cartCount and initialize it to 0
    const [cartCount, setCartCount] = useState(0);

    async function handleSignOut() {
        // Log a message to the console when signing out
        console.log('signing out');

        try {
            // Call the signOut function with the auth object and await its response
            await signOut(auth);
            toast.success('Signed out successfully!');
        } catch (error) {
            // Log any errors that occur during the signOut process
            console.log(error);
        }
    }

    useEffect(() => {
        async function getCart() {
            const docSnap = await getDoc(doc(db, 'cart', auth.currentUser.uid));
            if(docSnap.exists() && docSnap.data().products) {
                setCartItems(docSnap.data().products);
            }
        }
        
        if(auth.currentUser) getCart();
    }, [ auth.currentUser ]); // this effect runs only when the auth state changes
    
    useEffect(() => {
        // Set the cartCount state to the length of the cartItems array
        setCartCount(cartItems.length);
        
    }, [ cartItems ]);   // this effect runs only when the cart state changes
    
    return (    
        <nav className='z-20 sticky top-0 flex border px-4 bg-white md:px-10 py-6 gap-2 md:gap-8'>
            <Toaster position='top-center' />
            <Link to='/' className='mr-auto'>
                <h1 className='text-3xl font-bold'>Shopista.</h1>
            </Link>
            <Link to='/cart'>
                <button className="relative rounded-full flex items-center gap-1 px-3 py-2">
                    <p className='font-medium'>Cart</p>
                    <AiOutlineShoppingCart fontSize='1.3rem' />   
                    {
                        (cartCount > 0) && 
                        (
                            <div className='absolute flex justify-center align-center h-[20px] aspect-[1/1] rounded-full bg-[#f66] right-0 top-0'>
                                <p className="text-white font-medium text-sm">{ cartCount }</p>
                            </div>
                        )
                    }
                </button>
            </Link>
            <div>
                {
                    user ? 
                    (
                        <button onClick={ handleSignOut } className="rounded-full flex items-center gap-2 bg-[#adf] px-3 py-2">
                            <p className='text-sm font-medium md:text-md'>Logout</p>
                        </button>
                    )
                    :
                    (
                        <Link to='/signin' className="rounded-full flex items-center gap-2 bg-[#adf] px-3 py-2">
                            <p className='text-sm font-medium md:text-md'>Sign In</p>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
}
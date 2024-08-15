import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import CartContext from "./Context";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar({ user }) {
    // Use the useContext hook to get the cartItems state from the CartContext
    const { cartItems } = useContext(CartContext);

    // Use the useState hook to create a state variable cartCount and initialize it to 0
    const [cartCount, setCartCount] = useState(0);

    async function handleSignOut() {
        // Log a message to the console when signing out
        console.log('signing out');

        try {
            // Call the signOut function with the auth object and await its response
            const data = await signOut(auth);
            // If the data is returned, do something with it (not implemented)
            if (data) {

            }
        } catch (error) {
            // Log any errors that occur during the signOut process
            console.log(error);
        }
    }

    useEffect(() => {
        // Set the cartCount state to the length of the cartItems array
        setCartCount(cartItems.length);

    }, [cartItems]); // this effect runs only when the cartItems state changes

    return (    
        <nav className='flex border px-4 md:px-10 py-6 gap-2 md:gap-8'>
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
import { useState, useContext, useEffect } from "react";
import CartContext from "./Context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-hot-toast";
import { TbHeart, TbHeartFilled, TbPlus } from "react-icons/tb";

export default function ProductCard({ product, className }) {
    // State to track whether the product is in the cart.
	const [inCart, setInCart] = useState(false);

	// State to track whether the product is liked.
	const [like, setLike] = useState(false);

	// Access cartItems and setCartItems from the CartContext.
	const { cartItems, setCartItems } = useContext(CartContext);

	// Function to toggle the product's presence in the cart.
	async function toggleCart() {
		if (!inCart) {
			// If the product is not in the cart, add it with a quantity of 1.
			setCartItems(cartItems => {
				// Check if there are already items in the cart.
				// If so, add the new product with quantity 1 to the existing items.
				// Otherwise, create a new array with just the new product.
				if (cartItems.length > 0) return [ ...cartItems, { ...product, quantity: 1 }];
				return [{ ...product, quantity: 1 }];
			});

			// If the user is authenticated, update the cart in Firestore.
			if (auth.currentUser) {
				// Get the current cart data from Firestore.
				const docSnap = await getDoc(doc(db, 'cart', auth.currentUser.uid));
				var prevData = [];
				if (docSnap.exists()) prevData = docSnap.data().products;

				// Update the Firestore document with the new product added.
				await updateDoc(doc(db, 'cart', auth.currentUser.uid), {
					products: [
						...prevData,
						{ ...product, quantity: 1 },
					]
				});
			}

			// Show a success message indicating the product was added to the cart.
			toast.success('Added to cart!');

			// Set the inCart state to true, indicating the product is now in the cart.
			setInCart(true);
		} else {
			// If the product is already in the cart, remove it.
			setCartItems(cartItems => {
				// Filter out the product from the cartItems array.
				return cartItems.filter(item => item.id !== product.id);
			});

			// If the user is authenticated, update the cart in Firestore.
			if (auth.currentUser) {
				// Get the current cart data from Firestore.
				const docSnap = await getDoc(doc(db, 'cart', auth.currentUser.uid));
				var prevData = [];
				if (docSnap.exists()) prevData = docSnap.data().products;

				// Update the Firestore document, removing the product from the cart.
				prevData = prevData.filter(item => item.id !== product.id);
				await updateDoc(doc(db, 'cart', auth.currentUser.uid), {
					products: prevData
				});
			}

			// Set the inCart state to false, indicating the product is no longer in the cart.
			setInCart(false);

			// Show a success message indicating the product was removed from the cart.
			toast.success('Removed from cart!');
		}
	}

	// useEffect hook to check if the product is already in the cart when the component mounts or when cartItems change.
	useEffect(() => {
		// Check if the product is already in the cart.
		// If the product is found in the cart, set inCart to true.
		if (cartItems.length > 0 && cartItems.filter(item => item.id === product.id).length !== 0) {
			setInCart(true);
		}
	}, [cartItems]); // The effect depends on cartItems and will run whenever cartItems changes.

    return (
        <div 
        className={`${className} overflow-hidden relative group flex flex-col bg-[#fcffff] justify-between px-4 py-4 gap-4 border rounded-xl shadow-lg`}>
            <div className='mt-auto group-hover:translate-y-[10px] transition-translate-y duration-500'>
                <img className='mx-auto max-h-[130px] px-6 py-4 light:mix-blend-multiply' src={ product.image } />
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <button onClick={ () => setLike(!like) }>
                        {
                            like ? 
                            <TbHeartFilled fontSize='1.5rem' color='#f88' />
                            :
                            <TbHeart fontSize='1.5rem' />
                        }
                    </button>
                </div>
                <div className='text-center'>
                    <p className='text-xs text-green-700 line-through'>
                        ₹{ new Intl.NumberFormat('en-IN').format(product.price) }
                    </p> 
                    <p className='font-semibold'>
                        ₹{ new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3 }).format(product.price * (1 - product.discount)) }
                    </p>
                </div>
                <div>
                    <button className='relative' onClick={ toggleCart }>
                        <TbPlus fontSize='0.6rem' strokeWidth='4' className={`${ inCart ? 'cart-add' : 'cart-remove' } absolute left-[38%] top-[20%]`} />
                        <AiOutlineShoppingCart fontSize='1.5rem' />    
                    </button>                 
                </div>

            </div>
            <div className='absolute self-center py-1 opacity-0 top-0 translate-y-[-20px] w-full bg-slate-800 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity-translate-y duration-300'>
                <p className='text-center text-white font-bold'>{ product.name }</p>
            </div>
        </div>
    )
}
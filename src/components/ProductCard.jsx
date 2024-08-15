import { useState, useContext, useEffect } from "react";
import CartContext from "./Context";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbShoppingCartPlus, TbHeart, TbHeartFilled, TbShoppingCartMinus, TbShoppingCart } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductCard({ product }) {
    // State to track whether the product is in the cart.
    const [inCart, setInCart] = useState(false);
    // State to track whether the product is liked.
    const [like, setLike] = useState(false);
    // Access cartItems and setCartItems from the CartContext.
    const { cartItems, setCartItems } = useContext(CartContext);

    // Function to toggle the product's presence in the cart.
    function toggleCart() {
        // If the product is not in the cart, add it with a quantity of 1.
        if (!inCart) {
            setCartItems(cartItems => [...cartItems, { ...product, quantity: 1 }]);
        } 
        // If the product is already in the cart, remove it.
        else {
            setCartItems(cartItems => {
                return cartItems.filter(item => item.id !== product.id);
            });
        }
        // Toggle the inCart state to reflect the product's new status.
        setInCart(inCart => !inCart);
    }

    // useEffect hook runs when the component mounts.
    useEffect(() => {
        // Check if the product is already in the cart.
        if (cartItems.filter(item => item.id === product.id).length !== 0) {
            // If the product is found in the cart, set inCart to true.
            setInCart(inCart => !inCart);
        }
    // Empty dependency array ensures this effect runs only once when the component mounts.
    }, []);

    return (
        <div className='overflow-hidden relative group flex flex-col bg-[#fcffff] justify-between px-4 py-4 gap-4 border rounded-xl shadow-lg'>
            <div className='mt-auto group-hover:translate-y-[10px] transition-translate-y duration-500'>
                <img className='mx-auto max-h-[130px] px-6 py-4 mix-blend-multiply' src={ product.image } />
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
                        <div className={`${ inCart ? 'cart-add' : 'cart-remove' } absolute w-[6px] h-[1.5px] rounded-full left-[47%] top-[36%] bg-black`}></div>
                        <div className={`${ inCart ? 'cart-add' : 'cart-remove' } absolute w-[1.5px] h-[6px] rounded-full left-[57%] top-[27%] bg-black rotate`}></div>
                        <AiOutlineShoppingCart fontSize='1.5rem' />    
                    </button>                 
                </div>

            </div>
            <div className='absolute self-center py-1 opacity-0 top-0 translate-y-[-20px] bg-gray-600 w-full group-hover:opacity-100 group-hover:translate-y-0 transition-opacity-translate-y duration-300'>
                <p className='text-white text-center'>{ product.name }</p>
            </div>
        </div>
    )
}
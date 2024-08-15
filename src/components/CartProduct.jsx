import { useState, useContext, useEffect } from "react";
import CartContext from "./Context";
import { TbHeart, TbHeartFilled, TbMinus, TbPlus, TbX } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartProduct({ product }) {
    // Import the setCartItems function from the CartContext using useContext.
    const { setCartItems } = useContext(CartContext);

    // Function to increase the quantity of a specific product in the cart.
    function increaseQuantity() {
        // Update the cartItems state using setCartItems.
        setCartItems((items) => 
            // Iterate over each item in the cart.
            items.map(item => 
                // If the item's id matches the product's id, increase its quantity by 1.
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    // Function to decrease the quantity of a specific product in the cart.
    function decreaseQuantity() {
        // Update the cartItems state using setCartItems.
        setCartItems((items) => 
            // Iterate over each item in the cart.
            items.map(item => 
                // If the item's id matches the product's id, decrease its quantity by 1.
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            )
            // Filter out any items that have a quantity of 0 (effectively removing them from the cart).
            .filter(item => item.quantity !== 0)
        );
    }

    // Function to delete a specific product from the cart.
    function deleteItem() {
        // Update the cartItems state using setCartItems.
        setCartItems(items => 
            // Filter out the item that matches the product's id, removing it from the cart.
            items.filter(item => item.id !== product.id)
        );
    }

    return (
        <div className='grow max-w-[25rem] overflow-hidden relative flex bg-[#fcffff] justify-between p-4 gap-4 border rounded-xl shadow-lg'>
            <div className='z-10 absolute flex justify-center items-center h-[30px] aspect-[1/1] rounded-full bg-[#f44] right-[-5px] top-[-5px]'>
                <p className="text-white font-medium text-sm">{ product.quantity }</p>
            </div>
            <div className='mx-auto'>
                <img className='object-contain h-[6rem] p-4 mix-blend-multiply' src={ product.image } />
            </div>
            <div className='flex flex-col w-40'>
                <div className='whitespace-nowrap rounded-t-xl py-1'>
                    <p className='font-bold text-sm'>{ product.name }</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-xl'>
                        ₹{ new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3 }).format(product.price * (1 - product.discount)) }
                    </p>
                    <p className='text-xs font-medium text-red-700 line-through'>
                        ₹{ new Intl.NumberFormat('en-IN').format(product.price) }
                    </p>
                </div>
                <div className='mt-auto flex justify-between items-center'>
                    <div>
                        <button onClick={ increaseQuantity }>
                            <TbPlus fontSize='1.5rem' />
                        </button>
                    </div>
                    <div>
                        <button onClick={ decreaseQuantity }>
                            <TbMinus fontSize='1.5rem' />    
                        </button>                 
                    </div>
                    <div>
                        <button onClick={ deleteItem }>
                            <TbX fontSize='1.5rem' />    
                        </button>                 
                    </div>

                </div>
            </div>
        </div>
    )
}
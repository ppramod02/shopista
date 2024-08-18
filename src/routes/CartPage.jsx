import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../components/Context";
import CartProduct from "../components/CartProduct";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function CartPage() {
   // Import the CartContext using useContext to access cartItems.
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // Initialize the state variables to keep track of subtotal, discount, and total.
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    async function handleCheckout() {
        try {
            if(auth.currentUser) {
                setCartItems([]);
                await updateDoc(doc(db, 'cart', auth.currentUser.uid), { products: [] });
                navigate('/');
                toast.success('Thank you for shopping!');
            } else {
                toast.error('You need to login first');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect hook runs whenever cartItems changes.
    useEffect(() => {
        // Calculate the subtotal by summing up the price * quantity of each item in the cart.
        const sub = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        // Format the subtotal using the Indian number format and set it to the subtotal state.
        setSubtotal(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(sub));

        // Calculate the total discount by summing up discount * price * quantity for each item.
        const dis = cartItems.reduce((total, item) => total + item.discount * item.price * item.quantity, 0);
        // Format the discount using the Indian number format and set it to the discount state.
        setDiscount(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(dis));

        // Calculate the total amount by summing up (1 - discount) * price * quantity for each item.
        const tot = cartItems.reduce((total, item) => total + (1 - item.discount) * item.price * item.quantity, 0);
        // Format the total using the Indian number format and set it to the total state.
        setTotal(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(tot));

        // Dependencies array ensures that this effect runs whenever cartItems changes.
    }, [cartItems]);

    
    return (
        <div className='m-4 flex flex-col md:flex-row gap-4'>
            <div className='flex flex-wrap items-start justify-center md:justify-start gap-2 md:gap-6'>
                { cartItems.length ? cartItems.map((product, key) => <CartProduct product={ product } key={ key } />) : (
                    <h4 className='text-xl font-medium'>Your cart is empty.</h4>
                ) }
            </div>

            <div className='h-full md:ml-auto md:min-w-[30rem] flex flex-col p-4 gap-2 border rounded-xl shadow-lg'>
                <h2 className='mb-2 text-xl font-semibold'>Cart Summary</h2>
                <div>
                    { 
                        cartItems.map((item, key) => <ItemOverview item={ item } key={ key } />) 
                    }
                </div>
                <hr className='my-4' />
                <div className='flex items-center'>
                    <p className='mr-auto'>Subtotal</p>
                    <p>₹{ subtotal }</p>
                </div>
                <div className='flex gap-4 items-center font-semibold'>
                    <p className='mr-auto'>Total (after discount)</p>
                    <p><span className='mr-2 text-xs text-red-800'>(-₹{ discount })</span>₹{ total }</p>
                </div>
                <div>
                    <button onClick={ handleCheckout } className='float-right font-medium rounded-full flex items-center gap-2 bg-[#adf] px-3 py-2'>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}

function ItemOverview({ item }) {
    return (
        <div className='flex gap-4 items-center'>
            <p className=''>{ item.name }</p>
            <p className='mr-auto text-sm text-slate-800'>x { item.quantity }</p>
            <p>₹ { item.price * item.quantity }</p>
        </div>
    )
}
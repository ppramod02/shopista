import { useState, useEffect } from "react";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdChevronRight } from "react-icons/md";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function SignIn() {
    const navigate = useNavigate(); // React Router's hook for programmatic navigation.

	function validate(values) {
		const errors = {};
		
		// Check if the email field is empty.
		if (!values.email) {
			errors.email = 'required';
		} 
		// Validate the email format using a regular expression.
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'invalid email address';
		}

		return errors; // Return any validation errors found.
	}

	async function handleSubmit(values, setSubmitting) {
		try {
			// Attempt to sign in the user with the provided email and password.
			const data = await signInWithEmailAndPassword(auth, values.email, values.password);
			
			// Display a success message upon successful sign-in.
			toast.success("Signed in successfully!");

			// Navigate to the home page upon successful sign-in.
			navigate('/');
			
			// Stop the form submission process after a short delay.
			setTimeout(() => {
				setSubmitting(false);
			}, 400);
		} catch (error) {
			// Display an error message if sign-in fails.
			toast.error('Some error occurred');

			// Handle specific authentication errors.
			if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
				console.log('invalid user credentials'); // Log invalid user credentials error.
			} else {
				console.log('some error occurred during sign up'); // Log any other errors during sign-up.
			}
		}
	}

    return (
        <div style={ bg } className='signup flex justify-center items-center h-[85vh]'>
            <Toaster position='bottom-right' />
            <div className='flex flex-col p-20 bg-transparent backdrop-blur-sm border rounded-xl'>
                <h1 className='text-2xl font-bold mb-6'>Sign In</h1>
                <Formik
                initialValues={{ email: '', password: '' }}
                validate={ values => validate(values) }
                onSubmit={ (values, { setSubmitting }) => handleSubmit(values, setSubmitting) }
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-sm text-slate-400'>Email</label>
                            <input 
                            id='email' 
                            placeholder='koala@gmail.com' 
                            className='px-4 py-1 rounded border focus:outline-brand' 
                            type='email' 
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            required />
                            <span className='text-xs text-red-700'>{errors.email && touched.email && errors.email}</span>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password' className='text-sm text-slate-400'>Password</label>
                            <input 
                            id='password' 
                            placeholder='•••••••' 
                            className='px-4 py-1 rounded border focus:outline-brand' 
                            type='password'
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} 
                            autoComplete='true'
                            required />
                            <span className='ml-auto text-xs text-red-700'>{errors.password && touched.password && errors.password}</span>
                        </div>
                        <div>
                            <button 
                            type='submit' 
                            className="w-[100%] rounded flex items-center justify-center gap-2 bg-brand px-3 py-2"
                            disabled={isSubmitting}>
                                <p className='font-medium'>Sign In</p>
                                <MdChevronRight />
                            </button>
                        </div>
                    </form>
                )}
                </Formik>
                <p className='mt-2 text-sm'>New here? <Link to='/signup' className='text-[#66f] underline'>Sign up</Link></p>
            </div>
        </div>
    )
}

const bg = {
    background: 'radial-gradient(circle at top left,#EDF8FF 25%, transparent 26%),radial-gradient(circle at bottom right,transparent 19%,#EDF8FF 20%, #EDF8FF 25%, transparent 21%, transparent 100%),radial-gradient(circle at bottom left,transparent 19%,#EDF8FF 20%, #EDF8FF 25%, transparent 26%),radial-gradient(circle at top right, #EDF8FF 25%, transparent 26%)',
    backgroundSize: '3rem 3rem',
    backgroundColor: '#ffffff',
    opacity: 1,
};
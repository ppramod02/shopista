import { useState, useEffect } from "react";
import { Formik } from "formik";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { MdChevronRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
    const navigate = useNavigate(); // React Router's hook for navigating programmatically.

	// Function to validate the input values.
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

		// Check if the password field is empty.
		if (!values.password) {
			errors.password = 'required';
		} 
		// Ensure the password is at least 8 characters long.
		else if (values.password.length < 8) {
			errors.password = 'min. 8 characters required';
		}

		return errors; // Return any validation errors found.
	}

	// Function to handle form submission for creating a new user.
	async function handleSubmit(values, setSubmitting) {
		try {
			// Attempt to create a new user with the provided email and password.
			const data = await createUserWithEmailAndPassword(auth, values.email, values.password);
			
			if (data) {
				// If the user is successfully created, update their profile with the provided display name.
				await updateProfile(data.user, {
					displayName: values.name,
				});

				// Create a new document in the 'cart' collection for the user, initializing with an empty products array.
				await setDoc(doc(db, 'cart', data.user.uid), {
					products: [],
				});

				// Display a success toast message after the user is created.
				toast.success('User created successfully!');

				// Navigate to the home page after successful sign-up.
				navigate('/');
			}

			// Stop the form submission process after a short delay.
			setTimeout(() => {
				setSubmitting(false);
			}, 400);
		} catch (error) {
			// Display an error toast message if sign-up fails.
			toast.error('Some error occurred');

			// Handle specific error cases, such as the email already being in use.
			if (error.code === 'auth/email-already-in-use') {
				console.log('user already exists'); // Log a message if the email is already in use.
			} else {
				console.log('some error occurred during sign up'); // Log any other errors during sign-up.
				console.log(error); // Log the error details for debugging.
			}
		}
	}

    return (
        <div style={ bg } className='signup flex justify-center items-center h-[85vh]'>
            <Toaster position='bottom-right' />
            <div className='flex flex-col p-20 bg-transparent backdrop-blur-sm border rounded-xl'>
                <h1 className='text-2xl font-bold mb-6'>Sign Up</h1>
                <Formik
                initialValues={{ name: '', email: '', password: '' }}
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
                            <label htmlFor='name' className='text-sm text-slate-400'>Name</label>
                            <input 
                            id='name' 
                            placeholder='leaf eater' 
                            className='px-4 py-1 rounded border text-md focus:outline-brand' 
                            type='text' 
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            required />
                            <span className='ml-auto text-xs text-red-700'>{errors.name && touched.name && errors.Name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-sm text-slate-400'>Email</label>
                            <input 
                            id='email' 
                            placeholder='koala@gmail.com' 
                            className='px-4 py-1 rounded border text-md focus:outline-brand' 
                            type='email' 
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            required />
                            <span className='ml-auto text-xs text-red-700'>{errors.email && touched.email && errors.email}</span>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password' className='text-sm text-slate-400'>Password</label>
                            <input 
                            id='password' 
                            placeholder='•••••••'
                            className='px-4 py-1 rounded border text-md focus:outline-brand' 
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
                                <p className='font-medium'>Sign Up</p>
                                <MdChevronRight />
                            </button>
                        </div>
                    </form>
                )}
                </Formik>
                <p className='mt-2 text-sm'>Already a user? <Link to='/signin' className='text-[#66f] underline'>Sign in</Link></p>
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
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { MdChevronRight } from "react-icons/md";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    function validate(values) {
        const errors = {};
        if (!values.email) {
            errors.email = 'required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'invalid email address';
        }
        return errors;
    }

    async function handleSubmit(values, setSubmitting) {
        try {
            
            // await setPersistence(auth, browserLocalPersistence);
            const data = await signInWithEmailAndPassword(auth, values.email, values.password);

            if(data) {  
                console.log(data);
                navigate('/');
            }
            
            setTimeout(() => {
                setSubmitting(false);
            }, 400);
        } catch (error) {
            console.log(error);
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                console.log('invalid user credentials');
            } else {
                console.log('some error occurred during sign up');
            }
        }        
    }

    return (
        <div style={ bg } className='signup flex justify-center items-center h-[85vh]'>
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
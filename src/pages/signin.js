import React from 'react';
import { useForm } from 'react-hook-form';
import './signin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle sign in logic here
  };

  const onError = (formErrors) => {
    Object.values(formErrors).forEach(error => {
      toast.error(error.message);
    });
  };

  return (
    <div className="signin-page">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="signin-form">
        <h2 className="text-3xl font-bold mb-6">Login to your Account</h2>
        
        <div className="label w-full mb-4 text-center">
          <label htmlFor="email" className="sr-only">Email address: </label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className="txt-field text-center appearance-none rounded-md block w-80 mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="label w-full mb-6 text-center">
          <label htmlFor="password" className="sr-only">Password: </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="txt-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="signin-btn w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account? 
          <a href="/signup" className="text-blue hover:text-blue-500 font-medium"> Sign Up</a>
        </p>
        </div>
    </div>
  );
};

export default SignIn;

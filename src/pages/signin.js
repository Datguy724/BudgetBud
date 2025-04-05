import React from 'react';
import { useForm } from 'react-hook-form';
import './signin.css';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle sign in logic here
  };

  return (
    <div className="signin-page">
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        
        <div className="w-full mb-4">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="w-full mb-6">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;

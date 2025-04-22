import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import './signin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch ("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login Failed");
      }
      login(data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (formErrors) => {
    Object.values(formErrors).forEach(error => {
      toast.error(error.message);
    });
  };

  return (
    <div className="signin-page">
      <form onSubmit={handleSubmit(handleLogin, onError)} className="signin-form">
        <h2 className="text-3xl font-bold mb-6">Login to your Account</h2>
        
        <div className="label w-full mb-4 text-center">
          <label htmlFor="username" className="sr-only"></label>
          <input
            {...register("username", { 
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Invalid username"
              }
            })}
            type="username"
            className="txt-field text-center appearance-none rounded-md block w-80 mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
          />
        </div>

        <div className="label w-full mb-6 text-center">
          <label htmlFor="password" className="sr-only"></label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="txt-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
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

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
// import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Handle form submission logic here
    console.log(data);
    setIsLoading(false);
  };

    const onError = (formErrors) => {
      Object.values(formErrors).forEach(error => {
        toast.error(error.message);
      });
    };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-component rounded-md shadow-sm space-y-4">
              <div className="label w-full mb-4 text-center">
                <input
                  {...register("firstName", { required: "First name is required"})}
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder='First name'
                />
              </div>
              <div className="label w-full mb-4 text-center">
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder='Last name'
                />
            </div>
            
            <div className="label w-full mb-4 text-center">
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
                placeholder='Email address'
              />
            </div>

            <div className="label w-full mb-4 text-center">
              <input
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                type="tel"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder='Phone number'
              />
            </div>

            <div className="label w-full mb-4 text-center">
              <input
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder='Password'
              />
            </div>

            <div className="label w-full mb-4 text-center">
              <input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder='Confirm password'
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="signup-btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="form-bottom mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="continue mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="auth-btn w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="auth-btn w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaFacebook className="w-5 h-5 text-blue-600" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default SignUp;

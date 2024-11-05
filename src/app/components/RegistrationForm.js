"use client"

import { useForm } from "react-hook-form";
import '../globals.css'

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;
    console.log("all data is ")

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: "Passwords don't match!",
      });
      return;
    }

    // Send the data to your API endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      console.log('Registration successful!');
    } else {
      console.error('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label htmlFor="name" className="block font-bold ">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="border rounded p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block font-bold">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email is invalid',
            },
          })}
          className="border rounded p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block font-bold">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
          className="border rounded p-2 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block font-bold">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
          })}
          className="border rounded p-2 w-full"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">Register</button>
    </form>
  );
};

export default RegistrationForm;

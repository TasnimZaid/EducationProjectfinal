// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from 'lucide-react';
import { useDispatch } from "react-redux";
import { setAuthData, setError } from "../../redux/authSlice";
import Cookies from 'js-cookie'; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorState] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( "http://localhost:3000/api/login",
        { email, password },
        {
          withCredentials: true, 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { teacher, token } = response.data;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Save the token and user data in cookies (for persistence across sessions)
      Cookies.set('token', token); 
      Cookies.set('teacherId', teacher.id);
      Cookies.set('teacherName', teacher.name);
      Cookies.set('teacherEmail', teacher.email);
      Cookies.set('universityName', teacher.university_name);
      Cookies.set('teacherRole', teacher.role);

      // Save the token and user data in sessionStorage (for the current session only)
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('teacherId', teacher.id);
      sessionStorage.setItem('teacherName', teacher.name);
      sessionStorage.setItem('teacherEmail', teacher.email);
      sessionStorage.setItem('universityName', teacher.university_name);
      sessionStorage.setItem('teacherRole', teacher.role);



      dispatch(
        setAuthData({
          token,
          teacherId: teacher.id,
          teacherName: teacher.name,
          teacherEmail: teacher.email,
          universityName: teacher.university_name,
          role: teacher.role,
        })
      );

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setError(error.response?.data?.message || error.message || "Login failed"));
      setErrorState(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
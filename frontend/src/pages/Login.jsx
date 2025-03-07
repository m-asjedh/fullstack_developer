import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../schema";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://fullstack-developer-gules.vercel.app/api/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log("Login successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      toast.success("Successfully Logged in");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <div className="relative h-screen w-screen">
        <div className="absolute inset-0 bg-cover bg-center "></div>
        <div className="relative flex justify-center items-center h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Login to your Account
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col space-y-4"
            >
              <div>
                <input
                  name="email"
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-600 text-center">
                DON&apos;T YOU HAVE AN ACCOUNT GO CREATE ONE
                <br />{" "}
                <Link className="font-bold" to={"/signup"}>
                  REGISTER
                </Link>
              </div>
              <button
                type="submit"
                className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600 transition text-center"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

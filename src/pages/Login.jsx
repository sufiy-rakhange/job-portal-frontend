import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isValidEmail = form.email.includes("@");

  const [errors, setErrors] = useState({});

    // Adding loading state to show skeletons while fetching data
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    API.post("/login", form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/"; // Redirect to home page after successful login
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        setErrors({ message: error.response.data.message });
        toast.error("Error logging in!");
      });
  };

  if (loading) {
    return <Loader text="Loading jobs..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {form.email && !isValidEmail && (
              <p className="text-red-500 text-sm mt-2">
                Invalid email format
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {form.password && form.password.length < 6 && (
              <p className="text-red-500 text-sm mt-2">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Error Message */}
          {errors.message && (
            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-xl">
              {errors.message}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={!form.email || !form.password}
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-200 ${!form.email || !form.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;

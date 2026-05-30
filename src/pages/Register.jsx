import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    API.post("/register", form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");

        window.location.href = "/add-job"; // Redirect to add job page after successful registration
      })
      .catch((error) => {
        toast.error("Error registering!");
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          toast.error("Error registering!");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>

          <p className="text-gray-500">
            Register to start exploring opportunities
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email[0]}
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

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password[0]}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;

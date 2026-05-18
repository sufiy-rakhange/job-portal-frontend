import { useState } from "react";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isValidEmail = form.email.includes("@");

  const [errors, setErrors] = useState({});

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
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        setErrors({ message: error.response.data.message });
        console.log("Error logging in:", error.response.data.message);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {form.email && !isValidEmail && (
          <p style={{ color: "red" }}>Invalid email format</p>
        )}

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {form.password && form.password.length < 6 && (
          <p style={{ color: "red" }}>
            Password must be at least 6 characters long
          </p>
        )}

        <br />
        <br />

        <button type="submit" disabled={!form.email || !form.password}>
          Login
        </button>

        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
      </form>
    </div>
  );
};

export default Login;

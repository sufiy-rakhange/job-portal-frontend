import { useState } from "react";
import API from "../services/api";

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
        setErrors({});
        localStorage.setItem("token", response.data.token);
        console.log("Registration successful:", response.data);

        window.location.href = "/add-job"; // Redirect to add job page after successful registration
      })
      .catch((error) => {

        console.log("Error adding job:", error.response.data.errors);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Error adding job:", error);
        }
      });
  };

  return (
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}
        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}
        <br />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;

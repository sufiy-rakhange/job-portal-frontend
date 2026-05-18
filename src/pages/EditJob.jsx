import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";


const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get(`/jobs/${id}`)
      .then((res) => {
        setForm(res.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/jobs/${id}`, form)
      .then((res) => {
        console.log("Updated");
        navigate("/");
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

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Add Job Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title[0]}</p>}
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter company"
          name="company"
          value={form.company}
          onChange={handleChange}
        />
        {errors.company && <p style={{ color: "red" }}>{errors.company[0]}</p>}
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && (
          <p style={{ color: "red" }}>{errors.location[0]}</p>
        )}
        <br />
        <br />
        <textarea
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description[0]}</p>
        )}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditJob
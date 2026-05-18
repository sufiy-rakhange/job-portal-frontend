import { useState } from "react";
import API from "../services/api";

const AddJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  // console.log(window.location.origin);

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("company", form.company);
    formData.append("location", form.location);
    formData.append("logo", form.logo);

    // Handle job submission logic here
    API.post("/jobs", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log("Job added successfully:", response.data);
        setErrors({});
        setForm({
          title: "",
          company: "",
          location: "",
          description: "",
          logo: "",
        });
      })
      .catch((error) => {
        console.log(error);

        console.log("Error adding job:", error.response.data.errors);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Error adding job:", error);
        }
      });
    ;
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

        <input
          type="file"
          name="logo"
          onChange={(e) =>
            setForm({
              ...form,
              logo: e.target.files[0]
            })} />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description[0]}</p>
        )}
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddJob;

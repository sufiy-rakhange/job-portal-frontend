import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const AddJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

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
        toast.success("Job added successfully!");
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
        toast.error("Error adding job!");
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          toast.error("Error adding job!");
        }
      });
    ;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Job
          </h1>

          <p className="text-gray-500">
            Fill in the details to publish a new job opportunity
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title[0]}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Enter company"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.company[0]}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              placeholder="Enter location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.location && (
              <p className="text-red-500 text-sm mt-2">
                {errors.location[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Description
            </label>

            <textarea
              placeholder="Enter description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200 resize-none"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description[0]}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Logo
            </label>

            <input
              type="file"
              name="logo"
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.files[0],
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition duration-200"
            />

            {errors.logo && (
              <p className="text-red-500 text-sm mt-2">
                {errors.logo[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Publish Job
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddJob;

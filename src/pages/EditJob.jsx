import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    logo: null,
  });

  const [errors, setErrors] = useState({});

  // Fetch Existing Job
  useEffect(() => {

    API.get(`/jobs/${id}`)
      .then((response) => {

        setForm({
          title: response.data.title,
          company: response.data.company,
          location: response.data.location,
          description: response.data.description,
          logo: null,
        });

      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load job");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Submit Update
  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("company", form.company);
    formData.append("location", form.location);
    formData.append("description", form.description);

    if (form.logo) {
      formData.append("logo", form.logo);
    }

    formData.append("_method", "PUT");

    API.post(`/jobs/${id}`, formData)
      .then(() => {

        toast.success("Job updated successfully!");

        navigate("/dashboard");

      })
      .catch((error) => {

        console.error(error);

        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          toast.error("Something went wrong");
        }

      });
  };

  if (loading) {
    return <Loader text="Loading job..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        {/* Heading */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Edit Job
          </h1>

          <p className="text-gray-500">
            Update your job listing details
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}
          <div>

            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Company
            </label>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="Enter job description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.files[0],
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-xl transition duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-200"
            >
              Update Job
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditJob;
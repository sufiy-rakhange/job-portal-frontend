import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  // Adding state for delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Adding loading state to show skeletons while fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/jobs?search=${search}`)
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        toast.error("Error fetching data!");
      })
      .finally(() => {
        setLoading(false);
      });
    fetchJobs();
  }, [search, page]);

  const fetchJobs = () => {
    API.get(`/jobs?page=${page}&search=${search}`)
      .then((res) => {
        setJobs(res.data.data);
        setLastPage(res.data.last_page);
      });
  };

  const handleDelete = (id) => {
    setSelectedJobId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    API.delete(`/jobs/${selectedJobId}`)
      .then(() => {
        setJobs(jobs.filter((job) => job.id !== selectedJobId));
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Error deleting job!");
        console.log(error);

      });
  };

  if (loading) {
    return <Loader  text="Loading jobs..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>

          <p className="text-lg text-blue-100 mb-8">
            Explore thousands of opportunities from top companies.
          </p>

          <input
            type="text"
            placeholder="Search jobs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-4 rounded-xl bg-gray-100 border-2 border-gray-300 text-gray-900 placeholder-gray-600 focus:border-blue-700 focus:ring-4 focus:ring-blue-200 outline-none shadow-md transition duration-200"
          />
        </div>
      </div>

      {/* Jobs Section */}
      <div className="text-center max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Latest Jobs
        </h2>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {jobs?.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showActions={false}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-5 py-2 rounded-lg text-white transition duration-200 ${page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Previous
          </button>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className={`px-5 py-2 rounded-lg text-white transition duration-200 ${page === lastPage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Next
          </button>

        </div>
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
          title="Delete Job"
          message="Are you sure you want to delete this job? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default Home;

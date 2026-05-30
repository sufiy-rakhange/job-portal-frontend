import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Adding loading state to show skeletons while fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/my-jobs")
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to load jobs");
      }).finally(() => {
        setLoading(false);
      });
  },
    []);

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
        console.error("Delete job error:", error);
      });
  };

  if (loading) {
    return <Loader text="Loading jobs..." />;
  }

  const totalJobs = jobs.length;

  const remoteJobs = jobs.filter((job) =>
    job.location.toLowerCase().includes("remote")
  ).length;

  const jobsThisMonth = jobs.filter((job) => {

    const createdDate = new Date(job.created_at);

    const currentDate = new Date();

    return (
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );

  }).length;

  const companiesHiring = new Set(
    jobs.map((job) => job.company)
  ).size;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className=" max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>

            <p className="text-gray-500 text-lg">
              Manage your jobs and track activity
            </p>

          </div>

          {/* Add Job Button */}
          <button
            onClick={() => navigate("/add-job")}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            + Add New Job
          </button>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* Total Jobs */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <p className="text-gray-500 mb-2">
              Total Jobs
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              {totalJobs}
            </h2>

          </div>

          {/* Jobs This Month */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <p className="text-gray-500 mb-2">
              Jobs This Month
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              {jobsThisMonth}
            </h2>

          </div>

          {/* Remote Jobs */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <p className="text-gray-500 mb-2">
              Remote Jobs
            </p>

            <h2 className="text-4xl font-bold text-purple-600">
              {remoteJobs}
            </h2>

          </div>

          {/* Companies Hiring */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <p className="text-gray-500 mb-2">
              Companies Hiring
            </p>

            <h2 className="text-4xl font-bold text-orange-600">
              {companiesHiring}
            </h2>

          </div>

        </div>
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Jobs
          </h2>

          <p className="text-gray-500">
            {jobs.length} jobs found
          </p>

        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-12 text-center">

            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No Jobs Yet
            </h3>

            <p className="text-gray-500 mb-6">
              Start by creating your first job listing
            </p>

            <button
              onClick={() => navigate("/add-job")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200"
            >
              Add Job
            </button>

          </div>

        ) : (

          /* Jobs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {jobs.map((job) => (

              <JobCard
                key={job.id}
                job={job}
                showActions={true}
                onDelete={() => handleDelete(job.id)}
              />
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
          title="Delete Job"
          message="Are you sure you want to delete this job? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          confirmText="Delete"
        />
      )}
    </div>
  );
}

export default Dashboard;
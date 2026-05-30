import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  // Adding state for filters
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Adding loading state to show skeletons while fetching data
  const [loading, setLoading] = useState(true);

  // Function to clear all filters
  const clearFilters = () => {
    setSearch("");
    setCompanyFilter("");
    setLocationFilter("");
  };

  useEffect(() => {
    API.get(`/jobs?page=${page}&search=${search}`)
      .then((res) => {
        setJobs(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch(() => {
        toast.error("Error fetching jobs!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, page]);

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
    return <Loader text="Loading jobs..." />;
  }

  // Extracting unique companies and locations for filters
  const companies = [...new Set(jobs.map((job) => job.company))];

  const locations = [...new Set(jobs.map((job) => job.location))];

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase());

    const matchesCompany =
      companyFilter === "" ||
      job.company === companyFilter;

    const matchesLocation =
      locationFilter === "" ||
      job.location === locationFilter;

    return (
      matchesSearch &&
      matchesCompany &&
      matchesLocation
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>

          <p className="text-lg text-blue-100 mb-8">
            Explore thousands of opportunities from top companies.
          </p>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="text-center max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Latest Jobs
        </h2>

        {/* Job Filters */}
        <JobFilters
          search={search}
          setSearch={setSearch}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          companies={companies}
          locations={locations}
          clearFilters={clearFilters}
        />

        {/* Job Count */}
        <div className="flex justify-between items-center mb-6">

          <p className="text-gray-600">
            Showing
            <span className="font-semibold text-blue-600 mx-1">
              {filteredJobs.length}
            </span>
            {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>

        </div>

        <div>
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">

              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No matching jobs found
              </h3>

              <p className="text-gray-500">
                Try adjusting your search or filters.
              </p>

            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredJobs?.map((job) => (
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
      </div >
      {
        showModal && (
          <Modal
            isOpen={showModal}
            title="Delete Job"
            message="Are you sure you want to delete this job? This action cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setShowModal(false)}
            confirmText="Delete"
          />
        )
      }
    </div >
  );
};

export default Home;

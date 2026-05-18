import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/jobs?search=${search}`)
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
    API.delete(`/jobs/${id}`)
      .then((response) => {
        setJobs(jobs.filter((job) => job.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Search jobs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {jobs?.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>
              <img src={`http://job-portal-backend.test/storage/${job.logo}`}
                alt="Logo"
                width="100" />
            </p>
            <button onClick={() => handleDelete(job.id)}>
              Delete
            </button>
            <button onClick={() => navigate(`/edit-job/${job.id}`)}>
              Edit
            </button>
          </div>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <button
        disabled={page === lastPage}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Home;

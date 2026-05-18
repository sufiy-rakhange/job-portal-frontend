import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/my-jobs")
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.error("My jobs error:", error);
      });
  },
   []);

  return (
    <div>
      <h1>My Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>

            <p>{job.company}</p>

            <p>{job.location}</p>

            {job.logo && (
              <img
                src={`http://job-portal-backend.test/storage/${job.logo}`}
                alt="logo"
                width="100"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
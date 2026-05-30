import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobCard = ({
  job,
  showActions = false,
  onDelete,
}) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between">

      <Link to={`/jobs/${job.id}`} className="block">

        {/* Logo */}
        {job.logo && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${job.logo}`}
            alt="logo"
            className="w-24 h-24 object-contain rounded-xl mb-4 bg-gray-100 p-2"
          />
        )}

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {job.title}
        </h3>

        {/* Company */}
        <p className="text-gray-600 mb-1">
          {job.company}
        </p>

        {/* Location */}
        <p className="text-gray-500 mb-4">
          {job.location}
        </p>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3 mb-6">
          {job.description}
        </p>
      </Link>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-3">

          <button
            onClick={() => navigate(`/edit-job/${job.id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(job.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
          >
            Delete
          </button>

        </div>
      )}
    </div>
  );
};

export default JobCard;
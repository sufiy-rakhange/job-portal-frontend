import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from '../services/api';
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const JobDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        API.get(`/jobs/${id}`)
            .then((response) => {
                setJob(response.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load job details");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <Loader text="Loading job details..." />;
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">
                    Job not found
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
                >
                    ← Back
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">

                        {/* Logo */}
                        {job.logo && (
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/storage/${job.logo}`}
                                alt="logo"
                                className="w-28 h-28 object-contain bg-gray-100 rounded-2xl p-3"
                            />
                        )}

                        {/* Job Info */}
                        <div>

                            <h1 className="text-4xl font-bold text-gray-800 mb-3">
                                {job.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-2">
                                {job.company}
                            </p>

                            <p className="text-gray-500">
                                📍 {job.location}
                            </p>

                        </div>
                    </div>

                    {/* Description */}
                    <div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Job Description
                        </h2>

                        <p className="text-gray-600 leading-8 whitespace-pre-line">
                            {job.description}
                        </p>

                    </div>

                </div>
            </div>
    </div>
  );
}

export default JobDetails
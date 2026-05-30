const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="text-center">

                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                {/* Loading Text */}
                <p className="text-gray-600 text-lg font-medium">
                    {text}
                </p>

            </div>
        </div>
    );
};

export default Loader;
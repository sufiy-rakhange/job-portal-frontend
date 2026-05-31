const JobFilters = ({
    search,
    setSearch,
    companyFilter,
    setCompanyFilter,
    locationFilter,
    setLocationFilter,
    companies,
    locations,
    clearFilters,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* Company Filter */}
                <select
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl"
                >
                    <option value="">All Companies</option>

                    {companies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>

                {/* Location Filter */}
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl"
                >
                    <option value="">All Locations</option>

                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Clear Filters Button */}
                <button
                    onClick={clearFilters}
                    disabled={
                        !search &&
                        !companyFilter &&
                        !locationFilter
                    }
                    className={`rounded-xl px-4 py-3 transition duration-200 ${!search &&
                        !companyFilter &&
                        !locationFilter
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default JobFilters;
function Client() {
    return (
        <div className="container mx-auto px-4 mt-20" id="clients">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Projects</h2>
            <p className="text-center text-gray-600 mb-12">29 Years of Experience Since 1995</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Individual Project Cards */}
                {[
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/building-logo-design_644408-164.jpg",
                        title: "DLR",
                        description: "Residential Projects",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/construction-logo-design_644408-163.jpg",
                        title: "ACE Constructions",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/real-estate-logo-design_644408-158.jpg",
                        title: "Aparna Western Meadows Welfare Association",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/luxury-jewelry-logo_644408-170.jpg",
                        title: "PMJ Jewellers",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/business-consulting-logo_644408-175.jpg",
                        title: "Sudhir Associates",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/industrial-logo-design_644408-180.jpg",
                        title: "Spira Duck Industries",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/education-logo-design_644408-185.jpg",
                        title: "Sri Chaitanya Education Institutes",
                    },
                    {
                        imgSrc: "https://img.freepik.com/premium-vector/agriculture-logo-design_644408-190.jpg",
                        title: "Sri Vanamali Agro Industries",
                    },
                ].map((project, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="relative group w-full flex flex-col items-center">
                            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center p-4">
                                <img
                                    src={project.imgSrc}
                                    alt={project.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-md sm:text-lg font-semibold text-gray-900">
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Client;

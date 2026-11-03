import React from 'react';

export const Features: React.FC = () => {
    const features = [
        {
            title: "Mindfulness Sessions",
            description: "Guided sessions to help your team relax, focus, and recharge during the workday.",
            icon: "🧘"
        },
        {
            title: "Community Building",
            description: "Tools and activities designed to strengthen bonds and create a sense of belonging.",
            icon: "🤝"
        },
        {
            title: "Wellness Challenges",
            description: "Fun and engaging challenges to promote healthy habits and friendly competition.",
            icon: "🏆"
        },
        {
            title: "Expert Resources",
            description: "Access to a library of articles, videos, and guides from wellness experts.",
            icon: "📚"
        }
    ];

    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">Here&apos;s why we stand out:</h2>
                    <p className="text-gray-600 text-lg">
                        We don&apos;t just offer tools; we offer a transformation. Our holistic approach ensures sustainable well-being for your entire organization.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

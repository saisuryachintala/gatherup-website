import React from 'react';

export const ValueProp: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                        {/* Placeholder for Value Prop Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Value Prop Image
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-primary">Why You Need GatherUp</h2>
                        <div className="w-20 h-1 bg-accent rounded-full"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            In today&apos;s fast-paced world, workplace well-being is more than just a perk—it&apos;s a necessity.
                            GatherUp provides the tools and community needed to reduce burnout, improve mental health,
                            and foster genuine connections among your team members.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Reduce employee burnout and stress",
                                "Improve team cohesion and communication",
                                "Foster a culture of mindfulness and empathy",
                                "Data-driven insights into team well-being"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">✓</span>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

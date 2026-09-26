import React from 'react';

export const BlogPreview: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <a
                    href="https://gluckjamin.wixsite.com/website-1/post/why-you-don-t-need-to-reply-right-away-reclaiming-your-time-through-healthy-email-boundaries"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-[#053d3d] mb-4 group-hover:text-[#a6ff48] transition-colors">
                        Why You Don&apos;t Need to Reply Right Away: Reclaiming Your Time Through Healthy Email Boundaries
                    </h3>
                </a>
            </div>
        </section>
    );
};

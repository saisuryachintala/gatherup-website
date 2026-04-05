'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const DownloadSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            propertyName: formData.get('propertyName') as string,
            location: formData.get('location') as string,
            consent,
        };

        try {
            const response = await fetch('/api/playbook-download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            // Trigger PDF download from API (streams from Google Drive)
            const pdfResponse = await fetch('/api/playbook-download');
            if (!pdfResponse.ok) {
                throw new Error('Failed to download the playbook.');
            }

            const blob = await pdfResponse.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'GatherUp-Playbook.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(
                err instanceof Error ? err.message : 'Something went wrong. Please try again.'
            );
        }
    };

    return (
        <section
            ref={sectionRef}
            id="download"
            className="bg-[#053d3d] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] xl:px-[200px]"
        >
            <motion.div
                className="max-w-7xl mx-auto flex flex-col gap-6 items-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Badge */}
                <motion.div className="flex flex-col items-center gap-3" variants={scrollReveal}>
                    <div className="inline-flex border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase tracking-wide">
                            Get Your Free Copy Below
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-[#e0f2cc] text-2xl md:text-[32px] md:leading-tight text-center">
                        Download the Full Playbook
                    </h2>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="border border-[#a6ff48] rounded-[20px] p-6 md:p-10 w-full max-w-4xl bg-[#053d3d]"
                    variants={scrollReveal}
                >
                    {status === 'success' ? (
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-[#a6ff48] flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#053d3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-[#e0f2cc] text-center">
                                Your download has started!
                            </h3>
                            <p className="font-sans text-base text-[#bce8e7] text-center max-w-md">
                                Check your downloads folder for the Playbook. If it didn&apos;t download,{' '}
                                <a
                                    href="/api/playbook-download"
                                    download="GatherUp-Playbook.pdf"
                                    className="text-[#a6ff48] underline"
                                >
                                    click here to try again
                                </a>.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="font-sans font-bold text-xl md:text-2xl text-[#e0f2cc]">
                                    Get Instant Access
                                </h3>
                                <p className="font-sans text-sm text-[#bce8e7] leading-normal mt-1">
                                    Your free copy of The Tenant Engagement Playbook will download
                                    immediately after submitting.
                                </p>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-3">
                                    <p className="font-sans text-sm text-red-300">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                {/* Row 1: Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="font-sans text-sm text-[#e0f2cc]">
                                            Full Name<span className="text-[#a6ff48]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Full Name"
                                            disabled={status === 'submitting'}
                                            className="bg-[#0a5c5c] border border-[#a6ff48]/30 rounded-lg px-4 py-3 font-sans text-sm text-[#e0f2cc] placeholder-[#bce8e7]/50 focus:outline-none focus:border-[#a6ff48] transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-sans text-sm text-[#e0f2cc]">
                                            Email Address<span className="text-[#a6ff48]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="Email Address"
                                            disabled={status === 'submitting'}
                                            className="bg-[#0a5c5c] border border-[#a6ff48]/30 rounded-lg px-4 py-3 font-sans text-sm text-[#e0f2cc] placeholder-[#bce8e7]/50 focus:outline-none focus:border-[#a6ff48] transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Property + Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="font-sans text-sm text-[#e0f2cc]">
                                            Property Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="propertyName"
                                            placeholder="Property Name"
                                            disabled={status === 'submitting'}
                                            className="bg-[#0a5c5c] border border-[#a6ff48]/30 rounded-lg px-4 py-3 font-sans text-sm text-[#e0f2cc] placeholder-[#bce8e7]/50 focus:outline-none focus:border-[#a6ff48] transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-sans text-sm text-[#e0f2cc]">
                                            Location (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            disabled={status === 'submitting'}
                                            className="bg-[#0a5c5c] border border-[#a6ff48]/30 rounded-lg px-4 py-3 font-sans text-sm text-[#e0f2cc] placeholder-[#bce8e7]/50 focus:outline-none focus:border-[#a6ff48] transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Consent */}
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                        disabled={status === 'submitting'}
                                        className="w-5 h-5 rounded border-[#a6ff48]/30 bg-[#0a5c5c] accent-[#a6ff48]"
                                    />
                                    <span className="font-sans text-sm text-[#bce8e7]">
                                        I provide consent to receive communications about GatherUp services.
                                    </span>
                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="bg-[#a6ff48] text-[#053d3d] font-sans font-bold text-base rounded-3xl px-8 py-3 hover:brightness-110 transition-all self-start disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Download Free Playbook'
                                    )}
                                </button>
                            </form>

                            {/* Privacy Notice */}
                            <p className="font-sans text-xs text-[#bce8e7]/60 leading-relaxed">
                                <span className="font-bold text-[#bce8e7]/80">Privacy Notice:</span>{' '}
                                GatherUp Wellness is committed to protecting your personal information in accordance with applicable
                                U.S. federal and state privacy laws. By submitting this form, you consent to receiving marketing communications. You may
                                unsubscribe or request removal of your data at any time by contacting us at{' '}
                                <a href="mailto:info@gatherupwellness.com" className="text-[#a6ff48] underline">
                                    gatherupwellness.com
                                </a>. By submitting this
                                form, you acknowledge and agree to our Privacy Policy and the collection of your data as described above.
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

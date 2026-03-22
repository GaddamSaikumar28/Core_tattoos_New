"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'sonner';

const NewsletterSection: React.FC = () => {
  const { customer, subscribeLoggedInUser, isLoading } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (customer?.email) {
      setEmail(customer.email);
    }
  }, [customer]);

  // Safely check if the customer accepts marketing
  const isAlreadySubscribed = Boolean(customer?.acceptsMarketing);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (customer) {
        // --- LOGGED IN USER ---
        // Hits the Storefront API via Context to update the profile securely
        const success = await subscribeLoggedInUser();
        if (success) toast.success("Thanks for subscribing!");
      } else {
        // --- GUEST USER ---
        // Hits our secure Next.js API route to use the Admin API
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to subscribe');
        
        toast.success(data.message || 'Thanks for subscribing!');
        setEmail(''); // Clear input for guests
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent layout shift/flash while checking auth state
  if (isLoading) return <div className="h-[400px] w-full bg-[#EBEBEB]"></div>;

  return (
    <section className="bg-[#EBEBEB] w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1312px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-black uppercase leading-none mb-6 tracking-tight">
            Subscribe to news
          </h2>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-black font-medium leading-snug mb-10 max-w-[500px]">
            Join our newsletter to stay up to date on features and releases.
          </p>

          <AnimatePresence mode="wait">
            {isAlreadySubscribed ? (
              /* --- STATE 1: ALREADY SUBSCRIBED --- */
              <motion.div 
                key="subscribed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 bg-white/60 px-6 py-4 rounded-2xl max-w-[650px] border border-gray-200 shadow-sm"
              >
                <div className="h-12 w-12 rounded-full bg-[#fe8204] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-black font-bold text-lg">You're all set!</p>
                  <p className="text-gray-600">You are already subscribed to our newsletter.</p>
                </div>
              </motion.div>
            ) : (
              /* --- STATE 2 & 3: FORM FOR GUESTS & UNSUBSCRIBED USERS --- */
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubscribe} 
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-[650px]"
              >
                <div className="w-full sm:flex-1 relative group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    readOnly={!!customer} // Lock input if logged in (tied to profile)
                    placeholder="jane@email.com" 
                    required
                    className={`w-full h-[60px] md:h-[68px] rounded-full px-8 text-base md:text-lg text-black bg-white border border-gray-200 focus:border-[#fe8204] outline-none placeholder:text-gray-500 shadow-sm transition-all ${
                      customer ? 'text-gray-500 cursor-not-allowed bg-gray-50' : ''
                    }`}
                  />
                  {customer && (
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 uppercase tracking-widest hidden sm:block">
                      Account Email
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-[60px] md:h-[68px] px-8 md:px-12 rounded-full bg-black text-white font-bold text-base md:text-lg uppercase tracking-wider hover:bg-[#fe8204] hover:shadow-lg transition-all duration-300 shrink-0 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Subscribe'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
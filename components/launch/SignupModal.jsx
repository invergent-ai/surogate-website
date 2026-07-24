'use client';

import { useEffect, useState } from 'react';

const inputClass =
  'w-full h-11 px-3.5 bg-white border border-brand-border text-[14px] text-brand-aubergine placeholder:text-brand-steel focus:outline-none focus:border-brand-aubergine transition-colors';

export default function SignupModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm({ name: '', email: '', company: '' });
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
      <div className="absolute inset-0 bg-brand-aubergine/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[440px] p-8 sm:p-9 shadow-glow">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-steel hover:text-brand-aubergine transition-colors"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

        {!submitted ? (
          <>
            <h3 id="signup-modal-title" className="font-serif font-medium text-[26px] text-brand-aubergine mb-2">
              Claim your spot
            </h3>
            <p className="text-[13.5px] text-brand-steel mb-6 leading-[1.5]">
              Tell us a bit about you and we&apos;ll be in touch.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                type="text"
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputClass}
              />
              <button
                type="submit"
                className="mt-2 h-12 bg-grad-sun text-brand-aubergine font-sans text-xs font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition"
              >
                Sign up now
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="font-serif font-medium text-[26px] text-brand-aubergine mb-2">
              You&apos;re on the list.
            </h3>
            <p className="text-[13.5px] text-brand-steel leading-[1.5]">
              Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} - we&apos;ll be in touch.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

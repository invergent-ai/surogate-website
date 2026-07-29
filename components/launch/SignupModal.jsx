'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const inputClass =
  'w-full h-11 px-3.5 bg-white border border-brand-border text-[14px] text-brand-aubergine placeholder:text-brand-steel focus:outline-none focus:border-brand-aubergine transition-colors';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

export default function SignupModal({ open, onClose, isWaitlist = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [wasWaitlisted, setWasWaitlisted] = useState(false);
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
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setAlreadySignedUp(false);
      setWasWaitlisted(false);
      setForm({ name: '', email: '', company: '' });
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setWasWaitlisted(isWaitlist);
    const signupId = form.email.trim().toLowerCase();
    try {
      await setDoc(doc(db, 'signups', signupId), {
        name: form.name,
        email: form.email,
        company: form.company,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      if (err.code === 'permission-denied') {
        // Firestore rule blocked it because this email already has a signup doc.
        setAlreadySignedUp(true);
      } else {
        // No reachable Firestore project yet (dummy config) - don't block the
        // visitor on a config issue, but keep it visible for us in devtools.
        console.error('Signup write failed:', err);
      }
    }
    setSubmitting(false);
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
              {isWaitlist ? 'Join the waitlist' : 'Claim your spot'}
            </h3>
            <p className="text-[13.5px] text-brand-steel mb-6 leading-[1.5]">
              {isWaitlist
                ? "All the founding spots are taken, but you can still join the waitlist - we'll email you as soon as more open up."
                : "Tell us about you & we'll share 100 free templates."}
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
                placeholder="Email"
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
                disabled={submitting}
                className="mt-2 h-12 bg-grad-sun text-brand-aubergine font-sans text-xs font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition disabled:opacity-60"
              >
                {submitting ? 'Signing up...' : isWaitlist ? 'Join waitlist' : 'Sign up now'}
              </button>
            </form>

            <a
              href="https://chat.whatsapp.com/CJy0QWORoGrLH7qfUoAgKs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 h-12 w-full bg-brand-aubergine text-white font-sans text-xs font-semibold uppercase tracking-wider-2 hover:brightness-125 transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Join our WhatsApp channel
            </a>
          </>
        ) : (
          <>
            <h3 className="font-serif font-medium text-[26px] text-brand-aubergine mb-2">
              {alreadySignedUp
                ? "You're already on the list."
                : wasWaitlisted
                  ? "You're on the waitlist."
                  : "You're on the list."}
            </h3>
            <p className="text-[13.5px] text-brand-steel leading-[1.5] mb-6">
              {alreadySignedUp
                ? "That email already claimed a spot - we'll be in touch."
                : wasWaitlisted
                  ? "All the founding spots are claimed, but you're on the waitlist now - we'll email you the moment one opens up."
                  : `Thanks${form.name ? `, ${form.name.split(' ')[0]}` : ''} - we'll be in touch.`}
            </p>
            <a
              href="https://chat.whatsapp.com/CJy0QWORoGrLH7qfUoAgKs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 w-full bg-brand-aubergine text-white font-sans text-xs font-semibold uppercase tracking-wider-2 hover:brightness-125 transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Join our WhatsApp channel
            </a>
          </>
        )}
      </div>
    </div>
  );
}

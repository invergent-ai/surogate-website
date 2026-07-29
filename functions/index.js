const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const { render, toPlainText } = require('@react-email/render');
const React = require('react');
const { WelcomeEmail } = require('./emails/welcome-email');

admin.initializeApp();

const smtpUser = defineSecret('SMTP_USER');
const smtpPass = defineSecret('SMTP_PASS');

const SMTP_HOST = 'mail-eu.smtp2go.com';
const SMTP_PORT = 2525;

const FROM_EMAIL = 'Surogate <hello@surogate.ai>';

exports.onSignupCreated = onDocumentCreated(
  { document: 'signups/{signupId}', secrets: [smtpUser, smtpPass] },
  async (event) => {
    const signup = event.data.data();
    const { email } = signup;

    // Decrement the live spots counter atomically; self-initializes at 100
    // the first time this runs, so no manual seeding step is needed. Whether
    // this signup is waitlisted is decided here (authoritative, race-safe),
    // not by the client's own live read of the counter.
    const counterRef = admin.firestore().doc('counters/spots');
    const waitlisted = await admin.firestore().runTransaction(async (tx) => {
      const snap = await tx.get(counterRef);
      const current = snap.exists ? snap.data().value : 100;
      tx.set(counterRef, { value: Math.max(0, current - 1) }, { merge: true });
      return current <= 0;
    });

    if (!email) return;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // STARTTLS on this port, not implicit TLS
      auth: {
        user: smtpUser.value(),
        pass: smtpPass.value(),
      },
    });

    const html = await render(React.createElement(WelcomeEmail, { waitlisted }));
    const text = toPlainText(html);

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: waitlisted ? "You're on the Surogate waitlist" : "You're on the list - Surogate early access",
      html,
      text,
    });
  }
);

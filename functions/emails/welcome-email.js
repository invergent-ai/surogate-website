const React = require('react');
const {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Button,
  Hr,
} = require('@react-email/components');

const e = React.createElement;

const AUBERGINE = '#2a102d';
const ORANGE = '#FFAF10';
const STEEL = '#8e999f';
const PAPER_WARM = '#fffaf3';

const WHATSAPP_URL = 'https://chat.whatsapp.com/CJy0QWORoGrLH7qfUoAgKs';
const LOGO_URL = 'https://surogate.ai/brand/logo-full-black.svg';

const serif = 'Georgia, "Times New Roman", serif';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function WelcomeEmail({ waitlisted = false } = {}) {
  return e(
    Html,
    null,
    e(Head, null),
    e(
      Preview,
      null,
      waitlisted
        ? "You're on the Surogate waitlist."
        : 'Congratulations on joining Surogate!'
    ),
    e(
      Body,
      { style: { backgroundColor: PAPER_WARM, fontFamily: sans, padding: '40px 0', margin: 0 } },
      e(
        Container,
        {
          style: {
            backgroundColor: '#ffffff',
            maxWidth: '480px',
            margin: '0 auto',
            padding: '40px 36px',
            borderRadius: '10px',
          },
        },
        e(Img, { src: LOGO_URL, alt: 'Surogate', height: '32', style: { marginBottom: '28px' } }),

        e(
          Text,
          {
            style: {
              color: ORANGE,
              fontFamily: sans,
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            },
          },
          waitlisted ? 'Waitlist' : 'Early access'
        ),

        e(
          Heading,
          {
            style: {
              color: AUBERGINE,
              fontFamily: serif,
              fontSize: '28px',
              fontWeight: 'normal',
              lineHeight: '1.2',
              margin: '0 0 16px',
            },
          },
          waitlisted ? "You're on the waitlist." : 'Congratulations on Joining Surogate!'
        ),

        e(
          Text,
          {
            style: {
              color: AUBERGINE,
              fontFamily: sans,
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 28px',
            },
          },
          waitlisted
            ? "All the founding spots have been claimed, but you're on the waitlist now. We'll email you the moment one opens up. In the meantime, the WhatsApp community gets first access to updates."
            : 'You have successfully joined the founding community at Surogate. The 100 free AI templates for High Value skills will be shared on the launch. Kindly join the Whatsapp community for exclusive updates.'
        ),

        e(
          Button,
          {
            href: WHATSAPP_URL,
            style: {
              backgroundColor: ORANGE,
              color: AUBERGINE,
              fontFamily: sans,
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '4px',
              display: 'inline-block',
            },
          },
          'Join our WhatsApp channel'
        ),

        e(Hr, { style: { borderColor: '#e6e3eb', margin: '36px 0 20px' } }),

        e(
          Text,
          { style: { color: STEEL, fontFamily: sans, fontSize: '12px', margin: 0 } },
          'Surogate - Multiply yourself.'
        )
      )
    )
  );
}

module.exports = { WelcomeEmail };

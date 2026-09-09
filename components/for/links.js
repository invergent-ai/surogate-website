/*
 * Shared calls to action for the profession pages.
 *
 * "Book a walkthrough" is a mailto rather than a booking link because there
 * is no booking link anywhere in the codebase — /agencies makes the same
 * compromise. Swap both pages by changing this one file when a Cal.com (or
 * similar) URL exists.
 */

export const START_FREE = 'https://ops.surogate.ai';

const EMAIL = 'sales@invergent.ai';

const SUBJECT = {
  doctors: 'Walkthrough — following patients between visits',
  teachers: 'Walkthrough — working with students between lessons',
  lawyers: 'Walkthrough — keeping clients informed between updates',
  accountants: 'Walkthrough — getting client records in on time',
  creators: 'Walkthrough — turning an audience into income',
  influencers: 'Walkthrough — working an account without being there',
};

const BODY = {
  doctors:
    'Tell us which patients you follow and how you follow them, and we will show you the first message they would receive.',
  teachers:
    'Tell us what you teach and how you know when a student has understood, and we will show you the first conversation they would have.',
  lawyers:
    'Tell us what one kind of matter needs and what your clients always ask, and we will show you the first message they would receive.',
  accountants:
    'Tell us what you need from one client type and when you need it, and we will show you the first message they would receive.',
  creators:
    'Tell us what people ask you most and how you answer it, and we will show you the first conversation your followers would have.',
  influencers:
    'Tell us which account you run and how you write, and we will show you the first week it would make.',
};

export const walkthrough = (page) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT[page])}&body=${encodeURIComponent(BODY[page])}`;

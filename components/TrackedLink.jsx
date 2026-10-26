'use client';

import { track } from '@/lib/analytics';

// Only this wrapper opts into the client boundary, so the parent <a>'s section
// keeps server-rendering while the click still emits a named conversion event.
export default function TrackedLink({ event, eventProps, onClick, children, ...props }) {
  const handleClick = (e) => {
    if (event) track(event, eventProps);
    if (onClick) onClick(e);
  };

  return (
    // data-event names the conversion in the HTML, so scripts/check-links.mjs can tell
    // a tracked link from a plain one.
    <a {...props} data-event={event} onClick={handleClick}>
      {children}
    </a>
  );
}

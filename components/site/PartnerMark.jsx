import { useId } from 'react';
import { partnerMarkSvg } from './illustrations/partnerBadges.js';

// The light moves across the facets once per hover or focus; reduced motion keeps the still mark.
const CSS = `
.pm svg{width:100%;height:100%}
@media (prefers-reduced-motion: no-preference){
.pm-i polygon{transition:fill 900ms cubic-bezier(.16,1,.3,1),fill-opacity 900ms cubic-bezier(.16,1,.3,1),stroke 900ms cubic-bezier(.16,1,.3,1)}
.pm-i:hover polygon,:focus-visible>.pm-i polygon,:focus-visible .pm-i polygon{fill:var(--b);fill-opacity:var(--bo)}
.pm-i:hover polygon[stroke],:focus-visible .pm-i polygon[stroke]{stroke:var(--b)}
}`;

export default function PartnerMark({ tier, size = 96, interactive = false, className = '' }) {
  const uid = `${tier}-${useId().replace(/[^\w-]/g, '')}`;
  return (
    <>
      <style href="partner-mark" precedence="default">{CSS}</style>
      <span
        className={`pm block ${interactive ? 'pm-i' : ''} ${className}`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: partnerMarkSvg(tier, uid) }}
      />
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';

// The tour is the Remotion scenes drawn live, so it loads after the page instead
// of shipping in the page bundle. The box holds the player's height until it arrives:
// the 16:9 film, then the control bar and the gap above it (40px + 16px, 30px + 12px on phones).
const FilmPlayer = dynamic(() => import('@/components/home/FilmPlayer'), {
  ssr: false,
  loading: () => <div className="aspect-video mb-[42px] sm:mb-[56px]" />,
});

export default function TourFilm() {
  return <FilmPlayer variant="full" ground={false} label="A tour of the Surogate platform" />;
}

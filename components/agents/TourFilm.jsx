'use client';

import dynamic from 'next/dynamic';

// The tour is the Remotion scenes drawn live, so it loads after the page instead
// of shipping in the page bundle. The box keeps the 16:9 frame until it arrives.
const FilmPlayer = dynamic(() => import('@/components/home/FilmPlayer'), {
  ssr: false,
  loading: () => <div className="aspect-video" />,
});

export default function TourFilm() {
  return <FilmPlayer variant="full" ground={false} label="A tour of the Surogate platform" />;
}

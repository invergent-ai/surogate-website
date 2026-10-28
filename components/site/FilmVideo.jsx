import { filmFiles } from '@/lib/films';

// The 2160 cut only where a wide, dense screen can show it; phones keep the 2.5 MB 1080 cut.
export default function FilmVideo({ slug }) {
  const { film, film4k, poster } = filmFiles(slug);
  return (
    <video poster={poster} controls autoPlay playsInline className="block h-full w-full">
      {film4k && <source src={film4k} type="video/mp4" media="(min-width: 1024px) and (min-resolution: 1.5dppx)" />}
      <source src={film} type="video/mp4" />
    </video>
  );
}

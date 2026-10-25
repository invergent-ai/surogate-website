// A static redirect page: GitHub Pages cannot redirect on the server, so a
// retired URL serves this. The script goes first and carries the query string
// over (ad click ids and UTM tags live there), keeping the visitor's own #hash
// over the target's; the meta refresh is the fallback without JavaScript.
export default function Redirect({ to }) {
  const [path, hash] = to.split('#');
  const keep = hash ? `(location.hash||${JSON.stringify(`#${hash}`)})` : 'location.hash';
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(path)}+location.search+${keep})` }} />
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        This page has moved to <a href={to}>{`https://surogate.ai${to}`}</a>.
      </p>
    </>
  );
}

// The live page is the one canonical; without this the layout's site-wide
// canonical (the home page) would be inherited too.
export function redirectMetadata(to) {
  const url = `https://surogate.ai${to.split('#')[0]}`;
  return { robots: 'noindex', alternates: { canonical: url }, openGraph: { url }, twitter: {} };
}

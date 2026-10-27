// A static redirect page: GitHub Pages cannot redirect on the server, so a
// retired URL serves this. The script goes first and carries the query string
// and hash over (ad click ids and UTM tags live there); the meta refresh is the
// fallback without JavaScript.
// A target may name a section (`/page/#part`): the query string goes before that hash.
export const redirectScript = (to) => {
  const [path, hash = ''] = to.split('#');
  return `location.replace(${JSON.stringify(path)}+location.search+(location.hash||${JSON.stringify(hash ? `#${hash}` : '')}))`;
};

export default function Redirect({ to }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript(to) }} />
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        This page has moved to <a href={to}>{`https://surogate.ai${to}`}</a>.
      </p>
    </>
  );
}

// The live page is the one canonical; without this the layout's site-wide
// canonical (the home page) would be inherited too. No noindex: a 0-second
// refresh already reads as a permanent redirect.
export function redirectMetadata(to) {
  const url = `https://surogate.ai${to.split('#')[0]}`;
  return { alternates: { canonical: url }, openGraph: { url }, twitter: {} };
}

// The use-case films: real product, filmed on the local stack, on fictional businesses
// (product-videos world seed). A real client's tenant is never filmed for the site.
export const FILMS = [
  { slug: 'vandijk-approval', business: 'Van Dijk Freight', title: 'An approval that waits for a person', product: 'agents', demo: true },
  { slug: 'clarke-knee-photo', business: 'Clarke Physio', title: 'A check-in after knee surgery', product: 'agents', demo: true },
  { slug: 'ortega-monday-leads', business: 'Ortega Properties', title: 'The Monday leads, sorted', product: 'agents', demo: true },
  { slug: 'pop-glossary-conflict', business: 'Traduceri Pop', title: 'Two glossaries that disagree', product: 'agents', demo: true },
  { slug: 'ursu-whiteboard', business: 'Meditații Ursu', title: 'A maths tutor at the whiteboard', product: 'agents', demo: true },
  { slug: 'mette-first-buyer', business: 'Bread by Mette', title: 'The first buyer of her agent', product: 'agents', demo: true },
  { slug: 'vandijk-ml-scoreboard', business: 'Van Dijk ML team', title: 'A model trained on their own chats', product: 'train', demo: true },
];

// Ursu's board capture is 1440x900, so a 2160 cut would only upscale it. Clarke's waits for a re-shoot:
// the chat wallpaper in its phone capture is cream.
const NO_4K = new Set(['ursu-whiteboard', 'clarke-knee-photo']);

export const filmFiles = (slug) => ({
  film: `/media/films/${slug}.mp4`,
  film4k: NO_4K.has(slug) ? null : `/media/films/${slug}-4k.mp4`,
  loop: `/media/films/${slug}-loop.mp4`,
  poster: `/media/films/${slug}.jpg`,
});

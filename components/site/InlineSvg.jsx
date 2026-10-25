// Renders an illustration's SVG markup inline, so it keeps the page's fonts and
// its own CSS animations. The markup is ours, copied from the design canvas.
export default function InlineSvg({ markup, className = '' }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}

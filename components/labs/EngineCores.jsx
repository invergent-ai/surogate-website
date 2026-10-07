/* Surogate Engine's mark: a block of cores with work sweeping across it diagonally. Each core's --d is
   its column plus its row, which sets where it sits in the sweep. */
export default function EngineCores({ className = '', cols = 8, rows = 4 }) {
  return (
    <span className={`engine-cores ${className}`} style={{ '--cols': cols }} aria-hidden="true">
      {Array.from({ length: cols * rows }, (_, i) => <i key={i} style={{ '--d': (i % cols) + Math.floor(i / cols) }} />)}
    </span>
  );
}

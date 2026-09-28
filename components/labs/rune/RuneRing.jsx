/* The 24 runes of the Elder Futhark, drawn as simple strokes (each in a 10 x 14 box), set around a
   circle. The decision engine lights them in sequence when Rune decides. */
const FUTHARK = [
  'M3 0V14M3 3L9 0M3 7L9 4', // fehu
  'M2 14V0L9 4V14', // uruz
  'M3 0V14M3 4L8 7L3 10', // thurisaz
  'M3 0V14M3 2L9 5M3 6L9 9', // ansuz
  'M3 0V14M3 0L8 3L3 6L9 14', // raidho
  'M8 2L3 7L8 12', // kaunan
  'M2 2L9 12M9 2L2 12', // gebo
  'M3 0V14M3 0L8 3L3 6', // wunjo
  'M2 0V14M9 0V14M2 4L9 9', // hagalaz
  'M5 0V14M2 5L9 9', // naudiz
  'M5 0V14', // isa
  'M4 2L1 6L4 10M6 4L9 8L6 12', // jera
  'M5 0V14M5 0L8 3M5 14L2 11', // eihwaz
  'M2 0V14M2 0L7 3M2 14L7 11M7 3V11', // perth
  'M5 14V0M5 5L1 1M5 5L9 1', // algiz
  'M8 0L2 5L8 9L2 14', // sowilo
  'M5 14V0M1 4L5 0L9 4', // tiwaz
  'M3 0V14M3 0L8 3.5L3 7L8 10.5L3 14', // berkanan
  'M2 14V0L5 4L8 0V14', // ehwaz
  'M2 14V0M8 14V0M2 0L8 6M8 0L2 6', // mannaz
  'M3 14V0L8 4', // laguz
  'M5 1L9 5L5 9L1 5Z', // ingwaz
  'M1 0V14M9 0V14M1 0L9 14M1 14L9 0', // dagaz
  'M1 14L5 9L9 14M5 9L1 5L5 0L9 5L5 9', // othala
];

export default function RuneRing() {
  return (
    <svg className="rr" viewBox="0 0 200 200" aria-hidden="true">
      <circle className="rr-track" cx="100" cy="100" r="84" />
      <g className="rr-runes">
        {FUTHARK.map((d, k) => (
          <g key={k} transform={`rotate(${k * 15} 100 100) translate(95 6)`}>
            <path className="rr-rune" d={d} />
          </g>
        ))}
      </g>
    </svg>
  );
}

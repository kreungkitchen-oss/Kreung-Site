/**
 * Torn-poster edge for the scroll color flood (Sam picked torn over flame, 2026-11-24). Paths are generated once at build
 * time from a fixed seed, so they are identical on every load.
 * Each path tiles horizontally: it spans two identical 1200-unit periods, so
 * shifting it left by up to 1200 units loops seamlessly.
 * ViewBox is 0 0 2400 100; y = 100 is the flat bottom that meets the color.
 */
const W = 1200;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A periodic list of [x, y] points across one period, then doubled. */
function periodic(points: [number, number][]) {
  return [...points, ...points.map(([x, y]) => [x + W, y] as [number, number])];
}

function polyPath(pts: [number, number][]) {
  return `M0 100 L0 ${r1(pts[0][1])} ` + pts.map(([x, y]) => `L${r1(x)} ${r1(y)}`).join(' ') + ` L${2 * W} ${r1(pts[0][1])} L${2 * W} 100 Z`;
}

/** Torn poster paper: a cream fiber rim above a jagged color edge. */
function torn(seed: number, base: number, amp: number) {
  const rand = rng(seed);
  const pts: [number, number][] = [];
  let x = 0;
  while (x < W) {
    const deep = rand() < 0.08 ? amp * 0.9 : 0; // the occasional deeper tear
    pts.push([x, base + (rand() - 0.5) * amp + deep]);
    x += 6 + rand() * 18;
  }
  pts[0][1] = base;
  return polyPath(periodic(pts));
}

export const edges = {
  torn: {
    rim: torn(7, 34, 26), // cream paper fiber, sits higher
    front: torn(19, 58, 22), // the color itself
  },
};

/** One 1200 x 100 tile as an SVG data URI, used as a CSS mask (repeat-x). */
export const edgeMask = (d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 100' preserveAspectRatio='none'><path d='${d}'/></svg>`)}")`;

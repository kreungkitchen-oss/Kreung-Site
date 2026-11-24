/**
 * Ragged edges for the scroll color flood. Paths are generated once at build
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

/** Flame tongues: overlapping pointed curves of mixed heights. */
function flames(seed: number, minH: number, maxH: number, minW: number, maxW: number) {
  const rand = rng(seed);
  let d = '';
  const tongues: string[] = [];
  let x = -maxW / 2;
  while (x < W) {
    const w = minW + rand() * (maxW - minW);
    const h = minH + rand() * (maxH - minH);
    const lean = (rand() - 0.5) * w * 0.7;
    const tip = 100 - h;
    const mk = (ox: number) =>
      // an S-curved tongue: bulges one way, then curls back to a leaning tip
      `M${r1(ox)} 100 C${r1(ox + w * 0.12)} ${r1(100 - h * 0.55)} ${r1(ox + w * 0.62 + lean)} ${r1(100 - h * 0.6)} ${r1(ox + w * 0.42 + lean * 1.4)} ${r1(tip)} ` +
      `C${r1(ox + w * 0.9 + lean * 0.6)} ${r1(100 - h * 0.62)} ${r1(ox + w * 0.82)} ${r1(100 - h * 0.3)} ${r1(ox + w)} 100 Z`;
    tongues.push(mk(x), mk(x + W));
    x += w * (0.55 + rand() * 0.3);
  }
  d = tongues.join(' ');
  return d;
}

/** Soft smoke: a slow wave of round bumps. */
function smoke(seed: number, base: number, amp: number) {
  const rand = rng(seed);
  let d = `M0 100 L0 ${base}`;
  let x = 0;
  const segs: string[] = [];
  while (x < W) {
    const w = 70 + rand() * 120;
    const nx = Math.min(W, x + w);
    const h = amp * (0.4 + rand() * 0.6);
    segs.push(`Q${r1((x + nx) / 2)} ${r1(base - h * 2)} ${r1(nx)} ${base}`);
    x = nx;
  }
  const one = segs.join(' ');
  const two = segs.map((s) => s.replace(/Q([\d.]+) ([\d.-]+) ([\d.]+) /, (_, a, b, c) => `Q${r1(+a + W)} ${b} ${r1(+c + W)} `)).join(' ');
  d += ` ${one} ${two} L${2 * W} 100 Z`;
  return d;
}

export const edges = {
  torn: {
    rim: torn(7, 34, 26), // cream paper fiber, sits higher
    front: torn(19, 58, 22), // the color itself
  },
  flame: {
    smoke: smoke(3, 30, 14),
    back: flames(11, 60, 98, 70, 150),
    front: flames(29, 34, 78, 50, 110),
  },
};

/** One 1200 x 100 tile as an SVG data URI, used as a CSS mask (repeat-x). */
export const edgeMask = (d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 100' preserveAspectRatio='none'><path d='${d}'/></svg>`)}")`;

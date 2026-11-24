/**
 * Section color "tones" for the scroll color flood.
 * Each section declares data-bg / data-fg / data-hf / data-hs (and data-hsw for
 * the heading outline). The same values go into inline CSS variables, so with
 * JavaScript off every section still shows its own solid color.
 *
 * Contrast (WCAG 2.1 AA), checked with scripts in the PR notes:
 *  yellow  #F7D63B  plum text 10.99:1
 *  orange  #F4A100  plum text 7.47:1; cream headings carry a 2.5px plum outline (outline vs orange 7.47:1)
 *  plum    #2B1B3F  cream text 14.2:1, yellow headings 10.99:1
 *  teal    #3099A5  plum text 4.68:1 (brand teal #2F95A1 is 4.46:1, so nudged 1 step lighter); cream headings with plum outline
 *  cream   #FDF2DB  plum text 14.2:1
 *  pink    #BB3E6F  cream text 4.69:1 (brand pink #C75682 is 3.72:1, so deepened); yellow headings 3.63:1 (large text) with plum outline
 */
export const tones = {
  yellow: { bg: '#F7D63B', fg: '#2B1B3F', hf: '#2B1B3F', hs: '#C75682', hsw: 0 },
  orange: { bg: '#F4A100', fg: '#2B1B3F', hf: '#FDF2DB', hs: '#2B1B3F', hsw: 2.5 },
  plum: { bg: '#2B1B3F', fg: '#FDF2DB', hf: '#F7D63B', hs: '#C75682', hsw: 0 },
  teal: { bg: '#3099A5', fg: '#2B1B3F', hf: '#FDF2DB', hs: '#2B1B3F', hsw: 2.5 },
  cream: { bg: '#FDF2DB', fg: '#2B1B3F', hf: '#2B1B3F', hs: '#C75682', hsw: 0 },
  pink: { bg: '#BB3E6F', fg: '#FDF2DB', hf: '#F7D63B', hs: '#2B1B3F', hsw: 2 },
} as const;

export type ToneName = keyof typeof tones;

/** Spread onto a section: <section {...tone('plum')}> */
export function tone(name: ToneName) {
  const t = tones[name];
  return {
    'data-tone': name,
    'data-bg': t.bg,
    'data-fg': t.fg,
    'data-hf': t.hf,
    'data-hs': t.hs,
    'data-hsw': String(t.hsw),
    style: `--bg:${t.bg};--fg:${t.fg};--hf:${t.hf};--hs:${t.hs};--hsw:${t.hsw}px`,
  };
}

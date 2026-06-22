/**
 * @typedef {Object} Palette
 * @property {string} id - Unique identifier (UUID)
 * @property {string} title - Palette name (e.g. "Gece Modu")
 * @property {string[]} colors - Array of HEX color codes (min 4)
 * @property {string} description - Short description of the palette
 * @property {number} createdAt - Unix timestamp
 */

export const DEFAULT_PALETTES = [
  {
    id: "default-1",
    title: "Pastel Dream",
    colors: ["#f9a8d4", "#c4b5fd", "#93c5fd", "#6ee7b7"],
    description: "Soft pastel tones for dreamy UI designs. Perfect for lifestyle and wellness apps.",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "default-2",
    title: "Ocean Wave",
    colors: ["#0f172a", "#0e7490", "#38bdf8", "#f0f9ff"],
    description: "Deep ocean inspired palette ranging from midnight navy to crisp sky blue.",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "default-3",
    title: "Ember Forge",
    colors: ["#1c1917", "#b45309", "#f59e0b", "#fef9c3"],
    description: "Warm amber and molten gold tones. Ideal for premium, bold design systems.",
    createdAt: Date.now(),
  },
];

/**
 * Creates a new Palette object
 * @param {string} title
 * @param {string[]} colors
 * @param {string} description
 * @returns {Palette}
 */
export function createPalette(title, colors, description) {
  return {
    id: crypto.randomUUID(),
    title,
    colors,
    description,
    createdAt: Date.now(),
  };
}
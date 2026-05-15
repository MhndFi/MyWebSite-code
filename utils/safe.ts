// Small security helpers used across the UI.
// All user-controllable strings that end up in href / src must pass through here.

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

/** Returns a safe URL string (http/https/mailto only) or empty string. */
export const safeUrl = (raw: string | undefined | null): string => {
  if (!raw) return '';
  const trimmed = String(raw).trim();
  if (!trimmed) return '';
  try {
    const u = new URL(trimmed, window.location.origin);
    return SAFE_PROTOCOLS.has(u.protocol) ? u.toString() : '';
  } catch {
    return '';
  }
};

/** Returns a safe image src — accepts http(s), same-origin paths, or data:image/* / blob:. */
export const safeImageSrc = (raw: string | undefined | null): string => {
  if (!raw) return '';
  const trimmed = String(raw).trim();
  if (!trimmed) return '';

  // Allow data:image/* (raster only) and blob: for user uploads.
  // SVG is intentionally disallowed in user uploads to avoid stored XSS,
  // but http(s) SVGs (e.g. bundled logo) are fine via the URL branch below.
  if (/^data:image\/(png|jpe?g|gif|webp);/i.test(trimmed)) return trimmed;
  if (/^blob:/i.test(trimmed)) return trimmed;

  try {
    const u = new URL(trimmed, window.location.origin);
    if (u.protocol === 'http:' || u.protocol === 'https:') return u.toString();
    return '';
  } catch {
    return '';
  }
};

/** Validate an uploaded image File. Returns null when ok, otherwise a human message. */
export const validateImageFile = (
  file: File,
  { maxBytes = 1.5 * 1024 * 1024 }: { maxBytes?: number } = {},
): string | null => {
  if (!/^image\/(png|jpe?g|gif|webp)$/i.test(file.type)) {
    return 'Unsupported image type. Use PNG, JPG, GIF or WEBP.';
  }
  if (file.size > maxBytes) {
    const mb = Math.round((maxBytes / (1024 * 1024)) * 10) / 10;
    return `Image is too large (max ${mb} MB).`;
  }
  return null;
};

// Strip ASCII control bytes (NUL through US, and DEL); keep tab/newline/CR.
const CONTROL_CHARS = new RegExp('[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]', 'g');

/** Trim, strip control chars, and clamp arbitrary text fields. */
export const safeText = (raw: string | undefined | null, max = 5000): string => {
  if (!raw) return '';
  return String(raw).replace(CONTROL_CHARS, '').trim().slice(0, max);
};

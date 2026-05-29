/**
 * Serialize a JSON-LD object for inline injection inside a `<script
 * type="application/ld+json">` tag. Escapes `<` so a stray "</script>"
 * in any string field can't break out of the surrounding tag. JSON-LD
 * parsers treat the unicode escape as a literal `<`, so semantics are
 * preserved.
 */
export function jsonLdString(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

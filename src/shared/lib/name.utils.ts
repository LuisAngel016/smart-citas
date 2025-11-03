/**
 * Utilities for name handling
 */
export const getInitials = (fullName: string): string => {
  const name = (fullName || "").trim();
  if (!name) return "";

  const parts = name.split(/\s+/).filter(Boolean);

  // 1 palabra: devolver hasta 2 letras (ej. "María" -> "MA")
  if (parts.length === 1) {
    const w = parts[0];
    return w.slice(0, 2).toUpperCase();
  }

  // 2 palabras: tomar iniciales 0 y 1
  if (parts.length === 2) {
    const a = parts[0][0] ?? "";
    const b = parts[1][0] ?? "";
    return (a + b).toUpperCase();
  }

  // 3 palabras: tomar 0 y 1
  if (parts.length === 3) {
    const a = parts[0][0] ?? "";
    const b = parts[1][0] ?? "";
    return (a + b).toUpperCase();
  }

  // 4 o más: tomar 0 y 2
  if (parts.length >= 4) {
    const a = parts[0][0] ?? "";
    const c = parts[2][0] ?? "";
    return (a + c).toUpperCase();
  }

  // fallback: tomar primeras dos letras del nombre
  return parts.slice(0, 2).map(p => (p[0] ?? "")).join("").toUpperCase();
}
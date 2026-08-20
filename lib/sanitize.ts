/**
 * Utility sanitasi dan validasi input keamanan
 * Mencegah XSS, HTML/Script Injection, URI exploit, dan input berbahaya.
 */

// Regex untuk mendeteksi script/HTML tag dan dangerous patterns
const HTML_TAG_REGEX = /<[^>]*>?/gm;
const DANGEROUS_PROTOCOLS_REGEX = /(javascript|data|vbscript|file):/gi;
const DANGEROUS_KEYWORDS_REGEX = /(<script|<iframe|<object|<embed|<form|onload=|onerror=|onclick=|eval\(|alert\(|document\.cookie|window\.location)/gi;

/**
 * Membersihkan string dari karakter berbahaya & tag HTML
 */
export function sanitizeInput(input: string, maxLength = 500): string {
  if (!input || typeof input !== "string") return "";

  let cleaned = input
    // Hapus null bytes dan control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Hapus tag HTML
    .replace(HTML_TAG_REGEX, "")
    // Hapus dangerous pseudo protocols
    .replace(DANGEROUS_PROTOCOLS_REGEX, "")
    // Hapus kata kunci scripting berbahaya
    .replace(DANGEROUS_KEYWORDS_REGEX, "")
    // Hapus backslash escape berlebih
    .replace(/\\/g, "/")
    // Batasi baris kosong berurutan maksimal 2
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Potong sesuai batas panjang maksimal
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Validasi nama (hanya huruf, angka, spasi, titik, koma, strip, apostrof)
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(name, 60);
  if (!sanitized) {
    return { isValid: true }; // Boleh kosong, nanti ada fallback
  }

  // Cek karakter terlarang di nama
  const nameRegex = /^[a-zA-Z0-9\s.,'’\-–]+$/;
  if (!nameRegex.test(sanitized)) {
    return {
      isValid: false,
      error: "Nama hanya boleh berisi huruf, angka, spasi, dan tanda baca standar (titik, strip, koma).",
    };
  }

  return { isValid: true };
}

/**
 * Validasi topik projek
 */
export function validateTopic(topic: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(topic, 100);
  if (!sanitized) {
    return { isValid: true };
  }

  const topicRegex = /^[a-zA-Z0-9\s.,'’\-–/&+()]+$/;
  if (!topicRegex.test(sanitized)) {
    return {
      isValid: false,
      error: "Topik hanya boleh mengandung karakter alfanumerik dan simbol umum (&, /, +, -, ()).",
    };
  }

  return { isValid: true };
}

/**
 * Validasi estimasi budget
 */
export function validateBudget(budget: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(budget, 60);
  if (!sanitized) {
    return { isValid: true };
  }

  const budgetRegex = /^[a-zA-Z0-9\s.,'’\-–<>=+/$%]+$/;
  if (!budgetRegex.test(sanitized)) {
    return {
      isValid: false,
      error: "Budget mengandung karakter yang tidak valid.",
    };
  }

  return { isValid: true };
}

/**
 * Validasi pesan detail
 */
export function validateMessage(message: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(message, 1000);
  if (!sanitized) {
    return { isValid: true };
  }

  if (DANGEROUS_KEYWORDS_REGEX.test(message)) {
    return {
      isValid: false,
      error: "Pesan mengandung tag atau kode yang tidak diizinkan demi keamanan.",
    };
  }

  return { isValid: true };
}

import type { ServicePlan } from '@/lib/subscription/types';

/**
 * Korean initial consonants (초성)
 */
const CHOSUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

/**
 * Extract initial consonants from Korean text
 * Example: "챗지피티" → "ㅊㅈㅍㅌ"
 */
export function getChosung(str: string): string {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032; // Unicode offset for Hangul syllables

    if (code > -1 && code < 11172) {
      // Valid Hangul syllable
      result += CHOSUNG[Math.floor(code / 588)];
    } else {
      // Not a Hangul syllable, keep original character
      result += str.charAt(i);
    }
  }

  return result;
}

/**
 * Fuzzy search that supports:
 * 1. Direct substring matching
 * 2. Korean initial consonant matching (초성 검색)
 * 3. English initial letter matching
 */
export function fuzzySearch(query: string, target: string): boolean {
  if (!query || !target) return false;

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedTarget = target.toLowerCase();

  // 1. Direct substring matching
  if (normalizedTarget.includes(normalizedQuery)) {
    return true;
  }

  // 2. Korean initial consonant matching
  const targetChosung = getChosung(target).toLowerCase();
  if (targetChosung.includes(normalizedQuery)) {
    return true;
  }

  // 3. English initial letter matching
  // Example: "chat" matches "ChatGPT" by initials "cgpt"
  const words = target.split(/[\s-_/]+/); // Split by whitespace, dash, underscore, slash
  const initials = words.map(w => w[0] || '').join('').toLowerCase();
  if (initials.includes(normalizedQuery)) {
    return true;
  }

  return false;
}

/**
 * Filter service plans by search query
 * Searches in both service_name and plan_name
 */
export function filterServices(
  query: string,
  services: ServicePlan[]
): ServicePlan[] {
  if (!query || !query.trim()) {
    return services;
  }

  return services.filter(service =>
    fuzzySearch(query, service.service_name) ||
    fuzzySearch(query, service.plan_name)
  );
}

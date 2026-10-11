import { describe, it, expect } from 'vitest';
import { 
  normalizeVietnamese, 
  normalizeDeepNFC, 
  toSearchNormalized, 
  matchesVietnameseSearch 
} from './unicode';

describe('Unicode Utilities for Vietnamese Literature', () => {
  describe('normalizeVietnamese', () => {
    it('normalizes NFD Vietnamese text to NFC (dựng sẵn)', () => {
      // "Tây Tiến" in decomposed NFD vs precomposed NFC
      const nfdText = 'Ta\u0302y Tie\u0302\u0301n'; // a + circumflex, e + circumflex + acute
      const normalized = normalizeVietnamese(nfdText);

      expect(normalized).toBe('Tây Tiến');
      expect(normalized.length).toBeLessThan(nfdText.length);
    });

    it('keeps already NFC text unchanged', () => {
      const nfcText = 'Kế hoạch bài dạy môn Ngữ văn GDPT 2018';
      expect(normalizeVietnamese(nfcText)).toBe(nfcText);
    });

    it('handles empty string without error', () => {
      expect(normalizeVietnamese('')).toBe('');
    });

    it('returns non-string values safely as is', () => {
      // @ts-expect-error testing boundary value
      expect(normalizeVietnamese(null)).toBe(null);
      // @ts-expect-error testing boundary value
      expect(normalizeVietnamese(undefined)).toBe(undefined);
      // @ts-expect-error testing boundary value
      expect(normalizeVietnamese(12345)).toBe(12345);
    });

    it('preserves emojis and special punctuation', () => {
      const textWithEmoji = '✨ Vợ nhặt — Kim Lân (1945) ✨';
      expect(normalizeVietnamese(textWithEmoji)).toBe(textWithEmoji);
    });
  });

  describe('normalizeDeepNFC', () => {
    it('recursively normalizes strings inside nested objects and arrays', () => {
      const input = {
        title: 'Ta\u0302y Tie\u0302\u0301n',
        metadata: {
          author: 'Quang Du\u0303ng', // decomposed u + tilde
          tags: ['Tho\u031b', 'Kha\u0301ng chie\u0302\u0301n'],
        },
        count: 42,
        isActive: true,
        emptyVal: null,
      };

      const result = normalizeDeepNFC(input);

      expect(result.title).toBe('Tây Tiến');
      expect(result.metadata.author).toBe('Quang Dũng');
      expect(result.metadata.tags).toEqual(['Thơ', 'Kháng chiến']);
      expect(result.count).toBe(42);
      expect(result.isActive).toBe(true);
      expect(result.emptyVal).toBeNull();
    });

    it('handles arrays of primitives and arrays of objects', () => {
      const arr = ['Tie\u0302\u0301ng Vie\u0323\u0302t', { name: 'Kim La\u0302n' }];
      const result = normalizeDeepNFC(arr);

      expect(result[0]).toBe('Tiếng Việt');
      expect((result[1] as any).name).toBe('Kim Lân');
    });

    it('returns primitive values, null, and undefined unmodified', () => {
      expect(normalizeDeepNFC(null)).toBeNull();
      expect(normalizeDeepNFC(undefined)).toBeUndefined();
      expect(normalizeDeepNFC(100)).toBe(100);
      expect(normalizeDeepNFC(false)).toBe(false);
    });

    it('handles empty objects and empty arrays', () => {
      expect(normalizeDeepNFC({})).toEqual({});
      expect(normalizeDeepNFC([])).toEqual([]);
    });
  });

  describe('toSearchNormalized', () => {
    it('removes Vietnamese diacritics and converts to lowercase', () => {
      expect(toSearchNormalized('Ngữ văn THPT')).toBe('ngu van thpt');
      expect(toSearchNormalized('Áo bào thay chiếu, anh về đất')).toBe('ao bao thay chieu, anh ve dat');
    });

    it('converts đ and Đ to d', () => {
      expect(toSearchNormalized('Độc lập - Tự do')).toBe('doc lap - tu do');
      expect(toSearchNormalized('đất nước')).toBe('dat nuoc');
    });

    it('trims leading and trailing whitespace', () => {
      expect(toSearchNormalized('   Tây Tiến   ')).toBe('tay tien');
    });

    it('handles empty or non-string input safely', () => {
      expect(toSearchNormalized('')).toBe('');
      // @ts-expect-error testing boundary value
      expect(toSearchNormalized(null)).toBe('');
      // @ts-expect-error testing boundary value
      expect(toSearchNormalized(undefined)).toBe('');
    });
  });

  describe('matchesVietnameseSearch', () => {
    it('matches when source contains query regardless of accents', () => {
      expect(matchesVietnameseSearch('Tây Tiến - Quang Dũng', 'tay tien')).toBe(true);
      expect(matchesVietnameseSearch('Tây Tiến - Quang Dũng', 'quang dung')).toBe(true);
      expect(matchesVietnameseSearch('Vợ nhặt', 'vo nhat')).toBe(true);
    });

    it('matches regardless of case sensitivity', () => {
      expect(matchesVietnameseSearch('Tuyên ngôn Độc lập', 'TUYEN NGON')).toBe(true);
      expect(matchesVietnameseSearch('hồ chí minh', 'Hồ Chí Minh')).toBe(true);
    });

    it('returns true when query is empty', () => {
      expect(matchesVietnameseSearch('Tác phẩm Ngữ văn', '')).toBe(true);
    });

    it('returns false when source is empty', () => {
      expect(matchesVietnameseSearch('', 'test')).toBe(false);
    });

    it('returns false when query does not match source', () => {
      expect(matchesVietnameseSearch('Tây Tiến', 'Truyện Kiều')).toBe(false);
    });
  });
});

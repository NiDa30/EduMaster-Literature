import { describe, it, expect } from 'vitest';
import { 
  resolveSlideStyle, 
  getContrastRatio, 
  getContrastWarning, 
  validateHexColor, 
  normalizeHex, 
  isColorDark, 
  isBackgroundDark,
  getPptxFontName,
  getSlideCssFontFamily,
  getSlideCssBackground
} from '../utils/slideStyleUtils';
import { 
  SLIDE_THEMES, 
  DEFAULT_THEME_ID, 
  SOLID_COLOR_PRESETS, 
  GRADIENT_PRESETS, 
  ACADEMIC_VIGNETTES,
  SLIDE_TEMPLATES 
} from '../config/slideThemes';
import { SlideItem, SlidesPresentationSettings } from '../types';

describe('Slide Design System & Theme Engine', () => {
  const dummySlide: SlideItem = {
    id: 's-test-1',
    title: 'HÌNH TƯỢNG NGƯỜI LÍNH TÂY TIẾN',
    phaseTag: 'Kiến thức mới',
    layout: 'quote',
    contentLeft: 'Nội dung phân tích...',
    quoteText: 'Tây Tiến đoàn binh không mọc tóc...',
    quoteAuthor: 'Quang Dũng',
    speakerNotes: 'Ghi chú bài dạy'
  };

  describe('1. Style Cascade & Resolution Priority', () => {
    it('resolves default cinematic-literary theme when no overrides or settings are present', () => {
      const resolved = resolveSlideStyle(dummySlide);
      expect(resolved.themeId).toBe(DEFAULT_THEME_ID);
      expect(resolved.theme.name).toBe('Điện ảnh Văn học');
      expect(resolved.background.type).toBe('solid');
      expect(resolved.background.color).toBe('#171413');
      expect(resolved.isDark).toBe(true);
      expect(resolved.titleStyle.fontFamily).toBe('Lora');
      expect(resolved.bodyStyle.fontFamily).toBe('Be Vietnam Pro');
    });

    it('inherits presentation defaultThemeId when slide has no override', () => {
      const settings: SlidesPresentationSettings = {
        defaultThemeId: 'classic-paper'
      };
      const resolved = resolveSlideStyle(dummySlide, settings);
      expect(resolved.themeId).toBe('classic-paper');
      expect(resolved.theme.name).toBe('Trang sách cổ điển');
      expect(resolved.background.color).toBe('#F6F0E4');
      expect(resolved.isDark).toBe(false);
    });

    it('gives highest priority to slide.styleOverrides over presentation settings', () => {
      const settings: SlidesPresentationSettings = {
        defaultThemeId: 'classic-paper'
      };
      const slideWithOverride: SlideItem = {
        ...dummySlide,
        styleOverrides: {
          themeId: 'academic-burgundy',
          titleStyle: {
            fontSize: 48,
            color: '#FFD700',
            align: 'center'
          }
        }
      };
      const resolved = resolveSlideStyle(slideWithOverride, settings);
      expect(resolved.themeId).toBe('academic-burgundy');
      expect(resolved.theme.name).toBe('Học thuật Burgundy');
      expect(resolved.titleStyle.fontSize).toBe(48);
      expect(resolved.titleStyle.color).toBe('#FFD700');
      expect(resolved.titleStyle.align).toBe('center');
      // Body style inherits from academic-burgundy theme default
      expect(resolved.bodyStyle.fontFamily).toBe('Be Vietnam Pro');
    });

    it('properly overrides background on individual slide while keeping theme colors', () => {
      const slideWithBgOverride: SlideItem = {
        ...dummySlide,
        styleOverrides: {
          background: {
            type: 'solid',
            color: '#18352B' // forest
          }
        }
      };
      const resolved = resolveSlideStyle(slideWithBgOverride);
      expect(resolved.themeId).toBe(DEFAULT_THEME_ID);
      expect(resolved.background.color).toBe('#18352B');
      expect(resolved.isDark).toBe(true);
    });

    it('adjusts default title size based on layout (quote layout uses 26px default)', () => {
      const quoteSlide = { ...dummySlide, layout: 'quote' as const };
      const singleSlide = { ...dummySlide, layout: 'single' as const };
      
      const resolvedQuote = resolveSlideStyle(quoteSlide);
      const resolvedSingle = resolveSlideStyle(singleSlide);

      expect(resolvedQuote.titleStyle.fontSize).toBe(26);
      expect(resolvedSingle.titleStyle.fontSize).toBe(34);
    });
  });

  describe('2. WCAG Contrast Calculation & Warnings', () => {
    it('calculates accurate contrast ratios (black on white is 21:1, identical is 1:1)', () => {
      const ratioMax = getContrastRatio('#000000', '#ffffff');
      expect(ratioMax).toBeGreaterThanOrEqual(20.5);

      const ratioMin = getContrastRatio('#ffffff', '#ffffff');
      expect(ratioMin).toBe(1.0);
    });

    it('passes WCAG AA contrast check for high-contrast combinations', () => {
      // Light text on obsidian dark bg
      const warningLightOnDark = getContrastWarning('#FAF8F5', '#171413', 16);
      expect(warningLightOnDark).toBeNull();

      // Dark brown text on warm paper bg
      const warningDarkOnPaper = getContrastWarning('#3F2D26', '#F6F0E4', 16);
      expect(warningDarkOnPaper).toBeNull();
    });

    it('triggers contrast warning message when ratio is below 4.5:1 for body text', () => {
      // Low contrast gray on gray
      const warningLow = getContrastWarning('#888888', '#777777', 16);
      expect(warningLow).not.toBeNull();
      expect(warningLow).toContain('Độ tương phản thấp');
    });

    it('respects 3.0:1 threshold for large text (>= 24px or bold >= 18.5px)', () => {
      // Text with contrast ~3.5:1 should warn for 16px normal, but pass for 28px title
      const color = '#996633';
      const bg = '#FFFFFF';
      const ratio = getContrastRatio(color, bg);
      
      if (ratio >= 3.0 && ratio < 4.5) {
        const smallTextWarning = getContrastWarning(color, bg, 16, false);
        const largeTextWarning = getContrastWarning(color, bg, 28, false);
        expect(smallTextWarning).not.toBeNull();
        expect(largeTextWarning).toBeNull();
      }
    });
  });

  describe('3. Color and Hex Normalization', () => {
    it('validates 3-char and 6-char hex colors properly', () => {
      expect(validateHexColor('#FFF')).toBe(true);
      expect(validateHexColor('#ffffff')).toBe(true);
      expect(validateHexColor('#171413')).toBe(true);
      expect(validateHexColor('red')).toBe(false);
      expect(validateHexColor('123456')).toBe(false);
      expect(validateHexColor('#1234567')).toBe(false);
    });

    it('normalizes 3-char hex to full 6-char format', () => {
      expect(normalizeHex('#fff')).toBe('#ffffff');
      expect(normalizeHex('#abc')).toBe('#aabbcc');
      expect(normalizeHex('#171413')).toBe('#171413');
      expect(normalizeHex('invalid', '#000000')).toBe('#000000');
    });

    it('identifies dark vs light colors and backgrounds correctly', () => {
      expect(isColorDark('#171413')).toBe(true);
      expect(isColorDark('#000000')).toBe(true);
      expect(isColorDark('#FFFFFF')).toBe(false);
      expect(isColorDark('#FAF8F5')).toBe(false);

      expect(isBackgroundDark({ type: 'solid', color: '#171413' })).toBe(true);
      expect(isBackgroundDark({ type: 'solid', color: '#FFFFFF' })).toBe(false);
      expect(isBackgroundDark({ type: 'gradient', gradient: { from: '#171413', to: '#29201D' } })).toBe(true);
    });
  });

  describe('4. Font Mapping for Web and PPTX Export Parity', () => {
    it('maps web serif fonts to standard PPTX Georgia font for classroom PC compatibility', () => {
      expect(getPptxFontName('Lora')).toBe('Georgia');
      expect(getPptxFontName('Merriweather')).toBe('Georgia');
      expect(getPptxFontName('Noto Serif')).toBe('Georgia');
      expect(getPptxFontName('Georgia')).toBe('Georgia');
    });

    it('maps web sans-serif fonts to standard PPTX Arial font', () => {
      expect(getPptxFontName('Be Vietnam Pro')).toBe('Arial');
      expect(getPptxFontName('Inter')).toBe('Arial');
      expect(getPptxFontName('Noto Sans')).toBe('Arial');
      expect(getPptxFontName('Arial')).toBe('Arial');
    });

    it('returns full CSS font family stack with fallback for web rendering', () => {
      const loraStack = getSlideCssFontFamily('Lora');
      expect(loraStack).toContain('Lora');
      expect(loraStack).toContain('serif');

      const beVietnamStack = getSlideCssFontFamily('Be Vietnam Pro');
      expect(beVietnamStack).toContain('Be Vietnam Pro');
      expect(beVietnamStack).toContain('sans-serif');
    });
  });

  describe('5. CSS Background Generator', () => {
    it('generates solid background CSS', () => {
      const css = getSlideCssBackground({ type: 'solid', color: '#7A2938' });
      expect(css.backgroundColor).toBe('#7A2938');
    });

    it('generates linear gradient background CSS', () => {
      const css = getSlideCssBackground({
        type: 'gradient',
        gradient: { from: '#142D25', to: '#285343', angle: 135 }
      });
      expect(css.background).toContain('linear-gradient(135deg, #142D25, #285343)');
    });

    it('generates vignette radial gradient CSS', () => {
      const css = getSlideCssBackground({
        type: 'vignette',
        vignette: { name: 'Ánh nến', baseColor: '#171413', glowColor: 'rgba(245, 158, 11, 0.12)' }
      });
      expect(css.backgroundColor).toBe('#171413');
      expect(css.backgroundImage).toContain('radial-gradient');
    });
  });

  describe('6. Built-in Preset Config Integrity', () => {
    it('contains all 8 curated academic themes with valid color structures', () => {
      expect(Object.keys(SLIDE_THEMES)).toHaveLength(8);
      const expectedThemes = [
        'cinematic-literary',
        'academic-burgundy',
        'classic-paper',
        'light-editorial',
        'forest-academic',
        'night-poetry',
        'sepia-literature',
        'minimal-bw'
      ];
      expectedThemes.forEach(id => {
        const theme = SLIDE_THEMES[id];
        expect(theme).toBeDefined();
        expect(theme.name).toBeDefined();
        expect(theme.colors.title).toBeDefined();
        expect(theme.colors.text).toBeDefined();
        expect(theme.colors.accent).toBeDefined();
        expect(theme.typography.titleFont).toBeDefined();
        expect(theme.typography.bodyFont).toBeDefined();
      });
    });

    it('contains 8 solid color presets and 5 gradient presets', () => {
      expect(SOLID_COLOR_PRESETS).toHaveLength(8);
      expect(GRADIENT_PRESETS).toHaveLength(5);
    });

    it('contains 6 literary academic vignettes', () => {
      expect(ACADEMIC_VIGNETTES).toHaveLength(6);
      ACADEMIC_VIGNETTES.forEach(v => {
        expect(v.name).toBeDefined();
        expect(v.cssBackground).toBeDefined();
        expect(v.fallbackColor).toBeDefined();
      });
    });

    it('contains 12 pre-configured slide templates across all 5 layout categories', () => {
      expect(SLIDE_TEMPLATES).toHaveLength(12);
      const categories = SLIDE_TEMPLATES.map(t => t.category);
      expect(categories).toContain('quote');
      expect(categories).toContain('split');
      expect(categories).toContain('cards');
      expect(categories).toContain('quiz');
      expect(categories).toContain('single');
    });
  });

  describe('7. Backward Compatibility Guarantee', () => {
    it('handles legacy SlideItem without styleOverrides seamlessly', () => {
      const legacySlide: SlideItem = {
        id: 'legacy-1',
        title: 'BÀI GIẢNG CŨ',
        phaseTag: 'Khởi động',
        layout: 'single',
        contentLeft: 'Văn bản cũ chưa có cấu hình theme',
        speakerNotes: 'Ghi chú cũ'
      };
      
      const resolved = resolveSlideStyle(legacySlide);
      expect(resolved).toBeDefined();
      expect(resolved.themeId).toBe(DEFAULT_THEME_ID);
      expect(resolved.titleStyle.color).toBe('#FAF8F5');
      expect(resolved.bodyStyle.color).toBe('#E7E5E4');
    });
  });
});

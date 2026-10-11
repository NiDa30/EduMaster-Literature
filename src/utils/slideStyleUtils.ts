import React from 'react';
import {
  SlideItem,
  SlidesPresentationSettings,
  SlideTheme,
  SlideBackground,
  SlideTextStyle
} from '../types';
import { SLIDE_THEMES, DEFAULT_THEME_ID } from '../config/slideThemes';

// =========================================================================
// 1. RESOLVED TYPES & FONT MAPPINGS
// =========================================================================

export interface ResolvedTextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  color: string;
  lineHeight?: number;
}

export interface ResolvedSlideStyle {
  themeId: string;
  theme: SlideTheme;
  background: SlideBackground;
  titleStyle: ResolvedTextStyle;
  bodyStyle: ResolvedTextStyle;
  quoteStyle: ResolvedTextStyle;
  accentColor: string;
  secondaryTextColor: string;
  cardBackground: string;
  cardBorder: string;
  radius: number;
  isDark: boolean;
}

export const FONT_FAMILY_CSS_MAP: Record<string, string> = {
  'Lora': "'Lora', Georgia, 'Times New Roman', serif",
  'Georgia': "Georgia, 'Times New Roman', serif",
  'Merriweather': "'Merriweather', Georgia, serif",
  'Noto Serif': "'Noto Serif', 'Times New Roman', serif",
  'Be Vietnam Pro': "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  'Arial': "Arial, Helvetica, sans-serif",
  'Inter': "'Inter', system-ui, -apple-system, sans-serif",
  'Noto Sans': "'Noto Sans', Arial, sans-serif"
};

export const PPTX_FONT_MAP: Record<string, string> = {
  'Lora': 'Georgia',
  'Georgia': 'Georgia',
  'Merriweather': 'Georgia',
  'Noto Serif': 'Georgia',
  'Be Vietnam Pro': 'Arial',
  'Arial': 'Arial',
  'Inter': 'Arial',
  'Noto Sans': 'Arial'
};

export function getSlideCssFontFamily(font: string): string {
  return FONT_FAMILY_CSS_MAP[font] || font;
}

export function getPptxFontName(font: string): string {
  return PPTX_FONT_MAP[font] || 'Arial';
}

// =========================================================================
// 2. COLOR & CONTRAST UTILITIES (WCAG 2.1 AA)
// =========================================================================

export function validateHexColor(hex: string): boolean {
  if (!hex) return false;
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
}

export function normalizeHex(hex: string, fallback = '#171413'): string {
  if (!hex) return fallback;
  const trimmed = hex.trim();
  if (validateHexColor(trimmed)) {
    if (trimmed.length === 4) {
      return '#' + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2] + trimmed[3] + trimmed[3];
    }
    return trimmed;
  }
  return fallback;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const norm = normalizeHex(hex, '');
  if (!norm) return null;
  const r = parseInt(norm.substring(1, 3), 16);
  const g = parseInt(norm.substring(3, 5), 16);
  const b = parseInt(norm.substring(5, 7), 16);
  return { r, g, b };
}

export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function getContrastRatio(colorHex: string, bgHex: string): number {
  const rgb1 = hexToRgb(colorHex);
  const rgb2 = hexToRgb(bgHex);
  if (!rgb1 || !rgb2) return 1.0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function isColorDark(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const lum = getLuminance(rgb.r, rgb.g, rgb.b);
  return lum < 0.35;
}

export function isBackgroundDark(bg?: SlideBackground): boolean {
  if (!bg) return true;
  if (bg.type === 'solid') {
    return isColorDark(bg.color || '#171413');
  }
  if (bg.type === 'gradient') {
    return isColorDark(bg.gradient?.from || '#171413');
  }
  if (bg.type === 'image') {
    if (bg.overlay && bg.overlay.opacity >= 0.4) {
      return isColorDark(bg.overlay.color);
    }
    return true; // Default fallback for slide imagery in dark academic style
  }
  if (bg.type === 'vignette') {
    return isColorDark(bg.vignette?.fallbackColor || bg.vignette?.baseColor || '#171413');
  }
  return true;
}

export function getEffectiveBackgroundHex(bg?: SlideBackground): string {
  if (!bg) return '#171413';
  if (bg.type === 'solid') return bg.color || '#171413';
  if (bg.type === 'gradient') return bg.gradient?.from || '#171413';
  if (bg.type === 'image' && bg.overlay) return bg.overlay.color || '#171413';
  if (bg.type === 'vignette') return bg.vignette?.fallbackColor || bg.vignette?.baseColor || '#171413';
  return '#171413';
}

export function getContrastWarning(
  textColor: string,
  bg?: SlideBackground | string,
  fontSize = 16,
  isBold = false
): string | null {
  const bgHex = typeof bg === 'string' ? bg : getEffectiveBackgroundHex(bg);
  if (!validateHexColor(textColor) || !validateHexColor(bgHex)) return null;

  const ratio = getContrastRatio(textColor, bgHex);
  const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && isBold);
  const required = isLargeText ? 3.0 : 4.5;

  if (ratio < required) {
    return `Độ tương phản thấp (${ratio.toFixed(1)}:1 < ${required}:1). Có thể khó đọc trên máy chiếu lớp học.`;
  }
  return null;
}

// =========================================================================
// 3. STYLE RESOLUTION CASCADE
// =========================================================================

export function resolveSlideStyle(
  slide?: SlideItem,
  settings?: SlidesPresentationSettings
): ResolvedSlideStyle {
  // 1. Resolve Theme ID
  const themeId =
    slide?.styleOverrides?.themeId ||
    settings?.defaultThemeId ||
    DEFAULT_THEME_ID;

  const theme: SlideTheme =
    SLIDE_THEMES[themeId] ||
    SLIDE_THEMES[DEFAULT_THEME_ID] ||
    Object.values(SLIDE_THEMES)[0];

  // 2. Resolve Background
  const background: SlideBackground =
    slide?.styleOverrides?.background ||
    settings?.defaultBackground ||
    theme.background;

  const isDark = isBackgroundDark(background);

  // 3. Resolve Title Style
  const titleOverrides: SlideTextStyle = slide?.styleOverrides?.titleStyle || {};
  const isQuoteLayout = slide?.layout === 'quote';
  const defaultTitleSize = isQuoteLayout ? 26 : 34;

  const titleStyle: ResolvedTextStyle = {
    fontFamily: titleOverrides.fontFamily || theme.typography.titleFont,
    fontSize: titleOverrides.fontSize ?? defaultTitleSize,
    fontWeight: titleOverrides.fontWeight ?? (theme.typography.titleWeight || 600),
    italic: Boolean(titleOverrides.italic),
    align: titleOverrides.align || 'left',
    color: titleOverrides.color || theme.colors.title
  };

  // 4. Resolve Body Style
  const bodyOverrides: SlideTextStyle = slide?.styleOverrides?.bodyStyle || {};
  const bodyStyle: ResolvedTextStyle = {
    fontFamily: bodyOverrides.fontFamily || theme.typography.bodyFont,
    fontSize: bodyOverrides.fontSize ?? 17,
    fontWeight: bodyOverrides.fontWeight ?? (theme.typography.bodyWeight || 400),
    italic: Boolean(bodyOverrides.italic),
    align: bodyOverrides.align || 'left',
    color: bodyOverrides.color || theme.colors.text
  };

  // 5. Resolve Quote Style
  const quoteOverrides: SlideTextStyle = slide?.styleOverrides?.quoteStyle || {};
  const quoteStyle: ResolvedTextStyle = {
    fontFamily: quoteOverrides.fontFamily || theme.typography.quoteFont,
    fontSize: quoteOverrides.fontSize ?? 22,
    fontWeight: quoteOverrides.fontWeight ?? 500,
    italic: quoteOverrides.italic !== undefined ? quoteOverrides.italic : true,
    align: quoteOverrides.align || 'left',
    color: quoteOverrides.color || theme.colors.quote || theme.colors.title
  };

  // 6. Accent & Surface Colors
  const accentColor = slide?.styleOverrides?.accentColor || theme.colors.accent;
  const secondaryTextColor = theme.colors.secondaryText;
  const cardBackground =
    theme.colors.cardBackground ||
    (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)');
  const cardBorder =
    theme.colors.cardBorder ||
    (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)');
  const radius = theme.radius || 16;

  return {
    themeId,
    theme,
    background,
    titleStyle,
    bodyStyle,
    quoteStyle,
    accentColor,
    secondaryTextColor,
    cardBackground,
    cardBorder,
    radius,
    isDark
  };
}

// =========================================================================
// 4. CSS GENERATORS FOR RUNTIME REACT RENDERING
// =========================================================================

export function getSlideCssBackground(bg: SlideBackground): React.CSSProperties {
  switch (bg.type) {
    case 'solid':
      return { backgroundColor: bg.color || '#171413' };
    case 'gradient': {
      const angle = bg.gradient?.angle ?? 135;
      const from = bg.gradient?.from || '#171413';
      const to = bg.gradient?.to || '#29201D';
      return { background: `linear-gradient(${angle}deg, ${from}, ${to})` };
    }
    case 'image': {
      return {
        backgroundImage: bg.imageUrl ? `url("${bg.imageUrl}")` : undefined,
        backgroundSize: bg.imageFit || 'cover',
        backgroundPosition: bg.imagePosition || 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#171413'
      };
    }
    case 'vignette': {
      if (bg.vignette?.cssBackground) {
        return {
          backgroundColor: bg.vignette.fallbackColor || bg.vignette.baseColor || '#171413',
          background: bg.vignette.cssBackground
        };
      }
      const base = bg.vignette?.baseColor || '#171413';
      const glow = bg.vignette?.glowColor || 'rgba(245, 158, 11, 0.12)';
      return {
        backgroundColor: base,
        backgroundImage: `radial-gradient(circle at 50% 30%, ${glow} 0%, transparent 72%)`
      };
    }
    default:
      return { backgroundColor: '#171413' };
  }
}

// =========================================================================
// 5. CLIENT IMAGE COMPRESSION FOR LOCALSTORAGE RESILIENCE
// =========================================================================

export function compressImageBase64(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Tệp không phải là định dạng hình ảnh hợp lệ.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp hình ảnh.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Không thể phân tích dữ liệu hình ảnh.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Không thể khởi tạo Canvas 2D.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

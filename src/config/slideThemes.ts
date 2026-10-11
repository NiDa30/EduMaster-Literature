import { SlideTheme, SlideTemplate, SlideFontFamily } from '../types';

// =========================================================================
// 1. EIGHT CORE ACADEMIC & EDITORIAL THEMES
// =========================================================================
export const DEFAULT_THEME_ID = 'cinematic-literary';

export const SLIDE_THEMES: Record<string, SlideTheme> = {
  'cinematic-literary': {
    id: 'cinematic-literary',
    name: 'Điện ảnh Văn học',
    description: 'Nền tối trầm ấm, ánh vàng hổ phách tôn vinh thi pháp và trích đoạn văn học.',
    style: 'cinematic',
    radius: 16,
    background: {
      type: 'solid',
      color: '#171413'
    },
    colors: {
      title: '#FAF8F5',
      text: '#E7E5E4',
      quote: '#FEF3C7',
      accent: '#F59E0B',
      secondaryText: '#A8A29E',
      cardBackground: '#272221',
      cardBorder: '#44403C'
    },
    typography: {
      titleFont: 'Lora',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'academic-burgundy': {
    id: 'academic-burgundy',
    name: 'Học thuật Burgundy',
    description: 'Sắc đỏ mận hàn lâm, trang trọng, phù hợp cho bài giảng chính thức và đề mục.',
    style: 'academic',
    radius: 16,
    background: {
      type: 'solid',
      color: '#7A2938'
    },
    colors: {
      title: '#FFFFFF',
      text: '#FAF8F5',
      quote: '#FCF3F4',
      accent: '#FBBF24',
      secondaryText: '#ECC2C9',
      cardBackground: 'rgba(252, 243, 244, 0.12)',
      cardBorder: 'rgba(252, 243, 244, 0.25)'
    },
    typography: {
      titleFont: 'Lora',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Lora',
      titleWeight: 700,
      bodyWeight: 400
    }
  },

  'classic-paper': {
    id: 'classic-paper',
    name: 'Trang sách cổ điển',
    description: 'Màu giấy ngà cổ điển, mực nâu trầm ấm; hoàn hảo cho văn học trung đại và văn xuôi.',
    style: 'classic',
    radius: 16,
    background: {
      type: 'solid',
      color: '#F6F0E4'
    },
    colors: {
      title: '#3F2D26',
      text: '#51443E',
      quote: '#2A1E19',
      accent: '#8A5A44',
      secondaryText: '#786B63',
      cardBackground: '#FFFFFF',
      cardBorder: '#D8CABB'
    },
    typography: {
      titleFont: 'Lora',
      bodyFont: 'Georgia',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'light-editorial': {
    id: 'light-editorial',
    name: 'Biên tập sáng',
    description: 'Nền ngà sáng hiện đại, độ tương phản dịu mắt; tối ưu cho bài giảng nhiều thông tin.',
    style: 'editorial',
    radius: 14,
    background: {
      type: 'solid',
      color: '#FAF8F5'
    },
    colors: {
      title: '#211E1C',
      text: '#302C29',
      quote: '#7A2938',
      accent: '#7A2938',
      secondaryText: '#706A65',
      cardBackground: '#FFFFFF',
      cardBorder: '#E5E0DA'
    },
    typography: {
      titleFont: 'Be Vietnam Pro',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'forest-academic': {
    id: 'forest-academic',
    name: 'Học thuật xanh rừng',
    description: 'Sắc xanh rêu đại ngàn sâu lắng; lý tưởng cho các tác phẩm về thiên nhiên, Tây Bắc.',
    style: 'academic',
    radius: 16,
    background: {
      type: 'solid',
      color: '#18352B'
    },
    colors: {
      title: '#F7F4EC',
      text: '#E5E7DE',
      quote: '#FFFBEB',
      accent: '#D6A756',
      secondaryText: '#A3ACA0',
      cardBackground: '#224438',
      cardBorder: '#2F5B4C'
    },
    typography: {
      titleFont: 'Lora',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'night-poetry': {
    id: 'night-poetry',
    name: 'Đêm thi ca',
    description: 'Lam đen huyền bí, điểm xuyết tím ngọc dịu nhẹ; gợi mở không gian thi ca sâu lắng.',
    style: 'cinematic',
    radius: 16,
    background: {
      type: 'solid',
      color: '#111827'
    },
    colors: {
      title: '#F9FAFB',
      text: '#E5E7EB',
      quote: '#DDD6FE',
      accent: '#C4B5FD',
      secondaryText: '#9CA3AF',
      cardBackground: '#1F2937',
      cardBorder: '#374151'
    },
    typography: {
      titleFont: 'Lora',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'sepia-literature': {
    id: 'sepia-literature',
    name: 'Văn chương Sepia',
    description: 'Tông màu hoài niệm sepia ấm, gợi nhớ những trang bản thảo xưa và ký ức lịch sử.',
    style: 'classic',
    radius: 14,
    background: {
      type: 'solid',
      color: '#EDE0CE'
    },
    colors: {
      title: '#4B3527',
      text: '#5E4637',
      quote: '#3A281D',
      accent: '#9C6746',
      secondaryText: '#856E5E',
      cardBackground: '#F7F0E4',
      cardBorder: '#D5C1AA'
    },
    typography: {
      titleFont: 'Georgia',
      bodyFont: 'Be Vietnam Pro',
      quoteFont: 'Georgia',
      titleWeight: 600,
      bodyWeight: 400
    }
  },

  'minimal-bw': {
    id: 'minimal-bw',
    name: 'Tối giản',
    description: 'Trắng đen tinh gọn, chuẩn mực tương phản cao; phù hợp cho sơ đồ, bảng biểu kiến thức.',
    style: 'minimal',
    radius: 12,
    background: {
      type: 'solid',
      color: '#FFFFFF'
    },
    colors: {
      title: '#111111',
      text: '#333333',
      quote: '#111111',
      accent: '#7A2938',
      secondaryText: '#666666',
      cardBackground: '#F9F9F9',
      cardBorder: '#E5E5E5'
    },
    typography: {
      titleFont: 'Be Vietnam Pro',
      bodyFont: 'Inter',
      quoteFont: 'Lora',
      titleWeight: 600,
      bodyWeight: 400
    }
  }
};

export const THEME_LIST = Object.values(SLIDE_THEMES);

// =========================================================================
// 2. SOLID COLOR PRESETS
// =========================================================================
export const SOLID_COLOR_PRESETS = [
  { id: 'obsidian', name: 'Obsidian', hex: '#171413', isDark: true },
  { id: 'burgundy', name: 'Burgundy', hex: '#7A2938', isDark: true },
  { id: 'warm-ivory', name: 'Warm Ivory', hex: '#FAF8F5', isDark: false },
  { id: 'paper', name: 'Trang sách', hex: '#F6F0E4', isDark: false },
  { id: 'forest', name: 'Xanh rừng', hex: '#18352B', isDark: true },
  { id: 'navy', name: 'Lam đen', hex: '#111827', isDark: true },
  { id: 'sepia', name: 'Sepia', hex: '#EDE0CE', isDark: false },
  { id: 'white', name: 'Trắng tinh', hex: '#FFFFFF', isDark: false }
];

// =========================================================================
// 3. GRADIENT PRESETS
// =========================================================================
export const GRADIENT_PRESETS = [
  { 
    id: 'grad-obsidian', 
    name: 'Đêm sâu Obsidian', 
    from: '#171413', 
    to: '#29201D', 
    angle: 135,
    isDark: true
  },
  { 
    id: 'grad-burgundy', 
    name: 'Rượu vang Burgundy', 
    from: '#541C26', 
    to: '#7A2938', 
    angle: 135,
    isDark: true
  },
  { 
    id: 'grad-forest', 
    name: 'Đại ngàn Tây Bắc', 
    from: '#142D25', 
    to: '#285343', 
    angle: 135,
    isDark: true
  },
  { 
    id: 'grad-sunset', 
    name: 'Hoàng hôn sông Đáy', 
    from: '#5B2638', 
    to: '#B45309', 
    angle: 135,
    isDark: true
  },
  { 
    id: 'grad-paper', 
    name: 'Giấy dó ngà ấm', 
    from: '#FAF8F5', 
    to: '#F4EBDD', 
    angle: 135,
    isDark: false
  }
];

// =========================================================================
// 4. ACADEMIC VIGNETTES (CSS-BASED LITERARY ATMOSPHERES)
// =========================================================================
export const ACADEMIC_VIGNETTES = [
  {
    id: 'vignette-paper',
    name: 'Giấy dó truyền thống',
    category: 'Văn học dân tộc',
    cssBackground: 'radial-gradient(ellipse at center, #FBF7EE 0%, #EFE5D0 100%)',
    fallbackColor: '#F5ECDB',
    baseColor: '#EFE5D0',
    glowColor: '#FBF7EE',
    description: 'Họa sắc giấy dó cổ phong',
    isDark: false
  },
  {
    id: 'vignette-forest',
    name: 'Núi rừng Tây Bắc',
    category: 'Tây Tiến & Kháng chiến',
    cssBackground: 'radial-gradient(circle at 80% 20%, #204B3B 0%, #11261F 70%, #0A1713 100%)',
    fallbackColor: '#11261F',
    baseColor: '#11261F',
    glowColor: '#204B3B',
    description: 'Sắc xanh đại ngàn Tây Bắc',
    isDark: true
  },
  {
    id: 'vignette-river',
    name: 'Sông Mã oai linh',
    category: 'Sử thi & Hùng tráng',
    cssBackground: 'linear-gradient(160deg, #1A1F2C 0%, #151821 50%, #251E1C 100%)',
    fallbackColor: '#1A1F2C',
    baseColor: '#151821',
    glowColor: '#1A1F2C',
    description: 'Dòng sông Mã hùng tráng',
    isDark: true
  },
  {
    id: 'vignette-town',
    name: 'Phố huyện lúc lên đèn',
    category: 'Hiện thực 1930–1945',
    cssBackground: 'radial-gradient(circle at 30% 70%, #3B2A24 0%, #1F1715 60%, #120E0D 100%)',
    fallbackColor: '#1F1715',
    baseColor: '#1F1715',
    glowColor: '#3B2A24',
    description: 'Khung cảnh phố huyện Thạch Lam',
    isDark: true
  },
  {
    id: 'vignette-moonlight',
    name: 'Ánh trăng thi ca',
    category: 'Thơ lãng mạn',
    cssBackground: 'radial-gradient(circle at 50% 20%, #1E293B 0%, #0F172A 70%, #080D1A 100%)',
    fallbackColor: '#0F172A',
    baseColor: '#0F172A',
    glowColor: '#1E293B',
    description: 'Ánh trăng thi ca lãng mạn',
    isDark: true
  },
  {
    id: 'vignette-sunset',
    name: 'Hoàng hôn sông nước',
    category: 'Trữ tình quê hương',
    cssBackground: 'linear-gradient(135deg, #4A192C 0%, #2D1424 50%, #1A0D15 100%)',
    fallbackColor: '#2D1424',
    baseColor: '#2D1424',
    glowColor: '#4A192C',
    description: 'Ánh hoàng hôn lắng đọng',
    isDark: true
  }
];

// =========================================================================
// 5. CURATED FONT FAMILIES
// =========================================================================
export interface FontOption {
  family: SlideFontFamily;
  type: 'serif' | 'sans';
  cssStack: string;
  pptxFallback: 'Georgia' | 'Arial';
}

export const FONT_OPTIONS: Record<SlideFontFamily, FontOption> = {
  'Lora': {
    family: 'Lora',
    type: 'serif',
    cssStack: "'Lora', Georgia, 'Times New Roman', serif",
    pptxFallback: 'Georgia'
  },
  'Georgia': {
    family: 'Georgia',
    type: 'serif',
    cssStack: "Georgia, 'Times New Roman', serif",
    pptxFallback: 'Georgia'
  },
  'Merriweather': {
    family: 'Merriweather',
    type: 'serif',
    cssStack: "'Merriweather', Georgia, serif",
    pptxFallback: 'Georgia'
  },
  'Noto Serif': {
    family: 'Noto Serif',
    type: 'serif',
    cssStack: "'Noto Serif', Georgia, serif",
    pptxFallback: 'Georgia'
  },
  'Be Vietnam Pro': {
    family: 'Be Vietnam Pro',
    type: 'sans',
    cssStack: "'Be Vietnam Pro', Arial, sans-serif",
    pptxFallback: 'Arial'
  },
  'Arial': {
    family: 'Arial',
    type: 'sans',
    cssStack: "Arial, Helvetica, sans-serif",
    pptxFallback: 'Arial'
  },
  'Inter': {
    family: 'Inter',
    type: 'sans',
    cssStack: "'Inter', Arial, sans-serif",
    pptxFallback: 'Arial'
  },
  'Noto Sans': {
    family: 'Noto Sans',
    type: 'sans',
    cssStack: "'Noto Sans', Arial, sans-serif",
    pptxFallback: 'Arial'
  }
};

export const SERIF_FONTS = Object.values(FONT_OPTIONS).filter(f => f.type === 'serif');
export const SANS_FONTS = Object.values(FONT_OPTIONS).filter(f => f.type === 'sans');
export const CURATED_FONTS = Object.values(FONT_OPTIONS);

// =========================================================================
// 6. 12 PRE-CONFIGURED TEMPLATES (THEME + LAYOUT + STYLING)
// =========================================================================
export const SLIDE_TEMPLATES: SlideTemplate[] = [
  {
    id: 'tmpl-quote-cinematic',
    name: 'Trích dẫn điện ảnh',
    category: 'quote',
    categoryLabel: 'Trích dẫn',
    description: 'Đoạn trích thơ/văn khổ lớn trên nền than gỗ trầm ấm với câu hỏi thảo luận.',
    themeId: 'cinematic-literary',
    suggestedLayout: 'quote',
    previewSnippet: {
      title: 'TÂY TIẾN — QUANG DŨNG',
      quote: 'Chiến trường đi chẳng tiếc đời xanh,\nÁo bào thay chiếu anh về đất...',
      author: 'Quang Dũng'
    }
  },
  {
    id: 'tmpl-quote-paper',
    name: 'Trích dẫn trang sách',
    category: 'quote',
    categoryLabel: 'Trích dẫn',
    description: 'Phong cách trang giấy cổ điển, mực sẫm hoài niệm, thích hợp tác phẩm cổ văn.',
    themeId: 'classic-paper',
    suggestedLayout: 'quote',
    previewSnippet: {
      title: 'TRUYỆN KIỀU — NGUYỄN DU',
      quote: 'Trăm năm trong cõi người ta,\nChữ tài chữ mệnh khéo là ghét nhau...',
      author: 'Nguyễn Du'
    }
  },
  {
    id: 'tmpl-quote-night',
    name: 'Đêm trăng thi ca',
    category: 'quote',
    categoryLabel: 'Trích dẫn',
    description: 'Nền lam đen sâu lắng kết hợp sắc tím ngọc lãng mạn cho thơ hiện đại.',
    themeId: 'night-poetry',
    suggestedLayout: 'quote',
    previewSnippet: {
      title: 'ÁNH TRĂNG — NGUYỄN DUY',
      quote: 'Ánh trăng im phăng phắc\nĐủ cho ta giật mình...',
      author: 'Nguyễn Duy'
    }
  },
  {
    id: 'tmpl-split-editorial',
    name: 'Phân tích 2 cột',
    category: 'split',
    categoryLabel: 'So sánh',
    description: 'Cột trái ngữ liệu & gạch đầu dòng, cột phải đoạn văn bình giảng thi pháp.',
    themeId: 'light-editorial',
    suggestedLayout: 'split',
    previewSnippet: {
      title: 'ĐỐI SÁNH NGHỆ THUẬT',
      bullets: ['Bút pháp lãng mạn hào hoa', 'Cảm hứng bi tráng thời đại', 'Nhịp thơ gân guốc biến ảo'],
      subtitle: 'Đoạn văn bình giảng chi tiết...'
    }
  },
  {
    id: 'tmpl-split-burgundy',
    name: 'Đối sánh thi pháp',
    category: 'split',
    categoryLabel: 'So sánh',
    description: 'Nền đỏ mận học thuật trang trọng cho việc đối chiếu nhân vật, tác giả.',
    themeId: 'academic-burgundy',
    suggestedLayout: 'split',
    previewSnippet: {
      title: 'NHÂN VẬT TRÀNG & THỊ',
      bullets: ['Khát vọng sống mãnh liệt', 'Tình người trong nạn đói'],
      subtitle: 'Biến chuyển tâm lý nhân vật...'
    }
  },
  {
    id: 'tmpl-split-forest',
    name: 'Không gian Tây Bắc',
    category: 'split',
    categoryLabel: 'So sánh',
    description: 'Màu xanh rừng đại ngàn, phân tích sự hùng vĩ và hiểm trở của thiên nhiên.',
    themeId: 'forest-academic',
    suggestedLayout: 'split',
    previewSnippet: {
      title: 'THIÊN NHIÊN TÂY BẮC',
      bullets: ['Dốc lên khúc khuỷu', 'Heo hút cồn mây', 'Súng ngửi trời'],
      subtitle: 'Vẻ đẹp hùng vĩ và dữ dội...'
    }
  },
  {
    id: 'tmpl-cards-academic',
    name: '3 Luận điểm học thuật',
    category: 'cards',
    categoryLabel: 'Kiến thức',
    description: 'Trình bày 3 tầng ý nghĩa: Nội dung, Nghệ thuật và Tư tưởng tác phẩm.',
    themeId: 'forest-academic',
    suggestedLayout: 'cards',
    previewSnippet: {
      title: 'HỆ THỐNG 3 LUẬN ĐIỂM',
      bullets: ['1. Hình tượng người lính', '2. Bức tranh thiên nhiên', '3. Tinh thần bi tráng']
    }
  },
  {
    id: 'tmpl-cards-sepia',
    name: '3 Nét đặc sắc nghệ thuật',
    category: 'cards',
    categoryLabel: 'Kiến thức',
    description: '3 thẻ kiến thức nền sepia hoài cổ phân tích đặc trưng thể loại.',
    themeId: 'sepia-literature',
    suggestedLayout: 'cards',
    previewSnippet: {
      title: 'ĐẶC SẮC NGHỆ THUẬT',
      bullets: ['Ngôn từ tạo hình', 'Âm điệu hào hùng', 'Bút pháp tương phản']
    }
  },
  {
    id: 'tmpl-quiz-dark',
    name: 'Quiz tương tác tối',
    category: 'quiz',
    categoryLabel: 'Câu hỏi',
    description: 'Trắc nghiệm đọc hiểu tương tác trên lớp với phản hồi màu ngọc/đỏ mận.',
    themeId: 'cinematic-literary',
    suggestedLayout: 'quiz',
    previewSnippet: {
      title: 'CÂU HỎI KHÁO SÁT NHANH',
      subtitle: 'A. Hiện thực  B. Lãng mạn bi tráng'
    }
  },
  {
    id: 'tmpl-quiz-light',
    name: 'Quiz khảo sát sáng',
    category: 'quiz',
    categoryLabel: 'Câu hỏi',
    description: 'Trắc nghiệm tương tác nền trắng tối giản, độ tương phản cao chống chói.',
    themeId: 'minimal-bw',
    suggestedLayout: 'quiz',
    previewSnippet: {
      title: 'CÂU HỎI ĐỌC HIỂU',
      subtitle: 'Kiểm tra chuẩn kiến thức tiếng Việt...'
    }
  },
  {
    id: 'tmpl-single-paper',
    name: 'Tiểu sử & Bối cảnh',
    category: 'single',
    categoryLabel: 'Tóm tắt',
    description: 'Bố cục văn bản chuẩn trang giấy ngà giới thiệu hoàn cảnh sáng tác.',
    themeId: 'classic-paper',
    suggestedLayout: 'single',
    previewSnippet: {
      title: 'TIỂU SỬ QUANG DŨNG',
      subtitle: 'Nhà thơ của xứ Đoài mây trắng...'
    }
  },
  {
    id: 'tmpl-single-burgundy',
    name: 'Tổng kết bài học',
    category: 'single',
    categoryLabel: 'Tóm tắt',
    description: 'Khắc ghi thông điệp nhân văn và giá trị thẩm mỹ của toàn bộ bài dạy.',
    themeId: 'academic-burgundy',
    suggestedLayout: 'single',
    previewSnippet: {
      title: 'TỔNG KẾT VÀ BÀI HỌC',
      subtitle: 'Ghi nhớ giá trị cốt lõi...'
    }
  }
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'quote', label: 'Trích dẫn' },
  { id: 'split', label: 'So sánh' },
  { id: 'cards', label: 'Kiến thức' },
  { id: 'quiz', label: 'Câu hỏi' },
  { id: 'single', label: 'Tóm tắt' }
] as const;

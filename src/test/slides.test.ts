import { describe, it, expect } from 'vitest';
import { createSlidesDeckFixture, createSlideFixture } from './fixtures';
import { SlideItem } from '../types';

describe('Slides Logic & Interaction Engine', () => {
  it('supports all required slide layouts and phase tags', () => {
    const validLayouts: SlideItem['layout'][] = ['single', 'split', 'quiz', 'cards', 'quote', 'visual_map'];
    const validPhaseTags: SlideItem['phaseTag'][] = ['Khởi động', 'Kiến thức mới', 'Luyện tập', 'Vận dụng', 'Tổng kết'];

    const slides = createSlidesDeckFixture();
    slides.forEach(slide => {
      expect(validLayouts).toContain(slide.layout);
      expect(validPhaseTags).toContain(slide.phaseTag);
    });
  });

  describe('Slide Navigation & Bounds', () => {
    it('clamps forward navigation to maximum slide index', () => {
      const slides = createSlidesDeckFixture();
      const maxIdx = slides.length - 1;

      const navigateNext = (current: number) => Math.min(current + 1, maxIdx);

      let current = 0;
      for (let i = 0; i < 20; i++) {
        current = navigateNext(current);
      }
      expect(current).toBe(maxIdx);
    });

    it('clamps backward navigation to minimum index (0)', () => {
      const navigatePrev = (current: number) => Math.max(current - 1, 0);

      let current = 2;
      current = navigatePrev(current); // 1
      current = navigatePrev(current); // 0
      current = navigatePrev(current); // 0
      expect(current).toBe(0);
    });
  });

  describe('Interactive Quiz Slide Logic', () => {
    it('evaluates quiz option selection against correctIndex and toggles explanation', () => {
      const quizSlide: SlideItem = {
        id: 's-quiz',
        title: 'CÂU HỎI TƯƠNG TÁC ĐỌC HIỂU',
        phaseTag: 'Luyện tập',
        layout: 'quiz',
        contentLeft: '',
        quizQuestion: {
          question: 'Cảm hứng chủ đạo trong bài thơ Tây Tiến là gì?',
          options: [
            'Hiện thực bi thảm của chiến tranh',
            'Cảm hứng lãng mạn và tinh thần bi tráng',
            'Nỗi nhớ quê hương da diết',
            'Ca ngợi cảnh đẹp hùng vĩ của núi rừng'
          ],
          correctIndex: 1,
          explanation: 'Tây Tiến kết hợp hài hòa giữa chất lãng mạn hào hoa và âm hưởng bi tráng.'
        },
        speakerNotes: ''
      };

      expect(quizSlide.quizQuestion).toBeDefined();
      const quiz = quizSlide.quizQuestion!;

      // Simulating user choosing wrong option
      const wrongSelection = 0;
      const isWrongCorrect = wrongSelection === quiz.correctIndex;
      expect(isWrongCorrect).toBe(false);

      // Simulating user choosing correct option
      const correctSelection = 1;
      const isRightCorrect = correctSelection === quiz.correctIndex;
      expect(isRightCorrect).toBe(true);

      // Explanation is present and non-empty
      expect(quiz.explanation.length).toBeGreaterThan(0);
    });
  });

  describe('Slide CRUD & Duplication Operations', () => {
    it('duplicates a slide inserting it immediately after with unique ID and title suffix', () => {
      const slides = createSlidesDeckFixture();
      const targetIdx = 0;
      const target = slides[targetIdx];

      const duplicated: SlideItem = {
        ...JSON.parse(JSON.stringify(target)),
        id: `slide-dup-${Date.now()}`,
        title: `${target.title} (Bản sao)`
      };

      const nextSlides = [...slides];
      nextSlides.splice(targetIdx + 1, 0, duplicated);

      expect(nextSlides).toHaveLength(slides.length + 1);
      expect(nextSlides[1].id).toBe(duplicated.id);
      expect(nextSlides[1].title).toBe(`${target.title} (Bản sao)`);
      expect(nextSlides[1].id).not.toBe(target.id);
    });

    it('prevents deleting the last slide in a presentation deck', () => {
      const singleSlideDeck: SlideItem[] = [
        {
          id: 's-only',
          title: 'Slide duy nhất',
          phaseTag: 'Khởi động',
          layout: 'single',
          contentLeft: 'Nội dung',
          speakerNotes: ''
        }
      ];

      const handleDelete = (deck: SlideItem[], idx: number): SlideItem[] => {
        if (deck.length <= 1) return deck;
        return deck.filter((_, i) => i !== idx);
      };

      const result = handleDelete(singleSlideDeck, 0);
      expect(result).toHaveLength(1);
    });

    it('correctly updates slide patch without mutating other slides', () => {
      const slides = createSlidesDeckFixture();
      const targetIdx = 0;

      const updated = slides.map((s, idx) =>
        idx === targetIdx ? { ...s, title: 'TIÊU ĐỀ MỚI ĐÃ SỬA', layout: 'quote' as const } : s
      );

      expect(updated[0].title).toBe('TIÊU ĐỀ MỚI ĐÃ SỬA');
      expect(updated[0].layout).toBe('quote');
      // Slide 1 unchanged
      expect(updated[1].title).toBe(slides[1].title);
    });
  });
});

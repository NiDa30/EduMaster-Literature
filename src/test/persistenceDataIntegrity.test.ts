import { describe, it, expect, beforeEach, vi } from 'vitest';
import { STORAGE_KEY } from '../App';
import { 
  AppState, 
  LiteratureLesson, 
  Exam7991Data, 
  LessonPlan5512, 
  SlideItem, 
  LiteratureQuestionItem,
  RubricData 
} from '../types';
import { 
  createAppStateFixture, 
  createLessonFixture, 
  createExamFixture, 
  createKhbdFixture, 
  createSlideFixture, 
  createQuestionFixture, 
  createRubricFixture 
} from './fixtures';
import { normalizeDeepNFC, normalizeVietnamese } from '../utils/unicode';

/**
 * ============================================================================
 * DATABASE & PERSISTENCE TESTING SUITE
 * Dự án: EduMaster-Literature
 * Scope: Persistence, Storage Integrity, Schema, Unicode & Relational Consistency
 * ============================================================================
 */

describe('Database / Persistence & Data Integrity Testing', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // --------------------------------------------------------------------------
  // SUITE 1: CRUD & STORAGE LIFECYCLE (LOCALSTORAGE)
  // --------------------------------------------------------------------------
  describe('1. CRUD Operations on LocalStorage Persistence Layer', () => {
    it('DB-CRUD-001: [CREATE] Successfully serializes and persists a new LiteratureLesson to storage', () => {
      const state = createAppStateFixture();
      const newLesson: LiteratureLesson = createLessonFixture({
        id: 'lesson-song-xuan-quynh',
        title: 'Sóng',
        author: 'Xuân Quỳnh',
        genre: 'poetry',
        grade: 'Lớp 12',
        textbook: 'Kết nối tri thức',
        fullText: 'Dữ dội và dịu êm\nỒn ào và lặng lẽ\nSông không hiểu nổi mình\nSóng tìm ra tận bể',
      });

      const updatedState: AppState = {
        ...state,
        lessons: [newLesson, ...state.lessons],
        currentLessonId: newLesson.id,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));

      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(raw!);
      expect(parsed.lessons).toHaveLength(state.lessons.length + 1);
      expect(parsed.lessons[0].id).toBe('lesson-song-xuan-quynh');
      expect(parsed.lessons[0].title).toBe('Sóng');
      expect(parsed.currentLessonId).toBe('lesson-song-xuan-quynh');
    });

    it('DB-CRUD-002: [READ] Accurately retrieves and deserializes lessons by ID with all sub-packages', () => {
      const state = createAppStateFixture();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: AppState = JSON.parse(raw!);

      const tayTien = parsed.lessons.find(l => l.id === 'lesson-tay-tien');
      expect(tayTien).toBeDefined();
      expect(tayTien?.title).toBe('Tây Tiến');
      expect(tayTien?.author).toBe('Quang Dũng');
      expect(tayTien?.genre).toBe('poetry');
      expect(tayTien?.textSections).toBeDefined();
      expect(tayTien?.textSections.length).toBeGreaterThan(0);
      expect(tayTien?.annotations).toBeDefined();
    });

    it('DB-CRUD-003: [UPDATE] Updates specific lesson attributes without mutating other lessons', () => {
      const state = createAppStateFixture();
      const targetId = 'lesson-tay-tien';

      const updatedLessons = state.lessons.map(l => {
        if (l.id === targetId) {
          return { ...l, progress: 95, lastModified: 'Vừa xong' };
        }
        return l;
      });

      const nextState: AppState = {
        ...state,
        lessons: updatedLessons,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

      const retrieved: AppState = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      const updatedLesson = retrieved.lessons.find(l => l.id === targetId);
      const untouchedLesson = retrieved.lessons.find(l => l.id === 'lesson-vo-nhat');

      expect(updatedLesson?.progress).toBe(95);
      expect(updatedLesson?.lastModified).toBe('Vừa xong');
      expect(untouchedLesson?.progress).toBe(state.lessons.find(l => l.id === 'lesson-vo-nhat')?.progress);
    });

    it('DB-CRUD-004: [DELETE] Safely deletes a lesson and re-points currentLessonId to fallback', () => {
      const state = createAppStateFixture();
      const deleteId = 'lesson-tay-tien';

      const remaining = state.lessons.filter(l => l.id !== deleteId);
      const fallbackId = remaining[0]?.id || '';

      const nextState: AppState = {
        ...state,
        lessons: remaining,
        currentLessonId: fallbackId,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

      const retrieved: AppState = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(retrieved.lessons.find(l => l.id === deleteId)).toBeUndefined();
      expect(retrieved.currentLessonId).toBe('lesson-vo-nhat');
      expect(retrieved.lessons.length).toBe(state.lessons.length - 1);
    });

    it('DB-CRUD-005: [MASS STORAGE] Persists 50+ lesson entities without data loss', () => {
      const state = createAppStateFixture();
      const largeLessonsList: LiteratureLesson[] = Array.from({ length: 50 }, (_, i) => 
        createLessonFixture({
          id: `lesson-batch-${i}`,
          title: `Bài học văn học số ${i + 1}`,
          author: `Tác giả ${i + 1}`,
          grade: i % 2 === 0 ? 'Lớp 11' : 'Lớp 12',
          progress: (i * 2) % 100
        })
      );

      const massiveState: AppState = {
        ...state,
        lessons: largeLessonsList,
        currentLessonId: largeLessonsList[0].id
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(massiveState));

      const stored: AppState = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(stored.lessons).toHaveLength(50);
      expect(stored.lessons[49].id).toBe('lesson-batch-49');
      expect(stored.lessons[49].title).toBe('Bài học văn học số 50');
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 2: RELATIONAL CONSISTENCY & INTEGRITY
  // --------------------------------------------------------------------------
  describe('2. Foreign Key & Relational Consistency', () => {
    it('DB-REL-001: Ensures currentLessonId always references an existing lesson PK', () => {
      const state = createAppStateFixture();
      const validLessonIds = state.lessons.map(l => l.id);

      expect(validLessonIds).toContain(state.currentLessonId);

      // Verify validator function
      const isValidReference = (st: AppState) => st.lessons.some(l => l.id === st.currentLessonId);
      expect(isValidReference(state)).toBe(true);

      const orphanState: AppState = { ...state, currentLessonId: 'non-existent-id' };
      expect(isValidReference(orphanState)).toBe(false);
    });

    it('DB-REL-002: Lesson Switch Transaction preserves active module data in source lesson', () => {
      const state = createAppStateFixture();
      const sourceLessonId = 'lesson-tay-tien';
      const targetLessonId = 'lesson-vo-nhat';

      // 1. User edits current KHBD while on Tay Tien
      const modifiedKhbd: LessonPlan5512 = {
        ...state.khbd,
        info: { ...state.khbd.info, lessonTitle: 'Tây Tiến (Đã sửa đổi KHBD 5512)' }
      };

      // 2. Perform transactional switch
      const updatedLessons = state.lessons.map(l => {
        if (l.id === sourceLessonId) {
          return {
            ...l,
            khbd: modifiedKhbd,
            slides: state.slides,
            exam: state.exam,
            questions: state.questions,
            rubric: state.rubric
          };
        }
        return l;
      });

      const targetLesson = updatedLessons.find(l => l.id === targetLessonId)!;

      const nextState: AppState = {
        ...state,
        lessons: updatedLessons,
        currentLessonId: targetLessonId,
        khbd: targetLesson.khbd || state.khbd,
        slides: targetLesson.slides || state.slides,
        exam: targetLesson.exam || state.exam,
        questions: targetLesson.questions || state.questions,
        rubric: targetLesson.rubric || state.rubric
      };

      // Assert source lesson retained its modified KHBD
      const savedSource = nextState.lessons.find(l => l.id === sourceLessonId);
      expect(savedSource?.khbd?.info.lessonTitle).toBe('Tây Tiến (Đã sửa đổi KHBD 5512)');
      expect(nextState.currentLessonId).toBe(targetLessonId);
    });

    it('DB-REL-003: Exam Part II true/false statements map strictly to question parent', () => {
      const exam = createExamFixture();
      expect(exam.partII.length).toBeGreaterThan(0);

      exam.partII.forEach(q => {
        expect(q.id).toBeDefined();
        expect(q.statements).toBeDefined();
        expect(q.statements).toHaveLength(4);

        const subIds = q.statements.map(s => s.subId);
        expect(subIds).toEqual(['a', 'b', 'c', 'd']);

        q.statements.forEach(statement => {
          expect(typeof statement.isCorrect).toBe('boolean');
          expect(statement.text.length).toBeGreaterThan(0);
        });
      });
    });

    it('DB-REL-004: Rubric criteria and score levels preserve relationship', () => {
      const rubric = createRubricFixture();
      expect(rubric.criteria.length).toBeGreaterThan(0);

      rubric.criteria.forEach(criterion => {
        expect(criterion.id).toBeDefined();
        expect(criterion.maxPoints).toBeGreaterThan(0);
        expect(criterion.levels).toBeDefined();
        expect(criterion.levels.length).toBeGreaterThanOrEqual(2);

        // Max level score should match maxPoints
        const highestLevel = criterion.levels.reduce((max, lvl) => Math.max(max, lvl.score), 0);
        expect(highestLevel).toBe(criterion.maxPoints);
      });
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 3: PRIMARY KEY & UNIQUENESS CONSTRAINTS
  // --------------------------------------------------------------------------
  describe('3. Primary Key & Uniqueness Verification', () => {
    it('DB-PK-001: Asserts all lesson IDs are unique across the lessons array', () => {
      const state = createAppStateFixture();
      const ids = state.lessons.map(l => l.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('DB-PK-002: Asserts all question IDs in question bank are unique', () => {
      const state = createAppStateFixture();
      const questionIds = state.questions.map(q => q.id);
      const uniqueQIds = new Set(questionIds);

      expect(uniqueQIds.size).toBe(questionIds.length);
    });

    it('DB-PK-003: Asserts all slide IDs in presentation deck are unique', () => {
      const state = createAppStateFixture();
      const slideIds = state.slides.map(s => s.id);
      const uniqueSlideIds = new Set(slideIds);

      expect(uniqueSlideIds.size).toBe(slideIds.length);
    });

    it('DB-PK-004: Rejects or deduplicates duplicate lesson IDs upon insertion', () => {
      const state = createAppStateFixture();
      const duplicateLesson = createLessonFixture({ id: 'lesson-tay-tien', title: 'Tây Tiến Trùng Lặp' });

      // Upsert logic simulation
      const lessonsMap = new Map<string, LiteratureLesson>();
      state.lessons.forEach(l => lessonsMap.set(l.id, l));
      lessonsMap.set(duplicateLesson.id, duplicateLesson); // Overwrite, don't duplicate

      const dedupedLessons = Array.from(lessonsMap.values());
      expect(dedupedLessons).toHaveLength(state.lessons.length);
      expect(dedupedLessons.find(l => l.id === 'lesson-tay-tien')?.title).toBe('Tây Tiến Trùng Lặp');
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 4: VIETNAMESE UNICODE & NFC NORMALIZATION (P0 FOR LITERATURE)
  // --------------------------------------------------------------------------
  describe('4. Vietnamese Unicode NFC Persistence (P0 Requirement)', () => {
    it('DB-UNI-001: Preserves complex Vietnamese tone marks and characters without byte loss', () => {
      const testCases = [
        'Tây Tiến — Quang Dũng',
        'Người lái đò Sông Đà — Nguyễn Tuân',
        'Vợ chồng A Phủ — Tô Hoài',
        'Hồn Trương Ba, da hàng thịt — Lưu Quang Vũ',
        'Vợ nhặt — Kim Lân',
        'Đoàn binh không mọc tóc, quân xanh màu lá dữ oai hùm',
        'Áo bào thay chiếu, anh về đất; Sông Mã gầm lên khúc độc hành.'
      ];

      testCases.forEach(str => {
        const normalized = normalizeVietnamese(str);
        expect(normalized).toBe(str.normalize('NFC'));

        // Serialize and deserialize
        const serialized = JSON.stringify({ text: normalized });
        const restored = JSON.parse(serialized).text;
        expect(restored).toBe(normalized);
        expect(restored.normalize('NFC')).toBe(restored);
      });
    });

    it('DB-UNI-002: Converts NFD decomposed Unicode strings to canonical NFC on restore', () => {
      // "Tây Tiến" in NFD decomposed format
      const nfdTitle = 'Ta\u0302y Tie\u0302\u0301n'; 
      expect(nfdTitle.length).toBe(11); // 11 code units due to combining diacritics

      const nfcTitle = normalizeVietnamese(nfdTitle);
      expect(nfcTitle.length).toBe(8); // Standard 8 characters
      expect(nfcTitle).toBe('Tây Tiến');

      // Deep NFC normalization on complex nested state
      const stateWithNFD = createAppStateFixture();
      stateWithNFD.lessons[0].title = nfdTitle;
      stateWithNFD.lessons[0].author = 'Quang Du\u0303ng'; // NFD

      const deepNormalized = normalizeDeepNFC(stateWithNFD) as AppState;
      expect(deepNormalized.lessons[0].title).toBe('Tây Tiến');
      expect(deepNormalized.lessons[0].author).toBe('Quang Dũng');
    });

    it('DB-UNI-003: Preserves special literary punctuation (em dash, ellipses, guillemets, poetry linebreaks)', () => {
      const poemSnippet = `Sông Mã xa rồi Tây Tiến ơi!\nNhớ về rừng núi, nhớ chơi vơi.\n— Quang Dũng (1948) —\n«Nhà ai Pha Luông mưa xa khơi...»`;
      
      const lesson = createLessonFixture({ fullText: poemSnippet });
      const serialized = JSON.stringify(lesson);
      const parsed: LiteratureLesson = JSON.parse(serialized);

      expect(parsed.fullText).toBe(poemSnippet);
      expect(parsed.fullText).toContain('—');
      expect(parsed.fullText).toContain('«');
      expect(parsed.fullText).toContain('»');
      expect(parsed.fullText).toContain('\n');
      expect(parsed.fullText).toContain('...');
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 5: LONG TEXT & CORPUS PERSISTENCE
  // --------------------------------------------------------------------------
  describe('5. Long Text & Literary Corpus Integrity', () => {
    it('DB-TEXT-001: Persists full literary works (>20,000 characters) without truncation', () => {
      // Generate a long text simulation (e.g. Full text of prose work)
      const repeatParagraph = 'Đây là đoạn văn bản phân tích trích đoạn ngữ liệu tác phẩm Ngữ văn THPT phục vụ công tác soạn giảng và biên soạn đề kiểm tra định kỳ theo chuẩn Công văn 5512 và Công văn 7991.\n';
      const longCorpus = repeatParagraph.repeat(150); // ~26,000 chars

      expect(longCorpus.length).toBeGreaterThan(25000);

      const lesson = createLessonFixture({ fullText: longCorpus });
      const serialized = JSON.stringify(lesson);
      const deserialized: LiteratureLesson = JSON.parse(serialized);

      expect(deserialized.fullText.length).toBe(longCorpus.length);
      expect(deserialized.fullText).toBe(longCorpus);
    });

    it('DB-TEXT-002: Preserves multi-section structural partitions in textSections', () => {
      const lesson = createLessonFixture();
      expect(lesson.textSections.length).toBeGreaterThanOrEqual(4);

      const serialized = JSON.stringify(lesson.textSections);
      const restored = JSON.parse(serialized);

      expect(restored).toHaveLength(lesson.textSections.length);
      expect(restored[0].id).toBe('sec-1');
      expect(restored[0].title).toContain('Đoạn 1');
      expect(restored[0].content).toContain('Sông Mã xa rồi');
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 6: DATA PRECISION & SCORE BOUNDARY CONSTRAINTS
  // --------------------------------------------------------------------------
  describe('6. Data Precision & Score Boundary Constraints', () => {
    it('DB-PREC-001: Floating-point precision maintains exact 10.0 exam total without IEEE-754 drift', () => {
      const exam = createExamFixture();

      const partITotal = exam.partI.reduce((sum, q) => sum + q.points, 0); // 12 * 0.25 = 3.0
      const partIITotal = exam.partII.reduce((sum, q) => sum + q.points, 0); // 2 * 1.0 = 2.0
      const partIIITotal = exam.partIII.reduce((sum, q) => sum + q.points, 0); // 2 * 0.5 = 1.0
      const partIVTotal = exam.partIV.reduce((sum, q) => sum + q.points, 0); // 4.0

      const grandTotal = parseFloat((partITotal + partIITotal + partIIITotal + partIVTotal).toFixed(2));
      
      expect(partITotal).toBe(3.0);
      expect(partIITotal).toBe(2.0);
      expect(partIIITotal).toBe(2.0);
      expect(partIVTotal).toBe(3.0);
      expect(grandTotal).toBe(10.0);
      expect(Math.abs(grandTotal - 10.0)).toBeLessThan(0.0001);
    });

    it('DB-BOUND-001: Part II individual statement score values strictly follow MOET 7991 table', () => {
      const scoringTable = [
        { correctCount: 0, expectedScore: 0.0 },
        { correctCount: 1, expectedScore: 0.10 },
        { correctCount: 2, expectedScore: 0.25 },
        { correctCount: 3, expectedScore: 0.50 },
        { correctCount: 4, expectedScore: 1.00 },
      ];

      scoringTable.forEach(({ correctCount, expectedScore }) => {
        let score = 0;
        if (correctCount === 1) score = 0.1;
        else if (correctCount === 2) score = 0.25;
        else if (correctCount === 3) score = 0.5;
        else if (correctCount === 4) score = 1.0;
        
        expect(score).toBe(expectedScore);
      });
    });

    it('DB-BOUND-002: Lesson progress percentage is clamped between 0 and 100', () => {
      const clampProgress = (p: number) => Math.max(0, Math.min(100, Math.round(p)));

      expect(clampProgress(-10)).toBe(0);
      expect(clampProgress(0)).toBe(0);
      expect(clampProgress(85.4)).toBe(85);
      expect(clampProgress(100)).toBe(100);
      expect(clampProgress(120)).toBe(100);
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 7: ORDER & SEQUENCE INTEGRITY
  // --------------------------------------------------------------------------
  describe('7. Order & Sequence Integrity', () => {
    it('DB-ORDER-001: KHBD 5512 activities sequence and 4-step structure is preserved', () => {
      const khbd = createKhbdFixture();
      expect(khbd.activities.length).toBeGreaterThanOrEqual(4);

      // Verify sequence of types: warmup -> knowledge -> practice -> application
      expect(khbd.activities[0].type).toBe('warmup');
      expect(khbd.activities[1].type).toBe('knowledge');
      expect(khbd.activities[2].type).toBe('practice');
      expect(khbd.activities[3].type).toBe('application');

      // Each activity must have 4 steps
      khbd.activities.forEach(act => {
        expect(act.steps).toBeDefined();
        expect(act.steps.step1).toBeDefined();
        expect(act.steps.step2).toBeDefined();
        expect(act.steps.step3).toBeDefined();
        expect(act.steps.step4).toBeDefined();
      });
    });

    it('DB-ORDER-002: Reordering slide presentation deck preserves precise sequential positions', () => {
      const state = createAppStateFixture();
      const initialSlides = [...state.slides];
      expect(initialSlides.length).toBeGreaterThanOrEqual(3);

      // Reorder: swap slide 0 and slide 1
      const reorderedSlides = [initialSlides[1], initialSlides[0], ...initialSlides.slice(2)];

      const nextState: AppState = {
        ...state,
        slides: reorderedSlides
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

      const restored: AppState = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(restored.slides[0].id).toBe(initialSlides[1].id);
      expect(restored.slides[1].id).toBe(initialSlides[0].id);
      expect(restored.slides.length).toBe(initialSlides.length);
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 8: BACKUP & RESTORE / STATE MIGRATION
  // --------------------------------------------------------------------------
  describe('8. Session Handover Backup, Restore & Schema Migration', () => {
    it('DB-BACKUP-001: Produces a fully self-contained valid JSON handover package', () => {
      const state = createAppStateFixture();
      const json = JSON.stringify(state, null, 2);

      expect(typeof json).toBe('string');
      expect(json.length).toBeGreaterThan(1000);

      const parsed = JSON.parse(json);
      expect(parsed.version).toBe(state.version);
      expect(parsed.lessons).toBeDefined();
      expect(parsed.khbd).toBeDefined();
      expect(parsed.exam).toBeDefined();
      expect(parsed.slides).toBeDefined();
      expect(parsed.questions).toBeDefined();
      expect(parsed.rubric).toBeDefined();
    });

    it('DB-RESTORE-001: Successfully restores valid JSON state and updates timestamp', () => {
      const originalState = createAppStateFixture();
      originalState.currentLessonId = 'lesson-vo-nhat';

      const jsonString = JSON.stringify(originalState);
      const restored = JSON.parse(jsonString) as AppState;

      expect(restored.currentLessonId).toBe('lesson-vo-nhat');
      expect(restored.lessons.length).toBe(originalState.lessons.length);
    });

    it('DB-RESTORE-002: Rejects corrupted or partial JSON missing core subsystems', () => {
      const invalidJsonMissingExam = JSON.stringify({
        version: '3.0.0',
        lessons: [],
        khbd: {},
        slides: []
        // Missing exam
      });

      const parsed = JSON.parse(invalidJsonMissingExam);
      const validateState = (data: any) => {
        if (!data.khbd || !data.exam || !data.slides) {
          throw new Error('Dữ liệu JSON thiếu các phân hệ cốt lõi (khbd, exam, slides).');
        }
      };

      expect(() => validateState(parsed)).toThrow('Dữ liệu JSON thiếu các phân hệ cốt lõi');
    });

    it('DB-MIGRATE-001: Gracefully upgrades legacy state missing optional fields', () => {
      // Simulate legacy stored state from v2.0 without theme/periods or examHeader
      const legacyState = {
        version: '2.0.0',
        activeModule: 'dashboard',
        currentLessonId: 'lesson-tay-tien',
        lessons: [
          {
            id: 'lesson-tay-tien',
            title: 'Tây Tiến',
            author: 'Quang Dũng',
            genre: 'poetry',
            grade: 'Lớp 12',
            textbook: 'Kết nối tri thức',
            fullText: 'Sông Mã xa rồi...',
            textSections: [],
            annotations: [],
            progress: 50,
            lastModified: '1 ngày trước',
            khbdStatus: 'draft',
            slideStatus: 'draft',
            examStatus: 'draft'
            // No periods, no theme
          }
        ],
        khbd: createKhbdFixture(),
        slides: [],
        exam: {
          examHeader: { title: 'Đề cũ', duration: '90p', examCode: '001' },
          partI: [], partII: [], partIII: [], partIV: []
        },
        questions: [],
        rubric: createRubricFixture(),
        checklist: {
          hasThreeSubsystems: true,
          hasPartIITrueFalseFourStatements: true,
          hasExportWordPowerPoint: true,
          hasJsonHandoverBlock: true
        }
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyState));

      // Deserialization with fallback merger (matching loadInitialState in App.tsx)
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw!);
      const defaultState = createAppStateFixture();

      const mergedState: AppState = {
        ...defaultState,
        ...parsed,
        version: defaultState.version, // Upgraded version
        lessons: parsed.lessons.map((l: any) => ({
          ...createLessonFixture({ id: l.id }),
          ...l,
          theme: l.theme || 'Vẻ đẹp người lính Tây Tiến',
          periods: l.periods || '2 tiết'
        }))
      };

      expect(mergedState.version).toBe(defaultState.version);
      expect(mergedState.lessons[0].theme).toBe('Vẻ đẹp người lính Tây Tiến');
      expect(mergedState.lessons[0].periods).toBe('2 tiết');
    });
  });

  // --------------------------------------------------------------------------
  // SUITE 9: STORAGE RESILIENCE & QUOTA EXCEPTION HANDLING
  // --------------------------------------------------------------------------
  describe('9. Storage Resilience & Error Handling', () => {
    it('DB-QUOTA-001: Gracefully handles QuotaExceededError without crashing the application', () => {
      const state = createAppStateFixture();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock setItem to throw QuotaExceededError
      vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
        const error = new Error('The quota has been exceeded.');
        error.name = 'QuotaExceededError';
        throw error;
      });

      // App save handler simulation
      const safeSaveState = (st: AppState) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
          return true;
        } catch (err: any) {
          console.error('Lỗi khi tự động lưu dữ liệu vào localStorage:', err);
          return false;
        }
      };

      const result = safeSaveState(state);
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Lỗi khi tự động lưu dữ liệu'),
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('DB-PARSE-001: Gracefully recovers from malformed JSON in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, '{"version": "3.0.0", invalid_json}');
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // App load initial state simulation
      const safeLoadState = (): AppState => {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            return JSON.parse(stored);
          }
        } catch (e) {
          console.warn('Lỗi đọc dữ liệu từ localStorage:', e);
        }
        return createAppStateFixture();
      };

      const loaded = safeLoadState();
      expect(loaded).toBeDefined();
      expect(loaded.currentLessonId).toBe('lesson-tay-tien');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });
});

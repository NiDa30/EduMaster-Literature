import { 
  LiteratureLesson, 
  Exam7991Data, 
  LessonPlan5512, 
  RubricData, 
  SlideItem, 
  LiteratureQuestionItem, 
  AppState 
} from '../../types';
import { 
  tayTienLesson, 
  literatureExam7991, 
  literatureKhbd5512, 
  literatureRubric, 
  literatureSlides, 
  literatureQuestions 
} from '../../data/literaturePresets';
import { initialAppState } from '../../data/presets';

export const createLessonFixture = (override: Partial<LiteratureLesson> = {}): LiteratureLesson => ({
  ...JSON.parse(JSON.stringify(tayTienLesson)),
  ...override,
});

export const createExamFixture = (override: Partial<Exam7991Data> = {}): Exam7991Data => ({
  ...JSON.parse(JSON.stringify(literatureExam7991)),
  ...override,
});

export const createKhbdFixture = (override: Partial<LessonPlan5512> = {}): LessonPlan5512 => ({
  ...JSON.parse(JSON.stringify(literatureKhbd5512)),
  ...override,
});

export const createRubricFixture = (override: Partial<RubricData> = {}): RubricData => ({
  ...JSON.parse(JSON.stringify(literatureRubric)),
  ...override,
});

export const createSlideFixture = (override: Partial<SlideItem> = {}): SlideItem => ({
  ...JSON.parse(JSON.stringify(literatureSlides[0])),
  ...override,
});

export const createSlidesDeckFixture = (override: SlideItem[] = []): SlideItem[] => {
  if (override.length > 0) return override;
  return JSON.parse(JSON.stringify(literatureSlides));
};

export const createQuestionFixture = (override: Partial<LiteratureQuestionItem> = {}): LiteratureQuestionItem => ({
  ...JSON.parse(JSON.stringify(literatureQuestions[0])),
  ...override,
});

export const createAppStateFixture = (override: Partial<AppState> = {}): AppState => ({
  ...JSON.parse(JSON.stringify(initialAppState)),
  ...override,
});

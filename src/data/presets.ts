import { 
  AppState, 
  LessonPlan5512, 
  SlideItem, 
  Exam7991Data 
} from '../types';
import { 
  tayTienLesson, 
  voNhatLesson, 
  tuyenNgonDocLapLesson, 
  literatureKhbd5512, 
  literatureSlides, 
  literatureExam7991, 
  literatureQuestions, 
  literatureRubric 
} from './literaturePresets';

export const initialAppState: AppState = {
  version: '3.0.0-LITERATURE-WORKSPACE',
  lastUpdated: new Date().toISOString(),
  activeModule: 'dashboard',
  currentLessonId: 'lesson-tay-tien',
  lessons: [
    tayTienLesson,
    voNhatLesson,
    tuyenNgonDocLapLesson
  ],
  khbd: literatureKhbd5512,
  slides: literatureSlides,
  exam: literatureExam7991,
  questions: literatureQuestions,
  rubric: literatureRubric,
  checklist: {
    hasThreeSubsystems: true,
    hasPartIITrueFalseFourStatements: true,
    hasExportWordPowerPoint: true,
    hasJsonHandoverBlock: true
  }
};

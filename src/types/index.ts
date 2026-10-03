export type ActiveModule = 
  | 'dashboard'
  | 'workspace' 
  | 'genre_analysis'
  | 'khbd' 
  | 'question_builder'
  | 'rubric'
  | 'slides' 
  | 'exam' 
  | 'matrix' 
  | 'export_handover'
  | 'typography_test';

export interface AdministrativeInfo {
  department: string; // Sở GD&ĐT
  school: string; // Trường THPT
  subjectGroup: string; // Tổ chuyên môn
  teacherName: string; // Giáo viên thực hiện
  subject: string; // Môn học (Ngữ văn)
  grade: string; // Lớp (10, 11, 12)
  textbook: string; // Bộ sách (Kết nối tri thức, Cánh Diều, Chân trời sáng tạo)
  lessonTitle: string; // Tên bài học
  periods: string; // Thời lượng
  academicYear: string; // Năm học
  assignedClasses?: string[]; // Lớp phụ trách (12A1, 12A2...)
  semester?: string; // Học kỳ (Học kỳ I / II)
}

// ---------------- Thể loại & Tác phẩm Ngữ văn ----------------
export type LiteratureGenre = 'poetry' | 'story' | 'argumentative' | 'essay';

export interface TextAnnotation {
  id: string;
  textSnippet: string;
  startIndex?: number;
  endIndex?: number;
  type: 'highlight' | 'annotation' | 'device' | 'question' | 'keyword';
  note: string;
  color: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose';
  timestamp: string;
}

export interface PoetryAnalysis {
  theme: string; // Chủ đề
  imagery: string[]; // Hình ảnh thơ
  keywords: string[]; // Từ khóa
  emotionalFlow: string; // Mạch cảm xúc
  rhythmAndRhyme: string; // Nhịp, vần
  tone: string; // Giọng điệu
  rhetoricalDevices: string[]; // Biện pháp tu từ
  keyVerses: string[]; // Câu thơ trọng tâm
  contentValue: string; // Giá trị nội dung
  artisticValue: string; // Giá trị nghệ thuật
}

export interface StoryCharacter {
  name: string;
  role: string;
  traits: string[];
  psychologicalShift: string;
  quote: string;
}

export interface StoryAnalysis {
  characters: StoryCharacter[];
  events: string[];
  storySituation: string; // Tình huống truyện
  psychologicalShift: string; // Diễn biến tâm lí nhân vật
  pointOfView: string; // Điểm nhìn trần thuật
  narrator: string; // Người kể chuyện
  artisticDetails: string[]; // Chi tiết nghệ thuật đắt giá
  themes: string[]; // Chủ đề
  message: string; // Thông điệp tư tưởng
}

export interface ArgumentNode {
  id: string;
  type: 'thesis' | 'claim' | 'reason' | 'evidence' | 'conclusion';
  title: string;
  content: string;
  quoteRef?: string;
}

export interface ArgumentMap {
  thesis: string; // Luận đề
  claims: {
    id: string;
    title: string;
    reasons: {
      id: string;
      text: string;
      evidences: {
        id: string;
        text: string;
        quote: string;
      }[];
    }[];
  }[];
  conclusion: string; // Kết luận
}

export interface LiteratureLesson {
  id: string;
  title: string;
  author: string;
  authorBio: string;
  historicalContext: string;
  genre: LiteratureGenre;
  grade: string;
  textbook: string;
  fullText: string;
  textSections: {
    id: string;
    title: string;
    content: string;
  }[];
  annotations: TextAnnotation[];
  poetryAnalysis?: PoetryAnalysis;
  storyAnalysis?: StoryAnalysis;
  argumentMap?: ArgumentMap;
  progress: number;
  lastModified: string;
  khbdStatus: 'ready' | 'draft';
  slideStatus: 'ready' | 'draft';
  examStatus: 'ready' | 'draft';
}

// ---------------- Công văn 5512: Kế hoạch bài dạy ----------------
export interface LessonObjective {
  knowledge: string[];
  generalCompetencies: {
    selfControl: string; // Tự chủ & tự học
    communication: string; // Giao tiếp & hợp tác
    problemSolving: string; // Giải quyết vấn đề & sáng tạo
  };
  specializedCompetencies: string[]; // Năng lực đặc thù (Ngôn ngữ & Văn học)
  qualities: string[]; // Phẩm chất (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm)
}

export interface TeachingEquipment {
  teacher: string[];
  student: string[];
}

export interface ActivitySteps {
  step1: string; // Bước 1: Chuyển giao nhiệm vụ
  step2: string; // Bước 2: Thực hiện nhiệm vụ
  step3: string; // Bước 3: Báo cáo, thảo luận
  step4: string; // Bước 4: Kết luận, nhận định
}

export interface TeachingActivity {
  id: string;
  name: string;
  type: 'warmup' | 'knowledge' | 'practice' | 'application';
  time: string;
  objective: string;
  content: string;
  product: string;
  method?: string; // Phương pháp dạy học
  tools?: string; // Công cụ / học liệu
  steps: ActivitySteps;
}

export interface LessonPlan5512 {
  info: AdministrativeInfo;
  objectives: LessonObjective;
  equipment: TeachingEquipment;
  activities: TeachingActivity[];
}

// ---------------- Slide bài giảng Storytelling ----------------
export interface SlideItem {
  id: string;
  title: string;
  phaseTag: 'Khởi động' | 'Kiến thức mới' | 'Luyện tập' | 'Vận dụng' | 'Tổng kết';
  layout: 'single' | 'split' | 'quiz' | 'cards' | 'quote' | 'visual_map';
  contentLeft: string;
  contentRight?: string;
  bullets?: string[];
  quoteText?: string;
  quoteAuthor?: string;
  discussionQuestion?: string;
  visualMapType?: 'character' | 'emotional_flow' | 'argument' | 'timeline';
  visualMapData?: any;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  cards?: { title: string; desc: string; icon?: string }[];
  speakerNotes: string;
}

// ---------------- Question Builder & Rubric ----------------
export type QuestionType = 'doc_hieu' | 'tieng_viet' | 'nl_xa_hoi' | 'nl_van_hoc';
export type CognitiveLevel = 'NB' | 'TH' | 'VD';
export type SkillType = 'Nhận diện' | 'Giải thích' | 'Phân tích' | 'So sánh' | 'Đánh giá' | 'Liên hệ' | 'Sáng tạo';

export interface LiteratureQuestionItem {
  id: string;
  code: string;
  type: QuestionType;
  level: CognitiveLevel;
  skill: SkillType;
  passageSnippet: string; // Ngữ liệu trích dẫn
  question: string; // Câu hỏi
  answer: string; // Đáp án
  guide: string; // Hướng dẫn chấm
  points: number; // Điểm số
  linkedPart?: 'partI' | 'partII' | 'partIII' | 'partIV';
}

export interface RubricLevel {
  label: string;
  score: number;
  descriptor: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  weight: number;
  maxPoints: number;
  description: string;
  levels: RubricLevel[];
}

export interface RubricData {
  id: string;
  title: string;
  essayType: 'nl_xa_hoi' | 'nl_van_hoc';
  totalPoints: number;
  criteria: RubricCriterion[];
}

// ---------------- Công văn 7991: Đề kiểm tra & Ma trận ----------------
export interface PartIChoiceQuestion {
  id: string;
  code: string;
  level: 'NB' | 'TH' | 'VD';
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  points: number;
  explanation: string;
}

export interface PartIITrueFalseStatement {
  subId: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PartIITrueFalseQuestion {
  id: string;
  code: string;
  level: 'NB' | 'TH' | 'VD';
  stem: string;
  statements: [
    PartIITrueFalseStatement,
    PartIITrueFalseStatement,
    PartIITrueFalseStatement,
    PartIITrueFalseStatement
  ];
  points: number;
}

export interface PartIIIShortAnswerQuestion {
  id: string;
  code: string;
  level: 'TH' | 'VD';
  question: string;
  correctAnswer: string;
  points: number;
  explanation: string;
}

export interface PartIVEssayQuestion {
  id: string;
  code: string;
  level: 'VD';
  question: string;
  rubric: {
    step: string;
    points: number;
  }[];
  points: number;
}

export interface Exam7991Data {
  examHeader: {
    title: string;
    duration: string;
    examCode: string;
  };
  passageRef?: string; // Ngữ liệu đề thi
  partI: PartIChoiceQuestion[];
  partII: PartIITrueFalseQuestion[];
  partIII: PartIIIShortAnswerQuestion[];
  partIV: PartIVEssayQuestion[];
}

export interface VerificationChecklist {
  hasThreeSubsystems: boolean;
  hasPartIITrueFalseFourStatements: boolean;
  hasExportWordPowerPoint: boolean;
  hasJsonHandoverBlock: boolean;
}

export interface AppState {
  version: string;
  lastUpdated: string;
  activeModule: ActiveModule;
  currentLessonId: string;
  lessons: LiteratureLesson[];
  khbd: LessonPlan5512;
  slides: SlideItem[];
  exam: Exam7991Data;
  questions: LiteratureQuestionItem[];
  rubric: RubricData;
  checklist: VerificationChecklist;
}

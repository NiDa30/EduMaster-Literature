import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckSquare, 
  Compass, 
  ArrowRight,
  Clock,
  PlusCircle,
  FileText,
  X,
  Sparkles,
  Layers,
  FileCheck2,
  Presentation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ActiveModule, 
  LiteratureLesson, 
  LessonPlan5512, 
  LiteratureGenre,
  SlideItem,
  Exam7991Data,
  LiteratureQuestionItem,
  RubricData
} from '../types';
import { normalizeVietnamese } from '../utils/unicode';

interface TeacherDashboardProps {
  lessons: LiteratureLesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  setActiveModule: (m: ActiveModule) => void;
  khbd: LessonPlan5512;
  onCreateLesson?: (lesson: LiteratureLesson) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  setActiveModule,
  khbd,
  onCreateLesson
}) => {
  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  // Create Lesson Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formGrade, setFormGrade] = useState<'Lớp 10' | 'Lớp 11' | 'Lớp 12'>('Lớp 12');
  const [formTextbook, setFormTextbook] = useState<'Kết nối tri thức' | 'Cánh diều' | 'Chân trời sáng tạo'>('Kết nối tri thức');
  const [formGenre, setFormGenre] = useState<LiteratureGenre>('story');
  const [formTheme, setFormTheme] = useState('Bài 1: Câu chuyện và điểm nhìn trong truyện kể');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formPeriods, setFormPeriods] = useState('2 tiết');
  const [formObjectives, setFormObjectives] = useState('');
  const [formCoreKnowledge, setFormCoreKnowledge] = useState('');
  const [formSourceText, setFormSourceText] = useState('');
  const [formReferences, setFormReferences] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formTitle.trim()) errors.title = 'Vui lòng nhập tên tác phẩm / bài học.';
    if (!formAuthor.trim()) errors.author = 'Vui lòng nhập tên tác giả.';
    if (!formObjectives.trim()) errors.objectives = 'Vui lòng nhập Yêu cầu cần đạt (YCCĐ).';
    if (!formSourceText.trim()) errors.sourceText = 'Vui lòng nhập ngữ liệu trích đoạn tác phẩm.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cleanTitle = normalizeVietnamese(formTitle.trim());
    const cleanAuthor = normalizeVietnamese(formAuthor.trim());
    const cleanObjectives = normalizeVietnamese(formObjectives.trim());
    const cleanSourceText = normalizeVietnamese(formSourceText.trim());
    const cleanTheme = normalizeVietnamese(formTheme.trim());
    const cleanCoreKnowledge = normalizeVietnamese(formCoreKnowledge.trim());

    // Generate starter KHBD for this lesson
    const starterKhbd: LessonPlan5512 = {
      info: {
        department: khbd.info.department || 'SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH',
        school: khbd.info.school || 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG',
        subjectGroup: 'TỔ NGỮ VĂN',
        teacherName: khbd.info.teacherName || 'ThS. Lê Thị Lan Anh',
        subject: 'Ngữ văn',
        grade: formGrade,
        textbook: formTextbook === 'Kết nối tri thức' ? 'Kết nối tri thức với cuộc sống' : formTextbook,
        lessonTitle: `${cleanTitle.toUpperCase()} (${cleanAuthor.toUpperCase()})`,
        periods: `${formPeriods} (PPCT)`,
        academicYear: 'Năm học 2024 - 2025',
        assignedClasses: ['12 Văn', '12A1'],
        semester: 'Học kỳ I'
      },
      objectives: {
        knowledge: [
          cleanObjectives,
          cleanCoreKnowledge || `Nắm vững đặc trưng thể loại và phong cách nghệ thuật của tác giả ${cleanAuthor}.`,
          'Vận dụng tri thức ngữ văn để phân tích, đánh giá chủ đề và tư tưởng của văn bản.'
        ],
        generalCompetencies: {
          selfControl: 'Chủ động tìm kiếm tư liệu, đọc hiểu văn bản và chuẩn bị bài trước ở nhà.',
          communication: 'Tự tin trình bày cảm thụ văn học, tích cực thảo luận nhóm và phản biện xây dựng.',
          problemSolving: 'Phát hiện vấn đề nghệ thuật, giải mã các tầng nghĩa biểu tượng của văn bản.'
        },
        specializedCompetencies: [
          `Năng lực đọc hiểu văn bản: Phân tích các yếu tố đặc trưng thể loại trong tác phẩm ${cleanTitle}.`,
          'Năng lực cảm thụ thẩm mỹ: Rung cảm trước vẻ đẹp tư tưởng và ngôn từ nghệ thuật.',
          'Năng lực tạo lập văn bản: Viết được bài văn hoặc đoạn văn nghị luận sắc sảo.'
        ],
        qualities: [
          'Nhân ái: Đồng cảm với số phận con người và trân trọng giá trị nhân văn cao đẹp.',
          'Trách nhiệm: Nhận thức rõ trách nhiệm của bản thân với cộng đồng và xã hội.'
        ]
      },
      equipment: {
        teacher: [
          'Kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT-GDTrH.',
          'Bộ Slide bài giảng Storytelling và hệ thống phiếu học tập.',
          'Rubric đánh giá năng lực học sinh.'
        ],
        student: [
          `Sách giáo khoa Ngữ văn ${formGrade}, vở ghi bài và bản chuẩn bị tác phẩm ${cleanTitle}.`,
          'Phiếu học tập và dụng cụ học tập.'
        ]
      },
      activities: [
        {
          id: `act-${Date.now()}-1`,
          name: `Hoạt động 1: Khởi động (Tiếp cận tác phẩm ${cleanTitle})`,
          type: 'warmup',
          time: '7 phút',
          objective: 'Tạo tâm thế hứng khởi và kích hoạt tri thức nền của học sinh.',
          content: `Quan sát tư liệu hình ảnh và câu hỏi dẫn dắt về tác giả ${cleanAuthor} và bối cảnh tác phẩm.`,
          product: 'Câu trả lời nhanh của học sinh về ấn tượng ban đầu.',
          method: 'Dạy học trực quan, vấn đáp gợi mở',
          tools: 'Máy chiếu, hình ảnh tư liệu',
          steps: {
            step1: `GV đặt câu hỏi gợi mở liên hệ chủ đề bài học "${cleanTheme}".`,
            step2: 'HS suy nghĩ độc lập trong 1 phút và trao đổi cùng bạn.',
            step3: 'GV gọi 2 HS đại diện chia sẻ cảm nhận.',
            step4: `GV tổng kết và giới thiệu văn bản ${cleanTitle} của ${cleanAuthor}.`
          }
        },
        {
          id: `act-${Date.now()}-2`,
          name: `Hoạt động 2: Hình thành kiến thức (Khám phá văn bản ${cleanTitle})`,
          type: 'knowledge',
          time: '25 phút',
          objective: cleanObjectives,
          content: 'Lớp chia nhóm tìm hiểu các nội dung trọng tâm của tác phẩm và nghệ thuật thể hiện.',
          product: 'Bảng tổng hợp kiến thức hoặc sơ đồ tư duy của các nhóm học sinh.',
          method: 'Dạy học hợp tác nhóm, phân tích ngữ liệu văn bản',
          tools: 'Phiếu học tập, bút dạ, bảng phụ',
          steps: {
            step1: 'GV phát phiếu học tập và phân công nhiệm vụ cụ thể cho từng nhóm.',
            step2: 'Các nhóm nghiên cứu ngữ liệu văn bản và thảo luận hoàn thành phiếu.',
            step3: 'Đại diện các nhóm báo cáo kết quả thảo luận.',
            step4: 'GV nhận xét, chuẩn hóa kiến thức trọng tâm.'
          }
        },
        {
          id: `act-${Date.now()}-3`,
          name: 'Hoạt động 3: Luyện tập (Củng cố tri thức đọc hiểu)',
          type: 'practice',
          time: '8 phút',
          objective: 'Rèn luyện kỹ năng phân tích ngữ liệu và trả lời câu hỏi đọc hiểu.',
          content: 'Học sinh làm việc cá nhân hoàn thành các bài tập đọc hiểu nhanh.',
          product: 'Đáp án chính xác của học sinh trên phiếu luyện tập.',
          method: 'Luyện tập thực hành, vấn đáp tương tác',
          tools: 'Phiếu bài tập',
          steps: {
            step1: 'GV chiếu các câu hỏi củng cố lên màn hình.',
            step2: 'HS suy nghĩ và trả lời độc lập.',
            step3: 'GV gọi HS chữa bài và giải thích phương án.',
            step4: 'GV chốt đáp án chuẩn và biểu dương tinh thần học tập.'
          }
        },
        {
          id: `act-${Date.now()}-4`,
          name: 'Hoạt động 4: Vận dụng & Mở rộng (Chiêm nghiệm thực tiễn)',
          type: 'application',
          time: '5 phút',
          objective: 'Kết nối thông điệp tác phẩm với đời sống thực tiễn của bản thân.',
          content: `Viết đoạn văn ngắn chia sẻ bài học nhân sinh rút ra từ tác phẩm ${cleanTitle}.`,
          product: 'Đoạn văn ngắn của học sinh thể hiện suy nghĩ chân thành.',
          method: 'Dạy học nêu vấn đề, viết sáng tạo',
          tools: 'Vở ghi / Sổ tay văn học',
          steps: {
            step1: 'GV nêu câu hỏi chiêm nghiệm kết nối thực tế.',
            step2: 'HS lập dàn ý nhanh tại lớp.',
            step3: 'GV gọi 1 HS trình bày ngắn gọn.',
            step4: 'GV dặn dò hoàn thiện bài tập về nhà.'
          }
        }
      ]
    };

    // Starter Slides
    const starterSlides: SlideItem[] = [
      {
        id: `slide-${Date.now()}-1`,
        title: `${cleanTitle.toUpperCase()} - ${cleanAuthor.toUpperCase()}`,
        phaseTag: 'Khởi động',
        layout: 'single',
        contentLeft: `Bài dạy chuẩn Chương trình GDPT 2018 môn Ngữ văn. Khám phá vẻ đẹp nội dung và nghệ thuật của tác phẩm.`,
        bullets: [
          `Môn học: Ngữ văn ${formGrade} (${formTextbook})`,
          `Chủ đề: ${cleanTheme}`,
          `Thời lượng: ${formPeriods}`,
          `Mục tiêu: ${cleanObjectives}`
        ],
        speakerNotes: `GV mở đầu giới thiệu bối cảnh sáng tác và vị thế tác giả ${cleanAuthor}.`
      },
      {
        id: `slide-${Date.now()}-2`,
        title: 'TRÍCH ĐOẠN NGỮ LIỆU TRỌNG TÂM',
        phaseTag: 'Kiến thức mới',
        layout: 'quote',
        contentLeft: 'Đọc diễn cảm và định vị các chi tiết nghệ thuật đắt giá:',
        quoteText: cleanSourceText.slice(0, 320) + (cleanSourceText.length > 320 ? '...' : ''),
        quoteAuthor: `${cleanAuthor} - ${cleanTitle}`,
        discussionQuestion: 'Chi tiết hoặc hình ảnh nào trong đoạn trích tạo cho em ấn tượng sâu sắc nhất? Vì sao?',
        speakerNotes: 'Cho học sinh 2 phút đọc thầm và đánh dấu các từ ngữ gợi cảm.'
      },
      {
        id: `slide-${Date.now()}-3`,
        title: 'TỔNG KẾT BÀI HỌC & CHIÊM NGHIỆM',
        phaseTag: 'Tổng kết',
        layout: 'single',
        contentLeft: 'Khắc sâu những giá trị cốt lõi đọng lại từ tác phẩm:',
        bullets: [
          `Giá trị tư tưởng: Khẳng định thông điệp nhân văn cao đẹp của tác giả ${cleanAuthor}`,
          `Nét đặc sắc nghệ thuật: Thể hiện sinh động đặc trưng thể loại ${formGenre === 'poetry' ? 'Thơ trữ tình' : formGenre === 'story' ? 'Truyện' : 'Văn nghị luận'}`,
          'Bài học cuộc sống: Sống có lý tưởng, thấu cảm và trách nhiệm',
          'Nhiệm vụ về nhà: Hoàn thành bài tập viết đoạn văn trên hệ thống LMS'
        ],
        speakerNotes: 'Dặn dò học sinh chuẩn bị bài cho tiết học tiếp theo.'
      }
    ];

    // Starter Questions
    const starterQuestions: LiteratureQuestionItem[] = [
      {
        id: `q-${Date.now()}-1`,
        code: 'Câu 1 (Đọc hiểu)',
        type: 'doc_hieu',
        level: 'NB',
        skill: 'Nhận diện',
        passageSnippet: cleanSourceText.slice(0, 200),
        question: `Xác định thể loại và phương thức biểu đạt chính của đoạn trích trên.`,
        answer: `- Thể loại: ${formGenre === 'poetry' ? 'Thơ trữ tình' : formGenre === 'story' ? 'Truyện' : 'Văn nghị luận'}.\n- Phương thức biểu đạt chính: ${formGenre === 'poetry' ? 'Biểu cảm' : formGenre === 'story' ? 'Tự sự' : 'Nghị luận'}.`,
        guide: 'Học sinh trả lời đúng mỗi ý được 0.25 điểm (tổng 0.5 điểm).',
        points: 0.5,
        linkedPart: 'partI'
      },
      {
        id: `q-${Date.now()}-2`,
        code: 'Câu 2 (Tiếng Việt)',
        type: 'tieng_viet',
        level: 'TH',
        skill: 'Phân tích',
        passageSnippet: cleanSourceText.slice(0, 200),
        question: 'Chỉ ra và phân tích tác dụng của một biện pháp tu từ nổi bật trong đoạn trích.',
        answer: 'Chỉ ra đúng biện pháp tu từ và phân tích được hiệu quả tăng sức biểu cảm hoặc làm nổi bật tư tưởng hình tượng.',
        guide: 'Chỉ đúng biện pháp: 0.25đ; phân tích hiệu quả: 0.5đ.',
        points: 0.75,
        linkedPart: 'partII'
      },
      {
        id: `q-${Date.now()}-3`,
        code: 'Câu 3 (Nghị luận văn học)',
        type: 'nl_van_hoc',
        level: 'VD',
        skill: 'Sáng tạo',
        passageSnippet: cleanSourceText.slice(0, 200),
        question: `Phân tích vẻ đẹp nội dung và nghệ thuật của tác phẩm "${cleanTitle}". Từ đó nhận xét ngắn gọn về phong cách của nhà văn ${cleanAuthor}.`,
        answer: 'Bài viết đảm bảo mở bài, thân bài với hệ thống luận điểm sáng rõ, dẫn chứng xác thực và kết bài khái quát.',
        guide: 'Chấm theo khung Rubric bài văn nghị luận văn học chuẩn GDPT 2018 (4.0 điểm).',
        points: 4.0,
        linkedPart: 'partIV'
      }
    ];

    // Starter Exam
    const starterExam: Exam7991Data = {
      examHeader: {
        title: `ĐỀ KIỂM TRA ĐỊNH KỲ - NGỮ VĂN ${formGrade.toUpperCase().replace('LỚP ', '')}`,
        duration: '90 phút (Không kể thời gian phát đề)',
        examCode: `MÃ ĐỀ: ${Math.floor(100 + Math.random() * 900)}`
      },
      passageRef: `ĐỌC NGỮ LIỆU SAU VÀ THỰC HIỆN CÁC YÊU CẦU:\n"${cleanSourceText.slice(0, 450)}${cleanSourceText.length > 450 ? '...' : ''}"\n(Trích "${cleanTitle}" - ${cleanAuthor}, SGK Ngữ văn ${formGrade})`,
      partI: [
        {
          id: `ep1-${Date.now()}-1`,
          code: 'Câu 1',
          level: 'NB',
          question: `Văn bản "${cleanTitle}" của tác giả ${cleanAuthor} thuộc thể loại nào dưới đây?`,
          options: {
            A: formGenre === 'poetry' ? 'Thơ trữ tình' : formGenre === 'story' ? 'Truyện ngắn hiện đại' : 'Văn chính luận',
            B: 'Kí sự truyền cảm',
            C: 'Kịch bản văn học',
            D: 'Truyền thuyết dân gian'
          },
          correctAnswer: 'A',
          points: 0.25,
          explanation: `Tác phẩm thuộc thể loại ${formGenre === 'poetry' ? 'Thơ trữ tình' : formGenre === 'story' ? 'Truyện' : 'Văn nghị luận'}.`
        },
        {
          id: `ep1-${Date.now()}-2`,
          code: 'Câu 2',
          level: 'NB',
          question: `Phương thức biểu đạt chính được tác giả ${cleanAuthor} sử dụng trong đoạn trích là gì?`,
          options: {
            A: formGenre === 'poetry' ? 'Biểu cảm' : formGenre === 'story' ? 'Tự sự' : 'Nghị luận',
            B: 'Thuyết minh',
            C: 'Hành chính',
            D: 'Miêu tả thuần túy'
          },
          correctAnswer: 'A',
          points: 0.25,
          explanation: 'Phương thức biểu đạt chủ đạo phù hợp đặc trưng thể loại.'
        }
      ],
      partII: [
        {
          id: `ep2-${Date.now()}-1`,
          code: 'Câu 1 (Đúng/Sai)',
          level: 'TH',
          stem: `Đọc đoạn trích ngữ liệu tác phẩm "${cleanTitle}". Xác định tính Đúng / Sai của các nhận định sau:`,
          statements: [
            {
              subId: 'a',
              text: `Đoạn trích thể hiện sâu sắc tư tưởng nghệ thuật và tình cảm chân thành của tác giả ${cleanAuthor}.`,
              isCorrect: true,
              explanation: 'Nhận định đúng với nội dung và tinh thần tác phẩm.'
            },
            {
              subId: 'b',
              text: 'Ngữ điệu tác phẩm hoàn toàn mang tính châm biếm, phê phán tiêu cực không có tính xây dựng.',
              isCorrect: false,
              explanation: 'Tác phẩm mang tính nhân văn sâu sắc, không mang giọng điệu tiêu cực.'
            },
            {
              subId: 'c',
              text: 'Ngôn từ nghệ thuật được chắt lọc, giàu sức gợi cảm và hình tượng thẩm mỹ.',
              isCorrect: true,
              explanation: 'Đặc trưng ngôn từ văn học giàu tính thẩm mỹ.'
            },
            {
              subId: 'd',
              text: 'Tác phẩm hoàn toàn xa rời thực tế đời sống xã hội của thời đại sáng tác.',
              isCorrect: false,
              explanation: 'Tác phẩm phản ánh chân thực hiện thực và khát vọng của con người.'
            }
          ],
          points: 1.0
        }
      ],
      partIII: [
        {
          id: `ep3-${Date.now()}-1`,
          code: 'Câu 1',
          level: 'TH',
          question: `Ghi lại tên tác giả của văn bản "${cleanTitle}".`,
          correctAnswer: cleanAuthor,
          points: 0.5,
          explanation: `Tác giả sáng tác là ${cleanAuthor}.`
        },
        {
          id: `ep3-${Date.now()}-2`,
          code: 'Câu 2',
          level: 'VD',
          question: `Từ ngữ nào trong ngữ liệu thể hiện rõ nhất chủ đề của đoạn trích?`,
          correctAnswer: cleanTitle,
          points: 0.5,
          explanation: 'Từ khóa phản ánh trực tiếp nội dung trọng tâm.'
        }
      ],
      partIV: [
        {
          id: `ep4-${Date.now()}-1`,
          code: 'Câu 1 (Tự luận - Nghị luận văn học)',
          level: 'VD',
          question: `Cảm nhận của anh/chị về giá trị tư tưởng và nghệ thuật của tác phẩm "${cleanTitle}" qua đoạn trích trên. Từ đó nhận xét ngắn gọn về phong cách của ${cleanAuthor}.`,
          rubric: [
            {
              step: '1. Đảm bảo cấu trúc bài văn nghị luận (Mở bài, Thân bài, Kết bài); xác định đúng vấn đề nghị luận.',
              points: 0.5
            },
            {
              step: '2. Phân tích nội dung tư tưởng cốt lõi và các chi tiết thẩm mỹ trong tác phẩm.',
              points: 1.0
            },
            {
              step: '3. Phân tích đặc sắc nghệ thuật thể loại và ngôn từ.',
              points: 0.75
            },
            {
              step: '4. Nhận xét phong cách tác giả, diễn đạt sáng tạo, hành văn truyền cảm.',
              points: 0.75
            }
          ],
          points: 3.0
        }
      ]
    };

    // Starter Rubric
    const starterRubric: RubricData = {
      id: `rubric-${Date.now()}`,
      title: `Rubric Chấm Điểm Bài Viết Nghị Luận: "${cleanTitle}" (Thang 10.0)`,
      essayType: 'nl_van_hoc',
      totalPoints: 10.0,
      criteria: [
        {
          id: 'c-1',
          name: 'Xác định vấn đề nghị luận',
          weight: 10,
          maxPoints: 1.0,
          description: `Xác định đúng chủ đề và nội dung trọng tâm của tác phẩm ${cleanTitle}.`,
          levels: [
            { label: 'Xuất sắc', score: 1.0, descriptor: 'Xác định chính xác tuyệt đối, mở bài ấn tượng, dẫn dắt tự nhiên.' },
            { label: 'Đạt', score: 0.75, descriptor: 'Xác định được vấn đề, mở bài đủ ý.' },
            { label: 'Cần cố gắng', score: 0.25, descriptor: 'Xác định chưa rõ hoặc lệch trọng tâm.' }
          ]
        },
        {
          id: 'c-2',
          name: 'Bố cục & Cấu trúc bài viết',
          weight: 10,
          maxPoints: 1.0,
          description: 'Bố cục 3 phần mạch lạc, liên kết câu và đoạn chặt chẽ.',
          levels: [
            { label: 'Xuất sắc', score: 1.0, descriptor: 'Bố cục mẫu mực, chuyển ý mượt mà, phân đoạn khoa học.' },
            { label: 'Đạt', score: 0.75, descriptor: 'Đủ 3 phần nhưng chuyển đoạn còn cứng.' },
            { label: 'Cần cố gắng', score: 0.25, descriptor: 'Thiếu kết bài hoặc các đoạn rời rạc.' }
          ]
        },
        {
          id: 'c-3',
          name: 'Hệ thống Luận điểm & Lập luận',
          weight: 30,
          maxPoints: 3.0,
          description: 'Hệ thống luận điểm sáng rõ, lập luận chặt chẽ và thuyết phục.',
          levels: [
            { label: 'Xuất sắc', score: 3.0, descriptor: 'Luận điểm toàn diện, lập luận sắc bén, chiều sâu tư duy cao.' },
            { label: 'Đạt', score: 2.0, descriptor: 'Có đủ luận điểm cơ bản, lập luận tương đối vững.' },
            { label: 'Cần cố gắng', score: 1.0, descriptor: 'Luận điểm sơ sài, lặp ý hoặc diễn xuôi.' }
          ]
        },
        {
          id: 'c-4',
          name: 'Dẫn chứng & Phân tích nghệ thuật',
          weight: 25,
          maxPoints: 2.5,
          description: 'Khai thác dẫn chứng đắc địa, phân tích chi tiết nghệ thuật sâu sắc.',
          levels: [
            { label: 'Xuất sắc', score: 2.5, descriptor: 'Chọn dẫn chứng tinh tế, phân tích tỉ mỉ chi tiết nghệ thuật.' },
            { label: 'Đạt', score: 1.75, descriptor: 'Có trích dẫn chứng và phân tích cơ bản.' },
            { label: 'Cần cố gắng', score: 0.75, descriptor: 'Dẫn chứng thiếu chính xác, trích sai ngữ liệu.' }
          ]
        },
        {
          id: 'c-5',
          name: 'Diễn đạt & Sáng tạo',
          weight: 25,
          maxPoints: 2.5,
          description: 'Hành văn trong sáng, giàu cảm xúc, có phát hiện mới mẻ.',
          levels: [
            { label: 'Xuất sắc', score: 2.5, descriptor: 'Hành văn truyền cảm, vốn từ dồi dào, góc nhìn độc đáo sáng tạo.' },
            { label: 'Đạt', score: 1.75, descriptor: 'Diễn đạt rõ ý, có liên hệ mở rộng.' },
            { label: 'Cần cố gắng', score: 0.75, descriptor: 'Diễn đạt lủng củng, mắc lỗi chính tả.' }
          ]
        }
      ]
    };

    const newLesson: LiteratureLesson = {
      id: `lesson-${Date.now()}`,
      title: cleanTitle,
      author: cleanAuthor,
      authorBio: `${cleanAuthor} - Tác giả tiêu biểu trong chương trình Ngữ văn ${formGrade}.`,
      historicalContext: `Tác phẩm học tập trong chủ đề: ${cleanTheme}.`,
      genre: formGenre,
      grade: formGrade,
      textbook: formTextbook,
      progress: 25,
      lastModified: 'Vừa tạo',
      khbdStatus: 'ready',
      slideStatus: 'ready',
      examStatus: 'ready',
      textSections: [
        {
          id: `sec-${Date.now()}-1`,
          title: `Phần 1: Ngữ liệu tác phẩm`,
          content: cleanSourceText
        }
      ],
      fullText: cleanSourceText,
      annotations: [
        {
          id: `anno-${Date.now()}-1`,
          textSnippet: cleanSourceText.slice(0, 40) + '...',
          type: 'highlight',
          note: 'Trọng tâm ngữ liệu mở đầu cần chú ý.',
          color: 'amber',
          timestamp: 'Vừa tạo'
        }
      ],
      khbd: starterKhbd,
      slides: starterSlides,
      questions: starterQuestions,
      exam: starterExam,
      rubric: starterRubric
    };

    // If genre is poetry, add starter poetryAnalysis
    if (formGenre === 'poetry') {
      newLesson.poetryAnalysis = {
        theme: cleanObjectives,
        imagery: ['Hình tượng nghệ thuật trung tâm', 'Không gian thẩm mỹ'],
        keywords: [cleanTitle, cleanAuthor],
        emotionalFlow: 'Mạch cảm xúc vận động tự nhiên và sâu lắng.',
        rhythmAndRhyme: 'Nhịp thơ linh hoạt, gieo vần phù hợp.',
        tone: 'Thiết tha, sâu lắng, truyền cảm.',
        rhetoricalDevices: ['Biện pháp tu từ ẩn dụ, nhân hóa, điệp từ'],
        keyVerses: [cleanSourceText.slice(0, 80)],
        contentValue: cleanObjectives,
        artisticValue: 'Ngôn từ cô đọng, giàu nhạc điệu và sức biểu cảm.'
      };
    } else if (formGenre === 'story') {
      newLesson.storyAnalysis = {
        characters: [
          {
            name: 'Nhân vật chính',
            role: 'Nhân vật trung tâm của câu chuyện',
            traits: ['Tính cách nổi bật', 'Hành động đặc trưng'],
            psychologicalShift: 'Diễn biến tâm lý qua các biến cố trong tác phẩm.',
            quote: cleanSourceText.slice(0, 100)
          }
        ],
        events: ['Sự kiện khởi đầu', 'Đỉnh điểm biến cố', 'Kết thúc'],
        storySituation: 'Tình huống truyện độc đáo tạo nút thắt và mở nút.',
        psychologicalShift: 'Sự chuyển biến nội tâm nhân vật qua tình huống.',
        pointOfView: 'Điểm nhìn trần thuật tự sự.',
        narrator: 'Người kể chuyện.',
        artisticDetails: ['Chi tiết nghệ thuật then chốt'],
        themes: [cleanObjectives],
        message: cleanCoreKnowledge || 'Thông điệp nhân văn sâu sắc.'
      };
    } else {
      newLesson.argumentMap = {
        thesis: cleanObjectives,
        claims: [
          {
            id: `c-${Date.now()}-1`,
            title: 'Luận điểm 1: Cơ sở lý lẽ và nguyên lý chung',
            reasons: [
              {
                id: `r-${Date.now()}-1`,
                text: 'Lý lẽ chặt chẽ làm sáng tỏ luận điểm.',
                evidences: [
                  {
                    id: `e-${Date.now()}-1`,
                    text: 'Dẫn chứng xác thực từ thực tiễn.',
                    quote: cleanSourceText.slice(0, 120)
                  }
                ]
              }
            ]
          }
        ],
        conclusion: 'Khẳng định chân lý và bài học hành động.'
      };
    }

    if (onCreateLesson) {
      onCreateLesson(newLesson);
    } else {
      onSelectLesson(newLesson.id);
      setActiveModule('workspace');
    }

    setIsModalOpen(false);
    // Reset form
    setFormTitle('');
    setFormAuthor('');
    setFormObjectives('');
    setFormCoreKnowledge('');
    setFormSourceText('');
    setFormReferences('');
    setFormErrors({});
  };

  // 6 Quick Actions (matching UI spec)
  const quickActions = [
    {
      id: 'create_lesson',
      title: 'Tạo bài dạy mới',
      desc: 'Thiết lập bài học theo chuẩn GDPT 2018',
      icon: PlusCircle,
      action: () => setIsModalOpen(true),
      isPrimary: true
    },
    {
      id: 'workspace',
      title: 'Soạn bài & Đọc văn',
      desc: 'Đọc tác phẩm, chú giải & trích dẫn ngữ liệu',
      icon: BookOpen,
      action: () => setActiveModule('workspace')
    },
    {
      id: 'genre_analysis',
      title: 'Phân tích thể loại',
      desc: 'Thi pháp Thơ, Truyện & Argument Map',
      icon: Compass,
      action: () => setActiveModule('genre_analysis')
    },
    {
      id: 'khbd',
      title: 'Soạn KHBD 5512',
      desc: 'Tiến trình 4 bước chuẩn Bộ Giáo dục',
      icon: FileText,
      action: () => setActiveModule('khbd')
    },
    {
      id: 'question_builder',
      title: 'Tạo câu hỏi',
      desc: 'Đọc hiểu, Tiếng Việt & Nghị luận',
      icon: HelpCircle,
      action: () => setActiveModule('question_builder')
    },
    {
      id: 'exam',
      title: 'Đề kiểm tra 7991',
      desc: 'Đề 4 phần, Ma trận & Đặc tả chuẩn',
      icon: CheckSquare,
      action: () => setActiveModule('exam')
    }
  ];

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 max-w-6xl w-full mx-auto space-y-4 overflow-hidden">
      {/* Editorial Page Greeting with Semester/Grade indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-page-title text-[24px] md:text-[28px] font-serif font-bold text-[#292524]">
            Bàn làm việc Giáo viên
          </h1>
          <p className="text-body-ui text-[#78716C] mt-0.5">
            Không gian thiết kế bài giảng & khảo thí môn Ngữ văn · {khbd.info.teacherName || 'ThS. Lê Thị Lan Anh'}
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full text-metadata font-medium bg-stone-100 text-[#57534E] border border-stone-200">
            Học kỳ II · Lớp 10, 11, 12
          </span>
          <span className="px-2.5 py-1 rounded-full text-metadata font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20">
            GDPT 2018
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary py-1.5 px-3.5 text-metadata flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo bài mới</span>
          </button>
        </div>
      </div>

      {/* Row 1: 2-Column Split (Tiếp tục công việc + 6 Quick Actions in 3x2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
        {/* KHU VỰC 1: TIẾP TỤC CÔNG VIỆC (Col 6 / 12) */}
        <section aria-labelledby="resume-heading" className="lg:col-span-6">
          <div className="card-highlight p-5 md:p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-metadata font-medium text-[#7C2D37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tiếp tục công việc
                </span>
                <span className="text-metadata text-[#78716C] bg-white/70 px-2 py-0.5 rounded border border-stone-200">
                  {currentLesson.grade} · {currentLesson.textbook}
                </span>
              </div>

              <div>
                <h2 id="resume-heading" className="font-serif text-[22px] md:text-[24px] font-bold text-[#292524] tracking-normal">
                  {currentLesson.title}
                </h2>
                <p className="text-body-ui text-[#57534E] mt-0.5">
                  Tác giả: {currentLesson.author} · Thể loại: {
                    currentLesson.genre === 'poetry' ? 'Thơ trữ tình' :
                    currentLesson.genre === 'story' ? 'Truyện ngắn' : 'Văn nghị luận'
                  }
                </p>
              </div>

              {/* Package Status Breakdown Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-200/80">
                <div className="bg-white/90 p-2 rounded-xl border border-stone-200/60 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                    <FileCheck2 className="w-3 h-3 text-emerald-600" />
                    <span>KHBD 5512</span>
                  </div>
                  <span className={`text-[12px] font-semibold mt-0.5 ${
                    currentLesson.khbdStatus === 'ready' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {currentLesson.khbdStatus === 'ready' ? 'Hoàn tất' : 'Đang soạn'}
                  </span>
                </div>

                <div className="bg-white/90 p-2 rounded-xl border border-stone-200/60 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                    <Presentation className="w-3 h-3 text-blue-600" />
                    <span>Slide bài giảng</span>
                  </div>
                  <span className={`text-[12px] font-semibold mt-0.5 ${
                    currentLesson.slideStatus === 'ready' ? 'text-blue-700' : 'text-stone-600'
                  }`}>
                    {currentLesson.slideStatus === 'ready' ? 'Sẵn sàng' : 'Bản thảo'}
                  </span>
                </div>

                <div className="bg-white/90 p-2 rounded-xl border border-stone-200/60 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                    <CheckCircle2 className="w-3 h-3 text-[#7C2D37]" />
                    <span>Đề 7991</span>
                  </div>
                  <span className={`text-[12px] font-semibold mt-0.5 ${
                    currentLesson.examStatus === 'ready' ? 'text-[#7C2D37]' : 'text-stone-500'
                  }`}>
                    {currentLesson.examStatus === 'ready' ? 'Chuẩn hóa' : 'Chưa tạo'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
              {/* Progress bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#7C2D37] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLesson.progress || 75}%` }}
                  />
                </div>
                <span className="text-metadata font-bold text-[#57534E] tabular-nums">
                  {currentLesson.progress || 75}%
                </span>
              </div>

              {/* The ONE Primary Action on the Dashboard */}
              <button
                onClick={() => setActiveModule('workspace')}
                className="btn-primary py-2 px-4 whitespace-nowrap self-end sm:self-auto shrink-0 shadow-sm"
              >
                <span>Mở không gian soạn</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>

        {/* KHU VỰC 2: TẠO MỚI & TRUY CẬP NHANH (Col 6 / 12, 3x2 grid) */}
        <section aria-labelledby="quick-actions-heading" className="lg:col-span-6 flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 h-full">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  className={`card-interactive p-3 text-left group flex flex-col justify-between min-h-[92px] transition ${
                    qa.isPrimary ? 'border-[#7C2D37]/30 bg-[#FBF4F5]/40 hover:bg-[#FBF4F5]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      qa.isPrimary 
                        ? 'bg-[#7C2D37] text-white' 
                        : 'bg-stone-100 group-hover:bg-[#FBF4F5] text-[#57534E] group-hover:text-[#7C2D37]'
                    }`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </div>
                    <h3 className={`text-card-title text-[13px] font-semibold transition-colors line-clamp-1 ${
                      qa.isPrimary ? 'text-[#7C2D37]' : 'text-stone-800 group-hover:text-[#7C2D37]'
                    }`}>
                      {qa.title}
                    </h3>
                  </div>
                  <p className="text-metadata text-[11px] text-[#78716C] line-clamp-2 mt-1">
                    {qa.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Row 2: BÀI HỌC GẦN ĐÂY (Compact rows table with local scroll) */}
      <section aria-labelledby="recent-lessons-heading" className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="flex items-center gap-2">
            <h2 id="recent-lessons-heading" className="text-card-title font-bold text-[#292524] font-serif">
              Danh mục bài học
            </h2>
            <span className="text-metadata text-[#78716C] bg-stone-100 px-2 py-0.5 rounded-full">
              {lessons.length} bài đã khởi tạo
            </span>
          </div>
          <span className="text-metadata text-[#78716C]">
            Bấm vào bài để chuyển đổi không gian giảng dạy
          </span>
        </div>

        <div className="card-surface divide-y divide-[#E7E5E4] rounded-2xl flex-1 min-h-0 overflow-y-auto">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  setActiveModule('workspace');
                }}
                className={`px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors ${
                  isSelected ? 'bg-[#FBF4F5]/70 border-l-4 border-l-[#7C2D37]' : ''
                }`}
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#57534E] shrink-0 font-serif font-bold text-xs">
                    {lesson.genre === 'poetry' ? 'Thơ' : lesson.genre === 'story' ? 'Tr' : 'NL'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-card-title font-semibold text-[#292524] truncate-safe">
                        {lesson.title}
                      </h3>
                      {isSelected && (
                        <span className="text-metadata text-[11px] font-semibold text-[#7C2D37] bg-[#7C2D37]/10 px-2 py-0.5 rounded-full">
                          Đang chọn
                        </span>
                      )}
                    </div>
                    <p className="text-metadata text-[12px] text-[#78716C] mt-0.5">
                      {lesson.author} · {lesson.grade} ({lesson.textbook})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-metadata text-[#57534E] shrink-0">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-stone-100 text-stone-600 font-medium">
                      KHBD: {lesson.khbdStatus === 'ready' ? 'Đã có' : 'Bản thảo'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-stone-100 text-stone-600 font-medium">
                      Đề 7991: {lesson.examStatus === 'ready' ? 'Đã có' : 'Bản thảo'}
                    </span>
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 text-metadata text-[#78716C]">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span className="tabular-nums">{lesson.lastModified || 'Chỉnh sửa gần đây'}</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#A8A29E] hover:text-[#7C2D37] transition-colors" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CREATE LESSON MODAL (Theo quy chuẩn Section 5 của Flow) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E7E5E4] flex items-center justify-between shrink-0 bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-card-title text-stone-900">
                    Tạo bài dạy Ngữ văn mới
                  </h3>
                  <p className="text-metadata text-stone-500">
                    Nhập dữ liệu theo chuẩn Chương trình GDPT 2018
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleCreateSubmit} className="p-4 sm:p-5 flex-1 min-h-0 overflow-y-auto space-y-4">
              {/* Row 1: Khối lớp & Bộ sách */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Khối / Lớp <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                  >
                    <option value="Lớp 10">Lớp 10 (THPT)</option>
                    <option value="Lớp 11">Lớp 11 (THPT)</option>
                    <option value="Lớp 12">Lớp 12 (THPT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Bộ sách giáo khoa <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formTextbook}
                    onChange={(e) => setFormTextbook(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                  >
                    <option value="Kết nối tri thức">Kết nối tri thức với cuộc sống</option>
                    <option value="Cánh diều">Cánh diều</option>
                    <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Thể loại & Số tiết */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Thể loại văn học <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value as LiteratureGenre)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                  >
                    <option value="poetry">Thơ trữ tình (Thất ngôn, Tự do, Lục bát)</option>
                    <option value="story">Truyện & Kí (Truyện ngắn, Tiểu thuyết)</option>
                    <option value="argumentative">Văn nghị luận (Chính luận, Xã hội)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Thời lượng / Số tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formPeriods}
                    onChange={(e) => setFormPeriods(e.target.value)}
                    placeholder="VD: 2 tiết, 3 tiết..."
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                  />
                </div>
              </div>

              {/* Row 3: Tên tác phẩm & Tác giả */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Tên tác phẩm / Bài dạy <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="VD: Chí Phèo, Vợ chồng A Phủ, Sóng..."
                    className={`w-full px-3 py-2 border rounded-xl text-body-ui bg-white focus:outline-none ${
                      formErrors.title ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-[#7C2D37]'
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-metadata font-semibold text-stone-700 mb-1">
                    Tác giả <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="VD: Nam Cao, Tô Hoài, Xuân Quỳnh..."
                    className={`w-full px-3 py-2 border rounded-xl text-body-ui bg-white focus:outline-none ${
                      formErrors.author ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-[#7C2D37]'
                    }`}
                  />
                  {formErrors.author && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.author}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Chủ đề / Tên bài học lớn */}
              <div>
                <label className="block text-metadata font-semibold text-stone-700 mb-1">
                  Chủ đề / Tên bài học lớn
                </label>
                <input
                  type="text"
                  value={formTheme}
                  onChange={(e) => setFormTheme(e.target.value)}
                  placeholder="VD: Bài 1: Câu chuyện và điểm nhìn trong truyện kể"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                />
              </div>

              {/* Row 5: Yêu cầu cần đạt (YCCĐ) */}
              <div>
                <label className="block text-metadata font-semibold text-stone-700 mb-1">
                  Yêu cầu cần đạt (YCCĐ chuẩn GDPT 2018) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formObjectives}
                  onChange={(e) => setFormObjectives(e.target.value)}
                  placeholder="VD: Phân tích được điểm nhìn trần thuật, nghệ thuật xây dựng nhân vật và thông điệp nhân đạo của văn bản..."
                  className={`w-full px-3 py-2 border rounded-xl text-body-ui bg-white focus:outline-none ${
                    formErrors.objectives ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-[#7C2D37]'
                  }`}
                />
                {formErrors.objectives && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.objectives}
                  </p>
                )}
              </div>

              {/* Row 6: Trọng tâm kiến thức */}
              <div>
                <label className="block text-metadata font-semibold text-stone-700 mb-1">
                  Trọng tâm kiến thức bài dạy
                </label>
                <input
                  type="text"
                  value={formCoreKnowledge}
                  onChange={(e) => setFormCoreKnowledge(e.target.value)}
                  placeholder="VD: Nghệ thuật trần thuật và bi kịch tha hóa của nhân vật"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                />
              </div>

              {/* Row 7: Ngữ liệu tác phẩm */}
              <div>
                <label className="block text-metadata font-semibold text-stone-700 mb-1">
                  Ngữ liệu tác phẩm / Trích đoạn văn bản <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formSourceText}
                  onChange={(e) => setFormSourceText(e.target.value)}
                  placeholder="Dán toàn văn tác phẩm hoặc các đoạn trích trọng tâm dùng để đọc, chú giải và ra đề..."
                  className={`w-full px-3 py-2 border rounded-xl text-body-ui bg-white focus:outline-none font-serif ${
                    formErrors.sourceText ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-[#7C2D37]'
                  }`}
                />
                {formErrors.sourceText && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.sourceText}
                  </p>
                )}
              </div>

              {/* Row 8: Tài liệu tham khảo */}
              <div>
                <label className="block text-metadata font-semibold text-stone-700 mb-1">
                  Tài liệu tham khảo (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={formReferences}
                  onChange={(e) => setFormReferences(e.target.value)}
                  placeholder="VD: Sách giáo viên Ngữ văn 12, Tư liệu phê bình văn học..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-body-ui bg-white focus:outline-none focus:border-[#7C2D37]"
                />
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E7E5E4] flex items-center justify-end gap-3 shrink-0 bg-stone-50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-200/60 rounded-xl text-metadata font-semibold transition"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleCreateSubmit}
                className="btn-primary py-2 px-5 flex items-center gap-2 shadow-sm"
              >
                <span>Tạo bài dạy & Soạn bài</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

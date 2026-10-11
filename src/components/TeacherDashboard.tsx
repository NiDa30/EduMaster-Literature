import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckSquare, 
  Compass, 
  ArrowRight,
  PlusCircle,
  FileText,
  X,
  Sparkles,
  Presentation,
  CheckCircle2,
  FileCheck2,
  Calendar,
  Layers,
  Search,
  Filter,
  Check
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
import { Badge } from './common/Badge';
import { ownerProfile } from '../config/ownerProfile';

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

  // Filter state for recent lessons table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<'all' | LiteratureGenre>('all');

  // Create Lesson Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formGrade, setFormGrade] = useState<'Lớp 10' | 'Lớp 11' | 'Lớp 12'>('Lớp 12');
  const [formTextbook, setFormTextbook] = useState<'Kết nối tri thức' | 'Cánh diều' | 'Chân trời sáng tạo'>('Kết nối tri thức');
  const [formGenre, setFormGenre] = useState<LiteratureGenre>('story');
  const [formTheme, setFormTheme] = useState('Bài 1: Khát vọng và số phận con người trong tác phẩm văn học');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formPeriods, setFormPeriods] = useState('2 tiết');
  const [formObjectives, setFormObjectives] = useState('');
  const [formCoreKnowledge, setFormCoreKnowledge] = useState('');
  const [formSourceText, setFormSourceText] = useState('');
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
        department: khbd.info.department || 'SỞ GD&ĐT VĨNH LONG',
        school: khbd.info.school || ownerProfile.institution,
        subjectGroup: 'TỔ NGỮ VĂN',
        teacherName: khbd.info.teacherName || ownerProfile.fullName,
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
          tools: 'Phiếu học tập số 1, văn bản trích đoạn',
          steps: {
            step1: 'GV chia lớp thành các nhóm, giao phiếu học tập phân tích đoạn trích.',
            step2: 'HS làm việc nhóm: thảo luận, tìm dẫn chứng và lý giải ý nghĩa chi tiết.',
            step3: 'Đại diện nhóm trình bày kết quả, các nhóm khác bổ sung phản biện.',
            step4: 'GV nhận xét, chuẩn hóa kiến thức và chốt kết luận sư phạm.'
          }
        },
        {
          id: `act-${Date.now()}-3`,
          name: 'Hoạt động 3: Luyện tập (Củng cố và rèn luyện kỹ năng)',
          type: 'practice',
          time: '8 phút',
          objective: 'Khắc sâu kiến thức trọng tâm và rèn luyện kỹ năng đọc hiểu.',
          content: 'Giải quyết câu hỏi trắc nghiệm và câu hỏi mở ngắn liên quan đến đoạn trích.',
          product: 'Câu trả lời đúng và lý giải thuyết phục của học sinh.',
          method: 'Trò chơi học tập hoặc làm việc cá nhân',
          tools: 'Hệ thống câu hỏi đọc hiểu trên Slide',
          steps: {
            step1: 'GV trình chiếu câu hỏi luyện tập trên slide.',
            step2: 'HS suy nghĩ và trả lời trên bảng phụ hoặc giơ thẻ tín hiệu.',
            step3: 'GV gọi HS giải thích lý do lựa chọn đáp án.',
            step4: 'GV chốt đáp án đúng và biểu dương các câu trả lời sắc sảo.'
          }
        },
        {
          id: `act-${Date.now()}-4`,
          name: 'Hoạt động 4: Vận dụng (Mở rộng & Liên hệ thực tiễn)',
          type: 'application',
          time: '5 phút',
          objective: 'Phát triển năng lực tự học, bồi dưỡng nhân sinh quan tích cực.',
          content: 'Viết đoạn văn ngắn bày tỏ suy nghĩ về thông điệp tư tưởng của tác phẩm.',
          product: 'Đoạn văn ngắn của học sinh hoàn thành ở nhà.',
          method: 'Dạy học dự án, viết sáng tạo',
          tools: 'Sổ tay văn học cá nhân',
          steps: {
            step1: 'GV giao nhiệm vụ viết đoạn văn (khoảng 150 - 200 chữ).',
            step2: 'GV hướng dẫn tiêu chí chấm điểm theo Rubric năng lực.',
            step3: 'HS ghi nhận nhiệm vụ và nộp bài vào buổi học tiếp theo.',
            step4: 'GV tổng kết tiết học và nhắc nhở nhiệm vụ chuẩn bị bài mới.'
          }
        }
      ]
    };

    // Starter Slides
    const starterSlides: SlideItem[] = [
      {
        id: `slide-${Date.now()}-1`,
        title: cleanTitle.toUpperCase(),
        subtitle: `Tác giả: ${cleanAuthor} · Chương trình Ngữ văn ${formGrade}`,
        phaseTag: 'Khởi động',
        layout: 'cover',
        contentLeft: `Bài dạy thể loại: ${formGenre === 'poetry' ? 'Thơ' : formGenre === 'story' ? 'Truyện ngắn' : 'Văn nghị luận'}`,
        speakerNotes: 'Slide mở đầu: Giới thiệu ấn tượng tác phẩm và truyền cảm hứng cho học sinh.'
      },
      {
        id: `slide-${Date.now()}-2`,
        title: 'MỤC TIÊU BÀI HỌC (YCCĐ)',
        phaseTag: 'Khởi động',
        layout: 'objectives',
        contentLeft: 'Yêu cầu cần đạt về năng lực và phẩm chất học sinh sau bài học:',
        bulletPoints: [
          cleanObjectives,
          cleanCoreKnowledge || `Nắm vững đặc trưng thể loại trong tác phẩm ${cleanTitle}.`,
          'Bồi dưỡng năng lực cảm thụ thẩm mỹ và phẩm chất nhân văn cao đẹp.'
        ],
        speakerNotes: 'Nêu rõ đích đến của tiết học giúp học sinh chủ động chiếm lĩnh tri thức.'
      },
      {
        id: `slide-${Date.now()}-3`,
        title: 'TRÍCH ĐOẠN NGỮ LIỆU TRỌNG TÂM',
        phaseTag: 'Kiến thức mới',
        layout: 'quote',
        contentLeft: 'Phân tích vẻ đẹp ngôn từ và tư tưởng nghệ thuật:',
        quoteText: cleanSourceText.slice(0, 260) + (cleanSourceText.length > 260 ? '...' : ''),
        quoteAuthor: cleanAuthor,
        discussionQuestion: 'Câu hỏi gợi mở: Cảm nhận của em về chi tiết nghệ thuật hoặc hình tượng trong đoạn trích?',
        speakerNotes: 'Cho học sinh đọc diễn cảm đoạn trích và phát hiện từ ngữ then chốt.'
      }
    ];

    // Starter Questions
    const starterQuestions: LiteratureQuestionItem[] = [
      {
        id: `q-${Date.now()}-1`,
        type: 'doc_hieu',
        level: 'NB',
        skill: 'Nhận diện',
        question: `Xác định thể loại và phương thức biểu đạt chính của văn bản "${cleanTitle}".`,
        passage: cleanSourceText.slice(0, 200),
        suggestedAnswer: `Thể loại: ${formGenre === 'poetry' ? 'Thơ trữ tình' : formGenre === 'story' ? 'Truyện' : 'Nghị luận'}. Phương thức biểu đạt chính: ${formGenre === 'poetry' ? 'Biểu cảm' : formGenre === 'story' ? 'Tự sự' : 'Nghị luận'}.`,
        markingGuide: 'Học sinh xác định đúng cả hai yếu tố đạt 0.5 điểm.',
        points: 0.5
      },
      {
        id: `q-${Date.now()}-2`,
        type: 'doc_hieu',
        level: 'TH',
        skill: 'Phân tích',
        question: `Chỉ ra và nêu tác dụng của biện pháp nghệ thuật tiêu biểu trong đoạn trích.`,
        passage: cleanSourceText.slice(0, 200),
        suggestedAnswer: 'Học sinh chỉ ra đúng biện pháp nghệ thuật và phân tích tác dụng gợi hình, gợi cảm.',
        markingGuide: 'Nêu tên biện pháp: 0.25đ. Phân tích tác dụng: 0.5đ.',
        points: 0.75
      }
    ];

    // Starter Exam
    const starterExam: Exam7991Data = {
      title: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN NGỮ VĂN ${formGrade.toUpperCase()}`,
      timeLimit: '90 phút',
      grade: formGrade,
      semester: 'Học kỳ I',
      academicYear: '2024 - 2025',
      examHeader: {
        title: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN NGỮ VĂN ${formGrade.toUpperCase()}`,
        duration: '90 phút',
        examCode: 'MÃ ĐỀ: 101'
      },
      passageRef: cleanSourceText,
      totalPoints: 10.0,
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
          description: 'Triển khai luận điểm rõ ràng, lập luận chặt chẽ, dẫn chứng xác đáng.',
          levels: [
            { label: 'Xuất sắc', score: 3.0, descriptor: 'Luận điểm sâu sắc, lập luận chặt chẽ, dẫn chứng giàu sức thuyết phục.' },
            { label: 'Đạt', score: 2.0, descriptor: 'Luận điểm rõ ràng, có dẫn chứng nhưng chưa phân tích sâu.' },
            { label: 'Cần cố gắng', score: 1.0, descriptor: 'Luận điểm mờ nhạt hoặc dẫn chứng sơ sài.' }
          ]
        },
        {
          id: 'c-4',
          name: 'Phân tích Nghệ thuật & Cảm thụ thẩm mỹ',
          weight: 30,
          maxPoints: 3.0,
          description: 'Khám phá đặc sắc thi pháp, ngôn từ, hình tượng và rung cảm thẩm mỹ.',
          levels: [
            { label: 'Xuất sắc', score: 3.0, descriptor: 'Cảm thụ tinh tế, phân tích sâu sắc các thủ pháp nghệ thuật.' },
            { label: 'Đạt', score: 2.0, descriptor: 'Chỉ ra được nghệ thuật nhưng cảm thụ còn chung chung.' },
            { label: 'Cần cố gắng', score: 1.0, descriptor: 'Ít chú ý đến phương diện nghệ thuật của tác phẩm.' }
          ]
        },
        {
          id: 'c-5',
          name: 'Chính tả, Ngữ pháp & Diễn đạt',
          weight: 10,
          maxPoints: 1.0,
          description: 'Đảm bảo chuẩn chính tả, dùng từ đúng nghĩa, ngữ pháp tiếng Việt chuẩn mực.',
          levels: [
            { label: 'Xuất sắc', score: 1.0, descriptor: 'Không mắc lỗi chính tả, diễn đạt trong sáng, giàu nhạc tính.' },
            { label: 'Đạt', score: 0.75, descriptor: 'Mắc một vài lỗi chính tả nhỏ không ảnh hưởng đến nội dung.' },
            { label: 'Cần cố gắng', score: 0.25, descriptor: 'Mắc nhiều lỗi câu hoặc dùng từ sai nghĩa.' }
          ]
        },
        {
          id: 'c-6',
          name: 'Sáng tạo & Phong cách cá nhân',
          weight: 10,
          maxPoints: 1.0,
          description: 'Có suy nghĩ mới mẻ, liên hệ so sánh văn học phong phú, giọng văn riêng.',
          levels: [
            { label: 'Xuất sắc', score: 1.0, descriptor: 'Có kiến giải độc đáo, liên hệ so sánh sâu sắc, hành văn truyền cảm.' },
            { label: 'Đạt', score: 0.5, descriptor: 'Có ý thức sáng tạo nhưng chưa rõ nét.' },
            { label: 'Cần cố gắng', score: 0.0, descriptor: 'Bài viết dập khuôn máy móc.' }
          ]
        }
      ]
    };

    const newLesson: LiteratureLesson = {
      id: `lesson-${Date.now()}`,
      title: cleanTitle,
      author: cleanAuthor,
      grade: formGrade,
      textbook: formTextbook,
      genre: formGenre,
      theme: cleanTheme,
      periods: formPeriods,
      authorBio: `Tác giả ${cleanAuthor} là một trong những gương mặt tiêu biểu của nền văn học Việt Nam hiện đại, ghi dấu ấn sâu đậm với phong cách nghệ thuật độc đáo.`,
      historicalContext: `Tác phẩm ${cleanTitle} được sáng tác trong bối cảnh lịch sử - xã hội có nhiều chuyển biến quan trọng, phản ánh sâu sắc số phận con người và hơi thở thời đại.`,
      progress: 60,
      khbdStatus: 'ready',
      slideStatus: 'ready',
      examStatus: 'ready',
      lastModified: 'Vừa xong',
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
    setFormTitle('');
    setFormAuthor('');
    setFormObjectives('');
    setFormCoreKnowledge('');
    setFormSourceText('');
    setFormErrors({});
  };

  // Quick Actions (6 Actions sư phạm)
  const quickActions = [
    {
      id: 'create_lesson',
      title: 'Tạo bài dạy mới',
      desc: 'Khởi tạo bài học GDPT 2018',
      icon: PlusCircle,
      action: () => setIsModalOpen(true),
      isPrimary: true
    },
    {
      id: 'workspace',
      title: 'Đọc & Soạn văn',
      desc: 'Đọc tác phẩm, chú giải & dẫn chứng',
      icon: BookOpen,
      action: () => setActiveModule('workspace')
    },
    {
      id: 'genre_analysis',
      title: 'Phân tích thể loại',
      desc: 'Thi pháp & Bản đồ lập luận',
      icon: Compass,
      action: () => setActiveModule('genre_analysis')
    },
    {
      id: 'khbd',
      title: 'Soạn KHBD 5512',
      desc: 'Tiến trình 4 bước dạy học',
      icon: FileText,
      action: () => setActiveModule('khbd')
    },
    {
      id: 'question_builder',
      title: 'Tạo câu hỏi',
      desc: 'Đọc hiểu, Tiếng Việt & Đề 4 phần',
      icon: HelpCircle,
      action: () => setActiveModule('question_builder')
    },
    {
      id: 'exam',
      title: 'Đề kiểm tra 7991',
      desc: 'Đề chuẩn & Ma trận đặc tả',
      icon: CheckSquare,
      action: () => setActiveModule('exam')
    }
  ];

  // Filter lessons
  const filteredLessons = lessons.filter(l => {
    if (selectedGenreFilter !== 'all' && l.genre !== selectedGenreFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.title.toLowerCase().includes(q) || l.author.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 max-w-7xl w-full mx-auto space-y-4 overflow-hidden">
      {/* 1. Header Greeting & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-2xl md:text-[26px] text-[#211E1C] tracking-tight">
              Bàn làm việc Giáo viên
            </h1>
            <Badge variant="burgundy" size="sm">
              GDPT 2018
            </Badge>
          </div>
          <p className="text-body-ui text-[#706A65] mt-0.5">
            Không gian thiết kế bài dạy & khảo thí chuyên sâu · <span className="font-medium text-[#211E1C]">{ownerProfile.fullName}</span> · {ownerProfile.role} ({ownerProfile.institution})
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Badge variant="stone" size="md" icon={<Calendar className="w-3.5 h-3.5" />}>
            Năm học 2024 - 2025 · Học kỳ II
          </Badge>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary py-1.5 px-3.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo bài dạy</span>
          </button>
        </div>
      </div>

      {/* 2. Top Row: Main Resume Card (60%) + 6 Quick Actions (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
        {/* Main Resume Card (7 / 12 cols) */}
        <section data-tour-id="dashboard-resume" className="lg:col-span-7 flex flex-col">
          <div className="p-5 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FCF6F7] border border-[#E5E0DA] rounded-2xl shadow-[var(--shadow-xs)]">
            {/* Top metadata */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7A2938]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tác phẩm đang soạn thảo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="stone" size="sm">
                    {currentLesson.grade}
                  </Badge>
                  <Badge variant="stone" size="sm">
                    {currentLesson.textbook}
                  </Badge>
                  <Badge variant="burgundy" size="sm">
                    {currentLesson.periods || '2 tiết'}
                  </Badge>
                </div>
              </div>

              {/* Title & Author */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211E1C] tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-body-ui text-[#706A65] mt-1">
                  Tác giả: <span className="font-medium text-[#211E1C]">{currentLesson.author}</span> · Thể loại:{' '}
                  <span className="font-medium text-[#211E1C]">
                    {currentLesson.genre === 'poetry' ? 'Thơ trữ tình' : currentLesson.genre === 'story' ? 'Truyện ngắn hiện đại' : 'Văn chính luận'}
                  </span>
                </p>
              </div>

              {/* Package Status Badges (KHBD, Slide, Exam) */}
              <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3.5 border-t border-[#EEEAE5]">
                <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EEEAE5] flex flex-col">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#706A65]">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Giáo án 5512</span>
                  </div>
                  <span className="text-[12px] font-semibold mt-1 text-emerald-700">
                    {currentLesson.khbdStatus === 'ready' ? 'Đã hoàn tất' : 'Đang soạn thảo'}
                  </span>
                </div>

                <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EEEAE5] flex flex-col">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#706A65]">
                    <Presentation className="w-3.5 h-3.5 text-[#1E40AF]" />
                    <span>Slide bài giảng</span>
                  </div>
                  <span className="text-[12px] font-semibold mt-1 text-[#1E40AF]">
                    {currentLesson.slideStatus === 'ready' ? 'Sẵn sàng dạy' : 'Bản thảo'}
                  </span>
                </div>

                <div className="bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EEEAE5] flex flex-col">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#706A65]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A2938]" />
                    <span>Đề & Ma trận</span>
                  </div>
                  <span className="text-[12px] font-semibold mt-1 text-[#7A2938]">
                    {currentLesson.examStatus === 'ready' ? 'Chuẩn hóa 7991' : 'Đang hoàn thiện'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Progress bar & Primary CTA Button */}
            <div className="pt-4 mt-4 flex items-center justify-between gap-4 border-t border-[#EEEAE5]">
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-[#F5F3F0] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#7A2938] h-full rounded-full motion-progress"
                    style={{ width: `${currentLesson.progress || 75}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#706A65] tabular-nums">
                  {currentLesson.progress || 75}% hoàn thiện
                </span>
              </div>

              <button
                onClick={() => setActiveModule('workspace')}
                className="btn-primary py-2 px-4 text-xs font-semibold whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
              >
                <span>Mở không gian soạn</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>

        {/* 6 Quick Actions (5 / 12 cols, 3x2 grid) */}
        <section className="lg:col-span-5 flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 h-full">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  className={`card-interactive p-3 text-left group flex flex-col justify-between min-h-[96px] rounded-xl motion-surface duration-[var(--motion-hover)] ${
                    qa.isPrimary ? 'border-[#ECC2C9] bg-[#FCF3F4]/60 hover:bg-[#FCF3F4]' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      qa.isPrimary 
                        ? 'bg-[#7A2938] text-white' 
                        : 'bg-[#FAF9F7] border border-[#EEEAE5] group-hover:bg-[#FCF3F4] text-[#706A65] group-hover:text-[#7A2938]'
                    }`}>
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <h3 className={`text-[12.5px] font-semibold transition-colors truncate ${
                      qa.isPrimary ? 'text-[#7A2938]' : 'text-[#211E1C] group-hover:text-[#7A2938]'
                    }`}>
                      {qa.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#706A65] line-clamp-2 mt-1 leading-snug">
                    {qa.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 3. Bottom Row: Danh mục bài dạy (Compact Table with Filter & Local Scroll) */}
      <section className="flex-1 min-h-0 flex flex-col">
        {/* Table Filter Bar (Screenshots 010, 025, 039) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-bold text-base text-[#211E1C]">
              Danh mục bài học
            </h2>
            <Badge variant="stone" size="sm">
              {lessons.length} bài
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#99918A] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tác phẩm, tác giả..."
                className="pl-8 pr-3 py-1 text-xs border border-[#E5E0DA] rounded-lg bg-white focus:outline-none focus:border-[#7A2938] w-48 text-[#302C29]"
              />
            </div>

            {/* Genre filter select */}
            <select
              value={selectedGenreFilter}
              onChange={(e) => setSelectedGenreFilter(e.target.value as any)}
              className="py-1 px-2.5 text-xs border border-[#E5E0DA] rounded-lg bg-white focus:outline-none focus:border-[#7A2938] text-[#706A65]"
            >
              <option value="all">Tất cả thể loại</option>
              <option value="poetry">Thơ trữ tình</option>
              <option value="story">Truyện ngắn</option>
              <option value="argumentative">Văn nghị luận</option>
            </select>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="card-surface divide-y divide-[#EEEAE5] rounded-xl flex-1 min-h-0 overflow-y-auto">
          {filteredLessons.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  setActiveModule('workspace');
                }}
                className={`px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF9F7] transition-colors relative ${
                  isSelected ? 'bg-[#FCF3F4]/70 font-medium' : ''
                }`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#7A2938]" />
                )}
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-xs shrink-0 bg-[#FAF9F7] border border-[#E5E0DA] text-[#706A65]">
                    {lesson.genre === 'poetry' ? 'Thơ' : lesson.genre === 'story' ? 'Tr' : 'NL'}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-sm font-semibold text-[#211E1C] truncate">
                        {lesson.title}
                      </h3>
                      {isSelected && (
                        <Badge variant="burgundy" size="sm">
                          Đang soạn
                        </Badge>
                      )}
                    </div>
                    <div className="text-[12px] text-[#706A65] flex items-center gap-2 mt-0.5">
                      <span>{lesson.author}</span>
                      <span>·</span>
                      <span>{lesson.grade} ({lesson.textbook})</span>
                      <span>·</span>
                      <span>{lesson.periods || '2 tiết'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-[#706A65]">
                    <Badge variant={lesson.khbdStatus === 'ready' ? 'emerald' : 'amber'} size="sm">
                      KHBD
                    </Badge>
                    <Badge variant={lesson.slideStatus === 'ready' ? 'blue' : 'stone'} size="sm">
                      Slide
                    </Badge>
                    <Badge variant={lesson.examStatus === 'ready' ? 'burgundy' : 'stone'} size="sm">
                      Đề 7991
                    </Badge>
                  </div>

                  <div className="w-16 bg-[#F5F3F0] h-1.5 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className="bg-[#7A2938] h-full rounded-full" 
                      style={{ width: `${lesson.progress || 70}%` }}
                    />
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#99918A] group-hover:text-[#211E1C] transition-colors" />
                </div>
              </div>
            );
          })}

          {filteredLessons.length === 0 && (
            <div className="py-8 text-center text-xs text-[#99918A] italic">
              Không tìm thấy bài học nào phù hợp với bộ lọc.
            </div>
          )}
        </div>
      </section>

      {/* 4. Modal Tạo bài dạy mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(28,25,23,0.32)] backdrop-blur-[2px] flex items-center justify-center p-4 anim-modal-backdrop">
          <div className="bg-white rounded-2xl border border-[#E5E0DA] max-w-2xl w-full p-6 shadow-[var(--shadow-lg)] space-y-4 max-h-[90vh] overflow-y-auto anim-modal-dialog">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE5]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#211E1C]">
                  Thiết lập Bài dạy Ngữ văn mới
                </h3>
                <p className="text-xs text-[#706A65] mt-0.5">
                  Tự động đồng bộ sang KHBD 5512, Slide bài giảng, Ngân hàng câu hỏi và Đề 7991
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#99918A] hover:text-[#211E1C] p-1 rounded-lg transition-colors"
                aria-label="Đóng hộp thoại"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-[#706A65] mb-1">Khối lớp</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg bg-white focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                  >
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Lớp 11">Lớp 11</option>
                    <option value="Lớp 12">Lớp 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#706A65] mb-1">Bộ sách giáo khoa</label>
                  <select
                    value={formTextbook}
                    onChange={(e) => setFormTextbook(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg bg-white focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                  >
                    <option value="Kết nối tri thức">Kết nối tri thức với cuộc sống</option>
                    <option value="Cánh diều">Cánh diều</option>
                    <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#706A65] mb-1">Thể loại</label>
                  <select
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg bg-white focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                  >
                    <option value="poetry">Thơ trữ tình</option>
                    <option value="story">Truyện ngắn hiện đại</option>
                    <option value="argumentative">Văn nghị luận</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#706A65] mb-1">
                    Tên tác phẩm / Bài học <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="VD: Tây Tiến, Vợ nhặt, Tuyên ngôn Độc lập..."
                    className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                  />
                  {formErrors.title && <p className="text-red-500 mt-1">{formErrors.title}</p>}
                </div>
                <div>
                  <label className="block font-medium text-[#706A65] mb-1">
                    Tác giả <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="VD: Quang Dũng, Kim Lân..."
                    className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                  />
                  {formErrors.author && <p className="text-red-500 mt-1">{formErrors.author}</p>}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#706A65] mb-1">Chủ đề bài học</label>
                <input
                  type="text"
                  value={formTheme}
                  onChange={(e) => setFormTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#706A65] mb-1">
                  Yêu cầu cần đạt trọng tâm (YCCĐ) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formObjectives}
                  onChange={(e) => setFormObjectives(e.target.value)}
                  rows={2}
                  placeholder="Học sinh nhận biết và phân tích được đặc trưng thể loại, hình tượng trung tâm và tư tưởng thẩm mỹ..."
                  className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                />
                {formErrors.objectives && <p className="text-red-500 mt-1">{formErrors.objectives}</p>}
              </div>

              <div>
                <label className="block font-medium text-[#706A65] mb-1">
                  Ngữ liệu tác phẩm (Trích đoạn hoặc toàn văn) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formSourceText}
                  onChange={(e) => setFormSourceText(e.target.value)}
                  rows={5}
                  placeholder="Dán toàn văn bài thơ hoặc đoạn trích truyện/nghị luận tại đây..."
                  className="w-full px-3 py-2 border border-[#E5E0DA] rounded-lg font-serif text-sm focus:outline-none focus:border-[#7A2938] text-[#211E1C]"
                />
                {formErrors.sourceText && <p className="text-red-500 mt-1">{formErrors.sourceText}</p>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EEEAE5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary py-2 px-4"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-4 font-semibold shadow-xs"
                >
                  Khởi tạo và Soạn bài ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

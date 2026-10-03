import { 
  LiteratureLesson, 
  LessonPlan5512, 
  SlideItem, 
  Exam7991Data, 
  LiteratureQuestionItem, 
  RubricData 
} from '../types';

// =========================================================================
// 1. TÁC PHẨM THƠ: "TÂY TIẾN" - QUANG DŨNG (LỚP 12)
// =========================================================================
export const tayTienLesson: LiteratureLesson = {
  id: 'lesson-tay-tien',
  title: 'Tây Tiến',
  author: 'Quang Dũng',
  authorBio: 'Quang Dũng (1921 - 1988), tên khai sinh Bùi Đình Diệm, quê làng Phượng Trì, Đan Phượng, Hà Nội. Là nghệ sĩ đa tài: làm thơ, viết văn, vẽ tranh và soạn nhạc. Hồn thơ phóng khoáng, hồn hậu, lãng mạn và tài hoa.',
  historicalContext: 'Đoàn quân Tây Tiến thành lập đầu năm 1947, gồm phần đông là thanh niên trí thức Hà Nội. Bài thơ sáng tác cuối năm 1948 tại Phù Lưu Chanh khi tác giả chuyển sang đơn vị khác, nhớ về đồng đội và chiến trường Tây Bắc.',
  genre: 'poetry',
  grade: 'Lớp 12',
  textbook: 'Kết nối tri thức',
  progress: 85,
  lastModified: '10 phút trước',
  khbdStatus: 'ready',
  slideStatus: 'ready',
  examStatus: 'ready',
  textSections: [
    {
      id: 'sec-1',
      title: 'Đoạn 1: Thiên nhiên Tây Bắc hùng vĩ, hiểm trở & chặng đường hành quân',
      content: `Sông Mã xa rồi Tây Tiến ơi!
Nhớ về rừng núi, nhớ chơi vơi.
Sài Khao sương lấp đoàn quân mỏi,
Mường Lát hoa về trong đêm hơi.

Dốc lên khúc khuỷu dốc thăm thẳm,
Heo hút cồn mây, súng ngửi trời.
Ngàn thước lên cao, ngàn thước xuống,
Nhà ai Pha Luông mưa xa khơi.

Anh bạn dãi dầu không bước nữa,
Gục lên súng mũ bỏ quên đời!
Chiều chiều oai linh thác gầm thét,
Đêm đêm Mường Hịch cọp trêu người.

Nhớ ôi Tây Tiến cơm lên khói,
Mai Châu mùa em thơm nếp xôi.`
    },
    {
      id: 'sec-2',
      title: 'Đoạn 2: Kỉ niệm đêm liên hoan ấm tình quân dân & sông nước Tây Bắc thơ mộng',
      content: `Doanh trại bừng lên hội đuốc hoa,
Kìa em xiêm áo tự bao giờ.
Khèn lên man điệu nàng e ấp,
Nhạc về Viên Chăn xây hồn thơ.

Người đi Châu Mộc chiều sương ấy,
Có thấy hồn lau nẻo bến bờ?
Có nhớ dáng người trên độc mộc,
Trôi dòng nước lũ hoa đong đưa?`
    },
    {
      id: 'sec-3',
      title: 'Đoạn 3: Bức tượng đài bi tráng về người lính Tây Tiến',
      content: `Tây Tiến đoàn binh không mọc tóc,
Quân xanh màu lá dữ oai hùm.
Mắt trừng gửi mộng qua biên giới,
Đêm mơ Hà Nội dáng kiều thơm.

Rải rác biên cương mồ viễn xứ,
Chiến trường đi chẳng tiếc đời xanh.
Áo bào thay chiếu, anh về đất,
Sông Mã gầm lên khúc độc hành.`
    },
    {
      id: 'sec-4',
      title: 'Đoạn 4: Lời thề gắn bó & khúc vĩ thanh hoài niệm',
      content: `Tây Tiến người đi không hẹn ước,
Đường lên thăm thẳm một chia phôi.
Ai lên Tây Tiến mùa xuân ấy,
Hồn về Sầm Nứa chẳng về xuôi.`
    }
  ],
  fullText: `Sông Mã xa rồi Tây Tiến ơi!
Nhớ về rừng núi, nhớ chơi vơi.
Sài Khao sương lấp đoàn quân mỏi,
Mường Lát hoa về trong đêm hơi.

Dốc lên khúc khuỷu dốc thăm thẳm,
Heo hút cồn mây, súng ngửi trời.
Ngàn thước lên cao, ngàn thước xuống,
Nhà ai Pha Luông mưa xa khơi.

Anh bạn dãi dầu không bước nữa,
Gục lên súng mũ bỏ quên đời!
Chiều chiều oai linh thác gầm thét,
Đêm đêm Mường Hịch cọp trêu người.

Nhớ ôi Tây Tiến cơm lên khói,
Mai Châu mùa em thơm nếp xôi.

Doanh trại bừng lên hội đuốc hoa,
Kìa em xiêm áo tự bao giờ.
Khèn lên man điệu nàng e ấp,
Nhạc về Viên Chăn xây hồn thơ.

Người đi Châu Mộc chiều sương ấy,
Có thấy hồn lau nẻo bến bờ?
Có nhớ dáng người trên độc mộc,
Trôi dòng nước lũ hoa đong đưa?

Tây Tiến đoàn binh không mọc tóc,
Quân xanh màu lá dữ oai hùm.
Mắt trừng gửi mộng qua biên giới,
Đêm mơ Hà Nội dáng kiều thơm.

Rải rác biên cương mồ viễn xứ,
Chiến trường đi chẳng tiếc đời xanh.
Áo bào thay chiếu, anh về đất,
Sông Mã gầm lên khúc độc hành.

Tây Tiến người đi không hẹn ước,
Đường lên thăm thẳm một chia phôi.
Ai lên Tây Tiến mùa xuân ấy,
Hồn về Sầm Nứa chẳng về xuôi.`,
  annotations: [
    {
      id: 'anno-1',
      textSnippet: 'nhớ chơi vơi',
      type: 'highlight',
      note: 'Từ láy gợi nỗi nhớ mênh mang, lơ lửng, trải rộng khắp không gian rừng núi Tây Bắc và thời gian.',
      color: 'amber',
      timestamp: 'Hôm nay'
    },
    {
      id: 'anno-2',
      textSnippet: 'súng ngửi trời',
      type: 'device',
      note: 'Nhân hóa + nghịch ngợm của người lính trí thức trẻ Hà thành; vừa khắc họa độ cao chót vót của đỉnh dốc, vừa thể hiện tâm thế lạc quan.',
      color: 'blue',
      timestamp: 'Hôm nay'
    },
    {
      id: 'anno-3',
      textSnippet: 'Đêm mơ Hà Nội dáng kiều thơm',
      type: 'annotation',
      note: 'Vẻ đẹp tâm hồn lãng mạn của thanh niên Thủ đô xếp bút nghiên lên đường đánh giặc, không làm vơi đi ý chí chiến đấu.',
      color: 'rose',
      timestamp: 'Hôm nay'
    },
    {
      id: 'anno-4',
      textSnippet: 'Chiến trường đi chẳng tiếc đời xanh',
      type: 'keyword',
      note: 'Lí tưởng cống hiến quên mình vì độc lập tự do của Tổ quốc; quyết tử cho Tổ quốc quyết sinh.',
      color: 'emerald',
      timestamp: 'Hôm nay'
    },
    {
      id: 'anno-5',
      textSnippet: 'Sông Mã gầm lên khúc độc hành',
      type: 'device',
      note: 'Nhân hóa Sông Mã tấu lên bản hùng ca tiễn đưa linh hồn liệt sĩ về cõi vĩnh hằng, mang âm hưởng sử thi tráng lệ.',
      color: 'purple',
      timestamp: 'Hôm nay'
    }
  ],
  poetryAnalysis: {
    theme: 'Cảm hứng lãng mạn và tinh thần bi tráng ca ngợi vẻ đẹp người lính Tây Tiến trên nền thiên nhiên Tây Bắc hùng vĩ, hiểm trở.',
    imagery: [
      'Sông Mã oai linh, gầm lên khúc độc hành',
      'Đỉnh dốc heo hút cồn mây, súng ngửi trời',
      'Đêm liên hoan rực rỡ hội đuốc hoa, khèn lên man điệu',
      'Người lính không mọc tóc, mắt trừng gửi mộng, áo bào thay chiếu'
    ],
    keywords: ['Sông Mã', 'nhớ chơi vơi', 'súng ngửi trời', 'hội đuốc hoa', 'dáng kiều thơm', 'đời xanh', 'áo bào', 'độc hành'],
    emotionalFlow: 'Bắt đầu từ nỗi nhớ da diết chơi vơi -> Kí ức hành quân gian khổ hiểm nguy -> Niềm vui đêm hội ấm áp tình quân dân -> Bức tượng đài bi tráng bất tử về người lính -> Lời thề tâm linh son sắt.',
    rhythmAndRhyme: 'Nhịp thơ linh hoạt 4/3, 2/2/3; phối thanh bổng - trầm độc đáo (câu nhiều thanh trắc gồ ghề xen lẫn câu toàn thanh bằng êm ả mênh mang).',
    tone: 'Hào hùng, bi tráng, thiết tha hoài niệm pha chất lãng mạn phóng khoáng.',
    rhetoricalDevices: [
      'Nhân hóa: "súng ngửi trời", "Sông Mã gầm lên khúc độc hành"',
      'Nói giảm nói tránh: "anh về đất", "không bước nữa", "bỏ quên đời"',
      'Tương phản đối lập: Ngoại hình tiều tụy (không mọc tóc, xanh màu lá) >< Khí phách lẫm liệt (dữ oai hùm, mắt trừng)',
      'Từ láy tượng hình, tượng thanh: khúc khuỷu, thăm thẳm, heo hút'
    ],
    keyVerses: [
      'Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây, súng ngửi trời',
      'Doanh trại bừng lên hội đuốc hoa / Kìa em xiêm áo tự bao giờ',
      'Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm',
      'Chiến trường đi chẳng tiếc đời xanh / Áo bào thay chiếu, anh về đất'
    ],
    contentValue: 'Khắc họa thành công tượng đài bất tử về người lính vệ quốc thời đầu kháng chiến chống Pháp: hào hoa, dũng cảm, sẵn sàng hiến dâng tuổi thanh xuân.',
    artisticValue: 'Bút pháp lãng mạn kết hợp cảm hứng bi tráng, ngôn ngữ giàu chất tạo hình và chất nhạc, nghệ thuật sử dụng từ ngữ Hán Việt đắc địa.'
  }
};

// =========================================================================
// 2. TÁC PHẨM TRUYỆN: "VỢ NHẶT" - KIM LÂN (LỚP 12)
// =========================================================================
export const voNhatLesson: LiteratureLesson = {
  id: 'lesson-vo-nhat',
  title: 'Vợ nhặt',
  author: 'Kim Lân',
  authorBio: 'Kim Lân (1920 - 2007), quê Bắc Ninh. Là cây bút truyện ngắn xuất sắc chuyên viết về nông thôn và người nông dân bằng tình cảm gắn bó máu thịt và sự am hiểu sâu sắc phong tục, tâm lí.',
  historicalContext: 'Bối cảnh nạn đói khủng khiếp năm Ất Dậu 1945 khiến hơn hai triệu đồng bào chết đói. Tiền thân là tiểu thuyết "Xóm ngụ cư", được viết lại và in trong tập "Con chó xấu xí" (1962).',
  genre: 'story',
  grade: 'Lớp 12',
  textbook: 'Kết nối tri thức',
  progress: 70,
  lastModified: '1 giờ trước',
  khbdStatus: 'ready',
  slideStatus: 'draft',
  examStatus: 'ready',
  textSections: [
    {
      id: 'vn-sec-1',
      title: 'Đoạn 1: Cảnh ngộ xóm ngụ cư ngày đói & cuộc gặp gỡ nhặt vợ',
      content: `Cái đói đã tràn đến xóm này tự lúc nào. Những gia đình từ những vùng Nam Định, Thái Bình, đội chiếu lũ lượt bồng bế, dắt díu nhau lên xanh xám như những bóng ma, và nằm ngổn ngang khắp lều chợ. Người chết như ngả rạ. Không buổi sáng nào người trong làng đi chợ, đi làm đồng không gặp ba bốn cái thây nằm còng queo bên đường.

Tràng là dân xóm ngụ cư, làm nghề kéo xe bò thuê. Giữa lúc ấy, chỉ qua mấy câu hò đùa vu vơ và bốn bát bánh đúc ngày đói, Tràng đã "nhặt" được một người vợ dẫn về xóm ngụ cư trong sự ngạc nhiên đến bàng hoàng của cả xóm nghèo.`
    },
    {
      id: 'vn-sec-2',
      title: 'Đoạn 2: Tâm trạng bà cụ Tứ khi đón nàng dâu mới',
      content: `Bà cụ Tứ nhấp nháy hai con mắt cay sè... Người mẹ nghèo hiểu ra bao nhiêu cơ sự, vừa ai oán vừa xót thương cho số kiếp đứa con mình. Chao ôi, người ta dựng vợ gả chồng cho con là lúc trong nhà ăn nên làm nổi, những mong sinh con đẻ cái mở mặt sau này. Còn mình thì... Trong kẽ mắt kèm nhèm của bà rỉ xuống hai dòng nước mắt.

Bà cụ Tứ hạ giọng dặn dò hai con: "Cốt làm sao chúng mày hòa thuận là u mừng rồi. Năm nay thì đói to đấy. Chúng mày lấy nhau lúc này, u thương quá...". Lòng người mẹ già nhen nhóm lên niềm tin vào tương lai: "Ai giàu ba họ, ai khó ba đời".`
    },
    {
      id: 'vn-sec-3',
      title: 'Đoạn 3: Bữa cơm ngày đói & hình ảnh lá cờ đỏ sao vàng',
      content: `Bữa cơm ngày đầu đón dâu thật thảm hại: giữa cái mẹt rách có một lùm rau chuối thái rối, một đĩa muối ăn với cháo loãng. Nhưng không khí lại rất đỗi ấm cúng. Bà mẹ lật đật bưng ra một cái nồi khói nghi ngút: "Chè khoán đây, ngon đáo để cơ!". Đó là nồi cháo cám chát xít và nghẹn bứ nơi cổ họng.

Bên ngoài, tiếng trống thúc thuế dồn dập vang lên. Người vợ nhặt kể chuyện trên mạn Thái Nguyên, Bắc Giang người ta không chịu đóng thuế nữa, phá kho thóc Nhật chia cho người đói. Trong óc Tràng bỗng hiện lên hình ảnh đoàn người đói ầm ầm kéo nhau đi và lá cờ đỏ sao vàng bay phấp phới.`
    }
  ],
  fullText: `Cái đói đã tràn đến xóm này tự lúc nào. Những gia đình từ những vùng Nam Định, Thái Bình, đội chiếu lũ lượt bồng bế, dắt díu nhau lên xanh xám như những bóng ma, và nằm ngổn ngang khắp lều chợ. Người chết như ngả rạ. Không buổi sáng nào người trong làng đi chợ, đi làm đồng không gặp ba bốn cái thây nằm còng queo bên đường. Mùi ẩm thối của rác rưởi và mùi tử khí thoang thoảng trong gió.

Giữa bóng tối của cái chết, Tràng đưa người đàn bà về nhà. Người trong xóm nhìn theo xì xào ngơ ngác, rồi bỗng thở phào, một nụ cười rạng rỡ nở ra trên những khuôn mặt hốc hác u tối. 

Bà cụ Tứ đón nhận nàng dâu bằng nỗi tủi cực và tình thương bao la. Bữa cơm đón dâu dù có cháo cám chát xít vẫn tràn ngập niềm hy vọng. Câu chuyện phá kho thóc và hình ảnh lá cờ đỏ sao vàng mở ra con đường đổi đời tất yếu của quần chúng lao khổ.`,
  annotations: [
    {
      id: 'vn-anno-1',
      textSnippet: 'bốn bát bánh đúc ngày đói',
      type: 'keyword',
      note: 'Chi tiết hiện thực nghiệt ngã: giá trị con người bị hạ thấp đến thê thảm, một sinh mệnh được nhặt về như cọng rác.',
      color: 'amber',
      timestamp: 'Hôm qua'
    },
    {
      id: 'vn-anno-2',
      textSnippet: 'rỉ xuống hai dòng nước mắt',
      type: 'annotation',
      note: 'Giọt nước mắt xót xa, bất lực của người mẹ già trước cảnh ngộ khốn cùng của con cái; chất chứa tình mẫu tử thiêng liêng.',
      color: 'rose',
      timestamp: 'Hôm qua'
    },
    {
      id: 'vn-anno-3',
      textSnippet: 'nồi cháo cám',
      type: 'device',
      note: 'Chi tiết nghệ thuật đa nghĩa: vừa tố cáo tội ác phát xít gây nên nạn đói, vừa chứng minh tinh thần lạc quan, đùm bọc chắt chiu của gia đình nông dân.',
      color: 'blue',
      timestamp: 'Hôm qua'
    },
    {
      id: 'vn-anno-4',
      textSnippet: 'lá cờ đỏ sao vàng bay phấp phới',
      type: 'highlight',
      note: 'Chi tiết kết thúc giàu tính biểu tượng: dự báo cuộc cách mạng đổi đời đang đến gần, thắp sáng tương lai tăm tối.',
      color: 'emerald',
      timestamp: 'Hôm qua'
    }
  ],
  storyAnalysis: {
    characters: [
      {
        name: 'Tràng',
        role: 'Nhân vật chính, người kéo xe bò thuê xóm ngụ cư',
        traits: ['Thô kệch, vụng về', 'Giàu lòng nhân hậu', 'Ý thức trách nhiệm gia đình'],
        psychologicalShift: 'Từ một gã trai nghèo vô tâm trở thành người đàn ông chín chắn, biết thương vợ, gắn bó tha thiết với mái ấm.',
        quote: 'Tràng thấy trong người êm ái lơ lửng như người vừa trong giấc mơ đi ra. Hắn thấy hắn có bổn phận phải lo lắng cho vợ con sau này.'
      },
      {
        name: 'Thị (Người vợ nhặt)',
        role: 'Nạn nhân của nạn đói được Tràng cưu mang',
        traits: ['Chao chát, đanh đá ngày đói', 'Biết điều, hiền hậu khi về làm dâu'],
        psychologicalShift: 'Cái đói làm biến dạng nhân hình và nhân tính, nhưng khi có tổ ấm, thiên tính nữ và lòng khao khát sống phục sinh kì diệu.',
        quote: 'Thị cắp cái thúng con, nón rách tàng nghiêng nghiêng che khuất nửa mặt. Tràng thấy thị ngoan ngoãn, ngượng nghịu bước đi.'
      },
      {
        name: 'Bà cụ Tứ',
        role: 'Người mẹ già nông dân Việt Nam đôn hậu',
        traits: ['Giàu đức hi sinh', 'Bao dung, thương con', 'Niềm tin mãnh liệt vào sự sống'],
        psychologicalShift: 'Ngạc nhiên -> Tủi phận, xót xa -> Mừng lòng, vun vén hy vọng cho tương lai con cái.',
        quote: 'U thương chúng mày quá... Ai giàu ba họ, ai khó ba đời.'
      }
    ],
    events: [
      'Nạn đói 1945 tràn vào xóm ngụ cư, thần chết rình rập',
      'Tràng gặp Thị ở dốc tỉnh, trêu đùa và đãi bốn bát bánh đúc',
      'Tràng đưa Thị về làng trong ánh nhìn ngạc nhiên của xóm ngụ cư',
      'Cuộc gặp gỡ cảm động giữa bà cụ Tứ và nàng dâu nhặt',
      'Buổi sáng hôm sau: diện mạo ngôi nhà thay đổi, bữa cơm cháo cám ấm áp',
      'Tiếng trống thúc thuế và hình ảnh lá cờ đỏ sao vàng báo hiệu cách mạng'
    ],
    storySituation: 'Tình huống truyện độc đáo, éo le: Nhặt vợ giữa nạn đói - thời điểm mà mạng người rẻ như cỏ rác, người ta nuôi thân không nổi lại đèo bòng lấy vợ.',
    psychologicalShift: 'Tất cả nhân vật đều chuyển biến từ bóng tối của tuyệt vọng sang ánh sáng của tình thương, niềm tin và khát vọng sống.',
    pointOfView: 'Điểm nhìn trần thuật ngôi thứ ba kết hợp điểm nhìn bên trong của Tràng và bà cụ Tứ, tạo độ sâu cảm xúc.',
    narrator: 'Người kể chuyện khách quan nhưng thấu hiểu, trân trọng vẻ đẹp tâm hồn người nông dân nghèo.',
    artisticDetails: ['Bốn bát bánh đúc', 'Giọt nước mắt bà cụ Tứ', 'Nồi cháo cám ngày cưới', 'Lá cờ đỏ sao vàng bay phấp phới'],
    themes: ['Khát vọng sống và tình người trong hoạn nạn', 'Giá trị nhân đạo sâu sắc', 'Hiện thực đau thương của dân tộc năm 1945'],
    message: 'Dù ở bờ vực cái chết, con người vẫn hướng về sự sống, hướng về tương lai và cưu mang đùm bọc lẫn nhau.'
  }
};

// =========================================================================
// 3. TÁC PHẨM VĂN NGHỊ LUẬN: "TUYÊN NGÔN ĐỘC LẬP" - HỒ CHÍ MINH (LỚP 12)
// =========================================================================
export const tuyenNgonDocLapLesson: LiteratureLesson = {
  id: 'lesson-tuyen-ngon',
  title: 'Tuyên ngôn Độc lập',
  author: 'Hồ Chí Minh',
  authorBio: 'Chủ tịch Hồ Chí Minh (1890 - 1969), Anh hùng giải phóng dân tộc, Danh nhân văn hóa thế giới. Văn chính luận của Người mẫu mực, ngắn gọn, súc tích, lập luận chặt chẽ, giàu tính chiến đấu.',
  historicalContext: 'Được Người soạn thảo tại căn nhà số 48 Hàng Ngang (Hà Nội) và đọc tại Quảng trường Ba Đình ngày 2/9/1945, khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
  genre: 'argumentative',
  grade: 'Lớp 12',
  textbook: 'Kết nối tri thức',
  progress: 95,
  lastModified: 'Hôm qua',
  khbdStatus: 'ready',
  slideStatus: 'ready',
  examStatus: 'ready',
  textSections: [
    {
      id: 'tn-sec-1',
      title: 'Phần 1: Cơ sở pháp lý và chính nghĩa quốc tế',
      content: `“Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc”.

Lời bất hủ ấy ở trong bản Tuyên ngôn Độc lập năm 1776 của nước Mỹ. Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.

Bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1791 cũng nói: “Người ta sinh ra tự do và bình đẳng về quyền lợi; và phải luôn luôn được tự do và bình đẳng về quyền lợi”. Đó là những lẽ phải không ai chối cãi được.`
    },
    {
      id: 'tn-sec-2',
      title: 'Phần 2: Cơ sở thực tiễn - Bản cáo trạng tội ác thực dân Pháp & Thắng lợi Cách mạng Tháng Tám',
      content: `Thế mà hơn tám mươi năm nay, bọn thực dân Pháp lợi dụng lá cờ tự do, bình đẳng, bác ái, đến cướp đất nước ta, áp bức đồng bào ta. Hành động của chúng trái hẳn với nhân đạo và chính nghĩa.

Về chính trị: chúng tuyệt đối không cho nhân dân ta một chút tự do dân chủ nào. Chúng thi hành những luật pháp dã man. Chúng lập ra nhà tù nhiều hơn trường học...

Về kinh tế: chúng bóc lột dân ta đến tận xương tủy, khiến cho dân ta nghèo nàn, thiếu thốn, nước ta xơ xác, tiêu điều. Mùa thu năm 1940, phát xít Nhật đến xâm lăng Đông Dương, thực dân Pháp quỳ gối đầu hàng, mở cửa rước Nhật... Trong năm năm, chúng đã bán nước ta hai lần cho Nhật.

Pháp chạy, Nhật hàng, vua Bảo Đại thoái vị. Dân ta đã đánh đổ các xiềng xích thực dân gần một trăm năm nay để gây dựng nên nước Việt Nam độc lập. Dân ta lại đánh đổ chế độ quân chủ mấy mươi thế kỷ mà lập nên chế độ Dân chủ Cộng hòa.`
    },
    {
      id: 'tn-sec-3',
      title: 'Phần 3: Lời tuyên bố độc lập & Ý chí sắt đá bảo vệ chủ quyền',
      content: `Bởi thế cho nên, chúng tôi, lâm thời Chính phủ của nước Việt Nam mới, đại biểu cho toàn dân Việt Nam, tuyên bố thoát ly hẳn quan hệ với Pháp, xóa bỏ hết các hiệp ước mà Pháp đã ký về nước Việt Nam, xóa bỏ tất cả mọi đặc quyền của Pháp trên đất nước Việt Nam.

Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!`
    }
  ],
  fullText: `“Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc”.

Lời bất hủ ấy ở trong bản Tuyên ngôn Độc lập năm 1776 của nước Mỹ. Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.

Bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1791 cũng nói: “Người ta sinh ra tự do và bình đẳng về quyền lợi; và phải luôn luôn được tự do và bình đẳng về quyền lợi”. Đó là những lẽ phải không ai chối cãi được.

Thế mà hơn tám mươi năm nay, bọn thực dân Pháp lợi dụng lá cờ tự do, bình đẳng, bác ái, đến cướp đất nước ta, áp bức đồng bào ta... Pháp chạy, Nhật hàng, vua Bảo Đại thoái vị. Dân ta đã đánh đổ các xiềng xích thực dân gần một trăm năm nay để gây dựng nên nước Việt Nam độc lập.

Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!`,
  annotations: [
    {
      id: 'tn-anno-1',
      textSnippet: 'Suy rộng ra',
      type: 'keyword',
      note: 'Bước ngoặt tư tưởng thiên tài của Hồ Chí Minh: Nâng quyền tự do cá nhân của người phương Tây thành Quyền tự do tự quyết của các dân tộc thuộc địa.',
      color: 'amber',
      timestamp: '2 ngày trước'
    },
    {
      id: 'tn-anno-2',
      textSnippet: 'Thế mà hơn tám mươi năm nay',
      type: 'device',
      note: 'Cặp từ nối tương phản đập vỡ luận điệu khai hóa giả hiệu của thực dân Pháp; mở màn bản cáo trạng đanh thép.',
      color: 'blue',
      timestamp: '2 ngày trước'
    },
    {
      id: 'tn-anno-3',
      textSnippet: 'sự thật đã thành một nước tự do, độc lập',
      type: 'highlight',
      note: 'Khẳng định độc lập không chỉ là quyền lợi trên văn bản mà là một "SỰ THẬT LỊCH SỬ" hiển nhiên được đánh đổi bằng máu xương nhân dân.',
      color: 'emerald',
      timestamp: '2 ngày trước'
    }
  ],
  argumentMap: {
    thesis: 'Khẳng định quyền tự do độc lập thiêng liêng bất khả xâm phạm của dân tộc Việt Nam và ý chí kiên cường quyết bảo vệ nền độc lập ấy.',
    claims: [
      {
        id: 'claim-1',
        title: 'Luận điểm 1: Cơ sở pháp lý và chính nghĩa quốc tế',
        reasons: [
          {
            id: 'reason-1-1',
            text: 'Trích dẫn Tuyên ngôn Độc lập Mỹ (1776) về quyền con người bất khả xâm phạm.',
            evidences: [
              {
                id: 'ev-1-1-1',
                text: 'Dùng chân lý được thế giới công nhận để tạo thế đứng chính nghĩa vững chắc.',
                quote: 'Tất cả mọi người đều sinh ra có quyền bình đẳng...'
              }
            ]
          },
          {
            id: 'reason-1-2',
            text: 'Suy rộng từ quyền con người sang quyền dân tộc tự quyết.',
            evidences: [
              {
                id: 'ev-1-1-2',
                text: 'Tất cả các dân tộc trên thế giới đều có quyền sống, quyền sung sướng và tự do.',
                quote: 'Suy rộng ra... dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.'
              }
            ]
          }
        ]
      },
      {
        id: 'claim-2',
        title: 'Luận điểm 2: Cơ sở thực tiễn (Bản cáo trạng tội ác thực dân Pháp)',
        reasons: [
          {
            id: 'reason-2-1',
            text: 'Tố cáo tội ác man rợ của Pháp về chính trị, văn hóa và kinh tế trái với tinh thần nhân đạo.',
            evidences: [
              {
                id: 'ev-2-1-1',
                text: 'Lập nhà tù nhiều hơn trường học, bóc lột tàn nhẫn dẫn đến nạn đói 1945.',
                quote: 'Lập ra nhà tù nhiều hơn trường học... làm cho hơn hai triệu đồng bào chết đói.'
              }
            ]
          },
          {
            id: 'reason-2-2',
            text: 'Vạch trần hành động phản bội: hai lần bán Đông Dương cho phát xít Nhật.',
            evidences: [
              {
                id: 'ev-2-2-1',
                text: 'Pháp không bảo hộ được Đông Dương mà còn quỳ gối đầu hàng rước Nhật.',
                quote: 'Mùa thu năm 1940, phát xít Nhật đến... Pháp quỳ gối đầu hàng mở cửa rước Nhật.'
              }
            ]
          },
          {
            id: 'reason-2-3',
            text: 'Khẳng định nhân dân Việt Nam lấy lại đất nước từ tay Nhật chứ không phải từ tay Pháp.',
            evidences: [
              {
                id: 'ev-2-3-1',
                text: 'Dân ta đứng về phe Đồng minh chống phát xít và lập nên nước Việt Nam mới.',
                quote: 'Dân ta đã lấy lại nước Việt Nam từ tay Nhật, chứ không phải từ tay Pháp.'
              }
            ]
          }
        ]
      },
      {
        id: 'claim-3',
        title: 'Luận điểm 3: Tuyên bố độc lập và quyết tâm bảo vệ nền độc lập',
        reasons: [
          {
            id: 'reason-3-1',
            text: 'Tuyên bố xóa bỏ mọi hiệp ước và đặc quyền bất hợp pháp của thực dân Pháp.',
            evidences: [
              {
                id: 'ev-3-1-1',
                text: 'Thoát ly hẳn quan hệ thực dân với Pháp.',
                quote: 'Tuyên bố thoát ly hẳn quan hệ với Pháp, xóa bỏ hết các hiệp ước...'
              }
            ]
          },
          {
            id: 'reason-3-2',
            text: 'Lời thề toàn dân giữ vững nền độc lập tự do vừa giành được.',
            evidences: [
              {
                id: 'ev-3-2-1',
                text: 'Toàn thể dân tộc quyết đem tất cả tinh thần và lực lượng giữ vững nền độc lập.',
                quote: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành...'
              }
            ]
          }
        ]
      }
    ],
    conclusion: 'Bản Tuyên ngôn là áng văn thiên cổ hùng văn, vừa có giá trị lịch sử khai sinh nước Việt Nam mới, vừa là mẫu mực tuyệt đỉnh của văn chính luận thời đại Hồ Chí Minh.'
  }
};

// =========================================================================
// 4. KẾ HOẠCH BÀI DẠY (KHBD 5512) - TÂY TIẾN
// =========================================================================
export const literatureKhbd5512: LessonPlan5512 = {
  info: {
    department: 'SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH',
    school: 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG',
    subjectGroup: 'TỔ NGỮ VĂN',
    teacherName: 'ThS. Trần Thị Thanh Tâm',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    textbook: 'Kết nối tri thức với cuộc sống',
    lessonTitle: 'TÂY TIẾN (QUANG DŨNG)',
    periods: '2 tiết (Tiết PPCT: 14 - 15)',
    academicYear: 'Năm học 2024 - 2025',
    assignedClasses: ['12 Văn', '12A1', '12A2'],
    semester: 'Học kỳ I'
  },
  objectives: {
    knowledge: [
      'Cảm nhận được vẻ đẹp hùng vĩ, hiểm trở mà thơ mộng của thiên nhiên miền Tây Bắc.',
      'Khắc sâu bức tượng đài bi tráng, hào hoa, lãng mạn của người lính Tây Tiến trong thời kỳ đầu kháng chiến chống thực dân Pháp.',
      'Nắm vững những nét đặc sắc về nghệ thuật: bút pháp lãng mạn kết hợp cảm hứng bi tráng, sự sáng tạo trong ngôn ngữ, hình ảnh, nhịp điệu và phối thanh.'
    ],
    generalCompetencies: {
      selfControl: 'Chủ động đọc hiểu văn bản theo thể loại thơ trữ tình, tìm kiếm tư liệu lịch sử về đoàn quân Tây Tiến, ghi chép phân tích trên phiếu học tập.',
      communication: 'Trình bày cảm thụ văn học mạch lạc, diễn cảm; biết lắng nghe, tranh biện và phản hồi nhận xét của bạn học trong thảo luận nhóm.',
      problemSolving: 'Phát hiện và giải mã các tầng nghĩa biểu tượng, nghệ thuật phối thanh và hình tượng người lính trong hoàn cảnh thử thách cam go.'
    },
    specializedCompetencies: [
      'Năng lực đọc hiểu văn bản văn học: Phân tích được mạch cảm xúc, hình tượng thơ, từ ngữ, biện pháp tu từ độc đáo trong bài thơ Tây Tiến.',
      'Năng lực cảm thụ & tiếp nhận: Cảm nhận được vẻ đẹp tâm hồn của thế hệ thanh niên trí thức Hà Nội xếp bút nghiên lên đường cứu nước.',
      'Năng lực tạo lập văn bản: Viết được đoạn văn nghị luận phân tích một đoạn trích thơ hoặc liên hệ lý tưởng sống của thế hệ trẻ hôm nay.'
    ],
    qualities: [
      'Yêu nước: Tự hào về truyền thống anh hùng của dân tộc, trân trọng sự hy sinh xương máu của thế hệ cha anh đi trước.',
      'Nhân ái: Đồng cảm với những gian khổ, mất mát của người chiến sĩ nơi biên cương viễn xứ.',
      'Trách nhiệm: Nhận thức rõ nghĩa vụ và lý tưởng cống hiến của bản thân đối với công cuộc xây dựng và bảo vệ Tổ quốc.'
    ]
  },
  equipment: {
    teacher: [
      'Kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT-GDTrH.',
      'Bộ Slide bài giảng Storytelling tích hợp video tư liệu hành quân Tây Bắc và bản đồ địa danh Sông Mã, Mường Lát, Pha Luông.',
      'Hệ thống Phiếu học tập số 1 (Thiên nhiên & Hành quân), Phiếu số 2 (Hình tượng người lính bi tráng).',
      'Rubric đánh giá bài viết nghị luận văn học và phiếu đánh giá nói - nghe.'
    ],
    student: [
      'Sách giáo khoa Ngữ văn 12 (Tập 1), vở ghi bài, bút màu gạch chân ngữ liệu.',
      'Bản chuẩn bị bài trước ở nhà theo hệ thống câu hỏi hướng dẫn đọc hiểu.',
      'Tranh ảnh hoặc tư liệu lịch sử về đoàn binh Tây Tiến (sưu tầm theo nhóm).'
    ]
  },
  activities: [
    {
      id: 'lit-act-1',
      name: 'Hoạt động 1: Mở đầu / Khởi động (Khơi gợi miền ký ức Tây Bắc)',
      type: 'warmup',
      time: '7 phút',
      objective: 'Tạo tâm thế hứng khởi, kích hoạt vốn hiểu biết của học sinh về vùng đất Tây Bắc và hình ảnh người lính kháng chiến chống Pháp.',
      content: 'Học sinh quan sát bản đồ chiến dịch Thượng Lào, lắng nghe giai điệu hào hùng của ca khúc "Đoàn Vệ quốc quân" và chia sẻ cảm xúc về cụm từ "Người lính cầm súng bảo vệ biên cương".',
      product: 'Câu trả lời nhanh của học sinh về ấn tượng ban đầu đối với thiên nhiên miền Tây và khí thế thanh niên thời kháng chiến.',
      method: 'Dạy học trực quan, vấn đáp gợi mở',
      tools: 'Video tư liệu, bản đồ hành quân Tây Bắc',
      steps: {
        step1: 'GV trình chiếu bản đồ chiến trường Tây Bắc và đặt câu hỏi gợi mở: Khi nhắc đến vùng đất Tây Bắc trong kháng chiến, em hình dung ra khung cảnh thiên nhiên và con người như thế nào?',
        step2: 'HS quan sát, suy ngẫm trong 1 phút và trao đổi nhanh với bạn cùng bàn.',
        step3: 'GV gọi 2 - 3 HS đại diện chia sẻ cảm nhận; các bạn khác nhận xét, bổ sung.',
        step4: 'GV tổng kết, kết nối giới thiệu bài thơ Tây Tiến của Quang Dũng - bản hùng ca hào hoa bậc nhất của thi ca kháng chiến Việt Nam.'
      }
    },
    {
      id: 'lit-act-2',
      name: 'Hoạt động 2: Hình thành kiến thức mới (Khám phá văn bản Tây Tiến)',
      type: 'knowledge',
      time: '23 phút',
      objective: 'Phân tích được bức tranh thiên nhiên Tây Bắc hiểm trở mà thơ mộng; cảm nhận tượng đài bi tráng, hào hoa của người lính Tây Tiến.',
      content: 'Lớp chia làm 4 nhóm chuyên sâu hoàn thành Phiếu học tập:\n- Nhóm 1 & 2: Đoạn 1 - Thiên nhiên Tây Bắc và chặng đường hành quân gian khổ.\n- Nhóm 3: Đoạn 2 - Kỉ niệm đêm hội ấm tình quân dân và cảnh sông nước Tây Bắc.\n- Nhóm 4: Đoạn 3 - Bức tượng đài bi tráng về người lính vệ quốc.',
      product: 'Sản phẩm Phiếu học tập / Bảng sơ đồ tư duy phân tích hình tượng thơ, chỉ rõ nghệ thuật phối thanh và các biện pháp tu từ độc đáo.',
      method: 'Dạy học hợp tác theo nhóm, kĩ thuật mảnh ghép, phân tích ngữ liệu văn bản',
      tools: 'Phiếu học tập A0, bút dạ, bảng phụ nhóm',
      steps: {
        step1: 'GV phát Phiếu học tập, giao nhiệm vụ cụ thể cho 4 nhóm chuyên gia; quy định thời gian làm việc nhóm 10 phút.',
        step2: 'Các nhóm phân công nhiệm vụ: nhóm trưởng điều phối, thư ký ghi chép; các thành viên tra cứu từ ngữ, đối chiếu ngữ liệu, thảo luận tìm ý.',
        step3: 'Đại diện nhóm 1 và nhóm 4 lên bảng treo sơ đồ, thuyết minh ngắn gọn 3 phút; các nhóm còn lại đặt câu hỏi phản biện.',
        step4: 'GV nhận xét, chuẩn hóa kiến thức trọng tâm trên Slide; khắc sâu hai phạm trù mỹ học LÃNG MẠN và BI TRÁNG xuyên suốt tác phẩm.'
      }
    },
    {
      id: 'lit-act-3',
      name: 'Hoạt động 3: Luyện tập (Củng cố đọc hiểu & Thẩm định nghệ thuật)',
      type: 'practice',
      time: '10 phút',
      objective: 'Rèn luyện kỹ năng phân tích biện pháp tu từ, giải mã các từ ngữ đặc sắc và trả lời câu hỏi đọc hiểu chuẩn định dạng đánh giá năng lực.',
      content: 'HS tham gia trò chơi giải mã "Bút tích Tây Tiến" gồm 4 câu hỏi đọc hiểu trắc nghiệm khách quan và 1 câu tự luận ngắn phân tích hiệu quả nghệ thuật của cụm từ "súng ngửi trời".',
      product: '100% học sinh chọn đáp án chính xác; viết được câu văn súc tích giải thích nét hóm hỉnh, lạc quan của người lính vệ quốc trẻ tuổi.',
      method: 'Trắc nghiệm tương tác, thực hành viết ngắn',
      tools: 'Thẻ đáp án A-B-C-D / Câu hỏi tương tác trên màn chiếu',
      steps: {
        step1: 'GV lần lượt chiếu các câu hỏi đọc hiểu, yêu cầu học sinh làm việc độc lập.',
        step2: 'HS suy nghĩ trong 45 giây mỗi câu, giơ thẻ chọn phương án hoặc ghi nhanh vào vở luyện tập.',
        step3: 'GV gọi 1 HS giải thích lý do loại trừ phương án sai; khích lệ học sinh phát biểu cảm thụ riêng.',
        step4: 'GV chốt đáp án chuẩn, đánh giá năng lực nhận diện và thông hiểu của học sinh.'
      }
    },
    {
      id: 'lit-act-4',
      name: 'Hoạt động 4: Vận dụng & Mở rộng (Chiêm nghiệm lý tưởng thế hệ trẻ)',
      type: 'application',
      time: '5 phút',
      objective: 'Kết nối giá trị tư tưởng của bài thơ với đời sống thực tiễn; khơi gợi lý tưởng sống cống hiến của thế hệ trẻ hôm nay.',
      content: 'Từ câu thơ "Chiến trường đi chẳng tiếc đời xanh", HS viết một đoạn văn ngắn (khoảng 150 chữ) bàn về trách nhiệm của thanh niên đối với đất nước trong thời bình.',
      product: 'Đoạn văn nghị luận xã hội thể hiện suy nghĩ chân thành, có lập luận và dẫn chứng thực tiễn sinh động.',
      method: 'Dạy học nêu vấn đề, viết sáng tạo',
      tools: 'Sổ tay văn học / Phiếu viết vận dụng',
      steps: {
        step1: 'GV nêu câu hỏi chiêm nghiệm kết nối: Người lính Tây Tiến đã không tiếc tuổi thanh xuân vì độc lập dân tộc. Vậy người trẻ hôm nay cần sống như thế nào để xứng đáng với sự hy sinh ấy?',
        step2: 'HS viết phác thảo nhanh các luận điểm cốt lõi trong 3 phút.',
        step3: 'GV gọi 1 đại diện đọc to đoạn văn trước lớp; cả lớp lắng nghe và cảm nhận.',
        step4: 'GV nhận xét, dặn dò học sinh hoàn thiện bài viết nộp trên hệ thống học tập LMS và chuẩn bị bài học tiếp theo.'
      }
    }
  ]
};

// =========================================================================
// 5. SLIDE BÀI GIẢNG STORYTELLING - TÂY TIẾN
// =========================================================================
export const literatureSlides: SlideItem[] = [
  {
    id: 'lit-slide-1',
    title: 'TÂY TIẾN - QUANG DŨNG',
    phaseTag: 'Khởi động',
    layout: 'single',
    contentLeft: 'Chào mừng các em học sinh đến với tuyệt phẩm thi ca kháng chiến chống Pháp! Cùng khám phá bức tượng đài bi tráng và tâm hồn hào hoa của người lính Hà thành.',
    bullets: [
      'Môn học: Ngữ văn 12 - Chương trình GDPT 2018',
      'Tác giả: Quang Dũng - Nghệ sĩ tài hoa xứ Đoài',
      'Thời lượng: 2 tiết chuyên sâu',
      'Mục tiêu trọng tâm: Cảm nhận thiên nhiên Tây Bắc và chất bi tráng lãng mạn'
    ],
    speakerNotes: 'GV mở đầu bằng giọng truyền cảm, chiếu hình ảnh người lính và bản đồ Tây Bắc để gợi không khí sử thi.'
  },
  {
    id: 'lit-slide-2',
    title: 'QUOTE ĐẶC SẮC: NỖI NHỚ CHƠI VƠI',
    phaseTag: 'Khởi động',
    layout: 'quote',
    contentLeft: 'Khởi đầu bằng một tiếng gọi tha thiết cất lên từ sâu thẳm tâm hồn người thi sĩ:',
    quoteText: 'Sông Mã xa rồi Tây Tiến ơi!\nNhớ về rừng núi, nhớ chơi vơi.\nSài Khao sương lấp đoàn quân mỏi,\nMường Lát hoa về trong đêm hơi.',
    quoteAuthor: 'Quang Dũng - Tây Tiến',
    discussionQuestion: 'Từ láy "chơi vơi" kết hợp với tiếng gọi "Tây Tiến ơi!" gợi lên trạng thái cảm xúc gì đặc biệt trong lòng người xa đơn vị?',
    speakerNotes: 'Cho học sinh ngâm thơ hoặc đọc diễn cảm 4 câu đầu; chú ý ngừng nghỉ sau dấu chấm than cảm thán.'
  },
  {
    id: 'lit-slide-3',
    title: 'THIÊN NHIÊN HIỂM TRỞ & TÂM THẾ NGƯỜI LÍNH',
    phaseTag: 'Kiến thức mới',
    layout: 'split',
    contentLeft: 'Vẻ đẹp hùng vĩ dữ dội của đèo dốc Tây Bắc được tái hiện qua nghệ thuật điêu khắc ngôn từ:\n\n• Điệp từ "dốc" kết hợp từ láy "khúc khuỷu", "thăm thẳm" diễn tả độ gập ghềnh, sâu hun hút.\n• Nghệ thuật phối thanh độc đáo: nhiều thanh trắc gắt gao tạo cảm giác dốc đứng trắc trở.',
    contentRight: 'SỨC MẠNH & KHÍ PHÁCH NGƯỜI CHIẾN SĨ:\n\n"Heo hút cồn mây, súng ngửi trời."\n\n• "Súng ngửi trời": hình ảnh nhân hóa táo bạo, vừa tả độ cao tột cùng nơi mũi súng chạm mây trời, vừa thể hiện nét hóm hỉnh, tếu táo rất thanh niên Hà Nội.\n\n"Nhà ai Pha Luông mưa xa khơi"\n• Câu thơ toàn thanh bằng như một khoảng lặng bình yên, làm dịu đi bao nhọc nhằn dốc đứng.',
    speakerNotes: 'Nhấn mạnh nghệ thuật đối lập giữa câu thơ nhiều trắc và câu thơ toàn thanh bằng để tạo nhịp thở cho bài thơ.'
  },
  {
    id: 'lit-slide-4',
    title: 'BỨC TƯỢNG ĐÀI BI TRÁNG VỀ NGƯỜI LÍNH',
    phaseTag: 'Kiến thức mới',
    layout: 'cards',
    contentLeft: 'Ba khía cạnh tạo nên tượng đài bất tử người lính Tây Tiến:',
    cards: [
      {
        title: 'NGOẠI HÌNH ĐẶC BIỆT',
        desc: '"Không mọc tóc", "quân xanh màu lá" - hiện thực sốt rét rừng tàn khốc nhưng vẫn "dữ oai hùm" đầy uy dũng của loài chúa sơn lâm.',
        icon: 'Shield'
      },
      {
        title: 'TÂM HỒN HÀO HOA',
        desc: '"Mắt trừng gửi mộng" hướng về tiền tuyến, nhưng vẫn "đêm mơ Hà Nội dáng kiều thơm" - vẻ đẹp lãng mạn thanh lịch của trí thức trẻ.',
        icon: 'Heart'
      },
      {
        title: 'LÝ TƯỞNG QUÊN MÌNH',
        desc: '"Chiến trường đi chẳng tiếc đời xanh" - coi cái chết nhẹ tựa lông hồng, sẵn sàng hiến dâng tuổi xuân cho Tổ quốc quyết sinh.',
        icon: 'Flame'
      }
    ],
    speakerNotes: 'Phân tích từ "bi tráng": BI là mất mát đau thương, TRÁNG là hào hùng tráng lệ; bi mà không lụy.'
  },
  {
    id: 'lit-slide-5',
    title: 'SƠ ĐỒ MẠCH CẢM XÚC (EMOTIONAL ARC)',
    phaseTag: 'Kiến thức mới',
    layout: 'visual_map',
    visualMapType: 'emotional_flow',
    contentLeft: 'Mạch cảm xúc bài thơ vận động theo dòng hoài niệm liên tưởng độc đáo:',
    bullets: [
      'Giai đoạn 1: Nỗi nhớ bồi hồi dâng trào (Sông Mã, núi rừng Tây Bắc)',
      'Giai đoạn 2: Trải nghiệm dốc đèo gian nan thử thách (Khúc khuỷu, súng ngửi trời)',
      'Giai đoạn 3: Ấm lòng đêm liên hoan bản làng (Hội đuốc hoa, khèn man điệu)',
      'Giai đoạn 4: Đỉnh điểm bi tráng về đồng đội ngã xuống (Áo bào thay chiếu, Sông Mã gầm)',
      'Giai đoạn 5: Lời thề non nước vĩnh cửu (Hồn về Sầm Nứa chẳng về xuôi)'
    ],
    speakerNotes: 'Dùng sơ đồ để học sinh thấy được quy luật vận động nội tâm của thi nhân Quang Dũng.'
  },
  {
    id: 'lit-slide-6',
    title: 'CÂU HỎI TƯƠNG TÁC: ĐỌC HIỂU TÂY TIẾN',
    phaseTag: 'Luyện tập',
    layout: 'quiz',
    contentLeft: 'Kiểm tra mức độ cảm thụ và phân tích nghệ thuật ngôn từ:',
    quizQuestion: {
      question: 'Cụm từ "áo bào thay chiếu" trong câu thơ "Áo bào thay chiếu anh về đất" sử dụng biện pháp nghệ thuật gì và có tác dụng như thế nào?',
      options: [
        'A. Sử dụng từ Hán Việt + nói giảm nói tránh để trang trọng hóa cái chết, làm vơi đi nỗi bi thương',
        'B. Sử dụng ẩn dụ so sánh nhằm miêu tả bộ quân phục sang trọng đắt tiền của người lính Hà Nội',
        'C. Sử dụng hoán dụ để khẳng định người lính Tây Tiến xuất thân từ tầng lớp quý tộc hoàng gia',
        'D. Sử dụng ngoa dụ phóng đại nhằm nhấn mạnh hoàn cảnh thiếu thốn không có thuốc men'
      ],
      correctIndex: 0,
      explanation: 'Thực tế người lính ngã xuống chỉ có manh chiếu đơn sơ, thậm chí không có manh chiếu. Tác giả dùng từ "áo bào" (áo của tướng soái xưa) và cách nói "về đất" nhằm bất tử hóa, trang trọng hóa sự hy sinh của các anh, mang âm hưởng sử thi tráng lệ.'
    },
    speakerNotes: 'Cho học sinh 60 giây suy ngẫm và giơ tay chọn đáp án A, B, C, D trước khi giải thích.'
  },
  {
    id: 'lit-slide-7',
    title: 'TỔNG KẾT BÀI HỌC & CHIÊM NGHIỆM',
    phaseTag: 'Tổng kết',
    layout: 'single',
    contentLeft: 'Những giá trị bất biến từ thi phẩm Tây Tiến cần khắc sâu:',
    bullets: [
      'Giá trị tư tưởng: Khúc tráng ca ngợi ca lòng yêu nước và sự hi sinh kiên cường của thế hệ thanh niên kháng chiến',
      'Giá trị nghệ thuật: Bút pháp lãng mạn hòa quyện chất bi tráng, ngôn ngữ tạo hình giàu nhạc điệu',
      'Bài học cuộc sống: Sống có lý tưởng, biết cống hiến tuổi xuân vì những giá trị cao đẹp của cộng đồng',
      'Nhiệm vụ về nhà: Học thuộc lòng bài thơ và viết đoạn văn nghị luận 200 chữ về lý tưởng thanh niên'
    ],
    speakerNotes: 'Dành 2 phút dặn dò, giao bài tập về nhà và tuyên dương tinh thần học tập tích cực của cả lớp.'
  }
];

// =========================================================================
// 6. CÂU HỎI ĐỌC HIỂU & NGHỊ LUẬN (QUESTION BUILDER)
// =========================================================================
export const literatureQuestions: LiteratureQuestionItem[] = [
  {
    id: 'q-1',
    code: 'Câu 1 (Đọc hiểu)',
    type: 'doc_hieu',
    level: 'NB',
    skill: 'Nhận diện',
    passageSnippet: 'Sông Mã xa rồi Tây Tiến ơi!\nNhớ về rừng núi, nhớ chơi vơi.\nSài Khao sương lấp đoàn quân mỏi,\nMường Lát hoa về trong đêm hơi.',
    question: 'Xác định thể thơ và phương thức biểu đạt chính của đoạn trích trên.',
    answer: '- Thể thơ: Thất ngôn (thơ 7 chữ).\n- Phương thức biểu đạt chính: Biểu cảm.',
    guide: 'Học sinh trả lời đúng mỗi ý được 0.25 điểm (tổng 0.5 điểm).',
    points: 0.5,
    linkedPart: 'partI'
  },
  {
    id: 'q-2',
    code: 'Câu 2 (Tiếng Việt)',
    type: 'tieng_viet',
    level: 'TH',
    skill: 'Phân tích',
    passageSnippet: 'Dốc lên khúc khuỷu dốc thăm thẳm,\nHeo hút cồn mây, súng ngửi trời.\nNgàn thước lên cao, ngàn thước xuống,\nNhà ai Pha Luông mưa xa khơi.',
    question: 'Chỉ ra và phân tích hiệu quả nghệ thuật của biện pháp tu từ nhân hóa trong cụm từ "súng ngửi trời".',
    answer: '- Biện pháp tu từ: Nhân hóa ("súng ngửi trời" - gán hành động ngửi cho vật vô tri).\n- Hiệu quả nghệ thuật: \n  + Vừa khắc họa độ cao chót vót của đỉnh dốc Tây Bắc (mũi súng chạm vào tầng mây).\n  + Vừa thể hiện tâm thế hiên ngang, tinh thần lạc quan, tếu táo rất đỗi trẻ trung của người lính Hà thành.',
    guide: 'Chỉ ra đúng biện pháp được 0.25 điểm; phân tích được 2 khía cạnh (độ cao hiểm trở và tinh thần lạc quan) được 0.5 điểm (tổng 0.75 điểm).',
    points: 0.75,
    linkedPart: 'partII'
  },
  {
    id: 'q-3',
    code: 'Câu 3 (Đọc hiểu nâng cao)',
    type: 'doc_hieu',
    level: 'VD',
    skill: 'Đánh giá',
    passageSnippet: 'Tây Tiến đoàn binh không mọc tóc,\nQuân xanh màu lá dữ oai hùm.\nMắt trừng gửi mộng qua biên giới,\nĐêm mơ Hà Nội dáng kiều thơm.',
    question: 'Em hiểu như thế nào về hình ảnh "Đêm mơ Hà Nội dáng kiều thơm"? Hình ảnh này có làm giảm sút ý chí chiến đấu của người lính hay không? Vì sao?',
    answer: '- "Dáng kiều thơm": Biểu tượng cho vẻ đẹp thanh lịch, kiều diễm của người con gái Hà Nội, cho quê hương yêu dấu nơi người lính gửi gắm tình yêu đầu đời.\n- Ý nghĩa: Không làm suy giảm ý chí chiến đấu, trái lại đó là điểm tựa tinh thần thiêng liêng, tiếp thêm sức mạnh để người lính cầm súng bảo vệ quê hương.',
    guide: 'Giải thích đúng ý nghĩa hình ảnh: 0.5 điểm; lý giải thuyết phục về sức mạnh tinh thần: 0.5 điểm (tổng 1.0 điểm).',
    points: 1.0,
    linkedPart: 'partIII'
  },
  {
    id: 'q-4',
    code: 'Câu 4 (Nghị luận xã hội)',
    type: 'nl_xa_hoi',
    level: 'VD',
    skill: 'Liên hệ',
    passageSnippet: 'Chiến trường đi chẳng tiếc đời xanh,\nÁo bào thay chiếu, anh về đất,\nSông Mã gầm lên khúc độc hành.',
    question: 'Từ tinh thần "chẳng tiếc đời xanh" của người lính Tây Tiến, hãy viết một đoạn văn khoảng 200 chữ bàn về ý nghĩa của lối sống có lý tưởng và tinh thần cống hiến đối với thế hệ trẻ hôm nay.',
    answer: 'Bài viết cần đảm bảo:\n- Mở đoạn: Dẫn dắt vấn đề cống hiến từ câu thơ Tây Tiến.\n- Thân đoạn: \n  + Giải thích: Sống có lý tưởng, cống hiến là gì?\n  + Bàn luận: Vì sao thanh niên cần sống cống hiến? Cống hiến mang lại giá trị gì cho bản thân và xã hội?\n  + Dẫn chứng thực tế: Thanh niên xung kích, nhà khoa học trẻ, tình nguyện viên...\n  + Phản biện: Phê phán lối sống ích kỷ, thờ ơ, ỷ lại.\n- Kết đoạn: Bài học nhận thức và hành động của bản thân.',
    guide: 'Chấm theo Rubric đánh giá đoạn văn nghị luận xã hội (2.0 điểm).',
    points: 2.0,
    linkedPart: 'partIV'
  },
  {
    id: 'q-5',
    code: 'Câu 5 (Nghị luận văn học)',
    type: 'nl_van_hoc',
    level: 'VD',
    skill: 'Sáng tạo',
    passageSnippet: 'Trích đoạn 3 bài thơ Tây Tiến:\n"Tây Tiến đoàn binh không mọc tóc...\nSông Mã gầm lên khúc độc hành."',
    question: 'Phân tích vẻ đẹp bi tráng và lãng mạn của hình tượng người lính Tây Tiến trong đoạn 3 bài thơ. Từ đó, nhận xét về phong cách thơ tài hoa, phóng khoáng của thi sĩ Quang Dũng.',
    answer: 'Yêu cầu phân tích trọn vẹn:\n1. Mở bài: Giới thiệu tác giả Quang Dũng, bài thơ Tây Tiến và vị trí đoạn thơ.\n2. Thân bài: \n   - Phân tích vẻ đẹp bi tráng: ngoại hình tiều tụy vì sốt rét rừng nhưng khí phách dữ dội oai nghiêm; sự hy sinh bi thương nhưng thanh thản bất tử ("áo bào thay chiếu anh về đất").\n   - Phân tích vẻ đẹp lãng mạn: giấc mơ hào hoa về Hà Nội, lý tưởng hiến dâng thanh xuân ("chẳng tiếc đời xanh").\n   - Nhận xét phong cách thơ Quang Dũng: tài hoa, giàu nhạc điệu và hội họa, ngôn ngữ Hán Việt cổ kính bi hùng.\n3. Kết bài: Khái quát giá trị đoạn trích và bài học nhân sinh.',
    guide: 'Chấm theo khung Rubric bài văn nghị luận văn học chuẩn GDPT 2018 (4.0 điểm).',
    points: 4.0,
    linkedPart: 'partIV'
  }
];

// =========================================================================
// 7. BỘ RUBRIC CHẤM BÀI NGHỊ LUẬN VĂN HỌC & XÃ HỘI
// =========================================================================
export const literatureRubric: RubricData = {
  id: 'rubric-nlvh',
  title: 'Rubric Chấm Điểm Bài Viết Nghị Luận Văn Học (Thang Điểm 10.0)',
  essayType: 'nl_van_hoc',
  totalPoints: 10.0,
  criteria: [
    {
      id: 'crit-1',
      name: 'Xác định vấn đề nghị luận',
      weight: 10,
      maxPoints: 1.0,
      description: 'Xác định đúng trọng tâm yêu cầu đề bài (hình tượng người lính Tây Tiến & phong cách Quang Dũng).',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Xác định chính xác, mở bài ấn tượng, nêu bật được bản chất vấn đề và định hướng mạch triển khai.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Xác định được vấn đề nghị luận, mở bài đúng nhưng diễn đạt còn công thức.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Xác định chưa rõ hoặc lệch một phần trọng tâm đề bài.' }
      ]
    },
    {
      id: 'crit-2',
      name: 'Bố cục & Cấu trúc bài viết',
      weight: 10,
      maxPoints: 1.0,
      description: 'Bố cục 3 phần rõ ràng, chuyển ý mượt mà, phân chia đoạn văn hợp logic.',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Bố cục chặt chẽ, mở - thân - kết hài hòa, liên kết câu và đoạn tự nhiên, uyển chuyển.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Đủ 3 phần nhưng chuyển ý còn khô cứng, đôi chỗ ngắt đoạn chưa hợp lý.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Thiếu phần kết hoặc các đoạn rời rạc, thiếu tính liên kết văn bản.' }
      ]
    },
    {
      id: 'crit-3',
      name: 'Luận điểm & Lập luận',
      weight: 25,
      maxPoints: 2.5,
      description: 'Hệ thống luận điểm sáng rõ, mạch lạc; phân định rõ vẻ đẹp bi tráng và vẻ đẹp lãng mạn.',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Luận điểm toàn diện, lập luận sắc sảo, chiều sâu tư duy cao, lý lẽ thuyết phục tuyệt đối.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Có đủ luận điểm cơ bản, lập luận tương đối vững nhưng chưa đào sâu khía cạnh độc đáo.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Luận điểm sơ sài, lặp ý hoặc diễn xuôi thơ mà không lập luận.' }
      ]
    },
    {
      id: 'crit-4',
      name: 'Dẫn chứng & Phân tích nghệ thuật',
      weight: 25,
      maxPoints: 2.5,
      description: 'Khai thác dẫn chứng thơ đắc địa; phân tích sâu từ ngữ, hình ảnh, nhịp điệu, biện pháp tu từ.',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Chọn dẫn chứng tinh tế, phân tích tỉ mỉ chi tiết nghệ thuật (nhân hóa, phối thanh, Hán Việt), cảm thụ sâu sắc.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Có trích dẫn chứng và phân tích, nhưng còn dừng lại ở mức kể lại hoặc phân tích bề mặt.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Dẫn chứng thiếu chính xác, trích thơ sai hoặc bỏ qua đặc trưng thể loại thơ.' }
      ]
    },
    {
      id: 'crit-5',
      name: 'Diễn đạt, Dùng từ & Ngữ pháp',
      weight: 15,
      maxPoints: 1.5,
      description: 'Vốn từ văn học phong phú, hành văn trong sáng, giàu cảm xúc, không mắc lỗi chính tả.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Hành văn truyền cảm, vốn từ ngữ dồi dào, câu văn giàu hình ảnh và nhịp điệu, tuyệt đối không sai chính tả.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Diễn đạt rõ ý, còn vài lỗi diễn đạt nhỏ hoặc lặp từ không đáng kể.' },
        { label: 'Cần cố gắng', score: 0.5, descriptor: 'Câu văn què cụt, sai nhiều lỗi chính tả hoặc dùng từ sai ngữ cảnh.' }
      ]
    },
    {
      id: 'crit-6',
      name: 'Sáng tạo & Đánh giá mở rộng',
      weight: 15,
      maxPoints: 1.5,
      description: 'Có phát hiện mới mẻ, liên hệ so sánh với các tác phẩm cùng đề tài (Đồng chí, Bài thơ về tiểu đội xe không kính), liên hệ thực tiễn.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Có góc nhìn độc đáo, so sánh văn học sâu sắc, liên hệ thực tế giàu sức gợi và tính nhân văn cao.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Có liên hệ mở rộng nhưng còn đơn giản hoặc mang tính liệt kê.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Chưa có ý thức liên hệ so sánh hoặc liên hệ gượng ép.' }
      ]
    }
  ]
};

// =========================================================================
// 8. ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH (NGỮ VĂN)
// =========================================================================
export const literatureExam7991: Exam7991Data = {
  examHeader: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KỲ HỌC KỲ I - NGỮ VĂN 12',
    duration: '90 phút (Không kể thời gian phát đề)',
    examCode: 'MÃ ĐỀ: 301'
  },
  passageRef: `ĐỌC NGỮ LIỆU SAU VÀ THỰC HIỆN CÁC YÊU CẦU:
"Tây Tiến đoàn binh không mọc tóc,
Quân xanh màu lá dữ oai hùm.
Mắt trừng gửi mộng qua biên giới,
Đêm mơ Hà Nội dáng kiều thơm.

Rải rác biên cương mồ viễn xứ,
Chiến trường đi chẳng tiếc đời xanh.
Áo bào thay chiếu, anh về đất,
Sông Mã gầm lên khúc độc hành."
(Trích "Tây Tiến" - Quang Dũng, SGK Ngữ văn 12)`,
  partI: [
    {
      id: 'lp1-1',
      code: 'Câu 1',
      level: 'NB',
      question: 'Bài thơ "Tây Tiến" của tác giả Quang Dũng được sáng tác theo thể thơ nào?',
      options: {
        A: 'Thơ bảy chữ (thất ngôn)',
        B: 'Thơ tự do',
        C: 'Thơ lục bát',
        D: 'Thơ tám chữ'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Bài thơ được sáng tác theo thể thơ 7 chữ (thất ngôn) biến hóa linh hoạt.'
    },
    {
      id: 'lp1-2',
      code: 'Câu 2',
      level: 'NB',
      question: 'Từ ngữ nào sau đây thể hiện nỗi nhớ mênh mang, da diết mở đầu bài thơ Tây Tiến?',
      options: {
        A: 'Nhớ chơi vơi',
        B: 'Nhớ da diết',
        C: 'Nhớ khôn nguôi',
        D: 'Nhớ quặn thắt'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: '"Nhớ chơi vơi" là sáng tạo ngôn từ độc đáo của Quang Dũng gợi nỗi nhớ lơ lửng, bao la.'
    },
    {
      id: 'lp1-3',
      code: 'Câu 3',
      level: 'NB',
      question: 'Hình ảnh "không mọc tóc" và "quân xanh màu lá" phản ánh điều gì trong thực tế chiến trường?',
      options: {
        A: 'Hậu quả khắc nghiệt của những cơn sốt rét rừng nơi biên ải Tây Bắc',
        B: 'Quy định cạo trọc đầu đồng loạt của đoàn binh quân đội',
        C: 'Chiến thuật ngụy trang hòa mình vào cây cối của quân ta',
        D: 'Căn bệnh truyền nhiễm bẩm sinh của thanh niên Hà thành'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Hiện thực nghiệt ngã của những cơn sốt rét rừng làm người lính rụng hết tóc, da xanh xao.'
    },
    {
      id: 'lp1-4',
      code: 'Câu 4',
      level: 'NB',
      question: 'Cụm từ "áo bào thay chiếu" sử dụng biện pháp nghệ thuật nào dưới đây?',
      options: {
        A: 'Nói giảm nói tránh và dùng từ Hán Việt trang trọng hóa',
        B: 'Nói quá phóng đại sự giàu sang của đoàn binh',
        C: 'So sánh ngầm không kèm từ ngữ so sánh',
        D: 'Nhân hóa đất mẹ đón nhận anh về'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: '"Áo bào" (áo tướng thời xưa) kết hợp nói giảm nói tránh bất tử hóa cái chết của người lính.'
    },
    {
      id: 'lp1-5',
      code: 'Câu 5',
      level: 'NB',
      question: 'Trong câu thơ "Đêm mơ Hà Nội dáng kiều thơm", "dáng kiều thơm" tượng trưng cho điều gì?',
      options: {
        A: 'Hình bóng người thiếu nữ Hà thành thanh lịch, điểm tựa tình yêu lãng mạn',
        B: 'Những loài hoa thơm ngát đặc trưng của phố cổ Hà Nội',
        C: 'Hương thơm của món cốm làng Vòng và ẩm thực Hà thành',
        D: 'Hình bóng người mẹ già đang ngồi chờ con bên bếp lửa'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Dáng kiều thơm là hình bóng thiếu nữ Hà Nội kiều diễm trong mộng ước người lính trẻ.'
    },
    {
      id: 'lp1-6',
      code: 'Câu 6',
      level: 'NB',
      question: 'Dòng sông nào gắn bó như một nhân chứng lịch sử xuyên suốt tác phẩm Tây Tiến?',
      options: {
        A: 'Sông Mã',
        B: 'Sông Đà',
        C: 'Sông Hồng',
        D: 'Sông Hương'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Sông Mã là dòng sông chứng kiến trọn vẹn chặng đường chiến đấu và hy sinh của đoàn quân.'
    },
    {
      id: 'lp1-7',
      code: 'Câu 7',
      level: 'NB',
      question: 'Hai câu thơ "Nhà ai Pha Luông mưa xa khơi" có đặc điểm ngữ âm nổi bật nào?',
      options: {
        A: 'Toàn bộ 7 tiếng đều mang thanh bằng (bình thanh)',
        B: 'Toàn bộ 7 tiếng đều mang thanh trắc gồ ghề',
        C: 'Gieo vần trắc ở cuối câu thơ thứ bảy',
        D: 'Ngắt nhịp lẻ 3/4 tạo cảm giác đứt gãy'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Cả 7 tiếng trong câu đều là thanh bằng, tạo cảm giác êm đềm, mênh mang như mưa giăng.'
    },
    {
      id: 'lp1-8',
      code: 'Câu 8',
      level: 'NB',
      question: 'Cảm hứng chủ đạo bao trùm bài thơ Tây Tiến là gì?',
      options: {
        A: 'Cảm hứng lãng mạn kết hợp tinh thần bi tráng',
        B: 'Cảm hứng châm biếm đả kích hiện thực phong kiến',
        C: 'Cảm hứng đồng quê thuần hậu chất phác',
        D: 'Cảm hứng bi quan tuyệt vọng trước sự hy sinh'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Cảm hứng lãng mạn và tinh thần bi tráng là nét thẩm mỹ chủ đạo của thi phẩm.'
    },
    {
      id: 'lp1-9',
      code: 'Câu 9',
      level: 'TH',
      question: 'Vì sao Quang Dũng lại viết "chiến trường đi chẳng tiếc đời xanh" thay vì tiếc nuối tuổi trẻ?',
      options: {
        A: 'Vì người lính mang lý tưởng cao đẹp: quyết tử cho Tổ quốc quyết sinh',
        B: 'Vì người lính chán nản cuộc sống nơi đô thị ngột ngạt',
        C: 'Vì người lính tin rằng chiến trường rất dễ lập chiến công',
        D: 'Vì người lính bị bắt buộc tòng quân không thể thoái thác'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Thể hiện lý tưởng cống hiến quên mình vì độc lập, coi sự hy sinh nhẹ tựa lông hồng.'
    },
    {
      id: 'lp1-10',
      code: 'Câu 10',
      level: 'TH',
      question: 'Cụm từ "dữ oai hùm" trong câu thơ "Quân xanh màu lá dữ oai hùm" có ý nghĩa gì đối với hình ảnh người lính?',
      options: {
        A: 'Làm toát lên khí phách dũng mãnh, áp đảo kẻ thù bất chấp gian khổ bệnh tật',
        B: 'Khuyên người lính phải hung dữ dữ tợn với dân bản địa',
        C: 'Mô tả người lính săn bắt hổ dữ trong rừng sâu Tây Bắc',
        D: 'Thể hiện sự hoảng sợ của người lính trước thú dữ miền Tây'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tương phản giữa ngoại hình ốm yếu và khí phách kiên cường, dũng mãnh như chúa sơn lâm.'
    },
    {
      id: 'lp1-11',
      code: 'Câu 11',
      level: 'TH',
      question: 'Hình ảnh "Sông Mã gầm lên khúc độc hành" ở cuối đoạn thơ gợi cảm xúc gì?',
      options: {
        A: 'Tiếng thét bi tráng, thiêng liêng của thiên nhiên tấu khúc tráng ca vĩnh biệt người lính',
        B: 'Sự tức giận của dòng sông vì nước lũ tràn về làm ngập lúa',
        C: 'Nỗi cô đơn tuyệt vọng không lối thoát của dòng sông Tây Bắc',
        D: 'Tiếng kêu cứu thất thanh của những người dân chèo thuyền'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Sông Mã được nhân hóa tấu lên bản hùng ca tiễn đưa linh hồn liệt sĩ về cõi vĩnh hằng.'
    },
    {
      id: 'lp1-12',
      code: 'Câu 12',
      level: 'TH',
      question: 'Nét đặc sắc nhất trong phong cách thơ Quang Dũng thể hiện qua bài thơ là gì?',
      options: {
        A: 'Sự kết hợp nhuần nhuyễn giữa thi họa - thi nhạc, chất hào hoa và chất bi tráng',
        B: 'Sử dụng ngôn ngữ mộc mạc dân dã của tầng lớp bình dân',
        C: 'Khuynh hướng hiện thực chủ nghĩa nghiêm ngặt từng chi tiết nhỏ',
        D: 'Giọng thơ triết lý sâu sắc, thiên về chiêm nghiệm tôn giáo'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Chất tài hoa, lãng mạn, kết hợp hội họa, âm nhạc và khí phách hào hùng thời đại.'
    }
  ],
  partII: [
    {
      id: 'lp2-1',
      code: 'Câu 1 (Đúng/Sai)',
      level: 'TH',
      stem: 'Đọc đoạn thơ: "Doanh trại bừng lên hội đuốc hoa... Trôi dòng nước lũ hoa đong đưa". Xác định tính Đúng / Sai của các nhận định sau về giá trị nội dung và nghệ thuật của đoạn trích:',
      statements: [
        {
          subId: 'a',
          text: 'Hình ảnh "hội đuốc hoa" gợi không khí ấm áp, rực rỡ và lãng mạn của đêm liên hoan thắm tình quân dân.',
          isCorrect: true,
          explanation: '"Hội đuốc hoa" vừa tả ánh đuốc bập bùng, vừa gợi không khí đêm tân hôn rạng ngời hạnh phúc.'
        },
        {
          subId: 'b',
          text: 'Từ "kìa em" thể hiện thái độ chế giễu ngạc nhiên trước trang phục kì dị của các cô gái miền sơn cước.',
          isCorrect: false,
          explanation: '"Kìa em" là tiếng reo ngỡ ngàng, say đắm và trân trọng vẻ đẹp duyên dáng của thiếu nữ Mường, Thái.'
        },
        {
          subId: 'c',
          text: 'Cụm từ "hồn lau nẻo bến bờ" cho thấy cảnh vật thiên nhiên Tây Bắc chìm trong hoang vu, rùng rợn và chết chóc.',
          isCorrect: false,
          explanation: '"Hồn lau" gợi vẻ đẹp hư ảo, thi vị, có linh hồn của cỏ cây sông nước Tây Bắc trong chiều sương buông.'
        },
        {
          subId: 'd',
          text: 'Bút pháp miêu tả trong đoạn thơ thiên về cảm hứng lãng mạn, giàu chất nhạc và chất họa.',
          isCorrect: true,
          explanation: 'Đoạn thơ thể hiện trọn vẹn nét tài hoa của thi sĩ Quang Dũng: thơ giàu họa và nhạc.'
        }
      ],
      points: 1.0
    },
    {
      id: 'lp2-2',
      code: 'Câu 2 (Đúng/Sai)',
      level: 'VD',
      stem: 'Đọc đoạn thơ: "Tây Tiến đoàn binh không mọc tóc... Sông Mã gầm lên khúc độc hành". Xác định tính Đúng / Sai của các nhận định sau về vẻ đẹp hình tượng người lính Tây Tiến:',
      statements: [
        {
          subId: 'a',
          text: 'Tác giả miêu tả người lính "không mọc tóc", "quân xanh màu lá" nhằm mục đích bi kịch hóa cuộc chiến tranh.',
          isCorrect: false,
          explanation: 'Tác giả nhìn thẳng vào hiện thực khốc liệt nhưng không bi kịch hóa, bởi ngay sau đó là "dữ oai hùm" kiêu hãnh.'
        },
        {
          subId: 'b',
          text: 'Sự hy sinh của người chiến sĩ được tái hiện qua các từ ngữ "về đất", "áo bào thay chiếu" nhằm bất tử hóa và giảm bớt đau thương.',
          isCorrect: true,
          explanation: 'Cách nói giảm nói tránh "về đất" kết hợp từ ngữ trang trọng "áo bào" mang lại vẻ đẹp thiêng liêng.'
        },
        {
          subId: 'c',
          text: 'Nỗi nhớ "dáng kiều thơm" của người lính bị xem là biểu hiện của tư tưởng tiểu tư sản yếu đuối cần phê phán.',
          isCorrect: false,
          explanation: 'Đó là vẻ đẹp nhân bản, chứng minh tâm hồn trong trẻo, giàu tình yêu cuộc sống của người lính trí thức.'
        },
        {
          subId: 'd',
          text: 'Câu thơ "Chiến trường đi chẳng tiếc đời xanh" thể hiện tuyên ngôn lý tưởng sống cao đẹp của thế hệ thanh niên kháng chiến.',
          isCorrect: true,
          explanation: 'Khẳng định tinh thần tự nguyện hiến dâng thanh xuân vì nền độc lập tự do của Tổ quốc.'
        }
      ],
      points: 1.0
    }
  ],
  partIII: [
    {
      id: 'lp3-1',
      code: 'Câu 1',
      level: 'TH',
      question: 'Chỉ ra tên địa danh được tác giả Quang Dũng nhắc đến trong câu thơ "Mai Châu mùa em thơm nếp xôi".',
      correctAnswer: 'Mai Châu',
      points: 0.5,
      explanation: 'Mai Châu (thuộc tỉnh Hòa Bình) là địa danh nổi tiếng với thung lũng êm đềm và hương vị xôi nếp thơm nồng ấm tình quân dân.'
    },
    {
      id: 'lp3-2',
      code: 'Câu 2',
      level: 'TH',
      question: 'Từ ngữ nào trong câu "Sài Khao sương lấp đoàn quân mỏi" gợi tả sự vất vả, gian lao của đoàn binh trên đường hành quân?',
      correctAnswer: 'mỏi (hoặc đoàn quân mỏi)',
      points: 0.5,
      explanation: 'Từ "mỏi" diễn tả trạng thái thể xác rã rời sau những dốc đèo Tây Bắc khắc nghiệt nhưng tinh thần vẫn không lùi bước.'
    },
    {
      id: 'lp3-3',
      code: 'Câu 3',
      level: 'VD',
      question: 'Ghi lại cụm từ gồm 3 tiếng mang tính sáng tạo nhân hóa cao nhất của Quang Dũng để miêu tả độ cao của dốc núi Tây Bắc.',
      correctAnswer: 'súng ngửi trời',
      points: 0.5,
      explanation: '"Súng ngửi trời" là cụm từ 3 tiếng nhân hóa độc đáo, vừa tả độ cao tột cùng vừa thể hiện chất tếu táo của người lính trẻ.'
    },
    {
      id: 'lp3-4',
      code: 'Câu 4',
      level: 'VD',
      question: 'Khái niệm thẩm mỹ đối lập nào được kết hợp nhuần nhuyễn tạo nên phong cách độc đáo của bài thơ Tây Tiến? (Trả lời ngắn gồm 2 cụm từ nối với nhau bằng dấu gạch ngang hoặc liên từ)',
      correctAnswer: 'Lãng mạn - Bi tráng (hoặc Bi tráng và lãng mạn)',
      points: 0.5,
      explanation: 'Bút pháp Lãng mạn kết hợp cảm hứng Bi tráng là hạt nhân cốt lõi định hình giá trị nghệ thuật của kiệt tác Tây Tiến.'
    }
  ],
  partIV: [
    {
      id: 'lp4-1',
      code: 'Câu 1 (Tự luận - Nghị luận văn học)',
      level: 'VD',
      question: 'Cảm nhận của anh/chị về vẻ đẹp bi tráng của bức tượng đài người lính Tây Tiến qua 8 câu thơ:\n"Tây Tiến đoàn binh không mọc tóc...\nSông Mã gầm lên khúc độc hành."\nTừ đó, nhận xét ngắn gọn về thái độ, tình cảm của tác giả Quang Dũng đối với đồng đội của mình.',
      rubric: [
        {
          step: '1. Đảm bảo cấu trúc bài văn nghị luận (Mở bài, Thân bài, Kết bài); xác định đúng vấn đề nghị luận.',
          points: 0.5
        },
        {
          step: '2. Phân tích hiện thực khốc liệt và diện mạo người lính: "không mọc tóc", "quân xanh màu lá" đối lập với khí phách "dữ oai hùm" kiên cường.',
          points: 0.75
        },
        {
          step: '3. Phân tích tâm hồn hào hoa và lý tưởng sống quên mình: mộng lập công ("mắt trừng"), mộng tình yêu lãng mạn ("dáng kiều thơm"); tinh thần "chẳng tiếc đời xanh".',
          points: 0.75
        },
        {
          step: '4. Phân tích sự hy sinh và khúc tráng ca bất tử: "áo bào thay chiếu anh về đất", "Sông Mã gầm lên khúc độc hành". Nghệ thuật dùng từ Hán Việt và âm hưởng sử thi.',
          points: 0.5
        },
        {
          step: '5. Nhận xét thái độ của tác giả: Tình yêu thương máu thịt, sự trân trọng và niềm tự hào vô bờ bến đối với đồng đội. Sáng tạo, diễn đạt mượt mà, không mắc lỗi chính tả.',
          points: 0.5
        }
      ],
      points: 3.0
    }
  ]
};

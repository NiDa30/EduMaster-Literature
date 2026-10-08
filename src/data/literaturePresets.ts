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

// =========================================================================
// 9. KẾ HOẠCH BÀI DẠY (KHBD 5512) - VỢ NHẶT (KIM LÂN)
// =========================================================================
export const voNhatKhbd5512: LessonPlan5512 = {
  info: {
    department: 'SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH',
    school: 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG',
    subjectGroup: 'TỔ NGỮ VĂN',
    teacherName: 'ThS. Trần Thị Thanh Tâm',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    textbook: 'Kết nối tri thức với cuộc sống',
    lessonTitle: 'VỢ NHẶT (KIM LÂN)',
    periods: '3 tiết (Tiết PPCT: 16 - 18)',
    academicYear: 'Năm học 2024 - 2025',
    assignedClasses: ['12 Văn', '12A1', '12A2'],
    semester: 'Học kỳ I'
  },
  objectives: {
    knowledge: [
      'Hiểu được tình cảnh bi thảm của nhân dân trong nạn đói năm 1945 và số phận của người nông dân nghèo.',
      'Phân tích được tình huống truyện độc đáo, éo le; sự phát triển tính cách và tâm lí các nhân vật Tràng, Thị, bà cụ Tứ.',
      'Khám phá chiều sâu giá trị nhân đạo của tác phẩm: dù cận kề cái chết, con người vẫn hướng về sự sống, khát khao tổ ấm gia đình và tin tưởng vào tương lai đổi đời.'
    ],
    generalCompetencies: {
      selfControl: 'Chủ động tìm kiếm tài liệu lịch sử về nạn đói Ất Dậu 1945, đọc kĩ văn bản truyện ngắn và trả lời phiếu học tập.',
      communication: 'Biết lắng nghe, thảo luận nhóm để làm sáng tỏ ý nghĩa chi tiết nghệ thuật (bốn bát bánh đúc, nồi cháo cám, lá cờ đỏ).',
      problemSolving: 'Phát hiện sự biến đổi tâm lý nhân vật từ tâm thế tuyệt vọng sang niềm vui sống và trách nhiệm gia đình.'
    },
    specializedCompetencies: [
      'Năng lực đọc hiểu văn bản truyện: Phân tích được người kể chuyện, điểm nhìn trần thuật (bên ngoài và bên trong), lời người kể và lời nhân vật.',
      'Năng lực cảm thụ văn học: Nhận diện và rung cảm trước vẻ đẹp tình người, tình mẫu tử thiêng liêng giữa nghịch cảnh tăm tối.',
      'Năng lực tạo lập văn bản: Viết được bài nghị luận phân tích nhân vật văn học hoặc đoạn văn suy nghĩ về giá trị của tình thương.'
    ],
    qualities: [
      'Nhân ái: Biết thấu hiểu, cảm thông với nỗi khổ đau của đồng loại; trân trọng tình cảm gia đình và tình làng nghĩa xóm.',
      'Trách nhiệm: Nhận thức được bổn phận của bản thân đối với gia đình và xã hội trong mọi hoàn cảnh đời sống.',
      'Lạc quan: Luôn giữ niềm tin vào tương lai tươi sáng và khát vọng sống cao đẹp.'
    ]
  },
  equipment: {
    teacher: [
      'Giáo án điện tử chuẩn Công văn 5512/BGDĐT-GDTrH.',
      'Tư liệu hình ảnh, video về nạn đói 1945 (tư liệu ảnh Võ An Ninh).',
      'Phiếu học tập số 1 (Tình huống truyện & tâm trạng Tràng), Phiếu số 2 (Bà cụ Tứ & bữa cơm ngày đói).',
      'Rubric chấm bài nghị luận văn học và phiếu đánh giá hoạt động nhóm.'
    ],
    student: [
      'Sách giáo khoa Ngữ văn 12 tập 1, vở ghi bài.',
      'Bài chuẩn bị ở nhà theo câu hỏi gợi ý trong SGK.',
      'Bảng phụ và bút dạ cho hoạt động thảo luận nhóm.'
    ]
  },
  activities: [
    {
      id: 'vn-act-1',
      name: 'Hoạt động 1: Khởi động (Ký ức lịch sử & Nạn đói 1945)',
      type: 'warmup',
      time: '7 phút',
      objective: 'Tạo tâm thế và kết nối học sinh vào bối cảnh lịch sử của truyện ngắn Vợ nhặt.',
      content: 'Quan sát tranh ảnh tư liệu nạn đói Ất Dậu 1945 của nghệ sĩ Võ An Ninh, ghép nối tác giả Kim Lân với phong cách nghệ thuật "nhà văn một lòng đi về với đất, với người, với thuần hậu nguyên thủy của nông thôn".',
      product: 'Câu trả lời của HS về cảm nhận bức tranh nạn đói và nhận biết tác giả Kim Lân.',
      method: 'Dạy học trực quan, trò chơi ghép nối',
      tools: 'Màn chiếu tư liệu ảnh 1945, thẻ bài tác giả - tác phẩm',
      steps: {
        step1: 'GV trình chiếu bộ ảnh nạn đói 1945 của Võ An Ninh, yêu cầu HS chia sẻ ấn tượng đầu tiên về gam màu cuộc sống lúc bấy giờ.',
        step2: 'HS quan sát, suy nghĩ độc lập trong 1 phút và thảo luận nhanh với bạn cùng bàn.',
        step3: 'GV gọi 2 HS phát biểu cảm nhận; kết hợp đặt câu hỏi về tác giả Kim Lân.',
        step4: 'GV chuẩn hóa thông tin: Kim Lân viết Vợ nhặt không chỉ để miêu tả cái đói mà cốt nhất là để làm sáng lên khát vọng sống và tình người của nhân dân.'
      }
    },
    {
      id: 'vn-act-2',
      name: 'Hoạt động 2: Hình thành kiến thức (Khám phá thế giới nghệ thuật Vợ nhặt)',
      type: 'knowledge',
      time: '25 phút',
      objective: 'Phân tích được tình huống nhặt vợ độc đáo; sự chuyển biến tâm trạng của Tràng, Thị và bà cụ Tứ; các chi tiết nghệ thuật đắt giá.',
      content: 'Tổ chức thảo luận theo 3 trạm chuyên gia:\n- Trạm 1: Bức tranh xóm ngụ cư và tình huống nhặt vợ lạ lùng (4 bát bánh đúc).\n- Trạm 2: Nhân vật Tràng và người vợ nhặt - sự hồi sinh kì diệu của tình người.\n- Trạm 3: Nhân vật bà cụ Tứ và bữa cơm đón dâu với nồi cháo cám chát xít.',
      product: 'Sơ đồ tư duy / Phiếu học tập hoàn chỉnh của 3 nhóm trạm; các nhận định sâu sắc về diễn biến tâm lý nhân vật.',
      method: 'Dạy học hợp tác nhóm, dạy học theo trạm, phân tích ngữ liệu',
      tools: 'Phiếu học tập A0, bút dạ, bảng tương tác',
      steps: {
        step1: 'GV chia lớp thành 3 nhóm trạm, giao nhiệm vụ và phát phiếu học tập; quy định thời gian thảo luận 12 phút.',
        step2: 'Các nhóm phân công nhóm trưởng, thư ký; cùng đọc ngữ liệu trích dẫn, trao đổi và điền kết quả vào phiếu.',
        step3: 'Đại diện từng nhóm báo cáo tóm tắt trong 3 phút; các nhóm còn lại đặt câu hỏi chất vấn và bổ sung.',
        step4: 'GV nhận xét, chính xác hóa kiến thức, làm nổi bật thông điệp: "Dù kề bên cái chết, người ta vẫn khát khao hạnh phúc và tin vào ngày mai".'
      }
    },
    {
      id: 'vn-act-3',
      name: 'Hoạt động 3: Luyện tập (Củng cố đọc hiểu qua câu hỏi tương tác)',
      type: 'practice',
      time: '8 phút',
      objective: 'Kiểm tra mức độ nhận biết và thông hiểu về chi tiết nghệ thuật, ngôn ngữ và nhân vật trong truyện.',
      content: 'Học sinh hoàn thành 3 câu hỏi trắc nghiệm tương tác:\n- Câu 1: Thói quen đi làm về của Tràng.\n- Câu 2: Chi tiết giới thiệu gia cảnh xóm ngụ cư.\n- Câu 3: Nét đặc sắc nghệ thuật của thiên truyện.',
      product: 'Phiếu trả lời trắc nghiệm của học sinh với đáp án chính xác 100%.',
      method: 'Trắc nghiệm nhanh, đánh giá tức thời',
      tools: 'Bảng chọn đáp án A-B-C-D / Ứng dụng trắc nghiệm',
      steps: {
        step1: 'GV chiếu lần lượt từng câu hỏi trên màn hình, yêu cầu HS chọn đáp án độc lập trong 30 giây.',
        step2: 'HS giơ thẻ chọn phương án đáp án.',
        step3: 'GV gọi HS có ý kiến khác biệt giải thích lý do; đối chiếu dẫn chứng trong văn bản SGK.',
        step4: 'GV công bố đáp án chuẩn, chốt kiến thức trọng tâm về nghệ thuật miêu tả tâm lý và dựng cảnh của Kim Lân.'
      }
    },
    {
      id: 'vn-act-4',
      name: 'Hoạt động 4: Vận dụng (Chiêm nghiệm khát vọng sống & Tình thương)',
      type: 'application',
      time: '5 phút',
      objective: 'Vận dụng giá trị nhân đạo của tác phẩm vào cuộc sống; rèn luyện năng lực viết đoạn văn nghị luận.',
      content: 'Đọc trích đoạn: "Những khuôn mặt hốc hác u tối của họ bỗng dưng rạng rỡ hẳn lên. Có cái gì lạ lùng và tươi mát thổi vào cuộc sống đói khát, tăm tối ấy...". Viết đoạn văn (8 - 10 câu) bàn về nhận định: "Tràng nhặt vợ giữa nạn đói là một hành động liều lĩnh hay là biểu hiện của khát vọng sống chính đáng?".',
      product: 'Đoạn văn ngắn có hệ thống luận điểm sáng rõ, thể hiện cái nhìn thấu cảm và giàu tính nhân văn.',
      method: 'Dạy học nêu vấn đề, viết sáng tạo',
      tools: 'Phiếu viết thu hoạch / Sổ tay văn học',
      steps: {
        step1: 'GV giao đề bài vận dụng và hướng dẫn các tiêu chí đánh giá trên Rubric.',
        step2: 'HS lập dàn ý nhanh các luận điểm trong 2 phút tại lớp.',
        step3: 'GV mời 1 HS trình bày nhanh luận điểm trước lớp; các bạn khác góp ý.',
        step4: 'GV nhận xét định hướng, giao bài tập hoàn thiện về nhà để nộp trên cổng học tập LMS.'
      }
    }
  ]
};

// =========================================================================
// 10. SLIDE BÀI GIẢNG STORYTELLING - VỢ NHẶT (KIM LÂN)
// =========================================================================
export const voNhatSlides: SlideItem[] = [
  {
    id: 'vn-slide-1',
    title: 'VỢ NHẶT - KIM LÂN',
    phaseTag: 'Khởi động',
    layout: 'single',
    contentLeft: 'Chào mừng các em đến với kiệt tác văn xuôi hiện thực và nhân đạo xuất sắc của nền văn học Việt Nam hiện đại.',
    bullets: [
      'Môn học: Ngữ văn 12 - Chương trình GDPT 2018',
      'Tác giả: Kim Lân - Cây bút một lòng đi về với đất, với người nông thôn',
      'Thời lượng: 3 tiết chuyên sâu',
      'Trọng tâm: Tình huống truyện éo le & Khát vọng sống bất diệt giữa nạn đói'
    ],
    speakerNotes: 'GV mở đầu bằng hình ảnh nạn đói 1945 và giới thiệu chân dung nhà văn Kim Lân.'
  },
  {
    id: 'vn-slide-2',
    title: 'TÌNH HUỐNG TRUYỆN: "NHẶT VỢ" NGÀY ĐÓI',
    phaseTag: 'Khởi động',
    layout: 'quote',
    contentLeft: 'Bối cảnh xóm ngụ cư ngày đói và sự kiện chấn động xóm nghèo:',
    quoteText: 'Cái đói đã tràn đến xóm này tự lúc nào... Không buổi sáng nào người trong làng đi chợ không gặp ba bốn cái thây nằm còng queo bên đường. Giữa lúc ấy, Tràng dẫn một người đàn bà về làm vợ.',
    quoteAuthor: 'Kim Lân - Vợ nhặt',
    discussionQuestion: 'Vì sao hành động Tràng "nhặt" được vợ lại gây nên sự ngạc nhiên đến bàng hoàng cho cả xóm ngụ cư, mẹ Tràng và chính bản thân Tràng?',
    speakerNotes: 'Nhấn mạnh sự éo le: chuyện dựng vợ gả chồng thiêng liêng diễn ra như một trò đùa số phận giữa ranh giới sống chết.'
  },
  {
    id: 'vn-slide-3',
    title: 'SỰ HỒI SINH KÌ DIỆU CỦA CON NGƯỜI',
    phaseTag: 'Kiến thức mới',
    layout: 'split',
    contentLeft: 'NHÂN VẬT TRÀNG:\n\n• Trước khi có vợ: gã trai ngụ cư thô kệch, nghèo khổ, chỉ biết kéo xe bò thuê và sống vô tư lự.\n• Sau khi có vợ: tâm trạng thay đổi kì diệu, thấy trong người "êm ái lơ lửng như từ giấc mơ đi ra".\n• Nhận thức mới: ý thức sâu sắc về bổn phận và trách nhiệm với gia đình, tổ ấm tương lai.',
    contentRight: 'NGƯỜI VỢ NHẶT (THỊ):\n\n• Nạn nhân của cái đói: bị cái đói cào xé làm biến dạng nhân hình lẫn nhân tính (chao chát, đanh đá, cong cớ vì miếng ăn).\n• Về làm dâu xóm ngụ cư: sự hồi sinh của thiên tính nữ - trở nên hiền hậu, đúng mực, biết lo toan quán xuyến cửa nhà.',
    speakerNotes: 'Phân tích sức mạnh cảm hóa của tình yêu thương và mái ấm gia đình đối với bản tính con người.'
  },
  {
    id: 'vn-slide-4',
    title: 'TẤM LÒNG NGƯỜI MẸ NGHÈO - BÀ CỤ TỨ',
    phaseTag: 'Kiến thức mới',
    layout: 'cards',
    contentLeft: 'Ba cung bậc tâm trạng tinh tế của người mẹ nông dân Việt Nam:',
    cards: [
      {
        title: 'NGẠC NHIÊN & BỠ NGỠ',
        desc: 'Không tin vào mắt mình khi thấy người đàn bà lạ chào bằng "u"; linh cảm điều bất thường giữa ngày đói.',
        icon: 'HelpCircle'
      },
      {
        title: 'XÓT XA & TỦI PHẬN',
        desc: 'Hiểu ra cơ sự liền rỉ hai hàng nước mắt; xót thương vì mình nghèo không lo nổi đám cưới đàng hoàng cho con.',
        icon: 'Heart'
      },
      {
        title: 'BAO DUNG & HY VỌNG',
        desc: 'Đón nhận nàng dâu bằng tất cả tình mẫu tử; nhen nhóm niềm tin vào ngày mai: "Ai giàu ba họ, ai khó ba đời".',
        icon: 'Flame'
      }
    ],
    speakerNotes: 'Nhấn mạnh giọt nước mắt của người mẹ nghèo là giọt nước mắt của tình thương và sự bao dung cao cả.'
  },
  {
    id: 'vn-slide-5',
    title: 'CHUỖI CHI TIẾT NGHỆ THUẬT ĐẮT GIÁ',
    phaseTag: 'Kiến thức mới',
    layout: 'visual_map',
    visualMapType: 'emotional_flow',
    contentLeft: 'Sự vận động từ bóng tối hiện thực đến ánh sáng tương lai qua các chi tiết:',
    bullets: [
      'Bốn bát bánh đúc ngày đói: Hiện thực đau xót khi nhân phẩm con người bị hạ thấp như cọng rơm ngọn cỏ',
      'Giọt nước mắt rỉ xuống của bà cụ Tứ: Nỗi đau nhân thế hòa cùng tình mẫu tử mênh mông',
      'Nồi cháo cám chát xít ngày cưới: Biểu tượng của sự nghèo đói cùng cực nhưng đầm ấm tình thương gia đình',
      'Tiếng trống thúc thuế dồn dập: Hiện thực áp bức đè nặng lên đôi vai người nông dân cùng quẫn',
      'Lá cờ đỏ sao vàng bay phấp phới: Ngọn đuốc soi đường, niềm tin tất yếu vào cuộc cách mạng đổi đời'
    ],
    speakerNotes: 'Cho học sinh thảo luận ý nghĩa biểu tượng của nồi cháo cám và hình ảnh lá cờ đỏ kết thúc tác phẩm.'
  },
  {
    id: 'vn-slide-6',
    title: 'CÂU HỎI TƯƠNG TÁC: ĐỌC HIỂU VỢ NHẶT',
    phaseTag: 'Luyện tập',
    layout: 'quiz',
    contentLeft: 'Kiểm tra mức độ thông hiểu nghệ thuật xây dựng tình huống truyện:',
    quizQuestion: {
      question: 'Ý nghĩa sâu sắc nhất của tình huống truyện "nhặt vợ" trong tác phẩm của Kim Lân là gì?',
      options: [
        'A. Phản ánh giá trị con người bị rẻ rúng như rác rưởi giữa nạn đói',
        'B. Ca ngợi sự may mắn ngẫu nhiên của anh cu Tràng khi lấy được vợ đẹp',
        'C. Khẳng định khát vọng sống, khát vọng hạnh phúc mãnh liệt của con người ngay bên bờ vực cái chết',
        'D. Lên án sự trơ trẽn của người phụ nữ khi theo không một người đàn ông xa lạ'
      ],
      correctIndex: 2,
      explanation: 'Tình huống truyện không chỉ tố cáo nạn đói làm rẻ rúng sinh mệnh con người mà quan trọng nhất là làm bừng sáng khát vọng sống, tình thương yêu và niềm tin vào tương lai của những số phận nghèo khổ.'
    },
    speakerNotes: 'Cho học sinh suy nghĩ 45 giây trước khi công bố đáp án và giải thích chiều sâu nhân đạo.'
  },
  {
    id: 'vn-slide-7',
    title: 'TỔNG KẾT BÀI HỌC & GIÁ TRỊ TÁC PHẨM',
    phaseTag: 'Tổng kết',
    layout: 'single',
    contentLeft: 'Những chân lý nhân văn cốt lõi đọng lại từ trang văn Kim Lân:',
    bullets: [
      'Giá trị hiện thực: Tố cáo tội ác tày trời của phát xít Nhật và thực dân Pháp gây ra nạn đói 1945',
      'Giá trị nhân đạo: Trân trọng khát vọng sống, lòng nhân ái bao dung và niềm tin tất yếu vào cách mạng',
      'Đặc sắc nghệ thuật: Nghệ thuật tạo tình huống độc đáo, miêu tả tâm lý bậc thầy, ngôn ngữ mộc mạc đậm chất dân dã',
      'Dặn dò về nhà: Viết đoạn văn 200 chữ phân tích chi tiết nồi cháo cám trong bữa cơm đón dâu mới'
    ],
    speakerNotes: 'Tổng kết bài học, nhấn mạnh vẻ đẹp tâm hồn của người lao động Việt Nam trong mọi gian lao.'
  }
];

// =========================================================================
// 11. CÂU HỎI ĐỌC HIỂU & NGHỊ LUẬN - VỢ NHẶT (KIM LÂN)
// =========================================================================
export const voNhatQuestions: LiteratureQuestionItem[] = [
  {
    id: 'vn-q-1',
    code: 'Câu 1 (Đọc hiểu)',
    type: 'doc_hieu',
    level: 'NB',
    skill: 'Nhận diện',
    passageSnippet: 'Cái đói đã tràn đến xóm này tự lúc nào. Những gia đình từ những vùng Nam Định, Thái Bình, đội chiếu lũ lượt bồng bế, dắt díu nhau lên xanh xám như những bóng ma, và nằm ngổn ngang khắp lều chợ. Người chết như ngả rạ.',
    question: 'Xác định phương thức biểu đạt chính và chỉ ra một biện pháp tu từ so sánh được sử dụng trong đoạn trích trên.',
    answer: '- Phương thức biểu đạt chính: Tự sự (hoặc Miêu tả).\n- Biện pháp tu từ so sánh: "xanh xám như những bóng ma" hoặc "Người chết như ngả rạ".',
    guide: 'Xác định đúng phương thức biểu đạt: 0.25 điểm; chỉ đúng hình ảnh so sánh: 0.25 điểm (tổng 0.5 điểm).',
    points: 0.5,
    linkedPart: 'partI'
  },
  {
    id: 'vn-q-2',
    code: 'Câu 2 (Tiếng Việt)',
    type: 'tieng_viet',
    level: 'TH',
    skill: 'Phân tích',
    passageSnippet: 'Những khuôn mặt hốc hác u tối của họ bỗng dưng rạng rỡ hẳn lên. Có cái gì lạ lùng và tươi mát thổi vào cuộc sống đói khát, tăm tối ấy của họ.',
    question: 'Chỉ ra và nêu tác dụng nghệ thuật của biện pháp tu từ đối lập trong hai câu văn trên.',
    answer: '- Phép đối lập: "khuôn mặt hốc hác u tối" >< "rạng rỡ hẳn lên"; "cuộc sống đói khát, tăm tối" >< "lạ lùng và tươi mát".\n- Tác dụng: Làm nổi bật sự biến đổi tâm lý kỳ diệu của người dân xóm ngụ cư; khẳng định sự xuất hiện của cô dâu mới đã đem lại luồng sinh khí ấm áp, khơi dậy niềm tin yêu và khát vọng sống giữa màn đêm chết chóc.',
    guide: 'Chỉ đúng cặp từ ngữ đối lập: 0.25 điểm; phân tích sâu sắc tác dụng biểu đạt: 0.5 điểm (tổng 0.75 điểm).',
    points: 0.75,
    linkedPart: 'partII'
  },
  {
    id: 'vn-q-3',
    code: 'Câu 3 (Đọc hiểu nâng cao)',
    type: 'doc_hieu',
    level: 'VD',
    skill: 'Đánh giá',
    passageSnippet: 'Bà cụ lật đật chạy xuống bếp, lễ mễ bưng ra một cái nồi khói bốc lên nghi ngút... Bà lão múc ra một bát: "Chè khoán đây, ngon đáo để cơ!". Tràng cầm đôi đũa gắp một miếng bỏ vào miệng. Mặt hắn chun lại, miếng cám đắng chát và nghẹn bứ trong cổ.',
    question: 'Phân tích ý nghĩa nghệ thuật của chi tiết "nồi cháo cám" trong bữa cơm đón nàng dâu mới.',
    answer: '- Về giá trị hiện thực: Tố cáo sự bần cùng nghiệt ngã của người dân dưới nạn đói; ngay cả ngày vui cưới vợ cũng chỉ có món cám chát xít thường dành cho gia súc.\n- Về giá trị nhân đạo: Thể hiện sự cố gắng phi thường, tấm lòng bao dung và tinh thần lạc quan của người mẹ (bà gọi cháo cám là "chè khoán"); bữa ăn đắng đót về vật chất nhưng ấm áp tình người, thắt chặt tình cảm gia đình.',
    guide: 'Phân tích được 2 phương diện hiện thực và nhân đạo: mỗi ý 0.5 điểm (tổng 1.0 điểm).',
    points: 1.0,
    linkedPart: 'partIII'
  },
  {
    id: 'vn-q-4',
    code: 'Câu 4 (Nghị luận xã hội)',
    type: 'nl_xa_hoi',
    level: 'VD',
    skill: 'Liên hệ',
    passageSnippet: 'Dù ở kề bên bờ vực cái chết, người ta vẫn khao khát hạnh phúc, vẫn hướng về sự sống và tin vào tương lai.',
    question: 'Từ tư tưởng nhân văn sâu sắc của truyện ngắn "Vợ nhặt", hãy viết một đoạn văn khoảng 200 chữ chia sẻ suy nghĩ về ý nghĩa của niềm tin và sự lạc quan đối với con người khi phải đối mặt với nghịch cảnh khó khăn trong cuộc sống hôm nay.',
    answer: 'Yêu cầu đoạn văn:\n- Mở đoạn: Dẫn dắt vấn đề niềm tin từ kiệt tác Vợ nhặt.\n- Thân đoạn:\n  + Giải thích: Niềm tin và tinh thần lạc quan là gì?\n  + Bàn luận: Vai trò của niềm tin - là điểm tựa tinh thần giúp con người vượt qua thử thách, đánh thức tiềm năng nghị lực, lan tỏa năng lượng tích cực cho cộng đồng.\n  + Dẫn chứng: Những tấm gương vượt khó trong cuộc sống (vượt qua dịch bệnh, tai nạn, nghèo khó...).\n  + Phản đề: Phê phán thái độ buông xuôi, bi quan, trốn tránh trách nhiệm.\n- Kết đoạn: Bài học nhận thức và hành động của bản thân.',
    guide: 'Chấm theo Rubric đánh giá đoạn văn nghị luận xã hội chuẩn 2.0 điểm.',
    points: 2.0,
    linkedPart: 'partIV'
  },
  {
    id: 'vn-q-5',
    code: 'Câu 5 (Nghị luận văn học)',
    type: 'nl_van_hoc',
    level: 'VD',
    skill: 'Sáng tạo',
    passageSnippet: 'Phân tích diễn biến tâm trạng của nhân vật bà cụ Tứ trong truyện ngắn Vợ nhặt của Kim Lân từ lúc thấy người đàn bà lạ ở trong nhà đến bữa cơm sáng hôm sau.',
    question: 'Phân tích vẻ đẹp tình mẫu tử và niềm tin vào sự sống của nhân vật bà cụ Tứ trong tác phẩm "Vợ nhặt". Từ đó, nhận xét về chiều sâu tư tưởng nhân đạo của nhà văn Kim Lân.',
    answer: 'Dàn ý phân tích:\n1. Mở bài: Giới thiệu Kim Lân, tác phẩm Vợ nhặt và nhân vật bà cụ Tứ.\n2. Thân bài:\n   - Hoàn cảnh xuất hiện: Người mẹ già góa bụa xóm ngụ cư giữa nạn đói kinh hoàng.\n   - Tâm trạng khi thấy người đàn bà lạ: Ngỡ ngàng, phấp phỏng, nhiều nỗi băn khoăn.\n   - Khi hiểu ra cơ sự: Vừa ai oán, vừa xót thương; giọt nước mắt tủi cực cho số phận đứa con; mở rộng vòng tay bao dung đón nhận nàng dâu.\n   - Buổi sáng hôm sau: Dọn dẹp nhà cửa, nhen nhóm niềm hy vọng ("Ai giàu ba họ, ai khó ba đời"); món "chè khoán" chát chúa chứa đựng tình mẫu tử thiêng liêng.\n   - Nhận xét tư tưởng nhân đạo: Kim Lân không viết về sự bế tắc của cái chết mà khẳng định sự bất diệt của tình người và sức sống mãnh liệt của dân tộc.\n3. Kết bài: Đánh giá vị trí nhân vật và bài học nhân văn sâu sắc.',
    guide: 'Chấm theo khung Rubric bài văn nghị luận văn học chuẩn GDPT 2018 (4.0 điểm).',
    points: 4.0,
    linkedPart: 'partIV'
  }
];

// =========================================================================
// 12. ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991 - VỢ NHẶT (KIM LÂN)
// =========================================================================
export const voNhatExam7991: Exam7991Data = {
  examHeader: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KỲ HỌC KỲ I - NGỮ VĂN 12',
    duration: '90 phút (Không kể thời gian phát đề)',
    examCode: 'MÃ ĐỀ: 302'
  },
  passageRef: `ĐỌC NGỮ LIỆU SAU VÀ THỰC HIỆN CÁC YÊU CẦU:
"Bà cụ Tứ nhấp nháy hai con mắt cay sè... Người mẹ nghèo hiểu ra bao nhiêu cơ sự, vừa ai oán vừa xót thương cho số kiếp đứa con mình. Chao ôi, người ta dựng vợ gả chồng cho con là lúc trong nhà ăn nên làm nổi, những mong sinh con đẻ cái mở mặt sau này. Còn mình thì... Trong kẽ mắt kèm nhèm của bà rỉ xuống hai dòng nước mắt.
Bà cụ Tứ hạ giọng dặn dò hai con: "Cốt làm sao chúng mày hòa thuận là u mừng rồi. Năm nay thì đói to đấy. Chúng mày lấy nhau lúc này, u thương quá...". Lòng người mẹ già nhen nhóm lên niềm tin vào tương lai: "Ai giàu ba họ, ai khó ba đời"."
(Trích "Vợ nhặt" - Kim Lân, SGK Ngữ văn 12)`,
  partI: [
    {
      id: 'vn-p1-1',
      code: 'Câu 1',
      level: 'NB',
      question: 'Tác phẩm "Vợ nhặt" của Kim Lân được viết theo thể loại nào dưới đây?',
      options: {
        A: 'Truyện ngắn hiện đại',
        B: 'Tiểu thuyết lịch sử',
        C: 'Tùy bút văn xuôi',
        D: 'Kí sự chân dung'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Vợ nhặt là truyện ngắn hiện đại xuất sắc của nhà văn Kim Lân in trong tập "Con chó xấu xí".'
    },
    {
      id: 'vn-p1-2',
      code: 'Câu 2',
      level: 'NB',
      question: 'Bối cảnh lịch sử trực tiếp diễn ra câu chuyện trong "Vợ nhặt" là thời điểm nào?',
      options: {
        A: 'Nạn đói khủng khiếp năm Ất Dậu 1945',
        B: 'Kháng chiến chống thực dân Pháp năm 1946',
        C: 'Chiến dịch Điện Biên Phủ năm 1954',
        D: 'Cải cách ruộng đất năm 1956'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Truyện lấy bối cảnh nạn đói năm 1945 do phát xít Nhật và thực dân Pháp gây ra.'
    },
    {
      id: 'vn-p1-3',
      code: 'Câu 3',
      level: 'NB',
      question: 'Nhân vật Tràng làm nghề gì để kiếm sống ở xóm ngụ cư?',
      options: {
        A: 'Kéo xe bò thuê',
        B: 'Thợ rèn sắt',
        C: 'Đan lát thúng mủng',
        D: 'Lái đò ven sông'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tràng làm nghề kéo xe bò thuê từ dốc tỉnh về kho thóc.'
    },
    {
      id: 'vn-p1-4',
      code: 'Câu 4',
      level: 'NB',
      question: 'Món ăn Tràng đã đãi người đàn bà đói ở quán nước ngoài chợ tỉnh là gì?',
      options: {
        A: 'Bốn bát bánh đúc',
        B: 'Hai bát cháo lòng',
        C: 'Mấy củ khoai lang luộc',
        D: 'Nắm xôi nếp ngô'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tràng đã đãi thị bốn bát bánh đúc ngày đói tại chợ tỉnh.'
    },
    {
      id: 'vn-p1-5',
      code: 'Câu 5',
      level: 'NB',
      question: 'Trong bữa cơm đón nàng dâu mới, bà cụ Tứ đã mang ra món ăn đặc biệt mà bà gọi đùa là gì?',
      options: {
        A: 'Chè khoán (cháo cám)',
        B: 'Cháo hoa thơm nức',
        C: 'Cơm gạo đỏ thơm ngon',
        D: 'Chè đỗ xanh mật mía'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Bà cụ Tứ gọi đùa nồi cháo cám chát xít là món "chè khoán ngon đáo để cơ".'
    },
    {
      id: 'vn-p1-6',
      code: 'Câu 6',
      level: 'NB',
      question: 'Hình ảnh nào xuất hiện trong tâm trí Tràng ở đoạn kết thúc truyện ngắn?',
      options: {
        A: 'Đoàn người đói phá kho thóc Nhật và lá cờ đỏ sao vàng',
        B: 'Đoàn quân vệ quốc hành quân qua núi rừng',
        C: 'Cảnh xóm ngụ cư trù phú trong mùa lúa chín',
        D: 'Đám cưới rộn rã pháo hoa của đôi bạn trẻ'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Hình ảnh đoàn người đói đi phá kho thóc Nhật và lá cờ đỏ sao vàng bay phấp phới.'
    },
    {
      id: 'vn-p1-7',
      code: 'Câu 7',
      level: 'NB',
      question: 'Câu tục ngữ nào được bà cụ Tứ dùng để động viên, nhen nhóm hy vọng cho các con?',
      options: {
        A: 'Ai giàu ba họ, ai khó ba đời',
        B: 'Lá lành đùm lá rách',
        C: 'Một miếng khi đói bằng một gói khi no',
        D: 'Thuận vợ thuận chồng tát biển Đông cũng cạn'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Bà cụ Tứ khuyên nhủ con: "Ai giàu ba họ, ai khó ba đời".'
    },
    {
      id: 'vn-p1-8',
      code: 'Câu 8',
      level: 'NB',
      question: 'Ngôi kể được Kim Lân sử dụng chủ yếu trong truyện ngắn "Vợ nhặt" là ngôi thứ mấy?',
      options: {
        A: 'Ngôi thứ ba (người kể chuyện toàn tri)',
        B: 'Ngôi thứ nhất (xưng Tôi)',
        C: 'Ngôi thứ hai (xưng Bạn)',
        D: 'Kết hợp đan xen ngôi thứ nhất và thứ hai'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tác phẩm sử dụng ngôi kể thứ ba khách quan linh hoạt, kết hợp điểm nhìn bên trong của nhân vật.'
    },
    {
      id: 'vn-p1-9',
      code: 'Câu 9',
      level: 'TH',
      question: 'Vì sao dân xóm ngụ cư lại cảm thấy "có cái gì lạ lùng và tươi mát" khi thấy Tràng dắt vợ về?',
      options: {
        A: 'Vì sự xuất hiện của sự sống và hạnh phúc đã xua tan đi phần nào không khí chết chóc u ám',
        B: 'Vì họ ghen tị với hạnh phúc bất ngờ của người kéo xe ngụ cư',
        C: 'Vì người vợ nhặt mang theo rất nhiều tiền của đến giúp xóm nghèo',
        D: 'Vì họ sắp được mời ăn cỗ cưới thịnh soạn'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Sự xuất hiện của hạnh phúc gia đình đã thắp lên niềm tin yêu vào sự sống giữa nạn đói.'
    },
    {
      id: 'vn-p1-10',
      code: 'Câu 10',
      level: 'TH',
      question: 'Tâm trạng của Tràng vào buổi sáng sau đêm tân hôn có sự biến đổi căn bản nào?',
      options: {
        A: 'Trưởng thành, gắn bó với mái ấm và nhận thức rõ trách nhiệm người chủ gia đình',
        B: 'Lo sợ vì sắp phải nộp thuế cho phát xít Nhật',
        C: 'Thất vọng vì gia cảnh quá nghèo không nuôi nổi vợ',
        D: 'Hối hận vì đã trót liều lĩnh dẫn người lạ về nhà'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tràng cảm thấy mình trưởng thành, gắn bó với ngôi nhà và nhận ra bổn phận phải lo cho vợ con.'
    },
    {
      id: 'vn-p1-11',
      code: 'Câu 11',
      level: 'TH',
      question: 'Chi tiết giọt nước mắt của bà cụ Tứ trong đoạn trích thể hiện tâm trạng gì sâu sắc nhất?',
      options: {
        A: 'Nỗi xót xa, tủi phận vì cảnh nghèo và tình yêu thương con vô bờ bến',
        B: 'Sự tức giận vì con trai tự ý lấy vợ không xin phép mẹ',
        C: 'Nỗi căm phẫn người đàn bà ngụ cư mặt dày bám theo con trai',
        D: 'Sự sợ hãi trước cái chết đang cận kề từng ngày'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Giọt nước mắt của sự tủi phận vì nghèo không lo được cho con, chất chứa tình mẫu tử tha thiết.'
    },
    {
      id: 'vn-p1-12',
      code: 'Câu 12',
      level: 'TH',
      question: 'Ý kiến nào sau đây nhận xét ĐÚNG NHẤT về ngôn ngữ nghệ thuật của Kim Lân trong "Vợ nhặt"?',
      options: {
        A: 'Mộc mạc, gần gũi với khẩu ngữ của người nông dân Bắc Bộ nhưng chắt lọc và giàu sức gợi',
        B: 'Cổ kính, trang trọng với dày đặc từ ngữ Hán Việt uyên bác',
        C: 'Châm biếm trào phúng gay gắt theo phong cách trào phúng phương Tây',
        D: 'Mỹ lệ, hoa mỹ theo phong cách văn học lãng mạn thoát ly thực tế'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Ngôn ngữ của Kim Lân mộc mạc, chân chất, đậm đà phong vị làng quê Bắc Bộ nhưng rất tinh tế.'
    }
  ],
  partII: [
    {
      id: 'vn-p2-1',
      code: 'Câu 1 (Đúng/Sai)',
      level: 'TH',
      stem: 'Đọc đoạn văn miêu tả tâm trạng bà cụ Tứ trong trích đoạn ngữ liệu. Xác định tính Đúng / Sai của các nhận định sau về nhân vật bà cụ Tứ:',
      statements: [
        {
          subId: 'a',
          text: 'Bà cụ Tứ cảm thấy bẽ bàng và kiên quyết từ chối người con dâu vì gia đình không đủ sức nuôi thêm miệng ăn.',
          isCorrect: false,
          explanation: 'Bà cụ Tứ không hề từ chối mà dang rộng vòng tay nhân từ, bao dung đón nhận nàng dâu mới.'
        },
        {
          subId: 'b',
          text: 'Giọt nước mắt của bà cụ Tứ là sự cộng hưởng giữa nỗi đau tủi cực vì nghèo khó và tình yêu thương con bao la.',
          isCorrect: true,
          explanation: 'Bà khóc vì tủi phận làm mẹ không lo nổi đám cưới cho con, xót thương cho đôi trẻ lấy nhau giữa thời đói kém.'
        },
        {
          subId: 'c',
          text: 'Câu nói "Ai giàu ba họ, ai khó ba đời" cho thấy người mẹ nghèo luôn nhen nhóm niềm tin và truyền sự lạc quan cho các con.',
          isCorrect: true,
          explanation: 'Bà cụ Tứ luôn hướng về sự sống và tương lai tốt đẹp để động viên các con vượt qua hoạn nạn.'
        },
        {
          subId: 'd',
          text: 'Bà cụ Tứ chỉ quan tâm đến việc có thêm người gánh vác việc đồng áng chứ không hề thấu hiểu tâm sự của nàng dâu.',
          isCorrect: false,
          explanation: 'Bà cụ Tứ hạ giọng dặn dò chân thành "chúng mày hòa thuận là u mừng rồi", thể hiện sự thấu hiểu tuyệt vời.'
        }
      ],
      points: 1.0
    },
    {
      id: 'vn-p2-2',
      code: 'Câu 2 (Đúng/Sai)',
      level: 'VD',
      stem: 'Đánh giá về giá trị tư tưởng và nghệ thuật của tác phẩm "Vợ nhặt". Xác định tính Đúng / Sai của các nhận định sau:',
      statements: [
        {
          subId: 'a',
          text: 'Tình huống truyện "nhặt vợ" vừa éo le, bất ngờ, bi hài nhưng lại là tiền đề làm bừng sáng bản chất tốt đẹp của con người.',
          isCorrect: true,
          explanation: 'Tình huống truyện độc đáo là hạt nhân nghệ thuật khơi gợi tình thương và khát vọng sống.'
        },
        {
          subId: 'b',
          text: 'Chi tiết nồi cháo cám chỉ thuần túy có tác dụng gây tiếng cười hài hước châm biếm người dân xóm ngụ cư.',
          isCorrect: false,
          explanation: 'Nồi cháo cám chát xít là chi tiết hiện thực đau xót và biểu tượng của tình cảm gia đình chắt chiu, ấm áp.'
        },
        {
          subId: 'c',
          text: 'Tác phẩm thể hiện tư tưởng nhân đạo mới mẻ: gắn kết số phận cá nhân với con đường đấu tranh cách mạng của toàn dân tộc.',
          isCorrect: true,
          explanation: 'Hình ảnh lá cờ đỏ sao vàng mở ra hướng đi tất yếu: người nông dân đứng lên tự cứu mình theo Đảng và Việt Minh.'
        },
        {
          subId: 'd',
          text: 'Kim Lân miêu tả tâm lý nhân vật Thị hoàn toàn đơn điệu, không có bất kì sự phát triển hay thay đổi nào.',
          isCorrect: false,
          explanation: 'Thị có sự chuyển biến tâm lý tinh tế: từ đanh đá, chao chát ngày đói trở thành người phụ nữ hiền thục, chu đáo.'
        }
      ],
      points: 1.0
    }
  ],
  partIII: [
    {
      id: 'vn-p3-1',
      code: 'Câu 1',
      level: 'TH',
      question: 'Ghi lại cụm từ gồm 3 tiếng chỉ nguồn gốc cư trú của gia đình anh cu Tràng khiến họ bị coi thường.',
      correctAnswer: 'dân ngụ cư (hoặc xóm ngụ cư)',
      points: 0.5,
      explanation: 'Dân ngụ cư là những người tha hương đến làng khác sinh sống, thường bị phân biệt đối xử và không có tiếng nói.'
    },
    {
      id: 'vn-p3-2',
      code: 'Câu 2',
      level: 'TH',
      question: 'Số lượng bát bánh đúc mà Tràng đã thết đãi người đàn bà đói ở chợ tỉnh là bao nhiêu?',
      correctAnswer: 'bốn bát (hoặc 4 bát bánh đúc)',
      points: 0.5,
      explanation: 'Thị cắm đầu ăn một chặp bốn bát bánh đúc liền chẳng trò chuyện gì.'
    },
    {
      id: 'vn-p3-3',
      code: 'Câu 3',
      level: 'VD',
      question: 'Tên con vật nuôi mà bà cụ Tứ dự định bàn với con mua về nuôi để mong có đàn gà sau này là gì?',
      correctAnswer: 'gà (hoặc đôi gà, mấy con gà)',
      points: 0.5,
      explanation: 'Bà cụ Tứ bảo: "Tràng ạ. Khi nào có tiền ta mua lấy đôi gà... Chẳng mấy mà có ngay đàn gà cho mà xem...".'
    },
    {
      id: 'vn-p3-4',
      code: 'Câu 4',
      level: 'VD',
      question: 'Hình ảnh mang tính biểu tượng cách mạng xuất hiện trong dòng suy nghĩ của Tràng ở câu kết tác phẩm là gì?',
      correctAnswer: 'lá cờ đỏ sao vàng (hoặc cờ đỏ sao vàng)',
      points: 0.5,
      explanation: 'Hình ảnh lá cờ đỏ sao vàng bay phấp phới là ngọn lửa báo hiệu tương lai tươi sáng của cách mạng.'
    }
  ],
  partIV: [
    {
      id: 'vn-p4-1',
      code: 'Câu 1 (Tự luận - Nghị luận văn học)',
      level: 'VD',
      question: 'Phân tích diễn biến tâm trạng của nhân vật bà cụ Tứ qua đoạn trích trong đề thi:\n"Bà cụ Tứ nhấp nháy hai con mắt cay sè... Lòng người mẹ già nhen nhóm lên niềm tin vào tương lai: Ai giàu ba họ, ai khó ba đời."\nTừ đó, làm nổi bật vẻ đẹp tình mẫu tử và chiều sâu nhân đạo của ngòi bút Kim Lân.',
      rubric: [
        {
          step: '1. Đảm bảo cấu trúc bài văn nghị luận văn học; xác định đúng vấn đề nghị luận.',
          points: 0.5
        },
        {
          step: '2. Phân tích tâm trạng ngạc nhiên, thảng thốt và nỗi ai oán, tủi phận của người mẹ nghèo trước tình cảnh trớ trêu của con trai.',
          points: 0.75
        },
        {
          step: '3. Phân tích tình yêu thương bao la và tấm lòng vị tha khi đón nhận nàng dâu: hạ giọng dặn dò chân thành, giọt nước mắt thấu cảm.',
          points: 0.75
        },
        {
          step: '4. Phân tích tinh thần lạc quan và niềm tin vào sự sống: câu tục ngữ "Ai giàu ba họ, ai khó ba đời", nhen nhóm hy vọng cho các con.',
          points: 0.5
        },
        {
          step: '5. Nhận xét chiều sâu giá trị nhân đạo: Kim Lân trân trọng nhân phẩm, ngợi ca khát vọng sống và tình mẫu tử bất diệt giữa bờ vực cái chết. Sáng tạo, hành văn truyền cảm.',
          points: 0.5
        }
      ],
      points: 3.0
    }
  ]
};

// =========================================================================
// 13. RUBRIC CHẤM BÀI NGHỊ LUẬN VĂN HỌC - VỢ NHẶT (KIM LÂN)
// =========================================================================
export const voNhatRubric: RubricData = {
  id: 'rubric-vo-nhat',
  title: 'Rubric Chấm Điểm Bài Văn Nghị Luận Tác Phẩm Truyện: "Vợ nhặt" (Thang 10.0)',
  essayType: 'nl_van_hoc',
  totalPoints: 10.0,
  criteria: [
    {
      id: 'vn-crit-1',
      name: 'Xác định vấn đề nghị luận',
      weight: 10,
      maxPoints: 1.0,
      description: 'Xác định đúng tâm trạng bà cụ Tứ, tình mẫu tử và giá trị nhân đạo trong truyện Vợ nhặt.',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Xác định chính xác tuyệt đối, mở bài giàu sức gợi, dẫn dắt tự nhiên vào tác giả Kim Lân và đoạn trích.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Xác định được vấn đề, mở bài đủ ý nhưng còn khuôn mẫu.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Xác định chưa rõ hoặc lệch trọng tâm đề bài.' }
      ]
    },
    {
      id: 'vn-crit-2',
      name: 'Bố cục & Cấu trúc bài viết',
      weight: 10,
      maxPoints: 1.0,
      description: 'Bố cục 3 phần rõ ràng, chuyển đoạn mạch lạc, liên kết câu chặt chẽ.',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Bố cục hoàn chỉnh, chuyển ý mượt mà, luận điểm phân chia khoa học và liên kết logic cao.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Đủ 3 phần nhưng phần chuyển đoạn còn hơi thô ráp.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Thiếu kết bài hoặc các đoạn văn rời rạc, thiếu tính hệ thống.' }
      ]
    },
    {
      id: 'vn-crit-3',
      name: 'Hệ thống Luận điểm & Phân tích tâm lý',
      weight: 25,
      maxPoints: 2.5,
      description: 'Làm nổi bật các cung bậc tâm trạng: ngạc nhiên -> tủi cực xót xa -> bao dung đón nhận -> nhen nhóm niềm tin.',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Luận điểm sâu sắc, nắm bắt trọn vẹn diễn biến tâm lý phức tạp của người mẹ già, phân tích thuyết phục từng bước chuyển biến.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Nêu được các tâm trạng chính nhưng phân tích chưa thật sâu, đôi chỗ còn nặng về kể lại cốt truyện.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Luận điểm sơ sài, chỉ tóm tắt truyện mà không phân tích chiều sâu tâm lý.' }
      ]
    },
    {
      id: 'vn-crit-4',
      name: 'Dẫn chứng & Phân tích chi tiết nghệ thuật',
      weight: 25,
      maxPoints: 2.5,
      description: 'Khai thác chi tiết giọt nước mắt, lời dặn dò, câu tục ngữ, nghệ thuật miêu tả tâm lý và ngôn ngữ nhân vật.',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Chọn dẫn chứng tiêu biểu, phân tích tinh tế chi tiết nghệ thuật đắt giá, làm sáng bừng phong cách viết văn Kim Lân.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Có trích dẫn chứng và phân tích nhưng phân tích còn chung chung.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Dẫn chứng thiếu chính xác, trích sai hoặc bỏ qua đặc trưng thể loại truyện ngắn.' }
      ]
    },
    {
      id: 'vn-crit-5',
      name: 'Diễn đạt, Dùng từ & Ngữ pháp',
      weight: 15,
      maxPoints: 1.5,
      description: 'Hành văn trong sáng, giàu cảm xúc, vốn từ ngữ văn học phong phú, không sai chính tả.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Diễn đạt lưu loát, giàu chất văn, câu văn có nhịp điệu và hình ảnh, chuẩn mực ngữ pháp.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Rõ ý, mắc vài lỗi chính tả hoặc lỗi lặp từ không đáng kể.' },
        { label: 'Cần cố gắng', score: 0.5, descriptor: 'Diễn đạt vụng về, câu què cụt, sai nhiều lỗi ngữ pháp hoặc dùng từ sai nghĩa.' }
      ]
    },
    {
      id: 'vn-crit-6',
      name: 'Sáng tạo & Đánh giá tư tưởng nhân đạo',
      weight: 15,
      maxPoints: 1.5,
      description: 'Có phát hiện mới mẻ, liên hệ so sánh với các bà mẹ trong văn học (như mẹ bé Hồng, bà cụ lão Hạc), đánh giá tầm vóc tư tưởng Kim Lân.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Có cái nhìn nhân văn độc đáo, so sánh văn học tinh tế, liên hệ sâu sắc với giá trị của tình cảm gia đình hôm nay.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Có liên hệ mở rộng nhưng còn đơn giản hoặc mang tính liệt kê.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Chưa có ý thức liên hệ sáng tạo, kết bài gượng gạo.' }
      ]
    }
  ]
};

// =========================================================================
// 14. KẾ HOẠCH BÀI DẠY (KHBD 5512) - TUYÊN NGÔN ĐỘC LẬP (HỒ CHÍ MINH)
// =========================================================================
export const tuyenNgonKhbd5512: LessonPlan5512 = {
  info: {
    department: 'SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH',
    school: 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG',
    subjectGroup: 'TỔ NGỮ VĂN',
    teacherName: 'ThS. Trần Thị Thanh Tâm',
    subject: 'Ngữ văn',
    grade: 'Lớp 12',
    textbook: 'Kết nối tri thức với cuộc sống',
    lessonTitle: 'TUYÊN NGÔN ĐỘC LẬP (HỒ CHÍ MINH)',
    periods: '2 tiết (Tiết PPCT: 19 - 20)',
    academicYear: 'Năm học 2024 - 2025',
    assignedClasses: ['12 Văn', '12A1', '12A2'],
    semester: 'Học kỳ I'
  },
  objectives: {
    knowledge: [
      'Nắm vững giá trị lịch sử to lớn của bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
      'Hiểu được nghệ thuật lập luận mẫu mực: hệ thống luận điểm chặt chẽ, lý lẽ đanh thép, dẫn chứng xác thực không thể chối cãi.',
      'Khắc sâu ý chí quyết tâm sắt đá của toàn dân tộc Việt Nam giữ vững nền tự do, độc lập.'
    ],
    generalCompetencies: {
      selfControl: 'Chủ động tìm hiểu bối cảnh lịch sử ngày 2/9/1945 và đối tượng tiếp nhận của bản Tuyên ngôn.',
      communication: 'Tranh biện và thuyết trình về nghệ thuật văn chính luận của Chủ tịch Hồ Chí Minh.',
      problemSolving: 'Phân tích các luận cứ bác bỏ luận điệu xảo quyệt của thực dân Pháp.'
    },
    specializedCompetencies: [
      'Năng lực đọc hiểu văn bản nghị luận: Nhận diện cấu trúc luận đề, luận điểm, lý lẽ và dẫn chứng.',
      'Năng lực cảm thụ: Cảm nhận được khí phách dân tộc và tầm nhìn tư tưởng thời đại của Bác.',
      'Năng lực tạo lập văn bản: Viết bài văn nghị luận xã hội về lòng yêu nước và trách nhiệm công dân.'
    ],
    qualities: [
      'Yêu nước: Tự hào về lịch sử vẻ vang của dân tộc, có ý thức bảo vệ chủ quyền thiêng liêng của Tổ quốc.',
      'Trách nhiệm: Nhận thức rõ vai trò của thế hệ trẻ trong công cuộc xây dựng và phát triển đất nước.'
    ]
  },
  equipment: {
    teacher: [
      'Giáo án chuẩn Công văn 5512.',
      'Bản ghi âm giọng đọc của Bác tại Quảng trường Ba Đình ngày 2/9/1945.',
      'Slide bài giảng tích hợp sơ đồ tư duy cây lập luận (Argument Map).',
      'Phiếu học tập phân tích cơ sở pháp lý và cơ sở thực tiễn.'
    ],
    student: [
      'SGK Ngữ văn 12 tập 1, vở ghi chép.',
      'Bản chuẩn bị bài và tìm hiểu tư liệu lịch sử Cách mạng Tháng Tám.'
    ]
  },
  activities: [
    {
      id: 'tn-act-1',
      name: 'Hoạt động 1: Khởi động (Âm vang Quảng trường Ba Đình)',
      type: 'warmup',
      time: '6 phút',
      objective: 'Tạo không khí thiêng liêng, kết nối vào bối cảnh ra đời của bản Tuyên ngôn.',
      content: 'Học sinh lắng nghe đoạn băng ghi âm lời Bác đọc Tuyên ngôn Độc lập và quan sát hình ảnh Quảng trường Ba Đình ngày 2/9/1945.',
      product: 'Chia sẻ cảm xúc của học sinh về âm hưởng hào hùng của bản Tuyên ngôn.',
      method: 'Dạy học trực quan, trải nghiệm âm thanh lịch sử',
      tools: 'Bản ghi âm 2/9/1945, ảnh tư liệu Ba Đình',
      steps: {
        step1: 'GV phát đoạn ghi âm Bác đọc Tuyên ngôn Độc lập trong 2 phút.',
        step2: 'HS lắng nghe và ghi lại 3 từ khóa miêu tả cảm xúc của mình.',
        step3: 'GV gọi 2 HS chia sẻ; các bạn khác hưởng ứng.',
        step4: 'GV dẫn dắt giới thiệu bản Tuyên ngôn Độc lập - áng thiên cổ hùng văn thời đại mới.'
      }
    },
    {
      id: 'tn-act-2',
      name: 'Hoạt động 2: Hình thành kiến thức (Giải mã nghệ thuật lập luận chính luận)',
      type: 'knowledge',
      time: '24 phút',
      objective: 'Phân tích 3 phần của bản Tuyên ngôn: Cơ sở pháp lý, Cơ sở thực tiễn và Lời tuyên ngôn độc lập.',
      content: 'Tổ chức cho học sinh thảo luận theo nhóm phân tích 3 cụm vấn đề:\n- Nhóm 1: Cơ sở pháp lý quốc tế (Tuyên ngôn Mỹ 1776, Pháp 1791) và bước phát triển sáng tạo "suy rộng ra".\n- Nhóm 2: Cơ sở thực tiễn (Bản cáo trạng tội ác thực dân Pháp và thắng lợi của nhân dân ta).\n- Nhóm 3: Lời tuyên ngôn và ý chí quyết tâm bảo vệ nền độc lập.',
      product: 'Sơ đồ lập luận Argument Map trên bảng nhóm, hoàn thành phiếu phân tích lý lẽ và bằng chứng.',
      method: 'Dạy học nhóm, phân tích văn bản chính luận, lập luận logic',
      tools: 'Phiếu học tập A0, sơ đồ Argument Map',
      steps: {
        step1: 'GV giao nhiệm vụ phân tích cho 3 nhóm lớn, thời gian làm việc 12 phút.',
        step2: 'Các nhóm làm việc, vẽ sơ đồ luận điểm - lý lẽ - dẫn chứng lên bảng phụ.',
        step3: 'Đại diện từng nhóm thuyết trình ngắn gọn; phản biện lẫn nhau.',
        step4: 'GV tổng kết, nhấn mạnh tài nghệ lập luận chặt chẽ, đanh thép của Hồ Chí Minh.'
      }
    },
    {
      id: 'tn-act-3',
      name: 'Hoạt động 3: Luyện tập (Củng cố kiến thức văn chính luận)',
      type: 'practice',
      time: '10 phút',
      objective: 'Rèn luyện kỹ năng phân tích cấu trúc lập luận và nghệ thuật sử dụng từ ngữ chính luận.',
      content: 'Học sinh làm bài tập trắc nghiệm và điền khuyết về các luận điểm then chốt của văn bản.',
      product: 'Kết quả bài tập tương tác đạt độ chính xác cao.',
      method: 'Trắc nghiệm tương tác, phiếu bài tập nhanh',
      tools: 'Màn chiếu câu hỏi trắc nghiệm',
      steps: {
        step1: 'GV chiếu hệ thống 4 câu hỏi trắc nghiệm củng cố.',
        step2: 'HS suy nghĩ và trả lời.',
        step3: 'GV gọi HS giải thích lý do lựa chọn đáp án.',
        step4: 'GV chốt đáp án chuẩn và nhận xét mức độ nắm bài.'
      }
    },
    {
      id: 'tn-act-4',
      name: 'Hoạt động 4: Vận dụng (Trách nhiệm của công dân đối với chủ quyền đất nước)',
      type: 'application',
      time: '5 phút',
      objective: 'Kết nối giá trị độc lập tự do với trách nhiệm của thanh niên hiện nay.',
      content: 'Từ lời thề giữ vững độc lập ở cuối văn bản, viết đoạn văn ngắn (150 chữ) về trách nhiệm bảo vệ chủ quyền biển đảo của thế hệ trẻ.',
      product: 'Đoạn văn ngắn giàu cảm xúc và lý lẽ thuyết phục.',
      method: 'Dạy học nêu vấn đề, viết sáng tạo',
      tools: 'Sổ tay học tập',
      steps: {
        step1: 'GV nêu câu hỏi chiêm nghiệm kết nối thực tiễn.',
        step2: 'HS phác thảo ý tưởng tại lớp.',
        step3: 'GV chọn 1 bài đọc trước lớp, nhận xét nhanh.',
        step4: 'Dặn dò hoàn thiện bài viết về nhà.'
      }
    }
  ]
};

// =========================================================================
// 15. SLIDE BÀI GIẢNG STORYTELLING - TUYÊN NGÔN ĐỘC LẬP
// =========================================================================
export const tuyenNgonSlides: SlideItem[] = [
  {
    id: 'tn-slide-1',
    title: 'TUYÊN NGÔN ĐỘC LẬP - HỒ CHÍ MINH',
    phaseTag: 'Khởi động',
    layout: 'single',
    contentLeft: 'Văn kiện lịch sử vô giá khai sinh nước Việt Nam Dân chủ Cộng hòa, kiệt tác văn chính luận mẫu mực.',
    bullets: [
      'Môn học: Ngữ văn 12 - Chương trình GDPT 2018',
      'Tác giả: Chủ tịch Hồ Chí Minh (1890 - 1969)',
      'Thời lượng: 2 tiết chuyên sâu',
      'Trọng tâm: Cơ sở pháp lý vững chắc & Nghệ thuật lập luận đanh thép'
    ],
    speakerNotes: 'GV mở đầu bằng hình ảnh Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn tại Ba Đình ngày 2/9/1945.'
  },
  {
    id: 'tn-slide-2',
    title: 'CƠ SỞ PHÁP LÝ & BƯỚC NGOẶT "SUY RỘNG RA"',
    phaseTag: 'Kiến thức mới',
    layout: 'quote',
    contentLeft: 'Lời trích dẫn mở đầu bất hủ tạo thế đứng chính nghĩa vững chắc:',
    quoteText: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc... Suy rộng ra, câu ấy có ý nghĩa là: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng...',
    quoteAuthor: 'Hồ Chí Minh trích Tuyên ngôn Độc lập Mỹ (1776)',
    discussionQuestion: 'Ý nghĩa của cụm từ "Suy rộng ra" trong tư tưởng Hồ Chí Minh là gì đối với phong trào giải phóng dân tộc thuộc địa trên toàn thế giới?',
    speakerNotes: 'Phân tích bước phát triển từ quyền cá nhân của phương Tây sang quyền tự quyết dân tộc của các nước thuộc địa.'
  },
  {
    id: 'tn-slide-3',
    title: 'CƠ SỞ THỰC TIỄN: BẢN CÁO TRẠNG ĐANH THÉP',
    phaseTag: 'Kiến thức mới',
    layout: 'split',
    contentLeft: 'TỘI ÁC THỰC DÂN PHÁP:\n\n• Về chính trị: Tuyệt đối không cho một chút tự do dân chủ nào, lập nhà tù nhiều hơn trường học, tắm các cuộc khởi nghĩa trong bể máu.\n• Về kinh tế: Bóc lột đến tận xương tủy, gây nên nạn đói năm 1945 làm hơn hai triệu đồng bào chết đói.\n• Về đạo đức: Hai lần bán Đông Dương cho phát xít Nhật.',
    contentRight: 'CHÍNH NGHĨA DÂN TỘC VIỆT NAM:\n\n• Khẳng định: Nhân dân ta lấy lại đất nước từ tay Nhật chứ không phải từ tay Pháp.\n• Đánh đổ xiềng xích thực dân gần một thế kỷ và lật đổ chế độ phong kiến mấy nghìn năm để lập nên chế độ Dân chủ Cộng hòa.\n• Nhân đạo: Khoan hồng với kẻ thù thất trận, bảo vệ tính mạng tù binh Pháp.',
    speakerNotes: 'Nhấn mạnh nghệ thuật liệt kê điệp từ "chúng" tạo nên giọng điệu đanh thép, luận cứ chuẩn xác không thể chối cãi.'
  },
  {
    id: 'tn-slide-4',
    title: 'LỜI TUYÊN NGÔN & Ý CHÍ SẮT ĐÁ TOÀN DÂN',
    phaseTag: 'Kiến thức mới',
    layout: 'cards',
    contentLeft: 'Ba tuyên bố đanh thép khẳng định chủ quyền dân tộc:',
    cards: [
      {
        title: 'THOÁT LY QUAN HỆ THỰC DÂN',
        desc: 'Xóa bỏ tất cả các hiệp ước bất bình đẳng mà Pháp đã ký, hủy bỏ mọi đặc quyền của Pháp trên đất nước Việt Nam.',
        icon: 'Shield'
      },
      {
        title: 'SỰ THẬT LỊCH SỬ HIỂN NHIÊN',
        desc: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập".',
        icon: 'Flame'
      },
      {
        title: 'LỜI THỀ GIỮ VỮNG ĐỘC LẬP',
        desc: 'Quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập thiêng liêng ấy.',
        icon: 'Heart'
      }
    ],
    speakerNotes: 'Nhấn mạnh từ "sự thật" khẳng định độc lập đã được đánh đổi bằng xương máu chứ không phải sự ban phát ngoại giao.'
  },
  {
    id: 'tn-slide-5',
    title: 'CÂU HỎI TƯƠNG TÁC: NGHỆ THUẬT LẬP LUẬN',
    phaseTag: 'Luyện tập',
    layout: 'quiz',
    contentLeft: 'Kiểm tra mức độ thông hiểu phương pháp lập luận của Chủ tịch Hồ Chí Minh:',
    quizQuestion: {
      question: 'Vì sao mở đầu bản Tuyên ngôn, Hồ Chí Minh lại trích dẫn hai bản tuyên ngôn của nước Mỹ (1776) và nước Pháp (1791)?',
      options: [
        'A. Dùng chân lý của chính đối phương công nhận để khóa miệng kẻ thù và tạo cơ sở pháp lý vững chắc trước công luận thế giới',
        'B. Bày tỏ lòng ngưỡng mộ tuyệt đối đối với nền văn minh phương Tây',
        'C. Nhằm mục đích kêu gọi sự viện trợ kinh tế từ các nước tư bản lớn',
        'D. Vì Việt Nam lúc đó chưa có nền văn học chính luận riêng'
      ],
      correctIndex: 0,
      explanation: 'Đây là nghệ thuật lập luận "gậy ông đập lưng ông" sắc sảo: dùng chính danh ngôn và lý tưởng nhân quyền của tổ tiên đối phương để bác bỏ dã tâm xâm lược của chúng.'
    },
    speakerNotes: 'Cho học sinh thảo luận 45 giây trước khi công bố đáp án và phân tích tầm vóc chiến lược của Bác.'
  },
  {
    id: 'tn-slide-6',
    title: 'TỔNG KẾT BÀI HỌC & Ý NGHĨA LỊCH SỬ',
    phaseTag: 'Tổng kết',
    layout: 'single',
    contentLeft: 'Giá trị trường tồn của kiệt tác chính luận Tuyên ngôn Độc lập:',
    bullets: [
      'Giá trị lịch sử: Khai sinh nước Việt Nam Dân chủ Cộng hòa, mở ra kỷ nguyên độc lập tự do cho dân tộc',
      'Giá trị tư tưởng: Khẳng định quyền con người gắn liền với quyền dân tộc tự quyết',
      'Giá trị nghệ thuật: Bố cục chặt chẽ, luận cứ xác thực, từ ngữ đanh thép, lập luận sắc bén đỉnh cao',
      'Nhiệm vụ về nhà: Viết đoạn văn 150 chữ về trách nhiệm của học sinh với nền độc lập dân tộc'
    ],
    speakerNotes: 'Tổng kết bài học và hướng dẫn học sinh làm bài tập về nhà.'
  }
];

// =========================================================================
// 16. CÂU HỎI ĐỌC HIỂU & NGHỊ LUẬN - TUYÊN NGÔN ĐỘC LẬP
// =========================================================================
export const tuyenNgonQuestions: LiteratureQuestionItem[] = [
  {
    id: 'tn-q-1',
    code: 'Câu 1 (Đọc hiểu)',
    type: 'doc_hieu',
    level: 'NB',
    skill: 'Nhận diện',
    passageSnippet: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.',
    question: 'Chỉ ra xuất xứ của lời trích dẫn trên và phương thức biểu đạt chính của đoạn văn.',
    answer: '- Xuất xứ: Trích bản Tuyên ngôn Độc lập năm 1776 của nước Mỹ.\n- Phương thức biểu đạt chính: Nghị luận.',
    guide: 'Đúng xuất xứ: 0.25 điểm; đúng phương thức biểu đạt: 0.25 điểm (tổng 0.5 điểm).',
    points: 0.5,
    linkedPart: 'partI'
  },
  {
    id: 'tn-q-2',
    code: 'Câu 2 (Tiếng Việt)',
    type: 'tieng_viet',
    level: 'TH',
    skill: 'Phân tích',
    passageSnippet: 'Thế mà hơn tám mươi năm nay, bọn thực dân Pháp lợi dụng lá cờ tự do, bình đẳng, bác ái, đến cướp đất nước ta, áp bức đồng bào ta. Hành động của chúng trái hẳn với nhân đạo và chính nghĩa.',
    question: 'Phân tích hiệu quả liên kết câu và diễn đạt của cụm từ "Thế mà hơn tám mươi năm nay" ở đầu đoạn văn.',
    answer: '- Cụm từ đóng vai trò liên từ chuyển ý tương phản đối lập gay gắt giữa lý thuyết đẹp đẽ của phương Tây với hành động thực tế dã man của thực dân Pháp.\n- Tạo giọng điệu đanh thép, bất bình và mở màn cho bản cáo trạng vạch trần tội ác cướp nước.',
    guide: 'Phân tích đúng tác dụng liên kết và giọng điệu: 0.75 điểm.',
    points: 0.75,
    linkedPart: 'partII'
  },
  {
    id: 'tn-q-3',
    code: 'Câu 3 (Đọc hiểu nâng cao)',
    type: 'doc_hieu',
    level: 'VD',
    skill: 'Đánh giá',
    passageSnippet: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!',
    question: 'Vì sao trong câu kết, tác giả lại nhấn mạnh cụm từ "và sự thật đã thành một nước tự do, độc lập"?',
    answer: '- Khẳng định độc lập không chỉ là một quyền lợi trừu tượng hay mục tiêu phấn đấu trên văn bản mà đã trở thành một "sự thật lịch sử hiển nhiên".\n- Sự thật ấy được kết tinh bằng máu xương, sự hy sinh và cuộc chiến đấu kiên cường của nhân dân ta giành lại từ tay phát xít Nhật.',
    guide: 'Giải thích được tính hiện thực lịch sử và giá trị xương máu dân tộc: 1.0 điểm.',
    points: 1.0,
    linkedPart: 'partIII'
  },
  {
    id: 'tn-q-4',
    code: 'Câu 4 (Nghị luận xã hội)',
    type: 'nl_xa_hoi',
    level: 'VD',
    skill: 'Liên hệ',
    passageSnippet: 'Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!',
    question: 'Từ lời thề giữ vững độc lập trong bản Tuyên ngôn, hãy viết một đoạn văn khoảng 200 chữ bàn về trách nhiệm của thế hệ trẻ hôm nay trong việc giữ gìn chủ quyền quốc gia và xây dựng đất nước.',
    answer: 'Yêu cầu đoạn văn:\n- Mở đoạn: Dẫn dắt lời thề độc lập thiêng liêng ngày 2/9/1945.\n- Thân đoạn:\n  + Bàn luận về trách nhiệm của thanh niên trong thời bình: ra sức học tập, rèn đức luyện tài, làm chủ khoa học công nghệ, bảo vệ chủ quyền biển đảo và không gian mạng.\n  + Dẫn chứng người trẻ cống hiến thực tiễn.\n  + Phê phán lối sống thờ ơ, thiếu trách nhiệm.\n- Kết đoạn: Lời hứa hành động của bản thân.',
    guide: 'Chấm theo Rubric đánh giá đoạn văn nghị luận xã hội (2.0 điểm).',
    points: 2.0,
    linkedPart: 'partIV'
  },
  {
    id: 'tn-q-5',
    code: 'Câu 5 (Nghị luận văn học)',
    type: 'nl_van_hoc',
    level: 'VD',
    skill: 'Sáng tạo',
    passageSnippet: 'Phân tích nghệ thuật lập luận chính luận bậc thầy của Chủ tịch Hồ Chí Minh trong bản Tuyên ngôn Độc lập.',
    question: 'Phân tích nghệ thuật lập luận mẫu mực và giàu sức chiến đấu của Chủ tịch Hồ Chí Minh trong bản "Tuyên ngôn Độc lập".',
    answer: 'Dàn ý phân tích:\n1. Mở bài: Giới thiệu Hồ Chí Minh, kiệt tác chính luận Tuyên ngôn Độc lập và nghệ thuật lập luận đỉnh cao.\n2. Thân bài:\n   - Cơ sở pháp lý: Mượn lời tuyên ngôn Mỹ, Pháp để tạo thế đứng quốc tế vững chãi; phát triển sáng tạo "suy rộng ra".\n   - Cơ sở thực tiễn: Lập luận đanh thép qua bản cáo trạng tội ác thực dân Pháp; điệp từ "chúng", dẫn chứng xác thực về kinh tế, chính trị, đạo đức.\n   - Nghệ thuật dùng từ và câu: Câu văn trùng điệp, đanh thép, giàu tính chiến đấu và âm hưởng hùng hồn.\n   - Lời tuyên bố độc lập: Dứt khoát, trang trọng, kết tinh ý chí toàn dân tộc.\n3. Kết bài: Khẳng định bản Tuyên ngôn là mẫu mực muôn đời của văn chính luận cách mạng Việt Nam.',
    guide: 'Chấm theo khung Rubric bài văn nghị luận văn học chuẩn GDPT 2018 (4.0 điểm).',
    points: 4.0,
    linkedPart: 'partIV'
  }
];

// =========================================================================
// 17. ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991 - TUYÊN NGÔN ĐỘC LẬP
// =========================================================================
export const tuyenNgonExam7991: Exam7991Data = {
  examHeader: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KỲ HỌC KỲ I - NGỮ VĂN 12',
    duration: '90 phút (Không kể thời gian phát đề)',
    examCode: 'MÃ ĐỀ: 303'
  },
  passageRef: `ĐỌC NGỮ LIỆU SAU VÀ THỰC HIỆN CÁC YÊU CẦU:
"Bởi thế cho nên, chúng tôi, lâm thời Chính phủ của nước Việt Nam mới, đại biểu cho toàn dân Việt Nam, tuyên bố thoát ly hẳn quan hệ với Pháp, xóa bỏ hết các hiệp ước mà Pháp đã ký về nước Việt Nam, xóa bỏ tất cả mọi đặc quyền của Pháp trên đất nước Việt Nam.
Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!"
(Trích "Tuyên ngôn Độc lập" - Hồ Chí Minh, SGK Ngữ văn 12)`,
  partI: [
    {
      id: 'tn-p1-1',
      code: 'Câu 1',
      level: 'NB',
      question: 'Bản "Tuyên ngôn Độc lập" được Chủ tịch Hồ Chí Minh đọc tại đâu vào ngày 2/9/1945?',
      options: {
        A: 'Quảng trường Ba Đình, Hà Nội',
        B: 'Nhà hát Lớn Hà Nội',
        C: 'Bến Nhà Rồng, Sài Gòn',
        D: 'Chiến khu Việt Bắc'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Bản Tuyên ngôn được Bác đọc trước quốc dân đồng bào tại Quảng trường Ba Đình lịch sử.'
    },
    {
      id: 'tn-p1-2',
      code: 'Câu 2',
      level: 'NB',
      question: 'Văn kiện chính trị nào của nước Mỹ năm 1776 được Hồ Chí Minh trích dẫn trong phần mở đầu?',
      options: {
        A: 'Tuyên ngôn Độc lập của nước Mỹ',
        B: 'Hiến pháp Hợp chúng quốc Hoa Kỳ',
        C: 'Diễn văn Gettysburg',
        D: 'Đạo luật Nhân quyền'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Bác trích dẫn câu mở đầu bản Tuyên ngôn Độc lập năm 1776 của nước Mỹ.'
    },
    {
      id: 'tn-p1-3',
      code: 'Câu 3',
      level: 'NB',
      question: 'Bản Tuyên ngôn Nhân quyền và Dân quyền được Hồ Chí Minh trích dẫn ra đời trong cuộc cách mạng nào?',
      options: {
        A: 'Cách mạng Pháp năm 1791',
        B: 'Cách mạng Tháng Mười Nga năm 1917',
        C: 'Cách mạng Tân Hợi Trung Quốc năm 1911',
        D: 'Cách mạng Tư sản Anh thế kỷ XVII'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Trích từ bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1791.'
    },
    {
      id: 'tn-p1-4',
      code: 'Câu 4',
      level: 'NB',
      question: 'Thực dân Pháp đã cai trị đất nước ta trong khoảng thời gian bao lâu trước năm 1945?',
      options: {
        A: 'Hơn tám mươi năm',
        B: 'Gần năm mươi năm',
        C: 'Hơn một trăm năm',
        D: 'Hai mươi năm'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Văn bản viết: "Thế mà hơn tám mươi năm nay, bọn thực dân Pháp lợi dụng lá cờ tự do, bình đẳng, bác ái...".'
    },
    {
      id: 'tn-p1-5',
      code: 'Câu 5',
      level: 'NB',
      question: 'Mùa thu năm nào phát xít Nhật đến xâm lăng Đông Dương khiến thực dân Pháp quỳ gối đầu hàng?',
      options: {
        A: 'Mùa thu năm 1940',
        B: 'Mùa thu năm 1939',
        C: 'Mùa thu năm 1941',
        D: 'Mùa thu năm 1945'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Văn bản viết: "Mùa thu năm 1940, phát xít Nhật đến xâm lăng Đông Dương, thực dân Pháp quỳ gối đầu hàng...".'
    },
    {
      id: 'tn-p1-6',
      code: 'Câu 6',
      level: 'NB',
      question: 'Trong 5 năm chiếm đóng, thực dân Pháp đã bán nước ta cho phát xít Nhật mấy lần?',
      options: {
        A: 'Hai lần',
        B: 'Một lần',
        C: 'Ba lần',
        D: 'Bốn lần'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Văn bản khẳng định: "Trong năm năm, chúng đã bán nước ta hai lần cho Nhật".'
    },
    {
      id: 'tn-p1-7',
      code: 'Câu 7',
      level: 'NB',
      question: 'Vị vua cuối cùng của chế độ phong kiến Việt Nam đã thoái vị được nhắc đến trong văn bản là ai?',
      options: {
        A: 'Vua Bảo Đại',
        B: 'Vua Khải Định',
        C: 'Vua Hàm Nghi',
        D: 'Vua Duy Tân'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Câu văn: "Pháp chạy, Nhật hàng, vua Bảo Đại thoái vị".'
    },
    {
      id: 'tn-p1-8',
      code: 'Câu 8',
      level: 'NB',
      question: 'Văn bản "Tuyên ngôn Độc lập" thuộc thể loại văn học nào dưới đây?',
      options: {
        A: 'Văn chính luận (nghị luận chính trị - xã hội)',
        B: 'Văn xuôi tự sự',
        C: 'Kí sự lịch sử',
        D: 'Tùy bút'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Tuyên ngôn Độc lập là một kiệt tác văn chính luận mẫu mực của nền văn học Việt Nam.'
    },
    {
      id: 'tn-p1-9',
      code: 'Câu 9',
      level: 'TH',
      question: 'Hồ Chí Minh đã phát triển sáng tạo điều gì từ tuyên ngôn của Mỹ và Pháp?',
      options: {
        A: 'Từ quyền bình đẳng cá nhân con người phát triển thành quyền độc lập tự quyết của các dân tộc',
        B: 'Bổ sung thêm quyền tự do thương mại quốc tế',
        C: 'Đòi hỏi sự hỗ trợ vũ khí từ các cường quốc đồng minh',
        D: 'Tuyên bố quyền kiểm soát toàn bộ khu vực Đông Nam Á'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Cụm từ "Suy rộng ra" đã nâng quyền con người cá nhân thành quyền tự quyết thiêng liêng của các dân tộc.'
    },
    {
      id: 'tn-p1-10',
      code: 'Câu 10',
      level: 'TH',
      question: 'Luận điểm nào chứng minh rõ nhất nhân dân Việt Nam lấy lại đất nước từ tay Nhật chứ không phải từ tay Pháp?',
      options: {
        A: 'Pháp đã đầu hàng và bỏ chạy trước Nhật, Việt Minh lãnh đạo toàn dân đánh đổ phát xít Nhật lập nên chính quyền mới',
        B: 'Pháp đã ký hiệp ước trao trả đất nước cho Việt Nam từ trước năm 1940',
        C: 'Nhật đã tự nguyện trao trả chính quyền cho nhân dân ta',
        D: 'Các nước Đồng minh đã chỉ định Việt Nam tiếp quản đất nước'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Pháp quỳ gối đầu hàng rước Nhật, nhân dân ta đứng lên đánh đuổi phát xít Nhật giành lại non sông.'
    },
    {
      id: 'tn-p1-11',
      code: 'Câu 11',
      level: 'TH',
      question: 'Tác dụng của các điệp từ "xóa bỏ", "thoát ly" trong đoạn tuyên bố độc lập là gì?',
      options: {
        A: 'Thể hiện thái độ dứt khoát, kiên quyết chấm dứt hoàn toàn ách thống trị thực dân trên mọi phương diện',
        B: 'Thể hiện sự tiếc nuối mối quan hệ ngoại giao lâu năm với Pháp',
        C: 'Mong muốn đàm phán chia sẻ quyền lợi kinh tế với thực dân Pháp',
        D: 'Tuyên bố tạm thời đình chiến trong thời gian ngắn'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Khẳng định ý chí sắt đá, dứt khoát chấm dứt mọi ràng buộc nô lệ với thực dân Pháp.'
    },
    {
      id: 'tn-p1-12',
      code: 'Câu 12',
      level: 'TH',
      question: 'Nét đặc sắc nổi bật trong nghệ thuật lập luận của Chủ tịch Hồ Chí Minh là gì?',
      options: {
        A: 'Lập luận chặt chẽ, chứng cứ không ai chối cãi được, câu văn đanh thép và giàu tính hùng biện',
        B: 'Sử dụng nhiều hình ảnh hư cấu bay bổng và cảm xúc lãng mạn',
        C: 'Sử dụng lối văn biền ngẫu cổ điển với nhiều điển tích điển cố phức tạp',
        D: 'Châm biếm hài hước nhẹ nhàng không mang tính đối kháng'
      },
      correctAnswer: 'A',
      points: 0.25,
      explanation: 'Lập luận sắc bén, luận cứ xác thực, lý lẽ đanh thép và âm hưởng hào hùng chấn động.'
    }
  ],
  partII: [
    {
      id: 'tn-p2-1',
      code: 'Câu 1 (Đúng/Sai)',
      level: 'TH',
      stem: 'Đọc đoạn trích lời tuyên bố ở phần kết Tuyên ngôn Độc lập. Xác định tính Đúng / Sai của các nhận định sau:',
      statements: [
        {
          subId: 'a',
          text: 'Chính phủ lâm thời tuyên bố tiếp tục duy trì các hiệp ước có lợi do Pháp ký kết trước đây.',
          isCorrect: false,
          explanation: 'Bác tuyên bố xóa bỏ tất cả các hiệp ước và đặc quyền mà Pháp đã ký về nước Việt Nam.'
        },
        {
          subId: 'b',
          text: 'Văn bản khẳng định nền độc lập tự do của nước Việt Nam đã thành một sự thật lịch sử hiển nhiên.',
          isCorrect: true,
          explanation: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập".'
        },
        {
          subId: 'c',
          text: 'Toàn thể dân tộc Việt Nam sẵn sàng đem tất cả tinh thần và lực lượng, tính mạng và của cải để bảo vệ nền độc lập.',
          isCorrect: true,
          explanation: 'Lời thề son sắt thể hiện ý chí quyết tử cho Tổ quốc quyết sinh của toàn thể quốc dân.'
        },
        {
          subId: 'd',
          text: 'Bản tuyên ngôn chỉ mang ý nghĩa đối nội với nhân dân trong nước mà không nhằm vào các thế lực quốc tế.',
          isCorrect: false,
          explanation: 'Bản Tuyên ngôn hướng đến cả nhân dân trong nước, nhân dân thế giới và trực tiếp cảnh báo các thế lực ngoại bang.'
        }
      ],
      points: 1.0
    },
    {
      id: 'tn-p2-2',
      code: 'Câu 2 (Đúng/Sai)',
      level: 'VD',
      stem: 'Đánh giá về giá trị lịch sử và nghệ thuật của tác phẩm "Tuyên ngôn Độc lập". Xác định tính Đúng / Sai của các nhận định sau:',
      statements: [
        {
          subId: 'a',
          text: 'Việc trích dẫn tuyên ngôn của Mỹ và Pháp là minh chứng cho tài nghệ sử dụng vũ khí tư tưởng của kẻ thù để đánh bại kẻ thù.',
          isCorrect: true,
          explanation: 'Dùng chính chân lý của đối phương để chặn đứng dã tâm tái xâm lược của chúng.'
        },
        {
          subId: 'b',
          text: 'Bản Tuyên ngôn thể hiện sâu sắc tinh thần nhân đạo khi nhấn mạnh nhân dân ta đã khoan hồng với kẻ thù bại trận.',
          isCorrect: true,
          explanation: 'Việt Minh đã giúp nhiều người Pháp chạy qua biên thùy, bảo vệ tính mạng và tài sản cho họ.'
        },
        {
          subId: 'c',
          text: 'Tuyên ngôn Độc lập là một văn bản thuần túy hành chính khô khan, không có giá trị văn học nghệ thuật.',
          isCorrect: false,
          explanation: 'Tuyên ngôn Độc lập là áng văn chính luận kiệt xuất, giàu cảm xúc, nhịp điệu và hình tượng.'
        },
        {
          subId: 'd',
          text: 'Tác phẩm đã khai sinh ra nước Việt Nam Dân chủ Cộng hòa và mở ra kỷ nguyên mới cho dân tộc.',
          isCorrect: true,
          explanation: 'Là văn kiện lập quốc vĩ đại nhất của lịch sử hiện đại Việt Nam.'
        }
      ],
      points: 1.0
    }
  ],
  partIII: [
    {
      id: 'tn-p3-1',
      code: 'Câu 1',
      level: 'TH',
      question: 'Tên căn nhà phố cổ Hà Nội nơi Bác Hồ đã soạn thảo bản Tuyên ngôn Độc lập là số mấy phố Hàng Ngang?',
      correctAnswer: '48 (hoặc số 48 Hàng Ngang)',
      points: 0.5,
      explanation: 'Bác khởi thảo Tuyên ngôn Độc lập tại ngôi nhà số 48 phố Hàng Ngang của nhà tư sản yêu nước Trịnh Văn Bô.'
    },
    {
      id: 'tn-p3-2',
      code: 'Câu 2',
      level: 'TH',
      question: 'Từ ngữ nào gồm 3 tiếng được Hồ Chí Minh dùng để khái quát bản chất của bản Tuyên ngôn Nhân quyền Pháp năm 1791 ("Đó là những... không ai chối cãi được")?',
      correctAnswer: 'lẽ phải (hoặc những lẽ phải)',
      points: 0.5,
      explanation: 'Nguyên văn Bác viết: "Đó là những lẽ phải không ai chối cãi được".'
    },
    {
      id: 'tn-p3-3',
      code: 'Câu 3',
      level: 'VD',
      question: 'Chế độ chính trị mới nào được nhân dân ta lập nên sau khi đánh đổ chế độ quân chủ phong kiến mấy mươi thế kỷ?',
      correctAnswer: 'Dân chủ Cộng hòa',
      points: 0.5,
      explanation: 'Lập nên nước Việt Nam Dân chủ Cộng hòa.'
    },
    {
      id: 'tn-p3-4',
      code: 'Câu 4',
      level: 'VD',
      question: 'Hai yếu tố vật chất tối cao mà toàn thể dân tộc Việt Nam thề quyết đem ra để giữ vững nền độc lập cùng với "tinh thần và lực lượng" là gì?',
      correctAnswer: 'tính mạng và của cải',
      points: 0.5,
      explanation: 'Lời thề son sắt: "quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải...".'
    }
  ],
  partIV: [
    {
      id: 'tn-p4-1',
      code: 'Câu 1 (Tự luận - Nghị luận văn học)',
      level: 'VD',
      question: 'Phân tích nghệ thuật lập luận mẫu mực của Chủ tịch Hồ Chí Minh trong đoạn trích Tuyên ngôn Độc lập ở đề bài. Từ đó, làm sáng tỏ ý chí quật cường và khát vọng tự do cháy bỏng của dân tộc ta.',
      rubric: [
        {
          step: '1. Đảm bảo cấu trúc bài văn nghị luận; xác định đúng vấn đề nghị luận.',
          points: 0.5
        },
        {
          step: '2. Phân tích lời tuyên bố thoát ly hoàn toàn quan hệ thực dân và xóa bỏ mọi đặc quyền của Pháp.',
          points: 0.75
        },
        {
          step: '3. Phân tích luận điểm khẳng định quyền tự do độc lập là sự thật lịch sử hiển nhiên được đánh đổi bằng máu xương.',
          points: 0.75
        },
        {
          step: '4. Phân tích lời thề son sắt của toàn thể dân tộc: đem tinh thần, lực lượng, tính mạng, của cải bảo vệ độc lập.',
          points: 0.5
        },
        {
          step: '5. Nhận xét phong cách chính luận Hồ Chí Minh: ngắn gọn, sắc sảo, đanh thép, mang âm hưởng sử thi tráng lệ. Diễn đạt mượt mà.',
          points: 0.5
        }
      ],
      points: 3.0
    }
  ]
};

// =========================================================================
// 18. RUBRIC CHẤM BÀI NGHỊ LUẬN - TUYÊN NGÔN ĐỘC LẬP
// =========================================================================
export const tuyenNgonRubric: RubricData = {
  id: 'rubric-tuyen-ngon',
  title: 'Rubric Chấm Điểm Bài Văn Nghị Luận Tác Phẩm Chính Luận: "Tuyên ngôn Độc lập" (Thang 10.0)',
  essayType: 'nl_van_hoc',
  totalPoints: 10.0,
  criteria: [
    {
      id: 'tn-crit-1',
      name: 'Xác định vấn đề nghị luận',
      weight: 10,
      maxPoints: 1.0,
      description: 'Xác định đúng nghệ thuật lập luận chính luận và ý chí độc lập của dân tộc trong Tuyên ngôn Độc lập.',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Xác định chính xác tuyệt đối, mở bài hào hùng, dẫn dắt tự nhiên vào vị thế văn kiện lịch sử.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Xác định được vấn đề, mở bài đủ ý nhưng còn khuôn sáo.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Xác định chưa rõ hoặc lệch trọng tâm đề bài.' }
      ]
    },
    {
      id: 'tn-crit-2',
      name: 'Bố cục & Cấu trúc bài viết',
      weight: 10,
      maxPoints: 1.0,
      description: 'Bố cục 3 phần rõ ràng, chuyển đoạn logic, lập luận có lớp lang chặt chẽ.',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Bố cục hoàn hảo, liên kết câu và đoạn mẫu mực như chính văn phong chính luận của Bác.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Đủ 3 phần nhưng chuyển ý giữa các đoạn còn gượng ép.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Thiếu kết bài hoặc luận điểm lộn xộn, thiếu mạch lạc.' }
      ]
    },
    {
      id: 'tn-crit-3',
      name: 'Hệ thống Luận điểm & Phân tích nghệ thuật chính luận',
      weight: 25,
      maxPoints: 2.5,
      description: 'Phân tích sâu sắc 3 khía cạnh: Lập trường pháp lý quốc tế, Bản cáo trạng tội ác thực tiễn, Lời tuyên ngôn và lời thề giữ nước.',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Luận điểm toàn diện, phân tích sắc sảo tư duy chiến lược và nghệ thuật lập luận "gậy ông đập lưng ông" của Bác.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Nêu đủ các ý cơ bản nhưng phân tích nghệ thuật lập luận còn dừng ở mức liệt kê chi tiết.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Luận điểm sơ sài, chỉ diễn xuôi lại văn bản mà không phân tích thao tác lập luận.' }
      ]
    },
    {
      id: 'tn-crit-4',
      name: 'Dẫn chứng & Phân tích ngôn từ chính luận',
      weight: 25,
      maxPoints: 2.5,
      description: 'Khai thác chính xác các từ ngữ đắt giá: "suy rộng ra", "lẽ phải không ai chối cãi được", "sự thật", "quyết đem tất cả".',
      levels: [
        { label: 'Xuất sắc', score: 2.5, descriptor: 'Trích dẫn chính xác tuyệt đối, phân tích tinh tế sức mạnh của ngôn từ chính luận đanh thép, giàu nhạc điệu.' },
        { label: 'Đạt', score: 1.75, descriptor: 'Có trích dẫn và phân tích nhưng chưa khai thác hết giá trị của các từ khóa then chốt.' },
        { label: 'Cần cố gắng', score: 0.75, descriptor: 'Trích dẫn sai câu chữ của Bác, thiếu dẫn chứng cụ thể.' }
      ]
    },
    {
      id: 'tn-crit-5',
      name: 'Diễn đạt, Dùng từ & Chuẩn mực văn phong',
      weight: 15,
      maxPoints: 1.5,
      description: 'Hành văn trang trọng, lập luận khúc chiết, giàu nhiệt huyết công dân, không sai chính tả.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Hành văn hùng hồn, chuẩn mực, từ ngữ chính luận phong phú, câu văn mạch lạc giàu sức thuyết phục.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Rõ ý, có một vài lỗi diễn đạt nhỏ nhưng không ảnh hưởng mạch tư duy.' },
        { label: 'Cần cố gắng', score: 0.5, descriptor: 'Diễn đạt lủng củng, câu văn vụng về, dùng từ sai sắc thái chính trị - lịch sử.' }
      ]
    },
    {
      id: 'tn-crit-6',
      name: 'Sáng tạo & Đánh giá tầm vóc thời đại',
      weight: 15,
      maxPoints: 1.5,
      description: 'Khái quát được ý nghĩa thời đại của bản Tuyên ngôn đối với phong trào giải phóng dân tộc thế giới và bài học bảo vệ chủ quyền ngày nay.',
      levels: [
        { label: 'Xuất sắc', score: 1.5, descriptor: 'Có tầm nhìn rộng lớn, kết nối sâu sắc tư tưởng Hồ Chí Minh với công cuộc bảo vệ độc lập, chủ quyền biển đảo thời nay.' },
        { label: 'Đạt', score: 1.0, descriptor: 'Có liên hệ thực tiễn nhưng còn chung chung, mang tính khẩu hiệu.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Chưa có ý thức liên hệ thực tiễn mở rộng.' }
      ]
    }
  ]
};

// =========================================================================
// 19. GẮN KẾT CÁC GÓI TÀI LIỆU VÀO TỪNG BÀI DẠY (PRESET LINKING)
// =========================================================================
tayTienLesson.khbd = literatureKhbd5512;
tayTienLesson.slides = literatureSlides;
tayTienLesson.questions = literatureQuestions;
tayTienLesson.exam = literatureExam7991;
tayTienLesson.rubric = literatureRubric;

voNhatLesson.khbd = voNhatKhbd5512;
voNhatLesson.slides = voNhatSlides;
voNhatLesson.questions = voNhatQuestions;
voNhatLesson.exam = voNhatExam7991;
voNhatLesson.rubric = voNhatRubric;

tuyenNgonDocLapLesson.khbd = tuyenNgonKhbd5512;
tuyenNgonDocLapLesson.slides = tuyenNgonSlides;
tuyenNgonDocLapLesson.questions = tuyenNgonQuestions;
tuyenNgonDocLapLesson.exam = tuyenNgonExam7991;
tuyenNgonDocLapLesson.rubric = tuyenNgonRubric;

export const literatureLessonsPreset: LiteratureLesson[] = [
  tayTienLesson,
  voNhatLesson,
  tuyenNgonDocLapLesson
];


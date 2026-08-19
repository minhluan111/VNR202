import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  Flag,
  Gamepad2,
  Gauge,
  Lightbulb,
  Menu,
  PackageOpen,
  RotateCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react';

const milestones = [
  {
    year: '1951',
    date: 'Tháng 02',
    title: 'Kiện toàn tổ chức',
    tag: 'Đại hội II',
    text: 'Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam, thống nhất đường lối, mục tiêu và lực lượng cho cuộc kháng chiến.',
    accent: 'Tổ chức',
  },
  {
    year: '1952',
    date: 'Trong năm',
    title: 'Củng cố lực lượng',
    tag: 'Chỉnh Đảng · Chỉnh quân',
    text: 'Năng lực lãnh đạo, tư tưởng và sức chiến đấu của lực lượng vũ trang được nâng cao; hậu phương kháng chiến được củng cố toàn diện.',
    accent: 'Nội lực',
  },
  {
    year: '1953',
    date: 'Tháng 09',
    title: 'Chủ động tạo thế trận',
    tag: 'Đông–Xuân 1953–1954',
    text: 'Tiến công vào những hướng quan trọng nơi địch tương đối yếu, buộc quân Pháp phân tán lực lượng cơ động chiến lược ra năm nơi.',
    accent: 'Chiến lược',
  },
  {
    year: '1954',
    date: '13.03 — 07.05',
    title: 'Điện Biên Phủ toàn thắng',
    tag: '56 ngày đêm',
    text: 'Ba đợt tiến công liên tiếp làm sụp đổ tập đoàn cứ điểm, đánh bại hoàn toàn Kế hoạch Nava và tạo ưu thế trên bàn đàm phán.',
    accent: 'Thắng lợi',
  },
];

const phases = [
  {
    id: 1,
    dates: '13 — 17.03',
    title: 'Phá vỡ cửa ngõ phía Bắc',
    places: 'Him Lam · Độc Lập · Bản Kéo',
    text: 'Quân ta tiêu diệt Him Lam, Độc Lập; buộc Bản Kéo đầu hàng, đập tan hoàn toàn phân khu phía Bắc.',
  },
  {
    id: 2,
    dates: '30.03 — 30.04',
    title: 'Siết chặt vòng vây',
    places: 'A1 · C1 · D1 · E1',
    text: 'Tiến công các cứ điểm phía đông, đào chiến hào tiến sát, chia cắt các phân khu và khống chế sân bay Mường Thanh.',
  },
  {
    id: 3,
    dates: '01 — 07.05',
    title: 'Tổng công kích',
    places: 'A1 · Mường Thanh',
    text: 'Sau khi tiêu diệt A1, quân ta tổng tiến công. 17 giờ 30 ngày 07.05, sở chỉ huy địch bị chiếm, tướng De Castries bị bắt sống.',
  },
];

const lessons = [
  {
    icon: Target,
    number: '01',
    title: 'Hoạch định chiến lược',
    text: 'Chủ động tạo lập thế trận, khai thác điểm yếu và buộc đối phương phân tán nguồn lực.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Thích ứng & quản trị rủi ro',
    text: 'Dũng cảm điều chỉnh kế hoạch khi thực tế thay đổi; đặt mục tiêu chắc thắng lên trên tốc độ.',
  },
  {
    icon: PackageOpen,
    number: '03',
    title: 'Quản trị chuỗi cung ứng',
    text: 'Một chiến lược đúng chỉ thành công khi có hệ thống hậu cần đủ mạnh để biến kế hoạch thành hành động.',
  },
  {
    icon: Users,
    number: '04',
    title: 'Gắn kết lợi ích',
    text: 'Khi lợi ích của người dân gắn với mục tiêu chung, động lực và sức mạnh xã hội được phát huy cao nhất.',
  },
];

const pageItems = [
  ['presentation', 'Thuyết trình', BookOpen],
  ['quiz', 'Quiz', BrainCircuit],
  ['game', 'Game', Gamepad2],
];

const presentationChapters = [
  {
    id: 'boi-canh',
    number: '01',
    period: '1949 — 1951',
    title: 'Bối cảnh và yêu cầu mới',
    label: 'Tạo tiền đề',
    paragraphs: [
      'Năm 1951, cách mạng Việt Nam bước vào một giai đoạn phát triển mới. Sau thắng lợi của Cách mạng Trung Quốc năm 1949 và Chiến dịch Biên giới năm 1950, căn cứ địa Việt Bắc được nối liền với các nước xã hội chủ nghĩa, tạo điều kiện thuận lợi để Việt Nam tranh thủ sự ủng hộ quốc tế. Tuy nhiên, Mỹ cũng tăng cường viện trợ và can thiệp ngày càng sâu vào chiến tranh Đông Dương, giúp Pháp kéo dài cuộc chiến.',
      'Bối cảnh đó đặt ra yêu cầu phải kiện toàn tổ chức, tăng cường vai trò lãnh đạo của Đảng và xác định đường lối cách mạng phù hợp với từng nước Đông Dương.',
    ],
    quote: 'Kiện toàn tổ chức · Tăng cường lãnh đạo · Xác định đúng đường lối',
  },
  {
    id: 'dai-hoi-ii',
    number: '02',
    period: '02.1951',
    title: 'Đại hội II — thống nhất sức mạnh',
    label: 'Tổ chức',
    paragraphs: [
      'Tháng 2 năm 1951, Đại hội đại biểu toàn quốc lần thứ II của Đảng được tổ chức tại xã Vinh Quang, huyện Chiêm Hóa, tỉnh Tuyên Quang. Đại hội có 158 đại biểu chính thức, đại diện cho hơn 766.000 đảng viên.',
      'Đại hội quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam; bầu Chủ tịch Hồ Chí Minh làm Chủ tịch Đảng và đồng chí Trường Chinh làm Tổng Bí thư.',
      'Đại hội cũng thông qua Chính cương của Đảng Lao động Việt Nam, xác định xã hội Việt Nam có ba tính chất: “dân chủ nhân dân, một phần thuộc địa và nửa phong kiến”. Đối tượng của cách mạng là chủ nghĩa đế quốc xâm lược và phong kiến phản động. Trong đó, nhiệm vụ giải phóng dân tộc được đặt lên hàng đầu.',
      'Động lực của cách mạng bao gồm công nhân, nông dân, tiểu tư sản và tư sản dân tộc; nền tảng là liên minh giữa công nhân, nông dân và lao động trí óc. Như vậy, Đại hội II đã tạo ra sự thống nhất về tổ chức, mục tiêu và lực lượng, làm cơ sở để huy động sức mạnh của toàn dân cho cuộc kháng chiến.',
    ],
    stats: [
      ['158', 'đại biểu chính thức'],
      ['766.000+', 'đảng viên được đại diện'],
      ['03', 'tính chất của xã hội Việt Nam'],
    ],
  },
  {
    id: 'hau-phuong',
    number: '03',
    period: '1952 — 1953',
    title: 'Củng cố hậu phương kháng chiến',
    label: 'Nguồn lực',
    paragraphs: [
      'Từ đường lối đó, hậu phương kháng chiến được củng cố toàn diện. Năm 1952, Đảng tiến hành cuộc vận động “chỉnh Đảng, chỉnh quân”, nhằm nâng cao năng lực lãnh đạo, củng cố tư tưởng và tăng cường sức chiến đấu của lực lượng vũ trang.',
      'Cuối năm 1953, Quốc hội thông qua Luật Cải cách ruộng đất. Chính sách này nhằm đáp ứng yêu cầu ruộng đất của nông dân, bồi dưỡng sức dân, tăng cường khối liên minh công – nông và động viên đông đảo nông dân tham gia kháng chiến. Tuy nhiên, trong quá trình thực hiện về sau, cải cách ruộng đất cũng mắc phải những sai lầm cần được nhìn nhận khách quan.',
    ],
    quote: 'Bồi dưỡng sức dân, củng cố tư tưởng, tăng cường sức chiến đấu.',
  },
  {
    id: 'pha-nava',
    number: '04',
    period: '05 — 09.1953',
    title: 'Phá thế tập trung của Kế hoạch Nava',
    label: 'Chiến lược',
    paragraphs: [
      'Về phía Pháp, tháng 5 năm 1953, Chính phủ Pháp cử tướng Henri Navarre sang Đông Dương và đề ra Kế hoạch Nava, với tham vọng xoay chuyển cục diện chiến tranh trong vòng 18 tháng. Pháp tập trung 44 trong tổng số 84 tiểu đoàn cơ động tại đồng bằng Bắc Bộ, hình thành một lực lượng tiến công chiến lược mạnh.',
      'Để phá thế tập trung quân của Pháp, tháng 9 năm 1953, Bộ Chính trị đề ra kế hoạch tác chiến Đông–Xuân 1953–1954 với phương châm: tập trung lực lượng tiến công vào những hướng quan trọng mà địch tương đối yếu, buộc chúng phải phân tán quân để đối phó.',
      'Quân ta lần lượt tiến công trên các hướng Tây Bắc, Trung Lào, Hạ Lào – Đông Bắc Campuchia, Bắc Tây Nguyên và Thượng Lào. Các hoạt động này buộc Pháp phải phân tán lực lượng cơ động chiến lược ra năm nơi: đồng bằng Bắc Bộ, Điện Biên Phủ, Sê-nô, Luông Pha-băng và Plây Cu.',
      'Như vậy, ý đồ tập trung lực lượng của Kế hoạch Nava bước đầu bị phá sản. Ta đã chủ động điều khiển chiến trường, buộc đối phương phải hành động theo thế trận do ta tạo ra.',
    ],
    stats: [
      ['18', 'tháng dự kiến của Kế hoạch Nava'],
      ['44/84', 'tiểu đoàn tập trung ở đồng bằng'],
      ['05', 'nơi Pháp buộc phải phân tán'],
    ],
  },
  {
    id: 'quyet-dinh',
    number: '05',
    period: '12.1953 — 01.1954',
    title: 'Điện Biên Phủ và quyết định lịch sử',
    label: 'Thích ứng',
    paragraphs: [
      'Trước các đòn tiến công của quân ta, Pháp cho quân nhảy dù chiếm Điện Biên Phủ và xây dựng nơi đây thành tập đoàn cứ điểm mạnh nhất Đông Dương, với khoảng 16.200 quân và 49 cứ điểm, được tổ chức thành ba phân khu.',
      'Tuy nhiên, Điện Biên Phủ cũng có một điểm yếu mang tính quyết định: nằm cô lập giữa vùng núi rừng Tây Bắc, cách xa hậu phương của Pháp và phụ thuộc chủ yếu vào hoạt động tiếp tế bằng đường hàng không, đặc biệt qua sân bay Mường Thanh.',
      'Ngày 6 tháng 12 năm 1953, Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ. Đại tướng Võ Nguyên Giáp được giao làm Tư lệnh kiêm Bí thư Đảng ủy Mặt trận.',
      'Bài học lớn nhất về khả năng thích ứng chiến lược trong chiến dịch là việc thay đổi phương châm tác chiến. Ban đầu, Bộ Chỉ huy dự kiến tiến công theo phương châm “đánh nhanh, giải quyết nhanh”. Tuy nhiên, khi nhận thấy lực lượng ta chưa được chuẩn bị đầy đủ, trong khi quân Pháp đã củng cố hệ thống phòng ngự ngày càng kiên cố, Đại tướng Võ Nguyên Giáp quyết định hoãn cuộc tiến công, kéo pháo ra và chuyển sang phương châm “đánh chắc, tiến chắc”.',
      'Đây là một quyết định khó khăn nhưng đúng đắn, thể hiện tinh thần tôn trọng thực tế và đặt mục tiêu chắc thắng lên hàng đầu. Nhờ đó, quân ta có thêm thời gian chuẩn bị lực lượng, xây dựng trận địa pháo và đào hệ thống chiến hào bao vây, từng bước tiến sát các cứ điểm, chia cắt các phân khu và khống chế sân bay Mường Thanh.',
    ],
    stats: [
      ['16.200', 'quân Pháp tại tập đoàn cứ điểm'],
      ['49', 'cứ điểm'],
      ['03', 'phân khu'],
    ],
    quote: 'Đánh chắc, tiến chắc.',
  },
  {
    id: 'ky-tich-hau-can',
    number: '06',
    period: '1953 — 1954',
    title: 'Kỳ tích hậu cần của toàn dân',
    label: 'Hậu phương',
    paragraphs: [
      'Về hậu cần, quân và dân ta đã tạo nên một kỳ tích. Hậu phương huy động khoảng 261.000 dân công, hơn 20.000 xe đạp thồ cùng hàng chục nghìn tấn lương thực, vũ khí và vật chất phục vụ chiến dịch. Các nguồn lực được vận chuyển qua hàng trăm kilômét đường rừng và đèo dốc trong điều kiện thời tiết, địa hình vô cùng khắc nghiệt.',
      'Điều đó cho thấy chiến thắng trên chiến trường không chỉ được tạo nên bởi lực lượng trực tiếp chiến đấu, mà còn bởi sự đóng góp của cả hậu phương và sức mạnh của chiến tranh nhân dân.',
    ],
    stats: [
      ['261.000', 'dân công'],
      ['20.000+', 'xe đạp thồ'],
      ['Hàng chục nghìn', 'tấn vật chất'],
    ],
  },
  {
    id: 'chien-dich-56-ngay',
    number: '07',
    period: '13.03 — 07.05.1954',
    title: '56 ngày đêm — ba đợt tiến công',
    label: 'Chiến dịch',
    paragraphs: [
      'Chiến dịch Điện Biên Phủ bắt đầu ngày 13 tháng 3 năm 1954, diễn ra trong 56 ngày đêm và được chia thành ba đợt tiến công:',
      'Đợt 1, từ ngày 13 đến 17 tháng 3: Quân ta tiêu diệt các cứ điểm Him Lam, Độc Lập, buộc cứ điểm Bản Kéo đầu hàng, đập tan phân khu phía Bắc.',
      'Đợt 2, từ ngày 30 tháng 3 đến ngày 30 tháng 4: Quân ta tiến công các cứ điểm phía đông phân khu trung tâm, trong đó có A1, C1, D1 và E1; đồng thời tiếp tục đào chiến hào, thắt chặt vòng vây và khống chế sân bay Mường Thanh.',
      'Đợt 3, từ ngày 1 đến ngày 7 tháng 5: Quân ta tổng công kích trên toàn mặt trận. Đêm ngày 6 rạng sáng ngày 7 tháng 5, quân ta tiêu diệt cứ điểm A1. Đến 17 giờ 30 phút ngày 7 tháng 5 năm 1954, quân ta chiếm sở chỉ huy của địch, bắt sống tướng De Castries cùng toàn bộ Bộ Tham mưu.',
      'Chiến thắng Điện Biên Phủ đã đập tan hoàn toàn Kế hoạch Nava, giáng đòn quyết định vào ý chí xâm lược của thực dân Pháp và tạo ưu thế quan trọng cho Việt Nam tại Hội nghị Giơ-ne-vơ.',
      'Ngày 21 tháng 7 năm 1954, các văn bản của Hiệp định Giơ-ne-vơ về Đông Dương được ký kết, công nhận các quyền dân tộc cơ bản của Việt Nam, Lào và Campuchia. Sau Hiệp định và quá trình quân Pháp rút khỏi miền Bắc, miền Bắc Việt Nam được hoàn toàn giải phóng, chuyển sang giai đoạn cách mạng mới.',
    ],
    stats: [
      ['56', 'ngày đêm'],
      ['03', 'đợt tiến công'],
      ['17:30', 'ngày 07.05.1954'],
    ],
  },
  {
    id: 'quan-tri',
    number: '08',
    period: 'Liên hệ hiện đại',
    title: 'Bốn bài học quản trị',
    label: 'Vận dụng',
    paragraphs: [
      'Từ quá trình dẫn đến thắng lợi năm 1954, có thể rút ra bốn bài học quản trị:',
      'Hoạch định chiến lược: Phải chủ động tạo lập thế trận, khai thác điểm yếu và buộc đối phương phân tán nguồn lực.',
      'Thích ứng và quản trị rủi ro: Khi điều kiện thực tế thay đổi, cần dũng cảm điều chỉnh kế hoạch. Việc chuyển từ “đánh nhanh, giải quyết nhanh” sang “đánh chắc, tiến chắc” là một ví dụ tiêu biểu.',
      'Quản trị chuỗi cung ứng: Một chiến lược đúng chỉ có thể được thực hiện khi có hệ thống hậu cần đủ mạnh. Logistics chính là mạch máu bảo đảm cho hoạt động trên chiến trường.',
      'Gắn kết lợi ích: Khi quyền lợi của người dân gắn với mục tiêu chung, sức mạnh và động lực xã hội sẽ được phát huy ở mức cao nhất.',
    ],
  },
  {
    id: 'ket-luan-day-du',
    number: '09',
    period: 'Kết luận',
    title: 'Sức mạnh tổng hợp tạo nên thắng lợi',
    label: 'Khẳng định',
    paragraphs: [
      'Thắng lợi năm 1954 là kết quả của sự tương tác chặt chẽ giữa ba yếu tố.',
      'Thứ nhất, Đại hội II và Chính cương năm 1951 đã kiện toàn tổ chức, thống nhất đường lối và xác định lực lượng cách mạng.',
      'Thứ hai, nghệ thuật chỉ đạo chiến lược trong Đông–Xuân 1953–1954 đã buộc quân Pháp phân tán lực lượng, làm phá sản bước đầu Kế hoạch Nava; còn quyết định chuyển sang “đánh chắc, tiến chắc” đã bảo đảm thắng lợi tại Điện Biên Phủ.',
      'Thứ ba, sức mạnh của hậu phương và khả năng huy động nguồn lực toàn dân đã cung cấp con người, lương thực, vũ khí và động lực tinh thần cho chiến trường.',
      'Có thể khái quát công thức của thắng lợi như sau:',
      'Tổ chức và đường lối đúng đắn + chiến lược quân sự chủ động, linh hoạt + nguồn lực hậu phương được huy động hiệu quả = Chiến thắng Điện Biên Phủ năm 1954.',
      'Vì vậy, Điện Biên Phủ không phải là một chiến thắng ngẫu nhiên hay riêng lẻ, mà là kết quả tất yếu của quá trình tích lũy, tổ chức và phát huy sức mạnh tổng hợp của toàn dân tộc dưới sự lãnh đạo của Đảng.',
    ],
    quote: 'Tổ chức đúng + Chiến lược linh hoạt + Hậu phương vững = Thắng lợi',
  },
];

const quizQuestions = [
  {
    question: 'Luận điểm cốt lõi về thắng lợi năm 1954 là gì?',
    options: [
      'Kết quả của một trận đánh bất ngờ',
      'Kết quả của sức mạnh quân sự đơn thuần',
      'Điểm kết tụ của tổ chức, chiến lược và nguồn lực toàn dân',
      'Hoàn toàn nhờ vào viện trợ quốc tế',
    ],
    correct: 2,
    explanation: 'Thắng lợi là kết quả của cả quá trình tích lũy sức mạnh tổng hợp trong giai đoạn 1951–1954.',
  },
  {
    question: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng diễn ra vào thời gian nào?',
    options: ['Tháng 2 năm 1951', 'Tháng 9 năm 1952', 'Tháng 5 năm 1953', 'Tháng 3 năm 1954'],
    correct: 0,
    explanation: 'Đại hội II diễn ra tháng 2 năm 1951 tại Chiêm Hóa, Tuyên Quang.',
  },
  {
    question: 'Mục tiêu chính của kế hoạch tác chiến Đông–Xuân 1953–1954 là gì?',
    options: [
      'Phòng thủ cố định tại Việt Bắc',
      'Buộc Pháp phân tán lực lượng để đối phó',
      'Tập trung toàn bộ lực lượng ở đồng bằng',
      'Chỉ tiến công tại Điện Biên Phủ',
    ],
    correct: 1,
    explanation: 'Ta tiến công những hướng quan trọng nơi địch tương đối yếu, phá thế tập trung của Kế hoạch Nava.',
  },
  {
    question: 'Điểm yếu quyết định của tập đoàn cứ điểm Điện Biên Phủ là gì?',
    options: [
      'Không có công sự phòng ngự',
      'Thiếu lực lượng bộ binh',
      'Bị cô lập và phụ thuộc tiếp tế đường không',
      'Không có sở chỉ huy',
    ],
    correct: 2,
    explanation: 'Điện Biên Phủ nằm xa hậu phương Pháp và phụ thuộc chủ yếu vào tiếp tế qua sân bay Mường Thanh.',
  },
  {
    question: 'Phương châm tác chiến cuối cùng tại Điện Biên Phủ là gì?',
    options: ['Đánh nhanh, thắng nhanh', 'Đánh chắc, tiến chắc', 'Vây điểm, diệt viện', 'Tiến công chớp nhoáng'],
    correct: 1,
    explanation: 'Quyết định chuyển sang “đánh chắc, tiến chắc” thể hiện sự tôn trọng thực tế và ưu tiên chắc thắng.',
  },
  {
    question: 'Khoảng bao nhiêu dân công được huy động phục vụ chiến dịch?',
    options: ['26.100', '126.000', '261.000', '621.000'],
    correct: 2,
    explanation: 'Khoảng 261.000 dân công cùng hơn 20.000 xe đạp thồ đã tạo nên kỳ tích hậu cần.',
  },
  {
    question: 'Chiến dịch Điện Biên Phủ kéo dài bao nhiêu ngày đêm?',
    options: ['36 ngày đêm', '46 ngày đêm', '56 ngày đêm', '66 ngày đêm'],
    correct: 2,
    explanation: 'Chiến dịch diễn ra từ ngày 13/3 đến ngày 7/5/1954, tổng cộng 56 ngày đêm.',
  },
  {
    question: 'Hiệp định Genève về Đông Dương được ký vào ngày nào?',
    options: ['7/5/1954', '21/7/1954', '2/9/1954', '10/10/1954'],
    correct: 1,
    explanation: 'Ngày 21/7/1954, các văn bản của Hiệp định Genève về Đông Dương được ký kết.',
  },
];

const gameScenarios = [
  {
    year: '1951',
    title: 'Kiện toàn bộ máy lãnh đạo',
    situation: 'Kháng chiến bước vào giai đoạn mới. Lực lượng phát triển nhưng cần một đường lối và tổ chức thống nhất.',
    choices: [
      { text: 'Tổ chức Đại hội II, thống nhất đường lối và lực lượng', effects: [25, 5, 0], best: true, result: 'Nền tảng tổ chức được củng cố, tạo sức mạnh cho toàn dân.' },
      { text: 'Giữ nguyên bộ máy và chỉ tập trung tuyển quân', effects: [-12, 4, -3], result: 'Quân số tăng nhưng thiếu sự thống nhất về mục tiêu và chỉ đạo.' },
      { text: 'Phân tán quyền chỉ huy về từng địa phương', effects: [-18, -5, 4], result: 'Các lực lượng khó phối hợp trên quy mô toàn chiến trường.' },
    ],
  },
  {
    year: '1953',
    title: 'Phá thế tập trung của Nava',
    situation: 'Pháp tập trung 44/84 tiểu đoàn cơ động ở đồng bằng Bắc Bộ, chuẩn bị một lực lượng tiến công mạnh.',
    choices: [
      { text: 'Đối đầu trực diện tại nơi quân Pháp mạnh nhất', effects: [-6, -20, -10], result: 'Ta bị cuốn vào thế trận do đối phương lựa chọn.' },
      { text: 'Tiến công các hướng quan trọng nơi địch tương đối yếu', effects: [0, 25, -5], best: true, result: 'Quân Pháp buộc phải phân tán ra năm nơi để đối phó.' },
      { text: 'Tạm dừng mọi hoạt động để bảo toàn lực lượng', effects: [-8, -12, 5], result: 'Đối phương có thêm thời gian hoàn tất kế hoạch tập trung quân.' },
    ],
  },
  {
    year: '01.1954',
    title: 'Quyết định trước giờ nổ súng',
    situation: 'Phòng ngự của Pháp đã kiên cố hơn dự kiến trong khi công tác chuẩn bị của ta chưa thật đầy đủ.',
    choices: [
      { text: 'Giữ kế hoạch đánh nhanh để không mất thời cơ', effects: [-5, -18, -8], result: 'Rủi ro tăng cao khi điều kiện thực tế đã thay đổi.' },
      { text: 'Kéo pháo ra, chuyển sang đánh chắc, tiến chắc', effects: [5, 25, -5], best: true, result: 'Có thêm thời gian chuẩn bị, xây dựng trận địa và bảo đảm chắc thắng.' },
      { text: 'Hủy chiến dịch và rút khỏi Tây Bắc', effects: [-12, -20, 8], result: 'Thế chủ động chiến lược bị đánh mất.' },
    ],
  },
  {
    year: '1954',
    title: 'Bài toán tiếp vận',
    situation: 'Hàng chục nghìn tấn vật chất phải vượt hàng trăm kilômét đường rừng, đèo dốc để đến mặt trận.',
    choices: [
      { text: 'Chỉ trông chờ phương tiện cơ giới hạng nặng', effects: [0, 0, -20], result: 'Địa hình hiểm trở khiến tuyến vận tải dễ đình trệ.' },
      { text: 'Huy động dân công và cải tiến xe đạp thồ', effects: [8, 0, 30], best: true, result: 'Sức dân và sáng kiến hậu cần tạo nên một kỳ tích tiếp vận.' },
      { text: 'Giảm mạnh quy mô lực lượng tại mặt trận', effects: [-5, -8, 6], result: 'Áp lực hậu cần giảm nhưng sức chiến đấu cũng suy yếu.' },
    ],
  },
  {
    year: '03—05.1954',
    title: 'Siết chặt tập đoàn cứ điểm',
    situation: 'Địch phụ thuộc vào sân bay Mường Thanh để tiếp tế và các phân khu vẫn còn khả năng hỗ trợ lẫn nhau.',
    choices: [
      { text: 'Đào chiến hào, chia cắt phân khu và khống chế sân bay', effects: [0, 18, 10], best: true, result: 'Vòng vây được siết chặt, nguồn tiếp tế của đối phương bị cắt đứt.' },
      { text: 'Chỉ tiến công chính diện bằng bộ binh', effects: [-4, -13, -12], result: 'Tổn thất tăng trong khi hệ thống phòng ngự vẫn còn liên kết.' },
      { text: 'Chờ đối phương tự rút khỏi cứ điểm', effects: [-8, -10, -5], result: 'Thời cơ chiến lược trôi qua và đối phương có thể được tăng viện.' },
    ],
  },
];

function SiteHeader({ current, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const choosePage = (page) => {
    setMenuOpen(false);
    navigate(page);
  };

  return (
    <>
      <header className={`topbar ${current !== 'presentation' ? 'inner-topbar' : ''}`}>
        <button className="brand" onClick={() => choosePage('presentation')} aria-label="Về trang thuyết trình">
          <span className="brand-mark"><Flag size={17} fill="currentColor" /></span>
          <span><strong>Đường tới Điện Biên Phủ</strong><small>Học · Hiểu · Tương tác</small></span>
        </button>
        <nav className="desktop-nav page-nav" aria-label="Chọn trang">
          {pageItems.map(([id, label, Icon]) => (
            <button className={current === id ? 'active' : ''} onClick={() => choosePage(id)} key={id}><Icon size={14} />{label}</button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Mở menu"><Menu /></button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Đóng menu"><X /></button>
        {pageItems.map(([id, label], index) => (
          <button onClick={() => choosePage(id)} key={id}><span>0{index + 1}</span>{label}</button>
        ))}
      </div>
    </>
  );
}

function FullPresentationContent() {
  const jumpToChapter = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="full-story section-pad" id="noi-dung-day-du">
      <header className="story-header">
        <div>
          <div className="section-kicker"><span>↳</span> Nội dung thuyết trình đầy đủ</div>
          <h2>Từ tạo thế, tạo lực<br />đến <em>toàn thắng.</em></h2>
        </div>
        <p>Toàn bộ câu chuyện được sắp xếp thành chín chương. Mỗi chương là một mắt xích trong tiến trình tích lũy sức mạnh tổng hợp từ năm 1951 đến năm 1954.</p>
      </header>

      <nav className="story-nav" aria-label="Mục lục nội dung thuyết trình">
        {presentationChapters.map((chapter) => (
          <button onClick={() => jumpToChapter(chapter.id)} key={chapter.id}><span>{chapter.number}</span>{chapter.label}</button>
        ))}
      </nav>

      <div className="story-chapters">
        {presentationChapters.map((chapter, chapterIndex) => (
          <article className={`story-chapter ${chapterIndex % 2 ? 'reverse' : ''}`} id={chapter.id} key={chapter.id}>
            <aside className="chapter-heading">
              <span className="chapter-number">{chapter.number}</span>
              <div className="chapter-period">{chapter.period}</div>
              <h3>{chapter.title}</h3>
              <span className="chapter-label">{chapter.label}</span>
            </aside>
            <div className="chapter-content">
              {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                <p className={paragraphIndex === 0 ? 'chapter-lead' : ''} key={paragraph}>{paragraph}</p>
              ))}
              {chapter.quote && <blockquote><Flag size={17} fill="currentColor" /><span>{chapter.quote}</span></blockquote>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PresentationPage({ navigate }) {
  const [activeYear, setActiveYear] = useState('1951');
  const [activePhase, setActivePhase] = useState(1);

  const milestone = useMemo(
    () => milestones.find((item) => item.year === activeYear) ?? milestones[0],
    [activeYear],
  );

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <SiteHeader current="presentation" navigate={navigate} />

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><span /> 1951 — 1954 · Kháng chiến chống Pháp</div>
          <h1>Đẩy mạnh<br />cuộc kháng chiến<br /><em>đến thắng lợi</em></h1>
          <p className="hero-lead">Chiến thắng không đến từ một trận đánh đơn lẻ. Đó là điểm kết tụ của <strong>tổ chức</strong>, <strong>chiến lược</strong> và <strong>sức mạnh toàn dân</strong>.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('luan-diem')}>Khám phá hành trình <ArrowDown size={17} /></button>
            <span className="duration"><strong>04</strong><small>năm tạo thế<br />và tạo lực</small></span>
          </div>
        </div>
        <div className="hero-caption"><span>01</span><p>Lá cờ chiến thắng —<br />Điện Biên Phủ, 1954</p></div>
      </section>

      <section className="thesis section-pad" id="luan-diem">
        <div className="section-kicker"><span>01</span> Luận điểm cốt lõi</div>
        <div className="thesis-grid">
          <h2>Một thắng lợi được<br /><em>tích lũy</em> qua thời gian.</h2>
          <div className="thesis-copy">
            <p>Thắng lợi năm 1954 không phải kết quả của một trận đánh đơn lẻ, mà là điểm kết tụ của quá trình xây dựng và phát huy sức mạnh tổng hợp về tổ chức, chiến lược và nguồn lực trong suốt giai đoạn 1951–1954.</p>
            <div className="pillars">
              <div><span>01</span><strong>Tổ chức</strong><small>Thống nhất đường lối</small></div>
              <div><span>02</span><strong>Chiến lược</strong><small>Chủ động, linh hoạt</small></div>
              <div><span>03</span><strong>Nguồn lực</strong><small>Sức mạnh toàn dân</small></div>
            </div>
          </div>
        </div>
      </section>

      <FullPresentationContent />

      <section className="context-band">
        <div className="quote-mark">“</div>
        <blockquote>Ta đã chủ động điều khiển chiến trường, buộc đối phương phải hành động theo thế trận do ta tạo ra.</blockquote>
        <div className="context-note"><span>Bối cảnh</span><p>Sau Chiến dịch Biên giới 1950, căn cứ địa Việt Bắc được nối liền với các nước xã hội chủ nghĩa. Trong khi đó, Mỹ tăng cường viện trợ, giúp Pháp kéo dài chiến tranh Đông Dương.</p></div>
      </section>

      <section className="journey section-pad" id="hanh-trinh">
        <div className="section-heading">
          <div><div className="section-kicker light"><span>02</span> Hành trình tạo thế & tạo lực</div><h2>Bốn năm.<br />Một mục tiêu.</h2></div>
          <p>Từ kiện toàn tổ chức đến làm chủ thế trận, mỗi bước đi đều tạo tiền đề cho bước tiếp theo.</p>
        </div>

        <div className="timeline" role="tablist" aria-label="Các mốc lịch sử">
          {milestones.map((item) => (
            <button
              key={item.year}
              className={activeYear === item.year ? 'active' : ''}
              onClick={() => setActiveYear(item.year)}
              role="tab"
              aria-selected={activeYear === item.year}
            >
              <span className="timeline-dot" />
              <strong>{item.year}</strong>
              <small>{item.accent}</small>
            </button>
          ))}
        </div>

        <article className="milestone-card" key={milestone.year}>
          <div className="milestone-year">{milestone.year}</div>
          <div className="milestone-content">
            <div className="meta"><span>{milestone.date}</span><span>{milestone.tag}</span></div>
            <h3>{milestone.title}</h3>
            <p>{milestone.text}</p>
          </div>
          <BookOpen className="milestone-icon" />
        </article>
      </section>

      <section className="strategy section-pad">
        <div className="strategy-copy">
          <div className="section-kicker"><span>03</span> Nghệ thuật chiến lược</div>
          <h2>Buộc đối phương<br /><em>phân tán</em> lực lượng.</h2>
          <p>Kế hoạch Nava muốn tập trung sức mạnh ở đồng bằng Bắc Bộ. Ta chọn tiến công những hướng quan trọng mà địch tương đối yếu, buộc họ phải chia lực lượng cơ động để đối phó.</p>
          <div className="nava-stat"><strong>44<small>/84</small></strong><p>tiểu đoàn cơ động Pháp ban đầu tập trung tại đồng bằng Bắc Bộ</p></div>
        </div>
        <div className="disperse-map" aria-label="Năm nơi quân Pháp buộc phải phân tán">
          <div className="map-head"><Route size={18} /><span>5 điểm phân tán chiến lược</span></div>
          <div className="map-center">Kế hoạch<br /><strong>NAVA</strong></div>
          <div className="map-point p1"><span>01</span>Đồng bằng Bắc Bộ</div>
          <div className="map-point p2"><span>02</span>Điện Biên Phủ</div>
          <div className="map-point p3"><span>03</span>Sê-nô</div>
          <div className="map-point p4"><span>04</span>Luông Pha-băng</div>
          <div className="map-point p5"><span>05</span>Plây Cu</div>
          <svg viewBox="0 0 600 520" aria-hidden="true"><path d="M300 260 C210 160 160 120 102 90 M300 260 C390 170 440 112 504 91 M300 260 C187 269 129 279 68 302 M300 260 C412 274 460 288 531 327 M300 260 C314 368 322 414 321 470" /></svg>
        </div>
      </section>

      <section className="decision">
        <div className="decision-bg" />
        <div className="decision-content section-pad">
          <div className="section-kicker light"><span>04</span> Quyết định lịch sử</div>
          <h2>“Đánh chắc,<br /><em>tiến chắc”</em></h2>
          <p>Khi nhận thấy lực lượng chưa được chuẩn bị đầy đủ và phòng ngự của Pháp đã kiên cố hơn, Đại tướng Võ Nguyên Giáp quyết định hoãn tiến công, kéo pháo ra và thay đổi phương châm.</p>
          <div className="decision-shift">
            <div><small>Phương án ban đầu</small><span>Đánh nhanh,<br />giải quyết nhanh</span></div>
            <ArrowRight />
            <div className="selected"><small>Quyết định cuối cùng</small><span>Đánh chắc,<br />tiến chắc</span><Check /></div>
          </div>
        </div>
      </section>

      <section className="logistics section-pad">
        <div className="section-heading dark-text">
          <div><div className="section-kicker"><span>05</span> Kỳ tích hậu cần</div><h2>Cả hậu phương<br />cùng ra trận.</h2></div>
          <p>Chiến thắng không chỉ được tạo nên bởi lực lượng trực tiếp chiến đấu, mà còn bởi khả năng huy động và tổ chức nguồn lực của chiến tranh nhân dân.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card major"><Users /><strong>261.000</strong><span>dân công hỏa tuyến</span><p>Vượt hàng trăm kilômét đường rừng và đèo dốc khắc nghiệt.</p></div>
          <div className="stat-card"><Boxes /><strong>20.000+</strong><span>xe đạp thồ</span><p>Một biểu tượng của sức sáng tạo và bền bỉ.</p></div>
          <div className="stat-card"><PackageOpen /><strong>Hàng chục nghìn</strong><span>tấn vật chất</span><p>Lương thực, vũ khí và trang bị được đưa tới mặt trận.</p></div>
        </div>
      </section>

      <section className="campaign section-pad" id="chien-dich">
        <figure className="campaign-banner">
          <div className="campaign-banner-frame">
            <img src="/dien-bien-phu-56-ngay-dem.png" alt="Điện Biên Phủ — 56 ngày đêm chấn động địa cầu" loading="lazy" />
          </div>
          <figcaption><span>Điện Biên Phủ · 1954</span><p>56 ngày đêm làm nên một chiến thắng lịch sử</p></figcaption>
        </figure>
        <div className="campaign-intro">
          <div className="section-kicker light"><span>06</span> Chiến dịch Điện Biên Phủ</div>
          <h2>56 ngày đêm<br /><em>chấn động địa cầu.</em></h2>
          <div className="campaign-total"><strong>13.03</strong><span>→</span><strong>07.05.1954</strong></div>
        </div>
        <div className="phases">
          {phases.map((phase) => (
            <article className={activePhase === phase.id ? 'phase open' : 'phase'} key={phase.id}>
              <button onClick={() => setActivePhase(phase.id)} aria-expanded={activePhase === phase.id}>
                <span className="phase-number">0{phase.id}</span>
                <span className="phase-title"><small>Đợt {phase.id} · {phase.dates}</small><strong>{phase.title}</strong></span>
                <ChevronDown />
              </button>
              <div className="phase-body"><div><span>Trọng điểm</span><strong>{phase.places}</strong></div><p>{phase.text}</p></div>
            </article>
          ))}
        </div>
        <div className="victory-line"><Flag fill="currentColor" /><p><strong>17:30 · 07.05.1954</strong><span>Sở chỉ huy địch bị chiếm. Chiến dịch toàn thắng.</span></p></div>
      </section>

      <section className="geneva section-pad">
        <span className="geneva-date">21 · 07 · 1954</span>
        <div><div className="section-kicker"><span>07</span> Từ chiến trường tới bàn đàm phán</div><h2>Hiệp định<br /><em>Genève</em></h2></div>
        <div className="geneva-copy"><p>Các văn bản về chấm dứt chiến tranh ở Đông Dương được ký kết, công nhận các quyền dân tộc cơ bản của Việt Nam, Lào và Campuchia.</p><p>Miền Bắc Việt Nam được hoàn toàn giải phóng, chuyển sang một giai đoạn cách mạng mới.</p></div>
      </section>

      <section className="lessons section-pad" id="bai-hoc">
        <div className="section-heading">
          <div><div className="section-kicker light"><span>08</span> Liên hệ hiện đại</div><h2>Bốn bài học<br />quản trị còn mãi.</h2></div>
          <Lightbulb className="outline-icon" />
        </div>
        <div className="lessons-grid">
          {lessons.map(({ icon: Icon, number, title, text }) => (
            <article key={number}><div className="lesson-top"><span>{number}</span><Icon /></div><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="formula section-pad">
        <div className="section-kicker"><span>09</span> Công thức của thắng lợi</div>
        <h2>Sức mạnh tổng hợp<br />tạo nên <em>lịch sử.</em></h2>
        <div className="formula-row">
          <div><span>01</span><strong>Tổ chức &<br />đường lối</strong></div><b>+</b>
          <div><span>02</span><strong>Chiến lược<br />linh hoạt</strong></div><b>+</b>
          <div><span>03</span><strong>Nguồn lực<br />toàn dân</strong></div><b>=</b>
          <div className="result"><Flag fill="currentColor" /><strong>Điện Biên Phủ<br />1954</strong></div>
        </div>
        <p className="closing">Không phải một chiến thắng ngẫu nhiên hay riêng lẻ, mà là kết quả tất yếu của quá trình tích lũy, tổ chức và phát huy sức mạnh tổng hợp của toàn dân tộc.</p>
      </section>

      <footer>
        <div className="footer-brand"><Flag fill="currentColor" /><span><strong>Đường tới Điện Biên Phủ</strong><small>1951 — 1954</small></span></div>
        <p>Nội dung được xây dựng từ tài liệu học tập<br />“Đẩy mạnh cuộc kháng chiến đến thắng lợi”.</p>
        <button onClick={() => goTo('top')}>Về đầu trang <ArrowDown className="up-arrow" size={16} /></button>
      </footer>
    </main>
  );
}

function QuizPage({ navigate }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const question = quizQuestions[index];
  const selected = answers[index];
  const score = quizQuestions.reduce((total, item, itemIndex) => total + (answers[itemIndex] === item.correct ? 1 : 0), 0);

  const selectAnswer = (optionIndex) => {
    if (selected !== undefined) return;
    setAnswers((current) => ({ ...current, [index]: optionIndex }));
  };

  const nextQuestion = () => {
    if (index === quizQuestions.length - 1) setFinished(true);
    else setIndex((current) => current + 1);
  };

  const restart = () => {
    setIndex(0);
    setAnswers({});
    setFinished(false);
  };

  return (
    <main className="interactive-page quiz-page">
      <SiteHeader current="quiz" navigate={navigate} />
      <div className="interactive-glow glow-one" />
      <div className="interactive-glow glow-two" />
      {!finished ? (
        <section className="interactive-shell">
          <div className="interactive-intro">
            <div className="section-kicker light"><span>Q</span> Kiểm tra kiến thức</div>
            <h1>Bạn hiểu hành trình<br /><em>đến đâu?</em></h1>
            <p>8 câu hỏi · Mỗi câu có một đáp án đúng</p>
          </div>
          <div className="quiz-panel">
            <div className="quiz-progress">
              <span>Câu {index + 1} / {quizQuestions.length}</span>
              <div><i style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }} /></div>
              <strong>{Math.round(((index + 1) / quizQuestions.length) * 100)}%</strong>
            </div>
            <article className="question-card" key={index}>
              <div className="question-index"><CircleHelp /> Câu hỏi 0{index + 1}</div>
              <h2>{question.question}</h2>
              <div className="answer-list">
                {question.options.map((option, optionIndex) => {
                  let className = '';
                  if (selected !== undefined && optionIndex === question.correct) className = 'correct';
                  else if (selected === optionIndex) className = 'wrong';
                  return (
                    <button className={className} onClick={() => selectAnswer(optionIndex)} key={option}>
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      <strong>{option}</strong>
                      {className === 'correct' && <Check />}
                      {className === 'wrong' && <X />}
                    </button>
                  );
                })}
              </div>
              {selected !== undefined && (
                <div className={`answer-feedback ${selected === question.correct ? 'is-correct' : 'is-wrong'}`} aria-live="polite">
                  <strong>{selected === question.correct ? 'Chính xác!' : 'Chưa chính xác'}</strong>
                  <p>{question.explanation}</p>
                </div>
              )}
              <div className="quiz-actions">
                <span>Điểm hiện tại: <strong>{score}</strong></span>
                <button disabled={selected === undefined} onClick={nextQuestion}>{index === quizQuestions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight /></button>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="result-screen">
          <div className="result-medal"><Trophy /></div>
          <div className="section-kicker light"><span>✓</span> Hoàn thành quiz</div>
          <h1>{score >= 7 ? 'Xuất sắc!' : score >= 5 ? 'Rất tốt!' : 'Cùng ôn lại nhé!'}</h1>
          <div className="score-ring"><strong>{score}</strong><span>/ {quizQuestions.length}</span></div>
          <p>{score >= 7 ? 'Bạn đã nắm rất chắc hành trình đi đến thắng lợi năm 1954.' : 'Mỗi lần ôn tập là một lần hiểu lịch sử sâu hơn.'}</p>
          <div className="result-actions">
            <button onClick={restart}><RotateCcw /> Làm lại</button>
            <button className="accent" onClick={() => navigate('game')}>Chơi game chiến lược <Gamepad2 /></button>
          </div>
        </section>
      )}
    </main>
  );
}

function ResourceMeter({ icon: Icon, label, value, tone }) {
  return (
    <div className={`resource-meter ${tone}`}>
      <div><Icon /><span>{label}</span><strong>{value}</strong></div>
      <div className="meter-track"><i style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function GamePage({ navigate }) {
  const initialResources = { organization: 35, strategy: 35, logistics: 35 };
  const [turn, setTurn] = useState(0);
  const [resources, setResources] = useState(initialResources);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const scenario = gameScenarios[turn];
  const totalScore = Math.round((resources.organization + resources.strategy + resources.logistics) / 3);

  const choose = (choiceIndex) => {
    if (selected !== null) return;
    const [organization, strategy, logistics] = scenario.choices[choiceIndex].effects;
    setResources((current) => ({
      organization: Math.max(0, Math.min(100, current.organization + organization)),
      strategy: Math.max(0, Math.min(100, current.strategy + strategy)),
      logistics: Math.max(0, Math.min(100, current.logistics + logistics)),
    }));
    setSelected(choiceIndex);
  };

  const nextTurn = () => {
    if (turn === gameScenarios.length - 1) setFinished(true);
    else {
      setTurn((current) => current + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setTurn(0);
    setResources(initialResources);
    setSelected(null);
    setFinished(false);
  };

  return (
    <main className="interactive-page game-page">
      <SiteHeader current="game" navigate={navigate} />
      <div className="game-grid-bg" />
      {!finished ? (
        <section className="game-shell">
          <header className="game-status">
            <div>
              <div className="section-kicker light"><span>G</span> Trò chơi chiến lược</div>
              <h1>Kiến tạo <em>thắng lợi</em></h1>
              <p>Đưa ra quyết định để cân bằng sức mạnh tổng hợp.</p>
            </div>
            <div className="mission-count"><small>Nhiệm vụ</small><strong>0{turn + 1}<span>/0{gameScenarios.length}</span></strong></div>
          </header>

          <div className="resource-bar">
            <ResourceMeter icon={Users} label="Tổ chức" value={resources.organization} tone="org" />
            <ResourceMeter icon={Target} label="Chiến lược" value={resources.strategy} tone="strat" />
            <ResourceMeter icon={PackageOpen} label="Hậu cần" value={resources.logistics} tone="logi" />
          </div>

          <article className="mission-card" key={turn}>
            <div className="mission-brief">
              <span className="mission-year">{scenario.year}</span>
              <small>Tình huống {turn + 1}</small>
              <h2>{scenario.title}</h2>
              <p>{scenario.situation}</p>
              <div className="brief-tip"><Gauge /><span>Chọn phương án tối ưu để bảo toàn cả ba nguồn lực.</span></div>
            </div>
            <div className="decision-list">
              <small>Quyết định của bạn</small>
              {scenario.choices.map((choice, choiceIndex) => {
                const isChosen = selected === choiceIndex;
                const revealBest = selected !== null && choice.best;
                return (
                  <button className={`${isChosen ? 'chosen' : ''} ${revealBest ? 'best' : ''}`} onClick={() => choose(choiceIndex)} key={choice.text}>
                    <span>{String.fromCharCode(65 + choiceIndex)}</span>
                    <strong>{choice.text}</strong>
                    {revealBest && <Check />}
                  </button>
                );
              })}
              {selected !== null && (
                <div className={`mission-result ${scenario.choices[selected].best ? 'success' : ''}`} aria-live="polite">
                  <Sparkles />
                  <div><strong>{scenario.choices[selected].best ? 'Quyết định sáng suốt' : 'Hệ quả chiến lược'}</strong><p>{scenario.choices[selected].result}</p></div>
                </div>
              )}
              <button className="next-mission" disabled={selected === null} onClick={nextTurn}>{turn === gameScenarios.length - 1 ? 'Xem kết quả chiến dịch' : 'Sang nhiệm vụ tiếp theo'} <ArrowRight /></button>
            </div>
          </article>
        </section>
      ) : (
        <section className="result-screen game-result">
          <div className="result-medal"><Flag fill="currentColor" /></div>
          <div className="section-kicker light"><span>★</span> Chiến dịch kết thúc</div>
          <h1>{totalScore >= 70 ? 'Toàn thắng!' : totalScore >= 50 ? 'Hoàn thành nhiệm vụ!' : 'Cần một chiến lược mới!'}</h1>
          <div className="final-resources">
            <ResourceMeter icon={Users} label="Tổ chức" value={resources.organization} tone="org" />
            <ResourceMeter icon={Target} label="Chiến lược" value={resources.strategy} tone="strat" />
            <ResourceMeter icon={PackageOpen} label="Hậu cần" value={resources.logistics} tone="logi" />
          </div>
          <p>Chỉ số sức mạnh tổng hợp: <strong>{totalScore}/100</strong></p>
          <div className="result-actions">
            <button onClick={restart}><RotateCcw /> Chơi lại</button>
            <button className="accent" onClick={() => navigate('quiz')}>Thử sức với quiz <BrainCircuit /></button>
          </div>
        </section>
      )}
    </main>
  );
}

function App() {
  const validPages = ['presentation', 'quiz', 'game'];
  const getPage = () => {
    const hash = window.location.hash.replace('#', '');
    return validPages.includes(hash) ? hash : 'presentation';
  };
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextPage) => {
    window.location.hash = nextPage;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'quiz') return <QuizPage navigate={navigate} />;
  if (page === 'game') return <GamePage navigate={navigate} />;
  return <PresentationPage navigate={navigate} />;
}

export default App;

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  BrainCircuit,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Clock3,
  Copy,
  Flame,
  Flag,
  Gamepad2,
  Gauge,
  HelpCircle,
  Info,
  Lightbulb,
  Maximize2,
  Medal,
  Minimize2,
  Menu,
  PackageOpen,
  RotateCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';

const SoundFx = {
  ctx: null,
  isMuted: false,
  getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  },
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  },
  playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (_) {}
  },
  playCorrect() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.07);
      osc.frequency.setValueAtTime(783.99, now + 0.14);
      osc.frequency.setValueAtTime(1046.50, now + 0.21);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (_) {}
  },
  playWrong() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(150, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_) {}
  },
  playTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  },
  playVictory() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0, d: 0.1 },
        { f: 659.25, t: 0.1, d: 0.1 },
        { f: 783.99, t: 0.2, d: 0.1 },
        { f: 1046.50, t: 0.3, d: 0.35 },
        { f: 880.00, t: 0.7, d: 0.12 },
        { f: 1046.50, t: 0.85, d: 0.5 },
      ];
      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.15, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch (_) {}
  },
};

const strategicPoints = [
  {
    id: 1,
    title: 'Đồng bằng Bắc Bộ',
    code: 'p1',
    troops: '44 tiểu đoàn cơ động',
    desc: 'Trung tâm cơ động chiến lược ban đầu của Kế hoạch Nava nhằm bình định và nắm quyền chủ động chiến trường.',
  },
  {
    id: 2,
    title: 'Điện Biên Phủ',
    code: 'p2',
    troops: '16.200 quân tinh nhuệ',
    desc: 'Pháp buộc phải nhảy dù chiếm đóng ngày 20.11.1953 để bảo vệ Thượng Lào khi ta chủ động tiến công lên Tây Bắc.',
  },
  {
    id: 3,
    title: 'Sê-nô (Trung Lào)',
    code: 'p3',
    troops: 'Tháng 12.1953',
    desc: 'Liên quân Việt - Lào tiến công Trung Lào, giải phóng Thà-khẹt, buộc Pháp phải điều quân cơ động cứu nguy Sê-nô.',
  },
  {
    id: 4,
    title: 'Luông Pha-băng (Thượng Lào)',
    code: 'p4',
    troops: 'Tháng 01.1954',
    desc: 'Quân ta tiến công lưu vực sông Nậm Hu, giải phóng Phong-xa-lỳ, uy hiếp trực tiếp Luông Pha-băng và Mường Sài.',
  },
  {
    id: 5,
    title: 'Plây Cu (Bắc Tây Nguyên)',
    code: 'p5',
    troops: 'Tháng 02.1954',
    desc: 'Ta tiến công giải phóng thị xã Kon Tum, bao vây Plây Cu, đập tan âm mưu đánh chiếm vùng tự do Liên khu 5 của địch.',
  },
];

function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const colors = ['#b33b2e', '#d0a74b', '#71a282', '#718fac', '#f1ead9', '#e6c671', '#ffffff'];
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 8 - 4,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    const timer = setTimeout(() => {
      cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, width, height);
    }, 6500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const current = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      setProgress(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="back-to-top-btn"
      onClick={() => {
        SoundFx.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Về đầu trang"
      title="Về đầu trang"
    >
      <ChevronUp size={20} />
      <span>Đầu trang</span>
    </button>
  );
}

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

const mascotOptions = [
  { emoji: '🐯', name: 'Hổ dũng mãnh' },
  { emoji: '🦅', name: 'Đại bàng' },
  { emoji: '🐉', name: 'Rồng vàng' },
  { emoji: '🐘', name: 'Voi chiến' },
  { emoji: '🦁', name: 'Sư tử' },
  { emoji: '🐺', name: 'Sói bạc' },
  { emoji: '🐎', name: 'Tuấn mã' },
  { emoji: '🐻', name: 'Gấu thép' },
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

const wordGameQuestions = [
  {
    question: 'Theo luận điểm cốt lõi, thắng lợi năm 1954 là kết quả của điều gì?',
    options: ['Một trận đánh bất ngờ', 'Sức mạnh tổng hợp được xây dựng qua nhiều năm', 'Viện trợ quốc tế', 'Ưu thế vũ khí'],
    correct: 1,
    fragment: 'TỔ CHỨC ĐÚNG ĐẮN,',
  },
  {
    question: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng diễn ra vào thời gian nào?',
    options: ['Tháng 2/1951', 'Tháng 9/1952', 'Tháng 5/1953', 'Tháng 3/1954'],
    correct: 0,
    fragment: 'CHIẾN LƯỢC',
  },
  {
    question: 'Kế hoạch Đông–Xuân 1953–1954 buộc quân Pháp phải làm gì?',
    options: ['Rút hoàn toàn khỏi Đông Dương', 'Tập trung ở Hà Nội', 'Phân tán lực lượng để đối phó', 'Đầu hàng ngay lập tức'],
    correct: 2,
    fragment: 'CHỦ ĐỘNG, LINH HOẠT',
  },
  {
    question: 'Điểm yếu quyết định của tập đoàn cứ điểm Điện Biên Phủ là gì?',
    options: ['Không có pháo binh', 'Phụ thuộc tiếp tế đường không', 'Không có quân cơ động', 'Thiếu công sự'],
    correct: 1,
    fragment: 'VÀ',
  },
  {
    question: 'Phương châm tác chiến cuối cùng tại Điện Biên Phủ là gì?',
    options: ['Đánh nhanh, thắng nhanh', 'Vây điểm, diệt viện', 'Đánh chắc, tiến chắc', 'Phòng ngự chủ động'],
    correct: 2,
    fragment: 'HẬU PHƯƠNG',
  },
  {
    question: 'Phương tiện thô sơ nào trở thành biểu tượng của hậu cần chiến dịch?',
    options: ['Thuyền độc mộc', 'Xe ngựa', 'Xe đạp thồ', 'Xe kéo tay'],
    correct: 2,
    fragment: 'VỮNG MẠNH',
  },
  {
    question: 'Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?',
    options: ['36 ngày đêm', '46 ngày đêm', '56 ngày đêm', '66 ngày đêm'],
    correct: 2,
    fragment: 'TẠO NÊN CHIẾN THẮNG',
  },
  {
    question: 'Chiến thắng ngày 7/5/1954 gắn với địa danh nào?',
    options: ['Việt Bắc', 'Biên Giới', 'Hòa Bình', 'Điện Biên Phủ'],
    correct: 3,
    fragment: 'ĐIỆN BIÊN PHỦ.',
  },
];

const teamQuotes = [
  {
    quote: 'Tất cả cho tiền tuyến, tất cả để chiến thắng.',
    fragments: ['TẤT', 'CẢ', 'CHO', 'TIỀN', 'TUYẾN,', 'TẤT', 'CẢ', 'ĐỂ', 'CHIẾN', 'THẮNG.'],
    shuffle: [4, 1, 8, 0, 6, 3, 9, 2, 7, 5],
  },
  {
    quote: 'Thà hy sinh tất cả chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
    fragments: ['THÀ HY SINH', 'TẤT CẢ', 'CHỨ NHẤT ĐỊNH', 'KHÔNG CHỊU', 'MẤT NƯỚC,', 'NHẤT ĐỊNH', 'KHÔNG CHỊU', 'LÀM', 'NÔ', 'LỆ.'],
    shuffle: [6, 2, 9, 0, 4, 7, 1, 8, 5, 3],
  },
  {
    quote: 'Mỗi người làm việc bằng hai, vì miền Nam ruột thịt.',
    fragments: ['MỖI NGƯỜI', 'LÀM', 'VIỆC', 'BẰNG', 'HAI,', 'VÌ', 'MIỀN', 'NAM', 'RUỘT', 'THỊT.'],
    shuffle: [7, 3, 0, 8, 5, 2, 9, 1, 6, 4],
  },
  {
    quote: 'Không có gì quý hơn độc lập, tự do!',
    fragments: ['KHÔNG', 'CÓ', 'GÌ', 'QUÝ', 'HƠN', 'ĐỘC', 'LẬP,', 'TỰ', 'DO', '!'],
    shuffle: [5, 0, 8, 3, 6, 1, 9, 4, 2, 7],
  },
];

const teamQuestionSets = [
  [
    { question: 'Luận điểm cốt lõi xác định thắng lợi năm 1954 là kết quả của điều gì?', options: ['Một trận đánh đơn lẻ', 'Sức mạnh tổng hợp được tích lũy', 'Viện trợ quốc tế', 'Ưu thế vũ khí'], correct: 1 },
    { question: 'Cách mạng Trung Quốc giành thắng lợi vào năm nào?', options: ['1945', '1947', '1949', '1951'], correct: 2 },
    { question: 'Chiến dịch nào năm 1950 giúp căn cứ Việt Bắc được nối liền với quốc tế?', options: ['Việt Bắc', 'Biên giới', 'Hòa Bình', 'Tây Bắc'], correct: 1 },
    { question: 'Đại hội đại biểu toàn quốc lần thứ II diễn ra khi nào?', options: ['02/1951', '05/1952', '09/1953', '03/1954'], correct: 0 },
    { question: 'Đại hội II được tổ chức tại huyện nào?', options: ['Định Hóa', 'Chiêm Hóa', 'Võ Nhai', 'Sơn Dương'], correct: 1 },
    { question: 'Đại hội II có bao nhiêu đại biểu chính thức?', options: ['118', '138', '158', '178'], correct: 2 },
    { question: 'Năm 1951, Đảng ra hoạt động công khai với tên gọi nào?', options: ['Đảng Cộng sản Đông Dương', 'Đảng Lao động Việt Nam', 'Đảng Dân chủ Việt Nam', 'Đảng Cộng sản Việt Nam'], correct: 1 },
    { question: 'Ai được bầu làm Chủ tịch Đảng tại Đại hội II?', options: ['Trường Chinh', 'Phạm Văn Đồng', 'Hồ Chí Minh', 'Võ Nguyên Giáp'], correct: 2 },
    { question: 'Cuộc vận động nào được tiến hành trong năm 1952?', options: ['Chỉnh Đảng, chỉnh quân', 'Cải cách giáo dục', 'Thi đua sản xuất', 'Đồng khởi'], correct: 0 },
    { question: 'Luật Cải cách ruộng đất được Quốc hội thông qua vào thời điểm nào?', options: ['Đầu năm 1951', 'Giữa năm 1952', 'Cuối năm 1953', 'Sau tháng 7/1954'], correct: 2 },
  ],
  [
    { question: 'Tướng Henri Navarre được cử sang Đông Dương vào thời gian nào?', options: ['02/1951', '05/1953', '09/1953', '01/1954'], correct: 1 },
    { question: 'Kế hoạch Nava dự kiến xoay chuyển cục diện trong bao lâu?', options: ['6 tháng', '12 tháng', '18 tháng', '24 tháng'], correct: 2 },
    { question: 'Pháp tập trung bao nhiêu trong tổng số 84 tiểu đoàn cơ động ở đồng bằng Bắc Bộ?', options: ['34', '44', '54', '64'], correct: 1 },
    { question: 'Kế hoạch tác chiến Đông–Xuân 1953–1954 được đề ra vào tháng nào?', options: ['05/1953', '07/1953', '09/1953', '12/1953'], correct: 2 },
    { question: 'Ta lựa chọn tiến công vào những hướng như thế nào?', options: ['Nơi địch mạnh nhất', 'Nơi địch tương đối yếu', 'Chỉ ở đồng bằng', 'Chỉ ở ven biển'], correct: 1 },
    { question: 'Quân Pháp bị buộc phải phân tán lực lượng ra bao nhiêu nơi?', options: ['Ba', 'Bốn', 'Năm', 'Sáu'], correct: 2 },
    { question: 'Địa điểm nào sau đây là một trong năm nơi quân Pháp phải phân tán?', options: ['Điện Biên Phủ', 'Hải Phòng', 'Huế', 'Sài Gòn'], correct: 0 },
    { question: 'Kết quả bước đầu của tiến công Đông–Xuân là gì?', options: ['Kế hoạch Nava được củng cố', 'Ý đồ tập trung quân bị phá sản', 'Ta mất quyền chủ động', 'Pháp rút khỏi Đông Dương'], correct: 1 },
    { question: 'Pháp chiếm Điện Biên Phủ bằng hình thức nào?', options: ['Đổ bộ đường biển', 'Hành quân bộ', 'Nhảy dù', 'Tấn công đường sông'], correct: 2 },
    { question: 'Tập đoàn cứ điểm Điện Biên Phủ có khoảng bao nhiêu quân?', options: ['10.200', '13.200', '16.200', '20.200'], correct: 2 },
  ],
  [
    { question: 'Điện Biên Phủ được tổ chức thành bao nhiêu cứ điểm?', options: ['39', '49', '59', '69'], correct: 1 },
    { question: 'Tập đoàn cứ điểm được chia thành bao nhiêu phân khu?', options: ['Hai', 'Ba', 'Bốn', 'Năm'], correct: 1 },
    { question: 'Điểm yếu quyết định của Điện Biên Phủ là gì?', options: ['Không có pháo', 'Phụ thuộc tiếp tế đường không', 'Không có công sự', 'Thiếu bộ binh'], correct: 1 },
    { question: 'Sân bay nào giữ vai trò tiếp tế chính cho Điện Biên Phủ?', options: ['Gia Lâm', 'Cát Bi', 'Mường Thanh', 'Nà Sản'], correct: 2 },
    { question: 'Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ vào ngày nào?', options: ['06/12/1953', '13/03/1954', '30/03/1954', '07/05/1954'], correct: 0 },
    { question: 'Ai là Tư lệnh kiêm Bí thư Đảng ủy Mặt trận?', options: ['Trường Chinh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng', 'Hoàng Văn Thái'], correct: 1 },
    { question: 'Phương châm tác chiến ban đầu là gì?', options: ['Đánh chắc, tiến chắc', 'Đánh nhanh, giải quyết nhanh', 'Vây điểm, diệt viện', 'Tiến công lâu dài'], correct: 1 },
    { question: 'Phương châm tác chiến cuối cùng là gì?', options: ['Đánh nhanh, thắng nhanh', 'Phòng ngự tích cực', 'Đánh chắc, tiến chắc', 'Đánh điểm, diệt viện'], correct: 2 },
    { question: 'Biện pháp nào giúp quân ta từng bước tiến sát các cứ điểm?', options: ['Đào hệ thống chiến hào', 'Xây sân bay', 'Dùng xe tăng', 'Đổ bộ đường không'], correct: 0 },
    { question: 'Khoảng bao nhiêu dân công được huy động cho chiến dịch?', options: ['161.000', '201.000', '261.000', '361.000'], correct: 2 },
  ],
  [
    { question: 'Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?', options: ['36', '46', '56', '66'], correct: 2 },
    { question: 'Chiến dịch bắt đầu vào ngày nào?', options: ['06/12/1953', '13/03/1954', '30/03/1954', '01/05/1954'], correct: 1 },
    { question: 'Đợt tiến công thứ nhất diễn ra trong khoảng nào?', options: ['13–17/3', '20–25/3', '30/3–30/4', '1–7/5'], correct: 0 },
    { question: 'Cứ điểm nào bị tiêu diệt trong đợt tiến công thứ nhất?', options: ['A1', 'C1', 'Him Lam', 'D1'], correct: 2 },
    { question: 'Đợt tiến công thứ hai bắt đầu vào ngày nào?', options: ['17/3', '25/3', '30/3', '1/5'], correct: 2 },
    { question: 'Cứ điểm nào thuộc phía đông phân khu trung tâm?', options: ['Him Lam', 'Bản Kéo', 'A1', 'Độc Lập'], correct: 2 },
    { question: 'Đợt tổng công kích cuối cùng diễn ra từ ngày nào đến ngày nào?', options: ['13–17/3', '20–30/3', '1–7/5', '8–15/5'], correct: 2 },
    { question: 'Cứ điểm A1 bị tiêu diệt vào thời điểm nào?', options: ['Đêm 6 rạng sáng 7/5', 'Sáng 13/3', 'Đêm 30/3', 'Chiều 21/7'], correct: 0 },
    { question: 'Sở chỉ huy địch bị chiếm lúc mấy giờ ngày 7/5/1954?', options: ['15 giờ', '16 giờ 30', '17 giờ 30', '18 giờ'], correct: 2 },
    { question: 'Hiệp định Giơ-ne-vơ được ký kết vào ngày nào?', options: ['07/05/1954', '21/07/1954', '02/09/1954', '10/10/1954'], correct: 1 },
  ],
];

const providedQuestionBank = [
  { question: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng (2/1951) diễn ra tại đâu?', options: ['Tân Trào, Tuyên Quang.', 'Xã Vinh Quang (nay là Kim Bình), huyện Chiêm Hóa, tỉnh Tuyên Quang.', 'Pác Bó, Cao Bằng.', 'Định Hóa, Thái Nguyên.'], correct: 1 },
  { question: 'Tại Đại hội II, Đảng ta quyết định đổi tên thành gì?', options: ['Đảng Cộng sản Đông Dương.', 'Đảng Lao động Việt Nam.', 'Đảng Cộng sản Việt Nam.', 'Hội nghiên cứu Chủ nghĩa Mác ở Đông Dương.'], correct: 1 },
  { question: 'Ai được bầu làm Tổng Bí thư tại Đại hội II của Đảng?', options: ['Hồ Chí Minh.', 'Võ Nguyên Giáp.', 'Trường Chinh.', 'Phạm Văn Đồng.'], correct: 2 },
  { question: 'Chính cương Đảng Lao động Việt Nam (1951) xác định tính chất của xã hội Việt Nam lúc bấy giờ là gì?', options: ['Thuộc địa nửa phong kiến.', 'Dân chủ nhân dân, một phần thuộc địa và nửa phong kiến.', 'Xã hội chủ nghĩa.', 'Tư bản chủ nghĩa.'], correct: 1 },
  { question: 'Nhiệm vụ chính được đặt lên hàng đầu trong Chính cương năm 1951 là gì?', options: ['Cải cách ruộng đất.', 'Xây dựng chủ nghĩa xã hội.', 'Giải phóng dân tộc.', 'Phát triển kinh tế.'], correct: 2 },
  { question: 'Cuộc vận động nào được Đảng tiến hành năm 1952 nhằm nâng cao năng lực lãnh đạo và sức chiến đấu của quân đội?', options: ['Thi đua ái quốc.', '“Chỉnh Đảng, chỉnh quân”.', 'Diệt giặc đói, giặc dốt.', 'Cải cách ruộng đất.'], correct: 1 },
  { question: 'Luật Cải cách ruộng đất được Quốc hội thông qua và Chủ tịch Hồ Chí Minh ban hành vào thời gian nào?', options: ['Tháng 2/1951.', 'Tháng 5/1953.', 'Tháng 12/1953.', 'Tháng 7/1954.'], correct: 2 },
  { question: 'Nền tảng động lực của cách mạng Việt Nam theo Đại hội II là liên minh giữa các giai cấp nào?', options: ['Công nhân và nông dân.', 'Công nhân, nông dân và lao động trí óc.', 'Công nhân, nông dân, tiểu tư sản và tư sản dân tộc.', 'Công nhân và lao động trí óc.'], correct: 1 },
  { question: 'Tướng Henri Navarre được cử sang Đông Dương làm Tổng chỉ huy quân đội viễn chinh Pháp vào thời gian nào?', options: ['Tháng 12/1946.', 'Tháng 5/1953.', 'Tháng 9/1953.', 'Tháng 12/1953.'], correct: 1 },
  { question: 'Mục tiêu cốt lõi của Kế hoạch Nava là gì?', options: ['Rút quân khỏi Đông Dương trong danh dự.', 'Xoay chuyển cục diện chiến tranh trong vòng 18 tháng để giành một thắng lợi quyết định.', 'Tiêu diệt toàn bộ bộ đội chủ lực Việt Nam trong 6 tháng.', 'Mở rộng chiếm đóng toàn bộ bán đảo Đông Dương.'], correct: 1 },
  { question: 'Trong kế hoạch ban đầu, Pháp tập trung lực lượng cơ động chiến lược mạnh nhất (44 tiểu đoàn) ở đâu?', options: ['Điện Biên Phủ.', 'Đồng bằng Bắc Bộ.', 'Tây Nguyên.', 'Thượng Lào.'], correct: 1 },
  { question: 'Để phá thế tập trung quân của Pháp, Bộ Chính trị đề ra phương châm tác chiến Đông - Xuân 1953-1954 như thế nào?', options: ['Đánh thẳng vào các thành phố lớn do Pháp chiếm giữ.', 'Tiến công vào những hướng quan trọng mà địch tương đối yếu, buộc chúng phải phân tán.', 'Tập trung toàn bộ chủ lực đánh một trận quyết định tại đồng bằng.', 'Chỉ thực hiện chiến tranh du kích sau lưng địch.'], correct: 1 },
  { question: 'Đòn tiến công của ta đã buộc quân Pháp phải phân tán lực lượng ra 5 nơi, đó là những nơi nào?', options: ['Hà Nội, Hải Phòng, Huế, Đà Nẵng, Sài Gòn.', 'Đồng bằng Bắc Bộ, Điện Biên Phủ, Sê-nô, Luông Pha-băng và Plây Cu.', 'Điện Biên Phủ, Lai Châu, Thượng Lào, Hạ Lào, Tây Nguyên.', 'Hà Nội, Điện Biên Phủ, Sê-nô, Plây Cu, Sài Gòn.'], correct: 1 },
  { question: 'Tại sao Pháp chọn Điện Biên Phủ để xây dựng tập đoàn cứ điểm?', options: ['Đây là thủ đô của vùng Tây Bắc.', 'Để khống chế vùng rộng lớn Tây Bắc và Thượng Lào, đối phó với hướng tiến công của ta.', 'Vì đây là nơi có đông dân cư nhất vùng núi.', 'Để bảo vệ các thành phố lớn ở đồng bằng.'], correct: 1 },
  { question: 'Mỹ có vai trò gì trong Kế hoạch Nava?', options: ['Không liên quan.', 'Phản đối Pháp kéo dài chiến tranh.', 'Tăng cường viện trợ, chi trả phần lớn chi phí vật chất cho kế hoạch.', 'Trực tiếp đưa quân tham chiến thay Pháp.'], correct: 2 },
  { question: 'Tập đoàn cứ điểm Điện Biên Phủ được Pháp bố trí thành bao nhiêu phân khu và bao nhiêu cứ điểm?', options: ['2 phân khu, 49 cứ điểm.', '3 phân khu, 49 cứ điểm.', '3 phân khu, 50 cứ điểm.', '4 phân khu, 45 cứ điểm.'], correct: 1 },
  { question: 'Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ vào ngày tháng năm nào?', options: ['02/09/1945.', '06/12/1953.', '13/03/1954.', '07/05/1954.'], correct: 1 },
  { question: 'Ai là Tư lệnh kiêm Bí thư Đảng uỷ chiến dịch Điện Biên Phủ?', options: ['Hồ Chí Minh.', 'Phạm Văn Đồng.', 'Đại tướng Võ Nguyên Giáp.', 'Đồng chí Trường Chinh.'], correct: 2 },
  { question: 'Phương châm tác chiến ban đầu của ta tại Điện Biên Phủ là gì?', options: ['Đánh chắc, tiến chắc.', 'Đánh nhanh, giải quyết nhanh.', 'Đánh vào sở chỉ huy trung tâm trước.', 'Vây lấn kéo dài.'], correct: 1 },
  { question: 'Đại tướng Võ Nguyên Giáp đã quyết định thay đổi phương châm tác chiến từ “đánh nhanh, giải quyết nhanh” sang phương châm nào?', options: ['Đánh chậm, chắc thắng.', 'Đánh chắc, tiến chắc.', 'Đánh nhanh, rút nhanh.', 'Đánh du kích tiêu hao.'], correct: 1 },
  { question: 'Tại sao ta thay đổi phương châm tác chiến sang “đánh chắc, tiến chắc”?', options: ['Vì ta thiếu lương thực.', 'Vì địch đã tháo chạy.', 'Vì địch đã tăng cường phòng ngự kiên cố, ta cần chuẩn bị kỹ để bảo đảm chắc thắng.', 'Vì sự can thiệp trực tiếp của quân đội Mỹ.'], correct: 2 },
  { question: 'Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?', options: ['50 ngày đêm.', '55 ngày đêm.', '56 ngày đêm.', '60 ngày đêm.'], correct: 2 },
  { question: 'Chiến dịch Điện Biên Phủ bắt đầu vào ngày nào?', options: ['13/02/1954.', '13/03/1954.', '30/03/1954.', '01/05/1954.'], correct: 1 },
  { question: 'Đợt 1 của chiến dịch (13/3 - 17/3), quân ta đã tiêu diệt những cứ điểm nào?', options: ['A1, C1, D1.', 'Him Lam, Độc Lập và bức hàng Bản Kéo.', 'Hồng Cúm, Mường Thanh.', 'Sở chỉ huy Đờ Caxtơri.'], correct: 1 },
  { question: 'Đợt tấn công nào được đánh giá là dai dẳng, quyết liệt và gay go nhất trong chiến dịch?', options: ['Đợt 1.', 'Đợt 2.', 'Đợt 3.', 'Giai đoạn truy kích.'], correct: 1 },
  { question: 'Tại đồi A1, ta và địch đã giằng co nhau trong bao nhiêu ngày?', options: ['10 ngày.', '20 ngày.', '30 ngày.', '56 ngày.'], correct: 2 },
  { question: 'Quân ta chiếm sở chỉ huy trung tâm và bắt sống tướng Đờ Caxtơri vào lúc nào?', options: ['17 giờ 30 phút ngày 30/04/1954.', '05 giờ 30 phút ngày 07/05/1954.', '17 giờ 30 phút ngày 07/05/1954.', '24 giờ ngày 07/05/1954.'], correct: 2 },
  { question: 'Tổng số quân địch bị tiêu diệt và bắt sống tại Điện Biên Phủ là bao nhiêu?', options: ['10.000 tên.', '16.200 tên.', '20.000 tên.', '44.000 tên.'], correct: 1 },
  { question: 'Nhân vật nào sau đây được nhắc đến như tấm gương anh hùng tiêu biểu trong chiến dịch Điện Biên Phủ?', options: ['Võ Thị Sáu.', 'Tô Vĩnh Diện.', 'Kim Đồng.', 'Lê Văn Tám.'], correct: 1 },
  { question: 'Hậu phương đã huy động bao nhiêu dân công phục vụ cho chiến dịch Điện Biên Phủ?', options: ['Khoảng 100.000 người.', 'Khoảng 261.000 người.', 'Khoảng 500.000 người.', 'Khoảng 1.000.000 người.'], correct: 1 },
  { question: 'Hội nghị Giơ-ne-vơ bàn về chấm dứt chiến tranh ở Đông Dương bắt đầu họp vào ngày nào?', options: ['13/03/1954.', '08/05/1954.', '07/05/1954.', '21/07/1954.'], correct: 1 },
  { question: 'Hiệp định Giơ-ne-vơ về Đông Dương được ký kết vào ngày nào?', options: ['07/05/1954.', '19/05/1954.', '21/07/1954.', '02/09/1954.'], correct: 2 },
  { question: 'Trưởng đoàn đại biểu Chính phủ Việt Nam Dân chủ Cộng hòa tại Hội nghị Giơ-ne-vơ là ai?', options: ['Hồ Chí Minh.', 'Võ Nguyên Giáp.', 'Phạm Văn Đồng.', 'Trường Chinh.'], correct: 2 },
  { question: 'Ý nghĩa quan trọng nhất của Hiệp định Giơ-ne-vơ là gì?', options: ['Pháp rút quân ngay lập tức khỏi miền Nam.', 'Mỹ công nhận nền độc lập của Việt Nam.', 'Lần đầu tiên các quyền dân tộc cơ bản (độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ) của ba nước Đông Dương được công nhận quốc tế.', 'Việt Nam chính thức bước vào thời kỳ xã hội chủ nghĩa.'], correct: 2 },
  { question: 'Chiến thắng Điện Biên Phủ đã làm phá sản hoàn toàn kế hoạch quân sự nào của Pháp?', options: ['Kế hoạch Rơ-ve.', 'Kế hoạch Đờ Lát Đờ Tátxinhi.', 'Kế hoạch Nava.', 'Kế hoạch Bollaert.'], correct: 2 },
  { question: 'Sau chiến thắng Điện Biên Phủ và Hiệp định Giơ-ne-vơ, cách mạng Việt Nam chuyển sang giai đoạn mới là gì?', options: ['Kháng chiến chống Pháp ở miền Nam.', 'Giải phóng hoàn toàn miền Bắc, tạo cơ sở để giải phóng miền Nam, thống nhất đất nước.', 'Xây dựng quân đội hiện đại ngay lập tức.', 'Thiết lập quan hệ ngoại giao với Mỹ.'], correct: 1 },
  { question: 'Chiến thắng Điện Biên Phủ được ví như những thắng lợi nào trong lịch sử dân tộc?', options: ['Chiến thắng Ngọc Hồi - Đống Đa.', 'Bạch Đằng, Chi Lăng, Đống Đa của thế kỷ XX.', 'Khởi nghĩa Hai Bà Trưng.', 'Chiến thắng Điện Biên Phủ trên không.'], correct: 1 },
  { question: 'Ngoài Việt Nam, các quốc gia nào cũng được hưởng lợi từ thắng lợi của chiến dịch Điện Biên Phủ và Hiệp định Giơ-ne-vơ?', options: ['Trung Quốc và Liên Xô.', 'Lào và Campuchia.', 'Thái Lan và Miến Điện.', 'Các nước Đông Nam Á khác.'], correct: 1 },
  { question: 'Theo Hồ Chủ tịch, chiến thắng Điện Biên Phủ ghi dấu ấn gì trong lịch sử thế giới?', options: ['Sự khởi đầu của Mỹ tại Đông Dương.', 'Nơi chủ nghĩa thực dân lăn xuống dốc và tan rã.', 'Thắng lợi của vũ khí hiện đại.', 'Sự thất bại của Liên hợp quốc.'], correct: 1 },
  { question: '“Lực lượng nòng cốt” để làm nên chiến thắng Điện Biên Phủ theo đường lối của Đảng là gì?', options: ['Chỉ có bộ đội chủ lực.', 'Chỉ có dân công hỏa tuyến.', 'Lực lượng vũ trang ba thứ quân làm nòng cốt cho toàn dân đánh giặc.', 'Sự chi viện hoàn toàn từ bên ngoài.'], correct: 2 },
];

function randomizeQuestionBank(bank) {
  const shuffledQuestions = [...bank];
  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[swapIndex]] = [shuffledQuestions[swapIndex], shuffledQuestions[index]];
  }
  return shuffledQuestions.map((question) => {
    const answers = question.options.map((text, index) => ({ text, correct: index === question.correct }));
    for (let index = answers.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [answers[index], answers[swapIndex]] = [answers[swapIndex], answers[index]];
    }
    return { ...question, options: answers.map((answer) => answer.text), correct: answers.findIndex((answer) => answer.correct) };
  });
}

function SiteHeader({ current, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(SoundFx.isMuted);

  const pageItems = [
    ['presentation', 'Thuyết trình', Flag],
    ['game', 'Game chiến lược', Gamepad2],
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const choosePage = (page) => {
    SoundFx.playClick();
    setMenuOpen(false);
    navigate(page);
  };

  const toggleFullscreen = () => {
    SoundFx.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleSound = () => {
    const muted = SoundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) SoundFx.playClick();
  };

  return (
    <>
      <ScrollProgressBar />
      <header className="topbar">
        <button className="brand" onClick={() => choosePage('presentation')} aria-label="Về trang thuyết trình">
          <span className="brand-mark"><Flag size={17} fill="currentColor" /></span>
          <span><strong>Đường tới Điện Biên Phủ</strong><small>Học · Hiểu · Tương tác</small></span>
        </button>
        <nav className="desktop-nav page-nav" aria-label="Chọn trang">
          {pageItems.map(([id, label, Icon]) => (
            <button className={current === id ? 'active' : ''} onClick={() => choosePage(id)} key={id}>
              <Icon size={14} />{label}
            </button>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="control-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            className="control-btn desktop-only"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Thu nhỏ màn hình' : 'Toàn màn hình'}
            title={isFullscreen ? 'Thu nhỏ màn hình' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Mở menu"><Menu /></button>
        </div>
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
  const [activeChapter, setActiveChapter] = useState('boi-canh');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = presentationChapters.length - 1; i >= 0; i--) {
        const chapter = presentationChapters[i];
        const el = document.getElementById(chapter.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapter(chapter.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToChapter = (id) => {
    setActiveChapter(id);
    const el = document.getElementById(id);
    if (!el) return;
    const topbar = document.querySelector('.topbar');
    const topbarHeight = topbar ? topbar.offsetHeight : 72;
    const storyNav = document.querySelector('.story-nav');
    const storyNavHeight = storyNav ? storyNav.offsetHeight : 60;
    const totalOffset = topbarHeight + storyNavHeight + 16;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - totalOffset,
      behavior: 'smooth',
    });
  };

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
          <button
            className={activeChapter === chapter.id ? 'active' : ''}
            onClick={() => jumpToChapter(chapter.id)}
            key={chapter.id}
          >
            <span>{chapter.number}</span>
            {chapter.label}
          </button>
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
  const [expandAllPhases, setExpandAllPhases] = useState(false);
  const [activePoint, setActivePoint] = useState(strategicPoints[0]);

  const activeYearIndex = useMemo(
    () => milestones.findIndex((item) => item.year === activeYear),
    [activeYear],
  );

  const milestone = useMemo(
    () => milestones.find((item) => item.year === activeYear) ?? milestones[0],
    [activeYear],
  );

  const goTo = (id) => {
    SoundFx.playClick();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const topbar = document.querySelector('.topbar');
    const topbarHeight = topbar ? topbar.offsetHeight : 72;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - topbarHeight - 14,
      behavior: 'smooth',
    });
  };

  const handleYearChange = (year) => {
    SoundFx.playClick();
    setActiveYear(year);
  };

  const handlePointSelect = (point) => {
    SoundFx.playClick();
    setActivePoint(point);
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
              onClick={() => handleYearChange(item.year)}
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
            <div className="milestone-nav-buttons">
              <button
                className="milestone-nav-btn"
                disabled={activeYearIndex <= 0}
                onClick={() => handleYearChange(milestones[activeYearIndex - 1].year)}
              >
                <ArrowLeft size={14} /> Mốc trước ({activeYearIndex > 0 ? milestones[activeYearIndex - 1].year : ''})
              </button>
              <button
                className="milestone-nav-btn"
                disabled={activeYearIndex >= milestones.length - 1}
                onClick={() => handleYearChange(milestones[activeYearIndex + 1].year)}
              >
                Mốc tiếp theo ({activeYearIndex < milestones.length - 1 ? milestones[activeYearIndex + 1].year : ''}) <ArrowRight size={14} />
              </button>
            </div>
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
        <div className="disperse-map-wrapper">
          <div className="disperse-map" aria-label="Năm nơi quân Pháp buộc phải phân tán">
            <div className="map-head"><Route size={18} /><span>5 điểm phân tán chiến lược (Bấm chọn điểm để xem)</span></div>
            <div className="map-center">Kế hoạch<br /><strong>NAVA</strong></div>
            {strategicPoints.map((point) => (
              <button
                key={point.id}
                className={`map-point ${point.code} ${activePoint.id === point.id ? 'active-point' : ''}`}
                onClick={() => handlePointSelect(point)}
                aria-label={`Xem chi tiết ${point.title}`}
              >
                <span>0{point.id}</span>
                {point.title}
              </button>
            ))}
            <svg viewBox="0 0 600 520" aria-hidden="true"><path d="M300 260 C210 160 160 120 102 90 M300 260 C390 170 440 112 504 91 M300 260 C187 269 129 279 68 302 M300 260 C412 274 460 288 531 327 M300 260 C314 368 322 414 321 470" /></svg>
          </div>
          <div className="point-detail-card" key={activePoint.id}>
            <div className="point-detail-head">
              <span className="point-tag">Điểm phân tán 0{activePoint.id}</span>
              <strong>{activePoint.troops}</strong>
            </div>
            <h4>{activePoint.title}</h4>
            <p>{activePoint.desc}</p>
          </div>
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
          <button
            className="toggle-phases-btn"
            onClick={() => {
              SoundFx.playClick();
              setExpandAllPhases((current) => !current);
            }}
          >
            {expandAllPhases ? 'Thu gọn các đợt' : 'Mở rộng toàn bộ 3 đợt'}
          </button>
        </div>
        <div className="phases">
          {phases.map((phase) => {
            const isOpen = expandAllPhases || activePhase === phase.id;
            return (
              <article className={isOpen ? 'phase open' : 'phase'} key={phase.id}>
                <button
                  onClick={() => {
                    SoundFx.playClick();
                    setActivePhase(phase.id);
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="phase-number">0{phase.id}</span>
                  <span className="phase-title"><small>Đợt {phase.id} · {phase.dates}</small><strong>{phase.title}</strong></span>
                  <ChevronDown />
                </button>
                <div className="phase-body"><div><span>Trọng điểm</span><strong>{phase.places}</strong></div><p>{phase.text}</p></div>
              </article>
            );
          })}
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
        
      </footer>

      <BackToTopButton />
    </main>
  );
}

function GamePage({ navigate }) {
  const colors = ['red', 'gold', 'green', 'blue'];
  const [stage, setStage] = useState('setup');
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [teamNames, setTeamNames] = useState(['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 4']);
  const [teamMascots, setTeamMascots] = useState([0, 1, 2, 3]);
  const [teamOrder, setTeamOrder] = useState([0, 1, 2, 3]);
  const [orderDrawn, setOrderDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState(() => randomizeQuestionBank(providedQuestionBank));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [collectedWords, setCollectedWords] = useState([[], [], [], []]);
  const [wrongOptions, setWrongOptions] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [questionPhase, setQuestionPhase] = useState('reading');
  const [readingTimeLeft, setReadingTimeLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState(null);
  const [teamSentences, setTeamSentences] = useState([[], [], [], []]);
  const [assemblyCompleted, setAssemblyCompleted] = useState([false, false, false, false]);
  const [assemblyCorrect, setAssemblyCorrect] = useState([false, false, false, false]);
  const [activeAssemblyTeam, setActiveAssemblyTeam] = useState(0);
  const [assemblyTimeLeft, setAssemblyTimeLeft] = useState(60);
  const [assemblyError, setAssemblyError] = useState(false);
  const [earlyAnswerTeam, setEarlyAnswerTeam] = useState(null);
  const [earlyAnswerText, setEarlyAnswerText] = useState('');
  const [earlyAnswerTime, setEarlyAnswerTime] = useState(60);
  const [earlyAnswerFeedback, setEarlyAnswerFeedback] = useState(null);
  const [earlyAttemptUsed, setEarlyAttemptUsed] = useState([false, false, false, false]);
  const [gameEndReason, setGameEndReason] = useState(null);
  const [earlyWinnerTeam, setEarlyWinnerTeam] = useState(null);
  const [copyToast, setCopyToast] = useState(false);

  const currentTeam = teamOrder[questionIndex % 4];
  const currentRound = Math.floor(questionIndex / 4);
  const currentQuestion = randomQuestions[questionIndex];
  const currentFragment = teamQuotes[currentTeam].fragments[currentRound];
  const totalQuestions = 40;

  useEffect(() => {
    if (stage !== 'questions' || questionPhase !== 'reading' || earlyAnswerTeam !== null) return undefined;
    if (readingTimeLeft <= 0) {
      setQuestionPhase('answering');
      setTimeLeft(20);
      return undefined;
    }
    const timer = window.setTimeout(() => setReadingTimeLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, questionIndex, questionPhase, readingTimeLeft, earlyAnswerTeam]);

  useEffect(() => {
    if (stage !== 'questions' || questionPhase !== 'answering' || earlyAnswerTeam !== null || feedback?.correct || feedback?.timeout) return undefined;
    if (timeLeft <= 0) {
      SoundFx.playWrong();
      setCollectedWords((current) => current.map((words, index) => index === currentTeam && !words.includes(currentRound) ? [...words, currentRound] : words));
      setFeedback({ correct: false, timeout: true });
      return undefined;
    }
    if (timeLeft <= 5) {
      SoundFx.playTick();
    }
    const timer = window.setTimeout(() => setTimeLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, questionIndex, questionPhase, timeLeft, feedback?.correct, feedback?.timeout, currentTeam, currentRound, earlyAnswerTeam]);

  useEffect(() => {
    if (earlyAnswerTeam === null || earlyAnswerFeedback?.correct || earlyAnswerFeedback?.timeout) return undefined;
    if (earlyAnswerTime <= 0) {
      SoundFx.playWrong();
      setEarlyAnswerFeedback({ correct: false, timeout: true });
      return undefined;
    }
    if (earlyAnswerTime <= 5) {
      SoundFx.playTick();
    }
    const timer = window.setTimeout(() => setEarlyAnswerTime((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [earlyAnswerTeam, earlyAnswerTime, earlyAnswerFeedback?.correct, earlyAnswerFeedback?.timeout]);

  useEffect(() => {
    if (earlyAnswerTeam === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeEarlyAnswer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [earlyAnswerTeam]);

  useEffect(() => {
    if (stage !== 'assemble' || assemblyCompleted[activeAssemblyTeam]) return undefined;
    if (assemblyTimeLeft <= 0) {
      SoundFx.playWrong();
      const completed = assemblyCompleted.map((value, index) => index === activeAssemblyTeam ? true : value);
      setAssemblyCompleted(completed);
      const nextTeam = teamOrder.find((teamIndex) => !completed[teamIndex]);
      if (nextTeam === undefined) {
        setGameEndReason('assembly');
        setStage('result');
        SoundFx.playVictory();
      }
      else {
        setActiveAssemblyTeam(nextTeam);
        setAssemblyTimeLeft(60);
      }
      return undefined;
    }
    if (assemblyTimeLeft <= 5) {
      SoundFx.playTick();
    }
    const timer = window.setTimeout(() => setAssemblyTimeLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, activeAssemblyTeam, assemblyTimeLeft, assemblyCompleted, teamOrder]);

  const drawTeamOrder = () => {
    SoundFx.playClick();
    setIsDrawing(true);
    setOrderDrawn(false);
    window.setTimeout(() => {
      const order = [0, 1, 2, 3];
      for (let index = order.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
      }
      setTeamOrder(order);
      setOrderDrawn(true);
      setIsDrawing(false);
      SoundFx.playCorrect();
    }, 850);
  };

  const applyHistoricalPresets = () => {
    SoundFx.playClick();
    setTeamNames(['Đại Đoàn 312 (Him Lam)', 'Đại Đoàn 308 (Tiên Phong)', 'Đại Đoàn 316 (Đồi A1)', 'Đại Đoàn 351 (Pháo Binh)']);
  };

  const startGame = () => {
    if (!orderDrawn) return;
    SoundFx.playClick();
    setRandomQuestions(randomizeQuestionBank(providedQuestionBank));
    setQuestionPhase('reading');
    setReadingTimeLeft(5);
    setTimeLeft(20);
    setStage('questions');
  };

  const openEarlyAnswer = (teamIndex) => {
    if (assemblyCompleted[teamIndex] || earlyAttemptUsed[teamIndex]) return;
    SoundFx.playClick();
    setEarlyAttemptUsed((current) => current.map((value, index) => index === teamIndex ? true : value));
    setEarlyAnswerTeam(teamIndex);
    setEarlyAnswerText('');
    setEarlyAnswerTime(60);
    setEarlyAnswerFeedback(null);
  };

  const closeEarlyAnswer = () => {
    SoundFx.playClick();
    setEarlyAnswerTeam(null);
    setEarlyAnswerText('');
    setEarlyAnswerFeedback(null);
  };

  const normalizeAnswer = (value) => value.toLocaleLowerCase('vi-VN').normalize('NFC').replace(/[.,!?:;“”"']/g, '').replace(/\s+/g, ' ').trim();

  const submitEarlyAnswer = () => {
    if (earlyAnswerTeam === null || earlyAnswerTime <= 0) return;
    const correct = normalizeAnswer(earlyAnswerText) === normalizeAnswer(teamQuotes[earlyAnswerTeam].quote);
    if (correct) {
      SoundFx.playVictory();
      setAssemblyCompleted((current) => current.map((value, index) => index === earlyAnswerTeam ? true : value));
      setAssemblyCorrect((current) => current.map((value, index) => index === earlyAnswerTeam ? true : value));
      setScores((current) => {
        const winningScore = Math.max(...current) + 500;
        return current.map((score, index) => index === earlyAnswerTeam ? winningScore : score);
      });
      setEarlyAnswerFeedback({ correct: true });
      setEarlyWinnerTeam(earlyAnswerTeam);
      setGameEndReason('early');
      setStage('result');
    } else {
      SoundFx.playWrong();
      setEarlyAnswerFeedback({ correct: false });
    }
  };

  const answerQuestion = (optionIndex) => {
    if (questionPhase !== 'answering' || feedback?.correct || feedback?.timeout || timeLeft <= 0 || wrongOptions.includes(optionIndex)) return;
    if (optionIndex === currentQuestion.correct) {
      SoundFx.playCorrect();
      const points = Math.max(40, 100 - attempts * 25);
      setScores((current) => current.map((score, index) => index === currentTeam ? score + points : score));
      setCollectedWords((current) => current.map((words, index) => index === currentTeam ? [...words, currentRound] : words));
      setFeedback({ correct: true, points });
    } else {
      SoundFx.playWrong();
      setWrongOptions((current) => [...current, optionIndex]);
      setAttempts((current) => current + 1);
      setFeedback({ correct: false });
    }
  };

  const nextQuestion = () => {
    SoundFx.playClick();
    if (!feedback?.correct && !feedback?.timeout) return;
    if (questionIndex === totalQuestions - 1) {
      const nextAssemblyTeam = teamOrder.find((teamIndex) => !assemblyCompleted[teamIndex]);
      if (nextAssemblyTeam === undefined) {
        setGameEndReason('assembly');
        setStage('result');
        SoundFx.playVictory();
      }
      else {
        setActiveAssemblyTeam(nextAssemblyTeam);
        setAssemblyTimeLeft(60);
        setStage('assemble');
      }
    }
    else setQuestionIndex((current) => current + 1);
    setWrongOptions([]);
    setAttempts(0);
    setQuestionPhase('reading');
    setReadingTimeLeft(5);
    setTimeLeft(20);
    setFeedback(null);
  };

  // Keyboard shortcut listener for question stage
  useEffect(() => {
    if (stage !== 'questions' || earlyAnswerTeam !== null) return;
    const handleKey = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (questionPhase === 'answering' && !feedback?.correct && !feedback?.timeout && timeLeft > 0) {
        const key = e.key.toUpperCase();
        if (['1', 'A'].includes(key) && currentQuestion?.options[0]) answerQuestion(0);
        else if (['2', 'B'].includes(key) && currentQuestion?.options[1]) answerQuestion(1);
        else if (['3', 'C'].includes(key) && currentQuestion?.options[2]) answerQuestion(2);
        else if (['4', 'D'].includes(key) && currentQuestion?.options[3]) answerQuestion(3);
      } else if ((feedback?.correct || feedback?.timeout) && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [stage, questionPhase, feedback, timeLeft, earlyAnswerTeam, currentQuestion]);

  const addWord = (id) => {
    SoundFx.playClick();
    if (!teamSentences[activeAssemblyTeam].includes(id)) {
      setTeamSentences((current) => current.map((words, index) => index === activeAssemblyTeam ? [...words, id] : words));
      setAssemblyError(false);
    }
  };

  const removeWord = (id) => {
    SoundFx.playClick();
    setTeamSentences((current) => current.map((words, index) => index === activeAssemblyTeam ? words.filter((wordId) => wordId !== id) : words));
    setAssemblyError(false);
  };

  const clearSentence = () => {
    SoundFx.playClick();
    setTeamSentences((current) => current.map((words, index) => index === activeAssemblyTeam ? [] : words));
    setAssemblyError(false);
  };

  const checkSentence = () => {
    const currentSentence = teamSentences[activeAssemblyTeam];
    const correct = currentSentence.length === 10 && currentSentence.every((id, index) => id === index);
    if (correct) {
      SoundFx.playCorrect();
      const completed = assemblyCompleted.map((value, index) => index === activeAssemblyTeam ? true : value);
      setAssemblyCorrect((current) => current.map((value, index) => index === activeAssemblyTeam ? true : value));
      setAssemblyCompleted(completed);
      const nextTeam = teamOrder.find((teamIndex) => !completed[teamIndex]);
      if (nextTeam === undefined) {
        setGameEndReason('assembly');
        setStage('result');
        SoundFx.playVictory();
      }
      else {
        setActiveAssemblyTeam(nextTeam);
        setAssemblyTimeLeft(60);
      }
      setAssemblyError(false);
    } else {
      SoundFx.playWrong();
      setAssemblyError(true);
    }
  };

  const restart = () => {
    SoundFx.playClick();
    setStage('setup');
    setQuestionIndex(0);
    setScores([0, 0, 0, 0]);
    setCollectedWords([[], [], [], []]);
    setWrongOptions([]);
    setAttempts(0);
    setQuestionPhase('reading');
    setReadingTimeLeft(5);
    setTimeLeft(20);
    setFeedback(null);
    setTeamSentences([[], [], [], []]);
    setAssemblyCompleted([false, false, false, false]);
    setAssemblyCorrect([false, false, false, false]);
    setActiveAssemblyTeam(0);
    setAssemblyTimeLeft(60);
    setAssemblyError(false);
    setTeamOrder([0, 1, 2, 3]);
    setOrderDrawn(false);
    setIsDrawing(false);
    setTeamMascots([0, 1, 2, 3]);
    setEarlyAnswerTeam(null);
    setEarlyAnswerText('');
    setEarlyAnswerTime(60);
    setEarlyAnswerFeedback(null);
    setEarlyAttemptUsed([false, false, false, false]);
    setGameEndReason(null);
    setEarlyWinnerTeam(null);
  };

  const copyResults = () => {
    SoundFx.playClick();
    const text = rankedTeams.map((t, idx) => `Hạng ${idx + 1}: ${t.name} — ${t.score} điểm (${mascotOptions[teamMascots[t.teamIndex]].emoji})`).join('\n');
    navigator.clipboard?.writeText?.(`🏆 BẢNG VÀNG THÀNH TÍCH · GAME CHIẾN LƯỢC ĐIỆN BIÊN PHỦ\n\n${text}\n\nChúc mừng các đại đoàn đã hoàn thành xuất sắc nhiệm vụ!`);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const highestScore = Math.max(...scores);
  const winners = teamNames.map((name, index) => name || `Nhóm ${index + 1}`).filter((_, index) => scores[index] === highestScore);
  const rankedTeams = teamNames.map((name, index) => ({ name: name || `Nhóm ${index + 1}`, teamIndex: index, score: scores[index] })).sort((first, second) => second.score - first.score);

  return (
    <main className="interactive-page game-page">
      <SiteHeader current="game" navigate={navigate} />
      <div className="game-grid-bg" />
      {stage === 'result' && <ConfettiCanvas />}

      {/* Rules Modal */}
      {showRulesModal && (
        <div
          className="rules-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowRulesModal(false)}
        >
          <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rules-close" onClick={() => setShowRulesModal(false)} aria-label="Đóng"><X /></button>
            <div className="rules-modal-header">
              <div className="section-kicker light"><span>★</span> Thể lệ trò chơi</div>
              <h2>Hướng dẫn thi đua 4 nhóm</h2>
              <p>Chiến thuật hiệp đồng 4 nhóm — Vừa khảo thí kiến thức, vừa mở khóa và sắp xếp thông điệp lịch sử.</p>
            </div>
            <div className="rules-modal-grid">
              <div className="rule-card">
                <div className="rule-badge">Vòng 1</div>
                <h3>Khảo thí & Mở mảnh ghép</h3>
                <ul>
                  <li><strong>4 nhóm lần lượt</strong> trả lời 40 câu hỏi trắc nghiệm (10 câu mỗi nhóm).</li>
                  <li><strong>5 giây</strong> đọc đề + <strong>20 giây</strong> bấm chọn đáp án.</li>
                  <li>Đúng ngay lần 1: <strong className="pts-pos">+100 điểm</strong> & mở 1 mảnh ghép.</li>
                  <li>Chọn sai: <strong className="pts-neg">-25 điểm</strong> và được quyền thử lại.</li>
                  <li>Hết 20s: 0 điểm (mảnh ghép vẫn được mở để công bằng ghép câu).</li>
                </ul>
              </div>
              <div className="rule-card">
                <div className="rule-badge">Vòng 2</div>
                <h3>Ghép câu trích dẫn</h3>
                <ul>
                  <li>Từng nhóm có <strong>60 giây</strong> ghép 10 mảnh thành câu hoàn chỉnh.</li>
                  <li>Bấm từng từ trong kho để xếp vào vị trí; bấm lại để trả về kho.</li>
                  <li>Hoàn thành chuẩn xác: <strong className="pts-pos">+150 điểm</strong>.</li>
                </ul>
              </div>
              <div className="rule-card highlight-rule">
                <div className="rule-badge gold">Chiến thuật đỉnh cao</div>
                <h3>Đoán sớm (Early Answer)</h3>
                <ul>
                  <li>Bất kỳ lúc nào ở <strong>Vòng 1</strong>, nếu nhóm tự tin đã đoán được câu hoàn chỉnh:</li>
                  <li>Bấm nút <strong>"Trả lời tổng"</strong> (60s nhập câu, duy nhất 1 cơ hội).</li>
                  <li>Nếu nhập chính xác: nhận ngay <strong className="pts-pos">+500 điểm</strong> và <strong>chiến thắng áp đảo toàn trận!</strong></li>
                </ul>
              </div>
            </div>
            <button className="rules-ok-btn" onClick={() => setShowRulesModal(false)}>
              Đã hiểu thể lệ & Sẵn sàng <Check size={16} />
            </button>
          </div>
        </div>
      )}

      {stage === 'setup' && (
        <section className="group-game-shell setup-stage">
          <div className="game-title-block">
            <div className="section-kicker light"><span>G</span> Trò chơi dành cho 4 nhóm</div>
            <h1>Nhặt từ khóa,<br /><em>ghép câu lịch sử</em></h1>
            <p>Mỗi nhóm trả lời 10 câu hỏi để mở khóa 10 mảnh ghép trong kho riêng. Cuối trò chơi, từng nhóm sắp xếp các mảnh thành câu danh ngôn & bài học của mình.</p>
            <div className="game-feature-badges">
              <span className="feat-pill"><Users size={13} /> 4 Nhóm thi đua</span>
              <span className="feat-pill"><Zap size={13} /> Khảo thí 40 câu</span>
              <span className="feat-pill"><Sparkles size={13} /> Ghép câu danh ngôn</span>
            </div>
          </div>
          <div className="setup-panel">
            <div className="rules-row">
              <div><strong>01</strong><span>4 nhóm lần lượt trả lời</span></div>
              <div><strong>02</strong><span>Đúng để đưa chữ về kho riêng</span></div>
              <div><strong>03</strong><span>Mỗi nhóm ghép một câu riêng</span></div>
            </div>
            <div className="setup-head-action">
              <h2>Đặt tên cho các nhóm</h2>
              <div className="setup-action-group">
                <button className="rule-info-btn" onClick={() => setShowRulesModal(true)} title="Xem chi tiết thể lệ">
                  <Info size={13} /> Thể lệ & Tính điểm
                </button>
                <button className="preset-name-btn" onClick={applyHistoricalPresets} title="Điền nhanh tên các Đại đoàn anh hùng">
                  <Zap size={13} /> Gợi ý tên 4 Đại Đoàn
                </button>
              </div>
            </div>
            <div className="team-inputs">
              {teamNames.map((name, index) => (
                <label className={colors[index]} key={index}>
                  <span>0{index + 1}</span>
                  <input
                    value={name}
                    maxLength={24}
                    onChange={(event) => setTeamNames((current) => current.map((team, teamIndex) => teamIndex === index ? event.target.value : team))}
                    placeholder={`Tên Nhóm ${index + 1}`}
                  />
                </label>
              ))}
            </div>
            <h2 className="mascot-title">Chọn linh vật riêng</h2>
            <div className="mascot-selectors">
              {teamNames.map((name, teamIndex) => (
                <label className={colors[teamIndex]} key={teamIndex}>
                  <span className="mascot-preview">{mascotOptions[teamMascots[teamIndex]].emoji}</span>
                  <div>
                    <small>{name || `Nhóm ${teamIndex + 1}`}</small>
                    <select
                      value={teamMascots[teamIndex]}
                      onChange={(event) => setTeamMascots((current) => current.map((mascot, index) => index === teamIndex ? Number(event.target.value) : mascot))}
                    >
                      {mascotOptions.map((mascot, mascotIndex) => (
                        <option
                          disabled={teamMascots.includes(mascotIndex) && teamMascots[teamIndex] !== mascotIndex}
                          value={mascotIndex}
                          key={mascot.name}
                        >
                          {mascot.emoji} {mascot.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              ))}
            </div>
            <div className={`order-draw ${isDrawing ? 'drawing' : ''} ${orderDrawn ? 'drawn' : ''}`}>
              <div className="order-draw-head">
                <span>Bốc thăm thứ tự chơi</span>
                <small>{orderDrawn ? '✓ Đã có thứ tự thi đấu' : 'Bắt buộc trước khi bắt đầu'}</small>
              </div>
              <div className="play-order">
                {(isDrawing ? [0, 1, 2, 3] : teamOrder).map((teamIndex, orderIndex) => (
                  <div className={isDrawing ? 'mystery' : colors[teamIndex]} key={orderIndex}>
                    <span>Lượt {orderIndex + 1}</span>
                    <strong>
                      {isDrawing ? '?' : orderDrawn ? (
                        <>
                          <i>{mascotOptions[teamMascots[teamIndex]].emoji}</i>
                          {teamNames[teamIndex] || `Nhóm ${teamIndex + 1}`}
                        </>
                      ) : 'Chưa bốc thăm'}
                    </strong>
                  </div>
                ))}
              </div>
              <button className="draw-order-button" disabled={isDrawing} onClick={drawTeamOrder}>
                <Sparkles />
                {isDrawing ? 'Đang xáo trộn ngẫu nhiên...' : orderDrawn ? 'Bốc thăm lại thứ tự' : 'Bốc thăm thứ tự lượt chơi'}
              </button>
            </div>
            <button className="start-group-game" disabled={!orderDrawn || isDrawing} onClick={startGame}>
              Bắt đầu trò chơi <ArrowRight />
            </button>
          </div>
        </section>
      )}

      {stage === 'questions' && (
        <section className="group-game-shell question-stage">
          <header className="round-heading">
            <div>
              <div className="section-kicker light"><span>1</span> Vòng 1 · Khảo thí & Mở mảnh ghép</div>
              <h1>Câu hỏi <em>{String(questionIndex + 1).padStart(2, '0')}</em></h1>
            </div>
            <div className="round-progress">
              <span>{questionIndex + 1} / {totalQuestions} câu tổng ({currentRound + 1}/10 lượt)</span>
              <div><i style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }} /></div>
            </div>
          </header>

          <div className="team-scoreboard">
            {teamOrder.map((teamIndex, orderIndex) => {
              const count = collectedWords[teamIndex].length;
              return (
                <div className={`${colors[teamIndex]} ${currentTeam === teamIndex ? 'active' : ''}`} key={teamIndex}>
                  <span className="team-dot mascot-dot" title={`Lượt ${orderIndex + 1}`}>{mascotOptions[teamMascots[teamIndex]].emoji}</span>
                  <div className="team-score-info">
                    <strong>{teamNames[teamIndex] || `Nhóm ${teamIndex + 1}`}</strong>
                    <small>{count}/10 mảnh ghép</small>
                    <div className="fragment-dots-row">
                      {Array.from({ length: 10 }).map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`frag-dot ${collectedWords[teamIndex].includes(dotIdx) ? 'unlocked' : ''}`}
                          title={`Mảnh ${dotIdx + 1}: ${collectedWords[teamIndex].includes(dotIdx) ? teamQuotes[teamIndex].fragments[dotIdx] : 'Chưa mở'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <b>{scores[teamIndex]}</b>
                </div>
              );
            })}
          </div>

          <div className="early-answer-bar">
            <div><Sparkles /><span><strong>Đã đoán ra câu danh ngôn?</strong> Mỗi nhóm có một lượt trả lời tổng sớm (+500đ nếu chính xác).</span></div>
            <div>
              {teamOrder.map((teamIndex) => (
                <button
                  className={colors[teamIndex]}
                  disabled={assemblyCompleted[teamIndex] || earlyAttemptUsed[teamIndex]}
                  onClick={() => openEarlyAnswer(teamIndex)}
                  key={teamIndex}
                >
                  {assemblyCompleted[teamIndex] ? <><Check /> Đã giải</> : earlyAttemptUsed[teamIndex] ? <><Clock3 /> Đã thử</> : <>{mascotOptions[teamMascots[teamIndex]].emoji} {teamNames[teamIndex] || `Nhóm ${teamIndex + 1}`} trả lời tổng</>}
                </button>
              ))}
            </div>
          </div>

          <article className="group-question-card">
            <div className={`turn-card ${colors[currentTeam]}`}>
              <small>Đang đến lượt trả lời</small>
              <strong>{teamNames[currentTeam] || `Nhóm ${currentTeam + 1}`}</strong>
              <div className="turn-mascot">
                <span>{mascotOptions[teamMascots[currentTeam]].emoji}</span>
                <small>{mascotOptions[teamMascots[currentTeam]].name}</small>
              </div>
              <p>Trả lời đúng ngay lần đầu nhận trọn <b>100 điểm</b> & mở mảnh ghép.</p>
              <div className="hidden-word">
                <span>Mảnh ghép của câu này</span>
                <strong>{feedback?.correct || feedback?.timeout ? currentFragment : '••••••••'}</strong>
              </div>
            </div>
            <div className="group-question-main">
              <div className="question-meta-row">
                <small>Câu {currentRound + 1}/10 dành cho {teamNames[currentTeam] || `Nhóm ${currentTeam + 1}`}</small>
                <div className={`question-timer ${questionPhase === 'reading' ? 'reading' : ''} ${questionPhase === 'answering' && timeLeft <= 5 ? 'danger' : ''} ${feedback?.correct ? 'stopped' : ''}`}>
                  <Clock3 />
                  <strong>{questionPhase === 'reading' ? readingTimeLeft : timeLeft}</strong>
                  <span>{questionPhase === 'reading' ? 'đọc đề' : 'giây'}</span>
                  <div><i style={{ width: `${questionPhase === 'reading' ? (readingTimeLeft / 5) * 100 : (timeLeft / 20) * 100}%` }} /></div>
                </div>
              </div>
              <h2>{currentQuestion.question}</h2>
              {questionPhase === 'reading' ? (
                <div className="reading-answer-screen">
                  <BookOpen />
                  <div>
                    <strong>Thời gian đọc kỹ câu hỏi</strong>
                    <span>4 đáp án sẽ mở tự động sau {readingTimeLeft} giây...</span>
                  </div>
                </div>
              ) : (
                <div className="group-answer-grid">
                  {currentQuestion.options.map((option, optionIndex) => (
                    <button
                      className={`${wrongOptions.includes(optionIndex) ? 'wrong' : ''} ${(feedback?.correct || feedback?.timeout) && optionIndex === currentQuestion.correct ? 'correct' : ''}`}
                      disabled={feedback?.correct || feedback?.timeout || wrongOptions.includes(optionIndex)}
                      onClick={() => answerQuestion(optionIndex)}
                      key={option}
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      {option}
                      {(feedback?.correct || feedback?.timeout) && optionIndex === currentQuestion.correct && <Check />}
                    </button>
                  ))}
                </div>
              )}
              {feedback && (
                <div className={`group-feedback ${feedback.correct ? 'correct' : feedback.timeout ? 'timeout' : 'wrong'}`} aria-live="polite">
                  {feedback.correct ? (
                    <><Check /><span><strong>Chính xác! +{feedback.points} điểm</strong>Mảnh ghép “{currentFragment}” đã được chuyển vào kho của nhóm.</span></>
                  ) : feedback.timeout ? (
                    <><Clock3 /><span><strong>Hết 20 giây!</strong>Đáp án đúng là {String.fromCharCode(65 + currentQuestion.correct)}. Mảnh ghép vẫn được mở, nhóm không có điểm.</span></>
                  ) : (
                    <><X /><span><strong>Chưa chính xác, hãy chọn lại!</strong>Mỗi lần sai điểm câu hỏi sẽ giảm 25 điểm.</span></>
                  )}
                </div>
              )}
              <button
                className="next-group-question"
                disabled={!feedback?.correct && !feedback?.timeout}
                onClick={nextQuestion}
              >
                {questionIndex === totalQuestions - 1 ? 'Sang Vòng 2 Ghép câu' : 'Chuyển lượt cho nhóm tiếp theo'} <ArrowRight />
              </button>
            </div>
          </article>
        </section>
      )}

      {stage === 'assemble' && (
        <section className="group-game-shell assembly-stage">
          <header className="assembly-heading">
            <div className="section-kicker light"><span>2</span> Vòng 2 · Bốn nhóm ghép bốn câu danh ngôn</div>
            <h1>Mỗi nhóm hoàn thiện<br /><em>câu của mình</em></h1>
            <p>Mỗi nhóm có 60 giây. Nhấn vào từng mảnh ghép trong kho theo đúng thứ tự câu trích dẫn; nhấn lại mảnh ghép trong câu để trả về kho.</p>
          </header>
          <div className={`assembly-timer ${assemblyTimeLeft <= 10 ? 'danger' : ''}`}>
            <Clock3 />
            <span>Thời gian ghép của {teamNames[activeAssemblyTeam] || `Nhóm ${activeAssemblyTeam + 1}`}</span>
            <strong>{String(Math.floor(assemblyTimeLeft / 60)).padStart(2, '0')}:{String(assemblyTimeLeft % 60).padStart(2, '0')}</strong>
            <div><i style={{ width: `${(assemblyTimeLeft / 60) * 100}%` }} /></div>
          </div>
          <div className="assembly-team-tabs">
            {teamNames.map((name, index) => (
              <button
                className={`${colors[index]} ${activeAssemblyTeam === index ? 'active' : ''} ${assemblyCompleted[index] ? 'completed' : ''}`}
                disabled={activeAssemblyTeam !== index || assemblyCompleted[index]}
                key={index}
              >
                <span>0{index + 1}</span>
                <strong>{name || `Nhóm ${index + 1}`}</strong>
                {assemblyCompleted[index] ? assemblyCorrect[index] ? <Check /> : <Clock3 /> : <small>{teamSentences[index].length}/10</small>}
              </button>
            ))}
          </div>

          <div className="active-vault-label-wrapper">
            <div className="active-vault-label"><span>Đang ghép câu của</span><strong>{teamNames[activeAssemblyTeam] || `Nhóm ${activeAssemblyTeam + 1}`}</strong></div>
            {teamSentences[activeAssemblyTeam].length > 0 && !assemblyCompleted[activeAssemblyTeam] && (
              <button className="clear-sentence-btn" onClick={clearSentence} title="Xóa toàn bộ các từ đã chọn để sắp xếp lại">
                <RotateCcw size={13} /> Xóa làm lại
              </button>
            )}
          </div>

          <div className={`assembly-slots-rack ${assemblyError ? 'has-error' : ''} ${assemblyCompleted[activeAssemblyTeam] ? 'is-complete' : ''}`}>
            {Array.from({ length: 10 }).map((_, slotIndex) => {
              const fragmentId = teamSentences[activeAssemblyTeam][slotIndex];
              const hasWord = fragmentId !== undefined;
              return (
                <div
                  key={slotIndex}
                  className={`assembly-slot ${hasWord ? 'filled' : 'empty'}`}
                  onClick={() => {
                    if (hasWord && !assemblyCompleted[activeAssemblyTeam]) {
                      removeWord(fragmentId);
                    }
                  }}
                  title={hasWord ? 'Bấm để trả về kho' : `Vị trí ${slotIndex + 1}`}
                >
                  <span className="slot-num">{String(slotIndex + 1).padStart(2, '0')}</span>
                  {hasWord ? (
                    <div className="slot-word">
                      <strong>{teamQuotes[activeAssemblyTeam].fragments[fragmentId]}</strong>
                      {!assemblyCompleted[activeAssemblyTeam] && <X size={11} />}
                    </div>
                  ) : (
                    <span className="slot-placeholder">Vị trí {slotIndex + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          {assemblyError && <div className="assembly-message"><X /> Thứ tự chưa chính xác. Hãy đọc kỹ ý nghĩa câu và thử sắp xếp lại nhé!</div>}

          <div className={`single-team-vault ${colors[activeAssemblyTeam]}`}>
            <header>
              <span>Kho 10 mảnh ghép của nhóm (Bấm chọn theo thứ tự)</span>
              <strong>{teamNames[activeAssemblyTeam] || `Nhóm ${activeAssemblyTeam + 1}`}</strong>
            </header>
            <div>
              {teamQuotes[activeAssemblyTeam].shuffle.map((id) => (
                <button
                  className={teamSentences[activeAssemblyTeam].includes(id) ? 'used' : ''}
                  disabled={teamSentences[activeAssemblyTeam].includes(id) || assemblyCompleted[activeAssemblyTeam]}
                  onClick={() => addWord(id)}
                  key={`${activeAssemblyTeam}-vault-${id}`}
                >
                  <span>{teamQuotes[activeAssemblyTeam].fragments[id]}</span>
                  <small>{teamSentences[activeAssemblyTeam].includes(id) ? 'Đã xếp' : 'Bấm chọn'}</small>
                </button>
              ))}
            </div>
          </div>
          <button
            className="check-sentence"
            disabled={teamSentences[activeAssemblyTeam].length !== 10}
            onClick={checkSentence}
          >
            <Check /> Kiểm tra câu của nhóm
          </button>
        </section>
      )}

      {stage === 'result' && (
        <section className="group-game-shell final-stage">
          <div className="result-medal"><Trophy /></div>
          <div className="section-kicker light"><span>★</span>{gameEndReason === 'early' ? ' Trả lời tổng chính xác' : ' Hoàn thành xuất sắc'}</div>
          <h1>
            {gameEndReason === 'early' && earlyWinnerTeam !== null ? (
              <>{teamNames[earlyWinnerTeam] || `Nhóm ${earlyWinnerTeam + 1}`}<br /><em>giành chiến thắng oanh liệt!</em></>
            ) : assemblyCorrect.every(Boolean) ? (
              <>Cả bốn đại đoàn<br /><em>đều toàn thắng!</em></>
            ) : (
              <>Hoàn thành<br /><em>hành trình lịch sử!</em></>
            )}
          </h1>

          {/* Grand Victory Podium */}
          <div className="victory-podium">
            {/* 2nd Place (Silver) */}
            {rankedTeams[1] && (
              <div className={`podium-stand rank-2 ${colors[rankedTeams[1].teamIndex]}`}>
                <div className="podium-team">
                  <span className="podium-mascot">{mascotOptions[teamMascots[rankedTeams[1].teamIndex]].emoji}</span>
                  <strong>{rankedTeams[1].name}</strong>
                  <b>{rankedTeams[1].score} điểm</b>
                </div>
                <div className="podium-pillar pillar-2">
                  <span className="podium-rank">2</span>
                  <small>Hạng Nhì</small>
                </div>
              </div>
            )}

            {/* 1st Place (Gold) */}
            {rankedTeams[0] && (
              <div className={`podium-stand rank-1 ${colors[rankedTeams[0].teamIndex]}`}>
                <div className="podium-crown"><Trophy size={28} /></div>
                <div className="podium-team">
                  <span className="podium-mascot">{mascotOptions[teamMascots[rankedTeams[0].teamIndex]].emoji}</span>
                  <strong>{rankedTeams[0].name}</strong>
                  <b>{rankedTeams[0].score} điểm</b>
                </div>
                <div className="podium-pillar pillar-1">
                  <span className="podium-rank">1</span>
                  <small>Vô Địch</small>
                </div>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {rankedTeams[2] && (
              <div className={`podium-stand rank-3 ${colors[rankedTeams[2].teamIndex]}`}>
                <div className="podium-team">
                  <span className="podium-mascot">{mascotOptions[teamMascots[rankedTeams[2].teamIndex]].emoji}</span>
                  <strong>{rankedTeams[2].name}</strong>
                  <b>{rankedTeams[2].score} điểm</b>
                </div>
                <div className="podium-pillar pillar-3">
                  <span className="podium-rank">3</span>
                  <small>Hạng Ba</small>
                </div>
              </div>
            )}
          </div>

          <div className="parchment-quotes-section">
            <h3>4 Thông điệp Lịch sử được hoàn thiện</h3>
            <div className={`final-quotes ${gameEndReason === 'early' ? 'early-all-quotes' : ''}`}>
              {teamQuotes.map((item, index) => (
                <blockquote className={`${colors[index]} ${gameEndReason === 'early' && earlyWinnerTeam === index ? 'decisive' : ''}`} key={item.quote}>
                  <span>{gameEndReason === 'early' ? mascotOptions[teamMascots[index]].emoji : assemblyCorrect[index] ? <Check /> : <Clock3 />}</span>
                  <div>
                    <small>
                      {teamNames[index] || `Nhóm ${index + 1}`} · {gameEndReason === 'early' ? earlyWinnerTeam === index ? 'Trả lời đúng — Câu quyết định' : 'Câu trả lời tổng' : assemblyCorrect[index] ? 'Ghép đúng hoàn chỉnh' : 'Hết thời gian'}
                    </small>
                    <p>“{item.quote}”</p>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>

          <div className="ranking-title">
            <span>Bảng tổng kết điểm số</span>
            <button className="copy-results-btn" onClick={copyResults} title="Sao chép bảng kết quả">
              <Copy size={13} /> {copyToast ? 'Đã sao chép vào Clipboard!' : 'Sao chép bảng thành tích'}
            </button>
          </div>
          <div className="final-scoreboard">
            {rankedTeams.map((team, rankIndex) => (
              <div className={`${colors[team.teamIndex]} ${rankIndex === 0 ? 'winner' : ''}`} key={team.teamIndex}>
                <small className="rank-number">Hạng {rankIndex + 1}</small>
                <span className="final-mascot">{mascotOptions[teamMascots[team.teamIndex]].emoji}</span>
                <strong>{team.name}</strong>
                <b>{team.score} điểm</b>
                {rankIndex === 0 && <Trophy />}
              </div>
            ))}
          </div>
          <p className="winner-line">Đại đoàn dẫn đầu: <strong>{winners.join(' & ')}</strong></p>
          <div className="result-actions">
            <button onClick={restart}><RotateCcw /> Chơi lại ván mới</button>
            <button className="accent" onClick={() => navigate('presentation')}>Về trang Thuyết trình <Flag size={14} fill="currentColor" /></button>
          </div>
        </section>
      )}

      {earlyAnswerTeam !== null && (
        <div
          className="early-answer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Trả lời tổng sớm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeEarlyAnswer();
          }}
        >
          <div className={`early-answer-modal ${colors[earlyAnswerTeam]}`}>
            <button className="early-close" onClick={closeEarlyAnswer} aria-label="Đóng"><X /></button>
            <div className="early-modal-head">
              <span>Thử thách trả lời tổng</span>
              <h2>{teamNames[earlyAnswerTeam] || `Nhóm ${earlyAnswerTeam + 1}`}</h2>
              <p>Nhập đầy đủ câu danh ngôn / đường lối mà nhóm dự đoán từ các mảnh đã thu thập.</p>
            </div>
            <div className={`early-timer ${earlyAnswerTime <= 10 ? 'danger' : ''}`}>
              <Clock3 />
              <span>Thời gian còn lại</span>
              <strong>{String(Math.floor(earlyAnswerTime / 60)).padStart(2, '0')}:{String(earlyAnswerTime % 60).padStart(2, '0')}</strong>
              <div><i style={{ width: `${(earlyAnswerTime / 60) * 100}%` }} /></div>
            </div>
            <div className="early-collected">
              <small>Mảnh ghép nhóm đang có</small>
              <div>
                {collectedWords[earlyAnswerTeam].length ? (
                  collectedWords[earlyAnswerTeam].map((id) => <span key={id}>{teamQuotes[earlyAnswerTeam].fragments[id]}</span>)
                ) : (
                  <em>Chưa có mảnh ghép nào — nhóm đang thử tài phán đoán!</em>
                )}
              </div>
            </div>
            <label className="early-input">
              <span>Câu trả lời của nhóm</span>
              <textarea
                disabled={earlyAnswerFeedback?.correct || earlyAnswerFeedback?.timeout}
                value={earlyAnswerText}
                onChange={(event) => {
                  setEarlyAnswerText(event.target.value);
                  if (earlyAnswerFeedback && !earlyAnswerFeedback.timeout) setEarlyAnswerFeedback(null);
                }}
                placeholder="Nhập câu hoàn chỉnh tại đây..."
                autoFocus
              />
            </label>
            {earlyAnswerFeedback && (
              <div className={`early-result ${earlyAnswerFeedback.correct ? 'correct' : earlyAnswerFeedback.timeout ? 'timeout' : 'wrong'}`}>
                {earlyAnswerFeedback.correct ? (
                  <>
                    <Trophy />
                    <div>
                      <strong>Chính xác xuất sắc! +500 điểm</strong>
                      <span>Nhóm đã giải mã thành công câu trích dẫn và giành chiến thắng sớm!</span>
                    </div>
                  </>
                ) : earlyAnswerFeedback.timeout ? (
                  <>
                    <Clock3 />
                    <div>
                      <strong>Đã hết 60 giây</strong>
                      <span>Câu đúng là: “{teamQuotes[earlyAnswerTeam].quote}”</span>
                    </div>
                  </>
                ) : (
                  <>
                    <X />
                    <div>
                      <strong>Chưa chính xác</strong>
                      <span>Nhóm có thể chỉnh sửa và kiểm tra lại trong thời gian còn lại.</span>
                    </div>
                  </>
                )}
              </div>
            )}
            {earlyAnswerFeedback?.correct || earlyAnswerFeedback?.timeout ? (
              <button className="early-submit" onClick={closeEarlyAnswer}>Tiếp tục trò chơi <ArrowRight /></button>
            ) : (
              <button className="early-submit" disabled={!earlyAnswerText.trim()} onClick={submitEarlyAnswer}>
                <Check /> Kiểm tra câu trả lời
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  const validPages = ['presentation', 'game'];
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

  if (page === 'game') return <GamePage navigate={navigate} />;
  return <PresentationPage navigate={navigate} />;
}

export default App;

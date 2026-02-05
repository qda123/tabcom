
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, 
  BrainCircuit, 
  Eye, 
  Bot, 
  Database, 
  Network, 
  Cloud, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart3,
  Layers,
  Languages
} from 'lucide-react';

// --- Types ---
type Language = 'vi' | 'en';

interface TechItem {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
}

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  value: string[];
  image: string;
}

interface ProjectItem {
  id: string;
  title: string;
  client?: string;
  description: string;
  highlights: string[];
  impact: string[];
  image: string;
}

// --- Translations ---
const translations = {
  vi: {
    nav: {
      about: "Về chúng tôi",
      tech: "Công nghệ",
      products: "Sản phẩm",
      projects: "Dự án",
      contact: "Liên hệ"
    },
    hero: {
      badge: "Công ty AI Ứng dụng",
      title1: "Chuyển hóa AI thành",
      title2: "Giá trị Thực tế",
      description: "Trí tuệ thực tiễn. Tác động đo lường được. Chúng tôi thiết kế và xây dựng các hệ thống AI vận hành hiệu quả trong môi trường thực tế.",
      ctaPrimary: "Khám phá ngay",
      ctaSecondary: "Liên hệ tư vấn"
    },
    about: {
      subtitle: "Về chúng tôi",
      title: "Công ty Cổ phần TABCOM Việt Nam",
      description: "TABCOM VIET NAM là công ty công nghệ có chuyên môn sâu về trí tuệ nhân tạo ứng dụng, tập trung vào việc xây dựng các hệ thống điều khiển bằng AI vận hành hiệu quả trong môi trường thế giới thực.",
      capabilities: [
        { title: "Am hiểu nghiệp vụ", desc: "Hiểu sâu các lĩnh vực nghiệp vụ đặc thù để thiết kế giải pháp chính xác." },
        { title: "Năng lực kỹ thuật vững chắc", desc: "Năng lực kỹ thuật mạnh mẽ, triển khai hệ thống ổn định và bảo mật." },
        { title: "Ứng dụng những nghiên cứu & mô hình hóa AI", desc: "Nghiên cứu và tinh chỉnh các mô hình AI tiên tiến nhất cho từng bài toán." }
      ],
      quote: "Cùng với nhau, những năng lực này cho phép chúng tôi phát triển các giải pháp AI có thể được triển khai, tích hợp và tin cậy trong các bối cảnh tổ chức và vận hành thực tế. Mục tiêu của chúng tôi là cung cấp các hệ thống trí tuệ nhân tạo thiết thực với giá trị có thể đo lường được."
    },
    tech: {
      subtitle: "Công nghệ",
      title: "Công nghệ AI & Nền tảng Kỹ thuật"
    },
    delivery: {
      subtitle: "Cách thức TABCOM",
      title: "Chúng tôi triển khai AI như thế nào",
      items: [
        { title: "Ưu tiên AI Agent thông minh", desc: "Giải quyết các vấn đề kinh doanh và vận hành thực tế trước tiên." },
        { title: "Mô hình triển khai linh hoạt", desc: "API đám mây bảo mật hoặc môi trường riêng tư (On-premise), tùy theo nhu cầu khách hàng." },
        { title: "Bảo mật dữ liệu ngay từ thiết kế", desc: "Ranh giới dữ liệu rõ ràng, quản trị và kiểm soát quyền sử dụng." },
        { title: "Con người trong vòng lặp (Human-in-the-Loop)", desc: "Mặc định có sự xem xét, kiểm soát và giám sát của con người." },
        { title: "Khả năng vận hành lâu dài", desc: "Các hệ thống AI có khả năng triển khai, bảo trì và tiến hóa theo thời gian." }
      ]
    },
    products: {
      subtitle: "Sản phẩm Độc quyền",
      title: "Nền tảng AI Chuyên sâu",
      labels: {
        capabilities: "Tính năng cốt lõi",
        value: "Giá trị kinh doanh"
      }
    },
    projects: {
      subtitle: "Câu chuyện thành công",
      title: "Dự án Tiêu biểu",
      labels: {
        highlights: "Điểm nổi bật",
        impact: "Tác động đã xác thực"
      }
    },
    footer: {
      description: "Hợp tác với TABCOM VIET NAM trong lĩnh vực AI. Chúng tôi xây dựng các sản phẩm độc quyền và giải pháp tùy chỉnh mang lại giá trị lâu dài.",
      links: "Liên kết",
      info: "Thông tin liên hệ",
      rights: "© 2026 Công ty Cổ phần TABCOM Việt Nam. Bảo lưu mọi quyền."
    }
  },
  en: {
    nav: {
      about: "About Us",
      tech: "Technology",
      products: "Products",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      badge: "Applied AI Company",
      title1: "Turning AI into",
      title2: "Real-World Value",
      description: "Practical Intelligence. Measurable Impact. We design and build AI-driven systems that operate effectively in real-world environments.",
      ctaPrimary: "Explore Now",
      ctaSecondary: "Get Consultation"
    },
    about: {
      subtitle: "About Us",
      title: "TABCOM VIET NAM Joint Stock Company",
      description: "TABCOM VIET NAM is a technology company with strong expertise in applied artificial intelligence, focused on building AI-driven systems that operate effectively in real-world environments. Our capability is built on:",
      capabilities: [
        { title: "Domain Understanding", desc: "Deep insight into specific business domains for precise solution design." },
        { title: "Solid engineering capability", desc: "Strong technical capabilities for stable and secure system deployment." },
        { title: "Applied AI research and modeling", desc: "Researching and fine-tuning state-of-the-art AI models for specific problems." }
      ],
      quote: "Together, these capabilities enable us to develop AI solutions that can be deployed, integrated, and trusted within real organizational and operational contexts. Our focus is on delivering practical AI systems with measurable value."
    },
    tech: {
      subtitle: "Technology",
      title: "AI Technologies & Engineering Stack"
    },
    delivery: {
      subtitle: "The TABCOM Way",
      title: "How We Deliver AI Solutions",
      items: [
        { title: "Intelligent Agents First", desc: "Focusing on real business and operational problems first." },
        { title: "Flexible Deployment", desc: "Secure cloud APIs or private on-premise environments, based on client needs." },
        { title: "Privacy by Design", desc: "Clear data boundaries, governance, and usage control." },
        { title: "Human-in-the-Loop", desc: "Human review, control, and oversight by default." },
        { title: "Long-term Operability", desc: "Deployable, maintainable, and evolvable AI systems." }
      ]
    },
    products: {
      subtitle: "Proprietary Products",
      title: "Specialized AI Platforms",
      labels: {
        capabilities: "Core Capabilities",
        value: "Business Value"
      }
    },
    projects: {
      subtitle: "Success Stories",
      title: "Featured Projects",
      labels: {
        highlights: "Highlights",
        impact: "Impact Validated"
      }
    },
    footer: {
      description: "Partner with TABCOM VIET NAM in AI. We build proprietary products and custom solutions that deliver long-term value.",
      links: "Quick Links",
      info: "Contact Information",
      rights: "© 2026 TABCOM VIET NAM Joint Stock Company. All rights reserved."
    }
  }
};

// --- Components ---

const NavItem: React.FC<{ href: string; label: string; onClick?: () => void }> = ({ href, label, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-wider"
  >
    {label}
  </a>
);

const SectionTitle: React.FC<{ subtitle: string; title: string; centered?: boolean }> = ({ subtitle, title, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <h3 className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-2">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    <div className={`h-1 w-20 bg-blue-600 mt-4 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('vi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techStack = useMemo<TechItem[]>(() => [
    {
      title: "Large Language Models & NLP",
      description: lang === 'vi' ? "Xây dựng các hệ thống hội thoại và thấu hiểu bằng các mô hình tiên tiến nhất." : "Building conversational and understanding systems with state-of-the-art models.",
      technologies: ["ChatGPT", "Gemini", "Qwen", "Gemma", "DeepSeek"],
      icon: <BrainCircuit className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Computer Vision",
      description: lang === 'vi' ? "Thấu hiểu thị giác để giám sát, phát hiện và đo lường." : "Visual understanding for monitoring, detection, and measurement.",
      technologies: ["YOLO architectures", "U-Net", "Industrial vision models"],
      icon: <Eye className="w-8 h-8 text-blue-500" />
    },
    {
      title: lang === 'vi' ? "Đại lý thông minh & Tự động hóa" : "Intelligent Agents & Automation",
      description: lang === 'vi' ? "Các tác tử thực thi nhiệm vụ, tự động hóa quy trình và hỗ trợ ra quyết định." : "Agents for task execution, workflow automation, and decision support.",
      technologies: ["AI Agents", "Workflow Automation", "Monitoring"],
      icon: <Bot className="w-8 h-8 text-blue-500" />
    },
    {
      title: lang === 'vi' ? "Trí tuệ dữ liệu & ML" : "Data Intelligence & ML",
      description: lang === 'vi' ? "Học máy cổ điển và sâu cho dữ liệu có cấu trúc và phi cấu trúc." : "Classical and deep learning for structured and unstructured data.",
      technologies: ["Classical ML", "Time-series data", "Deep Learning"],
      icon: <Database className="w-8 h-8 text-blue-500" />
    },
    {
      title: lang === 'vi' ? "Kỹ thuật Hệ thống AI" : "AI Systems Engineering",
      description: lang === 'vi' ? "Phát triển và tích hợp đầu-cuối vào các hệ thống doanh nghiệp." : "End-to-end development and integration into enterprise systems.",
      technologies: ["Python-based dev", "Model pipelines", "API Integration"],
      icon: <Network className="w-8 h-8 text-blue-500" />
    },
    {
      title: lang === 'vi' ? "Triển khai & Vận hành" : "Deployment & Operations",
      description: lang === 'vi' ? "Môi trường sản xuất an toàn, có thể mở rộng và dễ quản lý." : "Secure, scalable, and manageable production environments.",
      technologies: ["On-premise", "Private Cloud", "Inference Services"],
      icon: <Cloud className="w-8 h-8 text-blue-500" />
    }
  ], [lang]);

  const products = useMemo<ProductItem[]>(() => [
    {
      id: "finwork",
      name: "FinWorkAI",
      tagline: lang === 'vi' ? "Nền tảng AI cho Trí tuệ Kiểm toán & Tuân thủ Tài chính" : "AI Platform for Financial Compliance & Audit Intelligence",
      description: lang === 'vi' ? "Phân tích dữ liệu tài chính, giao dịch và chứng từ để hỗ trợ tuân thủ, kiểm toán và phân tích rủi ro. Được phát triển cùng các kiểm toán viên chuyên nghiệp." : "Analyzes financial data, transactions, and documents to support compliance, audit, and risk analysis. Developed with professional auditors.",
      capabilities: lang === 'vi' ? ["Phân tích tài chính hỗ trợ bởi AI", "Hơn 120 quy tắc kiểm toán cấu hình được", "Phát hiện bất thường và rủi ro", "Logic tuân thủ tùy chỉnh"] : ["AI-assisted financial analysis", "120+ configurable audit rules", "Anomaly and risk detection", "Customizable compliance logic"],
      value: lang === 'vi' ? ["Giảm nỗ lực kiểm toán", "Cải thiện khả năng quan sát rủi ro", "Quản trị tài chính mạnh mẽ hơn"] : ["Reduced audit effort", "Improved risk visibility", "Stronger financial governance"],
      image: "../image/1.svg"
    },
    {
      id: "smartvision",
      name: "SmartVision AI",
      tagline: lang === 'vi' ? "Giám sát nơi làm việc & Trí tuệ Vận hành bằng AI" : "AI-powered Workplace Monitoring & Operational Intelligence",
      description: lang === 'vi' ? "Ứng dụng thị giác máy tính vào các luồng video để giám sát vận hành, tuân thủ an toàn và quản lý nơi làm việc thông minh." : "Applies computer vision to video streams for operational monitoring, safety compliance, and intelligent workplace management.",
      capabilities: lang === 'vi' ? ["Giám sát sự hiện diện & di chuyển", "Phát hiện tình huống bất thường", "Giám sát an toàn lao động", "Phân tích sử dụng không gian"] : ["People presence & movement monitoring", "Abnormal situation detection", "Workplace safety monitoring", "Space utilization analytics"],
      value: lang === 'vi' ? ["Tăng cường khả năng hiển thị vận hành", "Giảm giám sát thủ công", "Đảm bảo tuân thủ an toàn"] : ["Enhanced operational visibility", "Reduced manual monitoring", "Ensured safety compliance"],
      image: "../image/2.svg"
    },
    {
      id: "geneskin",
      name: "GeneSkinAI",
      tagline: lang === 'vi' ? "Trí tuệ Di truyền cho Sức khỏe & Sắc đẹp dựa trên AI" : "AI-driven Genomic Intelligence for Health & Beauty",
      description: lang === 'vi' ? "Áp dụng phân tích dữ liệu di truyền và AI để đưa ra những hiểu biết cá nhân hóa, dựa trên khoa học về sức khỏe làn da và sức khỏe tổng thể." : "Applies genomic data analysis and AI to deliver personalized, science-based insights for skin health and overall well-being.",
      capabilities: lang === 'vi' ? ["Phân tích sức khỏe dựa trên di truyền", "Khuyến nghị lối sống cá nhân hóa", "Suy luận AI từ kiến thức y khoa", "Đánh giá rủi ro dài hạn"] : ["Genetic-based health analysis", "Personalized lifestyle recommendations", "AI reasoning from medical knowledge", "Long-term risk assessment"],
      value: lang === 'vi' ? ["Hướng dẫn khách quan, dựa trên khoa học", "Giải pháp chăm sóc cá nhân hóa", "Niềm tin dựa trên bằng chứng"] : ["Objective, science-backed guidance", "Individualized care solutions", "Evidence-based trust"],
      image: "../image/3.svg"
    },
    {
      id: "agentflow",
      name: "AgentFlow AI",
      tagline: lang === 'vi' ? "Nền tảng AI Agent cho Hội thoại & Tự động hóa" : "AI Agent Platform for Conversation & Automation",
      description: lang === 'vi' ? "Xây dựng và triển khai các đại lý AI thông minh tương tác với người dùng, hỗ trợ nhiệm vụ và tự động hóa quy trình giữa các hệ thống." : "Building and deploying intelligent AI agents that interact with users, assist tasks, and automate workflows across systems.",
      capabilities: lang === 'vi' ? ["AI hội thoại cho sự tương tác", "Các đại lý truy xuất định hướng nhiệm vụ", "Tích hợp website/ứng dụng liền mạch", "Logic tổ chức tùy chỉnh"] : ["Conversational AI for engagement", "Task-oriented retrieval agents", "Seamless website/app integration", "Customizable organizational logic"],
      value: lang === 'vi' ? ["Trải nghiệm người dùng phản hồi nhanh", "Giảm khối lượng công việc thủ công", "Hỗ trợ nhất quán, có khả năng mở rộng"] : ["Responsive user experience", "Reduced manual workload", "Scalable consistent support"],
      image: "../image/4.svg"
    }
  ], [lang]);

  const projects = useMemo<ProjectItem[]>(() => [
    {
      id: "mobifone",
      title: "FinWorkAI for MobiFone",
      client: "MobiFone",
      description: lang === 'vi' ? "Triển khai cho MobiFone để hỗ trợ tuân thủ tài chính, soát xét kiểm toán và kiểm soát nội bộ trong một doanh nghiệp quy mô lớn." : "Deployed for MobiFone to support financial compliance, audit review, and internal control within a large-scale enterprise.",
      highlights: lang === 'vi' ? ["Bối cảnh tài chính doanh nghiệp thực tế", "Quy trình làm việc tùy chỉnh", "Hạ tầng NVIDIA H100", "Triển khai tại chỗ (On-premise)"] : ["Real enterprise financial context", "Customized workflows", "NVIDIA H100 infrastructure", "On-premise deployment"],
      impact: lang === 'vi' ? ["Hiệu quả", "Sự nhất quán", "Cách ly dữ liệu nghiêm ngặt"] : ["Efficiency", "Consistency", "Strict Data Isolation"],
      image: "https://picsum.photos/seed/mobi/800/600"
    },
    {
      id: "intron",
      title: "Intron Genomic Health",
      client: "GeneStory",
      description: lang === 'vi' ? "Nền tảng trí tuệ sức khỏe di truyền chuyển đổi dữ liệu xét nghiệm gen thành trí tuệ lâm sàng cá nhân hóa." : "Genomic health intelligence platform converting genetic test data into personalized clinical intelligence.",
      highlights: lang === 'vi' ? ["Đánh giá rủi ro dựa trên di truyền", "Hiểu biết về dược động học", "Khả năng truy cập Web & Di động", "Nền tảng tích hợp"] : ["Genetic-based risk assessment", "Pharmacogenomic insights", "Web & Mobile accessibility", "Integration foundation"],
      impact: lang === 'vi' ? ["Ra quyết định phòng ngừa", "Giải Nhì Data for Life 2024"] : ["Preventive decision-making", "Data for Life 2024 Second Prize"],
      image: "https://picsum.photos/seed/intron/800/600"
    },
    {
      id: "technavi",
      title: lang === 'vi' ? "Phân tích Khoa học & Công nghệ" : "Tech & Science Analysis",
      description: lang === 'vi' ? "Nền tảng hỗ trợ AI để thu thập, tổng hợp và phân tích hệ thống thông tin Khoa học & Công nghệ toàn cầu." : "AI-enabled platform for systematic collection, synthesis, and analysis of global S&T information.",
      highlights: lang === 'vi' ? ["Hiểu biết đa nguồn dữ liệu", "Hỗ trợ lập kế hoạch chiến lược", "Phân tích cảnh quan tài năng", "Giám sát S&T toàn cầu"] : ["Multi-source data insight", "Strategic planning support", "Talent landscape analysis", "Global S&T monitoring"],
      impact: lang === 'vi' ? ["Thông tin có cấu trúc", "Lập kế hoạch chiến lược dài hạn"] : ["Structured insights", "Long-term strategic planning"],
      image: "https://picsum.photos/seed/science/800/600"
    },
    {
      id: "logistics",
      title: lang === 'vi' ? "Tự động hóa Logistics" : "Logistics Automation",
      client: "KN Express",
      description: lang === 'vi' ? "Hệ thống AI ứng dụng để tự động hóa quy trình vận hành cho logistics xuyên biên giới (Việt Nam - Nhật Bản)." : "Applied AI system to automate operational workflows for cross-border logistics (Vietnam-Japan).",
      highlights: lang === 'vi' ? ["Nhận diện thị giác máy tính", "Trích xuất nhãn OCR", "Nhập dữ liệu tự động", "Ứng dụng di động đầu-cuối"] : ["Computer vision recognition", "OCR label extraction", "Automated data entry", "End-to-end mobile app"],
      impact: lang === 'vi' ? ["Giảm sai sót thủ công", "Cải thiện tốc độ & hiệu quả"] : ["Reduced manual errors", "Improved speed & efficiency"],
      image: "https://picsum.photos/seed/truck/800/600"
    }
  ], [lang]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* --- Header --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">T</div>
            <span className="text-2xl font-bold tracking-tighter text-white">TABCOM</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavItem href="#about" label={t.nav.about} />
            <NavItem href="#tech" label={t.nav.tech} />
            <NavItem href="#products" label={t.nav.products} />
            <NavItem href="#projects" label={t.nav.projects} />
            <NavItem href="#contact" label={t.nav.contact} />
            
            <div className="h-6 w-px bg-slate-800"></div>
            
            <button 
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 hover:border-blue-500 transition-colors text-xs font-bold uppercase tracking-widest text-slate-300"
            >
              <Languages size={14} className="text-blue-500" />
              {lang === 'vi' ? 'EN' : 'VN'}
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="px-2 py-1 rounded border border-slate-700 text-[10px] font-bold"
            >
              {lang === 'vi' ? 'EN' : 'VN'}
            </button>
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <NavItem href="#about" label={t.nav.about} onClick={() => setIsMenuOpen(false)} />
            <NavItem href="#tech" label={t.nav.tech} onClick={() => setIsMenuOpen(false)} />
            <NavItem href="#products" label={t.nav.products} onClick={() => setIsMenuOpen(false)} />
            <NavItem href="#projects" label={t.nav.projects} onClick={() => setIsMenuOpen(false)} />
            <NavItem href="#contact" label={t.nav.contact} onClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </header>

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-800 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium text-sm mb-6">
              {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {t.hero.title1} <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#about" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all flex items-center justify-center gap-2">
                {t.hero.ctaPrimary} <ChevronRight size={20} />
              </a>
              <a href="#contact" className="px-8 py-4 border border-slate-700 hover:border-slate-500 rounded-full font-bold transition-all text-center">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hidden md:block relative">
             <img 
               src="../image/Mask group.svg" 
               alt="AI Tech Hub" 
               className="rounded-2xl shadow-2xl border border-slate-800"
             />
             <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl border-l-4 border-blue-600 shadow-xl max-w-[200px]">
                <p className="text-3xl font-bold text-blue-500 mb-1">99%</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{lang === 'vi' ? 'Độ chính xác' : 'Model Accuracy'}</p>
             </div>
             <div className="absolute -top-6 -right-6 glass-card p-6 rounded-xl border-r-4 border-blue-400 shadow-xl max-w-[200px]">
                <p className="text-3xl font-bold text-blue-400 mb-1">10+</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{lang === 'vi' ? 'Dự án quy mô' : 'Large Projects'}</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- About Us --- */}
      <section id="about" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle={t.about.subtitle} title={t.about.title} />
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t.about.description}
              </p>
              
              <div className="space-y-6">
                {t.about.capabilities.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-blue-600/10 p-2 rounded-lg h-fit">
                      <CheckCircle2 className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 border border-blue-900/50 bg-blue-900/10 rounded-2xl">
                <p className="italic text-blue-200">
                  "{t.about.quote}"
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <img src="../image/Union.svg" className="rounded-2xl row-span-2 object-cover h-full" alt="Team" />
               <img src="../image/LogoAmban 1.svg" className="rounded-2xl object-cover h-full" alt="Tech" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack --- */}
      <section id="tech" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle={t.tech.subtitle} title={t.tech.title} />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((tech, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
                <div className="mb-6 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{tech.title}</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {tech.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.technologies.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-900 text-slate-300 text-xs rounded-full border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Delivery Method --- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-slate-950/50 border border-slate-800 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Layers size={200} />
            </div>
            
            <div className="max-w-3xl">
              <SectionTitle subtitle={t.delivery.subtitle} title={t.delivery.title} centered={false} />
              
              <div className="space-y-10">
                {t.delivery.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="text-blue-500 font-bold text-xl bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Products --- */}
      <section id="products" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle={t.products.subtitle} title={t.products.title} />
          
          <div className="grid gap-20">
            {products.map((product, idx) => (
              <div key={product.id} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="w-20 h-2 bg-blue-600 mb-6"></div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h3>
                  <p className="text-blue-400 font-medium mb-6 uppercase tracking-wider text-sm">{product.tagline}</p>
                  <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-slate-100 flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-blue-500" /> {t.products.labels.capabilities}
                      </h5>
                      <ul className="space-y-2">
                        {product.capabilities.map((c, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-100 flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-blue-500" /> {t.products.labels.value}
                      </h5>
                      <ul className="space-y-2">
                        {product.value.map((v, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" /> {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <img src={product.image} className="relative rounded-2xl shadow-2xl border border-slate-800 w-full" alt={product.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Projects --- */}
      <section id="projects" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle={t.projects.subtitle} title={t.projects.title} />
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
                  {project.client && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Client: {project.client}
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="mt-auto">
                    <div className="mb-6">
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{t.projects.labels.highlights}</p>
                       <div className="flex flex-wrap gap-2">
                          {project.highlights.map((h, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-900 text-slate-300 text-[10px] rounded-full border border-slate-800">
                              {h}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                        <ShieldCheck size={18} /> {t.projects.labels.impact}
                      </div>
                      <button className="text-slate-300 hover:text-white transition-colors">
                        <ArrowRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer & Contact --- */}
      <footer id="contact" className="bg-slate-950 pt-24 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">T</div>
                <span className="text-2xl font-bold tracking-tighter text-white">TABCOM</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {t.footer.description}
              </p>
            </div>

            <div className="lg:col-span-1">
              <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t.footer.links}</h5>
              <ul className="space-y-4">
                <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">{t.nav.about}</a></li>
                <li><a href="#tech" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">{t.nav.tech}</a></li>
                <li><a href="#products" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">{t.nav.products}</a></li>
                <li><a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">{t.nav.projects}</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t.footer.info}</h5>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start text-slate-400 text-sm">
                    <MapPin className="text-blue-500 flex-shrink-0" size={18} />
                    <span>B18/D21 Building, Dich Vong Hau New Urban Area, Cau Giay District, Hanoi</span>
                  </div>
                  <div className="flex gap-4 items-center text-slate-400 text-sm">
                    <Phone className="text-blue-500 flex-shrink-0" size={18} />
                    <span>0907.37.26.66</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center text-slate-400 text-sm">
                    <Mail className="text-blue-500 flex-shrink-0" size={18} />
                    <span>sy.tv@tabcom.vn</span>
                  </div>
                  <div className="flex gap-4 items-center text-slate-400 text-sm">
                    <Globe className="text-blue-500 flex-shrink-0" size={18} />
                    <a href="https://tabcom.vn" className="hover:text-blue-400">https://tabcom.vn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
            <p>{t.footer.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

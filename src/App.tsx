/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  ShieldCheck, 
  Lock, 
  Heart, 
  Users, 
  Award, 
  ArrowRight,
  BookOpen,
  Mail,
  CreditCard,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  QrCode,
  Info,
  Smartphone,
  Gamepad2,
  GraduationCap,
  Flame,
  MessageCircle,
  Eye,
  Settings,
  Share2,
  Compass,
  Sprout,
  Star,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const wagnerImage = "/src/assets/images/wagner_family_photo_1780755678203.png";
const fatherSonImage = "/src/assets/images/father_son_talk_1780751117451.png";
const fatherReflectiveImage = "/src/assets/images/father_reflective_1780751353697.png";
const fatherObservingSonImage = "/src/assets/images/father_observing_son_1780751581582.png";
const fatherSonBalconyImage = "/src/assets/images/father_son_balcony_1780751762322.png";
const fatherSonHugImage = "/src/assets/images/father_son_hug_1780751927945.png";
const caseStudyMotherSonImage = "/src/assets/images/case_study_mother_son_1780752395725.png";
const caseStudyFatherSonParkImage = "/src/assets/images/case_study_father_son_park_1780752409520.png";
const caseStudyFamilyDinnerImage = "/src/assets/images/case_study_family_dinner_1780752423752.png";

const avatarMarcelo = "/src/assets/images/avatar_marcelo_1780754251873.png";
const avatarAdriana = "/src/assets/images/avatar_adriana_1780754265749.png";
const avatarCarlos = "/src/assets/images/avatar_carlos_1780754278672.png";
const avatarJuliana = "/src/assets/images/avatar_juliana_1780754290953.png";
const avatarRoberto = "/src/assets/images/avatar_roberto_1780754304070.png";

const wpAvatarEduardo = "/src/assets/images/wp_avatar_eduardo_1780754512905.png";
const wpAvatarSandra = "/src/assets/images/wp_avatar_sandra_1780754526148.png";
const wpAvatarVanessa = "/src/assets/images/wp_avatar_vanessa_1780754539705.png";
const wpAvatarGustavo = "/src/assets/images/wp_avatar_gustavo_1780754552195.png";
const wpAvatarFernando = "/src/assets/images/wp_avatar_fernando_1780754564945.png";

// Types for Diagnostic Quiz
interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    icon: string;
  }[];
}

export default function App() {
  // Navigation/Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Checkout Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // Quiz State
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // States and Data for Section 02 - A Ferida Invisível
  const [checkedSituations, setCheckedSituations] = useState<Record<number, boolean>>({});
  const [activeInfluence, setActiveInfluence] = useState<string>("Pais");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openFinalFaq, setOpenFinalFaq] = useState<number | null>(null);

  const situations = [
    "Você pergunta como foi o dia e recebe apenas um \"normal\".",
    "Seu filho passa mais tempo conversando com amigos do que com você.",
    "Você sente que precisa repetir as mesmas orientações várias vezes.",
    "As conversas importantes acontecem cada vez menos.",
    "O celular parece ter mais influência do que a família.",
    "Você percebe que ele procura outras pessoas quando precisa de conselhos.",
    "Existe uma distância que você não sabe explicar quando começou.",
    "Você sente que está perdendo espaço sem perceber."
  ];

  const toggleSituation = (index: number) => {
    setCheckedSituations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkedCount = Object.values(checkedSituations).filter(Boolean).length;

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDiagnostic = () => {
    scrollToSection("diagnostic-section");
  };

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      text: "Quando seu filho passa por um problema difícil ou dúvida emocional, quem ele procura primeiro?",
      options: [
        { text: "Procura a mim ou ao parceiro(a) imediatamente (Primeira Voz mantida)", score: 10, icon: "💬" },
        { text: "Prefere desabafar com amigos ou no grupo escolar", score: 5, icon: "👥" },
        { text: "Isola-se e consome respostas na internet / redes sociais", score: 2, icon: "📱" }
      ]
    },
    {
      id: 2,
      text: "Qual é o nível de resistência do seu filho ao iniciar uma conversa sobre valores e comportamento?",
      options: [
        { text: "Baixo: Conversamos abertamente e ele escuta nossos conselhos", score: 10, icon: "🤝" },
        { text: "Médio: Responde de forma curta, evasiva ou com impaciência", score: 5, icon: "⏳" },
        { text: "Alto: Geralmente esquiva-se, tranca-se no quarto ou reage agressivamente", score: 2, icon: "🛡️" }
      ]
    },
    {
      id: 3,
      text: "Qual é o seu maior receio em relação ao futuro e à distância com seu filho?",
      options: [
        { text: "Perder totalmente a relevância na tomada de decisões importantes dele", score: 4, icon: "😟" },
        { text: "Descobrir que outras influências negativas já ditaram o rumo de sua vida", score: 2, icon: "⚠️" },
        { text: "A distância atual tornar-se um abismo permanente e irremediável", score: 6, icon: "💔" }
      ]
    }
  ];

  const handleAnswerSelect = (score: number) => {
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  const getQuizResult = () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    if (totalScore >= 25) {
      return {
        title: "Influência Segura, Mas Requer Manutenção",
        description: "Seu canal de comunicação com seu filho ainda está aberto, mas a pressão externa e as novas conexões digitais estão batendo à porta. É o momento perfeito para consolidar a Lei da Primeira Voz™ e vaciná-lo contra as influências destrutivas externas.",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60"
      };
    } else if (totalScore >= 14) {
      return {
        title: "Perda Gradual de Conexão (Estado de Atenção)",
        description: "Você está competindo diretamente com a internet, redes sociais e vozes externas pela atenção do seu filho. Caso você não adote uma metodologia estruturada agora, a distância tende a crescer rapidamente à medida que ele entra em novas fases.",
        color: "text-amber-400 bg-amber-950/40 border-amber-800/60"
      };
    } else {
      return {
        title: "Abismo de Distanciamento (Alerta Crítico)",
        description: "O canal de influência emocional primária está severamente comprometido. O silêncio ou as discussões indicam que outras vozes já tomaram o espaço que por direito de amor e compromisso deveria ser seu. Ação imediata é necessária antes que este padrão se cristalize permanentemente.",
        color: "text-orange-400 bg-orange-950/40 border-orange-850/60"
      };
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCVC)) {
      alert("Por favor, preencha as informações do cartão de crédito.");
      return;
    }
    setCheckoutStep("success");
  };

  const triggerCTA = () => {
    scrollToSection("checkout-optimized-section");
  };

  const openCheckoutDrawer = () => {
    setCheckoutStep("details");
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-[#071529] md:selection:bg-[#FF7A00] md:selection:text-white text-white font-opensans min-h-screen flex flex-col justify-start items-center relative overflow-x-hidden">
      
      {/* 1. Header / Top Alert */}
      <div className="w-full bg-[#0a1f3d] border-b border-slate-800 py-3 px-4 text-center text-xs md:text-sm font-montserrat font-medium tracking-wide text-orange-400 z-10 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        MÉTODO EXCLUSIVO PARA PAIS DE CRIANÇAS E ADOLESCENTES DESEJANDO RESTAURAR A CONEXÃO
      </div>

      {/* 2. Hero Section Principal */}
      <section id="hero-section" className="relative w-full max-w-[1200px] px-6 lg:px-10 py-12 md:py-20 flex flex-col justify-center lg:min-h-[750px] lg:h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* Hero Left Column (Copy and Call to Action) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8 z-10">
            
            {/* Micro Headline */}
            <div className="inline-flex items-center gap-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full px-4 py-2 w-max text-xs md:text-sm font-montserrat font-bold text-[#FF7A00] tracking-wide uppercase">
              <Users className="w-4 h-4 text-[#FF7A00]" />
              Acompanhando mais de 12 mil famílias há 23 anos
            </div>

            {/* Headline Principal */}
            <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight space-y-3">
              <span className="block text-slate-100">
                Seu filho ainda te procura quando precisa de orientação?
              </span>
              <span className="block text-[#FF7A00]">
                Ou outras vozes já começaram a ocupar o lugar que deveria ser seu?
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-montserrat font-medium text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Descubra a <span className="text-[#FF7A00] font-bold">Lei da Primeira Voz™</span> e aprenda como recuperar sua influência emocional antes que a distância entre vocês se torne permanente.
            </p>

            {/* Bullets de Credibilidade */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <li className="flex items-center gap-3 text-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm md:text-base font-opensans font-normal">Mais de 12 mil famílias acompanhadas</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm md:text-base font-opensans font-normal">Método simples e aplicável</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm md:text-base font-opensans font-normal">Acesso imediato e vitalício</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm md:text-base font-opensans font-normal">Garantia incondicional de 30 dias</span>
              </li>
            </ul>

            {/* Botão Principal & Subtext Call-to-Action */}
            <div className="flex flex-col space-y-3 pt-4 sm:max-w-xl">
              <motion.button 
                onClick={triggerCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-sm sm:text-base md:text-lg rounded-xl shadow-xl shadow-[#FF7A00]/20 tracking-wider flex items-center justify-center gap-3 cursor-pointer transition-colors duration-200"
              >
                QUERO SER A PRIMEIRA VOZ NA VIDA DO MEU FILHO
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="text-center text-slate-400 text-xs md:text-sm font-opensans flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-[#FF7A00] font-semibold">Pagamento único de apenas R$17</span>
                <span className="hidden sm:inline">•</span>
                <span>Sem mensalidade • Sem cobrança recorrente</span>
              </div>
            </div>

          </div>

          {/* Hero Right Column (Photo of Wagner mapped dynamically) */}
          <div className="lg:col-span-5 flex justify-center z-10 relative">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Abstract soft glowing orange eclipse behind image to make it blend into deep navy background */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#FF7A00]/20 to-transparent blur-2xl opacity-60 pointer-events-none"></div>

              {/* Elegant photo border/frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900/50 aspect-[3/4] group">
                <img 
                  src={wagnerImage} 
                  alt="Wagner Ferraz e Família - Mentor Familiar" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-0 group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071529] via-[#071529]/80 to-transparent p-6 text-left">
                  <p className="text-xs text-[#FF7A00] font-montserrat font-bold tracking-wider uppercase">Fundador do Método</p>
                  <h3 className="text-xl font-montserrat font-extrabold text-white">Wagner Ferraz e Família</h3>
                  <p className="text-sm text-slate-300 font-opensans leading-snug">
                    Conselheiro familiar e criador do projeto "A Primeira Voz", fotografado ao lado de sua esposa e seus 3 filhos (uma filha de 28 anos, e filhos de 17 e 14 anos).
                  </p>
                </div>
              </div>

              {/* Floaters of authority/proof */}
              <div className="absolute -top-4 -left-4 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-sm pointer-events-none">
                <div className="w-10 h-10 rounded-lg bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-montserrat font-bold text-white">23 Anos</div>
                  <div className="text-[10px] text-slate-400 font-opensans">De Experiência</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-sm pointer-events-none">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-montserrat font-bold text-white">Garantia Total</div>
                  <div className="text-[10px] text-slate-400 font-opensans">30 dias sem risco</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. SEÇÃO 02 — A FERIDA INVISÍVEL (Editorial White Fold) */}
      <section className="w-full bg-white text-[#071529] py-16 lg:py-28 px-6 relative">
        <div className="max-w-[1100px] mx-auto text-center space-y-8">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Título */}
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900">
              Talvez o problema não seja falta de amor.
            </h2>
            {/* Subtítulo */}
            <p className="font-montserrat font-semibold text-lg sm:text-xl lg:text-2xl text-[#FF7A00] tracking-tight">
              Talvez seja algo muito mais silencioso do que isso.
            </p>
          </div>

          {/* Texto Principal */}
          <div className="font-opensans text-slate-650 text-sm sm:text-base leading-relaxed space-y-3.5 max-w-[720px] mx-auto text-center pt-4">
            <p className="font-semibold text-slate-800">Você trabalha.</p>
            <p>Se preocupa.</p>
            <p>Tenta orientar.</p>
            <p className="font-semibold text-slate-800">Faz o melhor que pode.</p>
            <p className="font-bold text-[#071529] text-base sm:text-lg">Mas mesmo assim...</p>
            <p className="italic">Existe uma sensação difícil de ignorar.</p>
            
            <p className="text-xl sm:text-2xl font-montserrat font-extrabold text-slate-900 py-2">
              A sensação de que seu filho está cada vez mais distante.
            </p>
            
            <p>Não necessariamente fisicamente.</p>
            <p className="font-bold text-slate-900">Mas emocionalmente.</p>
            <p>Ele continua dentro de casa.</p>
            <p>Continua sentado à mesa.</p>
            <p>Continua dormindo no quarto ao lado.</p>
            <p className="font-semibold text-slate-800">Mas algo mudou.</p>
            <p>As conversas ficaram mais curtas.</p>
            <p>As respostas ficaram mais vazias.</p>
            <p>E aquela proximidade que parecia natural começou a desaparecer sem que você percebesse exatamente quando.</p>
          </div>

          {/* Checklist de Identificação Visual (Interativo) */}
          <div className="bg-[#F5F5F5] border border-slate-205/80 rounded-2xl p-6 sm:p-10 max-w-[760px] mx-auto mt-14 text-left shadow-sm">
            <h3 className="font-montserrat font-bold text-base sm:text-lg lg:text-xl text-[#071529] mb-6 text-center">
              Veja se alguma dessas situações parece familiar...
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {situations.map((text, idx) => {
                const isChecked = !!checkedSituations[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSituation(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${isChecked ? 'bg-white border-[#FF7A00] shadow-sm' : 'bg-white/80 border-slate-200 hover:border-slate-300'}`}
                  >
                    <span className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border ${isChecked ? 'bg-[#FF7A00] border-[#FF7A00] text-white animate-pulse' : 'border-slate-300 text-transparent bg-white'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className={`text-xs sm:text-sm font-opensans leading-snug ${isChecked ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
                      {text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Texto de Transição Dinâmico */}
            <AnimatePresence>
              {checkedCount >= 2 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 p-5 bg-[#071529] border border-slate-800 rounded-xl text-white text-xs sm:text-sm leading-relaxed space-y-3 overflow-hidden shadow-md"
                >
                  <p className="font-montserrat font-bold text-xs uppercase tracking-wider text-orange-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-orange-500 animate-pulse"></span>
                    Se você marcou mentalmente duas ou mais situações...
                  </p>
                  <p className="font-opensans text-slate-200">
                    Existe uma grande chance de que o que está acontecendo não seja falta de amor. Nem falta de dedicação. Nem falta de presença.
                  </p>
                  <p className="font-opensans text-slate-200">
                    Na verdade, muitos dos pais que passam por isso são exatamente os que mais se sacrificam pelos filhos.
                  </p>
                  <p className="font-opensans font-semibold text-[#FF7A00] text-sm pt-1">
                    O problema está em outro lugar. E quase ninguém fala sobre ele.
                  </p>
                </motion.div>
              ) : (
                <div className="mt-8 text-center text-xs text-slate-400 font-opensans">
                  💡 Clique nas caixas acima para selecionar o que você sente em seu lar.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Bloco Emocional */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6 sm:p-10 max-w-[760px] mx-auto mt-14 border border-slate-200 text-center space-y-5">
            <h4 className="font-montserrat font-extrabold text-lg sm:text-xl md:text-2xl text-[#071529] leading-snug">
              A verdade que mais dói não é quando seu filho deixa de obedecer. <br className="hidden sm:block"/>
              <span className="text-[#FF7A00] mt-1 inline-block">É quando ele deixa de procurar você.</span>
            </h4>
            
            <div className="font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed text-center space-y-4 max-w-xl mx-auto border-t border-slate-200/60 pt-4">
              <p>
                Porque enquanto ele é pequeno... <strong className="text-slate-900 font-semibold">Você é a primeira pessoa que ele chama.</strong> A primeira opinião que ele considera. A primeira voz que ele escuta.
              </p>
              <p>
                Mas conforme os anos passam... <strong className="text-slate-900 font-semibold">Outras vozes começam a ocupar espaço.</strong> E a maioria dos pais só percebe isso quando a distância já está instalada.
              </p>
            </div>
          </div>

          {/* Foto Reflexiva de Wagner */}
          <div className="max-w-[640px] mx-auto mt-16 text-center space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 aspect-[4/3] group">
              <img
                src={fatherReflectiveImage}
                alt="Pai preocupado sentado sozinho à mesa refletindo com celular"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            {/* Micro Copy */}
            <p className="text-xs sm:text-sm text-slate-500 font-opensans italic">
              A maioria dos pais percebe a distância. Poucos entendem por que ela acontece.
            </p>
          </div>

          {/* CTA Suave */}
          <div className="text-center pt-8">
            <motion.button
              onClick={() => scrollToSection("terceirizacao-section")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#071529] hover:bg-[#11233d] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-lg cursor-pointer inline-flex items-center gap-3 transition-colors duration-250"
            >
              EU QUERO ENTENDER O QUE ESTÁ ACONTECENDO
              <ArrowRight className="w-5 h-5 text-orange-400" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* 3.1 SEÇÃO 03 — A TERCEIRIZAÇÃO DA INFLUÊNCIA™ */}
      <section id="terceirizacao-section" className="w-full bg-[#071529] text-white py-20 lg:py-32 px-6 relative border-t border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-[#FF7A00]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-[1100px] mx-auto space-y-12 lg:space-y-16">
          
          {/* Header Copy */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[#FF7A00] font-montserrat font-bold text-xs md:text-sm tracking-widest uppercase block">
              O QUE ESTÁ ACONTECENDO DENTRO DE MILHARES DE FAMÍLIAS
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight">
              Seu filho está sendo influenciado todos os dias.<br className="hidden sm:block" />
              <span className="text-slate-200">A pergunta é: </span>
              <span className="text-[#FF7A00]">Quem ocupa a posição mais importante?</span>
            </h2>
            <p className="font-montserrat font-medium text-base sm:text-xl text-slate-350 italic leading-relaxed max-w-2xl mx-auto pt-2">
              Porque existe uma diferença enorme entre ser amado... e ser a principal referência.
            </p>
          </div>

          {/* Texto Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-slate-300 font-opensans text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
            <div className="space-y-4">
              <p>
                Seu filho está sendo influenciado o tempo todo. Pelos amigos. Pelos professores. Pelos criadores de conteúdo. Pelos jogos. Pelas músicas. Pelas redes sociais. E por você.
              </p>
              <p>
                O problema não é que essas influências existam. Elas sempre existiram em toda geração. O problema é de outra natureza.
              </p>
              <p>
                Em toda fase da vida existe <strong className="text-white font-semibold">uma voz que pesa mais do que as outras</strong>. Uma voz que a criança consulta primeiro na mente, uma voz que ela leva mais a sério e ajuda a moldar quem ela está se tornando.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Quando seu filho era pequeno, essa voz provavelmente era a sua. Mas conforme os anos passam, algo começa a mudar. Sem brigas, sem discussões pesadas, sem grandes tragédias familiares.
              </p>
              <p>
                Outras vozes começam a ocupar esse espaço de forma extremamente sorrateira e pouco a pouco.
              </p>
              <p>
                Até que um dia você percebe algo muito difícil de aceitar: <strong className="text-[#FF7A00] font-semibold">Você continua sendo pai, mas talvez já não seja a principal influência na vida dele.</strong>
              </p>
            </div>
          </div>

          {/* Bloco de Impacto Visual - Teaser */}
          <div className="bg-[#0f2440]/80 border-2 border-[#FF7A00] rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto text-center space-y-4 shadow-xl shadow-[#FF7A00]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-[#FF7A00] text-[#071529] font-montserrat font-semibold text-[9px] uppercase tracking-wider px-3 rounded-bl">Conceito Proprietário</div>
            <h3 className="text-xs sm:text-sm font-montserrat font-bold text-orange-400 tracking-widest uppercase">Eu chamo isso de:</h3>
            <h4 className="text-xl sm:text-3xl font-montserrat font-extrabold text-white uppercase tracking-tight">
              A TERCEIRIZAÇÃO DA INFLUÊNCIA™
            </h4>
            <div className="w-16 h-1 w-full bg-slate-800 mx-auto"></div>
            <p className="font-opensans text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed pt-2">
              É quando os pais continuam presentes fisicamente... Mas sem perceber <strong className="text-[#FF7A00]">começam a transferir sua posição de principal referência emocional</strong> para outras vozes externas. Não porque deixaram de amar, nem porque falharam na dedicação — mas porque nunca aprenderam como blindar e proteger essa influência.
            </p>
          </div>

          {/* Infográfico Visual Interativo */}
          <div className="bg-[#0a1e36] border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8 shadow-xl">
            <div className="text-center space-y-2">
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-white">
                Quem está moldando seu filho hoje?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-opensans max-w-md mx-auto">
                Clique nos diferentes canais de influência ao redor do adolescente para ler as análises de força.
              </p>
            </div>

            {/* Simulated Interactive Graphic Circle container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
              
              {/* Left column: Node selectors */}
              <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[
                  { id: "Amigos", label: "Amigos & Escola", icon: Users, alert: "Extrema" },
                  { id: "Redes", label: "Algoritmos e TikTok", icon: Smartphone, alert: "Extrema" },
                  { id: "Influencers", label: "Criadores/Streamers", icon: Flame, alert: "Elevada" },
                  { id: "Jogos", label: "Games & Plataformas", icon: Gamepad2, alert: "Moderada" },
                  { id: "Pais", label: "Pais (Sua Voz)", icon: Heart, alert: "Sob Risco", focus: true }
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = activeInfluence === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveInfluence(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${isSelected ? 'bg-[#FF7A00]/20 border-[#FF7A00] text-white shadow-md' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                    >
                      <IconComponent className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-[#FF7A00]" : "text-slate-500"}`} />
                      <div className="truncate">
                        <p className="text-[11px] sm:text-xs font-montserrat font-bold truncate leading-none">{item.label}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${item.focus ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-[#FF7A00]"}`}>{item.alert}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Central Dynamic visualization panel */}
              <div className="lg:col-span-7 bg-[#071529]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 relative min-h-[220px] flex flex-col justify-between">
                
                {/* Visual simulator graph header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-pulse"></div>
                    <span className="text-[11px] font-montserrat font-bold uppercase tracking-wider text-slate-300">Intensidade de Contraste Radial</span>
                  </div>
                  <span className="text-[10px] text-[#FF7A00] font-mono tracking-widest uppercase">Canal Ativo</span>
                </div>

                {/* Simulated connection strength visualization or text description based on selected activeInfluence */}
                <div className="space-y-3">
                  <h4 className="text-white font-montserrat font-extrabold text-base sm:text-lg flex items-center gap-2">
                    {activeInfluence === "Amigos" && <><Users className="w-5 h-5 text-orange-400" /> Amigos, Colegas e Escola</>}
                    {activeInfluence === "Redes" && <><Smartphone className="w-5 h-5 text-orange-400" /> Algoritmos, TikTok e Instagram</>}
                    {activeInfluence === "Influencers" && <><Flame className="w-5 h-5 text-orange-400" /> Criadores de Conteúdo & Streamers</>}
                    {activeInfluence === "Jogos" && <><Gamepad2 className="w-5 h-5 text-orange-400" /> Games de Recompensa Imediata</>}
                    {activeInfluence === "Pais" && <><Heart className="w-5 h-5 text-red-400" /> Pais e Responsáveis Familiares</>}
                  </h4>

                  <p className="text-slate-300 font-opensans text-xs sm:text-sm leading-relaxed">
                    {activeInfluence === "Amigos" && "As relações no pátio escolar ou no grupo privado de conversas exigem conformidade moral. Para não ser excluído, seu filho modela inconscientemente as opiniões deles sobre heróis, política, sexualidade e autoridade."}
                    {activeInfluence === "Redes" && "Dispositivos de inteligência artificial calculam instantaneamente os gatilhos emocionais da criança. Eles alimentam loops de atenção onde os de fora ensinam o que deve ser considerado descolado ou ridículo."}
                    {activeInfluence === "Influencers" && "Muitos jovens passam horas diárias assistindo estranhos carismáticos jogarem ou falarem mentiras disfarçadas. Criadores ocupam o vácuo de orientação fornecendo respostas prontas para as inseguranças de seu filho."}
                    {activeInfluence === "Jogos" && "Ao contrário do mundo real, no game há progresso controlado, recompensas brilhantes e controle de personagem. Ali, as regras e o vocabulário impostos passam por cima de qualquer aviso de responsabilidade familiar."}
                    {activeInfluence === "Pais" && "Sua influência é construída no amor inabalável, mas sem o protocolo de comunicação correto na adolescência, seu conselho é processado como 'bronca irritante'. Wagner Ferraz ajuda você a reestruturar este laço emocional."}
                  </p>

                  <div className="pt-2 text-xs flex gap-4 text-slate-400">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 font-montserrat">Status de Influência</span>
                      <strong className={activeInfluence === "Pais" ? "text-red-400" : "text-[#FF7A00]"}>
                        {activeInfluence === "Pais" ? "Enfraquecido (Risco)" : "Intensidade Consolidada"}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 font-montserrat">Resistência do Alvo</span>
                      <strong className="text-white">
                        {activeInfluence === "Pais" ? "Alta (Filtro Emocional)" : "Mínima / Nula (Acesso Livre)"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Simple stylized visual lines illustrating nodes connection */}
                <div className="w-full bg-[#0a1e36] border border-slate-800 rounded-lg p-3 text-[10px] font-opensans text-slate-400 flex items-center justify-between mt-2">
                  <span>Conexão Geral</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-4 h-1.5 rounded-sm ${activeInfluence === "Pais" && i >= 1 ? "bg-red-500/10" : "bg-[#FF7A00]"}`}
                        style={{ opacity: activeInfluence === "Pais" ? (i === 0 ? 1 : 0.2) : (i < 5 ? 1 : 0.4) }}
                      ></span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <p className="text-center text-slate-400 font-opensans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto pt-2 border-t border-slate-800/55">
              Muitos pais acreditam que influência é algo automático e genético. Mas não é. <strong className="text-white">Influência é uma posição tática no coração dele.</strong> E posições ou são fortalecidas hoje, ou são gradualmente perdidas para outros de fora.
            </p>
          </div>

          {/* Seção de Quebra de Crença */}
          <div className="max-w-[760px] mx-auto text-center space-y-6 pt-6">
            <h3 className="font-montserrat font-extrabold text-2xl text-white">
              O maior erro que os pais cometem sem perceber
            </h3>
            
            <div className="font-opensans text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 max-w-xl mx-auto">
              <p>
                A maioria dos pais amados profundamente acredita que amor e cuidado diário garantem influência automática. <strong className="text-white">Mas não garante.</strong>
              </p>
              <p>
                Muitos pais se sacrificam profundamente, dão excelente escola, roupas, teto e carinho infinito. E, mesmo assim, já perderam espaço emocional quase total para referências fúteis da internet.
              </p>
              <p>
                Porque amor e influência não são a mesma engrenagem. Amor é sentimento e pertencimento estrutural. Influência é posicionamento de confiança intelectual. E quando essa posição não é vigorosamente protegida, <strong className="text-[#FF7A00]">outras vozes assumem esse vácuo naturalmente</strong>.
              </p>
            </div>

            {/* Caixa de Impacto Laranja */}
            <div className="bg-[#FF7A00] text-white rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-xl shadow-[#FF7A00]/10 mt-6 animate-pulse">
              <p className="font-montserrat font-bold text-sm uppercase tracking-widest text-[#071529] mb-1">Princípio de Wagner Ferraz</p>
              <p className="font-montserrat font-bold text-base sm:text-lg lg:text-xl leading-relaxed italic">
                "Influência não é aquilo que seu filho simplesmente escuta por obrigação. É aquilo que ele leva em consideração sincera e silenciosa quando precisa decidir quem vai se tornar."
              </p>
            </div>
          </div>

          {/* Transição para próxima seção */}
          <div className="text-center max-w-2xl mx-auto space-y-6 pt-6">
            <p className="font-opensans text-slate-300 text-sm sm:text-base leading-relaxed">
              E foi tentando entender minuciosamente por que alguns pais permanecem influentes e altamente respeitados mesmo durante crises da adolescência...
            </p>
            <p className="font-montserrat font-medium text-slate-200 text-sm">
              Que Wagner Ferraz isolou e codificou um padrão comportamental simples na mente dos jovens. Uma metodologia que hoje é conhecida mundialmente como:
            </p>
            <p className="text-[#FF7A00] font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider pt-2">
              A Lei da Primeira Voz™
            </p>
          </div>

          {/* Foto de Transição opcional de Wagner observando discretamente o filho */}
          <div className="max-w-[640px] mx-auto text-center space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/60 aspect-[4/3] group">
              <img
                src={fatherObservingSonImage}
                alt="Pai observando silenciosamente seu filho adolescente com celular"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-4">
                <p className="text-[10px] text-slate-300 sm:text-xs">
                  Ele está fisicamente no sofá ao seu lado, mas a mente está navegando com vozes distantes.
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Continuidade */}
          <div className="text-center pt-6">
            <motion.button
              onClick={() => scrollToSection("ranking-section")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3 transition-colors duration-200"
            >
              QUERO DESCOBRIR A LEI DA PRIMEIRA VOZ™
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* 3.2 SEÇÃO 04 — A LEI DA PRIMEIRA VOZ™ E O RANKING INVISÍVEL™ (Editorial White Fold) */}
      <section id="ranking-section" className="w-full bg-white text-[#071529] py-20 lg:py-32 px-6 relative border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto space-y-12 lg:space-y-16">
          
          {/* Header Copy */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-slate-500 font-montserrat font-semibold text-xs md:text-sm tracking-widest uppercase block">
              A DESCOBERTA QUE MUDOU A FORMA COMO ENXERGAMOS A INFLUÊNCIA FAMILIAR
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 tracking-tight">
              Existe um ranking invisível dentro da mente do seu filho.<br className="hidden sm:block" />
              <span className="text-[#FF7A00]">E ele determina quem realmente influencia suas decisões.</span>
            </h2>
            <p className="font-montserrat font-semibold text-base sm:text-xl text-slate-550 max-w-2xl mx-auto pt-2">
              O problema é que a maioria dos pais nem sabe que esse ranking existe.
            </p>
          </div>

          {/* Abertura */}
          <div className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 max-w-3xl mx-auto text-center pt-2">
            <p className="text-slate-700">
              Imagine por um instante que eu pudesse entrar na mente do seu filho e fazer apenas uma pergunta:
            </p>
            <p className="text-sm sm:text-xl font-montserrat font-extrabold text-[#071529] py-2 italic max-w-2xl mx-auto border-y border-slate-100 px-4">
              "Quando você está inseguro... quando precisa tomar uma decisão importante... quando está confuso... quem você escuta de verdade?"
            </p>
            <p className="text-slate-600">
              A resposta dessa pergunta revelaria algo de extrema importância, porque todo filho possui em silêncio aquilo que chamamos de: <strong className="text-[#FF7A00] font-bold">Ranking Invisível™</strong>.
            </p>
          </div>

          {/* Bloco Conceitual */}
          <div className="bg-[#F5F7FA] border border-[#E5E5E5] rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-4 shadow-sm">
            <h3 className="font-montserrat font-extrabold text-sm sm:text-base text-[#071529] uppercase tracking-widest text-[#FF7A00] text-center sm:text-left">
              O QUE É O RANKING INVISÍVEL™
            </h3>
            <div className="w-12 h-1 bg-[#FF7A00]"></div>
            <div className="font-opensans text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3.5">
              <p>
                O <strong className="text-slate-900 font-semibold">Ranking Invisível™</strong> é uma hierarquia de influência emocional pura. Uma lista de prioridade interna que seu filho nunca escreveu física ou conceitualmente, nunca estudou e nunca percebeu de forma consciente na rotina dele.
              </p>
              <p>
                Mas que, silenciosamente, dita de forma robusta praticamente todas as suas decisões diárias.
              </p>
              <p className="font-semibold text-slate-800 text-sm">
                Essa lista secreta responde subconscientemente a uma única questão crucial: <span className="text-[#071529] underline decoration-orange-400">"Quem eu realmente levo em consideração quando preciso decidir quem eu vou me tornar?"</span>
              </p>
            </div>
          </div>

          {/* Infográfico Principal */}
          <div className="space-y-8 pt-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded">ESTRUTURA DA MENTE</span>
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#071529]">
                Toda pragmática possui uma hierarquia emocional de influência
              </h3>
            </div>

            {/* Simulated Podium UI component */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 items-stretch">
              
              {/* Posição 2: Vozes Secundárias */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between order-2 md:order-1 relative group hover:border-slate-300 transition-all shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-montserrat font-extrabold text-sm">
                      2º
                    </span>
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-extrabold text-[#071529] text-base uppercase tracking-wider">
                      Vozes Secundárias
                    </h4>
                    <p className="text-xs text-slate-650 font-opensans leading-relaxed">
                      Pessoas de estimação, parentes de segundo grau ou autoridades presentes no desenvolvimento semanal dele.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-slate-500 font-montserrat">
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Professores</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Amigos Próximos</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Familiares</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Mentores</span>
                </div>
              </div>

              {/* Posição 1: Primeira Voz (Ouro / Laranja / Destacado) */}
              <div className="bg-[#071529] border-2 border-[#FF7A00] text-white rounded-3xl p-6 flex flex-col justify-between order-1 md:order-2 md:-translate-y-4 shadow-xl shadow-orange-500/5 relative">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#FF7A00] text-[#071529] font-montserrat font-bold text-[9px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                  Voz Soberana
                </div>
                <div className="space-y-4 pt-2 font-opensans">
                  <div className="flex items-center justify-between animate-pulse">
                    <span className="w-9 h-9 rounded-full bg-[#FF7A00] text-[#071529] flex items-center justify-center font-montserrat font-extrabold text-sm shadow-md">
                      1º
                    </span>
                    <Award className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-extrabold text-white text-lg uppercase tracking-wider flex items-center gap-1.5">
                      A Primeira Voz™
                    </h4>
                    <p className="text-xs text-slate-300 font-opensans leading-relaxed">
                      A voz que mais pesa na balança mental interna. A voz que seu filho consulta reflexivamente quando precisa escolher o caminho para problemas novos e decisões importantes.
                    </p>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-1.5 text-[10px] text-[#FF7A00] font-montserrat font-bold">
                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-center truncate">Voz Decisiva</span>
                  <span className="bg-[#FF7A00] text-[#071529] px-2 py-1 rounded text-center truncate">Referência Mor</span>
                </div>
              </div>

              {/* Posição 3: Influências Externas */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between order-3 md:order-3 relative group hover:border-slate-300 transition-all shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-montserrat font-extrabold text-sm">
                      3º
                    </span>
                    <Smartphone className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-extrabold text-[#071529] text-base uppercase tracking-wider">
                      Influências Externas
                    </h4>
                    <p className="text-xs text-slate-650 font-opensans leading-relaxed">
                      Ruído social, tendências de manada digital e estímulos rápidos desenhados de forma intencional por desenvolvedores de algoritmos.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-slate-500 font-montserrat">
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">TikTok / Redes</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Influenciadores</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Consumo Rápido</span>
                  <span className="bg-slate-100 px-2 py-1 rounded truncate">Games / Música</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bloco de Impacto - Erro dos pais */}
          <div className="bg-[#071529] text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <h4 className="font-montserrat font-bold text-xs text-orange-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></span>
              Aqui está o erro que praticamente todos os pais cometem sem perceber:
            </h4>
            
            <p className="font-montserrat font-extrabold text-xl sm:text-2xl md:text-3xl leading-snug">
              Eles acreditam cegamente que a convivência diária e proximidade física garantem a posição número um em sua mente automaticamente.
            </p>
            
            <div className="w-full h-px bg-slate-800 my-4"></div>
            
            <p className="font-opensans text-slate-300 text-sm sm:text-base leading-relaxed">
              Mas não garante de forma alguma. Porque a <strong className="text-white">Primeira Voz™</strong> nunca é estruturada por proximidade geográfica ou metros quadrados residenciais — ela é construída e validada através de pura <strong className="text-[#FF7A00]">proximidade emocional, ressonância e validação pessoal</strong>.
            </p>
          </div>

          {/* Exemplo Prático */}
          <div className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 max-w-2xl mx-auto text-center">
            <p>
              Você pode morar na mesma casa. Jantar religiosamente na mesma mesa todos os finais de semana. Dormir sob o mesmíssimo teto de proteção familiar.
            </p>
            <p className="font-bold text-slate-900 text-base">
              E ainda assim não ocupar de verdade a posição número um no ranking de influência intelectual dele.
            </p>
            <p>
              Ao mesmo tempo, um amigo na escola, um professor carismático na universidade, ou até mesmo um criador de conteúdo no celular jogando Minecraft pode ocupar um espaço emocional superior e definitivo.
            </p>
            <p className="font-semibold text-slate-800 italic">
              Não porque eles sejam moralmente superiores ou que amem mais o seu garoto do que você. Mas sim porque eles dominam os códigos de conexão que criam influência verdadeira.
            </p>
          </div>

          {/* Quebra de Crença */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 text-center">
            <h4 className="font-montserrat font-extrabold text-lg sm:text-xl text-[#071529] tracking-tight">
              O objetivo nunca foi, e nunca deve ser, CONTROLAR seu filho.
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-left font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed">
              <div className="space-y-3">
                <p>
                  O controle de berço imposto à força gera apenas obediência puramente temporária e defensiva. Quando os olhos dos pais se afastam, as regras perdem todo o efeito de contenção.
                </p>
                <p>
                  Seu verdadeiro papel não é fazer o garoto fingir obediência apenas sob o raio de vigilância da família...
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  A real influência duradoura gera <strong className="text-[#071529] font-semibold">direcionamento em caráter permanente</strong>. O maior objetivo é ajudá-lo a tomar escolhas brilhantes quando estiver sozinho na encruzilhada moral longe de casa.
                </p>
                <p className="font-semibold text-slate-900">
                  E essa capacidade crítica só é ativada quando a sua voz protetora continua ecoando em harmonia dentro de sua conduta.
                </p>
              </div>
            </div>

            {/* Caixa de Destaque Laranja */}
            <div className="bg-[#FF7A00] text-white rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-md">
              <p className="font-montserrat font-extrabold text-base sm:text-lg leading-relaxed">
                "A influência mais poderosa no lar não é aquela que tenta domar ou controlar comportamentos aparentes. É aquela que molda identidades eternas."
              </p>
            </div>
          </div>

          {/* Seção de Transição */}
          <div className="max-w-[760px] mx-auto text-center space-y-6 pt-6">
            <p className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed">
              Durante mais de 23 anos acompanhando de perto milhares de famílias brasileiras desesperadas pela distância instalada...
            </p>
            <p className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed">
              Wagner Ferraz identificou uma constante científica fundamental. Os pais que de fato retinham a soberana posição de <strong className="text-slate-900 font-semibold">Primeira Voz™</strong> durante toda a infância, puberdade e transição madura tinham comportamentos incrivelmente padronizados.
            </p>
            <p className="font-montserrat font-semibold text-slate-500">
              Não importando as facilidades de orçamento familiar, as crenças locais ou a correria corporativa do dia a dia.
            </p>
            <p className="font-montserrat font-extrabold text-[#071529] text-base sm:text-lg leading-relaxed pt-2">
              Dessa observação empírica sistemática nasceu uma abordagem simples, prática e aplicável:
            </p>
            <p className="text-[#FF7A00] font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider pt-2 flex items-center justify-center gap-2">
              Método 3R™
            </p>
          </div>

          {/* Imagem de Alta Conexão no Entardecer com Balcony Image */}
          <div className="max-w-[640px] mx-auto text-center space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 aspect-[4/3] group">
              <img
                src={fatherSonBalconyImage}
                alt="Pai conversando na varanda com filho adolescente ao pôr do sol"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
              />
            </div>
            {/* Micro Copy abaixo da foto */}
            <p className="text-xs sm:text-sm text-slate-500 font-opensans italic max-w-md mx-auto">
              Os filhos raramente seguem aquilo que os pais apenas impõem verbalmente. Mas frequentemente espelham aquilo que os pais genuinamente representam.
            </p>
          </div>

          {/* CTA de Continuidade scroll para a Seção do Método 3R */}
          <div className="text-center pt-6">
            <motion.button
              onClick={() => scrollToSection("metodo-3r-section")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3 transition-colors duration-200"
            >
              QUERO APRENDER O MÉTODO 3R™
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* 3.3 SEÇÃO 05 — O MÉTODO 3R™ (RECONECTAR • REPOSICIONAR • REFERENCIAR) */}
      <section id="metodo-3r-section" className="w-full bg-[#F8F9FB] text-[#071529] py-20 lg:py-32 px-6 relative border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto space-y-16 lg:space-y-24">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-slate-500 font-montserrat font-semibold text-xs md:text-sm tracking-widest uppercase block">
              O QUE OS PAIS QUE CONTINUAM SENDO REFERÊNCIA FAZEM DE DIFERENTE
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 tracking-tight">
              Depois de acompanhar mais de 12 mil famílias, um padrão ficou impossível de ignorar.
            </h2>
            <div className="w-20 h-1 bg-[#FF7A00] mx-auto my-6"></div>
            <p className="font-opensans text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Os pais que permanecem na posição de <strong className="text-slate-900 font-semibold">Primeira Voz™</strong> não são necessariamente os mais rígidos. Nem os mais presentes. Nem os que têm mais tempo disponível no calendário corporativo.
            </p>
            <p className="font-montserrat font-bold text-slate-900 text-base sm:text-xl max-w-2xl mx-auto">
              Eles apenas aprenderam e praticam três movimentos fundamentais.
            </p>
          </div>

          {/* Intro Transition Text */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto text-center space-y-3 shadow-sm">
            <p className="font-opensans text-slate-650 text-sm sm:text-base leading-relaxed">
              Movimentos extremamente simples, mas incrivelmente poderosos que <strong className="text-[#FF7A00]">ajudam a restaurar e fortalecer a influência emocional verdadeira</strong> dentro de casa antes que outras vozes ocupem esse lugar de direito.
            </p>
          </div>

          {/* 3 Cards Horizontais (Mobile: Empilhados) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* CARD 01: Reconectar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF7A00]"></div>
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-montserrat font-extrabold text-[#071529] text-lg uppercase tracking-wider">
                    1º R — RECONECTAR™
                  </h3>
                  <p className="font-montserrat font-bold text-[#FF7A00] text-xs uppercase tracking-widest">
                    Primeiro conexão. Depois orientação.
                  </p>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="font-opensans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p>
                    A maioria de nós acredita sinceramente que a soberania de conselhos é fruto de tempo físico cronometrado. Mas não é. Trata-se inteiramente de sintonia emocional.
                  </p>
                  <p>
                    Você pode tranquilamente partilhar horas inteiras colado ao lado do seu herdeiro no silêncio e ainda se encontrar emocionalmente a anos-luz de distância.
                  </p>
                  <p>
                    Os pais que persistem como bússola dominante aprenderam a regra elementar:
                  </p>
                  <ul className="space-y-1.5 font-semibold text-slate-800 list-none pl-0">
                    <li className="flex items-center gap-1.5 text-xs">
                      <span className="w-1 h-1 bg-[#FF7A00] rounded-full"></span>
                      Antes de orientar... Eles se conectam.
                    </li>
                    <li className="flex items-center gap-1.5 text-xs">
                      <span className="w-1 h-1 bg-[#FF7A00] rounded-full"></span>
                      Antes de corrigir... Eles se aproximam.
                    </li>
                    <li className="flex items-center gap-1.5 text-xs">
                      <span className="w-1 h-1 bg-[#FF7A00] rounded-full"></span>
                      Antes de exigir... Eles fortalecem as bases.
                    </li>
                  </ul>
                  <p>
                    Porque pura e simplesmente ninguém aceita conselhos profundos de quem não confia intimamente.
                  </p>
                </div>
              </div>
              <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-xl p-3.5 text-center">
                <p className="font-montserrat font-extrabold text-xs text-[#FF7A00] uppercase tracking-wide">
                  Conexão gera abertura.<br />Abertura gera influência.
                </p>
              </div>
            </div>

            {/* CARD 02: Reposicionar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF7A00]"></div>
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-montserrat font-extrabold text-[#071529] text-lg uppercase tracking-wider">
                    2º R — REPOSICIONAR™
                  </h3>
                  <p className="font-montserrat font-bold text-[#FF7A00] text-xs uppercase tracking-widest">
                    Volte a ser referência. Não apenas autoridade.
                  </p>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="font-opensans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p>
                    Muitos pais acabam vestindo de forma automática o papel indesejado de detetives ou auditores da rotina.
                  </p>
                  <p className="font-medium text-slate-700 italic">
                    Fiscal das notas acadêmicas. Auditor das senhas e chats. Fiscal implorando por horários. Vigilante de amizades suspeitas.
                  </p>
                  <p>
                    Mas sejamos honestos, nenhuma criança ou adolescente sonha em seguir instruções de um fiscal policialesco.
                  </p>
                  <p>
                    Eles seguem com admiração voluntária quem os inspira por conduta interna, nobreza e dignidade exemplar, e não quem os vigia em silêncio.
                  </p>
                  <p>
                    Pais influentes reposicionam sua presença protetora: mantêm limites e diretrizes robustas, mas abdicam da paranoia de cobrança para reocuparem o cume do respeito mútuo.
                  </p>
                </div>
              </div>
              <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-xl p-3.5 text-center">
                <p className="font-montserrat font-extrabold text-xs text-[#FF7A00] uppercase tracking-wide">
                  Ser obedecido gera controle.<br />Ser admirado gera influência.
                </p>
              </div>
            </div>

            {/* CARD 03: Referenciar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF7A00]"></div>
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-montserrat font-extrabold text-[#071529] text-lg uppercase tracking-wider">
                    3º R — REFERENCIAR™
                  </h3>
                  <p className="font-montserrat font-bold text-[#FF7A00] text-xs uppercase tracking-widest">
                    Construa uma influência que resiste à distância.
                  </p>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="font-opensans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p>
                    Há uma pergunta sincera e talvez perturbadora que deve residir no pensamento de quem ama:
                  </p>
                  <p className="font-bold text-slate-900 border-l-2 border-orange-400 pl-2">
                    "Quem de fato meu filho escolherá ser quando as minhas vistas não puderem alcançá-lo no mundo lá fora?"
                  </p>
                  <p>
                    Os maiores tutores familiares não gastam energia tentando guiar marionetes físicas.
                  </p>
                  <p>
                    Ao invés disso, implantam sementes duradouras de integridade que operam como uma bússola moral espontânea de autonomia. Princípios inabaláveis que resistem ao pior apelo de turmas ou mídias.
                  </p>
                  <p>
                    A sua voz de sabedoria continua ecoando neles, mesmo quando um oceano inteiro se colocar como distância física intermediária.
                  </p>
                </div>
              </div>
              <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-xl p-3.5 text-center">
                <p className="font-montserrat font-extrabold text-xs text-[#FF7A00] uppercase tracking-wide">
                  Controle funciona apenas perto.<br />Referência funciona para a vida inteira.
                </p>
              </div>
            </div>

          </div>

          {/* Bloco de Interseção: Quando os 3 movimentos trabalham juntos (FUNDO: #071529) */}
          <div className="bg-[#071529] text-white rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto space-y-8 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-[#FF7A00]/5 pointer-events-none"></div>
            
            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Quando os três movimentos trabalham em total sincronia...
            </h3>
            
            <div className="w-16 h-1 w-full bg-orange-500/20 mx-auto"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-4">
              {[
                { title: "A conexão aumenta", text: "As barreiras invisíveis da resistência dão lugar a um canal aberto." },
                { title: "A resistência inevitável diminui", text: "Ele deixa de enxergar suas opiniões como sermões intrusivos." },
                { title: "Conversas tornam-se profundas", text: "O diálogo superficial se transforma em partilha real de angústias." },
                { title: "O vínculo se cristaliza", text: "Você retoma legitimamente uma cadeira soberana que jamais deve ser terceirizada." }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
                  <h4 className="font-montserrat font-bold text-sm text-orange-400 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item.title}
                  </h4>
                  <p className="text-slate-350 text-xs font-opensans leading-normal">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 font-montserrat text-slate-300 font-bold text-sm md:text-base">
              Vocês voltam a ocupar a real posição de <span className="text-[#FF7A00] font-extrabold">Primeira Voz™</span> no desenvolvimento do lar.
            </div>
          </div>

          {/* Infográfico Principal: A sequência natural da influência familiar saudável */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8 shadow-sm">
            <div className="text-center space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded">SISTEMA CÍCLICO</span>
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#071529]">
                A sequência natural da influência familiar saudável
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-opensans max-w-md mx-auto">
                Uma engrenagem onde cada estágio alimenta e protege o próximo movimento de maturidade.
              </p>
            </div>

            {/* Custom SVG/CSS Flowchart */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-3xl mx-auto pt-6 px-4">
              
              {/* Step 1 Node */}
              <div className="flex-1 w-full flex flex-col items-center bg-[#F8F9FB] border border-slate-200 rounded-2xl p-5 text-center relative group hover:border-orange-200 transition-all">
                <span className="absolute top-2 left-3 font-mono text-[9px] text-slate-405 font-bold">FASE 1</span>
                <Heart className="w-8 h-8 text-[#FF7A00] mb-3 animate-pulse" />
                <h4 className="font-montserrat font-extrabold text-xs text-[#071529] tracking-wider uppercase mb-1">Reconectar</h4>
                <p className="text-[10px] text-slate-500 font-opensans leading-normal">Criação da ponte de segurança sem defesas.</p>
              </div>

              {/* Connector Arrow 1 */}
              <div className="flex-shrink-0 text-[#FF7A00] transform rotate-90 lg:rotate-0 font-extrabold text-2xl">
                ➔
              </div>

              {/* Step 2 Node */}
              <div className="flex-1 w-full flex flex-col items-center bg-[#071529] text-white rounded-2xl p-5 text-center relative shadow-md">
                <span className="absolute top-2 left-3 font-mono text-[9px] text-orange-400/80 font-bold">FASE 2</span>
                <Compass className="w-8 h-8 text-[#FF7A00] mb-3" />
                <h4 className="font-montserrat font-extrabold text-xs text-white tracking-wider uppercase mb-1">Reposicionar</h4>
                <p className="text-[10px] text-slate-300 font-opensans leading-normal">Elevação da sua liderança moral inspiracional.</p>
              </div>

              {/* Connector Arrow 2 */}
              <div className="flex-shrink-0 text-[#FF7A00] transform rotate-90 lg:rotate-0 font-extrabold text-2xl">
                ➔
              </div>

              {/* Step 3 Node */}
              <div className="flex-1 w-full flex flex-col items-center bg-[#F8F9FB] border border-slate-200 rounded-2xl p-5 text-center relative group hover:border-orange-200 transition-all">
                <span className="absolute top-2 left-3 font-mono text-[9px] text-slate-405 font-bold">FASE 3</span>
                <Sprout className="w-8 h-8 text-[#FF7A00] mb-3" />
                <h4 className="font-montserrat font-extrabold text-xs text-[#071529] tracking-wider uppercase mb-1">Referenciar</h4>
                <p className="text-[10px] text-slate-500 font-opensans leading-normal">Sustentação interna blindando escolhas externas.</p>
              </div>

            </div>

            {/* Símbolo do Clímax: Pai e Filho Conectados */}
            <div className="bg-[#071529] rounded-2xl p-4 flex items-center justify-center gap-3 text-white max-w-md mx-auto text-center font-montserrat font-extrabold text-xs py-5">
              <Users className="w-5 h-5 text-orange-400" />
              <span>ALIANÇA RESTAURADA • INFLUÊNCIA SOBERANA</span>
            </div>
          </div>

          {/* Quebra de Objeção */}
          <div className="max-w-3xl mx-auto space-y-6 text-center pt-6">
            <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#071529]">
              E não... você não precisa ser um pai ou mãe perfeitos.
            </h3>
            <div className="w-12 h-0.5 bg-slate-300 mx-auto"></div>
            <div className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 max-w-2xl mx-auto">
              <p>
                Os pais que de fato conseguem blindar e resgatar sua influência primordial não são figuras perfeitas e livres de dramas.
              </p>
              <p>
                Eles também perdem a paciência sob estresse, também erram caminhos diariamente na rotina, também enfrentam barreiras e cansaço.
              </p>
              <p className="font-semibold text-slate-950 text-base">
                A única diferença soberana é que eles operavam com um método claro. E um método testado sempre supera a exaustiva tentativa e erro.
              </p>
            </div>
          </div>

          {/* Transição para a próxima seção */}
          <div className="max-w-[760px] mx-auto text-center space-y-8 pt-8 border-t border-slate-200">
            <div className="space-y-3 font-opensans text-slate-600 text-sm sm:text-base leading-relaxed">
              <p className="font-montserrat font-bold text-[#071529] text-base sm:text-lg">
                Mas talvez você ainda esteja se perguntando com desconfiança:
              </p>
              <blockquote className="italic text-slate-500 border-l-4 border-slate-300 pl-4 py-1 max-w-md mx-auto text-center text-xs sm:text-sm">
                "Será que isso realmente funciona dentro de uma rotina normal de trabalho?"<br />
                "Funciona com adolescentes rebeldes ou fechados?"<br />
                "Funciona mesmo quando a barreira do silêncio já está instalada há meses?"
              </blockquote>
              <p className="pt-2 text-slate-700">
                Antes de responder teoricamente... permita-me que eu lhe apresente algumas histórias de transformação real que testemunhei na linha de frente educativa.
              </p>
            </div>

            {/* Imagem de Alta Conexão de Abraço Documental */}
            <div className="max-w-[640px] mx-auto text-center space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 aspect-[4/3] group">
                <img
                  src={fatherSonHugImage}
                  alt="Pai abraçando carinhosamente filho adolescente após reconexão significativa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-opensans italic max-w-md mx-auto">
                Os filhos raramente seguem aquilo que os pais apenas impõem verbalmente. Mas frequentemente espelham aquilo que os pais genuinamente representam.
              </p>
            </div>

            {/* CTA Final da Seção 5 */}
            <div className="text-center pt-2">
              <motion.button
                onClick={() => scrollToSection("proof-section")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3 transition-colors duration-200"
              >
                QUERO VER COMO ISSO FUNCIONA NA VIDA REAL
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* 3.4 SEÇÃO 06 — PROVA SOCIAL PROFUNDA (CASOS REAIS + TRANSFORMAÇÕES) */}
      <section id="proof-section" className="w-full bg-white text-[#071529] py-20 lg:py-32 px-6 relative border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto space-y-20 lg:space-y-28">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-slate-500 font-montserrat font-semibold text-xs md:text-sm tracking-widest uppercase block animate-pulse">
              FAMÍLIAS REAIS. HISTÓRIAS REAIS.
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 tracking-tight">
              A influência não é recuperada através de mais controle.<br className="hidden sm:block" />
              <span className="text-[#FF7A00]">Ela é reconstruída através de conexão.</span>
            </h2>
            <p className="font-opensans text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
              Veja como pais comuns começaram a recuperar espaço emocional dentro da própria casa com pequenos movimentos conscientes.
            </p>
          </div>

          {/* CASO 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Caso 1 */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-[#FF7A00]/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] shadow-md relative">
                <img
                  src={caseStudyMotherSonImage}
                  alt="Mãe conversando com filho adolescente"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-[#FF7A00] text-white text-[10px] font-montserrat font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                  CASO REAL 01
                </span>
              </div>
            </div>
            {/* Texto Caso 1 */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-slate-900 leading-snug">
                "Eu sentia que estava perdendo meu filho para a internet."
              </h3>
              <div className="w-12 h-1 bg-[#FF7A00]"></div>
              <div className="font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Quando ela chegou até nós, o filho tinha exatos 14 anos de idade. As breves conversas do dia a dia duravam poucos segundos antes de um silêncio constrangedor se instalar.
                </p>
                <p>
                  Toda e qualquer tentativa de aproximação carinhosa ou diálogo franco terminava invariavelmente em respostas monossilábicas ou portas batidas no quarto.
                </p>
                <blockquote className="italic text-slate-500 border-l-2 border-slate-300 pl-3 py-0.5 my-3">
                  "Parece que eu moro na mesma casa com meu filho, compartilho despesas, mas não faço mais parte da vida dele por completo."
                </blockquote>
                <p>
                  Ao analisarmos a rotina doméstica, mapeamos um erro recorrente: as únicas conversas de fato longas envolviam puras obrigações. Escola, notas, compromissos domésticos, deveres. Nada inerentemente errado, mas a verdadeira conexão afetiva havia sido inteiramente drenada.
                </p>
                <p>
                  Ao aplicar rigorosamente as táticas do método <strong className="text-slate-950 font-bold">Reconectar™</strong>, uma mudança dócil e silenciosa se iniciou. Pequenas interações desinteressadas se tornaram risadas autênticas. Semanas depois, ela mandou uma mensagem grata:
                </p>
                <p className="font-semibold text-slate-900">
                  "Pela primeira vez em mais de dois anos, meu filho se sentou expontaneamente ao meu lado no sofá e partilhou o dia dele sem que eu precisasse cobrar uma frase sequer."
                </p>
              </div>
              
              {/* Resultados Caso 1 */}
              <div className="bg-[#F8F9FB] border border-[#E5E5E5] rounded-xl p-4 grid grid-cols-3 gap-2">
                {[
                  "Mais diálogo verdadeiro",
                  "Menos rejeição/resistência",
                  "Mais proximidade emocional"
                ].map((res, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mb-1 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-montserrat font-bold text-slate-800 leading-tight">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-150 my-4"></div>

          {/* CASO 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Texto Caso 2 - Left on Desktop to create rhythm */}
            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-slate-900 leading-snug">
                "Eu era profundamente presente. Mas me sentia uma sombra invisível."
              </h3>
              <div className="w-12 h-1 bg-[#FF7A00]"></div>
              <div className="font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Esse pai trabalhava arduamente na sua carreira profissional. Nunca faltou provimento financeiro em casa, brinquedos ou viagens escolares de férias.
                </p>
                <p>
                  Seu choque veio ao descobrir por terceiros que seu filho adolescente tomara uma decisão crítica de rumo de carreira sem sequer considerar pedir o seu conselho de vida. Aquilo o feriu no íntimo.
                </p>
                <p>
                  Ao questionarmos o filho maduro mais tarde em um ambiente seguro, o garoto expressou de forma muito simples:
                </p>
                <blockquote className="italic text-[#071529] font-semibold border-l-2 border-orange-400 pl-3 py-1">
                  "Pai, você sempre entra na conversa para dar ordens e solucionar tudo na hora. Só queria alguém que escutasse minhas dúvidas sem tentar fiscalizar minha fraqueza."
                </blockquote>
                <p>
                  Ele era o "Pai das Respostas Prontas", mas havia deixado de ser o "Porto da Conexão Segura".
                </p>
                <p>
                  Através dos princípios de <strong className="text-slate-950 font-bold">Reposicionar™</strong>, ele ajustou a postura: calou a reação imediata de sermão e aprendeu o poder generoso da escuta atenta, das perguntas inteligentes e do silêncio empático. Poucos meses depois, a admiração substituiu o medo defensivo.
                </p>
              </div>

              {/* Resultados Caso 2 */}
              <div className="bg-[#F8F9FB] border border-[#E5E5E5] rounded-xl p-4 grid grid-cols-3 gap-2">
                {[
                  "Mais confiança mútua",
                  "Mais diálogo voluntário",
                  "Mais influência moral"
                ].map((res, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mb-1 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-montserrat font-bold text-slate-800 leading-tight">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Foto Caso 2 - Right on Desktop */}
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#FF7A00]/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] shadow-md relative">
                <img
                  src={caseStudyFatherSonParkImage}
                  alt="Pai e filho caminhando e conversando em parque"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-[#FF7A00] text-white text-[10px] font-montserrat font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                  CASO REAL 02
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-150 my-4"></div>

          {/* CASO 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Caso 3 */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-[#FF7A00]/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] shadow-md relative">
                <img
                  src={caseStudyFamilyDinnerImage}
                  alt="Família conversando na mesa de jantar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-[#FF7A00] text-white text-[10px] font-montserrat font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                  CASO REAL 03
                </span>
              </div>
            </div>
            {/* Texto Caso 3 */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-slate-900 leading-snug">
                "Nós não queríamos apenas robôs filhos obedientes."
              </h3>
              <div className="w-12 h-1 bg-[#FF7A00]"></div>
              <div className="font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Este casal exemplar não vivia batalhas campais diárias no lar. Os filhos eram rotulados como exemplares, educados, disciplinados nas notas da escola e corretos em tudo.
                </p>
                <p>
                  No entanto, um fantasma perturbava o sono noturno do casal: <em className="text-slate-905 font-medium">"O que restará de nossos ensinamentos quando as asas crescerem e eles inevitavelmente voarem para longe de casa?"</em>
                </p>
                <p>
                  Eles perceberam com espanto que focavam unicamente na superfície de comportamento, mas negligenciavam o alicerce fundamental de construção de identidade íntima.
                </p>
                <p>
                  Utilizando as ferramentas e metodologias da fase <strong className="text-slate-950 font-bold">Referenciar™</strong>, mudaram a conversa fútil de cobrança mecânica para diálogos ancorados em legado moral, contando vivências familiares, expondo vulnerabilidades reais e vivendo princípios.
                </p>
                <p>
                  Muitos meses após a mudança, o filho mais velho enfrentou sozinho uma difícil encruzilhada de pressão social de bar na faculdade e tomou a decisão correta. Não por medo de castigo físico tardio, mas porque a <strong className="text-slate-950">referência interna</strong> estava gravada a fogo em seu peito.
                </p>
              </div>

              {/* Resultados Caso 3 */}
              <div className="bg-[#F8F9FB] border border-[#E5E5E5] rounded-xl p-4 grid grid-cols-3 gap-2">
                {[
                  "Construção de Legado",
                  "Influência inabalável",
                  "Segurança para o futuro"
                ].map((res, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mb-1 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-montserrat font-bold text-slate-800 leading-tight">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEÇÃO DE DEPOIMENTOS DE PAIS */}
          <div className="space-y-8 pt-8 border-t border-slate-100">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded">RECONHECIMENTO DE QUEM JÁ PASSOU PELO PROGRAMA</span>
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900">
                O que outros pais e mães estão relatando
              </h3>
            </div>

            {/* Grid de Depoimentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
              
              {[
                {
                  stars: 5,
                  text: "Comprei sem expectativa nenhuma. Achei que seria mais um curso teórico chato de parentalidade. Mas logo na primeira aula percebi que era totalmente prático. Pela primeira vez consegui entender os erros de comunicação que cometia com minha filha da vida inteira.",
                  author: "Marcelo A.",
                  sub: "Pai de adolescente de 15 anos",
                  image: avatarMarcelo
                },
                {
                  stars: 5,
                  text: "Eu chorei copiosamente assistindo algumas partes porque parecia que os professores estavam descrevendo minuciosamente a minha sala de estar. Hoje sinto de verdade que minha filha voltou a me procurar com brilho nos olhos para conversar.",
                  author: "Adriana M.",
                  sub: "Mãe de adolescente de 13 anos",
                  image: avatarAdriana
                },
                {
                  stars: 5,
                  text: "Por apenas R$ 17 eu francamente não esperava praticamente nada. Foi disparada uma das aquisições mais valiosas de autoconhecimento que já fiz na minha vida adulta para orientar meus dois meninos.",
                  author: "Carlos Henrique R.",
                  sub: "Pai de dois filhos",
                  image: avatarCarlos
                },
                {
                  stars: 5,
                  text: "A grandiosa ideia do Ranking e da Primeira Voz mudou por completo a forma de eu enxergar o meu papel diário como mãe dentro de casa. Um soco de esclarecimento.",
                  author: "Juliana T.",
                  sub: "Mãe atenta",
                  image: avatarJuliana
                },
                {
                  stars: 5,
                  text: "Não aprendi apenas técnicas mecânicas e vazias de como me comunicar com calma. Aprendi verdadeiramente a como permanecer essencialmente relevante na vida do meu rapaz para o resto da vida.",
                  author: "Roberto S.",
                  sub: "Pai conectado",
                  image: avatarRoberto
                }
              ].map((dep, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:bg-slate-50/50 transition-all">
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-500">
                      {Array.from({ length: dep.stars }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed italic">
                      "{dep.text}"
                    </p>
                  </div>
                  <div>
                    <div className="w-6 h-0.5 bg-[#FF7A00] mb-3"></div>
                    <div className="flex items-center gap-3">
                      <img 
                        src={dep.image} 
                        alt={dep.author} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-orange-100 shadow-xs flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-montserrat font-bold text-xs sm:text-sm text-slate-900">{dep.author}</h5>
                        <p className="font-mono text-[9px] text-slate-500 font-semibold">{dep.sub}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* ÁREA DE PRINTS DO WHATSAPP (Simulados Premium) */}
          <div className="space-y-8 pt-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded">PRINTS DE FEEDBACK REAL</span>
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900">
                Mensagens reais recebidas de pais e mães transformados
              </h3>
              <p className="text-slate-500 text-xs font-opensans">
                Fragmentos de conversas e transbordamentos de gratidão que Wagner Ferraz recebe de alunos.
              </p>
            </div>

            {/* WhatsApp Cards Layout */}
            <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto pt-4">
              
              {[
                {
                  sender: "+55 (11) 98122-**** — Aluno",
                  msg: "Wagner, precisava muito te agradecer de coração. Meu filho de 16 anos me chamou pra conversar hoje no quarto dele sem que eu pedisse nada. Sentamos e ele começou a abrir coisas da escola. Parece algo bobo e simples, mas não acontecia há muito tempo por aqui. Obrigado mesmo!",
                  time: "14:32",
                  avatar: wpAvatarEduardo
                },
                {
                  sender: "+55 (21) 97434-**** — Aluna",
                  msg: "Passando pra dizer que terminei o módulo Reconectar ontem à noite e já comecei a aplicar pequenos detalhes hoje no almoço. É impressionante como a mudança de tom de voz muda a recepção da criança.",
                  time: "18:15",
                  avatar: wpAvatarSandra
                },
                {
                  sender: "+55 (31) 99283-**** — Aluna",
                  msg: "Gente, eu nunca tinha parado pra pensar em influência dessa forma estruturada. Esse conceito da Primeira Voz me abriu os olhos de um jeito indescritível. Valeu muito o investimento.",
                  time: "09:04",
                  avatar: wpAvatarVanessa
                },
                {
                  sender: "+55 (41) 98823-**** — Aluno",
                  msg: "Estou assistindo as aulas de noite com a minha esposa. Estamos tendo conversas incríveis que nunca tivemos antes sobre como educar nossa pequena. Parabéns pelo material, Wagner!",
                  time: "21:40",
                  avatar: wpAvatarGustavo
                },
                {
                  sender: "+55 (51) 98111-**** — Aluno",
                  msg: "Meu filho continua sendo adolescente típico, óbvio, com todas as transformações de humor da idade kkk. Mas o clima em casa mudou completamente, sem aquele muro defensivo e brigas de grito de antes.",
                  time: "11:25",
                  avatar: wpAvatarFernando
                }
              ].map((print, i) => (
                <div key={i} className="w-full md:w-[340px] bg-[#E5DDD5] rounded-xl p-3 shadow-md border border-slate-300 relative overflow-hidden flex flex-col justify-between aspect-[16/10] md:aspect-auto">
                  {/* Whatsapp Header Style */}
                  <div className="flex items-center gap-2.5 border-b border-[#D4CFC9]/60 pb-2 mb-2 bg-[#075E54] -mx-3 -mt-3 px-3 py-2 text-white text-left">
                    <img 
                      src={print.avatar} 
                      alt={print.sender} 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400 shadow-xs flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-montserrat font-bold text-[10px] sm:text-xs truncate text-white">{print.sender}</p>
                      <p className="text-[8px] text-emerald-200">Online</p>
                    </div>
                  </div>
                  {/* Chat bubble body */}
                  <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-205/60 relative self-start mr-6 text-left">
                    <p className="font-opensans text-slate-850 text-[11px] sm:text-xs leading-relaxed">
                      {print.msg}
                    </p>
                    <span className="text-[8px] text-slate-400 font-mono block text-right mt-1">
                      {print.time} • Lido
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* SEÇÃO DE AUTORIDADE SOCIAL (BIOGRAFIA DO AUTOR COM FOTO EM FAMÍLIA) */}
          <div className="bg-[#F8F9FB] border border-[#E5E5E5] rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Foto do Especialista com Família */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white max-w-md mx-auto aspect-[3/4] group">
                  <img 
                    src={wagnerImage} 
                    alt="Wagner Ferraz e sua Família" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <p className="text-center text-[11px] text-slate-500 font-opensans italic max-w-xs mx-auto">
                  Wagner ao lado de sua esposa e os 3 filhos (uma filha de 28 anos, e filhos de 17 e 14 anos). Uma família edificada sobre os princípios da conexão real.
                </p>
              </div>

              {/* Texto de Biografia/Autoridade */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded">
                    CONHEÇA SUA HISTÓRIA E AUTORIDADE
                  </span>
                  <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                    Mais de 12.000 famílias acompanhadas ao longo de 23 anos
                  </h3>
                </div>

                {/* Indicadores / Check badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Pais de crianças",
                    "Pais de pré-adolescentes",
                    "Pais de adolescentes",
                    "Casais",
                    "Famílias Reais"
                  ].map((ind, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                      <Check className="w-3.5 h-3.5 text-[#FF7A00] flex-shrink-0" />
                      <span className="text-[10px] font-montserrat font-bold text-slate-700">{ind}</span>
                    </div>
                  ))}
                </div>

                <div className="font-opensans text-slate-655 text-xs sm:text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    Ao longo de mais de duas décadas observando atentamente as frestas da intimidade de famílias brasileiras sob o pior tipo de crise existencial, padrões claros e imutáveis começaram a se repetir diante de meus olhos de pedagogo.
                  </p>
                  <p>
                    As mesmas dificuldades ocultas de cansaço corporativo... os medos latentes de rebeldia... seguidos de arrependimentos amargos e tardios de quem não conectou cedo.
                  </p>
                  <p className="font-semibold text-slate-950 border-l-4 border-[#FF7A00] pl-4 italic">
                    E foi justamente desta vasta bagagem puramente empírica, ancorada na realidade dura da trincheira, que nasceu a metodologia simplificada que você encontra hoje em <strong className="text-[#FF7A00]">A Primeira Voz™</strong>.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CAIXA DE IMPACTO - #071529 */}
          <div className="bg-[#071529] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[#FF7A00]/5 pointer-events-none"></div>
            <p className="font-montserrat font-bold text-lg sm:text-2xl leading-relaxed relative z-10">
              "Os pais que de fato recuperam a poderosa influência ancestral no lar não são necessariamente os que amam mais profundamente ou que dão mais bens físicos.<br className="hidden sm:block" />
              <span className="text-[#FF7A00] font-extrabold">São aqueles que simplesmente aprenderam a traduzir amor em CONEXÃO."</span>
            </p>
          </div>

          {/* Transição para a próxima seção (Respostas e Diagnóstico) */}
          <div className="max-w-[760px] mx-auto text-center space-y-8 pt-8 border-t border-slate-100">
            <div className="space-y-3 font-opensans text-slate-650 text-sm sm:text-base leading-relaxed">
              <p className="font-montserrat font-bold text-[#071529] text-base sm:text-lg">
                Mas talvez essas perguntas ainda estejam soando forte na sua mente agora:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2 text-left">
                {[
                  "Mas será que isso funciona para qualquer idade?",
                  "E se meu filho já for adolescente arredio?",
                  "E se eu tiver pouquíssimo tempo disponível?",
                  "E se eu já tiver de fato tentado de tudo?"
                ].map((q, i) => (
                  <div key={i} className="flex gap-2 items-start bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
              <p className="pt-4 text-slate-700">
                Essas são absolutamente as exatas mesmas indagações protetivas que a vasta maioria de nossos 12.000 pais formularam antes de dar o primeiro passo científico.
              </p>
              <p className="font-semibold text-slate-900">
                Permita-nos responder honestamente e na prática a cada um desses temores.
              </p>
            </div>

            {/* CTA Final da Seção 6 */}
            <div className="text-center pt-2">
              <motion.button
                onClick={() => scrollToSection("diagnostic-section")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3 transition-colors duration-200"
              >
                QUERO VER SE ISSO FUNCIONA PARA MINHA FAMÍLIA
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Diagnostic Section (Dynamic Connection assessment to create context 'Isso é exatamente o que estou vivendo') */}
      <section id="diagnostic-section" className="w-full bg-[#0a1e36] border-y border-slate-800/80 py-16 px-6 relative">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-block text-[#FF7A00] text-xs font-montserrat font-bold tracking-wider uppercase bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-3 py-1 rounded">
              AUTO-AVALIAÇÃO DE INFLUÊNCIA
            </div>
            <h2 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-white leading-tight">
              Sua palavra ainda tem o peso que deveria ter?
            </h2>
            <p className="text-slate-300 font-opensans text-sm sm:text-base leading-relaxed">
              Responda a este rápido diagnóstico de auto-reflexão paterna. Veja em qual nível de perigo se esconde a comunicação no seu lar antes que sua influência seja substituída inteiramente pelas redes e companhias.
            </p>
            
            <div className="p-4 bg-[#071529]/50 rounded-xl border border-slate-700/50 flex gap-3 text-slate-300">
              <Info className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-opensans">
                A desconexão não acontece da noite para o dia. Ela ocorre silenciosamente, silenciando seu conselho de dentro para fora, através de hábitos de distanciamento imperceptíveis.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#071529] border border-slate-700/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-black/30">
            {!quizOpen && !quizFinished ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mx-auto text-[#FF7A00] border border-[#FF7A00]/30">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-white">Iniciar Diagnóstico de Influência Paterna</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto font-opensans">
                  3 perguntas rápidas com base em nossa ampla experiência ouvindo milhares de famílias para ver onde está seu nível de influência emocional.
                </p>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="bg-transparent hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white border border-[#FF7A00]/60 font-montserrat font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 cursor-pointer"
                >
                  COMEÇAR DIAGNÓSTICO
                </button>
              </div>
            ) : quizOpen && !quizFinished ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF7A00] transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-400 font-montserrat font-medium">
                  <span>PERGUNTA {currentQuestionIndex + 1} DE {quizQuestions.length}</span>
                  <span className="text-[#FF7A00]">{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% CONCLUÍDO</span>
                </div>

                <h3 className="font-montserrat font-bold text-base sm:text-lg text-white">
                  {quizQuestions[currentQuestionIndex].text}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.score)}
                      className="w-full text-left p-4 rounded-xl border border-slate-700 hover:border-[#FF7A00]/60 bg-slate-900/40 hover:bg-slate-900/80 text-sm text-slate-200 hover:text-white font-opensans flex items-center gap-4 transition-all duration-200 cursor-pointer group"
                    >
                      <span className="text-xl text-slate-400 group-hover:scale-110 transition-transform">{option.icon}</span>
                      <span className="flex-1 font-medium">{option.text}</span>
                      <span className="text-xs bg-[#FF7A00]/10 text-[#FF7A00]/80 group-hover:bg-[#FF7A00] group-hover:text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-montserrat transition-all">Selecionar</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mx-auto text-[#FF7A00]">
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-montserrat font-bold">Diagnóstico Concluído</p>
                </div>

                {/* Score mapping container */}
                <div className={`p-5 rounded-xl border ${getQuizResult().color} space-y-2.5`}>
                  <h4 className="font-montserrat font-bold text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    {getQuizResult().title}
                  </h4>
                  <p className="text-sm font-opensans leading-normal text-slate-200">
                    {getQuizResult().description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed">
                    🌟 <strong>A Solução Prática:</strong> O treinamento prático <strong className="text-white">A Lei da Primeira Voz™</strong> foi formulado metodologicamente para lidar com essas realidades exatas, fornecendo o script de diálogo, as 4 barreiras de bloqueio e passos concretos para que seu conselho prevaleça na mente do seu filho.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={triggerCTA}
                      className="flex-1 bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold py-3.5 px-5 rounded-xl text-center text-sm tracking-wide shadow-lg shadow-[#FF7A00]/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      APLICAR O MÉTODO COMPLETO AGORA
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 font-montserrat font-bold py-3.5 px-5 rounded-xl text-sm transition-all cursor-pointer"
                    >
                      REFAZER DIAGNÓSTICO
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Connection Fold / Secondary Emotional Image Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Aspect: The Emotional Image displaying Father-Child interaction */}
        <div className="lg:col-span-6 relative order-last lg:order-first">
          
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/10 to-transparent blur-2xl opacity-40 pointer-events-none"></div>

          {/* Picture frame with descriptive rendering */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900/50 aspect-[4/3] group">
            <img 
              src={fatherSonImage} 
              alt="Conversação genuína entre pai e filho adolescente" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>

          {/* Overlay Box summarizing visual impact */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-990/90 border border-slate-800/80 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Heart className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-350 leading-relaxed font-opensans">
              "A verdadeira autoridade não se impõe pelo grito ou pela punição, mas pela certeza de que você é o único porto seguro inabalável dele." 
            </p>
          </div>

        </div>

        {/* Right Aspect: Heartbreaking truth and deep empathy copy to make reader think 'Precisar entender a Primeira Voz' */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full px-3.5 py-1.5 w-max text-xs font-montserrat font-bold text-[#FF7A00] tracking-wider uppercase">
            Por que este método é indispensável agora?
          </div>

          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-snug">
            Ele parou de te escutar? Ou simplesmente começou a ouvir outras vozes?
          </h2>

          <div className="font-opensans text-slate-300 text-sm sm:text-base space-y-4 leading-relaxed">
            <p>
              Em um mundo tomado por telas de celulares de algoritmos implacáveis, <strong className="text-white">o silêncio do seu filho na sala de jantar não é apenas cansaço</strong>. É um sinal de que ele já encontrou outras fontes de referência.
            </p>
            <p>
              A <strong className="text-[#FF7A00]">Lei da Primeira Voz™</strong> explica o mecanismo pelo qual a primeira opinião ou conselho que faz sentido para a mente de um adolescente torna-se o seu escudo protetor. Se essa primeira resposta não vem de você, ela virá do TikTok, do influenciador digital ou do colega inconsequente.
            </p>
            <p>
              Wagner ensina como construir esse escudo relacional. Sem drama, sem brigas intermináveis, sem invasão de privacidade, mas através de um <strong className="text-white">protocolo de 4 etapas estruturadas</strong> construído ao longo de mais de 23 anos lidando na primeira linha educativa com 12 mil lares brasileiros.
            </p>
          </div>

          {/* Quick Pillar List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 bg-[#0a1e36]/60 rounded-xl border border-slate-800 flex gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center text-[#FF7A00] font-montserrat font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="text-sm font-semibold font-montserrat text-white">Bloqueio de Influência</h4>
                <p className="text-xs text-slate-400 font-opensans">Filtre as opiniões destrutivas exteriores de forma pacífica no lar.</p>
              </div>
            </div>
            <div className="p-3.5 bg-[#0a1e36]/60 rounded-xl border border-slate-800 flex gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center text-[#FF7A00] font-montserrat font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="text-sm font-semibold font-montserrat text-white">Canal de Confiança Direto</h4>
                <p className="text-xs text-slate-400 font-opensans">Faça seu filho se sentir seguro para te procurar antes de qualquer erro.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={triggerCTA}
              className="inline-flex items-center gap-2 bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold px-7 py-4 rounded-xl text-center text-sm select-none shadow-md shadow-[#FF7A00]/15 hover:shadow-lg transition-transform duration-200 cursor-pointer"
            >
              QUERO ADQUIRIR O ARQUIVO DE TREINAMENTO (R$ 17)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* 5. Informative section: What is included in the package? */}
      <section className="w-full bg-[#030d1a] border-t border-slate-800/80 py-16 px-6 text-center">
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-white">
              O que você receberá imediatamente por R$ 17?
            </h2>
            <p className="text-slate-300 font-opensans text-sm sm:text-base leading-relaxed">
              O material original completo em formato digital, pronto para download ou leitura em qualquer dispositivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-[#071529]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center text-[#FF7A00]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white">Ebook Prático de Leitura Rápida</h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-opensans">
                Nada de enrolação acadêmica complexa. Vá direto ao ponto com o passo a passo da Lei da Primeira Voz™ pronto para ser colocado em ação nesta mesma semana.
              </p>
            </div>

            <div className="bg-[#071529]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center text-[#FF7A00]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white">Guia de Diálogos Comportamentais</h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-opensans">
                Scripts de conversa exatos sobre celular, mentiras, isolamento e amizades hostis. Saiba o que falar e, mais importante, o que NÃO falar no calor das discussões.
              </p>
            </div>

            <div className="bg-[#071529]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center text-[#FF7A00]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white">Acesso à Comunidade e Lives</h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-opensans">
                Vídeos complementares periódicos e perguntas respondidas em nossa comunidade VIP de pais focados no mesmo propósito de blindar seus lares.
              </p>
            </div>

          </div>

          <div className="p-6 bg-[#0a1e36]/60 rounded-2xl border border-slate-800 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1.5">
              <h4 className="font-montserrat font-extrabold text-white text-lg flex items-center gap-1.5">
                🛡️ Risco Zero Garantido
              </h4>
              <p className="text-[#D7D7D7] font-opensans text-xs sm:text-sm leading-relaxed">
                Você tem 30 dias de teste de garantia estendida. Se o material não abrir seus olhos ou não gerar melhorias imediatos em sua casa, basta solicitar o reembolso por e-mail com 1 clique.
              </p>
            </div>
            <button
              onClick={triggerCTA}
              className="w-full md:w-auto flex-shrink-0 bg-transparent hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/50 hover:border-orange-500 font-montserrat font-bold py-3 px-6 rounded-xl text-center text-xs tracking-wider transition-all duration-300 cursor-pointer"
            >
              GARANTIR MEU ACESSO COM SEGURANÇA
            </button>
          </div>

        </div>
      </section>

      {/* 3.5 SEÇÃO 07 — QUEBRA DE OBJEÇÕES (REDUÇÃO DE RISCO MÁXIMO) */}
      <section id="faq-objection-section" className="w-full bg-white text-[#071529] py-20 lg:py-32 px-6 relative border-t border-slate-100">
        <div className="max-w-[1100px] mx-auto space-y-16 lg:space-y-24">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-[#FF7A00] font-montserrat font-bold text-xs md:text-sm tracking-widest uppercase block">
              ANTES DE VOCÊ DECIDIR… PRECISO RESPONDER ALGUMAS COISAS IMPORTANTES
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 tracking-tight">
              Se você está se perguntando isso, você não está sozinho.
            </h2>
            <div className="w-20 h-1 bg-[#FF7A00] mx-auto my-6"></div>
            <p className="font-opensans text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Essas são as dúvidas mais comuns de pais e mães antes de começarem o método da <span className="text-[#071529] font-bold">Primeira Voz™</span>. E todas têm respostas simples.
            </p>
          </div>

          {/* Interactive Accordion Layout */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                id: "faq-01",
                q: "“Meu filho já é adolescente… ainda funciona?”",
                a: [
                  "Sim.",
                  "E, na verdade, muitas vezes é ainda mais importante nessa fase.",
                  "A adolescência não encerra a influência dos pais.",
                  "Ela apenas muda quem está disputando essa posição.",
                  "O método não depende da idade.",
                  "Depende da forma como a conexão é construída daqui pra frente.",
                  "Pais de adolescentes são justamente os que mais relatam mudanças extraordinárias quando aplicam o Reconectar™ primeiro."
                ]
              },
              {
                id: "faq-02",
                q: "“Eu já tentei de tudo e nada funcionou.”",
                a: [
                  "Isso é mais comum do que parece.",
                  "Na maioria dos casos, os pais não falham de forma alguma por falta de esforço.",
                  "Mas puramente por falta de direção objetiva.",
                  "Eles tentam estratégias isoladas e impulsivas:",
                  "Conversam mais por dois dias, cobram menos em outro, tentam impor limites severos de repente...",
                  "Mas sem um sistema cíclico estruturado, as tentativas de conexão não se sustentam.",
                  "O Método 3R™ não é apenas mais uma tentativa isolada. É um caminho científico."
                ]
              },
              {
                id: "faq-03",
                q: "“Eu não tenho tempo para isso.”",
                a: [
                  "Você não precisa de mais tempo no seu calendário.",
                  "Precisa de uma nova forma de usar o tempo que já existe em sua rotina técnica.",
                  "A maioria dos pais acredita sinceramente que precisa de horas a fio de conselhos complexos.",
                  "Mas pequenas mudanças nos micro-contatos diários já começam a alterar profundamente a dinâmica psicológica da casa.",
                  "O programa foi milimetricamente desenhado para rotinas reais: pais trabalhadores, pais cansados, pais ocupados."
                ]
              },
              {
                id: "faq-04",
                q: "“E se meu filho não quiser conversar comigo?”",
                a: [
                  "Isso não é o problema terminal. É o ponto exato de partida do método.",
                  "A imensa maioria dos pais começa exatamente neste mesmo cenário de silêncio.",
                  "O erro crônico é tentar forçar conversas profundas à base de cobrança.",
                  "O método começa muito antes de uma conversa falada:",
                  "Começa na forma como você se posiciona emocionalmente dentro da relação quotidiana.",
                  "Quando a sua postura muda... a abertura natural do filho também muda espontaneamente."
                ]
              },
              {
                id: "faq-05",
                q: "“Isso funciona mesmo se já existe muita distância entre nós?”",
                a: [
                  "Sim, com toda certeza.",
                  "E em muitos casos de isolamento severo, essa é exatamente a situação onde os maiores avanços e milagres acontecem.",
                  "Porque a reconexão empática não depende de erros cometidos no passado.",
                  "Depende unicamente do que você conscientemente começa a fazer a partir do dia de hoje."
                ]
              },
              {
                id: "faq-06",
                q: "“Isso é um curso ou uma promessa exagerada de internet?”",
                a: [
                  "De maneira nenhuma é uma promessa mágica de mudança instantânea em 24 horas, nem teoria acadêmica rasa.",
                  "Trata-se de um método de intervenção prático baseado em rigorosos padrões observados em mais de 12.000 famílias brasileiras ao longo de 23 anos de atendimento pedagógico.",
                  "O foco primordial aqui não é atingir a perfeição familiar absoluta. É dar direção protetiva."
                ]
              }
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={item.id} 
                  id={item.id} 
                  className="bg-[#F8F9FB] border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 hover:border-slate-300"
                >
                  <button
                    id={`btn-${item.id}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 font-montserrat font-bold text-[#071529] text-sm sm:text-base cursor-pointer tracking-tight select-none"
                  >
                    <span>{item.q}</span>
                    <span className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#FF7A00] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-6 sm:p-8 bg-white font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed space-y-3">
                          {item.a.map((par, pIdx) => (
                            <p key={pIdx}>{par}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* BLOCO DE SEGURANÇA */}
          <div className="bg-[#F8F9FB] border border-slate-205/60 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 shadow-sm">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded">COMPRA 100% GARANTIDA</span>
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-[#071529] tracking-tight">
                Você não está assumindo nenhum risco financeiro ou pessoal
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-opensans max-w-lg mx-auto leading-relaxed">
                Nossa prioridade número um é dar conforto e total segurança para que você tome a melhor decisão para o seu lar hoje.
              </p>
            </div>

            {/* Checklist of security items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
              {[
                { title: "Acesso imediato", text: "Liberado logo após a compra" },
                { title: "Funciona no celular", text: "Leia e assista de onde quiser" },
                { title: "Conteúdo prático", text: "Passo a passo ultra direto" },
                { title: "Suporte disponível", text: "Equipe pronta para ajudar" },
                { title: "Garantia de 30 dias", text: "Nível máximo de proteção" }
              ].map((sec, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-center text-center space-y-1.5 shadow-xs hover:border-[#FF7A00]/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                  </div>
                  <h4 className="font-montserrat font-extrabold text-slate-900 text-[11px] leading-tight uppercase tracking-wider">{sec.title}</h4>
                  <p className="font-opensans text-[10px] text-slate-500 leading-snug">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCO DE GARANTIA INCONDICIONAL - #071529 */}
          <div className="bg-[#071529] text-white rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-[#FF7A00]/5 pointer-events-none"></div>
            
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400">
                <Award className="w-10 h-10 stroke-[1.5]" />
              </div>
              <span className="font-montserrat font-extrabold text-amber-400 text-xs uppercase tracking-widest block">SATISFAÇÃO MÁXIMA</span>
            </div>

            <div className="md:col-span-8 text-left space-y-4">
              <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-white">
                Garantia incondicional de 30 dias
              </h3>
              <div className="w-12 h-0.5 bg-[#FF7A00]"></div>
              <div className="font-opensans text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Você pode acessar o conteúdo digital completo nesta mesma noite. Ler todos os capítulos, aplicar os simples princípios e testar livremente dentro da sua rotina real de convivência.
                </p>
                <p>
                  E se por qualquer motivo pessoal, racional ou mesmo emocional você sinceramente sentir que as ferramentas não fazem sentido para sua família...
                </p>
                <p className="font-bold text-white">
                  Basta você solicitar o seu reembolso total do valor de R$ 17. Faremos isso sem perguntas inconvenientes, sem burocracias desnecessárias e sem qualquer risco para o seu bolso.
                </p>
              </div>
            </div>
          </div>

          {/* CAIXA DE IMPACTO - #FF7A00 background */}
          <div className="bg-[#FF7A00] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl shadow-[#FF7A00]/20 relative overflow-hidden">
            <p className="font-montserrat font-extrabold text-base sm:text-xl lg:text-2xl leading-relaxed">
              "O maior risco aqui não é testar e aplicar o método prático.<br className="hidden sm:block" />
              O maior risco é continuar de braços cruzados deixando a distância interna crescer sem agir."
            </p>
          </div>

          {/* TRANSIÇÃO EMOCIONAL + CTA */}
          <div className="max-w-2xl mx-auto text-center space-y-8 pt-8">
            <div className="space-y-4 font-opensans text-slate-650 text-sm sm:text-base leading-relaxed">
              <p>
                Agora que você verdadeiramente entendeu as bases fundamentais do método...
              </p>
              <p>
                Viu com seus próprios olhos os relatos reais de transformações profundas ocorridas na linha de frente...
              </p>
              <p>
                E percebeu de forma clara que pode tranquilamente aplicar cada tática na sua realidade familiar quotidiana...
              </p>
              
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl my-4">
                <p className="font-montserrat font-extrabold text-[#071529] text-base leading-snug">
                  Existe de fato apenas uma única dúvida restante para hoje:
                </p>
                <p className="italic text-[#FF7A00] font-bold text-base sm:text-lg mt-2">
                  Você prefere continuar sendo apenas um pai ou mãe presente no papel financeiro... ou quer voltar legitimamente a ser a principal influência na vida do seu filho?
                </p>
              </div>
            </div>

            {/* CTA Final da Seção 7 */}
            <div className="text-center pt-2">
              <motion.button
                id="btn-conclude-objection-cta"
                onClick={triggerCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 py-5 h-16 rounded-xl shadow-xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3 transition-colors duration-200"
              >
                QUERO ACESSAR A PRIMEIRA VOZ™
                <ArrowRight className="w-5 h-5 text-white animate-pulse" />
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* 3.6 SEÇÃO 08 — OFERTA + STACK DE VALOR + PRECIFICAÇÃO PSICOLÓGICA */}
      <section id="offer-section" className="w-full bg-gradient-to-b from-[#071529] to-[#0B2A4A] text-white py-24 lg:py-36 px-6 relative overflow-hidden">
        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1100px] mx-auto space-y-16 lg:space-y-24 relative z-10">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-orange-400 font-montserrat font-semibold text-xs md:text-sm tracking-widest uppercase block">
              AGORA É A PARTE MAIS IMPORTANTE
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight">
              Você não está comprando um simples curso.<br />
              <span className="text-[#FF7A00]">Você está recuperando sua legítima influência dentro de casa.</span>
            </h2>
            <div className="w-20 h-1 bg-[#FF7A00] mx-auto my-6"></div>
            <p className="font-opensans text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Tudo o que você viu até aqui foi construído para te mostrar uma única coisa:<br />
              <strong className="text-white">A forma como seu filho te enxerga hoje pode ser totalmente reconstruída.</strong>
            </p>
          </div>

          {/* Transição Emocional */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-opensans text-slate-300 text-sm sm:text-base leading-relaxed">
              Se você dedicou seu tempo para ler até aqui… não foi meramente por curiosidade passageira. Foi porque algo forte dentro de você já reconheceu: 
              <span className="italic text-orange-300 block font-semibold mt-2 font-montserrat text-base sm:text-lg">
                “Isso descreve perfeitamente a minha própria família.”
              </span>
            </p>
            <p className="font-montserrat font-bold text-white text-base pt-2">
              Neste exato momento, você tem apenas duas escolhas claras pela frente:
            </p>
          </div>

          {/* Bloco de Escolhas (OPÇÃO 1 vs OPÇÃO 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            
            {/* Opção 1: Continuar como está hoje */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all relative group">
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-slate-500 font-extrabold uppercase bg-slate-800 px-3 py-1 rounded inline-block">
                  OPÇÃO 01
                </span>
                <h4 className="font-montserrat font-extrabold text-slate-400 text-lg uppercase tracking-wider">
                  Continuar como está hoje
                </h4>
                <div className="w-8 h-px bg-slate-700"></div>
                <ul className="space-y-3 font-opensans text-slate-400 text-xs sm:text-sm leading-relaxed list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Esperar passivamente que as crises e o tédio passem sozinhos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Tentar melhorar o diálogo sozinho através de intuição espontânea.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Assistir silenciosamente à barreira invisível e à distância crescerem lentamente dia após dia.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Sem direção clara, sem sistema científico e sem método empático testado.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500 italic">
                Resultado: Nada muda. A rotina defensiva continua igual.
              </p>
            </div>

            {/* Opção 2: Seguir o método */}
            <div className="bg-white border-2 border-[#FF7A00] text-[#071529] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-[#FF7A00]/10 hover:shadow-[#FF7A00]/20 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#FF7A00] text-white text-[9px] font-mono font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-widest">
                RECOMENDADA
              </div>
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-[#FF7A00] font-extrabold uppercase bg-[#FF7A00]/10 px-3 py-1 rounded inline-block">
                  OPÇÃO 02
                </span>
                <h4 className="font-montserrat font-extrabold text-[#071529] text-lg uppercase tracking-wider">
                  Aplicar um método estruturado
                </h4>
                <div className="w-8 h-px bg-orange-400"></div>
                <ul className="space-y-3 font-opensans text-slate-700 text-xs sm:text-sm leading-relaxed list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-semibold text-slate-900">Baseado em padrões reais observados em mais de 12.000 lares.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Um roteiro prático que ensina de forma objetiva como reconectar e se reposicionar de forma digna.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Sua influência ativa e blindada duradouramente dentro do peito do seu filho.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full mt-2 flex-shrink-0"></span>
                    <span>Segurança completa e controle pleno do seu papel paterno essencial.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs font-mono font-bold text-[#FF7A00] uppercase tracking-wider bg-orange-50 p-2 rounded text-center">
                Resultado: Conexão real e diálogo voluntário.
              </p>
            </div>

          </div>

          {/* STACK DE VALOR (DESCONSTRUÇÃO DO VALOR) */}
          <div className="bg-white text-[#071529] rounded-[24px] p-6 sm:p-10 md:p-16 max-w-4xl mx-auto space-y-10 shadow-2xl">
            <div className="text-center space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-montserrat font-extrabold text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded">DESCONSTRUÇÃO DO VALOR</span>
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                Tudo o que você recebe hoje ao entrar na Primeira Voz™
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-opensans max-w-md mx-auto">
                Toda a bagagem de 23 anos do Wagner formatada em um ecossistema digital objetivo e acionável imediatamente.
              </p>
            </div>

            {/* Itens do Stack */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {[
                {
                  num: "01",
                  title: "PROGRAMA COMPLETO — A PRIMEIRA VOZ™",
                  val: "R$ 297",
                  desc: "O sistema de intervenção completo que ensina passo a passo como recuperar sua cadeira soberana de principal influência emocional no desenvolvimento do seu filho."
                },
                {
                  num: "02",
                  title: "MÉTODO 3R™ (Reconectar, Reposicionar, Referenciar)",
                  val: "R$ 147",
                  desc: "O manual de estratégia e framework que organiza com fluidez toda a transição de postura mental dentro da sua rotina diária real."
                },
                {
                  num: "03",
                  title: "PLANO DE AÇÃO 21 DIAS™",
                  val: "R$ 97",
                  desc: "Mapeamento em formato de micro-atividades diárias simples para você começar a ver mudanças visíveis de clima doméstico sem sobrecarregar sua rotina corporativa."
                },
                {
                  num: "04",
                  title: "GUIA DAS CONVERSAS QUE APROXIMAM™",
                  val: "R$ 97",
                  desc: "Formulários e roteiros de conversas prontas para destravar as barreiras do silêncio e as respostas curtas, abrindo espaço para confissões reais."
                },
                {
                  num: "05",
                  title: "MAPA DA INFLUÊNCIA FAMILIAR™",
                  val: "R$ 97",
                  desc: "Um teste e análise de diagnóstico para você rastrear de fato quem está ocupando a cadeira de influência primordial no coração do seu filho hoje (redes, amigos ou você)."
                },
                {
                  num: "06",
                  title: "CARTA AO FUTURO™",
                  val: "R$ 47",
                  desc: "Exercício emocional guiado com profunda força simbólica para alinhar seu coração com o verdadeiro legado moral que você deixará no mundo."
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start justify-between gap-4 p-5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-150 transition-colors">
                  <div className="flex gap-3.5 items-start">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-[#FF7A00] bg-orange-50 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-montserrat font-extrabold text-xs sm:text-sm md:text-base text-slate-900 leading-snug uppercase">
                        {item.title}
                      </h4>
                      <p className="font-opensans text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="self-end sm:self-center font-mono text-slate-400 line-through text-xs sm:text-sm uppercase font-semibold">
                    Valor: <span className="text-slate-500">{item.val}</span>
                  </div>
                </div>
              ))}

            </div>

            {/* Total Anchored Value Card */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-mono text-slate-400 text-xs uppercase tracking-wider">Valor Real Acumulado de Entrega:</p>
                <p className="font-montserrat font-extrabold text-slate-400 line-through text-lg sm:text-xl">R$ 685,00</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 text-center sm:text-right">
                <span className="font-mono text-[9px] text-emerald-600 font-extrabold uppercase tracking-wide block">DESCONTO ATIVO HOJE</span>
                <span className="font-montserrat font-extrabold text-emerald-800 text-sm">Economia garantida de R$ 668,00</span>
              </div>
            </div>

          </div>

          {/* BLOCO DE QUEBRA DE VALOR + PREÇO DESTACADO */}
          <div className="max-w-2xl mx-auto text-center space-y-8">
            
            <div className="bg-[#122A47] border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-3">
              <h4 className="font-montserrat font-extrabold text-white text-lg sm:text-xl">
                Hoje você não irá pagar nada perto disso.
              </h4>
              <p className="font-opensans text-slate-305 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                Porque o real propósito educacional aqui nunca foi a maximização do lucro imediato de vendas, mas sim viabilizar que qualquer pai e mãe conscientes no Brasil tenham acesso imediato a essa sabedoria de defesa do lar.
              </p>
            </div>

            {/* PREÇO DESTACADO - #FF7A00 */}
            <div className="bg-[#FF7A00] rounded-3xl p-8 shadow-2xl shadow-[#FF7A00]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
              <div className="space-y-3 relative z-10">
                <span className="text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/15 px-3 py-1 rounded-full">
                  PREÇO PROMOCIONAL EXCLUSIVO
                </span>
                <h4 className="font-montserrat font-extrabold text-xs sm:text-sm text-white/90">PAGAMENTO ÚNICO • SEM LETRAS MIÚDAS</h4>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-montserrat font-bold text-white text-xl sm:text-2xl self-start mt-2">R$</span>
                  <span className="font-montserrat font-black text-white text-5xl sm:text-6xl tracking-tight leading-none">17</span>
                  <span className="font-montserrat font-bold text-white text-base sm:text-lg self-end mb-2">,00</span>
                  <span className="text-[10px] text-white/80 font-mono font-bold align-super self-start ml-1 mt-3">À VISTA</span>
                </div>
                <div className="w-16 h-0.5 bg-white/20 mx-auto"></div>
                
                {/* Micro Copy */}
                <p className="font-opensans text-white/90 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed pt-1">
                  Menos do que a compra de um simples lanche rápido de balcão... Menos do que uma única entrada simples de cinema de fim de semana... Menos do que a maioria massiva de gastos fúteis diários que geram absolutamente zero impacto eterno para as pessoas que você mais ama no mundo.
                </p>
              </div>
            </div>

          </div>

          {/* BLOCO DE REDUÇÃO DE RISCO */}
          <div className="border-t border-slate-700/60 pt-10 text-center space-y-6 max-w-3xl mx-auto">
            <h4 className="font-montserrat font-bold text-white uppercase text-xs sm:text-sm tracking-widest text-[#FF7A05]">
              VOCÊ NÃO ESTÁ ARRISCANDO ABSOLUTAMENTE NADA
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Acesso imediato e vitalício após o pagamento",
                "Funciona perfeitamente integrado no celular",
                "Conteúdo 100% aplicável na rotina normal",
                "Garantia Incondicional de 30 dias de teste",
                "Suporte direto ao aluno e dúvidas"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#122A47]/60 border border-slate-700/40 px-3.5 py-2 rounded-xl">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-opensans text-[10px] sm:text-xs text-white/90 leading-none">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCO DE URGÊNCIA EMOCIONAL */}
          <div className="bg-[#071529]/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-white">
              O único risco real e imutável aqui é o tempo.
            </h3>
            <div className="w-12 h-0.5 bg-slate-700 mx-auto"></div>
            <div className="font-opensans text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3 max-w-xl mx-auto text-center">
              <p>
                O seu herdeiro ou adolescente não vai gentilmente congelar no tempo ou esperar que você subitamente “tenha mais horas vagas” no futuro para reconectar.
              </p>
              <p>
                A concorrência pela mente dele não pausa. As piores vozes das mídias disputam a cadeira de bússola moral dele a cada segundo, a cada ausência e a cada pequena brecha de silêncio que você permite em casa.
              </p>
              <p className="font-bold text-white text-xs sm:text-sm">
                Cada frase omitida, cada fim de tarde renegado e cada cobrança agressiva está, silenciosamente e em tempo real, moldando quem ele procurará para partilhar angústias no mundo exterior.
              </p>
            </div>

            {/* CAIXA DE IMPACTO LARANJA */}
            <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-2xl p-4 max-w-md mx-auto py-5">
              <p className="font-montserrat font-extrabold text-xs text-[#FF7A00] tracking-widest uppercase">
                Você nunca perde influência de uma vez só.<br />
                <span className="text-white font-bold tracking-normal block mt-1.5 lowercase first-letter:uppercase text-xs sm:text-sm font-opensans">Você perde aos poucos. No silêncio. Sem perceber.</span>
              </p>
            </div>
          </div>

          {/* Bloco de Garantia adicional */}
          <div className="bg-white text-[#071529] rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-5 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Award className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h5 className="font-montserrat font-extrabold text-[#071529] text-sm uppercase tracking-wide">
                Garantia de 30 dias — Sem risco real para o seu bolso
              </h5>
              <p className="font-opensans text-slate-500 text-xs leading-relaxed">
                Você pode tranquilamente entrar, examinar todo o conteúdo no seu ritmo e testar na realidade do seu lar. Se não fizer sentido algum, solicite reembolso simples de R$ 17 sem perguntas chatas ou qualquer burocracia técnica.
              </p>
            </div>
          </div>

          {/* CTA PRINCIPAL DE COMPRA COMPATÍVEL COM ESPECIFICAÇÕES */}
          <div className="text-center space-y-3 pt-6">
            <motion.button
              id="btn-main-checkout-cta"
              onClick={triggerCTA}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 h-[70px] rounded-[14px] shadow-2xl shadow-[#FF7A00]/30 cursor-pointer inline-flex items-center gap-3.5 transition-colors duration-200"
            >
              QUERO ACESSAR A PRIMEIRA VOZ AGORA
              <ArrowRight className="w-5 h-5 text-white animate-pulse" />
            </motion.button>
            <p className="font-mono text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
              Acesso imediato • Garantia incondicional de 30 dias • Pagamento único de R$ 17
            </p>
          </div>

          {/* SEÇÃO FINAL DE FECHAMENTO */}
          <div className="max-w-xl mx-auto text-center space-y-6 pt-12 border-t border-slate-800">
            <div className="space-y-4">
              <p className="font-opensans text-slate-300 text-sm sm:text-base leading-relaxed italic">
                “Você não precisa se transformar em um pai ou mãe perfeitos e infalíveis de comercial de TV.<br />
                Você só precisa ser um pai presente de forma profundamente intencional.”
              </p>
            </div>
            {/* Signature Area */}
            <div className="flex flex-col items-center justify-center space-y-1 pt-2">
              <span className="font-montserrat font-extrabold text-white text-base">Wagner Ferraz</span>
              <span className="font-mono text-[10px] text-[#FF7A00] font-extrabold uppercase tracking-widest">
                A Primeira Voz™
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3.7 SEÇÃO 09 — FAQ FINAL (PÓS-OBJEÇÃO + FECHAMENTO DECISIVO) */}
      <section id="final-faq-section" className="w-full bg-white text-[#071529] py-20 lg:py-32 px-6 relative border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto space-y-16 lg:space-y-24">

          {/* Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <span className="text-slate-500 font-montserrat font-semibold text-xs md:text-sm tracking-widest uppercase block">
              ANTES DE FINALIZAR SUA DECISÃO…
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 tracking-tight">
              Se ainda restou alguma dúvida, aqui estão as respostas diretas.
            </h2>
            <div className="w-20 h-1 bg-[#FF7A00] mx-auto my-6"></div>
            <p className="font-opensans text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Essas são as perguntas mais comuns de pais e mães antes de entrar na Primeira Voz™.
            </p>
          </div>

          {/* Interactive Accordion final-faq list */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "Isso realmente funciona para adolescentes?",
                a: [
                  "Sim.",
                  "Inclusive, grande parte dos resultados mais rápidos e profundos acontece justamente nessa fase de transição de vida.",
                  "A adolescência não elimina ou extingue a influência biológica e emocional dos pais.",
                  "Ela apenas altera drasticamente quem e o que disputa ativamente essa valiosa posição no coração dele.",
                  "O método completo foi desenhado cirurgicamente pensando exatamente com foco nesse cenário de resistência e timidez."
                ]
              },
              {
                q: "Preciso ser um “bom pai” ou uma “boa mãe” para isso funcionar?",
                a: [
                  "Não.",
                  "O método não depende de perfeição pessoal ou histórico de calmaria infalível.",
                  "Depende unicamente de dar a direção certa e aplicar o passo a passo científico.",
                  "Pequenos ajustes estratégicos na forma de se comunicar verbalmente e se posicionar de forma empática já começam no mesmo dia a gerar transformações na dinâmica do lar."
                ]
              },
              {
                q: "Quanto tempo leva para de fato ver os primeiros resultados?",
                a: [
                  "Depende de cada rotina familiar e da constância na aplicação das pautas diárias.",
                  "Algumas famílias percebem mudanças assombrosas na resposta do silêncio em meros poucos dias de intervenção.",
                  "Outras levam poucas semanas para amolecer a capa defensiva do jovem.",
                  "Lembre-se sempre: o foco primordial aqui não é velocidade instantânea, mas sim a reconstrução segura e consistente da sua influência."
                ]
              },
              {
                q: "Isso é terapia? Ou substitui acompanhamento psicológico especializado?",
                a: [
                  "De forma alguma.",
                  "O método prático oferecido não substitui terapia médica ou psicológica com profissionais de saúde mental.",
                  "Trata-se de um guia de relacionamento puramente pedagógico e comportamental focado em restabelecer a comunicação, a conexão honesta e a legítima influência emocional paterna."
                ]
              },
              {
                q: "E se meu filho simplesmente não quiser participar dos exercícios?",
                a: [
                  "Você não precisa que ele concorde em participar de nenhum tipo de curso de forma ativa.",
                  "O processo de intervenção começa inteiramente em você e na sua postura.",
                  "Muda a forma como você inicia os contatos cotidianos, como reage ao estresse e como monta os limites.",
                  "E esta alteração silenciosa nas suas engrenagens modifica naturalmente toda a dinâmica da relação doméstica."
                ]
              },
              {
                q: "Eu já tentei diversas coisas e cursos e não funcionou. Por que seria diferente?",
                a: [
                  "Porque a imensa maioria das tentativas tradicionais são ações totalmente isoladas e sem fio condutor.",
                  "Tenta-se mais cobrança num dia, mais tédio ou conversa vazia no outro, aumento de punições no seguinte...",
                  "O Método 3R™ não se resume de forma alguma a um paliativo passageiro ou ação única.",
                  "É um sistema cíclico e altamente estruturado construído especificamente para refazer os pilares de conexão da casa."
                ]
              },
              {
                q: "Eu tenho pouquíssimo tempo diário livre. Isso funciona mesmo assim?",
                a: [
                  "Sim, perfeitamente.",
                  "O método não exige que você crie tempo extra ou desmarque compromissos corporativos.",
                  "Ele apenas reorganiza inteligentemente a qualidade da intenção por trás dos momentos curtos que você já compartilha rotineiramente no lar.",
                  "Pequenas interações direcionadas e consistentes acumulam grandes transformações morais na sua herança."
                ]
              },
              {
                q: "Isso é apenas mais uma daquelas promessas exageradas de internet?",
                a: [
                  "De maneira nenhuma.",
                  "Não há aqui nenhuma promessa ilusória de mudança milagrosa instantânea sem o seu esforço consciente diário.",
                  "O que entregamos é um método educacional empírico fundamentado na observação de mais de 12.000 lares ao longo de 23 anos de carreira do Wagner Ferraz.",
                  "O objetivo fundamental é te conceder clareza científica de direção educativa, sem teorias mirabolantes ou sermões chatos."
                ]
              }
            ].map((faq, idx) => {
              const isOpen = openFinalFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#F8F9FB] border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFinalFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-montserrat font-semibold text-[#071529] text-sm sm:text-base cursor-pointer tracking-tight select-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#FF7A00] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-6 sm:p-7 bg-white font-opensans text-slate-650 text-xs sm:text-sm leading-relaxed space-y-3">
                          {faq.a.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* SEÇÃO DE FECHAMENTO EMOCIONAL */}
          <div className="bg-[#F8F9FB] border border-slate-200 rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto space-y-8 text-center relative overflow-hidden shadow-sm">
            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              No final, tudo se resume a uma decisão simples.
            </h3>
            
            <div className="w-16 h-0.5 bg-slate-300 mx-auto"></div>

            <div className="font-opensans text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto space-y-4 text-center">
              <p>
                Você pode tranquilamente optar por continuar exatamente na mesma situação que se encontra hoje…
              </p>
              <p className="italic text-slate-500">
                Esperando pacientemente que o tempo corra... acumulando tentativas falhas sem nenhum tipo de direção clara ou método... cultivando as mesmas decepções.
              </p>
              <p className="font-semibold text-slate-900">
                Ou, se preferir, pode hoje aplicar um método rigorosamente estruturado que já amparou com sucesso milhares de famílias reais a restabelecerem a influência verdadeira no lar.
              </p>
            </div>

            {/* CAIXA DE IMPACTO - #071529 background */}
            <div className="bg-[#071529] text-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-md">
              <p className="font-montserrat font-bold text-sm sm:text-lg leading-relaxed">
                "A distância emocional definitiva não acontece em um rompante imediato de ira. Ela se cristaliza aos poucos, no silêncio quotidiano. E é precisamente aos poucos que ela pode ser revertida."
              </p>
            </div>

            {/* CTA PRINCIPAL */}
            <div className="text-center pt-4">
              <motion.button
                id="btn-final-closing-cta"
                onClick={triggerCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase px-8 h-[70px] rounded-[14px] shadow-2xl shadow-[#FF7A00]/20 cursor-pointer inline-flex items-center gap-3.5 transition-colors duration-200"
              >
                QUERO COMEÇAR AGORA COM A PRIMEIRA VOZ™
                <ArrowRight className="w-5 h-5 text-white animate-pulse" />
              </motion.button>
              <p className="font-mono text-[9px] sm:text-[10px] text-slate-500 font-semibold uppercase tracking-wide mt-3">
                Acesso imediato • Garantia incondicional de 30 dias • Pagamento único de R$ 17
              </p>
            </div>

            {/* SEÇÃO DE SEGURANÇA FINAL */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-slate-200/60 max-w-xl mx-auto">
              {[
                { icon: ShieldCheck, text: "Compra segura" },
                { icon: Lock, text: "Acesso imediato após pagamento" },
                { icon: Smartphone, text: "Funciona 100% no celular" },
                { icon: Award, text: "Garantia incondicional de 30 dias" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <item.icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-opensans font-semibold text-[10px] sm:text-xs text-slate-500">{item.text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* FECHAMENTO FINAL */}
          <div className="max-w-xl mx-auto text-center space-y-6 pt-8">
            <div className="space-y-4">
              <p className="font-opensans font-bold text-slate-900 text-sm sm:text-base">
                Se você chegou até este exato ponto de leitura… você no íntimo já sabe precisamente o que precisa fazer hoje.
              </p>
              <p className="font-montserrat font-bold text-[#FF7A00] text-base sm:text-lg uppercase tracking-wide">
                Você vai agir e proteger hoje… ou vai simplesmente deixar o tempo decidir o destino por você?
              </p>
            </div>
            {/* Signature */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="font-montserrat font-extrabold text-[#071529] text-base">Wagner Ferraz</span>
              <span className="font-mono text-[10px] text-[#FF7A00] font-extrabold uppercase tracking-widest">
                A Primeira Voz™
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3.8 SEÇÃO 10 — CHECKOUT OTIMIZADO (CONVERSÃO MÁXIMA) */}
      <section id="checkout-optimized-section" className="w-full bg-[#F5F7FA] text-[#071529] py-24 lg:py-32 px-6 relative border-t border-slate-200">
        <div className="max-w-[1100px] mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#FF7A00] font-montserrat font-bold text-xs md:text-sm tracking-widest uppercase block">
              ÚLTIMO PASSO PARA RECUPERAR SUA INFLUÊNCIA DENTRO DE CASA
            </span>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight text-slate-900 tracking-tight">
              Você está a poucos segundos de acessar o Método A Primeira Voz™
            </h2>
            <div className="w-16 h-1 bg-[#FF7A00] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 max-w-5xl mx-auto">
            
            {/* Esquerda: Bloco de Reforço de Valor e Entregáveis */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Bloco de Reforço de Valor */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <h3 className="font-montserrat font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#FF7A00]" />
                  O que você está levando hoje:
                </h3>

                <div className="space-y-5">
                  {[
                    {
                      title: "A PRIMEIRA VOZ™ — PROGRAMA COMPLETO",
                      desc: "✔ Sistema completo para reconstruir sua influência emocional\n✔ Baseado em 23 anos de experiência com famílias reais"
                    },
                    {
                      title: "MÉTODO 3R™",
                      desc: "✔ Reconectar • Reposicionar • Referenciar\n✔ Estrutura prática de aplicação no dia a dia"
                    },
                    {
                      title: "PLANO 21 DIAS™",
                      desc: "✔ Aplicação guiada passo a passo\n✔ Sem complicação, sem sobrecarga"
                    },
                    {
                      title: "GUIA DAS CONVERSAS QUE APROXIMAM™",
                      desc: "✔ Scripts e perguntas práticas para gerar conexão"
                    },
                    {
                      title: "MAPA DA INFLUÊNCIA FAMILIAR™",
                      desc: "✔ Descubra quem está influenciando seu filho hoje"
                    },
                    {
                      title: "CARTA AO FUTURO™",
                      desc: "✔ Exercício emocional para clareza de legado"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5 text-left">
                      <h4 className="font-montserrat font-bold text-xs sm:text-sm text-slate-900 tracking-tight flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-orange-50 text-[#FF7A00] flex items-center justify-center font-mono text-[10px] sm:text-xs">
                          {idx + 1}
                        </span>
                        {item.title}
                      </h4>
                      <div className="font-opensans text-slate-600 text-xs sm:text-sm space-y-1 pl-7 leading-normal">
                        {item.desc.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className="flex items-start gap-1">
                            <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                            <span>{line.replace("✔ ", "")}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bloco de Valor Ancorado */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-wider">Valor total acumulado:</span>
                  <span className="font-montserrat font-extrabold text-[#071529]/60 line-through text-base sm:text-lg">R$ 685,00</span>
                </div>
              </div>

              {/* Bloco de Objeção Final (Mini) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-montserrat font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF7A00]" />
                  Ainda está em dúvida?
                </h4>
                <div className="font-opensans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p>
                    Se você chegou até aqui… é porque algo profundo dentro de você já reconheceu a imensa importância disso para o futuro do seu lar.
                  </p>
                  <p className="font-semibold text-slate-900">
                    A única questão pendente agora é:
                  </p>
                  <p className="italic text-[#FF7A00] font-semibold">
                    Você vai continuar deixando a distância crescer silenciosamente no dia a dia… ou vai verdadeiramente começar a reconstruir sua legítima influência hoje mesmo?
                  </p>
                </div>
              </div>

            </div>

            {/* Direita: Card de Checkout Centralizado (max-width 520px) */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="w-full max-w-[520px] bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                
                {/* Visual Accent Tab */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#FF7A00]"></div>

                {/* Preço Destacado */}
                <div className="bg-[#FF7A00] text-white rounded-xl p-5 sm:p-6 text-center shadow-md relative overflow-hidden">
                  <span className="text-[9px] font-mono tracking-widest font-extrabold bg-black/15 text-white/90 px-2.5 py-0.5 rounded uppercase block w-max mx-auto mb-2">
                    PROMOÇÃO DE ACESSO IMEDIATO
                  </span>
                  <p className="font-montserrat font-bold text-xs uppercase tracking-wide text-white/90">HOJE COM 97% DE DESCONTO</p>
                  
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    <span className="font-montserrat font-bold text-white text-lg self-start mt-1">R$</span>
                    <span className="font-montserrat font-black text-white text-5xl tracking-tight leading-none">17</span>
                    <span className="font-montserrat font-bold text-white text-base self-end mb-1">,00</span>
                  </div>
                  
                  <p className="font-mono text-[10px] font-extrabold text-white uppercase tracking-wider">Apenas pagamento único</p>
                  
                  {/* Micro Copy */}
                  <p className="font-opensans text-white/90 text-[10px] sm:text-xs leading-relaxed max-w-sm mx-auto pt-2 border-t border-white/10 mt-3">
                    Menos que um café simples fora de casa. Menos do que um lanche rápido. Muito menos que o impacto devastador de continuar agindo sem nenhuma direção.
                  </p>
                </div>

                {/* Form of Checkout Integrado para Conversão Máxima inline */}
                <div className="space-y-4 pt-1">
                  {/* Checkout Button */}
                  <div className="space-y-2 pt-2">
                    <motion.a
                      id="btn-checkout-optimized-cta"
                      href="https://pay.kiwify.com.br/5L603hT"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-[70px] bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-center text-xs sm:text-sm tracking-wider uppercase rounded-[14px] shadow-lg shadow-[#FF7A00]/25 cursor-pointer inline-flex items-center justify-center gap-3 transition-colors duration-200"
                    >
                      QUERO ACESSAR A PRIMEIRA VOZ AGORA
                      <ArrowRight className="w-5 h-5 text-white animate-pulse" />
                    </motion.a>
                    
                    {/* Micro copy below button */}
                    <p className="text-center font-mono text-[9px] text-slate-400 font-semibold tracking-wide uppercase">
                      Acesso imediato • Garantia de 30 dias • Pagamento único
                    </p>
                  </div>
                </div>

                {/* Bloco de Segurança */}
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <h5 className="font-montserrat font-bold text-[10px] text-slate-400 tracking-wider uppercase text-center">
                    VOCÊ NÃO ESTÁ ASSUMINDO NENHUM RISCO
                  </h5>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-[#071529]">
                    {[
                      "Acesso imediato após pagamento",
                      "Funciona em celular e computador",
                      "Conteúdo aplicável na rotina real",
                      "Garantia incondicional de 30 dias",
                      "Suporte dedicado ao aluno"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="font-opensans text-slate-600 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selos de Confiança (Trust Badges) */}
                  <div className="flex flex-wrap justify-center gap-3 pt-2 text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-600 text-center">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Compra protegida</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-500" /> Pagamento seguro</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Acesso instantâneo</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* BLOCO DE URGÊNCIA EMOCIONAL */}
          <div className="bg-[#071529] text-white rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-[#FF7A00]/5 pointer-events-none"></div>
            
            <div className="text-center md:text-left space-y-4 max-w-3xl">
              <span className="font-mono text-orange-400 text-xs uppercase tracking-widest block font-bold">NÃO FORCE O ADIAMENTO</span>
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Seu filho não espera você estar pronto
              </h3>
              <div className="w-12 h-0.5 bg-[#FF7A00]"></div>
              
              <div className="font-opensans text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3 pt-2">
                <p>
                  A influência familiar não faz pausas ou entra em recesso escolar. Ela está acontecendo exatamente agora.
                </p>
                <p>
                  Enquanto você lê esta página e decide se vale a pena investir apenas dezessete reais... outras dezenas de vozes fúteis da rede mundial continuam ocupando precioso espaço dentro do quarto dele.
                </p>
                <p>
                  Cada pauta que você se cala, cada ausência que renega e cada momento comum renegado está moldando inexoravelmente quem seu filho está se tornando.
                </p>
              </div>
            </div>

            {/* Caixa de Impacto */}
            <div className="bg-[#FF7A00] text-white rounded-2xl p-6 shadow-xl max-w-2xl mx-auto py-6">
              <p className="font-montserrat font-extrabold text-sm uppercase tracking-wider text-[#071529] text-center mb-1">Impacto Silencioso</p>
              <p className="font-montserrat font-extrabold text-base sm:text-lg text-center leading-normal">
                "Você nunca perde a sua influência com uma grande briga dramática em um único dia. Você a perde aos poucos, em micro-decisões do cotidiano."
              </p>
            </div>
          </div>

          {/* GARANTIA (REPETIÇÃO ESTRATÉGICA) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="md:col-span-4 flex justify-center py-4">
              <div className="relative flex flex-col items-center justify-center">
                {/* Shiny premium outer glowing circle */}
                <div className="absolute inset-x-[-12px] inset-y-[-12px] bg-amber-500/15 rounded-full blur-xl animate-pulse"></div>
                
                {/* Visual badge container */}
                <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-2xl flex items-center justify-center border-4 border-amber-350">
                  <div className="w-full h-full rounded-full bg-[#071529] flex flex-col items-center justify-center p-4 border border-amber-400/40 text-center relative overflow-hidden">
                    {/* Radial gold overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent)]"></div>
                    
                    {/* Stars bar */}
                    <div className="flex gap-1 justify-center mb-1 text-amber-400 relative z-10">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    
                    {/* GUARANTY DAYS TITLE */}
                    <span className="font-montserrat font-extrabold text-[10px] text-amber-300 tracking-wider uppercase relative z-10 leading-none mb-1">
                      GARANTIA DE
                    </span>
                    
                    {/* HUGE 30 */}
                    <span className="font-montserrat font-black text-6xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-200 tracking-tighter leading-none relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      30
                    </span>
                    
                    {/* DAYS */}
                    <span className="font-montserrat font-black text-sm text-white tracking-widest uppercase mt-0.5 relative z-10">
                      DIAS
                    </span>
                    
                    {/* Sub text */}
                    <span className="font-sans font-extrabold text-[8px] text-amber-400/95 tracking-wider uppercase mt-1 relative z-10">
                      SATISFAÇÃO OU REEMBOLSO
                    </span>
                    
                    {/* Double circles inside decoration */}
                    <div className="absolute inset-2.5 rounded-full border border-dashed border-amber-500/30 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Bottom ribbon/label */}
                <div className="absolute -bottom-3 bg-amber-500 text-[#071529] font-montserrat font-black text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg border border-yellow-250 flex items-center gap-1.5 z-20">
                  <ShieldCheck className="w-4 h-4" />
                  RISCO ZERO
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8 text-center md:text-left space-y-4">
              <h4 className="font-montserrat font-extrabold text-slate-900 text-lg sm:text-xl">
                Garantia de 30 dias
              </h4>
              <div className="font-opensans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Você pode acessar o conteúdo digital completo nesta mesma noite. Ler todos os capítulos, aplicar os simples princípios e testar livremente dentro da sua rotina real de convivência.
                </p>
                <p>
                  E se por qualquer motivo pessoal, racional ou mesmo emocional você sinceramente sentir que as ferramentas não fazem sentido para sua família, no período de <strong>7 dias</strong> você poderá solicitar o reembolso incondicional.
                </p>
                <p>
                  A garantia de <strong>30 dias</strong> se dá quando você consumir todo o conteúdo e ao colocar em prática, não obtém resultados positivos.
                </p>
                <p className="font-semibold text-slate-950">
                  Basta você solicitar o seu reembolso total do valor de R$ 17. Faremos isso sem perguntas inconvenientes, sem burocracias desnecessárias e sem qualquer risco para o seu bolso.
                </p>
              </div>
            </div>
          </div>

          {/* FECHAMENTO FINAL */}
          <div className="max-w-xl mx-auto text-center space-y-6 pt-12 border-t border-slate-250/60">
            <div className="space-y-3">
              <p className="font-opensans font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                Você não precisa ser perfeito. Você só precisa começar.
              </p>
            </div>
            
            {/* Signature Wagner Ferraz */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="font-montserrat font-extrabold text-[#071529] text-base animate-pulse">Wagner Ferraz</span>
              <span className="font-mono text-[10px] text-[#FF7A00] font-extrabold uppercase tracking-widest">
                A Primeira Voz™
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Footer section */}
      <footer className="w-full bg-[#040f1c] border-t border-slate-900 py-12 px-6 text-center text-[#D7D7D7]/60 text-xs font-opensans space-y-3">
        <p className="font-medium text-[#FF7A00]/80">A Primeira Voz — Todos os direitos reservados © 2026</p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          Este site e o treinamento oferecido não são afiliados às plataformas de mídias sociais (Facebook, Instagram, TikTok). O material disponibilizado representa a experiência e os conhecimentos de acompanhamento profissional de Wagner Ferraz, destinado ao fomento da educação familiar e laços emocionais saudáveis.
        </p>
        <div className="flex justify-center gap-4 pt-2 text-[#D7D7D7]/40">
          <a href="#hero-section" className="hover:text-white transition-colors duration-200">Termos de Uso</a>
          <span>•</span>
          <a href="#hero-section" className="hover:text-white transition-colors duration-200">Políticas de Privacidade</a>
          <span>•</span>
          <a href="#hero-section" className="hover:text-white transition-colors duration-200">Suporte</a>
        </div>
      </footer>

      {/* 7. Conversion Checkout Modal (The absolute fulfillment of purchase flow) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#071529] border border-slate-700 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header section of modal */}
              <div className="bg-[#0a1f3d] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00]"></span>
                  <h3 className="font-montserrat font-bold text-white text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#FF7A00]" />
                    AMBIENTE DE PAGAMENTO SEGURO
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-slate-400 hover:text-white text-2xl font-semibold leading-none p-1 transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Success Screen inside checkout */}
              {checkoutStep === "success" ? (
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/30">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-extrabold text-2xl text-white">Acesso Liberado!</h4>
                    <p className="text-sm text-slate-350 font-opensans max-w-xs mx-auto text-center leading-relaxed">
                      Parabéns por assumir esta liderança emocional hoje na vida do seu filho. O link de boas-vindas foi enviado para seu e-mail.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/80 text-left space-y-1 max-w-sm mx-auto">
                    <p className="text-xs font-semibold text-[#FF7A00] font-montserrat uppercase">Próximos passos:</p>
                    <p className="text-xs text-slate-300 font-opensans">1. Verifique seu e-mail: <strong className="text-white">{email}</strong></p>
                    <p className="text-xs text-slate-300 font-opensans">2. Participe do grupo exclusivo de pais Wagner Ferraz</p>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-montserrat font-bold rounded-xl tracking-wider cursor-pointer transition-colors text-sm sm:text-base"
                  >
                    COMEÇAR AGORA
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="p-6 sm:p-8 space-y-5">
                  
                  {/* Order review header */}
                  <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/20 p-4 rounded-xl flex items-center justify-between text-left">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-montserrat font-bold">Inscrição Treinamento</p>
                      <h4 className="text-sm font-bold font-montserrat text-white">Método Completo Lei da Primeira Voz™</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FF7A00] text-lg font-montserrat font-extrabold">R$ 17</p>
                      <p className="text-[10px] text-slate-400 font-opensans">Pagamento único</p>
                    </div>
                  </div>

                  {/* Multi-step indicator */}
                  <div className="flex gap-4 border-b border-slate-800 pb-3 text-xs md:text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("details")}
                      className={`flex-1 pb-1 transition-colors capitalize tracking-wide ${checkoutStep === "details" ? "text-[#FF7A00] border-b-2 border-[#FF7A00]" : "text-slate-400 hover:text-white"}`}
                    >
                      1. Identificação
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("payment")}
                      className={`flex-1 pb-1 transition-colors capitalize tracking-wide ${checkoutStep === "payment" ? "text-[#FF7A00] border-b-2 border-[#FF7A00]" : "text-slate-400 hover:text-white"}`}
                    >
                      2. Pagamento
                    </button>
                  </div>

                  {/* Step 1: Details */}
                  {checkoutStep === "details" && (
                    <div className="space-y-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-xs font-montserrat font-semibold text-slate-300">NOME COMPLETO</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ex: Carlos Albuquerque"
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-montserrat font-semibold text-slate-300">E-MAIL (Acesso será enviado aqui)</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ex: carlos@email.com"
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-montserrat font-semibold text-slate-300">CELULAR / WHATSAPP</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ex: (11) 99999-9999"
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (fullName && email && phone) {
                              setCheckoutStep("payment");
                            } else {
                              alert("Preencha todos os campos para prosseguir.");
                            }
                          }}
                          className="w-full text-center h-14 bg-[#FF7A00] hover:bg-[#E76A00] text-white font-montserrat font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-[#FF7A00]/10 hover:shadow-[#FF7A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          PROSSEGUIR PARA O PAGAMENTO
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment */}
                  {checkoutStep === "payment" && (
                    <div className="space-y-4 text-left">
                      
                      {/* Method selector buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("pix")}
                          className={`p-3 rounded-xl border text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${paymentMethod === "pix" ? "bg-[#FF7A00]/10 border-[#FF7A00] text-[#FF7A00]" : "bg-slate-900/30 border-slate-700 text-slate-300 hover:text-white"}`}
                        >
                          <QrCode className="w-4 h-4" />
                          Pix (Imediato)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`p-3 rounded-xl border text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${paymentMethod === "card" ? "bg-[#FF7A00]/10 border-[#FF7A00] text-[#FF7A00]" : "bg-slate-900/30 border-slate-700 text-slate-300 hover:text-white"}`}
                        >
                          <CreditCard className="w-4 h-4" />
                          Cartão de Crédito
                        </button>
                      </div>

                      {paymentMethod === "pix" ? (
                        <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-xl text-center space-y-4">
                          <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center p-2 border border-slate-600/50">
                            {/* Simple dynamic visual representation of a QR Code */}
                            <div className="w-full h-full bg-slate-950 flex flex-wrap p-1">
                              {Array.from({ length: 16 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-[25%] h-[25%] border border-[#071529] ${((i * i) + 7) % 3 === 0 ? "bg-white" : "bg-[#071529]"}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-xs text-slate-300 font-opensans leading-relaxed px-2">
                            Ao clicar em concluir, um código Pix único será gerado. Use o Copy/Paste em seu app bancário. O acesso é liberado instantaneamente.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-montserrat font-semibold text-slate-350">NÚMERO DO CARTÃO</label>
                            <input 
                              type="text" 
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="0000 0000 0000 0000"
                              className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-montserrat font-semibold text-slate-350">VALIDADE (MM/AA)</label>
                              <input 
                                type="text" 
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/AA"
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-montserrat font-semibold text-slate-350">CVC (CÓDIGO DE SEGURANÇA)</label>
                              <input 
                                type="text" 
                                required
                                value={cardCVC}
                                onChange={(e) => setCardCVC(e.target.value)}
                                placeholder="123"
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7A00] text-slate-200 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep("details")}
                          className="bg-transparent hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white font-montserrat font-bold py-3.5 rounded-xl text-center text-xs tracking-wider transition-all cursor-pointer"
                        >
                          VOLTAR
                        </button>
                        <button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-montserrat font-bold py-3.5 rounded-xl text-center text-xs tracking-wider shadow-lg shadow-emerald-500/10 transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          CONCLUIR PROTOCOLO (R$ 17)
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Safety symbols below details */}
                  <div className="flex justify-center items-center gap-6 pt-3 text-[10px] text-slate-400 font-opensans border-t border-slate-800/80">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure SSL Connection</span>
                    <span>•</span>
                    <span>30-Day Money-Back Guarantee</span>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

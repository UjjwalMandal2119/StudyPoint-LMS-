import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClipboard,
  FiCreditCard,
  FiEye,
  FiFileText,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiMoon,
  FiShield,
  FiSun,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import '../../styles/home.css';

const PHONE = '8294823430';
const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent('Hello Study Point, I would like to know more about admissions.')}`;

const PROGRAMS = [
  { title: 'Foundation', level: 'Early learning', duration: 'Academic session', icon: <FiBookOpen />, tone: 'blue', detail: 'Develop curiosity, confidence, and strong everyday learning habits.', tags: ['Learning foundations', 'Guided practice'] },
  { title: 'Class 1–5', level: 'Primary school', duration: 'Academic session', icon: <FiBookOpen />, tone: 'mint', detail: 'Build confidence across core school subjects with age-appropriate support.', tags: ['Core subjects', 'Hindi & English'] },
  { title: 'Class 6–8', level: 'Middle school', duration: 'Academic session', icon: <FiLayers />, tone: 'violet', detail: 'Make challenging subjects clearer with guided practice and steady support.', tags: ['Concept building', 'Regular practice'] },
  { title: 'Class 9–10', level: 'Board preparation', duration: 'Academic session', icon: <FiAward />, tone: 'amber', detail: 'Create a structured approach to learning, revision, and exam readiness.', tags: ['Chapter-wise learning', 'Exam practice'] },
  { title: 'Class 11–12', level: 'Senior secondary', duration: 'Academic session', icon: <FiZap />, tone: 'blue', detail: 'Focused senior-secondary learning across science subject pathways.', tags: ['PCM & PCB', 'Academic guidance'] },
  { title: 'PCM', level: 'Physics · Chemistry · Maths', duration: 'Confirm current batch', icon: <FiTarget />, tone: 'violet', detail: 'Strengthen problem-solving in Physics, Chemistry, and Mathematics.', tags: ['Concept clarity', 'Practice-led learning'] },
  { title: 'PCB', level: 'Physics · Chemistry · Biology', duration: 'Confirm current batch', icon: <FiHeart />, tone: 'mint', detail: 'Build a strong base in Biology and the physical sciences.', tags: ['Science foundations', 'Guided revision'] },
  { title: 'JEE pathway', level: 'Engineering preparation', duration: 'Confirm current batch', icon: <FiTarget />, tone: 'blue', detail: 'Develop analytical thinking and problem-solving for engineering entrance goals.', tags: ['PCM foundations', 'Exam-focused practice'] },
  { title: 'NEET pathway', level: 'Medical preparation', duration: 'Confirm current batch', icon: <FiHeart />, tone: 'mint', detail: 'Strengthen science concepts and practice for medical entrance goals.', tags: ['Biology focus', 'Topic practice'] },
  { title: 'Olympiad preparation', level: 'Academic enrichment', duration: 'Ask about availability', icon: <FiAward />, tone: 'amber', detail: 'Extend subject understanding through challenging questions and practice.', tags: ['Reasoning skills', 'Subject enrichment'] },
  { title: 'Scholarship programs', level: 'Navodaya · Natarhat · Eklavya', duration: 'Ask about current batches', icon: <FiZap />, tone: 'violet', detail: 'Prepare for scholarship and residential-school entrance pathways.', tags: ['Focused preparation', 'Practice & revision'] },
];

const STATS = [
  { value: 1000, suffix: '+', label: 'Students supported', icon: <FiUsers /> },
  { value: 95, suffix: '%', label: 'Academic success rate', icon: <FiTrendingUp /> },
  { value: 50, suffix: '+', label: 'Expert educators', icon: <FiAward /> },
  { value: 500, suffix: '+', label: 'Student achievements', icon: <FiCheckCircle /> },
  { value: 10, suffix: '+', label: 'Years of excellence', icon: <FiCalendar /> },
];

const STEPS = [
  { title: 'Enquiry', copy: 'Tell us the student’s class and learning goals.', icon: <FiMessageCircle /> },
  { title: 'Counselling', copy: 'Talk with our team about programs and fit.', icon: <FiUsers /> },
  { title: 'Demo class', copy: 'Experience a class before making a decision.', icon: <FiBookOpen /> },
  { title: 'Admission', copy: 'Get guided through the next steps.', icon: <FiCheckCircle /> },
  { title: 'Learning journey', copy: 'Start learning with ongoing academic support.', icon: <FiTrendingUp /> },
];

const PORTAL_ITEMS = [
  { label: 'Attendance', icon: <FiCalendar />, value: 'Class records' },
  { label: 'Assignments', icon: <FiClipboard />, value: 'Tasks & due dates' },
  { label: 'Fee updates', icon: <FiCreditCard />, value: 'Payment overview' },
  { label: 'Results', icon: <FiTrendingUp />, value: 'Progress & exams' },
  { label: 'Study notes', icon: <FiFileText />, value: 'Learning resources' },
  { label: 'Notices', icon: <FiMessageCircle />, value: 'School updates' },
  { label: 'Online tests', icon: <FiCheckCircle />, value: 'Practice & assessments' },
  { label: 'Parent dashboard', icon: <FiEye />, value: 'Family updates' },
];

const ECOSYSTEM = [
  { title: 'Students', text: 'Learn, practice, and keep track of academic tasks.', icon: <FiBookOpen />, tone: 'blue' },
  { title: 'Parents', text: 'Stay connected to attendance, updates, and progress.', icon: <FiHeart />, tone: 'mint' },
  { title: 'Educators', text: 'Guide learning and share useful academic information.', icon: <FiUsers />, tone: 'violet' },
  { title: 'Administrators', text: 'Coordinate student, class, and institute workflows.', icon: <FiLayers />, tone: 'amber' },
];

const COMPARISON = [
  { feature: 'Performance visibility', traditional: 'Periodic updates', platform: 'Progress information in one place' },
  { feature: 'Parent involvement', traditional: 'Mostly through meetings', platform: 'Connected to relevant learning updates' },
  { feature: 'Structured learning', traditional: 'Classroom-led instruction', platform: 'Classes supported by organized study resources' },
  { feature: 'Academic tracking', traditional: 'Separate records', platform: 'Attendance, assignments, and results together' },
  { feature: 'Exam preparation', traditional: 'Varies by provider', platform: 'School learning with JEE, NEET, and scholarship pathways' },
];

const FAQS = [
  { question: 'Which classes and programs can I ask about?', answer: 'Study Point supports school learning from Classes 1–12, along with science pathways and preparation options. Contact the team to confirm current program and batch availability.' },
  { question: 'Are classes available in Hindi and English?', answer: 'Hindi and English medium learning is available across relevant programs. Contact us to confirm the medium for a specific class and current batch.' },
  { question: 'Are online or hybrid classes available?', answer: 'Offline classes are available. Selected programs may include hybrid learning support; availability depends on the class and program.' },
  { question: 'What can students and parents access through the portal?', answer: 'The platform supports academic information such as attendance, assignments, notices, results, and parent updates. Ask the team which modules are available for your program.' },
  { question: 'How do I book a demo or enquire about admission?', answer: 'Complete the enquiry form on our Contact page, call us, or message us on WhatsApp. The form prepares a WhatsApp message for you to review and send.' },
  { question: 'Which scholarship preparation pathways do you support?', answer: 'Preparation pathways include Navodaya, Natarhat, Eklavya, and NTSE foundation support. Contact us for current program and examination details.' },
];

const RESOURCES = [
  { title: 'Program guide', category: 'ACADEMICS', description: 'Compare learning pathways and ask about current program availability.', icon: <FiBookOpen />, to: '/courses' },
  { title: 'Scholarship preparation', category: 'EXAM GUIDES', description: 'Explore preparation pathways and confirm current examination details.', icon: <FiAward />, to: '/courses#scholarship-preparation' },
  { title: 'Student portal', category: 'LEARNING TOOLS', description: 'Find out about student learning resources and parent updates.', icon: <FiLayers />, to: '/login' },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`home-heading ${light ? 'home-heading-light' : ''}`}>
      <p className="home-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="home-heading-copy">{description}</p>}
    </div>
  );
}

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setCount(value);
      return undefined;
    }

    let frame;
    let observer;
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1100;
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.round(value * (1 - ((1 - progress) ** 3))));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [node, value]);

  return <span ref={setNode} aria-label={`${value}${suffix}`}>{count}{suffix}</span>;
}

function DashboardPreview() {
  return (
    <div className="portal-window" aria-label="Preview of the Study Point student portal">
      <div className="portal-topbar">
        <div className="portal-brand">
          <span className="portal-brand-icon"><FiBookOpen /></span>
          <span><strong>Study Point</strong><small>Student workspace</small></span>
        </div>
        <span className="portal-live"><span /> My learning</span>
      </div>
      <div className="portal-body">
        <aside className="portal-sidebar" aria-label="Portal sections">
          <span className="portal-avatar">SP</span>
          <span className="portal-side-active"><FiLayers /></span>
          <span><FiCalendar /></span>
          <span><FiFileText /></span>
          <span><FiMessageCircle /></span>
        </aside>
        <div className="portal-content">
          <div className="portal-welcome"><div><small>YOUR LEARNING, AT A GLANCE</small><h3>Good things grow with practice.</h3></div><span className="portal-date">This week <FiArrowRight /></span></div>
          <div className="portal-summary">
            <div className="portal-progress"><div className="portal-ring"><strong>82%</strong></div><span>Learning progress</span></div>
            <div className="portal-mini-chart"><div><small>Weekly activity</small><strong>Keep your momentum</strong></div><div className="portal-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div><div className="portal-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div>
          </div>
          <div className="portal-list-heading"><strong>Your study essentials</strong><span>All in one place</span></div>
          <div className="portal-grid">
            {PORTAL_ITEMS.map((item) => (
              <div className="portal-tile" key={item.label}><span>{item.icon}</span><div><strong>{item.label}</strong><small>{item.value}</small></div><FiArrowUpRight /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="portal-footnote"><FiShield /> Illustrative preview · Sample dashboard data</div>
    </div>
  );
}

function Home() {
  const [dark, setDark] = useState(() => window.localStorage.getItem('study-point-theme') === 'dark');
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.home-reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('study-point-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.schema = 'study-point-faq';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        setShowTop(window.scrollY > 600);
        setScrollProgress(scrollableHeight > 0 ? Math.round((window.scrollY / scrollableHeight) * 100) : 0);
      });
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`home-page ${dark ? 'home-dark' : ''}`} data-theme={dark ? 'dark' : 'light'}>
      <div className="home-scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <AnnouncementBar phone={PHONE} phoneDisplay="+91 82948 23430" />
      <Header />
      <button
        type="button"
        className="home-theme-toggle"
        onClick={() => setDark((current) => !current)}
        aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
        title={`Switch to ${dark ? 'light' : 'dark'} mode`}
      >
        {dark ? <FiSun /> : <FiMoon />}
      </button>

      <main>
        <section className="home-hero" id="home">
          <div className="home-hero-orb home-hero-orb-one" />
          <div className="home-hero-orb home-hero-orb-two" />
          <div className="home-container home-hero-layout">
            <div className="home-hero-copy home-reveal">
              <span className="home-kicker"><span className="home-kicker-dot" /> Admissions open · Bindapathar, Jamtara</span>
              <h1>Transforming Learning Into Success <span>Through Technology, Mentorship, and Measurable Results</span></h1>
              <p className="home-hero-description">One platform empowering students, parents, and educators with smarter learning, real-time insights, and academic excellence.</p>
              <ul className="home-feature-chips" aria-label="Study Point features">
                {['JEE preparation', 'NEET preparation', 'Smart student portal', 'Attendance tracking', 'Parent monitoring', 'Online & offline classes'].map((item) => (
                  <li key={item}><FiCheck />{item}</li>
                ))}
              </ul>
              <div className="home-hero-actions">
                <Link className="home-button home-button-primary" to="/contact#admission-enquiry">Book Free Demo <FiArrowRight /></Link>
                <a className="home-button home-button-secondary" href="#programs">Explore Programs <FiArrowUpRight /></a>
              </div>
              <div className="home-hero-note"><span className="home-note-icon"><FiHeart /></span><span><strong>A learning partner for the whole family.</strong><small>School academics, exam preparation, and parent updates.</small></span></div>
            </div>

            <div className="home-hero-visual home-reveal">
              <div className="home-visual-glow" />
              <div className="home-visual-image">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80" alt="Illustrative classroom scene showing students learning together" fetchPriority="high" />
                <div className="home-visual-caption"><span className="home-caption-icon"><FiBookOpen /></span><span><small>LEARN WITH PURPOSE</small><strong>Small steps. Big futures.</strong></span></div>
              </div>
              <div className="home-dashboard-float"><DashboardPreview /></div>
              <div className="home-trust-float"><span><FiShield /></span><span><strong>Families stay connected</strong><small>Learning updates, together</small></span></div>
            </div>
          </div>
          <div className="home-container home-hero-bottom">
            <span>Learning for every stage</span><i /><span>Class 1–12</span><i /><span>JEE & NEET pathways</span><i /><span>Student & parent portal</span>
          </div>
        </section>

        <section className="home-stats" aria-label="Study Point at a glance">
          <div className="home-container home-stats-grid">
            {STATS.map((stat) => (
              <div className="home-stat home-reveal" key={stat.label}>
                <span className="home-stat-icon">{stat.icon}</span>
                <div><strong><Counter value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section home-comparison" id="platform">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="A more connected way to learn" title="More than classes. A learning platform." description="Study Point combines teaching with digital tools that help learners, families, and educators stay connected to the learning journey." /></div>
            <div className="home-comparison-table-wrap home-reveal">
              <table className="home-comparison-table">
                <thead><tr><th scope="col">Learning experience</th><th scope="col">Coaching-only approach</th><th scope="col"><span className="home-table-brand"><FiLayers /> Study Point ecosystem</span></th></tr></thead>
                <tbody>{COMPARISON.map((item) => <tr key={item.feature}><th scope="row">{item.feature}</th><td>{item.traditional}</td><td><FiCheckCircle />{item.platform}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="home-comparison-note home-reveal"><FiShield /> Actual portal modules and program availability vary. Contact our team for current details.</div>
          </div>
        </section>

        <section className="home-about home-section" id="about">
          <div className="home-container home-about-grid">
            <div className="home-about-copy home-reveal">
              <p className="home-eyebrow">Why Study Point exists</p>
              <h2>Every student deserves a place to discover what they can become.</h2>
              <p>Study Point brings structured teaching, personal guidance, and useful learning technology together—so students can make progress and families can stay involved.</p>
              <div className="home-purpose-list">
                <div><span><FiTarget /></span><p><strong>Our mission</strong><small>Make quality learning and thoughtful academic guidance accessible to students at every stage.</small></p></div>
                <div><span><FiTrendingUp /></span><p><strong>Our vision</strong><small>Help learners grow into confident, curious people ready for the opportunities ahead.</small></p></div>
                <div><span><FiHeart /></span><p><strong>Our teaching philosophy</strong><small>Clear concepts, consistent practice, personal encouragement, and parents kept in the loop.</small></p></div>
              </div>
              <Link to="/about" className="home-text-link">Get to know us <FiArrowRight /></Link>
            </div>
            <div className="home-founder-card home-reveal">
              <div className="home-founder-photo"><img src={founderPhoto} alt="Ujjwal Mandal, Founder and Director of Study Point" loading="lazy" /></div>
              <div className="home-founder-copy"><span className="home-eyebrow">A personal commitment to learning</span><h3>Ujjwal Mandal</h3><p>Founder & Director · B.Tech, Computer Science & Engineering</p>              <blockquote>“Education is not only about completing a syllabus. It is about building confidence, discipline, and the ability to solve problems.”</blockquote><Link to="/about">Read our story <FiArrowRight /></Link></div>
            </div>
          </div>
        </section>

        <section className="home-section home-ecosystem" id="ecosystem">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="One ecosystem, shared progress" title="Designed around the people who make learning work." description="Students, families, educators, and administrators each have a role in a stronger learning experience." /></div>
            <div className="home-ecosystem-flow">
              {ECOSYSTEM.map((member, index) => (
                <React.Fragment key={member.title}>
                  <article className={`home-ecosystem-card home-tone-${member.tone} home-reveal`} style={{ '--reveal-delay': `${index * 60}ms` }}>
                    <span className="home-ecosystem-icon">{member.icon}</span><h3>{member.title}</h3><p>{member.text}</p>
                  </article>
                  {index < ECOSYSTEM.length - 1 && <span className="home-ecosystem-link" aria-hidden="true"><FiArrowRight /></span>}
                </React.Fragment>
              ))}
            </div>
            <div className="home-ecosystem-core home-reveal"><span><FiLayers /></span><p><strong>Study Point learning platform</strong><small>Connecting academic support with useful learning tools</small></p></div>
          </div>
        </section>

        <section className="home-section home-programs" id="programs">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="A pathway for every ambition" title="The right support, at every stage." description="From the first school years to competitive exam preparation, find a learning path that grows with you." /></div>
            <div className="home-program-grid">
              {PROGRAMS.map((program, index) => (
                <article className={`home-program-card home-tone-${program.tone} home-reveal`} key={program.title} style={{ '--reveal-delay': `${(index % 3) * 75}ms` }}>
                  <div className="home-program-top"><span className="home-program-icon">{program.icon}</span><span className="home-program-level">{program.level}</span></div>
                  <h3>{program.title}</h3><p>{program.detail}</p>
                  <ul>{program.tags.map((tag) => <li key={tag}><FiCheckCircle />{tag}</li>)}</ul>
                  <div className="home-program-meta"><FiCalendar />{program.duration}</div>
                  <Link to="/contact#admission-enquiry" className="home-program-link">Ask about this program <FiArrowRight /></Link>
                </article>
              ))}
            </div>
            <p className="home-program-note">Class placement, batch availability, and program details are confirmed during counselling.</p>
          </div>
        </section>

        <section className="home-portal home-section" id="student-portal">
          <div className="home-container home-portal-layout">
            <div className="home-portal-copy home-reveal">
              <p className="home-eyebrow">Learning, all in one place</p>
              <h2>More clarity for students. More connection for parents.</h2>
              <p>Keep academic essentials close at hand, from attendance and assignments to results, notes, and school notices.</p>
              <div className="home-portal-points">{PORTAL_ITEMS.map((item) => <span key={item.label}><i>{item.icon}</i>{item.label}</span>)}</div>
              <Link className="home-button home-button-white" to="/login">Explore the student portal <FiArrowRight /></Link>
            </div>
            <div className="home-portal-art home-reveal"><DashboardPreview /><div className="home-portal-badge"><FiShield /><span><strong>One connected view</strong><small>For learners and families</small></span></div></div>
          </div>
        </section>

        <section className="home-section home-achievements" id="achievements">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="Every milestone matters" title="A future built one achievement at a time." description="Student and parent stories deserve to be told accurately. Our team can share current, verified program and result information with you directly." /></div>
            <div className="home-achievement-grid">
              {[
                { title: 'Board results', icon: <FiAward />, text: 'Celebrating the effort behind every result.' },
                { title: 'JEE aspirations', icon: <FiTarget />, text: 'Building strong foundations for engineering pathways.' },
                { title: 'NEET aspirations', icon: <FiHeart />, text: 'Supporting future healthcare learners through science.' },
                { title: 'Scholarship journeys', icon: <FiZap />, text: 'Helping students explore new academic opportunities.' },
              ].map((item, index) => <article className="home-achievement-card home-reveal" key={item.title} style={{ '--reveal-delay': `${index * 60}ms` }}><span>{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p><small>Ask us for the latest verified updates</small></article>)}
            </div>
            <div className="home-reviews home-reveal">
              <div><span className="home-eyebrow">Student & parent voices</span><h3>Real progress deserves real stories.</h3><p>We’re gathering verified feedback from our learning community. Speak with our team to hear more about the Study Point experience.</p></div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="home-button home-button-primary">Talk to our team <FaWhatsapp /></a>
            </div>
          </div>
        </section>

        <section className="home-section home-gallery" id="gallery">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="A love of learning" title="Curiosity belongs in every classroom." description="A few glimpses of the collaborative, encouraging learning environment we strive to create. Images are illustrative." /></div>
            <div className="home-gallery-grid">
              <figure className="home-gallery-item home-gallery-tall home-reveal"><img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=75" loading="lazy" alt="Illustrative classroom scene with a teacher and students" /><figcaption><strong>Classroom learning</strong><span>Ask us about a visit</span></figcaption></figure>
              <figure className="home-gallery-item home-reveal"><img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=75" loading="lazy" alt="Illustrative students learning together" /><figcaption><strong>Learning together</strong><span>Ideas grow through collaboration</span></figcaption></figure>
              <figure className="home-gallery-item home-gallery-tall home-reveal"><img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=75" loading="lazy" alt="Illustrative students sharing a learning moment" /><figcaption><strong>Every question counts</strong><span>Confidence through practice</span></figcaption></figure>
              <figure className="home-gallery-item home-reveal"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75" loading="lazy" alt="Illustrative school learning environment" /><figcaption><strong>Room to grow</strong><span>Support at every stage</span></figcaption></figure>
            </div>
          </div>
        </section>

        <section className="home-section home-admissions" id="admissions">
          <div className="home-container">
            <div className="home-reveal"><SectionHeading eyebrow="Your next step, made simple" title="Five steps into your learning journey." description="A welcoming, guided admissions journey for students and families." /></div>
            <ol className="home-steps">
              {STEPS.map((step, index) => <li className="home-step home-reveal" key={step.title} style={{ '--reveal-delay': `${index * 75}ms` }}><span className="home-step-number">{String(index + 1).padStart(2, '0')}</span><span className="home-step-icon">{step.icon}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="home-section home-resources" id="resources">
          <div className="home-container">
            <div className="home-resource-heading home-reveal"><SectionHeading eyebrow="Study Point resource center" title="Useful guidance for the next step." description="Explore program information, exam pathways, and tools for your learning journey." /><Link to="/courses" className="home-text-link">Explore academics <FiArrowRight /></Link></div>
            <div className="home-resource-grid">
              {RESOURCES.map((resource, index) => <article className="home-resource-card home-reveal" key={resource.title} style={{ '--reveal-delay': `${index * 65}ms` }}><span className="home-resource-icon">{resource.icon}</span><small>{resource.category}</small><h3>{resource.title}</h3><p>{resource.description}</p><Link to={resource.to}>Explore resource <FiArrowUpRight /></Link></article>)}
            </div>
          </div>
        </section>

        <section className="home-section home-faq" id="faq">
          <div className="home-container home-faq-layout">
            <div className="home-faq-intro home-reveal"><p className="home-eyebrow">Answers for families</p><h2>Good questions deserve clear answers.</h2><p>Still deciding? Talk with our team about programs, availability, and the student portal.</p><Link className="home-button home-button-primary" to="/contact#admission-enquiry">Ask about admissions <FiArrowRight /></Link></div>
            <div className="home-faq-list home-reveal">{FAQS.map((item, index) => <details className="home-faq-item" key={item.question} open={index === 0}><summary>{item.question}<FiChevronDown /></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="home-final-cta" id="contact">
          <div className="home-cta-orb" />
          <div className="home-container home-cta-inner home-reveal">
            <span className="home-cta-kicker"><FiZap /> Your next chapter starts here</span>
            <h2>Start the Journey Toward Academic Excellence</h2>
            <p>Talk to our team, explore the right program, or book a free demo class.</p>
            <div className="home-cta-actions">
              <Link className="home-button home-button-cta" to="/contact#admission-enquiry">Apply Now <FiArrowRight /></Link>
              <Link className="home-button home-button-cta-outline" to="/contact#admission-enquiry">Book Free Demo <FiArrowUpRight /></Link>
              <a className="home-button home-button-cta-outline" href={WHATSAPP} target="_blank" rel="noreferrer"><FaWhatsapp /> Join WhatsApp</a>
            </div>
            <a className="home-cta-phone" href={`tel:+91${PHONE}`}>Call us: +91 82948 23430</a>
          </div>
        </section>
      </main>

      <Footer />
      <a className="home-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Message Study Point on WhatsApp"><FaWhatsapp /><span>Chat with us</span></a>
      <button type="button" className={`home-back-top ${showTop ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" aria-hidden={!showTop} tabIndex={showTop ? 0 : -1}><FiChevronUp /></button>
      <Link className="home-sticky-admission" to="/contact#admission-enquiry">Book a free demo <FiArrowRight /></Link>
    </div>
  );
}

export default Home;

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
  FiChevronUp,
  FiClipboard,
  FiCreditCard,
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
  { title: 'Foundation Program', level: 'Classes 1–5', duration: 'Academic session', icon: <FiBookOpen />, tone: 'blue', detail: 'Build confidence in core subjects, curiosity, and strong learning habits.', tags: ['Strong fundamentals', 'Hindi & English'] },
  { title: 'Middle School', level: 'Classes 6–8', duration: 'Academic session', icon: <FiLayers />, tone: 'mint', detail: 'Make challenging subjects feel clearer with guided practice and steady support.', tags: ['Concept building', 'Regular practice'] },
  { title: 'Board Preparation', level: 'Classes 9–10', duration: 'Academic session', icon: <FiAward />, tone: 'amber', detail: 'A structured approach to learning, revision, and exam readiness.', tags: ['Chapter-wise learning', 'Exam practice'] },
  { title: 'Senior Secondary', level: 'Classes 11–12', duration: 'Academic session', icon: <FiZap />, tone: 'violet', detail: 'Focused science learning with subject pathways aligned to your goals.', tags: ['PCM & PCB', 'Hindi & English'] },
  { title: 'JEE Preparation', level: 'Engineering pathway', duration: 'Ask about current batches', icon: <FiTarget />, tone: 'blue', detail: 'Strengthen Physics, Chemistry, and Mathematics through concepts and practice.', tags: ['Problem solving', 'Concept foundation'] },
  { title: 'NEET Preparation', level: 'Medical pathway', duration: 'Ask about current batches', icon: <FiHeart />, tone: 'mint', detail: 'Build a strong base in Biology and physical sciences with guided revision.', tags: ['Biology focus', 'Topic practice'] },
];

const STATS = [
  { value: 1000, suffix: '+', label: 'Students supported', icon: <FiUsers /> },
  { value: 95, suffix: '%', label: 'Success rate', icon: <FiTrendingUp /> },
  { value: 50, suffix: '+', label: 'Expert mentors', icon: <FiAward /> },
  { value: 10, suffix: '+', label: 'Years of experience', icon: <FiCalendar /> },
];

const STEPS = [
  { title: 'Enquiry', copy: 'Tell us the student’s class and learning goals.', icon: <FiMessageCircle /> },
  { title: 'Counselling', copy: 'Talk with our team about programs and fit.', icon: <FiUsers /> },
  { title: 'Demo class', copy: 'Experience a class before making a decision.', icon: <FiBookOpen /> },
  { title: 'Admission', copy: 'Get guided through the next steps.', icon: <FiCheckCircle /> },
];

const PORTAL_ITEMS = [
  { label: 'Attendance', icon: <FiCalendar />, value: 'Class records' },
  { label: 'Assignments', icon: <FiClipboard />, value: 'Tasks & due dates' },
  { label: 'Fee updates', icon: <FiCreditCard />, value: 'Payment overview' },
  { label: 'Results', icon: <FiTrendingUp />, value: 'Progress & exams' },
  { label: 'Study notes', icon: <FiFileText />, value: 'Learning resources' },
  { label: 'Notices', icon: <FiMessageCircle />, value: 'School updates' },
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
      <div className="portal-footnote"><FiShield /> A connected view for students and parents</div>
    </div>
  );
}

function Home() {
  const [dark, setDark] = useState(() => window.localStorage.getItem('study-point-theme') === 'dark');
  const [showTop, setShowTop] = useState(false);

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
    const updateScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className={`home-page ${dark ? 'home-dark' : ''}`} data-theme={dark ? 'dark' : 'light'}>
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
              <h1>Transforming Learning <span>Into Success</span></h1>
              <p className="home-hero-description">One platform for education, coaching, student management, and competitive exam preparation.</p>
              <ul className="home-feature-chips" aria-label="Study Point features">
                {['JEE preparation', 'NEET preparation', 'Smart student portal', 'Attendance tracking', 'Parent monitoring', 'Online & offline classes'].map((item) => (
                  <li key={item}><FiCheck />{item}</li>
                ))}
              </ul>
              <div className="home-hero-actions">
                <Link className="home-button home-button-primary" to="/contact">Book Free Demo <FiArrowRight /></Link>
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
                  <Link to="/contact" className="home-program-link">Ask about this program <FiArrowRight /></Link>
                </article>
              ))}
            </div>
            <p className="home-program-note">Class placement, batch availability, and program details are confirmed during counselling.</p>
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
            <div className="home-reveal"><SectionHeading eyebrow="Your next step, made simple" title="Four steps to get started." description="A welcoming, guided admissions journey for students and families." /></div>
            <ol className="home-steps">
              {STEPS.map((step, index) => <li className="home-step home-reveal" key={step.title} style={{ '--reveal-delay': `${index * 75}ms` }}><span className="home-step-number">{String(index + 1).padStart(2, '0')}</span><span className="home-step-icon">{step.icon}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="home-final-cta" id="contact">
          <div className="home-cta-orb" />
          <div className="home-container home-cta-inner home-reveal">
            <span className="home-cta-kicker"><FiZap /> Your next chapter starts here</span>
            <h2>Start Your Success Journey Today</h2>
            <p>Talk to our team, explore the right program, or book a free demo class.</p>
            <div className="home-cta-actions">
              <Link className="home-button home-button-cta" to="/register">Apply Now <FiArrowRight /></Link>
              <Link className="home-button home-button-cta-outline" to="/contact">Contact Us <FiArrowUpRight /></Link>
              <a className="home-button home-button-cta-outline" href={WHATSAPP} target="_blank" rel="noreferrer"><FaWhatsapp /> Join WhatsApp</a>
            </div>
            <a className="home-cta-phone" href={`tel:+91${PHONE}`}>Call us: +91 82948 23430</a>
          </div>
        </section>
      </main>

      <Footer />
      <a className="home-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Message Study Point on WhatsApp"><FaWhatsapp /><span>Chat with us</span></a>
      <button type="button" className={`home-back-top ${showTop ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" aria-hidden={!showTop} tabIndex={showTop ? 0 : -1}><FiChevronUp /></button>
      <a className="home-sticky-admission" href="#contact">Book a free demo <FiArrowRight /></a>
    </div>
  );
}

export default Home;

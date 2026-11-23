import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCompass,
  FiFileText,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import '../../styles/contact.css';

const CONTACT = {
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  email: 'studypoint.ujjwal@gmail.com',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  mapQuery: 'Bindapathar, Jamtara, Jharkhand 815351',
};

const PROGRAM_OPTIONS = [
  'Foundation Program',
  'Class 1–5',
  'Class 6–8',
  'Class 9–10',
  'Class 11–12 PCM',
  'Class 11–12 PCB',
  'JEE Foundation',
  'NEET Foundation',
  'Navodaya Preparation',
  'Natarhat Preparation',
  'Eklavya Preparation',
  'Other / not sure yet',
];

const INITIAL_FORM = {
  studentName: '',
  phone: '',
  email: '',
  grade: '',
  board: '',
  program: '',
  mode: '',
  message: '',
};

const REQUIRED_FIELDS = ['studentName', 'phone', 'email', 'grade', 'board', 'program', 'mode'];

const CONTACT_CARDS = [
  {
    icon: <FiPhone />,
    title: 'Call admissions',
    description: 'Speak directly with our team about programs and next steps.',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    action: 'Call our team',
    tone: 'blue',
  },
  {
    icon: <FiMail />,
    title: 'Email us',
    description: 'Send a question or share details about the learner’s goals.',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    action: 'Write an email',
    tone: 'violet',
  },
  {
    icon: <FaWhatsapp />,
    title: 'WhatsApp support',
    description: 'Start a conversation about admissions or student support.',
    value: 'Message our team',
    href: `https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent('Hello Study Point, I would like to ask about admissions and academic guidance.')}`,
    action: 'Chat on WhatsApp',
    tone: 'green',
  },
  {
    icon: <FiMapPin />,
    title: 'Visit campus',
    description: 'Find Study Point in Bindapathar, Jamtara.',
    value: 'Jamtara, Jharkhand',
    href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.mapQuery)}`,
    action: 'Get directions',
    tone: 'orange',
  },
];

const GUIDANCE = [
  { icon: <FiMessageCircle />, title: 'Free academic counselling', copy: 'Talk through learning goals and the student’s current stage.' },
  { icon: <FiCompass />, title: 'Course selection support', copy: 'Compare relevant programs before choosing a learning path.' },
  { icon: <FiTarget />, title: 'Career and exam guidance', copy: 'Ask about academic pathways and entrance preparation options.' },
  { icon: <FiFileText />, title: 'Admission assistance', copy: 'Understand the enquiry, counselling, demo, and enrolment steps.' },
  { icon: <FiUsers />, title: 'Parent consultation', copy: 'Discuss questions about learning, communication, and progress.' },
  { icon: <FiTrendingUp />, title: 'A personal learning roadmap', copy: 'Explore practical next steps that fit the student’s goals.' },
];

const JOURNEY = [
  { title: 'Inquiry', copy: 'Tell us the class, goals, and questions on your mind.', icon: <FiMessageCircle /> },
  { title: 'Counselling', copy: 'Talk with our team about suitable learning options.', icon: <FiUsers /> },
  { title: 'Course selection', copy: 'Review the program, medium, and current availability.', icon: <FiBookOpen /> },
  { title: 'Enrollment', copy: 'Get guidance on the next admission steps.', icon: <FiCheck /> },
  { title: 'Begin learning', copy: 'Start the learning journey with academic support.', icon: <FiTrendingUp /> },
];

const LEARNING_OUTCOMES = [
  { icon: <FiBookOpen />, title: 'Stronger foundations', copy: 'Build understanding through clear explanations and steady practice.' },
  { icon: <FiTarget />, title: 'Purposeful preparation', copy: 'Explore school, science, scholarship, and entrance pathways.' },
  { icon: <FiShield />, title: 'More family visibility', copy: 'Ask about academic updates and parent portal access for your program.' },
];

const FAQS = [
  {
    question: 'How do I enroll?',
    answer: 'Send an enquiry using the form, call us, or message us on WhatsApp. Our team can explain program options, availability, and the next admission steps.',
  },
  {
    question: 'Are online classes available?',
    answer: 'Offline classes are available, and selected programs may include hybrid support. Contact us to confirm the current learning modes for your class and program.',
  },
  {
    question: 'Is there a free demo class?',
    answer: 'Ask our admissions team about arranging a demo class for the program you are considering and the current batch schedule.',
  },
  {
    question: 'What are the batch timings?',
    answer: 'Batch schedules depend on the class and program. Contact us to confirm current timings before planning a visit.',
  },
  {
    question: 'How can parents monitor student progress?',
    answer: 'Parents can ask about relevant academic updates and portal access, including availability for the student’s program.',
  },
];

function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`contact-heading contact-heading-${align}`}>
      <p className="contact-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="contact-heading-copy">{description}</p>}
    </div>
  );
}

function FloatingField({ id, label, name, value, onChange, type = 'text', required = true, autoComplete, inputMode, pattern, maxLength, children }) {
  return (
    <div className={`contact-field ${value ? 'has-value' : ''}`}>
      {children
        ? <select id={id} name={name} value={value} onChange={onChange} required={required} aria-label={label}>{children}</select>
        : <input id={id} name={name} value={value} onChange={onChange} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} pattern={pattern} maxLength={maxLength} placeholder=" " />}
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children && <FiChevronDown className="contact-field-chevron" aria-hidden="true" />}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [preparedHref, setPreparedHref] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const phoneIsValid = /^(?:\+?91\s?)?[6-9]\d{4}\s?\d{5}$/.test(formData.phone.trim());
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const completedFields = REQUIRED_FIELDS.filter((field) => {
    if (field === 'phone') return phoneIsValid;
    if (field === 'email') return emailIsValid;
    return Boolean(formData[field].trim());
  }).length;
  const progress = Math.round((completedFields / REQUIRED_FIELDS.length) * 100);

  useEffect(() => {
    const elements = document.querySelectorAll('.contact-reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.schema = 'study-point-contact-faq';
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setPreparedHref('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const message = [
      'Study Point free academic counselling enquiry',
      `Student name: ${formData.studentName.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Class / grade: ${formData.grade}`,
      `Board: ${formData.board}`,
      `Interested course: ${formData.program}`,
      `Preferred learning mode: ${formData.mode}`,
      `Message: ${formData.message.trim() || 'No additional message'}`,
    ].join('\n');

    setPreparedHref(`https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="contact-page min-h-screen bg-white font-sans text-slate-700">
      <AnnouncementBar phone={CONTACT.phone} phoneDisplay={CONTACT.phoneDisplay} />
      <Header />

      <main>
        <section className="contact-hero">
          <div className="contact-hero-glow contact-hero-glow-blue" />
          <div className="contact-hero-glow contact-hero-glow-green" />
          <div className="contact-container contact-hero-layout">
            <div className="contact-hero-copy contact-reveal">
              <span className="contact-open-badge"><i /> Admissions open <span>·</span> New enquiries welcome</span>
              <p className="contact-hero-kicker">ADMISSIONS & STUDENT SUPPORT</p>
              <h1>Let’s Build Your Path to <span>Academic Success</span></h1>
              <p className="contact-hero-description">Get personalized guidance, course information, admission support, and academic counselling from our team.</p>
              <div className="contact-hero-actions">
                <a href="#admission-enquiry" className="contact-button contact-button-primary">Book Free Counseling <FiArrowRight /></a>
                <a href={`https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent('Hello Study Point, I would like to speak with the admissions team.')}`} target="_blank" rel="noreferrer" className="contact-button contact-button-glass"><FaWhatsapp /> Chat on WhatsApp</a>
              </div>
              <div className="contact-hero-assurance"><span><FiShield /></span><p><strong>A clear next step for every family.</strong><small>Ask a question, explore a course, or plan a campus visit.</small></p></div>
            </div>
            <div className="contact-hero-visual contact-reveal">
              <div className="contact-hero-photo">
                <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1100&q=80" alt="Illustrative image of students learning and working together" fetchPriority="high" />
                <span className="contact-photo-note">An illustrative learning scene</span>
              </div>
              <div className="contact-hero-floating contact-floating-guidance"><span><FiBookOpen /></span><p><strong>Thoughtful guidance</strong><small>For learners and families</small></p></div>
              <div className="contact-hero-floating contact-floating-path"><span><FiTrendingUp /></span><p><strong>Find your next step</strong><small>Explore programs with our team</small></p></div>
              <div className="contact-visual-orbit" />
            </div>
          </div>
          <div className="contact-container contact-hero-proof"><span>Personalized counselling</span><i /><span>Programs for Classes 1–12</span><i /><span>Student & parent support</span></div>
        </section>

        <section id="contact-options" className="contact-section contact-quick-section">
          <div className="contact-container">
            <div className="contact-reveal"><SectionHeading eyebrow="Reach the right team" title="Choose the way that works for you." description="Speak with admissions, send a message, or plan a visit to Study Point." /></div>
            <div className="contact-quick-grid">
              {CONTACT_CARDS.map((card, index) => (
                <article className={`contact-quick-card contact-card-${card.tone} contact-reveal`} key={card.title} style={{ '--contact-delay': `${index * 65}ms` }}>
                  <span className="contact-quick-icon">{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <strong>{card.value}</strong>
                  <a href={card.href} target={card.href.startsWith('https:') ? '_blank' : undefined} rel={card.href.startsWith('https:') ? 'noreferrer' : undefined}>{card.action}<FiArrowUpRight /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="guidance" className="contact-section contact-guidance-section">
          <div className="contact-container">
            <div className="contact-reveal"><SectionHeading eyebrow="More than an enquiry" title="Start with the guidance you need." description="Our team can help students and parents make informed decisions about learning and admissions." /></div>
            <div className="contact-guidance-grid">
              {GUIDANCE.map((item, index) => (
                <article className="contact-guidance-card contact-reveal" key={item.title} style={{ '--contact-delay': `${index * 45}ms` }}>
                  <span>{item.icon}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div>
                </article>
              ))}
            </div>
            <div className="contact-guidance-footnote contact-reveal"><FiMessageCircle /> Not sure where to begin? Share what you’re looking for in the form below.</div>
          </div>
        </section>

        <section id="admissions-journey" className="contact-section contact-journey-section">
          <div className="contact-container">
            <div className="contact-reveal"><SectionHeading eyebrow="Admissions, made clear" title="Five steps from your first question to your first class." description="We’ll help you understand the options and current availability at each step." /></div>
            <ol className="contact-journey">
              {JOURNEY.map((step, index) => (
                <li className="contact-journey-step contact-reveal" key={step.title} style={{ '--contact-delay': `${index * 55}ms` }}>
                  <span className="contact-journey-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="contact-journey-icon">{step.icon}</span>
                  <h3>{step.title}</h3><p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="admission-enquiry" className="contact-section contact-enquiry-section">
          <div className="contact-container contact-enquiry-layout">
            <div className="contact-enquiry-intro contact-reveal">
              <p className="contact-eyebrow">Your enquiry, your next step</p>
              <h2>Let’s find the right learning path together.</h2>
              <p>Share a few details so our team can understand what you’re looking for. Your enquiry is prepared as a WhatsApp message for you to review and send.</p>
              <div className="contact-enquiry-trust">
                <div><span><FiShield /></span><p><strong>You stay in control</strong><small>Your details aren’t shared until you choose to send the WhatsApp message.</small></p></div>
                <div><span><FiUsers /></span><p><strong>Student-first guidance</strong><small>Get help discussing class, course options, and next steps.</small></p></div>
              </div>
              <a className="contact-enquiry-direct" href={`tel:${CONTACT.phone}`}><FiPhone /> Prefer to talk? <strong>{CONTACT.phoneDisplay}</strong></a>
            </div>

            <div className="contact-form-shell contact-reveal">
              <div className="contact-form-heading">
                <div><span className="contact-eyebrow">FREE ACADEMIC COUNSELLING</span><h3>Tell us what you’re looking for</h3><p>Required fields are marked with an asterisk.</p></div>
                <span className="contact-form-symbol"><FiMessageCircle /></span>
              </div>
              <div className="contact-form-progress" aria-label={`${completedFields} of ${REQUIRED_FIELDS.length} required fields completed`}>
                <div><span>Enquiry details</span><strong>{completedFields} / {REQUIRED_FIELDS.length}</strong></div>
                <div className="contact-progress-track"><span style={{ width: `${progress}%` }} /></div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="contact-form-grid">
                  <FloatingField id="student-name" label="Student name" name="studentName" value={formData.studentName} onChange={handleChange} autoComplete="name" maxLength={100} />
                  <FloatingField id="student-phone" label="Phone number" name="phone" value={formData.phone} onChange={handleChange} type="tel" autoComplete="tel" inputMode="tel" pattern="(?:\+?91\s?)?[6-9][0-9]{4}\s?[0-9]{5}" maxLength={17} />
                  <FloatingField id="student-email" label="Email address" name="email" value={formData.email} onChange={handleChange} type="email" autoComplete="email" maxLength={100} />
                  <FloatingField id="student-grade" label="Class / grade" name="grade" value={formData.grade} onChange={handleChange}>
                    <option value="" disabled>Select a class</option>
                    {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Other / not sure'].map((grade) => <option key={grade}>{grade}</option>)}
                  </FloatingField>
                  <FloatingField id="student-board" label="Board" name="board" value={formData.board} onChange={handleChange}>
                    <option value="" disabled>Select a board</option>
                    {['CBSE', 'ICSE', 'JAC', 'Other', 'Not sure'].map((board) => <option key={board}>{board}</option>)}
                  </FloatingField>
                  <FloatingField id="student-program" label="Interested course" name="program" value={formData.program} onChange={handleChange}>
                    <option value="" disabled>Select a course</option>
                    {PROGRAM_OPTIONS.map((program) => <option key={program}>{program}</option>)}
                  </FloatingField>
                  <FloatingField id="student-mode" label="Preferred learning mode" name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="" disabled>Select a mode</option>
                    {['Online', 'Offline', 'Hybrid', 'Need guidance'].map((mode) => <option key={mode}>{mode}</option>)}
                  </FloatingField>
                  <div className="contact-field contact-field-message">
                    <textarea id="student-message" name="message" value={formData.message} onChange={handleChange} placeholder=" " rows="3" maxLength={1000} />
                    <label htmlFor="student-message">Message <span>(optional)</span></label>
                    <small>{formData.message.length} / 1000</small>
                  </div>
                </div>

                {preparedHref ? (
                  <div role="status" className="contact-submit-success">
                    <div className="contact-submit-success-heading">
                      <span className="contact-submit-success-icon"><FiCheck /></span>
                      <div>
                        <span className="contact-submit-success-kicker">ENQUIRY PREPARED</span>
                        <h4>Your next step is ready</h4>
                        <p>Review the details below, then continue to WhatsApp to check your message before sending.</p>
                      </div>
                      <span className="contact-submit-status">Not sent yet</span>
                    </div>

                    <dl className="contact-enquiry-summary">
                      <div><dt>Student</dt><dd>{formData.studentName.trim()}</dd></div>
                      <div><dt>Class / grade</dt><dd>{formData.grade}</dd></div>
                      <div><dt>Interested course</dt><dd>{formData.program}</dd></div>
                      <div><dt>Learning mode</dt><dd>{formData.mode}</dd></div>
                    </dl>

                    <div className="contact-submit-actions">
                      <a href={preparedHref} target="_blank" rel="noreferrer" className="contact-button contact-success-button"><FaWhatsapp /> Review and continue to WhatsApp <FiArrowUpRight /></a>
                      <button type="button" className="contact-edit-button" onClick={() => setPreparedHref('')}>Edit enquiry</button>
                    </div>
                    <p className="contact-submit-privacy"><FiShield /> Your details are only shared if you choose to send the WhatsApp message.</p>
                  </div>
                ) : (
                  <div className="contact-form-submit">
                    <button type="submit" className="contact-button contact-button-primary">Request Free Counseling <FiArrowRight /></button>
                    <p><FiShield /> Nothing is sent until you choose to send it in WhatsApp.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section id="learning-outcomes" className="contact-section contact-outcomes-section">
          <div className="contact-container">
            <div className="contact-reveal"><SectionHeading eyebrow="A learning journey with purpose" title="Progress starts with the right support." description="Explore practical learning outcomes and ask us how they connect to the program you’re considering." /></div>
            <div className="contact-outcomes-grid">
              {LEARNING_OUTCOMES.map((outcome, index) => <article className="contact-outcome-card contact-reveal" key={outcome.title} style={{ '--contact-delay': `${index * 65}ms` }}><span>{outcome.icon}</span><h3>{outcome.title}</h3><p>{outcome.copy}</p></article>)}
            </div>
            <div className="contact-stories contact-reveal">
              <div className="contact-stories-mark"><FiHeart /></div>
              <div><span className="contact-eyebrow">STUDENT & PARENT VOICES</span><h3>Real progress deserves real stories.</h3><p>We’re sharing verified student and parent experiences as they become available. Ask our team about current programs and learning support.</p></div>
              <a href={`https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent('Hello Study Point, I would like to learn more about student experiences and academic support.')}`} target="_blank" rel="noreferrer" className="contact-text-link">Ask our team <FiArrowRight /></a>
            </div>
          </div>
        </section>

        <section id="campus-location" className="contact-section contact-location-section">
          <div className="contact-container">
            <div className="contact-reveal"><SectionHeading eyebrow="Plan a visit" title="Find us in Bindapathar." description="Call or message ahead to confirm visit arrangements and current counselling availability." /></div>
            <div className="contact-location-card contact-reveal">
              <div className="contact-map-wrap">
                <iframe
                  title="Map showing Study Point in Bindapathar, Jamtara"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&z=13&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="contact-location-info">
                <span className="contact-location-icon"><FiMapPin /></span>
                <p className="contact-eyebrow">STUDY POINT · JHARKHAND</p>
                <h3>Visit campus</h3>
                <p className="contact-address">{CONTACT.address}</p>
                <div className="contact-location-meta"><FiClock /><span><strong>Planning your visit?</strong><small>Please call ahead to confirm current office hours and availability.</small></span></div>
                <div className="contact-location-meta"><FiCompass /><span><strong>Local directions</strong><small>Use the map for navigation to Bindapathar, Jamtara.</small></span></div>
                <div className="contact-location-actions">
                  <a className="contact-button contact-button-primary" href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.mapQuery)}`} target="_blank" rel="noreferrer">Get directions <FiArrowUpRight /></a>
                  <a className="contact-button contact-button-quiet" href={`tel:${CONTACT.phone}`}>Call ahead <FiPhone /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-faq" className="contact-section contact-faq-section">
          <div className="contact-container contact-faq-layout">
            <div className="contact-faq-intro contact-reveal">
              <p className="contact-eyebrow">Helpful answers</p>
              <h2>Questions families often ask.</h2>
              <p>Need details about a specific class or batch? Our team can help you confirm what’s currently available.</p>
              <Link className="contact-text-link" to="/courses">Explore programs <FiArrowRight /></Link>
            </div>
            <div className="contact-faq-list contact-reveal">
              {FAQS.map((faq, index) => (
                <article className="contact-faq-item" key={faq.question}>
                  <h3><button type="button" id={`contact-faq-question-${index}`} aria-expanded={openFaq === index} aria-controls={`contact-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{faq.question}<FiChevronDown /></button></h3>
                  {openFaq === index && <div id={`contact-faq-answer-${index}`} role="region" aria-labelledby={`contact-faq-question-${index}`}>{faq.answer}</div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-final-cta">
          <div className="contact-container contact-final-inner contact-reveal">
            <span className="contact-open-badge contact-open-badge-dark"><i /> A thoughtful next step starts here</span>
            <h2>Your Success Story Starts Here</h2>
            <p>Ask about programs, get academic guidance, and find the next step that feels right for your family.</p>
            <div className="contact-final-actions">
              <a href="#admission-enquiry" className="contact-button contact-button-light">Book Free Counseling <FiArrowRight /></a>
              <a href={`tel:${CONTACT.phone}`} className="contact-button contact-button-outline">Contact Admissions Team <FiPhone /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <a className="contact-floating-whatsapp" href={`https://wa.me/91${CONTACT.phone}`} target="_blank" rel="noreferrer" aria-label="Chat with Study Point admissions on WhatsApp"><FaWhatsapp /><span>Admissions help</span></a>
    </div>
  );
}

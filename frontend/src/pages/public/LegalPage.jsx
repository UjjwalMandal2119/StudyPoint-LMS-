import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const PHONE = '8294823430';

const LEGAL_CONTENT = {
  '/privacy': {
    title: 'Privacy notice',
    intro: 'This notice explains the information handled when you use the Study Point public website and its enquiry form.',
    sections: [
      {
        heading: 'Enquiry form',
        body: 'The admission enquiry form prepares a message for you to review in WhatsApp. Details are not sent to Study Point by the form itself; they are shared only if you choose to open WhatsApp and send the message. WhatsApp may process information under its own terms and privacy policy.',
      },
      {
        heading: 'Theme preference',
        body: 'If you change the homepage appearance, your light or dark theme preference is stored in your browser local storage so it can be remembered on your next visit.',
      },
      {
        heading: 'Third-party services',
        body: 'The website may load Google Fonts and an embedded Google Map. Those services may receive technical information from your browser when they load. Refer to the providers’ privacy notices for details.',
      },
      {
        heading: 'Student portal',
        body: 'Signing in to the student portal is separate from browsing this public website. Do not share passwords or sensitive student information through public channels.',
      },
      {
        heading: 'Questions',
        body: 'For questions about this notice, contact Study Point at studypoint.ujjwal@gmail.com or +91 82948 23430.',
      },
    ],
  },
  '/terms': {
    title: 'Website terms',
    intro: 'These terms cover use of the Study Point public website. Program details and availability should always be confirmed with our team.',
    sections: [
      {
        heading: 'Website information',
        body: 'Program descriptions and learning resources are provided for general information. Batch availability, eligibility, duration, fees, and learning modes may vary. Contact Study Point for current details before making a decision.',
      },
      {
        heading: 'Portal access',
        body: 'Portal accounts are intended for their assigned users. Keep account credentials private and contact Study Point if you need help with access.',
      },
      {
        heading: 'Enquiries',
        body: 'Submitting the public enquiry form prepares a WhatsApp message for your review; it does not submit an application or guarantee admission. The message is sent only if you choose to send it in WhatsApp.',
      },
      {
        heading: 'Third-party links',
        body: 'Links to services such as WhatsApp and Google Maps are provided for convenience. Their services are governed by their own terms.',
      },
      {
        heading: 'Contact',
        body: 'For questions about these terms, contact Study Point at studypoint.ujjwal@gmail.com or +91 82948 23430.',
      },
    ],
  },
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const content = LEGAL_CONTENT[pathname] || LEGAL_CONTENT['/privacy'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      <AnnouncementBar phone={PHONE} phoneDisplay="+91 82948 23430" />
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="font-semibold text-slate-800">{content.title}</span>
        </nav>
        <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Study Point</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{content.title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">{content.intro}</p>
          <div className="mt-9 space-y-7">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold text-slate-900">{section.heading}</h2>
                <p className="mt-2 leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-9 border-t border-slate-100 pt-5 text-xs text-slate-500">
            These website notices are a plain-language summary and should be reviewed for your organization’s legal requirements.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}

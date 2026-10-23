import { Suspense, useEffect, useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './routes';

const PAGE_METADATA = {
  '/': {
    title: 'Study Point | Transforming Learning Into Success',
    description: 'Study Point brings school education, JEE and NEET preparation, student support, and parent updates together in Bindapathar, Jamtara.',
  },
  '/home': {
    title: 'Study Point | Transforming Learning Into Success',
    description: 'Study Point brings school education, JEE and NEET preparation, student support, and parent updates together in Bindapathar, Jamtara.',
  },
  '/about': {
    title: 'About Study Point | Learning With Purpose',
    description: 'Meet the Study Point team and discover our approach to school learning, academic guidance, and parent connection.',
  },
  '/courses': {
    title: 'Programs & Academics | Study Point',
    description: 'Explore Study Point programs for Classes 1–12, science pathways, JEE and NEET foundations, and scholarship preparation.',
  },
  '/contact': {
    title: 'Contact & Admissions | Study Point',
    description: 'Ask about Study Point programs, admissions, and demo classes in Bindapathar, Jamtara. Contact our team by phone or WhatsApp.',
  },
};

function App() {
  const location = useLocation();
  const element = useRoutes(routes);

  useLayoutEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const metadata = PAGE_METADATA[location.pathname] || PAGE_METADATA['/'];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [location.pathname]);

  return (
    <Suspense fallback={(
      <div className="min-h-screen bg-slate-50 px-6 py-8" role="status" aria-label="Loading page" aria-busy="true">
        <span className="sr-only">Loading Study Point…</span>
        <div className="mx-auto max-w-7xl animate-pulse space-y-8 motion-reduce:animate-none">
          <div className="flex items-center justify-between">
            <div className="h-10 w-40 rounded-xl bg-slate-200" />
            <div className="h-9 w-28 rounded-lg bg-slate-200" />
          </div>
          <div className="space-y-4 pt-12">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-10 max-w-lg rounded-lg bg-slate-200" />
            <div className="h-4 max-w-xl rounded bg-slate-200" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-44 rounded-2xl border border-slate-200 bg-white" />)}
          </div>
        </div>
      </div>
    )}>
      {element}
    </Suspense>
  );
}

export default App;

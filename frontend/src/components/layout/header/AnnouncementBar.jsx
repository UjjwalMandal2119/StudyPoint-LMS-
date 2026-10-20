import React from 'react';
import { FiPhone } from 'react-icons/fi';

function AnnouncementBar({ phone, phoneDisplay }) {
  return (
    <div className="bg-navy-dark text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2 text-xs sm:justify-between sm:px-8">
        <p className="flex items-center gap-2">
          🎓 Admissions Open for New Batches — Bindapathar, Jamtara, Jharkhand
        </p>
        <a href={`tel:${phone}`} className="hidden items-center gap-2 font-medium sm:flex">
          <FiPhone className="h-3.5 w-3.5 text-accent-amber" />
          {phoneDisplay}
        </a>
      </div>
    </div>
  );
}

export default AnnouncementBar;

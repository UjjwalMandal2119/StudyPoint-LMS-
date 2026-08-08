import React from 'react';

const styles = {
  SUPER_ADMIN: 'bg-purple-100 text-purple-800',
  ADMIN: 'bg-blue-100 text-blue-800',
  TEACHER: 'bg-emerald-100 text-emerald-800',
  STUDENT: 'bg-amber-100 text-amber-800',
  PARENT: 'bg-pink-100 text-pink-800',
  RECEPTIONIST: 'bg-gray-100 text-gray-800',
  ACCOUNTANT: 'bg-teal-100 text-teal-800',
  LIBRARIAN: 'bg-orange-100 text-orange-800',
};

export default function RoleBadge({ role }) {
  const cls = styles[role] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {role}
    </span>
  );
}

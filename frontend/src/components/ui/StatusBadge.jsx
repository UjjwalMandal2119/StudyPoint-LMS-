import React from 'react';

/**
 * Difficulty / status badge powered by the design-system tokens.
 *  level: 'easy' | 'mid' | 'hard' | 'info' | 'success' | 'warn' | 'danger'
 *  label?: string — optional text override (defaults to the level, capitalized)
 */
const MAP = {
  easy: { cls: 'bg-status-easy-bg text-status-easy-text', label: 'Easy' },
  mid: { cls: 'bg-status-mid-bg text-status-mid-text', label: 'Mid' },
  hard: { cls: 'bg-status-hard-bg text-status-hard-text', label: 'Hard' },
  success: { cls: 'bg-status-easy-bg text-status-easy-text', label: 'Success' },
  warn: { cls: 'bg-status-mid-bg text-status-mid-text', label: 'Warning' },
  danger: { cls: 'bg-status-hard-bg text-status-hard-text', label: 'Danger' },
  info: { cls: 'bg-info-banner-bg text-info-banner-text', label: 'Info' },
};

export default function StatusBadge({ level = 'info', label, dotted = false }) {
  const config = MAP[level] || MAP.info;
  return (
    <span className={`badge ${config.cls}`}>
      {dotted && <span className="mr-1.5 h-2 w-2 rounded-full bg-current opacity-70" />}
      {label ?? config.label}
    </span>
  );
}
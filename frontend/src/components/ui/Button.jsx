import React from 'react';

/**
 * LMS Button — thin wrapper over the reusable `.btn` component classes.
 *  variant: 'primary' | 'outline' | 'ghost' | 'danger'
 *  Forwarded props (type, onClick, disabled, ...) pass through to <button>.
 */
const VARIANTS = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export default function Button({ variant = 'primary', className = '', children, ...rest }) {
  return (
    <button className={`btn ${VARIANTS[variant] || VARIANTS.primary} ${className}`} {...rest}>
      {children}
    </button>
  );
}
/**
 * Pure helpers for the Course feature.
 * No React and no network calls, so these can be unit tested and reused by
 * the public catalogue, bulk import and reporting screens.
 */

export const CODE_PATTERN = /^[A-Z0-9-]{2,20}$/;

export const CODE_MAX_LENGTH = 20;

export const DESCRIPTION_MAX_LENGTH = 2000;
export const IMAGE_URL_MAX_LENGTH = 500;
export const SYLLABUS_MAX_LENGTH = 5000;

export const EMPTY_FORM = Object.freeze({
  name: '',
  code: '',
  description: '',
  durationMonths: '',
  fee: '',
  discountFee: '',
  maxStudents: '',
  imageUrl: '',
  syllabus: '',
});

export const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active only' },
  { value: 'inactive', label: 'Inactive only' },
];

export const PUBLISHED_FILTERS = [
  { value: 'all', label: 'Published & draft' },
  { value: 'published', label: 'Published only' },
  { value: 'draft', label: 'Unpublished only' },
];

/**
 * The single slug implementation. Auto-generated codes always fall back to
 * this, so a saved course can never disagree with the preview shown in the form.
 */
export function generateCode(name) {
  return String(name || '')
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, CODE_MAX_LENGTH);
}

export function toFormValues(course) {
  if (!course) return { ...EMPTY_FORM };
  return {
    name: course.name ?? '',
    code: course.code ?? '',
    description: course.description ?? '',
    durationMonths: course.durationMonths ?? '',
    fee: course.fee ?? '',
    discountFee: course.discountFee ?? '',
    maxStudents: course.maxStudents ?? '',
    imageUrl: course.imageUrl ?? '',
    syllabus: course.syllabus ?? '',
  };
}

const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toText = (value) => {
  const text = value === null || value === undefined ? '' : String(value).trim();
  return text === '' ? null : text;
};

/**
 * Single source of truth for the create and update wire payload, so the two
 * paths can never drift apart when a field is added or renamed.
 */
export function buildCoursePayload(values) {
  return {
    name: toText(values.name),
    code: toText(values.code) || generateCode(values.name),
    description: toText(values.description),
    durationMonths: toNumber(values.durationMonths),
    fee: toNumber(values.fee),
    discountFee: toNumber(values.discountFee),
    maxStudents: toNumber(values.maxStudents),
    imageUrl: toText(values.imageUrl),
    syllabus: toText(values.syllabus),
  };
}

/**
 * Mirrors the Bean Validation constraints on CourseRequest so the user gets
 * immediate feedback instead of a round-trip rejection.
 */
export function validateForm(values) {
  const errors = {};
  const name = (values.name || '').trim();
  const code = (values.code || '').trim() || generateCode(name);
  const description = (values.description || '').trim();
  const imageUrl = (values.imageUrl || '').trim();
  const syllabus = (values.syllabus || '').trim();
  const durationMonths = Number(values.durationMonths);
  const fee = Number(values.fee);
  const maxStudents = Number(values.maxStudents);
  const hasDiscount = values.discountFee !== '' && values.discountFee !== null && values.discountFee !== undefined;
  const discountFee = Number(values.discountFee);

  if (name.length < 2 || name.length > 100) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }
  if (!code) {
    errors.code = 'Code is required.';
  } else if (!CODE_PATTERN.test(code)) {
    errors.code = 'Use 2-20 characters: A-Z, 0-9 or hyphen.';
  }
  if (!Number.isFinite(durationMonths) || durationMonths <= 0) {
    errors.durationMonths = 'Duration is required and must be greater than 0.';
  }
  if (!Number.isFinite(fee) || fee <= 0) {
    errors.fee = 'Fee is required and must be greater than 0.';
  }
  if (!Number.isFinite(maxStudents) || maxStudents <= 0) {
    errors.maxStudents = 'Max students is required and must be greater than 0.';
  }
  if (hasDiscount && (!Number.isFinite(discountFee) || discountFee < 0)) {
    errors.discountFee = 'Discount fee must be 0 or greater.';
  }
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters.`;
  }
  if (imageUrl.length > IMAGE_URL_MAX_LENGTH) {
    errors.imageUrl = `Image URL must not exceed ${IMAGE_URL_MAX_LENGTH} characters.`;
  }
  if (syllabus.length > SYLLABUS_MAX_LENGTH) {
    errors.syllabus = `Syllabus must not exceed ${SYLLABUS_MAX_LENGTH} characters.`;
  }

  return errors;
}

/**
 * Applies the toolbar filters to the rows already fetched for the current page.
 * Text search stays on the server via /courses/search; these are the two
 * dimensions the list endpoint does not currently support.
 */
export function applyRowFilters(rows, { status = 'all', published = 'all' } = {}) {
  return rows.filter((row) => {
    if (status === 'active' && !row.active) return false;
    if (status === 'inactive' && row.active) return false;
    if (published === 'published' && !row.published) return false;
    if (published === 'draft' && row.published) return false;
    return true;
  });
}

export function formatAmount(amount) {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed)) return '—';
  return parsed.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function formatDateTime(value) {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

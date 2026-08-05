// Shared display labels and form options for membership fields. Keeps the
// enum-like DB values (profiles.profession/tier/membership_status) in one place
// so the account page, admin, and signup all render them consistently.

export const PROFESSION_OPTIONS = [
  { value: "md_do", label: "Physician (MD/DO)" },
  { value: "nurse", label: "Nurse" },
  { value: "medical_trainee", label: "Medical trainee" },
  { value: "dietician", label: "Dietician" },
  { value: "social_worker", label: "Social worker" },
  { value: "student", label: "Student" },
] as const;

export type Profession = (typeof PROFESSION_OPTIONS)[number]["value"];

export const PROFESSION_VALUES = PROFESSION_OPTIONS.map((o) => o.value) as [
  Profession,
  ...Profession[],
];

export const PROFESSION_LABELS: Record<string, string> = Object.fromEntries(
  PROFESSION_OPTIONS.map((o) => [o.value, o.label]),
);

export const TIER_LABELS: Record<string, string> = {
  trainee: "Trainee",
  full: "Full",
};

// Self-selected at signup. Price labels are display-only; the real charge comes
// from the Stripe price wired to each tier (STRIPE_PRICE_TRAINEE / _FULL).
// [PROD] Confirm these labels match the live Stripe prices before launch.
export const TIER_OPTIONS = [
  {
    value: "trainee",
    label: "Trainee",
    priceLabel: "$25 / year",
    blurb: "Fellows & residents in training",
  },
  {
    value: "full",
    label: "Full",
    priceLabel: "$75 / year",
    blurb: "Practicing physicians & clinicians",
  },
] as const;

export type Tier = (typeof TIER_OPTIONS)[number]["value"];

export const TIER_VALUES = TIER_OPTIONS.map((o) => o.value) as [
  Tier,
  ...Tier[],
];

export const STATUS_LABELS: Record<string, string> = {
  pending_payment: "Pending payment",
  active: "Active",
  expired: "Expired",
  cancelled: "Cancelled",
};

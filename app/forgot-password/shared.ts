// Shared, non-action constant for the password-reset flow. Kept out of the
// "use server" action files, which may only export async functions.

// Holds the email between /forgot-password (request code) and
// /forgot-password/verify (enter code). httpOnly so the browser can't read it;
// the verify action needs it to call verifyOtp with type "recovery".
export const RESET_EMAIL_COOKIE = "tsn_reset_email";

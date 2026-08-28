// Shared, non-action constants for the signup flow. Kept out of the
// "use server" action files, which may only export async functions.

// Holds the pending applicant's email between Step 1 (/join) and
// Step 3 (/membership/verify). httpOnly so the browser can't read it; the
// verify action needs it to call verifyOtp.
export const SIGNUP_EMAIL_COOKIE = "tsn_signup_email";

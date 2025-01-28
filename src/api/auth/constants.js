export const baseUrl = "https://v2.api.noroff.dev";
export const listingUrl = `${baseUrl}/auction/listings`;
export const apiKey = "6ec6b26b-2699-4267-a499-2ad741f04936"; // Use your actual API key

// LISTINGS
// GET all listings (homepage): /auction/listings
// GET single listing: /auction/listings/<id>

// GET Search listings /auction/listings/search?q=<query>

// POST Create listing: /auction/listings

// POST bid on listing /auction/listings/<id>/bids

// PUT Update listing /auction/listings/<id>

// PROFILE
// GET profile details: /auction/profiles/<name>
// GET all wins by profile (profilsiden): /auction/profiles/<name>/wins
// GET all bids by profile: /auction/profiles/<name>/bids

// POST (legg til relevant info her)

// PUT
// PUT update profile (oppdaterer banner og avatar): /auction/profiles/<name>

// USER LOGIN

// POST Login a user /auth/login
// Register a new user profile /auth/register

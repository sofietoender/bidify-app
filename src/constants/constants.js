// Base URL for API
export const baseUrl = "https://v2.api.noroff.dev";

// API Key
export const apiKey = import.meta.env.VITE_API_KEY;

// Listings endpoints
export const listingsUrl = `${baseUrl}/auction/listings`;

// Profile endpoints
export const profileUrl = `${baseUrl}/auction/profiles`;

// Authentication endpoints
export const loginUrl = `${baseUrl}/auth/login`;
export const registerUrl = `${baseUrl}/auth/register`;

// Search endpoint
export const searchListingsUrl = `${baseUrl}/auction/listings/search`;

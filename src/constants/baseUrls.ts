/**
 * In production on Vercel, proxy API calls through the frontend origin to avoid
 * cross-site cookie restrictions (notably in Chrome Incognito).
 */
// export const API_BASE_URL = import.meta.env.PROD
//   ? '/api'
//   : import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

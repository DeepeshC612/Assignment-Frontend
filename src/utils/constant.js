export const BASEURL = "http://localhost:8000/api/v1";
export const IMG_BASEURL = "http://localhost:8000/public";

export const AUTH_BASE = "/user";
export const COMPANY_BASE = "/company";
export const REVIEW_BASE = "/review";

// ENDPOINTS FOR AUTH MODULE
export const AUTH_ENDPOINT = {
  LOGIN: `${AUTH_BASE}/login`,
  SINGUP: `${AUTH_BASE}/signup`,
};

//ENDPOINTS FOR COMPANY MODULE
export const COMPANY_ENDPOINT = {
  CREATE: `${COMPANY_BASE}/create`,
  LIST: `${COMPANY_BASE}/list`,
  DETAILS: `${COMPANY_BASE}/details`,
}

//ENDPOINTS FOR REVIEW MODULE
export const REVIEW_ENDPOINT = {
  CREATE: `${REVIEW_BASE}/create`,
  LIST: `${REVIEW_BASE}/list`,
  LIKE: `${REVIEW_BASE}/like`,
}

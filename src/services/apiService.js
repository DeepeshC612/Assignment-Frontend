import { axiosClient } from "../utils/axiosClient";
import {
  AUTH_ENDPOINT,
  COMPANY_ENDPOINT,
  REVIEW_ENDPOINT,
} from "../utils/constant";

export const userlogin = (payload) => {
  return axiosClient(AUTH_ENDPOINT.LOGIN, payload, "POST");
};

export const userSignup = (payload) => {
  return axiosClient(AUTH_ENDPOINT.SINGUP, payload, "POST");
};

export const createCompany = (payload) => {
  return axiosClient(COMPANY_ENDPOINT.CREATE, payload, "POST");
};

export const fetchCompany = (sort, search) => {
  return axiosClient(`${COMPANY_ENDPOINT.LIST}?sorting=${sort}&search=${search}`, {}, "GET");
};

export const fetchCompanyDetails = (id, sort) => {
  return axiosClient(`${COMPANY_ENDPOINT.DETAILS}/${id}?sorting=${sort}`, {}, "GET");
};
export const likeCompanyReview = (id, payload) => {
  return axiosClient(`${REVIEW_ENDPOINT.LIKE}/${id}`, payload, "PATCH");
};
export const createReview = (payload, id) => {
  return axiosClient(`${REVIEW_ENDPOINT.CREATE}/${id}`, payload, "POST");
};

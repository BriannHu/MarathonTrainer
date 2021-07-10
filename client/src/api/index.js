import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchRuns = () => API.get(`/runs`);
export const createRun = (newRun) => API.post(`/runs/add`, newRun);
export const updateRun = (id, run) => API.post(`/runs/edit/${id}`, run);
export const deleteRun = (id) => API.delete(`/runs/${id}`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);

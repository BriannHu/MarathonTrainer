import axios from "axios";

const url = "http://localhost:5000/runs";

export const fetchRuns = () => axios.get(url);

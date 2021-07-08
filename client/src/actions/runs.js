import * as api from "../api";

// Action Creators
// Since time will be needed to get the payload,
// async will be needed to ensure all data is retrieved.
export const getRuns = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRuns();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

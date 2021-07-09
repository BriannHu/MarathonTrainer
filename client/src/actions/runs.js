import * as api from "../api";

// Action Creators
// Since it will take time to get the payload, async will be needed to ensure all data is retrieved.
export const getRuns = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRuns();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createRun = (run) => async (dispatch) => {
  try {
    const { data } = await api.createRun(run);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateRun = (id, run) => async (dispatch) => {
  try {
    const { data } = await api.updateRun(id, run);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

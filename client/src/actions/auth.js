import { AUTH } from "../constants/ActionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log("data: " + data);
    dispatch({ type: AUTH, data });

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

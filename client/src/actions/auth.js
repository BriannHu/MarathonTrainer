import { AUTH } from "../constants/ActionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

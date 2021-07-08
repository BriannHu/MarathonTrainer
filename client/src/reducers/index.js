import { combineReducers } from "redux";

import auth from "./auth";
import runs from "./runs";

export const reducers = combineReducers({ runs, auth });

import { SET_APP_DATA } from "../utilities/dataStorage";
import { Alert } from "react-native";
import { setListsData } from "./lists";
import { changeUsernameAndAvatar } from "./settings";

export const MODULE_NAME = "auth";
export const selectAuthData = (state) => state[MODULE_NAME];

const SET_AUTH_DATA = "SET_AUTH_DATA";
export const setAuthData = (payload) => ({
  type: SET_AUTH_DATA,
  payload,
});

export const initialAuthState = {
  token: null,
  refreshToken: null,
  tokenExpires: 0,
  userID: null,
};

export function authReducer(state = initialAuthState, { type, payload }) {
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        ...payload.auth,
      };

    case SET_AUTH_DATA:
      return {
        ...state,
        token: payload.token,
        refreshToken: payload.refreshToken,
        tokenExpires: payload.tokenExpires,
        userID: payload.userID,
      };
    default:
      return state;
  }
}

const API_KEY = "AIzaSyBxsJAJK05HY8yQEicfNxxuWq_4h13kp9I";
const SIGN_IN = "signInWithPassword";
const SIGN_UP = "signUp";

export const signInOrSignUp = (email, password, isSignIn) => async (
  dispatch
) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${
        isSignIn ? SIGN_IN : SIGN_UP
      }?key=${API_KEY}
            `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          returnSecureToken: true,
          email,
          password,
        }),
      }
    );
    const result = await response.json();

    if (!result.error) {
      dispatch(
        setAuthData({
          token: result.idToken,
          refreshToken: result.refreshToken,
          tokenExpires: Date.now() + result.expiresIn * 1000 - 15000,
          userID: result.localId,
        })
      );
    }
  } catch (error) {
    console.log("set Auth data err", error);
  }
};

export const saveData = () => async (dispatch, getState) => {
  try {
    const {
      lists,
      settings,
      auth: { userID, token },
    } = getState();

    const response = await fetch(
      `https://my-project-aysel.firebaseio.com/lists/${userID}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lists),
      }
    );

    const responseUserData = await fetch(
      `https://my-project-aysel.firebaseio.com/settings/${userID}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      }
    );

    const result = await response.json();
    const resultUserData = await responseUserData.json();

    if (!result.error) {
      Alert.alert("Success");
    } else {
      Alert.alert("Fail");
    }
  } catch (error) {
    console.log("saveData err", error);
  }
};

export const loadData = () => async (dispatch, getState) => {
  try {
    const {
      auth: { userID, token },
    } = getState();
    const response = await fetch(
      `https://my-project-aysel.firebaseio.com/lists/${userID}.json?auth=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseUserData = await fetch(
      `https://my-project-aysel.firebaseio.com/settings/${userID}.json?auth=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const resultUserData = await responseUserData.json();

    if (!result.error) {
      dispatch(setListsData(result));
      dispatch(changeUsernameAndAvatar(resultUserData.userInfo));
    } else {
      Alert.alert("Fail");
    }
  } catch (error) {
    console.log("loadData error", error);
  }
};

export const logOut = () => async (dispatch) => {
    try {
      dispatch(setAuthData(initialAuthState));
    } catch (error) {
      console.log("logout errr", error);
    }
  };

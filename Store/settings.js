export const CHANGE_USERNAME_AND_AVATAR = "CHANGE_USERNAME_AND_AVATAR";

export const MODULE_NAME = "settings";
export const selectUserInfo = (state) => state[MODULE_NAME];

export const changeUsernameAndAvatar = (payload) => ({
  type: CHANGE_USERNAME_AND_AVATAR,
  payload,
});

const initialState = {
  userInfo: {
    username: "John Smith",
    userAvatar: "",
  },
};

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_USERNAME_AND_AVATAR: {
      return {
        ...state,
        userInfo: {
          username: payload.username,
          userAvatar: payload.userAvatar,
        },
      };
    }
    default:
      return state;
  }
}

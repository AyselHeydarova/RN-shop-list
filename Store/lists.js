// Actions
export const CREATE_ONE_TIME_LIST = "CREATE_ONE_TIME_LIST";
export const CREATE_REGULAR_LIST = "CREATE_REGULAR_LIST";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_URL = "CHANGE_URL";

// Action Creators

export const createOneTimeList = (payload) => ({
  type: CREATE_ONE_TIME_LIST,
  payload,
});

export const createRegularList = (payload) => ({
  type: CREATE_REGULAR_LIST,
  payload,
});

export const changeUsername = (payload) => ({
  type: CHANGE_USERNAME,
  payload,
});

export const changeUrl = (payload) => ({
  type: CHANGE_URL,
  payload,
});

export const increment = (payload) => ({
  type: INCREMENT,
  payload,
});

export const decrement = (payload) => ({
  type: DECREMENT,
  payload,
});

// Reducers

const initialState = {
  OneTimeLists: [
    {
      id: `${Math.random()}${Date.now()}`,
      name: "Default One Time List",
      listItems: [
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
        },
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
        },
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
        },
      ],
    },
  ],

  RegularLists: [
    {
      id: `${Math.random()}${Date.now()}`,
      name: "Default Regular List",
      listItems: [
        {
          id: `${Math.random()}${Date.now()}`,
          name: "Regular List Item example",
          count: 2,
          unit: "kg",
        },
      ],
    },
  ],
};

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ONE_TIME_LIST: {
      return {
        ...state,
        OneTimeLists: [
          ...state.OneTimeLists,
          {
            id: `${Math.random()}${Date.now()}`,
            name: action.payload,
            listItems: [],
          },
        ],
        RegularLists: [...state.RegularLists],
      };
    }
    case CREATE_REGULAR_LIST: {
      return {
        ...state,
        OneTimeLists: [...state.OneTimeLists],
        RegularLists: [
          ...state.RegularLists,
          {
            id: `${Math.random()}${Date.now()}`,
            name: action.payload,
            listItems: [],
          },
        ],
      };
    }
    default:
      return state;
  }
}

export function countReducer(state, action) {
  switch (action.type) {
    case INCREMENT: {
      if (state.OneTimeLists.listItems.id === action.payload.id) {
        return {
          ...state,
          OneTimeLists: [
            ...state.OneTimeLists,
            { listItems: [...state.OneTimeLists.listItems] },
          ],
        };
      }
    }
    default:
      return state;
  }
}

const firstState = {
  username: "John Smith",
  url: "",
};

export function userReducer(state = firstState, action) {
  switch (action.type) {
    case CHANGE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    case CHANGE_URL: {
      return {
        ...state,
        url: action.payload,
      };
    }
    default:
      return state;
  }
}
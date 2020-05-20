// Actions
export const CREATE_LIST = "CREATE_LIST";

export const CHANGE_USERNAME_AND_URL = "CHANGE_USERNAME_AND_URL";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";
export const DELETE_LIST = "DELETE_LIST";
export const UPDATE_LIST_ITEM = "UPDATE_LIST_ITEM";
export const TOGGLE_ITEM_BOUGHT = "TOGGLE_ITEM_BOUGHT";
export const RESET_BOUGHT = "RESET_BOUGHT";

// Action Creators

export const createList = (payload) => ({
  type: CREATE_LIST,
  payload,
});

export const changeUsernameAndUrl = (payload) => ({
  type: CHANGE_USERNAME_AND_URL,
  payload,
});

export const changeUrl = (payload) => ({
  type: CHANGE_URL,
  payload,
});

export const addListItem = (payload) => ({
  type: ADD_LIST_ITEM,
  payload,
});

export const deleteListItem = (payload) => ({
  type: DELETE_LIST_ITEM,
  payload,
});

export const deleteList = (payload) => ({
  type: DELETE_LIST,
  payload,
});

export const updateListItem = (payload) => ({
  type: UPDATE_LIST_ITEM,
  payload,
});

export const toggleItemBought = (payload) => ({
  type: TOGGLE_ITEM_BOUGHT,
  payload,
});

export const resetBought = (payload) => ({
  type: RESET_BOUGHT,
  payload,
});

// Reducers

const initialState = {
  AllLists: [
    {
      id: `${Math.random()}${Date.now()}`,
      name: "Default One Time List",
      listType: "OneTimeList",
      listItems: [
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
          bought: false,
        },
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
          bought: false,
        },
        {
          id: `${Math.random()}${Date.now()}`,
          name: "List Item example",
          count: 0,
          unit: "kg",
          bought: false,
        },
      ],
    },
    {
      id: `${Math.random()}${Date.now()}`,
      name: "Default Regular List",
      listType: "Regular",
      listItems: [
        {
          id: `${Math.random()}${Date.now()}`,
          name: "Regular List Item example",
          count: 2,
          unit: "kg",
          bought: false,
        },
      ],
    },
  ],
};

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LIST: {
      return {
        ...state,
        AllLists: [
          ...state.AllLists,
          {
            id: `${Math.random()}${Date.now()}`,
            name: action.payload.name,
            listType: action.payload.listType,
            listItems: [],
          },
        ],
      };
    }

    case ADD_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState.AllLists = [...updatedState.AllLists];
      const listIndex = updatedState.AllLists.findIndex(
        (list) => list.id === action.payload.listId
      );

      const indexIsFound = listIndex > -1;
      if (indexIsFound) {
        updatedState.AllLists[listIndex] = {
          ...updatedState.AllLists[listIndex],

          listItems: [
            ...updatedState.AllLists[listIndex].listItems,
            {
              id: `${Math.random()}${Date.now()}`,
              name: action.payload.name,
              count: action.payload.count,
              unit: action.payload.unit,
            },
          ],
        };
      }

      return indexIsFound ? updatedState : state;
    }
    case DELETE_LIST: {
      return {
        ...state,
        AllLists: state.AllLists.filter((list) => {
          return list.id !== action.payload.listId;
        }),
      };
    }

    case DELETE_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState.AllLists = [...updatedState.AllLists];
      const listIndex = updatedState.AllLists.findIndex(
        (list) => list.id === action.payload.listId
      );

      const indexIsFound = listIndex > -1;

      if (indexIsFound) {
        updatedState.AllLists[listIndex] = {
          ...updatedState.AllLists[listIndex],
          listItems: [
            ...updatedState.AllLists[listIndex].listItems.filter(
              (listItem) => listItem.id !== action.payload.listItemId
            ),
          ],
        };
      }
      return indexIsFound ? updatedState : state;
    }
    case UPDATE_LIST_ITEM: {
      return {
        ...state,
        AllLists: state.AllLists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              listItems: list.listItems.map((listItem) => {
                if (listItem.id === action.payload.listItemId) {
                  return {
                    ...listItem,
                    name: action.payload.name,
                    count: action.payload.count,
                    unit: action.payload.unit,
                  };
                }
                return listItem;
              }),
            };
          }
          return list;
        }),
      };
    }
    case TOGGLE_ITEM_BOUGHT:
      return {
        ...state,
        AllLists: state.AllLists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              listItems: list.listItems.map((listItem) => {
                if (listItem.id === action.payload.listItemId) {
                  return {
                    ...listItem,
                    bought: !listItem.bought,
                  };
                }
                return listItem;
              }),
            };
          }
          return list;
        }),
      };
    case RESET_BOUGHT:
      return {
        ...state,
        AllLists: state.AllLists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              listItems: list.listItems.map((listItem) => {
                return { ...listItem, bought: false };
              }),
            };
          }
          return list;
        }),
      };

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
    case CHANGE_USERNAME_AND_URL: {
      return {
        ...state,
        username: action.payload.username,
        url: action.payload.url,
      };
    }
    default:
      return state;
  }
}

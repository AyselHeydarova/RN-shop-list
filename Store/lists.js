import { LIST_TYPES } from "../utilities/listTypes";
import { genID } from "../utilities/genID";
import { SET_APP_DATA } from "../utilities/dataStorage";

// SELECTORS
export const MODULE_NAME = "lists";
export const selectListByType = (state, type) => state[MODULE_NAME][type];
export const selectSingleListByID = (state, type, ID) =>
  selectListByType(state, type).find((list) => list.id === ID);
// Actions
export const SET_LISTS_DATA = "SET_LISTS_DATA";
export const CREATE_LIST = "CREATE_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";
export const UPDATE_LIST_ITEM = "UPDATE_LIST_ITEM";
export const TOGGLE_ITEM_BOUGHT = "TOGGLE_ITEM_BOUGHT";
export const RESET_BOUGHT = "RESET_BOUGHT";

// Action Creators
export const setListsData = (payload) => ({
  type: SET_LISTS_DATA,
  payload,
});

export const createList = (payload) => ({
  type: CREATE_LIST,
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
  [LIST_TYPES.ONETIME]: [],
  [LIST_TYPES.REGULAR]: [],
};

export function listReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        ...payload.lists,
      };
    case SET_LISTS_DATA:
      return {
        ...state,
        ...payload,
      };
    case CREATE_LIST: {
      return {
        ...state,
        [payload.listType]: [
          {
            id: payload.listId,
            name: payload.name,
            listItems: [],
          },
          ...state[payload.listType],
        ],
      };
    }

    case DELETE_LIST: {
      return {
        ...state,
        [payload.listType]: state[payload.listType].filter((list) => {
          return list.id !== payload.listId;
        }),
      };
    }
    case ADD_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState[payload.listType] = [...updatedState[payload.listType]];
      const listIndex = updatedState[payload.listType].findIndex(
        (list) => list.id === payload.listId
      );

      const indexIsFound = listIndex > -1;
      if (indexIsFound) {
        updatedState[payload.listType][listIndex] = {
          ...updatedState[payload.listType][listIndex],

          listItems: [
            {
              id: genID(),
              name: payload.product?.name,
              count: payload.product?.count,
              unit: payload.product?.unit,
            },
            ...updatedState[payload.listType][listIndex].listItems,
          ],
        };
      }

      return indexIsFound ? updatedState : state;
    }

    case DELETE_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState[payload.listType] = [...updatedState[payload.listType]];
      const listIndex = updatedState[payload.listType].findIndex(
        (list) => list.id === payload.listId
      );

      const indexIsFound = listIndex > -1;

      if (indexIsFound) {
        updatedState[payload.listType][listIndex] = {
          ...updatedState[payload.listType][listIndex],
          listItems: [
            ...updatedState[payload.listType][listIndex].listItems.filter(
              (listItem) => listItem.id !== payload.listItemId
            ),
          ],
        };
      }
      return indexIsFound ? updatedState : state;
    }
    case UPDATE_LIST_ITEM: {
      return {
        ...state,
        [payload.listType]: state[payload.listType].map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              listItems: list.listItems.map((listItem) => {
                if (listItem.id === payload.product.id) {
                  return {
                    ...listItem,
                    ...payload.product,
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
        [payload.listType]: state[payload.listType].map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              listItems: list.listItems.map((listItem) => {
                if (listItem.id === payload.listItemId) {
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
        [payload.listType]: state[payload.listType].map((list) => {
          if (list.id === payload.listId) {
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

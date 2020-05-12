// Actions
export const CREATE_ONE_TIME_LIST = "CREATE_ONE_TIME_LIST";
export const CREATE_REGULAR_LIST = "CREATE_REGULAR_LIST";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_URL = "CHANGE_URL";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";
export const UPDATE_LIST_ITEM = "UPDATE_LIST_ITEM";

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

export const addListItem = (payload) => ({
  type: ADD_LIST_ITEM,
  payload,
});

export const deleteListItem = (payload) => ({
  type: DELETE_LIST_ITEM,
  payload,
});

export const updateListItem = (payload) => ({
  type: UPDATE_LIST_ITEM,
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
    case ADD_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState.OneTimeLists = [...updatedState.OneTimeLists];
      updatedState.RegularLists = [...updatedState.RegularLists];
      const listIndex = updatedState.OneTimeLists.findIndex(
        (list) => list.id === action.payload.listId
      );

      const indexIsFound = listIndex > -1;
      if (indexIsFound) {
        updatedState.OneTimeLists[listIndex] = {
          ...updatedState.OneTimeLists[listIndex],
          listItems: [
            ...updatedState.OneTimeLists[listIndex].listItems,
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
    case DELETE_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState.OneTimeLists = [...updatedState.OneTimeLists];
      updatedState.RegularLists = [...updatedState.RegularLists];
      const listIndex = updatedState.OneTimeLists.findIndex(
        (list) => list.id === action.payload.listId
      );

      const indexIsFound = listIndex > -1;

      if (indexIsFound) {
        updatedState.OneTimeLists[listIndex] = {
          ...updatedState.OneTimeLists[listIndex],
          listItems: [
            ...updatedState.OneTimeLists[listIndex].listItems.filter(
              (listItem) => listItem.id !== action.payload.listItemId
            ),
          ],
        };
      }

      return indexIsFound ? updatedState : state;
    } 
    case UPDATE_LIST_ITEM: {
      const updatedState = { ...state };
      updatedState.OneTimeLists = [...updatedState.OneTimeLists];
      updatedState.RegularLists = [...updatedState.RegularLists];
      const listIndex = updatedState.OneTimeLists.findIndex(
        (list) => list.id === action.payload.listId
      );

      const indexIsFound = listIndex > -1;

      const listItemIndex = updatedState.OneTimeLists[listIndex].listItems.findIndex(
        (listItem) => listItem.id === action.payload.listItemId
      )
      
      if (indexIsFound) {
        updatedState.OneTimeLists[listIndex] = {
          ...updatedState.OneTimeLists[listIndex],
          listItems: [
            
            ...updatedState.OneTimeLists[listIndex].listItems.filter(
              (listItem) => listItem.id !== action.payload.listItemId
            ),

            updatedState.OneTimeLists[listIndex].listItems[listItemIndex] = {
              
                id: `${Math.random()}${Date.now()}`,
                name: action.payload.name,
                count: action.payload.count,
                unit: action.payload.unit,
              
            }      
          ],
        };
      }

      return indexIsFound ? updatedState : state;
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

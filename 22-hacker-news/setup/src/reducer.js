import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions"; // dispatch types identifier

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }; // set new state values for the initial state object when dispatch type is 'SET_LOADING'
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }; // set new state values for the initial state object when dispatch type is 'SET_STORIES'
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      }; // set new state values for the initial state object when dispatch type is 'REMOVE_STORY'
    case HANDLE_SEARCH:
      return { ...state, searchQuery: action.payload, page: 0 }; // set new state values for the initial state object when dispatch type is 'HANDLE_SEARCH'
    case HANDLE_PAGE:
      if (action.payload === "prev") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      if (action.payload === "next") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      } // set new state values for the initial state object when dispatch type is 'HANDLE_PAGE'
      break;
    default:
      throw new Error(`No Matching ${action.type} action.type`);
  }
};
export default reducer;

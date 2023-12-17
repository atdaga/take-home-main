/*
  TODO: Create reducer and state updates here for recipe. Done.
*/
import { GET_RECIPE, RECEIVE_RECIPE, FAIL_GET_RECIPE } from "../actions"

const initialState = {
  recipe: null,
  isLoading: false,
  error: null,
}

const recipeFetching = (state) => {
  return { ...state, recipe: null, isLoading: true, error: null }
}

const recipeFetched = (state, payload) => {
  return { ...state, recipe: payload, isLoading: false }
}

const getRecipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching()
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_GET_RECIPE:
      return getRecipeFailed(state, payload)
    default:
      return state
  }
}

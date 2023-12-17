/* TODO: create recipe fetch actions, creators, and constants. DONE.
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/
export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_GET_RECIPE = "FAIL_GET_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedGetRecipe = (payload) => ({
  type: FAIL_GET_RECIPE,
  payload
})

export const executeGetRecipe = async (id) => {
  const response = await fetch(`/api/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const recipeResults = await response.json()
  return recipeResults
}

export const getRecipe = (id) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeGetRecipe(id)
      .then((res) => dispatch(fetchedRecipe(res)))
      .catch((err) => dispatch(failedGetRecipe(err)))
  }
}

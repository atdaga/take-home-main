import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import { useParams } from 'react-router-dom'

const Recipe = ({ getRecipe, recipe: { isLoading, recipe, error } }) => {
  const { id } = useParams();

  useEffect(() => {
    if (!isLoading) {
      if (recipe === null || recipe.id !== id) {
        getRecipe(id)
      }
    }
  }, [id])

  if (!isLoading) {
    if (error) {
      return (
        <div>Sorry! Something bad happened!</div>
      )
    } else if (recipe && recipe.id === id) {
      return (
        <div>
          <div>{recipe.name}</div>
          <div>Ingredients</div>
          <div>{recipe.ingredients}</div>
          <div>Instructions</div>
          <div>{recipe.instructions}</div>
        </div>
      )
    }
  }
  return (
    <div>Loading...</div>
  )
}

const mapStateToProps = (state) => {
  return {
      recipe: state.recipe
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecipe: actions.getRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)

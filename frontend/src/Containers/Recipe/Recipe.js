import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import { useParams } from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import { Layout, Title, Section, SectionTitle, SectionText } from "./styles"

const Recipe = ({ getRecipe, recipe: { isLoading, recipe, error } }) => {
  const { id } = useParams()

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
        <Layout>
          <Title>{recipe.name}</Title>
          <Section>
          <SectionTitle>Ingredients</SectionTitle>
            <Divider />
            <div>
              {recipe.ingredients.map((ingredient) => (
                <ListItem key={ingredient}>* {ingredient}</ListItem>
              ))}
            </div>
          </Section>
          <Section>
            <SectionTitle>Instructions</SectionTitle>
            <Divider />
            <SectionText>{recipe.instructions}</SectionText>
          </Section>
        </Layout>
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
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecipe: actions.getRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)

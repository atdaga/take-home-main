import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper, RecipeLink } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import * as actions from "../../actions"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import { xor } from 'lodash'

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.state = {
      term: "",
      ingredients: ["milk"],
    }
  }

  fetchSearch() {
    // TODO: something is missing here for fetching. Done.
    const { term, ingredients } = this.state
    const termTrimmed = term.trim();
    this.props.searchRecipes(termTrimmed, ingredients)

    // Set URL
    const params = {
      t: termTrimmed,
      i: ingredients,
    }
    const urlParams = Object.entries(params)
      .filter(([key, val]) => val.length > 0)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`);
      urlParams.length > 0 ?
        this.props.setSearchParams(`?${urlParams.join('&')}`, { replace: true }) :
        this.props.setSearchParams('');
  }

  componentDidMount() {
    const { term, ingredients } = this.state
    // Check if search parameters already match state.
    const t = this.props.searchParams.get('t') || ''
    const i = (this.props.searchParams.get('i') || '').split(',')
    if (t !== term || xor(i, ingredients).length > 0) {
      this.setState({ term: t, ingredients: i })
      this.fetchSearch()
    }
  }

  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }

  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }

  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading } = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.fetchSearch}>search</Button>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id}>
                <Button onClick={() => this.props.navigate(`/recipe/${recipe.id}`)}>
                  <RecipeLink>{recipe.name}</RecipeLink>
                </Button>
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />
        {/*
          TODO: Add a recipe component here. Done: Refer to notes.
          I'm expecting you to have it return null or a component based on the redux state, not passing any props from here
          I want to see how you wire up a component with connect and build actions.
        */}
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
    },
    dispatch
  )

const HomeWithRouter = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Home
      {...props}
      navigate={navigate}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter)

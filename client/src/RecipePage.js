import React, { useState } from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"

function Recipe() {
  // sanitize search
  const [search, setSearch] = useState([])
  const [recipes, setRecipes] = useState([])

  async function searchForRecipes(e) {
    e.preventDefault()
    const findRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR}&includeIngredients=${search}&fillIngredients=true&number=3`)

    setRecipes(findRecipe.data.results)
  }

  return (
    <>
      <div className="recipe-search">
        <form onSubmit={searchForRecipes}>
          <InputGroup>
            <FormControl required placeholder="Enter ingredients" onChange={e => setSearch(e.target.value)} />
            <Button className="recipe-search-button" type="submit"><FontAwesomeIcon icon={faUtensils} /></Button>
          </InputGroup>
        </form>
      </div>
      <div className="recipe-container">
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </>
  )
}

export default Recipe
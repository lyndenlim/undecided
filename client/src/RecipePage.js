import React, { useState } from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"
import Spinner from "react-bootstrap/Spinner"

function Recipe({ currentLat, currentLng }) {
  // sanitize search
  const [search, setSearch] = useState([])
  const [recipes, setRecipes] = useState([])
  const [address, setAddress] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function searchForRecipes(e) {
    e.preventDefault()
    setIsLoading(true)
    const findRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR}&includeIngredients=${search}&fillIngredients=true&number=10`)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLat},${currentLng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(response => {
        setShowMap(true)
        setAddress(response.data.results[0].formatted_address)
        setRecipes(findRecipe.data.results)
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="recipe-search">
        <form onSubmit={searchForRecipes}>
          <InputGroup>
            <FormControl required placeholder="Enter ingredients" onChange={e => setSearch(e.target.value)} />
            {isLoading ?
              <Button className="loading-button" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
              :
              <Button className="recipe-search-button" type="submit"><FontAwesomeIcon icon={faUtensils} /></Button>}
          </InputGroup>
        </form>
      </div>
      {showMap && recipes.length > 0 ?
        <div className="recipe-map-container">
          <h3>Potential places where you can find missing ingredients</h3>
          <iframe
            width="100%"
            height="300px"
            frameBorder="0"
            className="map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=supermarkets+near+${address}&zoom=15&center=${currentLat},${currentLng}`}
          >
          </iframe>
        </div>
        :
        <div className="recipe-subtitle"><h3>Find recipes with any ingredients you have on hand</h3></div>}
      <br />
      <div className="recipe-container">
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} setIsLoading={setIsLoading} />)}
      </div>
    </>
  )
}

export default Recipe
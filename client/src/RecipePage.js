import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"

function Recipe({ currentLat, currentLng }) {
  // sanitize search
  const [search, setSearch] = useState([])
  const [recipes, setRecipes] = useState([])
  const [address, setAddress] = useState("")
  const [showMap, setShowMap] = useState(false)

  async function searchForRecipes(e) {
    e.preventDefault()
    const findRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR}&includeIngredients=${search}&fillIngredients=true&number=3`)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLat},${currentLng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)

    setShowMap(true)
    setAddress(response.data.results[0].formatted_address)
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
      {showMap ? <div className="recipe-map-container">
        <h3>Find your missing ingredients at nearby supermarket(s)</h3>
        <iframe
          width="100%"
          height="300px"
          frameBorder="0"
          className="map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=supermarkets+near+${address}&zoom=15&center=${currentLat},${currentLng}`}
        >
        </iframe>
      </div> : null}
      <br />
      <div className="recipe-container">
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </>
  )
}

export default Recipe
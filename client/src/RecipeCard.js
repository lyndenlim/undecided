import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function RecipeCard({ recipe }) {
    const [recipeInfo, setRecipeInfo] = useState([])
    const [recipeCuisines, setRecipeCuisines] = useState([])
    const [recipeDiets, setRecipeDiets] = useState([])

    useEffect(() => {
        async function getRecipeInfo() {
            const recipeInformation = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`)
            setRecipeInfo(recipeInformation.data)
            setRecipeCuisines(recipeInformation.data.cuisines)
            setRecipeDiets(recipeInformation.data.diets)
        }

        getRecipeInfo()
    }, [])

    return (
        <div>
            <Link to={`/recipes/${recipe.id}`} className="link">
                <h3>{recipe.title}</h3>
                <img src={recipe.image} />
                <h5>Takes {recipeInfo.readyInMinutes} minutes to make</h5>
                Ingredients not on hand: {recipe.missedIngredients.map((ingredient, index) => <li key={index}>{ingredient.original}</li>)}
                <br />
                Cuisine(s): {recipeCuisines.map((cuisine, index) => <p key={index}>{cuisine}</p>)}
                {recipeDiets.map((diet, index) => <p key={index}>{diet}</p>)}
            </Link>
        </div >
    )
}

export default RecipeCard
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

function RecipeCard({ recipe }) {
    const [recipeInfo, setRecipeInfo] = useState([])
    const [recipeCuisines, setRecipeCuisines] = useState([])

    useEffect(() => {
        async function getRecipeInfo() {
            const recipeInformation = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`)
            setRecipeInfo(recipeInformation.data)
            setRecipeCuisines(recipeInformation.data.cuisines)
        }

        getRecipeInfo()
    }, [])

    return (
        <div className="recipe-card">
            <Link to={`/recipes/${recipe.id}`} className="link">
                <div className="wrapper">
                    <div className="cols">
                        <div className="col">
                            <div className="recipe-card-container">
                                <div className="front" style={{ backgroundImage: `url(${recipe.image})` }}>
                                    <div className="inner">
                                        <p className="recipe-card-recipe-name">{recipe.title}</p>
                                        <div className="recipe-card-info">Takes <strong>{recipeInfo.readyInMinutes}</strong> minutes to make</div>
                                        <strong className="recipe-card-info">Cuisine(s):</strong> {recipeCuisines.map((cuisine, index) => <p key={index} className="category recipe-card-info">{cuisine}</p>)}
                                        <br />
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="inner recipe-card-back">
                                        <p style={{fontSize: "20px"}}>Missing ingredients:</p>
                                        <ListGroup className="list-group-flush" style={{ borderRadius: "20px" }} >
                                            {recipe.missedIngredients.map((ingredient, index) => <ListGroupItem key={index}>{ingredient.original}</ListGroupItem>)}
                                        </ListGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default RecipeCard
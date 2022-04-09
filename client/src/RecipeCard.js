import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

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
        <>
            <Card className="recipe-card">
                <Link to={`/recipes/${recipe.id}`} className="link">
                    <Card.Header className="recipe-header">{recipe.title}</Card.Header>
                    <Card.Img src={recipe.image} className="recipe-image" />
                    <Card.Body>Takes <strong>{recipeInfo.readyInMinutes}</strong> minutes to make</Card.Body>
                    Ingredients not on hand:
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{recipe.missedIngredients.map((ingredient, index) => <ListGroupItem key={index}>{ingredient.original}</ListGroupItem>)}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {/* revisit */}
                        <strong>Cuisine(s):</strong> {recipeCuisines.map((cuisine, index) => <p key={index} className="category">{cuisine}</p>)}
                        <br />
                        <strong>Diet Type(s):</strong>  {recipeDiets.map((diet, index) => <p key={index} className="category">{diet}</p>)}
                    </Card.Body>
                </Link>
            </Card >
        </>
    )
}

export default RecipeCard
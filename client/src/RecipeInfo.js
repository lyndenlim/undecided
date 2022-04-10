import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from "react-bootstrap/Card"

function RecipeInfo() {
    const { id } = useParams()
    const [recipeSteps, setRecipeSteps] = useState([])
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        async function getRecipeInstructions() {
            const recipeInformation = await axios.all([axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`),
            axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`)])

            setImage(recipeInformation[0].data.image)
            setTitle(recipeInformation[0].data.title)

            setRecipeSteps(recipeInformation[1].data[0].steps)
        }
        getRecipeInstructions()
    }, [])

    return (
        // Fix uneven sizing of cards due to different img szs
        <div className="recipe-info">
            <Card className="recipe-info">
                <Card.Header className="recipe-header">{title}</Card.Header>
                <Card.Img src={image} alt="recipe" />
                <Card.Body><ol>{recipeSteps.map((step, index) => <li key={index}>{step.step}</li>)}</ol></Card.Body>
            </Card>
        </div>
    )
}

export default RecipeInfo
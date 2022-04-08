import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
        <div>
            <h3>{title}</h3>
            <img src={image} alt="recipe" />
            {recipeSteps.map((step, index) => <li key={index}>{step.step}</li>)}
        </div>
    )
}

export default RecipeInfo
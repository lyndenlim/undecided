import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from "react-bootstrap/Card"
import ReactLoading from "react-loading"

function RecipeInfo() {
    const { id } = useParams()
    const [recipeSteps, setRecipeSteps] = useState([])
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getRecipeInstructions() {
            axios.all([axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`),
            axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`)])
                .then(recipeInformation => {
                    if (recipeInformation[1].data[0]) {
                        setImage(recipeInformation[0].data.image)
                        setTitle(recipeInformation[0].data.title)
                        setRecipeSteps(recipeInformation[1].data[0].steps)
                        setTimeout(setIsLoading, 1000, false)
                    } else {
                        setImage(recipeInformation[0].data.image)
                        setTitle(recipeInformation[0].data.title)
                        setRecipeSteps([])
                        setTimeout(setIsLoading, 1000, false)
                    }
                })
        }
        getRecipeInstructions()
    }, [])

    console.log(recipeSteps)

    return (
        <>
            {isLoading ?
                <ReactLoading type="spinningBubbles" color="black" className="spinner-bubbles" />
                :
                <div className="recipe-centering">
                    <Card className="recipe-info-card">
                        <div className="recipe-info-container">
                            <div className="recipe-photo">
                                <img width="100%" src={image} alt="recipe" />
                            </div>
                            <Card.ImgOverlay className="recipe-overlay">
                                <h1 className="bold">{title}</h1>
                            </Card.ImgOverlay>
                            <Card.Body>
                                <h5>Instructions:</h5>
                                <ol>
                                    {recipeSteps.length > 0 ? recipeSteps.map((step, index) => <div key={index}><li>{step.step}</li><br /></div>) : "Unfortunately, there are no steps provided for this recipe."}
                                </ol>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            }
        </>
    )
}

export default RecipeInfo
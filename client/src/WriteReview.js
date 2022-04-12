import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ReactStarsRating from 'react-awesome-stars-rating';

function WriteReview({ user }) {
    const { id } = useParams()
    const history = useHistory()
    const [restaurantName, setRestaurantName] = useState("")
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    useEffect(() => {
        async function getRestaurantName() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })

            const restaurantData = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`)
            setRestaurantName(restaurantData.data.name)
        }
        getRestaurantName()
    }, [])

    function postReview(e) {
        e.preventDefault()
        axios.post("/reviews", {
            user_id: user.id,
            restaurant_id: id,
            rating: rating,
            comment: comment
        })
        setRating("")
        setComment("")
        alert("Thanks for your review!")
        history.push(`/restaurants/${id}`)
    }
    console.log(rating)

    return (
        <div className="user-review-container">
            <h3>{restaurantName}</h3>
            <form onSubmit={postReview}>
                <div>
                    <ReactStarsRating value={rating} onChange={e => setRating(e)} />
                </div>
                <br />
                <div>
                    <Form.Control as="textarea" placeholder="Write a review" defaultValue={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <br />
                <Button className="post-review-button" type="submit">Post Review</Button><Button variant="secondary" onClick={e => history.push(`/restaurants/${id}`)}>Cancel</Button>
            </form>

        </div>
    )
}

export default WriteReview
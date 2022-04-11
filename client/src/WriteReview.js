import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function WriteReview({ user }) {
    const { id } = useParams()
    const history = useHistory()
    const [restaurantName, setRestaurantName] = useState("")
    const [rating, setRating] = useState(5)
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

    return (
        <div className="user-review-container">
            <h3>{restaurantName}</h3>
            <form onSubmit={postReview}>
                Rating
                <div>
                    <Form.Select className="user-review-select" defaultValue={rating} onChange={e => setRating(e.target.value)}>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </Form.Select>
                </div>
                <br />
                Comment
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
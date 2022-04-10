import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function AccountReview({ review }) {
    const [name, setName] = useState("")
    const [dateCreated, setDateCreated] = useState("")

    useEffect(() => {
        async function getRestaurantName() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const restaurantInfo = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${review.restaurant_id}`)
            const dateSplit = review.created_at.split("T")[0].split("-")
            const reformattedDate = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`

            setName(restaurantInfo.data.name)
            setDateCreated(reformattedDate)
        }
        getRestaurantName()
    }, [])

    return (
        <div>
            <Link to={`/restaurants/${review.restaurant_id}`} className="link">
                <h4>{name}</h4>
            </Link>
            <p>{dateCreated}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
            <hr />
        </div>
    )
}

export default AccountReview
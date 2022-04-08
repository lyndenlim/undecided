import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AccountReview({ review }) {
    const [name, setName] = useState("")

    useEffect(() => {
        async function getRestaurantName() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const restaurantName = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${review.restaurant_id}`)
            setName(restaurantName.data.name)
        }
        getRestaurantName()
    }, [])

    return (
        <div>
            <h4>{name}</h4>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
            <hr />
        </div>
    )
}

export default AccountReview
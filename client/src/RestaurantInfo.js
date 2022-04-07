import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"

function RestaurantInfo() {
    const { id } = useParams()
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantReviewCount, setRestaurantReviewCount] = useState("")
    const [restaurantPrice, setRestaurantPrice] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const [restaurantURL, setRestaurantURL] = useState("")
    const [restaurantPhoneNumber, setRestaurantPhoneNumber] = useState("")
    const [restaurantCategories, setRestaurantCategories] = useState([])
    const [restaurantPhotos, setRestaurantPhotos] = useState([])
    const [restaurantHours, setRestaurantHours] = useState([])
    const [restaurantReviews, setRestaurantReviews] = useState([])
    const [userRestaurantReviews, setUserRestaurantReviews] = useState([])

    useEffect(() => {
        // const today = new Date
        // console.log(today.getDay())

        async function getUserReviews() {
            const userReviews = await axios.get("/reviews")
            setUserRestaurantReviews(userReviews.data.filter(review => review.restaurant_id === id)
            )
        }

        async function getRestaurantData() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })

            const restaurantData = await axios.all([axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`),
            axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`)])
            const restaurantInfo = restaurantData[0]
            const restaurantReviews = restaurantData[1]

            setRestaurantReviews(restaurantReviews.data.reviews)
            setRestaurantName(restaurantInfo.data.name)
            setRestaurantRating(restaurantInfo.data.rating)
            setRestaurantAddress(restaurantInfo.data.location.display_address.toString())
            setRestaurantReviewCount(restaurantInfo.data.review_count)
            setRestaurantPrice(restaurantInfo.data.price)
            setRestaurantCategories(restaurantInfo.data.categories)
            setRestaurantHours(restaurantInfo.data.hours[0].open)
            setRestaurantPhoneNumber(restaurantInfo.data.display_phone)
            setIsOpen(restaurantInfo.data.hours[0].is_open_now)
            setRestaurantPhotos(restaurantInfo.data.photos)
            setRestaurantURL(restaurantInfo.data.url)
        }

        getUserReviews()
        getRestaurantData()
    }, [])

    return (
        <div>
            <h3>{restaurantName}</h3>
            <p>{restaurantRating} {restaurantReviewCount} reviews</p>
            <p>{restaurantPrice}</p>
            {restaurantCategories.map(category => <p key={category.title}>{category.title} </p>)}
            <p>{isOpen ? 'OPEN' : 'CLOSED'}</p>
            HOURS
            {restaurantHours.map(day => <p key={day.day}>{day.day} {day.start} {day.end}</p>)}
            <p>{restaurantPhoneNumber}</p>
            <a href={restaurantURL}>{restaurantURL}</a>
            {restaurantPhotos.map(photo => <img key={photo} height="300px" width="300px" src={photo} alt="restaurant" />)}
            <br />
            <Map restaurantAddress={restaurantAddress} />
            <br />
            <Link to={`/writereview/${id}`}>
                <button>Write a Review</button>
            </Link>
            <br />
            {restaurantReviews.map(review => <YelpReview key={review.id} review={review} />)}
            {userRestaurantReviews.map(review => <UserReview key={review.id} review={review} />)}
        </div>
    )
}

export default RestaurantInfo
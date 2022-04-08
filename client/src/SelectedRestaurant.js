import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import RestaurantInfo from './RestaurantInfo'


function SelectedRestaurant({ user }) {
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

    function removeDeletedReview(reviewID) {
        setUserRestaurantReviews(userRestaurantReviews.filter(review => review.id !== reviewID))
    }

    return (
        <>
            <RestaurantInfo
                removeDeletedReview={removeDeletedReview}
                restaurantName={restaurantName}
                restaurantReviews={restaurantReviews}
                restaurantRating={restaurantRating}
                restaurantAddress={restaurantAddress}
                restaurantReviewCount={restaurantReviewCount}
                restaurantPrice={restaurantPrice}
                restaurantCategories={restaurantCategories}
                restaurantHours={restaurantHours}
                restaurantPhoneNumber={restaurantPhoneNumber}
                userRestaurantReviews={userRestaurantReviews}
                restaurantPhotos={restaurantPhotos}
                restaurantURL={restaurantURL}
                isOpen={isOpen}
                user={user}
                id={id}
            />
        </>
    )
}

export default SelectedRestaurant
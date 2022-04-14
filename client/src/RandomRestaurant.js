import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import RestaurantInfo from "./RestaurantInfo"

function RandomRestaurant({ user, currentLat, currentLng }) {
    const { id } = useParams()
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantPhoneNumber, setRestaurantPhoneNumber] = useState("")
    const [restaurantPrice, setRestaurantPrice] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantReviewCount, setRestaurantReviewCount] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const [restaurantHours, setRestaurantHours] = useState([])
    const [restaurantCategories, setRestaurantCategories] = useState([])
    const [restaurantPhotos, setRestaurantPhotos] = useState([])
    const [restaurantReviews, setRestaurantReviews] = useState([])
    const [userRestaurantReviews, setUserRestaurantReviews] = useState([])
    const [restaurantTransactions, setRestaurantTransactions] = useState([])
    const [randomRestaurantID, setRandomRestaurantID] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getRestaurantData() {
            const userReviews = await axios.get("/reviews")
            setUserRestaurantReviews(userReviews.data.filter(review => review.restaurant_id === id)
            )

            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })

            const restaurantRequests = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&latitude=${currentLat}&longitude=${currentLng}&radius=1610&open_now=true&categories=restaurants`)
            const allRestaurants = restaurantRequests.data.businesses
            const randomRestaurant = allRestaurants[Math.ceil(Math.random() * allRestaurants.length)]
            axios.all([axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${randomRestaurant.id}`),
            axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${randomRestaurant.id}/reviews`)])
                .then(randomRestaurantInfo => {
                    setRandomRestaurantID(randomRestaurant.id)
                    setRestaurantReviews(randomRestaurantInfo[1].data.reviews)
                    setRestaurantTransactions(randomRestaurantInfo[0].data.transactions)
                    setRestaurantPhoneNumber(randomRestaurantInfo[0].data.display_phone)
                    setIsOpen(randomRestaurantInfo[0].data.hours[0].is_open_now)
                    setRestaurantName(randomRestaurantInfo[0].data.name)
                    setRestaurantAddress(randomRestaurantInfo[0].data.location.display_address)
                    setRestaurantPrice(randomRestaurantInfo[0].data.price)
                    setRestaurantRating(randomRestaurantInfo[0].data.rating)
                    setRestaurantReviewCount(randomRestaurantInfo[0].data.review_count)
                    setRestaurantHours(randomRestaurantInfo[0].data.hours[0].open)
                    setRestaurantCategories(randomRestaurantInfo[0].data.categories)
                    setRestaurantPhotos(randomRestaurantInfo[0].data.photos)
                    setTimeout(setIsLoading, 1000, false)
                })
        }
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
                restaurantTransactions={restaurantTransactions}
                isOpen={isOpen}
                user={user}
                id={randomRestaurantID}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </>
    )
}

export default RandomRestaurant
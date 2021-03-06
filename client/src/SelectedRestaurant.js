import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios'
import RestaurantInfo from './RestaurantInfo'

function SelectedRestaurant({ user, setReviewCount }) {
    const { id } = useParams()
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantReviewCount, setRestaurantReviewCount] = useState("")
    const [restaurantPrice, setRestaurantPrice] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const [restaurantPhoneNumber, setRestaurantPhoneNumber] = useState("")
    const [restaurantCategories, setRestaurantCategories] = useState([])
    const [restaurantPhotos, setRestaurantPhotos] = useState([])
    const [restaurantHours, setRestaurantHours] = useState([])
    const [restaurantReviews, setRestaurantReviews] = useState([])
    const [userRestaurantReviews, setUserRestaurantReviews] = useState([])
    const [restaurantTransactions, setRestaurantTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        async function getUserReviews() {
            const userReviews = await axios.get("/reviews")
            setUserRestaurantReviews(userReviews.data.filter(review => review.restaurant_id === id)
            )
        }

        async function getRestaurantData() {
            axios.all([axios.get(`/yelp_restaurant?restaurant_id=${id}&api_key=${process.env.REACT_APP_YELP_API_KEY}`),
            axios.get(`/yelp_reviews?restaurant_id=${id}&api_key=${process.env.REACT_APP_YELP_API_KEY}`)])
                .then(restaurantData => {
                    setRestaurantReviews(restaurantData[1].data.reviews)
                    setRestaurantTransactions(restaurantData[0].data.transactions)
                    setRestaurantName(restaurantData[0].data.name)
                    setRestaurantRating(restaurantData[0].data.rating)
                    setRestaurantAddress(restaurantData[0].data.location.display_address.toString())
                    setRestaurantReviewCount(restaurantData[0].data.review_count)
                    setRestaurantPrice(restaurantData[0].data.price)
                    setRestaurantCategories(restaurantData[0].data.categories)
                    setRestaurantHours(restaurantData[0].data.hours[0].open)
                    setRestaurantPhoneNumber(restaurantData[0].data.display_phone)
                    setIsOpen(restaurantData[0].data.hours[0].is_open_now)
                    setRestaurantPhotos(restaurantData[0].data.photos)
                    setTimeout(setIsLoading, 1000, false)
                })
                .catch(() => history.go(0))
        }

        getUserReviews()
        getRestaurantData()
    }, [isLoading])

    function removeDeletedReview(reviewID) {
        setReviewCount(reviewCount => reviewCount - 1)
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
                id={id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </>
    )
}

export default SelectedRestaurant
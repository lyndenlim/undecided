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
    const [isLoading, setIsLoading] = useState(true)

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

            axios.all([axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`),
            axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`)])
                .then(restaurantData => {
                    setRestaurantReviews(restaurantData[1].data.reviews)
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
                    setRestaurantURL(restaurantData[0].data.url)
                })
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
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </>
    )
}

export default SelectedRestaurant
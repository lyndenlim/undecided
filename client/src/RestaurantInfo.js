import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import Map from './Map'

function RestaurantInfo() {
    const { id } = useParams()
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantReviewCount, setRestaurantReviewCount] = useState("")
    const [restaurantPrice, setRestaurantPrice] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const [reviewDate, setReviewDate] = useState("")
    const [restaurantURL, setRestaurantURL] = useState("")
    const [restaurantCategories, setRestaurantCategories] = useState([])
    const [restaurantPhotos, setRestaurantPhotos] = useState([])
    const [restaurantHours, setRestaurantHours] = useState([])
    const [restaurantReviews, setRestaurantReviews] = useState([])

    useEffect(() => {
        // const today = new Date
        // console.log(today.getDay())

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
            // setReviewDate(restaurantReviews.data.reviews.map(review => {
            //     let dateSplit = review.time_created.split(" ")[0].split("-")
            //     let reviewDate = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`
            //     return reviewDate
            // }))
            setRestaurantName(restaurantInfo.data.name)
            setRestaurantRating(restaurantInfo.data.rating)
            setRestaurantAddress(restaurantInfo.data.location.display_address.toString())
            setRestaurantReviewCount(restaurantInfo.data.review_count)
            setRestaurantPrice(restaurantInfo.data.price)
            setRestaurantCategories(restaurantInfo.data.categories)
            setRestaurantHours(restaurantInfo.data.hours[0].open)
            setIsOpen(restaurantInfo.data.hours[0].is_open_now)
            setRestaurantPhotos(restaurantInfo.data.photos)
            setRestaurantURL(restaurantInfo.data.url)
        }
        getRestaurantData()
    }, [])

    return (
        <div>
            <h3>{restaurantName}</h3>
            <p>{restaurantRating} {restaurantReviewCount} reviews</p>
            <p>{restaurantPrice}</p>
            {restaurantCategories.map(category => <p key={category.title}>{category.title}</p>)}
            <p>{isOpen ? 'OPEN' : 'CLOSED'}</p>
            HOURS
            {restaurantHours.map(day => <p key={day.day}>{day.day} {day.start} {day.end}</p>)}
            <a href={restaurantURL}>{restaurantURL}</a>
            {restaurantPhotos.map(photo => <img key={photo} height="300px" width="300px" src={photo} alt="restaurant-photo" />)}
            <br />
            <Map restaurantAddress={restaurantAddress} />
            <br />
            <button>Write a Review</button>
            {restaurantReviews.map(review => <div key={review.id}>
                <img height="100px" width="100px" src={review.user.image_url} alt="user-avatar" /><h4>{review.user.name}</h4>
                <p>{review.time_created}</p>
                <p>{review.rating}</p>
                <p>{review.text}</p>
                <hr />
            </div>
            )}
            
        </div>
    )
}

export default RestaurantInfo
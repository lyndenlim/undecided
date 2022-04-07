import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Map from "./Map"

function RandomRestaurant() {
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantPhoneNumber, setRestaurantPhoneNumber] = useState("")
    const [restaurantPrice, setRestaurantPrice] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantReviewCount, setRestaurantReviewCount] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const [restaurantID, setRestaurantID] = useState("")
    const [restaurantURL, setRestaurantURL] = useState("")
    const [restaurantHours, setRestaurantHours] = useState([])
    const [restaurantCategories, setRestaurantCategories] = useState([])
    const [restaurantPhotos, setRestaurantPhotos] = useState([])

    useEffect(() => {
        async function getRestaurantData() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const geocodedResult = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=9-Maiden-Ln-New-York,NY-10038-Broadway-&-Cortlandt-St&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            const locationLat = (geocodedResult.data.results[0].geometry.location.lat)
            const locationLng = (geocodedResult.data.results[0].geometry.location.lng)
            const restaurantRequests = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&latitude=${locationLat}&longitude=${locationLng}&radius=805&open_now=true&categories=restaurants`)
            const allRestaurants = restaurantRequests.data.businesses
            // categories
            // display_phone
            // distanceinmeters => distanceinmeters/1609
            // image_url
            // is_closed
            // location.display_address
            // name
            // price
            // rating
            // review_count
            // url (scrape the url from Yelp)

            const randomRestaurant = allRestaurants[Math.ceil(Math.random() * allRestaurants.length)]
            const randomRestaurantInfo = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${randomRestaurant.id}`)
            setRestaurantPhoneNumber(randomRestaurantInfo.data.display_phone)
            setIsOpen(randomRestaurantInfo.data.hours[0].is_open_now)
            setRestaurantID(randomRestaurantInfo.data.id)
            setRestaurantName(randomRestaurantInfo.data.name)
            setRestaurantAddress(randomRestaurantInfo.data.location.display_address)
            setRestaurantPrice(randomRestaurantInfo.data.price)
            setRestaurantRating(randomRestaurantInfo.data.rating)
            setRestaurantReviewCount(randomRestaurantInfo.data.review_count)
            setRestaurantHours(randomRestaurantInfo.data.hours[0].open)
            setRestaurantCategories(randomRestaurantInfo.data.categories)
            setRestaurantPhotos(randomRestaurantInfo.data.photos)
            setRestaurantURL(randomRestaurantInfo.data.url)

            // const findRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_SPOONACULAR}&includeIngredients=${arrOfIngredients}&fillIngredients=true`
            // const recipeInformation = `https://api.spoonacular.com/recipes/${findRecipe[selectedRecipe].id}`/information?apiKey=${REACT_APP_SPOONACULAR}`
            // const recipeInstructions = `https://api.spoonacular.com/recipes/${findRecipe[selectedRecipe].id}/analyzedInstructions?apiKey=${REACT_APP_SPOONACULAR}`
        }
        getRestaurantData()
    }, [])

    return (
        <div>
            <h3>{restaurantName}</h3>
            <p>{restaurantPhoneNumber}</p>
            <p>{restaurantPrice}</p>
            <p>{restaurantRating} {restaurantReviewCount} reviews</p>
            <p>{isOpen ? "OPEN" : "CLOSED"}</p>
            <a href={restaurantURL}>{restaurantURL}</a>
            {/* <p>{restaurantCategories.map(categories => categories)}</p> */}
            {/* {restaurantHours.map(day => <p>{day.start}</p>)}  */}
            {restaurantPhotos.map(photo => <img src={photo} height="300" width="300" alt="restaurant-photos" />)}
            <Map restaurantAddress={restaurantAddress} />
        </div>
    )
}

export default RandomRestaurant
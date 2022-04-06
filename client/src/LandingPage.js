import React, { useEffect, useState } from 'react'
import axios from "axios"

function LandingPage() {
    const [address, setAddress] = useState("")

    useEffect(() => {
        async function fetchRestaurantData() {
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
            // categories
            // display_phone
            // hours
            // id 
            // is_closed
            // location.display_address
            setAddress(randomRestaurantInfo.data.location.display_address)
            // name
            // photos
            // price
            // rating
            // review_count
            // url (scrape the url from Yelp)

            // const findRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_SPOONACULAR}&includeIngredients=${arrOfIngredients}&fillIngredients=true`
            // const recipeInformation = `https://api.spoonacular.com/recipes/${findRecipe[selectedRecipe].id}`/information?apiKey=${REACT_APP_SPOONACULAR}`
            // const recipeInstructions = `https://api.spoonacular.com/recipes/${findRecipe[selectedRecipe].id}/analyzedInstructions?apiKey=${REACT_APP_SPOONACULAR}`
        }
        // fetchRestaurantData()
    }, [])


    return (
        <>
            <div>Landing Page</div>
            <iframe
                title="map"
                width="600"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${address}`}
            />
        </>
    )
}

export default LandingPage
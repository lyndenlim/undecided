import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RestaurantCard from "./RestaurantCard"

function RestaurantPage({ address }) {
    const [allRestaurantsInfo, setAllRestaurantsInfo] = useState([])

    useEffect(() => {
        async function getRestaurantsData() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const geocodedResult = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            const locationLat = geocodedResult.data.results[0].geometry.location.lat
            const locationLng = geocodedResult.data.results[0].geometry.location.lng
            const restaurantRequests = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&latitude=${locationLat}&longitude=${locationLng}&radius=805&open_now=true&categories=restaurants`)
            const allRestaurants = restaurantRequests.data.businesses

            setAllRestaurantsInfo(allRestaurants)

        }
        getRestaurantsData()
    }, [address])

    return (
        <>
            <h4 className="header">Results for <strong>{address}</strong></h4>
            <div className="restaurant-container">
                {allRestaurantsInfo.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
            </div>
        </>
    )
}

export default RestaurantPage
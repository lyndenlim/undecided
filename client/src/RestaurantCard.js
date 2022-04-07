import React from 'react'

function RestaurantCard({ restaurant }) {
    console.log(restaurant)
    return (
        <div>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location.display_address[0]}</p>
            <p>{restaurant.location.display_address[1]}</p>
            <p>{restaurant.display_phone}</p>
            <p>{restaurant.price}</p>
            <p>{restaurant.rating} {restaurant.review_count} reviews</p>
            <a href={restaurant.url}>{restaurant.url}</a>
            <img height="300" width="300" src={restaurant.image_url} alt="restaurant-images" />
        </div>
    )
}

export default RestaurantCard
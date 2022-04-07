import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard({ restaurant }) {
    return (
        <Link to={`/restaurants/${restaurant.id}`} className="link">
            <div className="restaurant-card">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]}</p>
                <p>{(restaurant.distance / 1609).toFixed(2)} miles</p>
                <p>{restaurant.price}</p>
                {restaurant.categories.map(category => <p key={category.title}>{category.title}</p>)}
                <p>{restaurant.rating} {restaurant.review_count} reviews</p>
                {/* <a href={restaurant.url}>{restaurant.url}</a> */}
                <img height="300" width="300" src={restaurant.image_url} alt="restaurant-images" />
            </div>
        </Link>
    )
}

export default RestaurantCard
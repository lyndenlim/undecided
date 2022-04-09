import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="link">
                <h3>{restaurant.name}</h3>
                <img height="300" width="300" src={restaurant.image_url} alt="restaurant-images" />
                <p>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]}</p>
                <p>{(restaurant.distance / 1609).toFixed(2)} miles</p>
                <p><strong>{restaurant.price}</strong></p>
                <p>{restaurant.rating} {restaurant.review_count} reviews</p>
                {restaurant.categories.map(category => <p key={category.title} className="category">{category.title}</p>)}
                {/* <a href={restaurant.url}>{restaurant.url}</a> */}
            </Link>
        </div>
    )
}

export default RestaurantCard
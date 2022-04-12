import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="link">
                <div className="wrapper">
                    <div className="cols">
                        <div className="col">
                            <div className="container">
                                <div className="front" style={{ backgroundImage: `url(${restaurant.image_url})` }}>
                                    <div className="inner">
                                        <p className="restaurant-card-restaurant-name">{restaurant.name}</p>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="inner">
                                        <p>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]}</p>
                                        <p>{(restaurant.distance / 1609).toFixed(2)} miles</p>
                                        <p>{restaurant.rating} {restaurant.review_count} reviews</p>
                                        <div>{restaurant.price} • {restaurant.categories.map(category => <p key={category.title} className="category">{category.title}</p>)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RestaurantCard
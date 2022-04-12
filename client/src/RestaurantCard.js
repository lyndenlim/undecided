import React from 'react'
import { Link } from 'react-router-dom'
import ReactStarsRating from 'react-awesome-stars-rating';

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="link">
                <div className="wrapper">
                    <div className="cols">
                        <div className="col">
                            <div className="restaurant-card-container">
                                <div className="front" style={{ backgroundImage: `url(${restaurant.image_url})` }}>
                                    <div className="inner">
                                        <p className="restaurant-card-restaurant-name">{restaurant.name}</p>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="inner restaurant-card-back">
                                        <p>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]}</p>
                                        <p>{(restaurant.distance / 1609).toFixed(2)} miles</p>
                                        <p><ReactStarsRating value={restaurant.rating} isEdit={false} /> </p>
                                        <p>{restaurant.review_count} reviews</p>
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
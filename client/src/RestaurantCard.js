import React from 'react'
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card"

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="link">
                {/* revisit, uniform card formatting */}
                <Card>
                    <Card.Header>
                        <h4>
                            <strong>
                                {restaurant.name}
                            </strong>
                        </h4>
                    </Card.Header>
                    <Card.Img height="300px" width="300px" src={restaurant.image_url} alt="restaurant-images" />
                    <Card.Body>
                        <p>{restaurant.location.display_address[0]} {restaurant.location.display_address[1]}</p>
                        <p>{(restaurant.distance / 1609).toFixed(2)} miles</p>
                        <p>{restaurant.rating} {restaurant.review_count} reviews</p>
                        <div><strong>{restaurant.price}</strong> • {restaurant.categories.map(category => <p key={category.title} className="category">{category.title}</p>)}</div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default RestaurantCard
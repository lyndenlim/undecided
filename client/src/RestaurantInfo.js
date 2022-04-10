import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"
import Card from "react-bootstrap/Card"
import ListGroupItem from "react-bootstrap/ListGroupItem"

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantURL, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview }) {
    return (
        <div className="restaurant-centering">
            <Card className="restaurant-info-card">
                <div className="restaurant-info-container">
                    <div className="restaurant-photos">
                        {restaurantPhotos.map(photo => <img key={photo} src={photo} alt="restaurant" />)}
                    </div>
                    {/* revisit for positioning */}
                    <Card.ImgOverlay className="restaurant-overlay">
                        <h1 className="bold">{restaurantName}</h1>
                        <div>{restaurantRating} <span className="bold">{restaurantReviewCount} reviews</span></div>
                        <div className="bold">{restaurantPrice} • {restaurantCategories.map(category => <p key={category.title} className="category">{category.title} </p>)}</div>
                        {/* revisit for category separation */}
                        <div className="status">{isOpen ? <strong style={{ color: "#00a16d" }}>OPEN</strong> : <strong style={{ color: "red" }}>CLOSED</strong>}</div>
                    </Card.ImgOverlay>
                    <hr />
                    <h4 className="restaurant-header">Location & Hours</h4>
                    <div className="location-hours">
                        <div>
                            <Map restaurantAddress={restaurantAddress} />
                        </div>
                        <div className="hours">
                            {restaurantHours.map(day => <ListGroupItem key={day.day} className="hour-list">{day.day} {day.start} - {day.end}</ListGroupItem>)}
                        </div>
                        <Card>
                            MAKE A RESERVATION
                            <p>CALL AHEAD {restaurantPhoneNumber}</p>
                        </Card>
                    </div>
                    {/* <a href={restaurantURL}>{restaurantURL}</a> */}
                    <hr />
                    <h4 className="restaurant-header">Reviews</h4>
                    {user ? <Link to={`/writereview/${id}`}>
                        <button className="review-button">Write a Review</button>
                    </Link> : null}
                    <br />
                    {restaurantReviews.map(review => <YelpReview key={review.id} review={review} />)}
                    {userRestaurantReviews.map(review => <UserReview key={review.id} review={review} user={user} removeDeletedReview={removeDeletedReview} />)}
                </div>
            </Card>
        </div>
    )
}

export default RestaurantInfo
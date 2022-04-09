import React from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantURL, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview }) {
    return (
        <>
            <div className="restaurant-info-container">
                <div className="restaurant-photos">
                    {restaurantPhotos.map(photo => <img width="100%" key={photo} src={photo} alt="restaurant" className="d-block w-100" />)}
                </div>
                <h3>{restaurantName}</h3>
                <p>{restaurantRating} {restaurantReviewCount} reviews • <strong>{restaurantPrice}</strong></p>
                {/* revisit for category separation */}
                <p>{isOpen ? <strong>OPEN</strong> : <strong>CLOSED</strong>}</p>
                <p>{restaurantPhoneNumber}</p>
                {restaurantCategories.map(category => <p key={category.title} className="category">{category.title} </p>)}
                HOURS
                {restaurantHours.map(day => <li key={day.day} className="hour-list">{day.day} {day.start} - {day.end}</li>)}
                {/* <a href={restaurantURL}>{restaurantURL}</a> */}
                <br />
                <Map restaurantAddress={restaurantAddress} />
                {user ? <Link to={`/writereview/${id}`}>
                    <button>Write a Review</button>
                </Link> : null}
                <br />
                <br />
                {restaurantReviews.map(review => <YelpReview key={review.id} review={review} />)}
                {userRestaurantReviews.map(review => <UserReview key={review.id} review={review} user={user} removeDeletedReview={removeDeletedReview} />)}
            </div>
        </>
    )
}

export default RestaurantInfo
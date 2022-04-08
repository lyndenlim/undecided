import React from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantURL, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview }) {
    return (
        <div>
            <h3>{restaurantName}</h3>
            <p>{restaurantRating} {restaurantReviewCount} reviews</p>
            <p>{restaurantPrice}</p>
            {restaurantCategories.map(category => <p key={category.title}>{category.title} </p>)}
            <p>{isOpen ? 'OPEN' : 'CLOSED'}</p>
            HOURS
            {restaurantHours.map(day => <p key={day.day}>{day.day} {day.start} {day.end}</p>)}
            <p>{restaurantPhoneNumber}</p>
            <a href={restaurantURL}>{restaurantURL}</a>
            {restaurantPhotos.map(photo => <img key={photo} height="300px" width="300px" src={photo} alt="restaurant" />)}
            <br />
            <Map restaurantAddress={restaurantAddress} />
            <br />
            {user ? <Link to={`/writereview/${id}`}>
                <button>Write a Review</button>
            </Link> : null}
            <br />
            {restaurantReviews.map(review => <YelpReview key={review.id} review={review} />)}
            {userRestaurantReviews.map(review => <UserReview key={review.id} review={review} user={user} removeDeletedReview={removeDeletedReview} />)}
        </div>
    )
}

export default RestaurantInfo
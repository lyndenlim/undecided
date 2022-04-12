import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"
import Card from "react-bootstrap/Card"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePen } from "@fortawesome/free-solid-svg-icons"
import ReactStarsRating from 'react-awesome-stars-rating';

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantURL, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="restaurant-centering">
            <Card className="restaurant-info-card">
                <div className="restaurant-info-container">
                    <div className="restaurant-photos">
                        {restaurantPhotos.map(photo => <img style={{ width: "100%" }} key={photo} src={photo} alt="restaurant" />)}
                    </div>
                    {/* revisit for positioning */}
                    <Card.ImgOverlay className="restaurant-overlay">
                        <h1 className="bold">{restaurantName}</h1>
                        <div><ReactStarsRating className="star-rating" value={restaurantRating} isEdit={false} /></div>
                        <div><span className="bold">{restaurantReviewCount} reviews</span></div>
                        <div className="bold">{restaurantPrice} • {restaurantCategories.map(category => <p key={category.title} className="category">{category.title} </p>)}</div>
                        {/* revisit for category separation */}
                        <div className="status">{isOpen ? <strong className="open">OPEN</strong> : <strong className="closed">CLOSED</strong>}</div>
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
                            {/* <a href={restaurantURL}>{restaurantURL}</a> */}
                        </Card>
                    </div>
                    <hr />
                    <h4 className="restaurant-header">Reviews</h4>
                    {user ? <Link to={`/writereview/${id}`}>
                        <Button className="review-button">Write a Review &nbsp;<FontAwesomeIcon icon={faFilePen} /></Button>
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
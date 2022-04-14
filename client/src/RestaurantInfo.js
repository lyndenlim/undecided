import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"
import Transaction from "./Transaction"
import Hours from "./Hours"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePen, faPhone } from "@fortawesome/free-solid-svg-icons"
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactLoading from 'react-loading';

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview, isLoading, restaurantTransactions }) {
    const [openHour, setOpenHour] = useState("")
    const [closeHour, setCloseHour] = useState("")

    useEffect(() => {
        const todaysDate = new Date()
        const todaysDay = todaysDate.getDay()

        async function getTodayHours() {
            const todaysHours = await restaurantHours.filter(hour => hour.day === todaysDay)[0]

            if (parseInt(todaysHours.start) > 1200) {
                setOpenHour(`${todaysHours.start.slice(0, 2) - 12}:${todaysHours.start.slice(2, 4)} PM`)
            } else if (parseInt(todaysHours.start) < 1200 && parseInt(todaysHours.start) !== 0) {
                setOpenHour(`${todaysHours.start.slice(0, 2)}:${todaysHours.start.slice(2, 4)} AM`)
            } else if (todaysHours.start === "0000") {
                setOpenHour("12:00 AM")
            } else if (todaysHours.start === "1200") {
                setOpenHour("12:00 PM")
            }

            if (parseInt(todaysHours.end) > 12) {
                setCloseHour(`${todaysHours.end.slice(0, 2) - 12}:${todaysHours.end.slice(2, 4)} PM`)
            } else if (parseInt(todaysHours.end) < 12 && parseInt(todaysHours.end) !== 0) {
                setCloseHour(`${todaysHours.end.slice(0, 2)}:${todaysHours.end.slice(2, 4)} AM`)
            } else if (todaysHours.end === "0000") {
                setCloseHour("12:00 AM")
            } else if (todaysHours.end === "1200") {
                setOpenHour("12:00 PM")
            }
        }

        window.scrollTo(0, 0)

        getTodayHours()
    }, [isLoading])

    return (
        <>
            {isLoading ?
                <ReactLoading type="spinningBubbles" color="black" className="spinner-bubbles" />
                :
                <div className="restaurant-centering">
                    <Card className="restaurant-info-card">
                        <div className="restaurant-info-container">
                            <div className="restaurant-photos">
                                {restaurantPhotos.map(photo => <img width="100%" key={photo} src={photo} alt="restaurant" />)}
                            </div>
                            <Card.ImgOverlay className="restaurant-overlay">
                                <h1 className="bold">{restaurantName}</h1>
                                <div><ReactStarsRating className="star-rating" value={restaurantRating} isEdit={false} /></div>
                                <div>
                                    <span className="bold">{restaurantReviewCount} reviews</span>
                                </div>
                                <div className="bold">{restaurantPrice ? `${restaurantPrice} •` : null} {restaurantCategories.map(category => <p key={category.title} className="category">{category.title} </p>)}</div>
                                {/* revisit for category separation */}
                                <div className="status">{isOpen ? <strong className="open">OPEN</strong> : <strong className="closed">CLOSED</strong>} &nbsp;&nbsp;<span className="bold">{openHour} - {closeHour}</span></div>
                            </Card.ImgOverlay>
                            <hr />
                            <h4 className="restaurant-header">Location & Hours</h4>
                            <div className="location-hours">
                                <div>
                                    <Map restaurantAddress={restaurantAddress} />
                                </div>
                                <div className="hours-container">
                                    <div className="hours">
                                        {restaurantHours.map(day => <Hours key={day.day} day={day} />)}
                                        <small>Hours subject to change. For more accuracy, check the restaurant's website.</small>
                                    </div>
                                </div>
                                <div className="overall-contact-container">
                                    <div className="contact-container">
                                        <p>
                                            <FontAwesomeIcon icon={faPhone} />
                                            &nbsp;
                                            <strong>{restaurantPhoneNumber ? restaurantPhoneNumber : "No phone number provided"}</strong>
                                        </p>
                                        <br />
                                        {restaurantTransactions.map(transaction => <Transaction key={transaction} transaction={transaction} />)}
                                    </div>
                                </div>
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
            }
        </>
    )
}

export default RestaurantInfo
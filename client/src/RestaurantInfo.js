import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Map from './Map'
import YelpReview from "./YelpReview"
import UserReview from "./UserReview"
import Transaction from "./Transaction"
import Hours from "./Hours"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePen, faPhone, faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactLoading from 'react-loading';
import { send } from "@emailjs/browser"
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

function RestaurantInfo({ restaurantName, restaurantReviews, restaurantRating, restaurantPrice, restaurantCategories, restaurantHours, restaurantPhoneNumber, restaurantAddress, restaurantPhotos, userRestaurantReviews, user, isOpen, id, restaurantReviewCount, removeDeletedReview, isLoading, restaurantTransactions }) {
    const [openHour, setOpenHour] = useState("")
    const [closeHour, setCloseHour] = useState("")
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [toName, setToName] = useState("")
    const [message, setMessage] = useState("")
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const todaysDate = new Date()
        const todaysDay = todaysDate.getDay()

        async function getTodayHours() {
            const todaysHours = await restaurantHours.filter(hour => hour.day === todaysDay)[0]

            if (parseInt(todaysHours.start) > 1200) {
                setOpenHour(`${todaysHours.start.slice(0, 2) - 12}:${todaysHours.start.slice(2, 4)} PM`)
            } else if (parseInt(todaysHours.start) >= 1000 && parseInt(todaysHours.start) < 1200 && parseInt(todaysHours.start) !== 0) {
                setOpenHour(`${todaysHours.start.slice(0, 2)}:${todaysHours.start.slice(2, 4)} AM`)
            } else if (parseInt(todaysHours.start) < 1000 && parseInt(todaysHours.start) !== 0) {
                setOpenHour(`${todaysHours.start.slice(1, 2)}:${todaysHours.start.slice(2, 4)} AM`)
            } else if (todaysHours.start === "0000") {
                setOpenHour("12:00 AM")
            } else if (todaysHours.start === "1200") {
                setOpenHour("12:00 PM")
            }

            if (parseInt(todaysHours.end) > 1200) {
                setCloseHour(`${todaysHours.end.slice(0, 2) - 12}:${todaysHours.end.slice(2, 4)} PM`)
            } else if (parseInt(todaysHours.end) >= 1000 && parseInt(todaysHours.end) < 1200 && parseInt(todaysHours.end) !== 0) {
                setCloseHour(`${todaysHours.end.slice(0, 2)}:${todaysHours.end.slice(2, 4)} AM`)
            } else if (parseInt(todaysHours.end) < 1000 && parseInt(todaysHours.end) !== 0) {
                setCloseHour(`${todaysHours.end.slice(1, 2)}:${todaysHours.end.slice(2, 4)} AM`)
            } else if (todaysHours.end === "0000") {
                setCloseHour("12:00 AM")
            } else if (todaysHours.end === "1200") {
                setOpenHour("12:00 PM")
            }
        }

        window.scrollTo(0, 0)

        getTodayHours()
    }, [isLoading])

    function sendEmail(e) {
        e.preventDefault()
        send(
            process.env.REACT_APP_EMAIL_SERVICE_ID,
            process.env.REACT_APP_EMAIL_TEMPLATE_ID,
            {
                from_name: `${user.first_name.slice(0, 1).toUpperCase()}${user.first_name.slice(1, user.first_name.length)}`,
                email: email,
                to_name: `${toName.slice(0, 1).toUpperCase()}${toName.slice(1, toName.length)}`,
                restaurant: restaurantName,
                location: restaurantAddress,
                open_hour: openHour,
                close_hour: closeHour,
                category: restaurantCategories.map(category => category.title).toString(),
                message: message,
                google_maps_format: restaurantAddress.replace(/\s/g, "+")
            },
            process.env.REACT_APP_EMAIL_PUBLIC_KEY
        )
            .then((r) => {
                if (r.status === 200) {
                    setEmail("")
                    setToName("")
                    setMessage("")
                    setShowSuccess(true)
                    toast.success("Email successfully sent!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    setShowError(true)
                    toast.error("Something went wrong, try again later.", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
            .catch(() => {
                setShowError(true)
                toast.error("Something went wrong, try again later.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })

        handleClose()
    }

    return (
        <>
            {isLoading ?
                <ReactLoading type="spinningBubbles" color="black" className="spinner-bubbles" />
                :
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="restaurant-centering">
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
                                <div className="bold">{restaurantPrice ? `${restaurantPrice} •` : null} {restaurantCategories.map(category => <p key={category.title} className="category">{category.title}</p>)}</div>
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
                                        <br />
                                        <Button style={{ background: "transparent", border: "1px solid black", color: "black" }} onClick={handleShow}>Share this restaurant &nbsp;<FontAwesomeIcon icon={faShareFromSquare} /></Button>
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

                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Share this restaurant</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={sendEmail}>
                            <Modal.Body>
                                <FloatingLabel label="Receipient email address">
                                    <Form.Control required autoComplete="new-password" className="email-inputs" value={email} onChange={e => setEmail(e.target.value)} />
                                </FloatingLabel>
                                <br />
                                <FloatingLabel label="Receipient name">
                                    <Form.Control required autoComplete="new-password" className="email-inputs" value={toName} onChange={e => setToName(e.target.value)} />
                                </FloatingLabel>
                                <br />
                                <FloatingLabel label="Message">
                                    <Form.Control className="email-message" value={message} as="textarea" onChange={e => setMessage(e.target.value)} />
                                </FloatingLabel>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="send-email-button" type="submit">
                                    Send Email
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                    {showError ?
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        :
                        null}
                    {showSuccess ?
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        :
                        null}
                </motion.div>
            }
        </>
    )
}

export default RestaurantInfo
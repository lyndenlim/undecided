import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ReactStarsRating from 'react-awesome-stars-rating';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Placeholder from 'react-bootstrap/Placeholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function AccountReview({ user, review, removeDeletedReview }) {
    const [name, setName] = useState("")
    const [dateCreated, setDateCreated] = useState("")
    const [isEditable, setIsEditable] = useState(false)
    const [newRating, setNewRating] = useState(review.rating)
    const [newComment, setNewComment] = useState(review.text)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getRestaurantName() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const dateSplit = review.created_at.split("T")[0].split("-")
            const reformattedDate = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`
            axiosInstance.get(`/yelp_restaurant?restaurant_id=${review.restaurant_id}&api_key=${process.env.REACT_APP_YELP_API_KEY}`)
                .then(restaurantInfo => {
                    setName(restaurantInfo.data.name)
                    setDateCreated(reformattedDate)
                    setTimeout(setIsLoading, 1000, false)
                })
        }
        getRestaurantName()
    }, [])

    function handleDelete() {
        axios.delete(`/reviews/${review.id}`)
            .then(() => removeDeletedReview(review.id))
    }

    function handleCancel() {
        setNewRating(review.rating)
        setNewComment(review.text)
        setIsEditable(false)
    }

    function handleEdit(e) {
        axios.patch(`/reviews/${review.id}`, {
            rating: newRating,
            comment: newComment
        })
    }

    const renderTooltipDelete = (props) => (
        <Tooltip id="delete-button-tooltip" {...props}>
            Delete
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip id="edit-button-tooltip" {...props}>
            Edit
        </Tooltip>
    );

    const renderTooltipCancel = (props) => (
        <Tooltip id="cancel-button-tooltip" {...props}>
            Cancel
        </Tooltip>
    );

    return (
        <div>
            <Link to={`/restaurants/${review.restaurant_id}`} className="link">
                {isLoading ?
                    <Placeholder as="p" animation="glow" style={{ width: "25%" }}>
                        <Placeholder xs={12} />
                    </Placeholder>
                    :
                    <h4>{name}</h4>}
            </Link>
            <p>{dateCreated}</p>
            {isEditable ?
                <>
                    <form onSubmit={handleEdit}>
                        <div>
                            <ReactStarsRating value={newRating} onChange={e => setNewRating(e)} />
                        </div>
                        <br />
                        <div>
                            {/* revisit for height autosizing to content */}
                            <Form.Control as="textarea" className="edit-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}>{review.comment}</Form.Control>
                        </div>
                        <br />
                        <Button className="review-submit-button" type="submit">Submit Changes</Button>
                    </form>
                    <br />
                </>
                :
                <>
                    <p><ReactStarsRating className="star-rating" value={review.rating} isEdit={false} /></p>
                    <p>{review.comment}</p>
                </>
            }
            {user.id === review.user_id ?
                <>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 0 }}
                        overlay={renderTooltipDelete}
                    >
                        <button className="delete-button" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </OverlayTrigger>
                    {isEditable ?
                        <>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 0, hide: 0 }}
                                overlay={renderTooltipCancel}
                            >
                                <button className="cancel-button" onClick={handleCancel}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </OverlayTrigger>
                        </>
                        :
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 0, hide: 0 }}
                            overlay={renderTooltipEdit}
                        >
                            <button className="edit-button" onClick={() => setIsEditable(true)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </OverlayTrigger>
                    }
                </>
                :
                null}
            <hr />
        </div>
    )
}

export default AccountReview
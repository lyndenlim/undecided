import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Form from "react-bootstrap/Form"
import defaultProfilePicture from "./defaultProfilePicture/defaultProfilePicture.png"

function UserReview({ review, user, removeDeletedReview }) {
    const [dateCreated, setDateCreated] = useState("")
    const [isEditable, setIsEditable] = useState(false)
    const [newRating, setNewRating] = useState(review.rating)
    const [newComment, setNewComment] = useState(review.text)

    useEffect(() => {
        const dateSplit = review.created_at.split("T")[0].split("-")
        const reformattedDate = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`
        setDateCreated(reformattedDate)
    }, [])

    function handleDelete() {
        axios.delete(`/reviews/${review.id}`)
        removeDeletedReview(review.id)
    }

    function handleCancel() {
        setNewRating(review.rating)
        setNewComment(review.text)
        setIsEditable(false)
    }

    function handleEdit(e) {
        // get to rerender without this 
        // e.preventDefault()
        axios.patch(`/reviews/${review.id}`, {
            rating: parseInt(newRating),
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
        <>
            <img
                className="profile-picture"
                height="75px"
                width="75px"
                src={review.user.profile_picture !== null ? review.user.profile_picture : defaultProfilePicture}
                alt="user-avatar" />
            <h5>
                {review.user.first_name.slice(0, 1).toUpperCase()}{review.user.first_name.slice(1, review.user.first_name.length)} {review.user.last_name.slice(0, 1).toUpperCase()}.
            </h5>
            <p>{dateCreated}</p>
            {isEditable ?
                <>
                    <form onSubmit={handleEdit}>
                        <div>
                            <Form.Select style={{ width: "fit-content" }} defaultValue={newRating} onChange={e => setNewRating(e.target.value)}>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </Form.Select>
                        </div>
                        <br />
                        <div>
                            {/* revisit for height autosizing to content */}
                            <Form.Control as="textarea" className="edit-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}>{review.comment}</Form.Control>
                        </div>
                        <br />
                        <button type="submit">SUBMIT CHANGES</button>
                    </form>
                    <br />
                </>
                :
                <>
                    <p>{review.rating}</p>
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
        </>
    )
}

export default UserReview
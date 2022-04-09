import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    return (
        <>
            <img
                className="profile-picture"
                height="75px"
                width="75px"
                src={review.user.profile_picture !== null ? review.user.profile_picture : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
                alt="user-avatar" />
            <h5>
                {review.user.first_name.slice(0, 1).toUpperCase()}{review.user.first_name.slice(1, review.user.first_name.length)} {review.user.last_name.slice(0, 1).toUpperCase()}.
            </h5>
            <p>{dateCreated}</p>
            {isEditable ?
                <>
                    <form onSubmit={handleEdit}>
                        <select defaultValue={newRating} onChange={e => setNewRating(e.target.value)}>
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                        <textarea value={newComment} onChange={e => setNewComment(e.target.value)}>{review.comment}</textarea>
                        <button type="submit">SUBMIT CHANGES</button>
                    </form>
                </>
                :
                <>
                    <p>{review.rating}</p>
                    <p>{review.comment}</p>
                </>
            }
            {user.id === review.user_id ? <><button onClick={handleDelete}>DELETE</button>{isEditable ? <><button onClick={handleCancel}>CANCEL</button></> : <button onClick={() => setIsEditable(true)}>EDIT</button>}</> : null}
            <hr />
        </>
    )
}

export default UserReview
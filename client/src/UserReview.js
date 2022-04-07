import React, { useEffect, useState } from 'react'

function UserReview({ review }) {
    const [dateCreated, setDateCreated] = useState("")

    useEffect(() => {
        const dateSplit = review.created_at.split("T")[0].split("-")
        const reformattedDate = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`
        setDateCreated(reformattedDate)
    })

    return (
        <>
            <img
                height="75px"
                width="75px"
                src={review.user.profile_picture !== null ? review.user.profile_picture : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
                alt="user-avatar" />
            <h5>
                {review.user.first_name.slice(0, 1).toUpperCase()}{review.user.first_name.slice(1, review.user.first_name.length)} {review.user.last_name.slice(0, 1).toUpperCase()}.
            </h5>
            <p>{dateCreated}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
            <hr />
        </>
    )
}

export default UserReview
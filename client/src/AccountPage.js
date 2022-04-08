import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountReview from "./AccountReview"

function AccountPage({ user }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function getUserReviews() {
            const userReviews = await axios.get(`/users/${user.id}`)

            setReviews(userReviews.data.reviews)
        }
        getUserReviews()
    }, [])

    console.log(reviews)

    return (
        <div>
            {<img height="200px" width="200px" src={user.profile_picture !== null ? user.profile_picture : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"} alt="profile-picture" />}
            <h4>{user.first_name.slice(0, 1).toUpperCase()}{user.first_name.slice(1, user.first_name.length)} {user.last_name.slice(0, 1).toUpperCase()}.</h4>
            {reviews.map((review, index) => <AccountReview key={index} review={review} />)}
        </div>
    )
}

export default AccountPage
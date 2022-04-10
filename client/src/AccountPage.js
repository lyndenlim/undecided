import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountReview from "./AccountReview"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"

function AccountPage({ user }) {
    console.log(user)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function getUserReviews() {
            const userReviews = await axios.get(`/users/${user.id}`)

            setReviews(userReviews.data.reviews)
        }
        getUserReviews()
    }, [])

    return (
        <div className="user-container">
            <div className="user-info">
                {<img className="user-profile-picture" src={user.profile_picture !== null ? user.profile_picture : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"} alt="profile-picture" />}
                {user ? <h3><strong>{user.first_name.slice(0, 1).toUpperCase()}{user.first_name.slice(1, user.first_name.length)} {user.last_name.slice(0, 1).toUpperCase()}.</strong></h3> : null}
            </div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Account Settings</Accordion.Header>
                    <Accordion.Body style={{ textAlign: "center" }}>
                        <Button variant="secondary" className="settings-button">Add/edit profile picture</Button>
                        <br />
                        <br />
                        <Button variant="secondary" className="settings-button">Change name</Button>
                        <br />
                        <br />
                        <Button variant="secondary" className="settings-button">Change email</Button>
                        <br />
                        <br />
                        <Button variant="secondary" className="settings-button">Change password</Button>
                        <br />
                        <br />
                        <Button className="delete-account-button">Deactivate account</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>All Reviews ({user ? user.reviews.length : null})</Accordion.Header>
                    <Accordion.Body>{reviews.map((review, index) => <AccountReview key={index} review={review} />)}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default AccountPage
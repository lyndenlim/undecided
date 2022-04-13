import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import AccountReview from "./AccountReview"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import defaultProfilePicture from "./defaultProfilePicture/defaultProfilePicture.png"

function AccountPage({ user, setUser }) {
    const [reviews, setReviews] = useState([])
    const [inputProfilePicture, setInputProfilePicture] = useState(user.profile_picture)
    const [inputFirstName, setInputFirstName] = useState(user.first_name)
    const [inputLastName, setInputLastName] = useState(user.last_name)
    const [oldPassword, setOldPassword] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [inputEmail, setInputEmail] = useState(user.email)
    const [deleteShow, setDeleteShow] = useState(false)
    const history = useHistory()

    const handleDeleteClose = () => setDeleteShow(false)
    const handleDeleteShow = () => setDeleteShow(true)

    useEffect(() => {
        async function getUserReviews() {
            const userReviews = await axios.get(`/users/${user.id}`)

            setReviews(userReviews.data.reviews)
        }
        getUserReviews()
    }, [])

    function changeUserInfo(e) {
        // e.preventDefault()
        if (oldPassword.length === 0 && inputPassword.length === 0 && confirmPassword.length === 0 && inputProfilePicture === undefined) {
            axios.patch(`/users/${user.id}`, {
                first_name: inputFirstName,
                last_name: inputLastName,
                email: inputEmail,
                profile_picture: null
            })
        } else if (oldPassword.length === 0 && inputPassword.length === 0 && confirmPassword.length === 0) {
            axios.patch(`/users/${user.id}`, {
                first_name: inputFirstName,
                last_name: inputLastName,
                email: inputEmail,
                profile_picture: inputProfilePicture
            })
        } else {
            axios.patch(`/users/${user.id}`, {
                first_name: inputFirstName,
                last_name: inputLastName,
                email: inputEmail,
                profile_picture: inputProfilePicture,
                old_password: oldPassword,
                password: inputPassword,
                password_confirmation: confirmPassword
            })
        }
    }

    function handleDeleteAccount() {
        axios.delete(`/users/${user.id}`)
        fetch("/logout", { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                    history.push("/")
                }
            })
    }

    function removeDeletedReview(reviewID) {
        setReviews(reviews.filter(review => review.id !== reviewID))
    }

    return (
        <>
            <div className="user-container">
                <div className="user-info">
                    {<div className="user-profile-picture">
                        <img width="100%" height="fit-content" src={user.profile_picture !== null ? user.profile_picture : defaultProfilePicture} alt="profile-picture" />
                    </div>}
                    {user ?
                        <>
                            <h3>
                                <strong>
                                    {user.first_name.slice(0, 1).toUpperCase()}{user.first_name.slice(1, user.first_name.length)} {user.last_name.slice(0, 1).toUpperCase()}{user.last_name.slice(1, user.last_name.length)}
                                </strong>
                            </h3>
                            <p>{user.email}</p>
                        </>
                        :
                        null}
                </div>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Account</Accordion.Header>
                        <Accordion.Body className="accordion-setting-buttons">
                            <form onSubmit={changeUserInfo}>
                                <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "center" }}>
                                    <div style={{ paddingRight: "10px" }}>
                                        <FloatingLabel label="First Name" className="settings-label">
                                            <Form.Control className="settings-input" required defaultValue={user.first_name} onChange={e => setInputFirstName(e.target.value)} />
                                        </FloatingLabel>
                                        <br />
                                        <FloatingLabel label="Last Name" className="settings-label">
                                            <Form.Control className="settings-input" required defaultValue={user.last_name} onChange={e => setInputLastName(e.target.value)} />
                                        </FloatingLabel>
                                        <br />
                                        <FloatingLabel label="Email" className="settings-label">
                                            <Form.Control className="settings-input" required defaultValue={user.email} onChange={e => setInputEmail(e.target.value)} />
                                        </FloatingLabel>
                                        <br />
                                        <FloatingLabel label="Image URL" className="settings-label">
                                            <Form.Control className="settings-input" defaultValue={user.profile_picture} onChange={e => setInputProfilePicture(e.target.value)} />
                                        </FloatingLabel>
                                    </div>
                                    <div style={{ paddingLeft: "10px" }}>
                                        <FloatingLabel label="Old Password" className="settings-label">
                                            <Form.Control type="password" className="settings-input" onChange={e => setOldPassword(e.target.value)} />
                                        </FloatingLabel>
                                        <br />
                                        <FloatingLabel label="New Password" className="settings-label">
                                            <Form.Control type="password" className="settings-input" onChange={e => setInputPassword(e.target.value)} />
                                        </FloatingLabel>
                                        <br />
                                        <FloatingLabel label="Confirm Password" className="settings-label">
                                            <Form.Control type="password" className="settings-input" onChange={e => setConfirmPassword(e.target.value)} />
                                        </FloatingLabel>
                                    </div>
                                </div>
                                <br />
                                <Button type="submit" variant="secondary">Save changes</Button>
                            </form>
                            <br />
                            <Button className="delete-account-button" onClick={handleDeleteShow}>Deactivate account</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>All Reviews ({user ? user.reviews.length : null})</Accordion.Header>
                        <Accordion.Body>{reviews.map((review, index) => <AccountReview key={index} review={review} removeDeletedReview={removeDeletedReview} user={user} />)}</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <Modal show={deleteShow} onHide={handleDeleteClose} centered={true} className="delete-modal" size="md">
                <Modal.Header>
                    <Modal.Title>Are you sure you want to deactivate this account?</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="delete-account-buttons">
                    <Button variant="danger" onClick={handleDeleteAccount}>Yes</Button><Button variant="secondary" onClick={() => setDeleteShow(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AccountPage
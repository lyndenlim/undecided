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
    const [profilePictureShow, setProfilePictureShow] = useState(false)
    const [inputProfilePicture, setInputProfilePicture] = useState("")
    const [nameShow, setNameShow] = useState(false)
    const [inputFirstName, setInputFirstName] = useState("")
    const [inputLastName, setInputLastName] = useState("")
    const [passwordShow, setPasswordShow] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailShow, setEmailShow] = useState(false)
    const [inputEmail, setInputEmail] = useState("")
    const [deleteShow, setDeleteShow] = useState(false)
    const history = useHistory()

    const handleProfilePictureClose = () => setProfilePictureShow(false)
    const handleProfilePictureShow = () => setProfilePictureShow(true)
    const handleNameClose = () => setNameShow(false)
    const handleNameShow = () => setNameShow(true)
    const handlePasswordClose = () => setPasswordShow(false)
    const handlePasswordShow = () => setPasswordShow(true)
    const handleEmailClose = () => setEmailShow(false)
    const handleEmailShow = () => setEmailShow(true)
    const handleDeleteClose = () => setDeleteShow(false)
    const handleDeleteShow = () => setDeleteShow(true)

    useEffect(() => {
        async function getUserReviews() {
            const userReviews = await axios.get(`/users/${user.id}`)

            setReviews(userReviews.data.reviews)
        }
        getUserReviews()
    }, [])

    function handleProfilePictureChange(e) {
        // e.preventDefault()
        axios.patch(`/users/${user.id}`, {
            profile_picture: inputProfilePicture
        })
    }

    function handleNameChange(e) {
        // e.preventDefault()
        if (inputFirstName && inputLastName) {
            axios.patch(`/users/${user.id}`, {
                first_name: inputFirstName,
                last_name: inputLastName
            })
        } else if (inputFirstName && !inputLastName) {
            axios.patch(`/users/${user.id}`, {
                first_name: inputFirstName
            })
        } else if (!inputFirstName && inputLastName) {
            axios.patch(`/users/${user.id}`, {
                last_name: inputLastName
            })
        }
    }

    function handlePasswordChange(e) {
        // e.preventDefault()
        axios.patch(`/users/${user.id}`, {
            old_password: oldPassword,
            password: inputPassword,
            password_confirmation: confirmPassword
        })
    }

    function handleEmailChange(e) {
        // e.preventDefault()
        axios.patch(`/users/${user.id}`, {
            email: inputEmail
        })
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

    return (
        <>
            <div className="user-container">
                <div className="user-info">
                    {<img className="user-profile-picture" src={user.profile_picture !== null ? user.profile_picture : defaultProfilePicture} alt="profile-picture" />}
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
                        <Accordion.Header>Account Settings</Accordion.Header>
                        <Accordion.Body style={{ textAlign: "center" }}>
                            <Button variant="secondary" className="settings-button" onClick={handleProfilePictureShow}>Add/edit profile picture</Button>
                            <br />
                            <br />
                            <Button variant="secondary" className="settings-button" onClick={handleNameShow}>Change name</Button>
                            <br />
                            <br />
                            <Button variant="secondary" className="settings-button" onClick={handleEmailShow}>Change email</Button>
                            <br />
                            <br />
                            <Button variant="secondary" className="settings-button" onClick={handlePasswordShow}>Change password</Button>
                            <br />
                            <br />
                            <Button className="delete-account-button" onClick={handleDeleteShow}>Deactivate account</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>All Reviews ({user ? user.reviews.length : null})</Accordion.Header>
                        <Accordion.Body>{reviews.map((review, index) => <AccountReview key={index} review={review} />)}</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <Modal show={profilePictureShow} onHide={handleProfilePictureClose} centered={true} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Change profile picture</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleProfilePictureChange}>
                    <Modal.Body>
                        <FloatingLabel label="Image URL" className="settings-label">
                            <Form.Control className="settings-input" required onChange={e => setInputProfilePicture(e.target.value)} />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save Changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={nameShow} onHide={handleNameClose} centered={true} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Change name</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleNameChange}>
                    <Modal.Body>
                        <FloatingLabel label="First name" className="settings-label">
                            <Form.Control className="settings-input" onChange={e => setInputFirstName(e.target.value)} />
                        </FloatingLabel>
                        <br />
                        <FloatingLabel label="Last name" className="login-label">
                            <Form.Control className="settings-input" onChange={e => setInputLastName(e.target.value)} />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save Changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={emailShow} onHide={handleEmailClose} centered={true} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Change email</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleEmailChange}>
                    <Modal.Body>
                        <FloatingLabel label="Email" className="settings-label">
                            <Form.Control type="email" required className="settings-input" onChange={e => setInputEmail(e.target.value)} />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save Changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={passwordShow} onHide={handlePasswordClose} centered={true} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <form onSubmit={handlePasswordChange}>
                    <Modal.Body>
                        <FloatingLabel label="Old password" className="settings-label">
                            <Form.Control type="password" className="settings-input" required onChange={e => setOldPassword(e.target.value)} />
                        </FloatingLabel>
                        <br />
                        <FloatingLabel label="New password" className="settings-label">
                            <Form.Control type="password" className="settings-input" required onChange={e => setInputPassword(e.target.value)} />
                        </FloatingLabel>
                        <br />
                        <FloatingLabel label="Confirm password" className="settings-label">
                            <Form.Control type="password" className="settings-input" required onChange={e => setConfirmPassword(e.target.value)} />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save Changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={deleteShow} onHide={handleDeleteClose} centered={true} style={{ textAlign: 'center' }} size="md">
                <Modal.Header>
                    <Modal.Title>Are you sure you want to deactivate this account?</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ margin: 'auto' }}>
                    <Button variant="danger" onClick={handleDeleteAccount}>Yes</Button><Button variant="secondary" onClick={() => setDeleteShow(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AccountPage
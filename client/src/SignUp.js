import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Button from "react-bootstrap/Button"
import signup from "./signupImage/signup.jpg"
import { ToastContainer, toast } from 'react-toastify';

function SignUp({ setUser }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showError, setShowError] = useState(false);
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password, password_confirmation: confirmPassword }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
                history.push("/")
            } else {
                r.json().then((err) => {
                    setShowError(true)
                    toast.error(err.errors[0], {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
            }
        });
    }

    return (
        <div className="signup-container">
            <div className="col-8"><img height="100%" width="100%" src={signup} alt="signup-display" /></div>
            <div className="col-4 signup-column">
                <h4>Sign Up</h4>
                <br />
                <form onSubmit={handleSubmit} >
                    <FloatingLabel label="First Name" className="signup-label">
                        <Form.Control className="signup-input" placeholder="first name" required autoComplete="new-password" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Last Name" className="signup-label">
                        <Form.Control className="signup-input" placeholder="last name" required autoComplete="new-password" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Email" className="signup-label">
                        <Form.Control className="signup-input" placeholder="email" type="email" required autoComplete="new-password" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Password" className="signup-label">
                        <Form.Control className="signup-input" placeholder="password" required type="password" autoComplete="new-password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Confirm Password" className="signup-label">
                        <Form.Control className="signup-input" placeholder="confirm password" required type="password" autoComplete="new-password" defaultValue={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <Button size="lg" className="signup-button" type="submit">Sign Up</Button>
                </form>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
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
        </div>
    )
}

export default SignUp
import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"


function SignUp({ setUser }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
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
            }
        });
    }

    return (
        <div className="signup-container">
            <div className="col-8"><img height="100%" width="100%" src="https://www.lironboylston.com/wp-content/uploads/2020/12/WBC_7095.jpg" alt="signup-display" /></div>
            <div className="col-4 signup-column">
                <form onSubmit={handleSubmit}>
                    {/* <div className="name-inputs"> */}
                    <FloatingLabel label="First Name" className="signup-label">
                        <Form.Control className="signup-input" placeholder="first name" autoComplete="off" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Last Name" className="signup-label">
                        <Form.Control className="signup-input" placeholder="last name" autoComplete="off" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                    </FloatingLabel>
                    {/* </div> */}
                    <br />
                    <FloatingLabel label="Email" className="signup-label">
                        <Form.Control className="signup-input" placeholder="email" autoComplete="off" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Password" className="signup-label">
                        <Form.Control className="signup-input" placeholder="password" autoComplete="off" type="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Confirm Password" className="signup-label">
                        <Form.Control className="signup-input" placeholder="confirm password" autoComplete="off" type="password" defaultValue={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </div>
    )
}

export default SignUp
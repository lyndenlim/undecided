import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Button from "react-bootstrap/Button"
import login from "./loginImage/login.jpg"
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

function LogIn({ setUser, setReviewCount }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false);
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then(user => {
                    setUser(user)
                    setReviewCount(user.reviews.length)
                })
                history.push("/homepage")
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
        <div className="login-container">
            <div className="col-8"><img height="fit-container" width="100%" src={login} alt="login-display" /> </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="col-4 login-column">
                <h4>Log In</h4>
                <br />
                <form onSubmit={handleSubmit}>
                    <FloatingLabel label="Email" className="login-label">
                        <Form.Control className="login-input" placeholder="email" type="email" required autoComplete="new-password" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Password" className="login-label">
                        <Form.Control className="login-input" placeholder="password" required autoComplete="new-password" type="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <Button size="lg" className="login-button" type="submit">Log In</Button>
                </form>
                Don't have an account? <Link to="/">Sign up</Link>
            </motion.div>
            {
                showError ?
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
                    null
            }
        </div >
    )
}

export default LogIn
import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"

function LogIn({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
                r.json().then((user) => setUser(user))
                history.push("/")
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="email" autoComplete="off" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="password" autoComplete="off" type="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </>
    )
}

export default LogIn
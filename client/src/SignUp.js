import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

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
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="first name" autoComplete="off" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                <input placeholder="last name" autoComplete="off" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                <input placeholder="email" autoComplete="off" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="password" autoComplete="off" type="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="confirm password" autoComplete="off" type="password" defaultValue={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp
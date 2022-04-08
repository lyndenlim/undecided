import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"

function HomePage({ setAddress }) {
    const history = useHistory()
    const [userInput, setUserInput] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        setAddress(userInput)
        history.push("/restaurants")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter an address" defaultValue={userInput} onChange={e => setUserInput(e.target.value)}></input>
                <button type="submit">Search</button>
            </form>
            <br />
            <br />
            <Link to="/random">
                <button>CHOOSE FOR ME</button>
            </Link>
        </>
    )
}

export default HomePage
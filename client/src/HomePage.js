import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"

function HomePage({ setAddress }) {
    const [userInput, setUserInput] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setAddress(userInput)
        history.push({ pathname: "/restaurants" })
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
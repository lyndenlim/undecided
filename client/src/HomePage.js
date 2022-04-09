import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

function HomePage({ setAddress }) {
    const history = useHistory()
    const [userInput, setUserInput] = useState("")
    const [background, setBackground] = useState("")

    useEffect(() => {
        async function getPhotos() {
            const axiosInstance = axios.create({
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                }
            })
            const restaurantPhotos = await axiosInstance.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=20&latitude=40.7052671&longitude=-74.0139441&radius=805&open_now=true&categories=restaurants")
            const photoArray = restaurantPhotos.data.businesses.map(business => business.image_url)
            const randomPhoto = Math.ceil(Math.random(photoArray) * photoArray.length)
            setBackground(photoArray[randomPhoto])
        }
        getPhotos()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setAddress(userInput)
        history.push("/restaurants")
    }

    return (
        <>
            {/* revisit */}
            <img src={background} alt="background" className="homepage-background"/>
            <div className="homepage-container">
                <form onSubmit={handleSubmit}>
                    <input placeholder="Enter an address" defaultValue={userInput} onChange={e => setUserInput(e.target.value)} required></input>
                    <button type="submit">Search</button>
                </form>
                <br />
                <br />
                <button className="search-button bouncy" onClick={() => history.push("/random")}>CHOOSE FOR ME</button>
            </div>
        </>
    )
}

export default HomePage
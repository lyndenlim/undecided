import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import RestaurantCard from "./RestaurantCard"
import Card from "react-bootstrap/Card"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"
import { faShuffle } from "@fortawesome/free-solid-svg-icons"
import Carousel from "react-bootstrap/Carousel"
import homepage1 from "./homepage_images/homepage1.jpeg"
import homepage2 from "./homepage_images/homepage2.png"
import homepage3 from "./homepage_images/homepage3.jpg"
import homepage4 from "./homepage_images/homepage4.png"
import homepage5 from "./homepage_images/homepage5.jpg"

function HomePage() {
    const history = useHistory()
    const [userInput, setUserInput] = useState("")
    const [background, setBackground] = useState([])
    const [allRestaurantsInfo, setAllRestaurantsInfo] = useState([])


    useEffect(() => {
        async function setPhotos() {
            const photoArray = [homepage1, homepage2, homepage3, homepage4, homepage5]
            setBackground(photoArray)
        }

        setPhotos()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const axiosInstance = axios.create({
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            }
        })
        const geocodedResult = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        const locationLat = geocodedResult.data.results[0].geometry.location.lat
        const locationLng = geocodedResult.data.results[0].geometry.location.lng
        const restaurantRequests = await axiosInstance.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&latitude=${locationLat}&longitude=${locationLng}&radius=805&open_now=true&categories=restaurants`)
        const allRestaurants = restaurantRequests.data.businesses

        setAllRestaurantsInfo(allRestaurants)
    }

    return (
        <>
            <div className="homepage-background">
                <Card>
                    <Carousel interval="10000" controls={false}>
                        {background.map(image => <Carousel.Item key={image}><img src={image} alt="background" className="homepage-image" /></Carousel.Item>)}
                    </Carousel>
                    <Card.ImgOverlay>
                        <div className="homepage-search">
                            <form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <FormControl placeholder="Enter an address" defaultValue={userInput} onChange={e => setUserInput(e.target.value)} required />
                                    {/* on submit scroll down to results */}
                                    <Button className="restaurant-search-button" type="submit"><FontAwesomeIcon icon={faUtensils} /></Button>
                                </InputGroup>
                            </form>
                            {/* placeholder */}
                            <span style={{ color: "white" }}>OR</span>
                            <Button size="lg" className="search-button bouncy" onClick={() => history.push("/random")}>CHOOSE FOR ME &nbsp;<FontAwesomeIcon icon={faShuffle} /></Button>
                        </div>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <br />
            <div>
                {/* revisit, where clearing search bar after a search dynamically updates below */}
                {userInput ? <h4 className="restaurant-result-header">Results for <strong>{userInput}</strong></h4> : null}
                <div className="restaurant-container">
                    {allRestaurantsInfo.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
                </div>
            </div>
        </>
    )
}

export default HomePage
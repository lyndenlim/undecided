import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import * as Scroll from "react-scroll"
import RestaurantCard from "./RestaurantCard"
import Card from "react-bootstrap/Card"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Carousel from "react-bootstrap/Carousel"
import Spinner from "react-bootstrap/Spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faShuffle } from "@fortawesome/free-solid-svg-icons"
import homepage1 from "./homepageImages/homepage1.jpeg"
import homepage2 from "./homepageImages/homepage2.png"
import homepage3 from "./homepageImages/homepage3.jpg"
import homepage4 from "./homepageImages/homepage4.png"
import homepage5 from "./homepageImages/homepage5.jpg"

function HomePage() {
    const history = useHistory()
    const [userInput, setUserInput] = useState("")
    const [background, setBackground] = useState([])
    const [allRestaurantsInfo, setAllRestaurantsInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function setPhotos() {
            const photoArray = [homepage1, homepage2, homepage3, homepage4, homepage5]
            setBackground(photoArray)
        }

        setPhotos()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        const geocodedResult = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        const locationLat = geocodedResult.data.results[0].geometry.location.lat
        const locationLng = geocodedResult.data.results[0].geometry.location.lng
        axios.get(`/yelp_restaurants?locationLat=${locationLat}&locationLng=${locationLng}&api_key=${process.env.REACT_APP_YELP_API_KEY}`)
            .then(res => {
                setAllRestaurantsInfo(res.data.businesses)
                Scroll.scroller.scrollTo("results", {
                    smooth: true
                });
                setTimeout(setIsLoading, 1000, false)
            })
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
                                    {isLoading ?
                                        <Button className="loading-button" disabled>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Loading...</span>
                                        </Button>
                                        :
                                        <Button className="restaurant-search-button" type="submit">
                                            <FontAwesomeIcon icon={faUtensils} />
                                        </Button>}
                                </InputGroup>
                            </form>
                            <hr className="hr" />
                            <span className="or">OR</span>
                            <hr className="hr" />
                            {isLoading ?
                                <Button className="loading-button" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="lg"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </Button> :
                                <Button size="lg" className="search-button bouncy" onClick={() => history.push("/random")}>
                                    CHOOSE FOR ME &nbsp;<FontAwesomeIcon icon={faShuffle} />
                                </Button>}
                        </div>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <br />
            <div>
                {userInput ? <h4 className="restaurant-result-header" name="results">Results for <strong>{userInput}</strong></h4> : null}
                <div className="restaurant-container">
                    {allRestaurantsInfo.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
                </div>
            </div>
        </>
    )
}

export default HomePage
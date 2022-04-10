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

function HomePage() {
    const history = useHistory()
    const [userInput, setUserInput] = useState("")
    const [background, setBackground] = useState("")
    const [allRestaurantsInfo, setAllRestaurantsInfo] = useState([])


    useEffect(() => {
        async function setPhotos() {
            // const axiosInstance = axios.create({
            //     headers: {
            //         Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            //     }
            // })
            // const restaurantPhotos = await axiosInstance.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=20&latitude=40.768163594&longitude=-73.959329496&radius=805&open_now=true&categories=restaurants")
            // const photoArray = restaurantPhotos.data.businesses.map(business => business.image_url)

            // possibly make carousel
            const photoArray = ['https://s3-media2.fl.yelpcdn.com/bphoto/q5vevyMl8FEO-mly8hh1wA/o.jpg', 'https://s3-media4.fl.yelpcdn.com/bphoto/yzPxoukJ3s3JEf8nXyv_VA/o.jpg', 'https://s3-media4.fl.yelpcdn.com/bphoto/HSkTWFTItJRe398Yla56rQ/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/czFsUoHr28QTi9LHCp634A/o.jpg', 'https://s3-media1.fl.yelpcdn.com/bphoto/jkOeBmGbclLyY3zbOa7COw/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/uBhe_gNq53jqkdtPmBM_Lw/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/P_AnRsbxTllXQ-S6hWh-Xw/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/nnAk1txBE_-5EDggdBMbSQ/o.jpg', 'https://s3-media1.fl.yelpcdn.com/bphoto/V53Pgx8EOsiMIYIsOvoYSw/o.jpg', 'https://s3-media3.fl.yelpcdn.com/bphoto/78u5SWauEV0nu9Tus3bf6g/o.jpg', 'https://s3-media3.fl.yelpcdn.com/bphoto/WymEpZCm4CPRTeVHXVyzXQ/o.jpg', 'https://s3-media1.fl.yelpcdn.com/bphoto/xCDta7sEvT-YD-6yyWSOQw/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/bnUM__4VCcEQOsulwHx_4A/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/TXfqMXlF2VfghYzVvO2Lxg/o.jpg', 'https://s3-media3.fl.yelpcdn.com/bphoto/FOPr-jqeJWnw3vivAFv_Uw/o.jpg', 'https://s3-media2.fl.yelpcdn.com/bphoto/_5f7gMLWkdXuldBsVQZJDA/o.jpg', 'https://s3-media4.fl.yelpcdn.com/bphoto/x1MI0QnfesftqWX-B-wAHA/o.jpg', 'https://s3-media3.fl.yelpcdn.com/bphoto/lJuUFXTyQ5Q3yu3_oE-8Mg/o.jpg', 'https://s3-media1.fl.yelpcdn.com/bphoto/y7dHqyyCQRg5rSfJ5grAjQ/o.jpg']
            const randomPhoto = Math.ceil(Math.random(photoArray) * photoArray.length) - 1
            setBackground(photoArray[randomPhoto])
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
                    <Card.Img src={background} alt="background" className="homepage-image" />
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
                            OR
                            <button className="search-button bouncy" onClick={() => history.push("/random")}>CHOOSE FOR ME</button>
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
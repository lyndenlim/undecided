import React from 'react'
import { Link } from "react-router-dom"
import getRestaurantData from "./RandomRestaurant"

function HomePage() {
    return (
        <>
            <Link to="/random">
                <button>CHOOSE FOR ME</button>
            </Link>
        </>
    )
}

export default HomePage
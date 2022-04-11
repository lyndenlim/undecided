import React from 'react'

function Map({ restaurantAddress }) {
    return (
        <>
            <iframe
                title="map"
                width="500"
                height="350"
                className="map"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${restaurantAddress}`}
            />
        </>
    )
}

export default Map
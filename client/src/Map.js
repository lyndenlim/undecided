import React from 'react'

function Map({ restaurantAddress }) {
    return (
        <>
            <iframe
                title="map"
                width="600"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${restaurantAddress}`}
            />
        </>
    )
}

export default Map
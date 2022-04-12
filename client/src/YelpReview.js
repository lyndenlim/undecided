import React, { useEffect, useState } from 'react'
import ReactStarsRating from 'react-awesome-stars-rating';

function Review({ review }) {
  const [dateCreated, setDateCreated] = useState("")

  useEffect(() => {
    const splitDate = review.time_created.split(" ")[0].split("-")
    const reformattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
    setDateCreated(reformattedDate)
  }, [])

  return (
    <div>
      <div className="profile-picture">
        <img width="100%" height="fit-content" src={review.user.image_url !== null ? review.user.image_url : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"} alt="user-avatar" />
      </div>
      <h5>{review.user.name}</h5>
      <p>{dateCreated}</p>
      <p><ReactStarsRating className="star-rating" value={review.rating} isEdit={false} /></p>
      <p>{review.text}</p>
      <hr />
    </div >
  )
}

export default Review
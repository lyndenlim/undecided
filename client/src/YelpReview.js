import React, { useEffect, useState } from 'react'

function Review({ review }) {
  const [dateCreated, setDateCreated] = useState("")

  useEffect(() => {
    const splitDate = review.time_created.split(" ")[0].split("-")
    const reformattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
    setDateCreated(reformattedDate)
  }, [])

  return (
    <>
      <img className="profile-picture" height="75px" width="75px" src={review.user.image_url !== null ? review.user.image_url : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"} alt="user-avatar" /><h5>{review.user.name}</h5>
      <p>{dateCreated}</p>
      <p>{review.rating}</p>
      <p>{review.text}</p>
      <hr />
    </>
  )
}

export default Review
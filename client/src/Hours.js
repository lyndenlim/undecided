import React, { useEffect, useState } from 'react'
import ListGroupItem from "react-bootstrap/ListGroupItem"

function Hours({ day }) {
    const [dayOfWeek, setDayOfWeek] = useState("")
    const [openHour, setOpenHour] = useState("")
    const [closeHour, setCloseHour] = useState("")
    const [colored, setColored] = useState(false)
    const green = colored ? "#00a16d" : ""

    useEffect(() => {
        const todaysDate = new Date()
        const todaysDay = todaysDate.getDay()

        function colorDate() {
            if (todaysDay === day.day) {
                setColored(true)
            }
        }

        function convertDay() {
            switch (day.day) {
                case 0:
                    setDayOfWeek("Sunday")
                    break;
                case 1:
                    setDayOfWeek("Monday")
                    break;
                case 2:
                    setDayOfWeek("Tuesday")
                    break;
                case 3:
                    setDayOfWeek("Wednesday")
                    break;
                case 4:
                    setDayOfWeek("Thursday")
                    break;
                case 5:
                    setDayOfWeek("Friday")
                    break;
                case 6:
                    setDayOfWeek("Saturday")
                    break;
                default:
                    setDayOfWeek("N/A")
            }
        }

        function convertHours() {
            if (parseInt(day.start) > 1200) {
                setOpenHour(`${day.start.slice(0, 2) - 12}:${day.start.slice(2, 4)} PM`)
            } else if (parseInt(day.start) >= 1000 && parseInt(day.start) < 1200 && parseInt(day.start) !== 0) {
                setOpenHour(`${day.start.slice(0, 2)}:${day.start.slice(2, 4)} AM`)
            } else if (parseInt(day.start) < 1000 && parseInt(day.start) !== 0) {
                setOpenHour(`${day.start.slice(1, 2)}:${day.start.slice(2, 4)} AM`)
            } else if (day.start === "0000") {
                setOpenHour("12:00 AM")
            } else if (day.start === "1200") {
                setOpenHour("12:00 PM")
            }

            if (parseInt(day.end) > 1200) {
                setCloseHour(`${day.end.slice(0, 2) - 12}:${day.end.slice(2, 4)} PM`)
            } else if (parseInt(day.end) >= 1000 && parseInt(day.end) < 1200 && parseInt(day.end) !== 0) {
                setCloseHour(`${day.end.slice(0, 2)}:${day.end.slice(2, 4)} AM`)
            } else if (parseInt(day.end) < 1000 && parseInt(day.end) !== 0) {
                setCloseHour(`${day.end.slice(1, 2)}:${day.end.slice(2, 4)} AM`)
            } else if (day.end === "0000") {
                setCloseHour("12:00 AM")
            } else if (day.end === "1200") {
                setCloseHour("12:00 PM")
            }
        }

        convertDay()
        convertHours()
        colorDate()
    }, [])


    return (
        <div className="hour-list">
            <ListGroupItem>
                <strong style={{ color: green }}>{dayOfWeek}</strong> &nbsp;{openHour} - {closeHour}
            </ListGroupItem>
        </div>
    )
}

export default Hours
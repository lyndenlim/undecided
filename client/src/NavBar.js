import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <Navbar>
            <Container>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/recipes">Recipes</NavLink>
                </div>
                <div>
                    <NavLink to="/account">Account</NavLink>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar
import React, { useState, useEffect } from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink, useHistory } from "react-router-dom"


function NavBar({ user, setUser }) {
    const history = useHistory()

    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, [])

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                history.push("/")
            }
        });
    }

    return (
        <Navbar>
            <Container>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/recipes">Recipes</NavLink>
                </div>
                <div>
                    {user ? <div><span>Account</span><span onClick={handleLogoutClick}>Log Out</span></div> : <NavLink to="/login">Log In</NavLink>}
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar
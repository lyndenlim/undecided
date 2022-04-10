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
            }
        });
    }

    return (
        <Navbar>
            <Container>
                <div>
                    <NavLink to="/" className="navbar-navlink">Home</NavLink>
                    <NavLink to="/recipes" className="navbar-navlink">Recipes</NavLink>
                </div>
                <div>
                    {user ?
                        <div>
                            <NavLink to="/account" className="navbar-navlink">
                                Account
                            </NavLink>
                            <NavLink to="/" onClick={handleLogoutClick} className="navbar-navlink">
                                Log Out
                            </NavLink>
                        </div>
                        :
                        <>
                            <NavLink to="/login" className="navbar-navlink">
                                Log In
                            </NavLink>
                            <NavLink to="/signup" className="navbar-navlink">
                                Sign Up
                            </NavLink>
                        </>
                    }
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar
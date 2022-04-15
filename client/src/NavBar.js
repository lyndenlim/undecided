import React, { useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Dropdown from "react-bootstrap/Dropdown"
import defaultProfilePicture from "./defaultProfilePicture/defaultProfilePicture.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faUserGear, faKitchenSet } from "@fortawesome/free-solid-svg-icons"

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
                    {user ? <NavLink to="/recipes" className="navbar-navlink"><FontAwesomeIcon className="recipe-icon" icon={faKitchenSet} /></NavLink> : <FontAwesomeIcon className="recipe-icon-disabled" icon={faKitchenSet} />}
                </div>
                <div>
                    {user ? <NavLink to="/homepage" className="navbar-navlink"><span className="logo">Undec¿ded</span></NavLink> : <span className="logo-disabled">Undec¿ded</span>}
                </div>
                <div>
                    {user ?
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle className="account-toggle">
                                    <div className="navbar-profile-picture">
                                        <img width="100%" height="fit-content" src={user.profile_picture ? user.profile_picture : defaultProfilePicture} />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <Dropdown.Item onClick={e => history.push("/account")}>
                                        Account &nbsp;<FontAwesomeIcon icon={faUserGear} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogoutClick} className="logout-navbar">
                                        Log Out &nbsp;<FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        :
                        <>
                            <NavLink to="/login" className="navbar-navlink">
                                Log In
                            </NavLink>
                            <NavLink to="/" className="navbar-navlink">
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
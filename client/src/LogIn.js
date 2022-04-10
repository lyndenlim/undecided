import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

function LogIn({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
                history.push("/")
            }
        });
    }

    return (
        <div className="login-container">
            {/* revisit, cropping images relative to screen size  */}
            {/* https://www.washingtonian.com/wp-content/uploads/2020/01/100Best-scaled.jpg */}
            {/* https://i2-prod.manchestereveningnews.co.uk/incoming/article17872387.ece/ALTERNATES/s1200b/0_EN_050320_Nandos_is_hiring_staff_Walkden_restaurant_17872329.jpg */}
            {/* https://www.lironboylston.com/wp-content/uploads/2020/12/WBC_7095.jpg */}
            {/* https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/10/15170636/hawker-food-hero-image-image-credit-visit-singapore.jpg */}
            {/* https://imageproxy.wolt.com/venue/618cda3fa5519f6e439be64f/9121e378-4c48-11ec-bde4-924e861537e6_soul_food2.jpg */}
            {/* https://www.lironboylston.com/wp-content/uploads/2020/12/WBC_7095.jpg */}
            <div className="col-8"><img height="100%" width="100%" src="https://static.onecms.io/wp-content/uploads/sites/9/2022/02/15/guide-to-homemade-pizza-FT-MAG0322.jpg" alt="login-display" /> </div>
            <div className="col-4 login-column">
                <form onSubmit={handleSubmit}>
                    <FloatingLabel label="Email" className="login-label">
                        <Form.Control className="login-input" placeholder="email" autoComplete="off" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Password" className="login-label">
                    <Form.Control className="login-input" placeholder="password" autoComplete="off" type="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>
                    <br />
                    <button type="submit">Log In</button>
                </form>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

export default LogIn
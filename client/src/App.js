import { Route, Switch } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./NavBar"
import HomePage from "./HomePage";
import RandomRestaurant from "./RandomRestaurant"
import SelectedRestaurant from "./SelectedRestaurant"
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import WriteReview from "./WriteReview"
import AccountPage from "./AccountPage"
import RecipePage from "./RecipePage";
import RecipeInfo from "./RecipeInfo"

function App() {
  const [address, setAddress] = useState("")
  const [user, setUser] = useState("")
  const [currentLat, setCurrentLat] = useState("")
  const [currentLng, setCurrentLng] = useState("")

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setCurrentLat(latitude)
        setCurrentLng(longitude)
      });
    }
  }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/testing">
          <h1>Test Route</h1>
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/recipes">
          <RecipePage currentLat={currentLat} currentLng={currentLng}/>
        </Route>
        <Route path="/recipes/:id">
          <RecipeInfo />
        </Route>
        <Route path="/restaurants/:id">
          <SelectedRestaurant user={user} />
        </Route>
        <Route path="/random">
          <RandomRestaurant currentLat={currentLat} currentLng={currentLng} user={user} />
        </Route>
        <Route path="/account">
          <AccountPage user={user} setUser={setUser} />
        </Route>
        <Route path="/login" >
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/signup"  >
          <SignUp setUser={setUser} />
        </Route>
        <Route path="/writereview/:id">
          <WriteReview user={user} />
        </Route>
      </Switch >
    </>
  );
}

export default App;

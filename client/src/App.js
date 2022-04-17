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
  const [user, setUser] = useState("")
  const [reviewCount, setReviewCount] = useState(null)
  const [currentLat, setCurrentLat] = useState("")
  const [currentLng, setCurrentLng] = useState("")

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setReviewCount(user.reviews.length)
        });
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
          <SignUp setUser={setUser} user={user} />
        </Route>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route exact path="/recipes">
          <RecipePage currentLat={currentLat} currentLng={currentLng} />
        </Route>
        <Route path="/recipes/:id">
          <RecipeInfo />
        </Route>
        <Route path="/restaurants/:id">
          <SelectedRestaurant user={user} reviewCount={reviewCount} setReviewCount={setReviewCount} />
        </Route>
        <Route path="/random">
          <RandomRestaurant currentLat={currentLat} currentLng={currentLng} user={user} />
        </Route>
        <Route path="/account">
          <AccountPage user={user} setUser={setUser} reviewCount={reviewCount} setReviewCount={setReviewCount} />
        </Route>
        <Route path="/login" >
          <LogIn setUser={setUser} setReviewCount={setReviewCount}/>
        </Route>
        <Route path="/writereview/:id">
          <WriteReview user={user} setReviewCount={setReviewCount} />
        </Route>
      </Switch >
    </>
  );
}

export default App;

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
import ProtectedRoute from "./ProtectedRoute";

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
        <Route exact path="/">
          <SignUp setUser={setUser} user={user} />
        </Route>
        <Route path="/homepage">
          <ProtectedRoute user={user}>
            <HomePage />
          </ProtectedRoute>
        </Route>
        <Route exact path="/recipes">
          <ProtectedRoute user={user}>
            <RecipePage currentLat={currentLat} currentLng={currentLng} />
          </ProtectedRoute>
        </Route>
        <Route path="/recipes/:id">
          <ProtectedRoute user={user}>
            <RecipeInfo />
          </ProtectedRoute>
        </Route>
        <Route path="/restaurants/:id">
          <ProtectedRoute user={user}>
            <SelectedRestaurant user={user} reviewCount={reviewCount} setReviewCount={setReviewCount} />
          </ProtectedRoute>
        </Route>
        <Route path="/random">
          <ProtectedRoute user={user}>
            <RandomRestaurant currentLat={currentLat} currentLng={currentLng} user={user} />
          </ProtectedRoute>
        </Route>
        <Route path="/account">
          <ProtectedRoute user={user}>
            <AccountPage user={user} setUser={setUser} reviewCount={reviewCount} setReviewCount={setReviewCount} />
          </ProtectedRoute>
        </Route>
        <Route path="/login" >
          <LogIn setUser={setUser} setReviewCount={setReviewCount} />
        </Route>
        <Route path="/writereview/:id">
          <ProtectedRoute user={user}>
            <WriteReview user={user} setReviewCount={setReviewCount} />
          </ProtectedRoute>
        </Route>
      </Switch >
    </>
  );
}

export default App;

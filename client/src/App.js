import { Route, Switch } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./NavBar"
import HomePage from "./HomePage";
import RestaurantPage from "./RestaurantPage"
import RandomRestaurant from "./RandomRestaurant"
import RestaurantInfo from "./RestaurantInfo"
import LogIn from "./LogIn"
import SignUp from "./SignUp"

function App() {
  const [address, setAddress] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/testing">
          <h1>Test Route</h1>
        </Route>
        <Route exact path="/">
          <HomePage setAddress={setAddress} />
        </Route>
        <Route exact path="/restaurants">
          <RestaurantPage address={address} />
        </Route>
        <Route path="/restaurants/:id">
          <RestaurantInfo />
        </Route>
        <Route path="/random">
          <RandomRestaurant />
        </Route>
        <Route path="/login" >
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/signup"  >
          <SignUp setUser={setUser} />
        </Route>
      </Switch >
    </>
  );
}

export default App;

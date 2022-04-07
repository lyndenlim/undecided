import { Route, Switch } from "react-router-dom"
import { useState } from "react"
import NavBar from "./NavBar"
import HomePage from "./HomePage";
import RestaurantPage from "./RestaurantPage"
import RandomRestaurant from "./RandomRestaurant"
import RestaurantInfo from "./RestaurantInfo"

function App() {
  const [address, setAddress] = useState("")

  return (
    <>
      <NavBar />
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
      </Switch>
    </>
  );
}

export default App;

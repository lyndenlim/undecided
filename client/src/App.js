import { Route, Switch } from "react-router-dom"
import HomePage from "./HomePage";
import RestaurantPage from "./RestaurantPage"
import RandomRestaurant from "./RandomRestaurant"
import NavBar from "./NavBar"
import {useState} from "react"

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
          <HomePage setAddress={setAddress}/>
        </Route>
        <Route path="/restaurants">
          <RestaurantPage address={address}/>
        </Route>
        <Route path="/random">
          <RandomRestaurant />
        </Route>
      </Switch>
    </>
  );
}

export default App;

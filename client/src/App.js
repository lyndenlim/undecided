import { Route, Switch } from "react-router-dom"
import HomePage from "./HomePage";
import RestaurantPage from "./RestaurantPage"
import RandomRestaurant from "./RandomRestaurant"
import NavBar from "./NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/testing">
          <h1>Test Route</h1>
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/restaurants">
          <RestaurantPage />
        </Route>
        <Route path="/random">
          <RandomRestaurant />
        </Route>
      </Switch>
    </>
  );
}

export default App;

import { Route, Switch } from "react-router-dom"
import HomePage from "./HomePage";
import RestaurantPage from "./RestaurantPage"
import RandomRestaurant from "./RandomRestaurant"

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

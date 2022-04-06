import { Route, Switch } from "react-router-dom"
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/testing">
          <h1>Test Route</h1>
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

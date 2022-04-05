import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/testing">
          <h1>Test Route</h1>
        </Route>
        <Route path="/">
          <h1>Page Count: {count}</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

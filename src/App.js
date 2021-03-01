import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import "./App.css";

import ListContainer from "./features/list/containers/ListContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={ListContainer} path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

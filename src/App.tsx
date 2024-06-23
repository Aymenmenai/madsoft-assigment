import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Quiz from "./components/pages/quiz";
import Home from "./components/pages/home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/quiz" component={Quiz} />
        {/* <Route path="/contact" component={Contact} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

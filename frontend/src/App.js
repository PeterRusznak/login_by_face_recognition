import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WebCamComp from './components/WebCamComp';
import OkComponent from './components/OkComponent';
import NotOkComponent from './components/NotOkComponent';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={WebCamComp}></Route>
          <Route path="/ok" component={OkComponent}></Route>
          <Route path="/not_ok" component={NotOkComponent}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;

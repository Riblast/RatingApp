import {Route, Switch } from "wouter";
import Home from "./pages/Home";
import UserProfile from "./pages/Profile";
import StatsGraph from "./pages/Statistics";
import FriendsManagement from "./pages/Friends";
import Settings from "./pages/Settings";
import CreateNewRating from "./pages/CreateNewRating";
const App = () => (
  <>
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/newrating" component={CreateNewRating}/>
      <Route path="/profile" component={UserProfile} />
      <Route path="/statistics" component={StatsGraph}/>
      <Route path="/friends" component={FriendsManagement}/>
      <Route path="/settings" component={Settings}/>
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App

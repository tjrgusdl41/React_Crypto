import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
interface IRouteProps {
  toggleDark: () => void
  isDark: boolean;
}
function Router({toggleDark,isDark}:IRouteProps) {
   return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark}/>
        </Route>
        <Route path="/">
           <Coins toggleDark={toggleDark}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
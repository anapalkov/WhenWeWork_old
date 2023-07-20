import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import MyShifts from "../pages/MyShifts";
import AvailableShifts from "../pages/AvailableShifts";
import Test from "../pages/Test";
import Test2 from "../pages/Test2";
import CompanyDirectory from "../pages/CompanyDirectory";
import UserSettings from "../pages/UserSettings";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/settings">
            <UserSettings user={user} />
          </Route>
          <Route path="/companies">
            <CompanyDirectory user={user} />
          </Route>

          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
          <Route path="/open">
            <AvailableShifts user={user} />
          </Route>
          <Route path="/test">
            <Test user={user} />
          </Route>
          <Route path="/test2">
            <Test2 user={user} />
          </Route>
          <Route path="/">
            <MyShifts user={user} />
          </Route>
        </Switch>
      </main>

    </>
  );
}

export default App;

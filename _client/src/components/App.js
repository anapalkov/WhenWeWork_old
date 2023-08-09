import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";

import MyShifts from "../pages/MyShifts";
import AvailableShifts from "../pages/AvailableShifts";
// import Test from "../pages/Test";
import BigCalendar from "../pages/BigCalendar";
import CreateShift from "../pages/CreateShift";
import UserSettings from "../pages/UserSettings";
import CompanySettings from "../pages/CompanySettings";
import CompanyShifts from "../pages/CompanyShifts"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          // console.log("Signing In:")
          // console.log(user)
          setUser(user)
        }
        );

      }
    });
  }, []);

  //if no user logged in, return login/signup page instead
  if (!user) return <Login onLogin={setUser} />;

  //otherwise return page dependent on switch
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/settings">
            <UserSettings user={user} setUser={setUser} />
          </Route>
          {/* <Route path="/companies">
            <CompanyDirectory user={user} />
          </Route> */}
          <Route path="/companysettings">
            <CompanySettings user={user} />
          </Route>
          <Route path="/createshift">
            <CreateShift user={user} />
          </Route>
          <Route path="/open">
            <AvailableShifts user={user} />
          </Route>
          {/* <Route path="/test">
            <Test user={user} />
          </Route> */}
          <Route path="/bigcalendar">
            <BigCalendar user={user} />
          </Route>
          <Route path="/companyshifts">
            <CompanyShifts user={user} />
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

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
import { Error, FormField } from "../styles";

function App() {
  const [user, setUser] = useState(null);
  const [MyCompany, setMyCompany] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/mycompany")
      .then((r) => r.json())
      .then((data) => {
        setMyCompany(data);
      })
      .catch((error) => {
        console.error("Error fetching MyCompany data:", error);
      });
  }, []);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        }
        );

      }
    });
  }, []);

  //if no user logged in, return login/signup page instead
  if (!user) return (
    <>
      <Login onLogin={setUser} setErrors={setErrors} />;
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </>)

  //otherwise return page dependent on switch
  return (
    <>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/settings">
            <UserSettings user={user} setUser={setUser} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/companysettings">
            <CompanySettings user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/createshift">
            <CreateShift user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/open">
            <AvailableShifts user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/bigcalendar">
            <BigCalendar user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          {/* <Route path="/companyshifts">
            <CompanyShifts user={user} />
          </Route> */}
          <Route path="/">
            <MyShifts user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;

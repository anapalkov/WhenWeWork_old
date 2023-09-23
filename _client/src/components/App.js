import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";

import MyShifts from "../pages/MyShifts";
import AvailableShifts from "../pages/AvailableShifts";
// import BigCalendar from "../pages/BigCalendar";
import CreateShift from "../pages/CreateShift";
import UserSettings from "../pages/UserSettings";
import CompanySettings from "../pages/CompanySettings";
import DragAndDrop from "../pages/Calendar/DragAndDrop";
// import CompanyShifts from "../pages/CompanyShifts"
import { Error, FormField } from "../styles";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [user, setUser] = useState(null);
  const [myCompany, setMyCompany] = useState([]);
  // const [companyUsers, setCompanyUsers] = useState([]);
  // const [companyShifts, setCompanyShifts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [errors, setErrors] = useState([]);

  // ON PAGE RELOAD
  useEffect(() => {
    // AUTO LOGIN IF LOGGED IN BEFORE
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        }
        );
      }
    });

    //LOAD MY COMPANY
    fetch("/mycompany")
      .then((r) => r.json())
      .then((data) => {
        setMyCompany(data);
        setLoading(false); // Data has been fetched, loading is done
      })
      .catch((error) => {
        console.error("Error fetching MyCompany data:", error);
        setLoading(true); // Even if there's an error, loading is done
      });
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <>
        <Login onLogin={setUser} setErrors={setErrors} setMyCompany={setMyCompany} />
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
      </>
    );
  }

  //otherwise return page dependent on switch
  console.log("loading pages")
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
            <UserSettings user={user} setUser={setUser} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/companysettings">
            <CompanySettings user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/createshift">
            <CreateShift user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          <Route path="/open">
            <AvailableShifts user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>
          {/* <Route path="/test">
            <BigCalendar user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route> */}
          <Route path="/bigcalendar">
            <ChakraProvider>
              <div style={{ height: "95vh" }}>
                <DragAndDrop user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
              </div>
            </ChakraProvider>
          </Route>
          <Route path="*">
            <MyShifts user={user} myCompany={myCompany} setMyCompany={setMyCompany} setErrors={setErrors} />
          </Route>

        </Switch>
      </main>
    </>
  );

}

export default App;

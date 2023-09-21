import React, { useState } from "react";
import { Button, Input, FormField, Label } from "../styles";

function LoginForm({ onLogin, setErrors, setMyCompany }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    // HANDLE LOGIN, CREATE SESSION AND SET USER
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((user) => {
          console.log(user)



          fetch("/mycompany")
            .then((r) => r.json())
            .then((data) => {
              console.log("LOGIN LOADING IS DONE")
              console.log(data)
              setMyCompany(data);
              onLogin(user);
            })
            .catch((error) => {
              console.error("Error fetching MyCompany data:", error);
              console.log("LOADING FAILED")
            });



        })

      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });







  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      {/* <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField> */}
    </form>
  );
}

export default LoginForm;

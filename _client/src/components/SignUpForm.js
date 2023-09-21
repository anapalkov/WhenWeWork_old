import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import { Link, useLocation } from "react-router-dom";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState("")
  const location = useLocation();

  // ADMIN ?
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  function handleSubmit(e) {
    console.log(username, password, passwordConfirmation, checked, company)
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          password_confirmation: passwordConfirmation,
          admin: checked,
          role: 'admin',
          company_id: 1
        }
      })
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            console.log(user)
            onLogin(user)
            // window.location.href = "http://localhost:4000/companysettings"; // Redirect the user
          }
          );

        } else {
          r.json().then((err) => setErrors(err.errors));
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
          value={password}
          onChange={(e) => {
            console.log(e.target.value)
            setPassword(e.target.value)
          }
          }
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      {/* <FormField>
        <Label htmlFor="company">Company Id</Label>
        <Input
          type="text"
          id="company"
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </FormField> */}
      <FormField>
        <Label htmlFor="checked">
          <Checkbox
            label=""
            value={checked}
            onChange={handleChange}
          />
          Admin {checked.toString()}</Label>

      </FormField>
      <FormField>
        <Button type="submit">
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}


// fixes link: to="/" active={location.pathname === "/"}
// <Button as={Link} to="/" active={location.pathname === "/"} onClick={handleLogoutClick}>
//             Logout
//           </Button>

export default SignUpForm;

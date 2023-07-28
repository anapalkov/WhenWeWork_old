import { React, useEffect, useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import styled from "styled-components";



function UserSettings(props) {
    const { user } = props;

    // not needed until we want username updated
    // const [UserSettings, setUserSettings] = useState([]);
    // useEffect(() => {
    //     fetch("/api/me")
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setUserSettings(data);
    //             // console.log(data);
    //             // console.log(user.company.id)
    //         });
    // }, []);

    const [newusername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [company, setCompany] = useState("")


    function handleSubmit(e) {
        console.log(newusername)
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`/api/signup/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: newusername,
                password: password,
                password_confirmation: passwordConfirmation,
                // company_id: company,
            }),
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    // r.json().then((user) => onLogin(user));
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        autoComplete="off"
                        defaultValue={user.username}
                        // value={username}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="password">New Password Confirmation</Label>
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
                        defaultValuevalue={user.company.id}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </FormField> */}
                <FormField>
                    {/*<Label htmlFor="imageUrl">
                     <Input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              /> 
                    <Checkbox
                        label=""
                        value={checked}
                    // onChange={handleChange}
                    />
                    Admin {checked.toString()}</Label>*/}

                </FormField>
                <FormField>
                    <Button type="submit">{isLoading ? "Loading..." : "Change Settings"}</Button>
                </FormField>
                <FormField>
                    {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}
                </FormField>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 120px auto;
  padding: 16px;
`;

export default UserSettings;

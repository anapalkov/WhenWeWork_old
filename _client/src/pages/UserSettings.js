import { React, useEffect, useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import styled from "styled-components";



function UserSettings({ user, setUser, myCompany, setMyCompany }) {
    // const  = props;
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [fname, setFname] = useState(user.fname);
    const [lname, setLname] = useState(user.lname);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {

        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const updatedUser = {
            ...user,
            fname: fname,
            lname: lname
        };

        fetch(`/signup/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                password_confirmation: passwordConfirmation,
                fname: fname,
                lname: lname
                // company_id: company,
            }),
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    const updatedCompany = { ...myCompany };
                    const userIndex = updatedCompany.users.findIndex(u => u.id === user.id);

                    if (userIndex !== -1) {
                        updatedCompany.users[userIndex] = updatedUser;
                        setMyCompany(updatedCompany); // Update MyCompany state
                    }

                    setUser(updatedUser);
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
                        disabled // Add the disabled attribute
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
                        disabled // Add the disabled attribute
                    />
                </FormField>


                <FormField>
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                        type="text"
                        id="fname"
                        // value={fname}
                        defaultValue={user.fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                        type="text"
                        id="lname"
                        // value={lname}
                        defaultValue={user.lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </FormField>

                <FormField>
                    <Button type="submit">{isLoading ? "Loading..." : "Save"}</Button>
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

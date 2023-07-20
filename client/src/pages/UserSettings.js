import { React, useEffect, useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";



function UserSettings() {
    const [UserSettings, setUserSettings] = useState([]);

    useEffect(() => {
        fetch("/api/me")
            .then((r) => r.json())
            .then(setUserSettings);
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState("")


    // ADMIN ?
    // const [checked, setChecked] = React.useState(false);
    // const handleChange = () => {
    //     setChecked(!checked);
    // };
    // const Checkbox = ({ label, value, onChange }) => {
    //     return (
    //         <label>
    //             <input type="checkbox" checked={value} onChange={onChange} />
    //             {label}
    //         </label>
    //     );
    // };



    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: UserSettings.username,
                password: password,
                password_confirmation: passwordConfirmation,
                company_id: company,
            })
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
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={UserSettings.username}
                // onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <FormField>
                <Label htmlFor="company">Company Id</Label>
                <Input
                    type="text"
                    id="company"
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </FormField>
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
    );
}




export default UserSettings;
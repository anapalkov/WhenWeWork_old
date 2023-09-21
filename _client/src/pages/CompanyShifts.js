import { React, useEffect, useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import styled from "styled-components";


function CompanyShifts({ user }) {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    function handleSubmit(e) {

        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        fetch(`/signup/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
    }

    return (
        <Wrapper>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 120px auto;
  padding: 16px;
`;

export default CompanyShifts;

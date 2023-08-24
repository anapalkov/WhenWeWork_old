import styled from "styled-components";
import React, { useEffect, useState } from "react";

function CompanyCreation({ user }) {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const companyData = {
            name: name
        };

        fetch(`/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(companyData),
        })
            .then((response) => {
                setIsLoading(false);
                if (response.ok) {
                    // Assuming the response contains the newly created shift data
                    console.log(response.json())
                    window.location.reload();
                } else {
                    response.json().then((err) => setErrors(err.errors));
                }
            });

    }



    // null

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company Name" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 700px;
  margin: 80px auto;
  padding: 16px;
`;

const CompanyCreationStyled = styled.div`
  margin-top: 120px; /* Adjust the margin-top to create space below the NavBar */
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default CompanyCreation;
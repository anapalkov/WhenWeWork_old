import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "react-table/react-table.css";

function CompanyDirectory({ user }) {
    const [companies, setCompanies] = useState([]);
    const [requestedCompany, setRequestedCompany] = useState([]);
    // const [requestStatus, setRequestStatus] = useState(false);
    // fetch user

    function handleRequesttoJoin(companyid) {
        // Data to update the user (modify this as needed)
        const updatedUserData = {
            companyrequest: companyid
        };
        fetch(`/signup/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update user.");
                }
                return response.json();
            })
            .then((updatedUser) => {
                // Handle successful user update
                console.log("User updated:", updatedUser);
                setRequestedCompany(companyid)
            })
            .catch((error) => {
                // Handle errors
                console.error("Error updating user:", error.message);
            });
    }



    useEffect(() => {
        fetch("/companies")
            .then((r) => r.json())
            .then(setCompanies);
    }, []);

    return (
        <CompanyDirectoryStyled>
            <h2>Company Directory</h2>
            <TableWrapper>
                <table className="content-table">
                    <tr>
                        <th>Company Name</th>
                        <th>Request to join</th>
                        <th>Admins</th>
                    </tr>

                    {companies.length > 0 ? (
                        companies.slice(1).map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td><button onClick={() => {
                                    if (requestedCompany === company.id) {
                                        handleRequesttoJoin(1);
                                    } else {
                                        handleRequesttoJoin(company.id);
                                    }
                                }}>
                                    {requestedCompany === company.id ? "Cancel Request" : "Request to Join"}
                                </button>
                                    {/* if requestedCompany = company.id, button should be handleRequesttoJoin(1) */}

                                </td>



                                <td>
                                    {company.users.map((user) =>
                                        user.admin ? user.username + " " : ""
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <>
                            <h2></h2>
                        </>
                    )}
                </table>
            </TableWrapper>
        </CompanyDirectoryStyled>
    );
}

const CompanyDirectoryStyled = styled.div`
  margin-top: 120px; /* Adjust the margin-top to create space below the NavBar */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;

  table {
    border-collapse: collapse;
    border: 2px solid black;
    width: 100%;

    th,
    td {
      border: 1px solid black;
      padding: 8px;
    }
  }
`;

export default CompanyDirectory;
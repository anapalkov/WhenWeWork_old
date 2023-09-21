import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "react-table/react-table.css";

function CompanyQueue({ user, setMyCompany }) {
    const [unassignedUsers, setUnassignedUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("/unassignedusers")
            .then((r) => r.json())
            .then((data) => {
                setUnassignedUsers(data);
                // if (!unassignedUsers) {
                //     console.log("unassignedUsers is falsy");
                // } else {
                //     console.log("unassignedUsers is truthy");
                //     console.log(unassignedUsers)
                // }
            })
            .catch((error) => {
                console.error("Error fetching MyCompany data:", error);
            });
    }, []);


    function handleAcceptUser(id) {
        setErrors([]);
        fetch(`/accepttocompany/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_id: user.company.id,
                companyrequest: null
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((userResponse) => {
                        setUnassignedUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                        setMyCompany((prevMyCompany) => ({
                            ...prevMyCompany,
                            users: [...prevMyCompany.users, userResponse]
                        }));




                    });
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
    }


    return (
        <div>
            <h2>Requests to Join</h2>
            {unassignedUsers.length === 0 ? (
                <p>No new requests to join</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            unassignedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>

                                    <td>
                                        <button onClick={() => handleAcceptUser(user.id)}>Accept</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )
            }
        </div>
    );
}

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

export default CompanyQueue;
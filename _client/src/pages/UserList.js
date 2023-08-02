import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "react-table/react-table.css";

function UserList({ user, MyCompany, setMyCompany }) {
    // const [MyCompany, setMyCompany] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     fetch("/mycompany")
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setMyCompany(data);
    //             console.log(data); // Logging the data received from the API call
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching MyCompany data:", error);
    //         });
    // }, []);


    function handleRemoveUser(id) {
        // e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`/api/setcompany/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_id: 1,
                // company_id: company,
            }),
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    setMyCompany((prevMyCompany) => ({
                        ...prevMyCompany,
                        users: prevMyCompany.users.filter((user) => user.id !== id),
                    }));
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
    }


    return (
        <div>
            <h2>{MyCompany.name} employees</h2>
            {!MyCompany.users ? (
                <p>Loading...</p>
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
                        {MyCompany.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>

                                <td>
                                    <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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

export default UserList;
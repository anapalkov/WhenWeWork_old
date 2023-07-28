import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "react-table/react-table.css";

function UserList({ user }) {
    const [MyCompany, setMyCompany] = useState([]);

    useEffect(() => {
        fetch("/mycompany")
            .then((r) => r.json())
            .then((data) => {
                setMyCompany(data);
                console.log(data); // Logging the data received from the API call
            })
            .catch((error) => {
                console.error("Error fetching MyCompany data:", error);
            });
    }, []);


    function handleRemoveUser(id) { }

    return (
        <div>
            <h2>My Company Users</h2>
            {!MyCompany.users ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MyCompany.users.map((user) => (
                            <tr key={user.id}>
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
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateShift({ user, myCompany, setMyCompany }) {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const [selectedUser, setSelectedUser] = useState(myCompany.users.length > 0 ? myCompany.users[0].id : "");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tradingStatus, setTradingStatus] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const shiftData = {
            user_id: selectedUser,
            title,
            location,
            start: startDate,
            end: endDate,
            trading: true,
        };

        fetch(`/shifts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shiftData),
        })
            .then((response) => {
                setIsLoading(false);
                if (response.ok) {
                    // Assuming the response contains the newly created shift data
                    response.json().then((newShift) => {
                        // Assuming myCompany and selectedUser are defined somewhere in your code
                        // Update the myCompany object with the new shift
                        const updatedCompany = { ...myCompany };
                        console.log(updatedCompany.users[selectedUser - 1])
                        updatedCompany.users[selectedUser - 1].shifts.push(newShift);

                        // console.log(selectedUser)

                        // Call SetMyCompany to update the state with the new data
                        setMyCompany(updatedCompany);


                        // Clear input values after successful submission
                        setSelectedUser(myCompany.users.length > 0 ? myCompany.users[0].id : "");
                        setTitle("");
                        setLocation("");
                        setStartDate(null);
                        setEndDate(null);
                    });
                } else {
                    response.json().then((err) => setErrors(err.errors));
                }
            });

    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        style={{ width: '25%' }} // Set the width to 100%
                    >
                        {myCompany.users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} - {user.fname} {user.lname}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                </div>
                <div>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="yyyy-MM-dd HH:mm" timeFormat="HH:mm" timeIntervals={15} />
                </div>
                <div>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="yyyy-MM-dd HH:mm" timeFormat="HH:mm" timeIntervals={15} />
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

export default CreateShift;

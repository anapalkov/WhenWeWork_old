import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField } from "../styles";
// import { useParams } from "react-router-dom";

// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'


function AvailableShifts({ user, myCompany, setMyCompany }) {
    const [selectedDate, setSelectedDate] = useState(null)
    const [companyShifts, setCompanyShifts] = useState([]);
    console.log(myCompany.shifts)


    // extract and sort shifts from myCompany that are currently being traded
    const allAvailableShifts = myCompany.users.map(user => user.shifts).flat().sort((a, b) => { return new Date(a.end) - new Date(b.end) }).filter((x) => x.trading === true)
    const [filteredShifts, setFilteredShifts] = useState(allAvailableShifts)

    // TIME DISPLAY IN CORRECT FORMAT
    function convertTime(x) {
        const time = new Date(x)
        var timestring = time.getMonth() + 1 + "/" + time.getDate() + "/" + time.getFullYear() + " @ "
        if (time.getUTCHours() === 0)
            timestring += "00:"
        else
            timestring += time.getUTCHours() + ":"

        if (time.getUTCMinutes() === 0)
            timestring += "00"
        else
            timestring += time.getUTCMinutes()
        return timestring
    }

    // HANDLE TRADE SHIFT
    const handleShiftTrade = (e, shift) => {
        e.preventDefault();
        fetch(`/shifts/${shift.id}/update_pickup`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                trading: !shift.trading,
            })
        }).then(res => res.json())
            .then(json => {
                // console.log("UPDATED SHIFT")
                // console.log(json)
                if (json.error) {
                    console.error("Error during shift trade:", json.error);
                    // setErrors(json.error);

                } else {
                    //UPDATE MY COMPANY
                    const updatedMyCompany = { ...myCompany };
                    // Find the old shift in myCompany users and remove it
                    updatedMyCompany.users.forEach((employee) => {
                        employee.shifts = employee.shifts.filter((s) => s.id !== json.id);
                    });

                    //Find the user in myCompany and add the updated shift
                    updatedMyCompany.users.forEach((employee) => {
                        if (employee.id === user.id) {
                            user.shifts.push(json);
                        }
                    });

                    // Find the user in myCompany and add the updated shift. CHANGE THIS TO FIND BY USER ID
                    //updatedMyCompany.users[user.id - 1].shifts.push(json);

                    //console.log(updatedMyCompany.users[user.id - 1].username)
                    //console.log(updatedMyCompany)

                    setMyCompany(updatedMyCompany);

                    //UPDATE MY SHIFTS
                    const updatedShifts = filteredShifts.filter((s) => s.id !== shift.id);
                    setFilteredShifts(updatedShifts);
                }
            }).catch(error => {
                console.error("Error during shift trade:", error);
            });

    }

    return (
        <Wrapper>
            <div className="centered-content">
                <h2>Available Shifts</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        date
                            ? setFilteredShifts(
                                allAvailableShifts.filter(
                                    (x) =>
                                        new Date(x.start).getDate() === date.getDate() &&
                                        new Date(x.start).getMonth() === date.getMonth()
                                )
                            )
                            : setFilteredShifts(allAvailableShifts);
                    }}
                /></div>

            {filteredShifts.length > 0 ? (
                filteredShifts.map((shift) => (
                    <Card>
                        <Shift key={shift.id}>
                            <h3>{shift.title}</h3>
                            <p>
                                {convertTime(shift.start)} - {convertTime(shift.end)}
                            </p>
                            <p>Location: {shift.location}</p>
                            <Button
                                color={shift.trading ? "primary" : "secondary"}
                                onClick={(e) => handleShiftTrade(e, shift)}
                            >
                                Pick Up
                            </Button>
                        </Shift>
                    </Card>
                ))
            ) : (
                <>
                    <h2>No Available Shifts Found</h2>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
      max-width: 800px;
      margin: 120px auto;
    `;

const Shift = styled.article`
      margin-bottom: 24px;
    `;

const Card = styled(Box)`
      // Apply styles to the Box component as needed
    `;

export default AvailableShifts;
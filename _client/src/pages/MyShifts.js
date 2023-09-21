import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
// import { useParams } from "react-router-dom";

// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function MyShifts({ user, setErrors, myCompany, setMyCompany }) {
    console.log("MYSHIFTS:")
    console.log(myCompany)
    //extract users shifts from company
    //const userShifts = myCompany.users[1].shifts
    const userShifts = myCompany.users.find(employee => employee.id === user.id)?.shifts || [];
    //sort shifts from user
    const allMyShifts = userShifts.sort((a, b) => { return new Date(a.end) - new Date(b.end) });
    const [selectedDate, setSelectedDate] = useState(null)
    const [filteredShifts, setFilteredShifts] = useState(allMyShifts)

    // TIME DISPLAY IN CORRECT FORMAT
    function convertTime(x) {
        // console.log(`Hello, ${name}!`);
        const time = new Date(x)
        var timestring = time.getMonth() + 1 + "/" + time.getDate() + "/" + time.getFullYear() + " @ "
        // var hours = time.getUTCHours()
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
        fetch(`/shifts/${shift.id}/update_offer`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trading: !shift.trading,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    console.error("Error during shift trade:", json.error);
                    setErrors([json.error]);
                } else {

                    // UPDATE FILTERED SHIFTS
                    const index = filteredShifts.findIndex((obj) => obj.id === shift.id);
                    const updatedObj = { ...filteredShifts[index], trading: !filteredShifts[index].trading };

                    const updatedData = [
                        ...filteredShifts.slice(0, index),
                        updatedObj,
                        ...filteredShifts.slice(index + 1),
                    ];
                    setFilteredShifts(updatedData);


                    //UPDATE MY COMPANY AS WELL
                    // Make a copy of myCompany
                    const updatedMyCompany = { ...myCompany };
                    // Find the user and shift in updatedMyCompany
                    const userToUpdate = updatedMyCompany.users.find(employee => employee.id === user.id);
                    const shiftToUpdate = userToUpdate.shifts.find(shift => shift.id === json.id);
                    // Update the trading value
                    shiftToUpdate.trading = !shiftToUpdate.trading;

                    // Update myCompany state
                    setMyCompany(updatedMyCompany);
                }
            })
    }

    return (
        <Wrapper>
            <div className="centered-content">
                <h2> Upcoming Shifts</h2>
                <DatePicker selected={selectedDate} onChange={(date) => {
                    setSelectedDate(date);
                    date ? setFilteredShifts(allMyShifts.filter((x) => new Date(x.start).getDate() === date.getDate() && new Date(x.start).getMonth() === date.getMonth())) : setFilteredShifts(allMyShifts)
                }
                }
                />
            </div>

            {filteredShifts.length > 0 ? (
                filteredShifts.map((shift) => (
                    <Box>
                        <Shift key={shift.id}>
                            <h3>{shift.title}</h3>
                            <p>{convertTime(shift.start)} - {convertTime(shift.end)}</p>
                            <p>Location: {shift.location}</p>
                            {/* Button to trade shift */}
                            <Button color={shift.trading ? 'primary' : 'secondary'} onClick={(e) => handleShiftTrade(e, shift)}>{shift.trading ? 'Cancel Trade' : 'Trade Shift'}</Button>
                        </Shift>
                    </Box>
                ))
            ) : (
                <>
                    <h2></h2>
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

export default MyShifts;

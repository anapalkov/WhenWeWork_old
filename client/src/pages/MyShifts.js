import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function MyShifts({ user }) {
    const [allShifts, setShifts] = useState([]);

    useEffect(() => {
        fetch("/shifts")
            .then((r) => r.json())
            .then(setShifts);
    }, []);


    const [selectedDate, setSelectedDate] = useState(null)
    const MyCurrentShifts = allShifts.filter((x) => x.user.id === user.id)

// TRADE SHIFT BUTTON
const [tradingstatus, setTradingstatus] = useState([])
const handleShiftTrade = (e) => {
    // const [errors, setErrors] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    e.preventDefault();
    // setErrors([]);
    // setIsLoading(true);
    fetch("http://localhost:3000/shifts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            trading: true
        })
    }).then((r) => {
        // setIsLoading(false);
        if (r.ok) {
            console.log(r.json())
            // r.json().then((user) => onLogin(user));
        } else {
            // r.json().then((err) => setErrors(err.errors));
        }
    });
}




    return (
        <Wrapper>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} />
            {MyCurrentShifts.length > 0 ? (
                MyCurrentShifts.map((shift) => (
                    <Shift key={shift.id}>
                        <Box>
                            <h2>{shift.title}</h2>
                            <p>Start Time: {shift.start_time}</p>
                            <p>End Time: {shift.end_time}</p>
                            <p>Location: {shift.location}</p>
                            <p>Type: {shift.shift_type}</p>
                            <p>Trading? {shift.trading ? ('YES') : ('NO')}</p>
                            {/* &nbsp;·&nbsp; */}
                            {/* <cite>By {shift.user.username}</cite> */}
                            {/* <ReactMarkdown>{shift.location}</ReactMarkdown> */}
                            <Button onClick={handleShiftTrade}>Trade Shift</Button>
                        </Box>
                    </Shift>
                ))
            ) : (
                <>
                    <h2>No Shifts Found</h2>
                    {/* <Button as={Link} to="/new">
                        Make a New Recipe
                    </Button> */}
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Shift = styled.article`
  margin-bottom: 24px;
`;

export default MyShifts;

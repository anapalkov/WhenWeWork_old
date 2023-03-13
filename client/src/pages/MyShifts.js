import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
// import { useParams } from "react-router-dom";

// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function MyShifts({ user }) {
    // DATEPICKER TBD
    const [selectedDate, setSelectedDate] = useState(null)
    // FETCH ALL SHIFTS, should switch to api/me instead
    const [allShifts, setAllShifts] = useState([]);
    useEffect(() => {
        //     fetch("/shifts")
        //         .then((r) => r.json())
        //         .then(setAllShifts);
        // }, []);
        fetch("/api/me")
            .then((r) => r.json())
            .then(json => setAllShifts(json.shifts));
    }, []);

    // FILTER OUT OTHER PEOPLES SHIFTS
    // const MyCurrentShifts = allShifts.filter((x) => x.user.id === user.id)
    const MyCurrentShifts = allShifts
    MyCurrentShifts.sort((a, b) => {
        const atime = Date(a.end_time)
        const btime = Date(b.end_time)
        console.log([a.end_time, atime, Date(2019,7)])
        return atime - btime
    }
    )

    // HANDLE TRADE SHIFT
    const handleShiftTrade = (e, shift) => {
        e.preventDefault();
        console.log(shift)
        fetch(`/shifts/${shift.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trading: !shift.trading,
            })
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                //CHANGE IN DOM NOT DONE
                console.log(allShifts.find((changingshift) => changingshift.id === shift.id).trading)
                //MyCurrentShifts.map(obj => arr2.find(o => o.id === obj.id) || obj);
            })
    }

    return (
        <Wrapper>
            <h2> Upcoming Shifts</h2>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} />
            {MyCurrentShifts.length > 0 ? (
                MyCurrentShifts.map((shift) => (
                    // {start = Date(shift.start_time)}
                    // {end = Date(shift.start_time)}

                    <Shift key={shift.id}>
                        <Box>
                            <h3>{shift.shift_type}</h3>
                            <p>Start Time: {shift.start_time}</p>
                            <p>End Time: {shift.end_time}</p>
                            <p>Location: {shift.location}</p>
                            {/* <p>Type: {shift.shift_type}</p> */}
                            {/* <p>Trading? {shift.trading ? ('YES') : ('NO')}</p> */}
                            {/* &nbsp;·&nbsp; */}
                            {/* <cite>By {shift.user.username}</cite> */}
                            {/* <ReactMarkdown>{shift.location}</ReactMarkdown> */}
                            {/* <Button onClick={handleShiftTrade(shift)}>Trade Shift</Button> */}
                            <Button onClick={(e) => handleShiftTrade(e, shift)}>{shift.trading ? 'Cancel Trade' : 'Trade Shift'}</Button>

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

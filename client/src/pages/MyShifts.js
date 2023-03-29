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
    const [selectedDate, setSelectedDate] = useState(null)
    const [filteredShifts, setFilteredShifts] = useState([])
    const [allMyShifts, setAllMyShifts] = useState([]);
    useEffect(() => {
        fetch("/api/me")
            .then(r => r.json())
            .then(json => {
                setAllMyShifts(json.shifts.sort((a, b) => { return new Date(a.end) - new Date(b.end) }))
                setFilteredShifts(json.shifts.sort((a, b) => { return new Date(a.end) - new Date(b.end) }))
            }
            );
    }, []);

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
        console.log(shift)
        //I don't like this because this gives user access to all shifts, not just their own
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
                // Find the index of the object with id equal to x
                const index = filteredShifts.findIndex(obj => obj.id === shift.id);
                // Create a new object that is a copy of the original object at the index, but with trading set to false
                const updatedObj = { ...filteredShifts[index], trading: !filteredShifts[index].trading };
                // Create a new array that replaces the original object at the index with the updated object
                const updatedData = [
                    ...filteredShifts.slice(0, index),
                    updatedObj,
                    ...filteredShifts.slice(index + 1),
                ];
                setFilteredShifts(updatedData)
            })
    }


    return (
        <Wrapper>
            <h2> Upcoming Shifts</h2>
            <DatePicker selected={selectedDate} onChange={(date) => {
                setSelectedDate(date);
                date ? setFilteredShifts(allMyShifts.filter((x) => new Date(x.start).getDate() === date.getDate() && new Date(x.start).getMonth() === date.getMonth())) : setFilteredShifts(allMyShifts)
            }
            }
            />

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
                    <h2>No Shifts Found</h2>
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

const Card = styled(Box)({

    // border: '1px solid #454545',
    // boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
})

export default MyShifts;

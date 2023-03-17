import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
// import { useParams } from "react-router-dom";

// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function AvailableShifts({ user }) {
    // DATEPICKER TBD
    const [selectedDate, setSelectedDate] = useState(null)
    // useState(null)
    const [filteredShifts, setFilteredShifts] = useState([])
    // FETCH ALL MY SHIFTS and SORT
    const [allAvailableShifts, setAllAvailableShifts] = useState([]);
    useEffect(() => {
        //     fetch("/shifts")
        //         .then((r) => r.json())
        //         .then(setAllMyShifts);
        // }, []);
        fetch(`/companies/${user.company.id}`)
            .then(r => r.json())
            .then(json => {
                console.log(user.company_id)
                console.log(json.shifts)
                const sortedShifts = json.shifts.sort((a, b) => { return new Date(a.end_time) - new Date(b.end_time) })

                setAllAvailableShifts(sortedShifts.filter((x) => x.trading === true))
                setFilteredShifts(sortedShifts.filter((x) => x.trading === true))
                //&& x.user.id !== user.id)
                //TO FIX THIS AND FUTURE ISSUES WE NEED TO HAVE BACK END HIERARCHY
            }
            );
    }, []);

    // FILTER OUT OTHER PEOPLES SHIFTS
    //const MyCurrentShifts = allMyShifts.filter((x) => x.user.id === user.id)

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

    // const handleDateChange = () => {
    //     // console.log(selectedDate)
    //     // console.log(new Date(x.start_time).getDate())
    //     // setSelectedDate(Date())
    //     setFilteredShifts(allMyShifts.filter((x) => new Date(x.start_time).getDate() === selectedDate.getDate()))
    // }

    return (
        <Wrapper>
            <h2> Available Shifts</h2>
            <DatePicker selected={selectedDate} onChange={(date) => {
                setSelectedDate(date); // NOT WORKING WHY

                // console.log('og date is: ' +  date.getDate());
                // console.log('selected date is: ' + selectedDate)
                // console.log('allmyshifts dates are: ' + allMyShifts.map((x) => new Date(x.start_time).getDate()))
                date ? setFilteredShifts(allAvailableShifts.filter((x) => new Date(x.start_time).getDate() === date.getDate() && new Date(x.start_time).getMonth() === date.getMonth())) : setFilteredShifts(allAvailableShifts)

                // console.log("filtered shifts array")
                // console.log(filteredShifts);  // NOT SETTING WHY
                // console.log("og array ")
                // console.log(allMyShifts.filter((x) => new Date(x.start_time).getDate() === date.getDate()))
            }
            }
            />

            {filteredShifts.length > 0 ? (
                filteredShifts.map((shift) => (
                    // {start = new Date(shift.start_time)}
                    // {end = new Date(shift.start_time)}

                    <Box>
                        <Shift key={shift.id}>
                            <h3>{shift.shift_type}</h3>
                            <p>{convertTime(shift.start_time)} - {convertTime(shift.end_time)}</p>
                            <p>Location: {shift.location}</p>
                            {/* <p>Type: {shift.shift_type}</p> */}
                            {/* <p>Trading? {shift.trading ? ('YES') : ('NO')}</p> */}
                            {/* &nbsp;·&nbsp; */}
                            {/* <cite>By {shift.user.username}</cite> */}
                            {/* <ReactMarkdown>{shift.location}</ReactMarkdown> */}
                            {/* <Button onClick={handleShiftTrade(shift)}>Trade Shift</Button> */}
                            <Button color={shift.trading ? 'primary' : 'secondary'} onClick={(e) => handleShiftTrade(e, shift)}>Pick Up</Button>
                        </Shift>
                    </Box>
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

const Card = styled(Box)({

    // border: '1px solid #454545',
    // boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
})

export default AvailableShifts;

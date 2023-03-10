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
    const MyCurrentShifts = allShifts.filter((x) => {
        console.log(x.user.id)
        return x.user.id === user.id
    }
    )

    return (
        <Wrapper>

            <DatePicker selected={selectedDate} onChange={setSelectedDate} />

            {MyCurrentShifts.length > 0 ? (
                MyCurrentShifts.map((shift) => (
                    // if (shift.user_id == user.id)

                    <Recipe key={shift.id}>
                        <Box>
                            <h2>{shift.title}</h2>
                            <p>Start Time: {shift.start_time}</p>
                            <p>End Time: {shift.end_time}</p>
                            <p>Location: {shift.location}</p>
                            <p>Type: {shift.shift_type}</p>
                            {/* &nbsp;·&nbsp; */}
                            {/* <cite>By {shift.user.username}</cite> */}

                            {/* <ReactMarkdown>{shift.location}</ReactMarkdown> */}
                        </Box>
                    </Recipe>


                ))
            ) : (
                <>
                    <h2>No Shifts Found</h2>
                    <Button as={Link} to="/new">
                        Make a New Recipe
                    </Button>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default MyShifts;

import { ScheduleComponent, EventSettingsModel, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('MTM2MTk0NUAzMjMwMmUzNDJlMzBLT0VaZ1hXYXhnblQ3UGt0WlhtSVBleUo4QkVGSE51bDJtSE5QWndpZFl3PQ==;Mgo DSMBaFt/QHRqVVhkVFpHaV1GQmFJfFBmQGlZf1Ryc0UmHVdTRHRcQl5iTn9UdkVhXnhecXY=;Mgo DSMBMAY9C3t2VVhkQlFacldJXnxLekx0RWFab1t6dFVMYltBJAtUQF1hSn5Qd0JiXn9ecnNSR2Ve;Mgo DSMBPh8sVXJ0S0J XE9AflRBQmFNYVF2R2BJelRwdF9EZ0wxOX1dQl9gSX1ScURkWX9cd3NWRGI=;MTM2MTk0OUAzMjMwMmUzNDJlMzBqL2Y3OEYxUnE2c0JYVzFJbnRjYXhobUE1dWNOMkRiZ2ExSFVaUTI5d2JFPQ==;NRAiBiAaIQQuGjN/V0Z WE9EaFtKVmBWfFdpR2NbfE51flVGal5WVBYiSV9jS31TdURkWHhecHZSQWZVUw==;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxLekx0RWFab1t6dFVMYltBJAtUQF1hSn5Qd0JiXn9ecnNSTmVe;MTM2MTk1MkAzMjMwMmUzNDJlMzBkaDRSbDVmSXFJNjZEWW1ham5ITkNxNEZpeHF1b3BJNVBqdFhoTjhQbWU4PQ==;MTM2MTk1M0AzMjMwMmUzNDJlMzBuTFJSNTVJWHI3cHZXbFZQOW9uejBxOGNkSWowNDdJeWxxdi9aRmZSZE5RPQ==;MTM2MTk1NEAzMjMwMmUzNDJlMzBQV1d5a1JYb3BDMXFiditoZk5Nb0NFNEJjdmw2MTlWenF5YzhYVDEzbEJnPQ==;MTM2MTk1NUAzMjMwMmUzNDJlMzBCYVN5QmNtRlBCZURPWDFJOHlrVng1SHIwUEdZZy9adWFCNyt5NFgrSThRPQ==;MTM2MTk1NkAzMjMwMmUzNDJlMzBLT0VaZ1hXYXhnblQ3UGt0WlhtSVBleUo4QkVGSE51bDJtSE5QWndpZFl3PQ==');


function Test({ user }) {

    const data = [
        {
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2023, 3, 15, 10, 0),
            EndTime: new Date(2023, 3, 15, 12, 30),
            IsAllDay: false,
            Status: 'Completed',
            Priority: 'High'
        },
    ];
    const fieldsData = {
        id: 'Id',
        subject: { name: 'Subject' },
        isAllDay: { name: 'IsAllDay' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' }
    }

    return (
        <ScheduleComponent height='550px' currentView='Week' eventSettings={data}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            {/* currentView='Month' selectedDate={new Date(2021, 0, 10)} */}
        </ScheduleComponent>
    )
}



export default Test;

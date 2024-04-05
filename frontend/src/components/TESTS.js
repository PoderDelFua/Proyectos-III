'use client';

/*
export default function MyComponent() {
  return (
    <h1>TESTS</h1>
  );
}
*/

import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const today = dayjs();

const isInCurrentMonth = (date) => date.get('month') === dayjs().get('month');


export default function DateValidationShouldDisableMonth() {
  const [selectedDate, setSelectedDate] = React.useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(selectedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DateTimePicker']}>
        <DemoItem label="DatePicker">
          <DatePicker
            value={selectedDate}
            shouldDisableMonth={isInCurrentMonth}
            views={['year', 'month', 'day']}
            onChange={handleDateChange}
          />
        </DemoItem>
        <DemoItem label="DateTimePicker">
          <DateTimePicker
            value={selectedDate}
            shouldDisableMonth={isInCurrentMonth}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            onChange={handleDateChange}
          />
        </DemoItem>
      </DemoContainer>
      <div>
        Selected Date: {selectedDate.format('YYYY-MM-DD HH:mm')}
      </div>
    </LocalizationProvider>
  );
}
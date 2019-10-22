import React, { useState } from 'react';
import 'date-fns';
import zhCNLocale from "date-fns/locale/zh-CN";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers'

function LocaleDateTimePicker({ emitDate }: { emitDate: ((_: Date) => void) }) {
  // const [locale, setLocale] = useState('zh-CN');
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(),
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date)
    if (date)
      emitDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCNLocale}>
      <DateTimePicker
        autoOk
        ampm={false}
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
      />
    </MuiPickersUtilsProvider>
  )
}

export default LocaleDateTimePicker;
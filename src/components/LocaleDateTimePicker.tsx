import React from 'react';
import 'date-fns';
import zhCNLocale from "date-fns/locale/zh-CN";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers'

function LocaleDateTimePicker({
  emitDate,
  date
}: {
  emitDate: (_: Date) => void,
  date: Date
}) {
  const handleDateChange = (date: Date | null) => {
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
        value={date}
        onChange={handleDateChange}
        label="24h clock"
      />
    </MuiPickersUtilsProvider>
  )
}

export default LocaleDateTimePicker;
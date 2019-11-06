import React from 'react';
import {
  TextField,
  Container,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { Add } from '@material-ui/icons'
import LocaleDateTimePicker from './LocaleDateTimePicker'
// import Timers from '../utils/notify'

// const timers = new Timers()

const worker = new Worker('worker.js')

function PlanSetter({
  plan,
  setPlan,
  put
}: {
  plan: ListItem,
  setPlan: (plan: ListItem) => void,
  put: () => void
}) {
  //样式
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(2),
        width: '4rem',
        height: '4rem',
        alignSelf: 'center'
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
      }
    }),
  );
  const classes = useStyles()

  //事件handler
  const setTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    setPlan(Object.assign({}, plan, { title: e.target.value }))
  }

  const setDetail = (e: React.FocusEvent<HTMLInputElement>) => {
    setPlan(Object.assign({}, plan, { detail: e.target.value }))
  }

  const setDate = (d: Date) => {
    setPlan({ ...plan, date: d })
  }

  return (
    <Container className={classes.container}>
      <TextField
        onChange={setTitle}
        label='主题'
        value={plan.title}
        placeholder='事项的主题' />
      <TextField
        id="outlined-multiline-flexible"
        value={plan.detail}
        label="事项的细节"
        multiline
        rowsMax="4"
        onChange={setDetail}
        margin="normal"
        variant="outlined"
      />
      <LocaleDateTimePicker date={new Date(plan.date)} emitDate={setDate} />
      <Add
        onClick={() => {
          if (plan.title !== '') {
            put()
            worker.postMessage({
              date: new Date(plan.date),
              title: plan.title,
              body: plan.detail
            })
            // timers.add(new Date(plan.date), () => {
            //   new Notification(plan.title, {
            //     body: plan.detail
            //   })
            // })
            console.log('put: ' + plan.title)
          }
        }}
        color="primary"
        className={classes.button}
      />
    </Container>
  );
}

interface ListItem {
  title: string,
  detail: string,
  date: Date
}

export default PlanSetter;
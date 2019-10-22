import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import LocaleDateTimePicker from './LocaleDateTimePicker'

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
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
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
    <Container maxWidth='sm'>
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
      <Button
        onClick={put}
        variant="outlined"
        color="primary"
        className={classes.button}>
        添加一条
      </Button>
      <LocaleDateTimePicker emitDate={setDate} />
    </Container>
  );
}

interface ListItem {
  title: string,
  detail: string,
  date: Date
}

export default PlanSetter;
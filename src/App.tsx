import React, { useState } from 'react';
import './App.css';
import {
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Container,
  Box,
  ListItem
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { func } from 'prop-types';

function App() {
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
  const listDataSrc: Array<ListItem> = [
    {
      title: 'hi',
      detail: 'hello world'
    },
    {
      title: 'this is',
      detail: 'hello world'
    },
    {
      title: 'a hello world',
      detail: 'hello world'
    }
  ]
  const [list, setList] = useState(listDataSrc)
  const [itemBuf, setItemBuf] = useState({
    title: '',
    detail: ''
  })
  function addOne() {
    let i: number
    if ((i = list.map(item => item.title).indexOf(itemBuf.title), i >= 0)) {
      const buf = Array.from(list)
      buf.splice(i, 1, itemBuf)
      setList(buf)
    } else {
      setList(Array.from([...list, itemBuf]))
    }
    setItemBuf({
      title: '',
      detail: ''
    })
  }
  function rmOne(title: string) {
    let i: number
    if ((i = list.map(item => item.title).indexOf(title), i >= 0)) {
      const buf = Array.from(list)
      buf.splice(i, 1)
      setList(buf)
    }
  }
  function setTitle(e: React.FocusEvent<HTMLInputElement>) {
    setItemBuf(Object.assign({}, itemBuf, { title: e.target.value }))
  }
  function setDetail(e: React.FocusEvent<HTMLInputElement>) {
    setItemBuf(Object.assign({}, itemBuf, { detail: e.target.value }))
  }
  return (
    <Container maxWidth='sm'>
      <TextField
        onChange={setTitle}
        label='主题'
        value={itemBuf.title}
        placeholder='事项的主题' />
      <TextField
        id="outlined-multiline-flexible"
        value={itemBuf.detail}
        label="事项的细节"
        multiline
        rowsMax="4"
        onChange={setDetail}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={addOne} variant="outlined" color="primary" className={classes.button}>
        添加一条
      </Button>
      <Panels list={list} rmOne={rmOne}/>
    </Container>
  );
}

interface listHandler {
  rmOne: Function
}

interface Props extends listHandler {
  list: Array<ListItem>
}

interface ListItem {
  title: string,
  detail: string
}

interface PanelProps extends ListItem, listHandler {}

function Panels(props: Props) {
  return (
    <Box>
      {(props.list as Array<ListItem>).map(item =>
        <Panel
          key={item.title}
          title={item.title}
          detail={item.detail}
          rmOne={props.rmOne}
        />)}
    </Box>
  )
}

function Panel(props: PanelProps) {
  function rmSelf() {
    props.rmOne(props.title)
  }
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        {props.title}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <p>{props.detail}</p>
        <Button variant="outlined" color="primary" onClick={rmSelf}>
          删除
      </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default App;

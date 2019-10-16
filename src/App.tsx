import React, { useState } from 'react';
import './App.css';
import {
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Container,
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
  function addOne(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(itemBuf)
    let i: number
    if ((i = list.map(item => item.title).indexOf(itemBuf.title), i >= 0)) {
      const buf = Array.from(list)
      buf.splice(i, 1, itemBuf)
      setList(buf)
    } else {
      setList([...list, itemBuf])
    }
  }
  function setTitle(e: React.FocusEvent<HTMLInputElement>) {
    setItemBuf(Object.assign(itemBuf, {title: e.target.value}))
  }
  function setDetail(e: React.FocusEvent<HTMLInputElement>) {
    setItemBuf(Object.assign(itemBuf, {detail: e.target.value}))
  }
  return (
    <Container maxWidth='sm'>
      <TextField
        onBlur={setTitle}
        label='主题'
        placeholder='事项的主题' />
      <TextField
        onBlur={setDetail}
        label='内容'
        placeholder='事项的细节' />
      <Button onClick={addOne} variant="outlined" color="primary" className={classes.button}>
        添加一条
      </Button>
      <Panels list={list}></Panels>
    </Container>
  );
}

interface Props {
  list: Array<ListItem>
}

interface ListItem {
  title: string,
  detail: string
}

function Panels(props: Props) {
  return (
    <ol>
      {(props.list as Array<ListItem>).map(item => <Panel key={item.title} title={item.title} detail={item.detail}></Panel>)}
    </ol>
  )
}

function Panel(props: ListItem) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        {props.title}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <p>{props.detail}</p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default App;

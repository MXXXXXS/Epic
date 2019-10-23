import React, { useState } from 'react';
import './App.css';
import {
  Container,
} from '@material-ui/core'
import PlanSetter from './components/PlanSetter'
import PlanManager from './components/PlanManager'


function App() {
  //状态
  const listDataSrc: Array<ListItem> = [
    {
      title: 'hi',
      detail: 'hello world',
      date: new Date()
    },
    {
      title: 'this is',
      detail: 'hello world',
      date: new Date()
    },
  ]
  const [list, setList] = useState(listDataSrc)

  //事件handler
  const put = () => {
    if (plan.title !== '') {
      let i: number
      if ((i = list.map(plan => plan.title).indexOf(plan.title), i >= 0)) {
        const previous = list[i]
        if ((previous.detail !== plan.detail ||
          previous.date.toString() !== plan.date.toString())) {
          const buf = Array.from(list)
          buf.splice(i, 1, plan)
          setList(buf)
        }
      } else {
        setList(Array.from([...list, plan]))
      }
      setPlan({
        title: '',
        detail: '',
        date: new Date()
      })
    }
  }

  const remove = (title: string) => {
    let i: number
    if ((i = list.map(item => item.title).indexOf(title), i >= 0)) {
      const buf = Array.from(list)
      buf.splice(i, 1)
      setList(buf)
    }
  }

  const [plan, setPlan] = useState({
    title: '',
    detail: '',
    date: new Date()
  })

  return (
    <Container maxWidth='sm'>
      <PlanSetter
        plan={plan}
        setPlan={setPlan}
        put={put} />
      <PlanManager
        setPlan={setPlan}
        plans={list}
        remove={remove}
      />
    </Container>
  );
}

interface ListItem {
  title: string,
  detail: string,
  date: Date
}
export default App;

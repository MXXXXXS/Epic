import React, { useState, Fragment } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
} from '@material-ui/core'

function Plans({
  plans,
  remove
}: {
  plans: ListItem[],
  remove: (title: string) => void
}) {
  return (
    <Fragment>
      {
        plans.map(plan => (
          <ExpansionPanel key={plan.title}>
            <ExpansionPanelSummary>
              {plan.title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>{plan.detail}</p>
              <p>{plan.date.toString()}</p>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => { remove(plan.title) }}
              >删除</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }
    </Fragment>
  )
}

interface ListItem {
  title: string,
  detail: string,
  date: Date
}

export default Plans;
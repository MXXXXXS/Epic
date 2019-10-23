import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import {DeleteForever, Edit} from '@material-ui/icons'
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

function Plans({
  setPlan,
  plans,
  remove
}: {
  setPlan: (plan: ListItem) => void,
  plans: ListItem[],
  remove: (title: string) => void
}) {
    //样式
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(2),
        width: '2rem',
        height: '2rem',
        alignSelf: 'center'
      },
    }),
  );
  const classes = useStyles()

  return (
    <>
      {
        plans.map(plan => (
          <ExpansionPanel key={plan.title}>
            <ExpansionPanelSummary>
              {plan.title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>{plan.detail}</p>
              <p>{plan.date.toString()}</p>
              <DeleteForever className={classes.button}
                color="secondary"
                onClick={() => { remove(plan.title) }}
              />
              <Edit className={classes.button}
                color="primary"
                onClick={() => {setPlan({
                  title: plan.title,
                  detail: plan.detail,
                  date: new Date(plan.date)
                })}}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }
    </>
  )
}

interface ListItem {
  title: string,
  detail: string,
  date: Date
}

export default Plans;
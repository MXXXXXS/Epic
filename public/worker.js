console.log('from worker')

const plans = []

onmessage = function(e) {
  console.log(e.data)
  plans.push(e.data)
}

setInterval(() => {
  for (let i = plans.length - 1; i > -1; i--) {
    const plan = plans[i]
    if (plan.date < new Date()) {
      plans.splice(i, 1)
      new Notification(plan.title, {
        body: plan.body
      })
      console.log(new Date().toUTCString())
    }
  }
}, 10000)
export default class {
  timers: Map<number, Date>

  constructor() {
    this.timers = new Map()
  }

  add(date: Date, fn: Function) {
    const duration = date.getTime() - Date.now()
    if (duration > 0) {
      const timerId = window.setTimeout(() => {
        this.timers.delete(timerId)
        window.clearTimeout(timerId)
        fn()
      }, duration)
      this.timers.set(timerId, date)
      return timerId
    }
  }

  getRemainTime(timerId: number) {
    return this.timers.get(timerId)
  }
}

if (!('Notification' in window)) {
  alert('浏览器不支持系统通知')
} else if (Notification.permission === 'default') {
  Notification.requestPermission().then(result => {
    new Notification('hi!')
  })
} else if (Notification.permission === 'granted') {
  new Notification('hi!')
} else {
  console.log('Requesting rejected')
}


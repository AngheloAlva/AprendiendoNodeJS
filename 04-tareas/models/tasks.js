import Task from './task.js'

class Tasks {
  constructor () {
    this._list = {}
  }

  get list () {
    const list = []

    Object.keys(this._list).forEach(key => {
      const task = this._list[key]
      list.push(task)
    })

    return list
  }

  createTask (name = '') {
    const task = new Task(name)
    this._list[task.id] = task
  }

  deleteTask (id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }

  loadTasks (tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task
    })
  }

  allTasks () {
    this.list.forEach((task, i) => {
      const idx = `${i + 1}.`.green
      const { name, completeAt } = task
      const status = completeAt ? 'Completed'.green : 'Pending'.red

      console.log(`${idx} ${name} :: ${status}`)
    })
  }

  listPendingCompleted (completed = true) {
    let counter = 0

    this.list.forEach(task => {
      const { name, completeAt } = task
      const status = completeAt ? 'Completed'.green : 'Pending'.red

      if (completed) {
        if (completeAt) {
          counter++
          console.log(`${(counter + '.').green} ${name} :: ${completeAt.green}`)
        }
      } else {
        if (!completeAt) {
          counter++
          console.log(`${(counter + '.').green} ${name} :: ${status}`)
        }
      }
    })
  }

  toggleCompleted (ids = []) {
    ids.forEach(id => {
      const task = this._list[id]

      if (!task.completeAt) {
        task.completeAt = new Date().toISOString()
      }
    })

    this.list.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completeAt = null
      }
    })
  }
}

export default Tasks

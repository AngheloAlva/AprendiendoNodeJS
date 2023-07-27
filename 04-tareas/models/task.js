import { v4 } from 'uuid'

class Task {
  constructor (name) {
    this.id = v4()
    this.name = name
    this.completeAt = null
  }
}

export default Task

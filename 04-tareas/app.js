// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { confirmMenu, inquirerMenu, listTasksToDelete, pauseMenu, readInput, showChecklist } from './helpers/inquirer.js'
import Tasks from './models/tasks.js'
import { readDB, saveDB } from './helpers/guardarArchivo.js'

const main = async () => {
  let option = ''
  const tasks = new Tasks()
  const tasksDB = readDB()

  if (tasksDB) {
    tasks.loadTasks(tasksDB)
  }

  do {
    option = await inquirerMenu()

    switch (option) {
      case '1':
        const name = await readInput('Task name: ')
        tasks.createTask(name)
        break
      case '2':
        tasks.allTasks()
        break
      case '3':
        tasks.listPendingCompleted(true)
        break
      case '4':
        tasks.listPendingCompleted(false)
        break
      case '5':
        const ids = await showChecklist(tasks.list)
        tasks.toggleCompleted(ids)
        break
      case '6':
        const id = await listTasksToDelete(tasks.list)
        if (id !== '0') {
          const ok = await confirmMenu('Are you sure?')
          if (ok) {
            tasks.deleteTask(id)
            console.log('Task deleted')
          }
        }
        break
    }
    saveDB(tasks.list)
    await pauseMenu()
  }
  while (option !== '0') console.log('\n Bye! \n'.green)
}

main()

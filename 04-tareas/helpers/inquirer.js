import inquirer from 'inquirer'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`
      },
      {
        value: '2',
        name: `${'2.'.green} List tasks`
      },
      {
        value: '3',
        name: `${'3.'.green} List completed tasks`
      },
      {
        value: '4',
        name: `${'4.'.green} List pending tasks`
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const pauseQuestion = [
  {
    type: 'input',
    name: 'enter',
    message: `Press ${'ENTER'.green} to continue`
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('=========================='.green)
  console.log('   Select an option'.green)
  console.log('==========================\n'.green)

  const { option } = await inquirer.prompt(questions)
  return option
}

const pauseMenu = async () => {
  console.log('\n')
  await inquirer.prompt(pauseQuestion)
}

const readInput = async (message) => {
  const readInputQuestion = [
    {
      type: 'input',
      name: 'name',
      message,
      validate (value = '') {
        if (value.length === 0) {
          return 'Please enter a value'
        }
        return true
      }
    }
  ]

  const { name } = await inquirer.prompt(readInputQuestion)
  return name
}

const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.name}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0'.green + ' Cancel'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id
}

const confirmMenu = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const showChecklist = async (tasks = []) => {
  const choices = tasks.map(task => {
    return {
      value: task.id,
      name: task.name,
      checked: task.completeAt
    }
  })

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question)
  return ids
}

export {
  inquirerMenu,
  pauseMenu,
  readInput,
  listTasksToDelete,
  confirmMenu,
  showChecklist
}

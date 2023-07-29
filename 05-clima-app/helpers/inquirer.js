// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import inquirer from 'inquirer'

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search city`
      },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('=========================='.green)
  console.log('   Select an option'.white)
  console.log('==========================\n'.green)

  const { option } = await inquirer.prompt(questions)
  return option
}

const pauseMenu = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue`
    }
  ]

  console.log('\n')
  await inquirer.prompt(question)
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'name',
      message
    }
  ]

  const { name } = await inquirer.prompt(question)
  return name
}

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: place.id,
      name: `${idx} ${place.nombre}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id
}

export {
  inquirerMenu,
  pauseMenu,
  readInput,
  listPlaces
}

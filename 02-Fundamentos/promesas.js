const empleados = [
  {
    id: 1,
    nombre: 'Anghelo'
  },
  {
    id: 2,
    nombre: 'Camila'
  },
  {
    id: 3,
    nombre: 'Oliver'
  },
  {
    id: 4,
    nombre: 'Osa'
  }
]

const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 2000
  }
]

const getEmpleado = (id) => {
  const promesa = new Promise((resolve, reject) => {
    const empleado = empleados.find(e => e.id === id)?.nombre
    
    empleado 
      ? resolve(empleado) 
      : reject(`Empleado con id ${id} no existe`)
  })

  return promesa
}

const getSalario = (id) => {
  const promesa = new Promise((resolve, reject) => {
    const salario = salarios.find(s => s.id === id)?.salario

    salario
      ? resolve(salario)
      : reject(`Salario con id ${id} no existe`)
  })

  return promesa
}

const id = 1

// getEmpleado(id)
//   .then(empleado => console.log(empleado))
//   .catch(err => console.log(err))

// getSalario(id)
//   .then(salario => console.log(salario))
//   .catch(err => console.log(err))

/////////////////////////////////////////////////////////////////////////////////////

// getEmpleado(id)
//   .then( empleado => {
//     getSalario(id)
//       .then( salario => {
//         console.log('El empleado', empleado, 'tiene un salario de:', salario)
//       })
//       .catch(err => console.log(err))
//   })
//   .catch(err => console.log(err))


/////////////////////////////////////////////////////////////////////////////////////

let nombre

getEmpleado(id)
  .then(empleado => {
    nombre = empleado
    return getSalario(id)
  })
  .then(salario => console.log('El empleado', nombre, 'tiene un salario de:', salario))
  .catch(err => console.log(err))

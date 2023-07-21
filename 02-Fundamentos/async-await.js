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

const id = 4

const getInfoUsuario = async(id) => {
  try {
    const empleado = await getEmpleado(id)
    const salario = await getSalario(id)

    return `El salario del empleado ${empleado} es de ${salario}`

  } catch (error) {
    throw error
  }
}

getInfoUsuario(id)
  .then(msg => console.log(msg))
  .catch(err => console.log(err))
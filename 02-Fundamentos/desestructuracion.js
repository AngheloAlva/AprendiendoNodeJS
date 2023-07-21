const batman = {
  nombre: 'Bruce',
  apellido: 'Wayne',
  poder: 'Dinero',
  getNombre() {
    return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
  }
}

console.log(batman.getNombre())

const { nombre, apellido, poder, edad = 30 } = batman

console.log(nombre, apellido, poder, edad)


// function imprimeHeroe( heroe ) {
//   const { nombre, apellido, poder, edad = 30 } = heroe
//   console.log(nombre, apellido, poder, edad)
// }

function imprimeHeroe({ nombre, apellido, poder, edad = 30 }) {
  console.log(nombre, apellido, poder, edad)
}

imprimeHeroe(batman)


const heroes = ['Batman', 'Superman', 'Mujer Maravilla']

// const h1 = heroes[0]
// const h2 = heroes[1]
// const h3 = heroes[2]

const [ h1, h2, h3 ] = heroes
const [ , , hSolo ] = heroes

console.log(h1, h2, h3)
console.log(hSolo)
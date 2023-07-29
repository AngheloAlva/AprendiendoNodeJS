import { inquirerMenu, listPlaces, pauseMenu, readInput } from './helpers/inquirer.js'
import Searchs from './models/searchs.js'
import 'dotenv/config.js'

const main = async () => {
  const searchs = new Searchs()
  let option

  do {
    option = await inquirerMenu()
    switch (option) {
      case 1:
        // eslint-disable-next-line no-case-declarations
        const placeName = await readInput('City: ')
        const places = await searchs.city(placeName)
        const id = await listPlaces(places)
        if (id === '0') continue

        searchs.addHistory(places.find((place) => place.id === id).nombre)

        const placeSelected = places.find((place) => place.id === id)
        const weather = await searchs.weather(placeSelected.lat, placeSelected.lng)

        console.log('\nInformation of the city\n'.green)
        console.log('City:', placeSelected.nombre.green)
        console.log('Lat:', placeSelected.lat)
        console.log('Lng:', placeSelected.lng)
        console.log('Temperature:', weather.temp)
        console.log('Min:', weather.min)
        console.log('Max:', weather.max)
        console.log('Weather:', weather.desc.green)

        break
      case 2:
        searchs.historyCapitalized.forEach((place, i) => {
          const idx = `${i + 1}.`.green
          console.log(`${idx} ${place}`)
        })
    }

    if (option !== 0) await pauseMenu()
  }
  while (option !== 0)
}

main()

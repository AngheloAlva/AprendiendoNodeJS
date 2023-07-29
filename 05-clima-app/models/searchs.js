import axios from 'axios'
import fs from 'fs'

class Searchs {
  history = []
  pathDB = './db/database.json'

  constructor () {
    this.readDB()
  }

  get paramsMapbox () {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es'
    }
  }

  get paramsOpenWeather () {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  get historyCapitalized () {
    return this.history.map((place) => {
      const words = place.split(' ')
      return words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ')
    })
  }

  async city (place = '') {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
        params: this.paramsMapbox
      })

      const answer = await intance.get()
      return answer.data.features.map((place) => ({
        id: place.id,
        nombre: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }))
    } catch (error) {
      return []
    }

    return []
  }

  async weather (lat, lon) {
    try {
      const intance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
        params: {
          ...this.paramsOpenWeather,
          lat,
          lon
        }
      })

      const answer = await intance.get()
      const { weather, main } = answer.data

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
    } catch (error) {
      console.log(error)
    }
  }

  addHistory (place = '') {
    if (this.history.includes(place.toLocaleLowerCase())) return
    this.history = this.history.splice(0, 5)

    this.history.unshift(place.toLocaleLowerCase())

    this.saveDB()
  }

  saveDB () {
    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.pathDB, JSON.stringify(payload))
  }

  readDB () {
    if (!fs.existsSync(this.pathDB)) return

    const info = fs.readFileSync(this.pathDB, {encoding: 'utf-8'})
    const data = JSON.parse(info)

    this.history = data.history
  }
}

export default Searchs
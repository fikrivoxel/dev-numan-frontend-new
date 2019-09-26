import {get} from 'axios'
import {BASE_URL} from 'globals.js'

export default {
  async getAll() {
    try {
      let {data} = await get(`${BASE_URL}/catalogs?page=1&perpage=1000`)
      return data.catalogs
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getByCollections(collections) {
    try {
      let {data} = await get(`${BASE_URL}/catalogs/collection/${collections.id}?page=1&perpage=50`)
      return data.catalogs
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

import {get} from 'axios'
import {BASE_URL} from 'globals.js'

export default {
  async getAll(abortController) {
    try {
      let {data} = await get(`${BASE_URL}/collections?page=1&perpage=50`)
      return data.collections
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getFive() {
    try {
      let collections = await this.getAll()
      return collections.filter((c, i) => i <= 4)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

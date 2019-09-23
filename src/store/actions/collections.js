import Collections from 'api/collections'

export const SET_COLLECTIONS = 'SET_COLLECTIONS'
export const REMOVE_COLLECTIONS = 'REMOVE_COLLECTIONS'

export const setCollections = function (collections) {
  return {
    type: SET_COLLECTIONS,
    collections
  }
}
export const removeCollections = function () {
  return {
    type: REMOVE_COLLECTIONS
  }
}

export const getFive = function () {
  return async function (dispatch) {
    try {
      let collections = await Collections.getFive()
      dispatch(setCollections(collections))
      return Promise.resolve()
    } catch (err) {
      dispatch(removeCollections())
      return Promise.reject(err)
    }
  }
}
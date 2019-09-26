import Catalogs from 'api/catalogs'

export const SET_CATALOGS = 'SET_CATALOGS'
export const REMOVE_CATALOGS = 'REMOVE_CATALOGS'

export const setCatalogs = function (catalogs) {
  return {
    type: SET_CATALOGS,
    catalogs
  }
}
export const removeCatalogs = function () {
  return {
    type: REMOVE_CATALOGS
  }
}

export const getAll = function () {
  return async function (dispatch) {
    try {
      let catalogs = await Catalogs.getAll()
      dispatch(setCatalogs(catalogs))
      return Promise.resolve()
    } catch (err) {
      dispatch(removeCatalogs())
      return Promise.reject(err)
    }
  }
}

export const getByCollections = function (cat) {
  return async function (dispatch) {
    try {
      let catalogs = await Catalogs.getByCollections(cat)
      dispatch(setCatalogs(catalogs))
      return Promise.resolve()
    } catch (err) {
      dispatch(removeCatalogs())
      return Promise.reject(err)
    }
  }
}

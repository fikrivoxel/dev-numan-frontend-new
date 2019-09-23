const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(function (fileName) {
  if (fileName === './index.js') return
  modules[fileName.replace(/(\.\/|\.js)/g, '')] = files(fileName).default
})

export default modules

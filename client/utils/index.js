const path = require('path')
const fs = require('fs')
const entryRootPath = path.join(__dirname, '../app/')
const entris = fs.readdirSync(entryRootPath).reduce((paths, dirname) =>  {
	paths[dirname] = path.join(entryRootPath, dirname)
	return paths
}, {})
module.exports = entris
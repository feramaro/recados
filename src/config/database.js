const sqlite3 = require('sqlite3').verbose()
const PATH = 'database.db'


const db = new sqlite3.Database(PATH, (err) => {
    if (err) {
        console.log(err.message)
    }

    console.log("Conectado ao banco de dados")
})

db.run("CREATE TABLE IF NOT EXISTS RECADOS (id INTEGER PRIMARY KEY ,autor TEXT, recado TEXT)")

module.exports = db
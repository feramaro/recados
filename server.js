var express = require('express')
var database = require('./src/config/database')

var app = express()
var PORT = 3000

app.use(express.json())



app.get('/recado', (req, res) => {
    let sql = `SELECT * FROM RECADOS`
    database.all(sql, [], (err, content) => {
        if (err) {
            return console.log("erro recuperando informações do banco " + err.message)
        }
        return res.json({ recados: content })

    })
})

app.get('/recado/:id', (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM RECADOS WHERE id = ${id}`
    database.get(sql, [], (err, content) => {
        if (err) {
            return console.log(`erro recuperando recado id ${id}`)
        }

        return res.json({recados: content})
    })
})

app.post('/recado', (req, res) => {
    let recado = req.body
    console.log(recado)
    let sql = `INSERT INTO RECADOS (autor, recado) VALUES ('${recado.autor}', '${recado.recado}')`
    database.run(sql, (err) => {
        if (err) {
            return console.log("erro inserindo no banco " + err.message)
        }
        return res.json({ status: "inserido com sucesso" })
    })
})

app.delete('/recado/:id', (req, res) => {
    let id = req.params.id
    let sql = `DELETE FROM RECADOS WHERE id = ${id}`
    database.run(sql, (err) => {
        if (err) {
            return console.log(`erro ao exlcuir recado de id ${id} | ${error.message} `)
        }

        return res.json({status: `recado ${id} exlcuido`})
    })

})


app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))


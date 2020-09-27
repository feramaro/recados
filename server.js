const express = require('express')
const database = require('./src/config/database')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000;
const serveStatic = require('serve-static');
app.use(express.json())
app.use(serveStatic(__dirname + "/dist"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/recado', (req, res) => {
    let sql = `SELECT * FROM RECADOS`
    database.all(sql, [], (err, content) => {
        if (err) {
            return console.log("erro recuperando informações do banco " + err.message)
        }
        console.log("recuperando recados")

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

        return res.json({ content })
    })
})

app.post('/recado', (req, res) => {
    let recado = req.body
    let sql = `INSERT INTO RECADOS (autor, recado) VALUES ('${recado.autor}', '${recado.recado}')`
    database.run(sql, (err) => {
        if (err) {
            return console.log("erro inserindo no banco " + err.message)
        }
        console.log("postando")
        return res.json({ status: "Você inseriu um novo recado!" })
    })
})

app.delete('/recado/:id', (req, res) => {
    let id = req.params.id
    let sql = `DELETE FROM RECADOS WHERE id = ${id}`
    database.run(sql, (err) => {
        if (err) {
            return console.log(`erro ao exlcuir recado de id ${id} | ${error.message} `)
        }

        return res.json({ status: `Você excluiu o recado de id ${id}` })
    })

})


app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))


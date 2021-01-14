const express = require("express")
const DATA = require("./mock.json")

const app = express()
const PORT = 4000

let PAGE_SIZE = 9

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  if (req.query.page) {
    res.status(200).json(DATA.slice(PAGE_SIZE * (req.query.page - 1),
      (PAGE_SIZE * (req.query.page - 1)) + PAGE_SIZE))
  } else {
    res.status(200).json(DATA.slice(0, PAGE_SIZE))
  }
})

app.get('/get/:id/', (req, res) => {
  res.status(200).json(DATA.find(it => it.id.$oid === req.params.id))
})

app.get('/total', (req, res) => {
  res.send(DATA.length.toString())
})

app.post('/', (req, res) => {
  if (req.query['page_size'] === 9 || req.query['page_size'] === 12) {
    PAGE_SIZE = req.query['page_size']
    res.status(200).send(`Размер страницы был успешно изменен на ${req.query['page_size']}`)
  }
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
